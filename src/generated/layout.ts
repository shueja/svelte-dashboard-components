import Ajv2020 from "ajv/dist/2020"
import * as schema from "./layout.schema.json"
import { widgetDefinitions } from "./elements";
import { get, Writable, writable } from "svelte/store";
import {v4 as uuid} from "uuid"

import defaultLayout from "./default.json"
import { PropertyDefinition, propertyTypes, WidgetDefinition } from "./elementTypeDefs";
import { subStore } from "immer-loves-svelte";
import { Substore } from "immer-loves-svelte/build/main/lib/subStore";
console.log(schema)
const ajv = new Ajv2020()
console.log(widgetDefinitions)
//schema.$defs.element.properties.type.enum = Object.keys(elementData);
console.log(schema)
const parse = ajv.compile(schema)

const {set, subscribe, update} : Writable<Layout> = writable({tabs: [{name:"New Tab", elements: []}]})

let selectedTab = writable(0);
let layout = {
    set, subscribe, update,
    setFromString: (json: string) => {
        console.log(json)
        let layoutObject = JSON.parse(json);
        console.log(layoutObject)
        if (validate(layoutObject)) {
            layoutObject.tabs.forEach((tab, tabIndex)=>{
                tab.elements = (tab?.elements ?? [])
                    .filter(widget=>widget.hasOwnProperty("type"))
                    .filter(widget=>Object.keys(widgetDefinitions).includes(widget.type))
                    .map(widget=>{
                        let widgetDefinition = widgetDefinitions[widget.type];
                        widget = populateWidget(widget.type, widget);
                        return widget
                    })
            })
            set(layoutObject)
            console.log(layoutObject);
        }
        else {
            console.error("Unable to update layout to ", layoutObject)
        }
    }
};

export default layout;

export let addWidget = (  tab:number=0, type:string, name:string="New Element") : Substore<DashboardElement> => {
    let elements = subStore<Layout, Array<DashboardElement>>(layout, l=>l.tabs[tab].elements);
    elements.set([...get(elements), populateWidget(type,{
        name: name,
        type: type
    })])
    return subStore<Layout, DashboardElement>(layout, l=>l.tabs[tab].elements[l.tabs[tab].elements.length])
}

export let changeWidgetType = (widget: Writable<DashboardElement>, newType: string) => {
    
    console.log(newType)
    subStore(widget, w=>w.type).set(newType);
    subStore(widget, w=>w.meta).set(parseWidgetMeta(get(widget), widgetDefinitions[newType].config));
    
}

let populateWidget = (type:string, config: any) => {
    let widgetDefinition = widgetDefinitions[type].config;
    // populate fields, prioritizing config and falling back to the widget definition
    let newWidget :DashboardElement = {
        // If the widget does not have an individual name, use the generic name of the widget type
        // "Gyro", "FMS Info", etc
        name: config.name ?? widgetDefinition.name,
        type: type,
        // Default data source comes later
        data: parseWidgetData(config, widgetDefinition, "data"),
        layout: {
            x: config?.layout?.x ?? undefined,
            y: config?.layout?.y ?? undefined,
            width: Math.max(config?.layout?.width ?? 1, widgetDefinition?.layout?.minWidth ?? 1),
            height: Math.max(config?.layout?.height ?? 1, widgetDefinition?.layout?.minHeight ?? 1)
        },
        // meta gets filled later
        meta: parseWidgetMeta(config, widgetDefinition),
        id: config.id ?? uuid()
    }
    return newWidget
    // if data should be a string
}

let parseWidgetMeta = (config: any, widgetDefinition: WidgetDefinition) => {
    let name = config.name ?? widgetDefinition.name;
    let newMeta = {...config?.meta} ?? {}
    
    if (!newMeta.hasOwnProperty(config.type)) {
        newMeta[config.type] = {}
    }
    let newMetaOfType = {}
    Object.keys(widgetDefinition.properties).forEach(
        (propertyName)=>{
            // if property exists on config
            newMetaOfType[propertyName] = parseWidgetData(config, widgetDefinition, propertyName);
        }
    )
    newMeta[config.type] = newMetaOfType
    return newMeta;
}

let parseWidgetData = (config:any, widgetDefinition: WidgetDefinition, propertyName:string) => {
    let name = config.name ?? widgetDefinition.name;

    let isTopLevel = (propertyName === "data") // Add to this to parse more top-level properties
    let value = isTopLevel
        ? config?.[propertyName]
        : config?.meta?.[config.type]?.[propertyName];
    let propertyDefinition = isTopLevel
        ? widgetDefinition?.[propertyName]
        : widgetDefinition.properties?.[propertyName]

    if (propertyDefinition === undefined) {
        throw new Error(`[${name}] "${propertyName}" not in widget definition`);
    }
    // now we know that this is an actual property.
    let defaultValue = propertyDefinition.default
    let type = propertyDefinition.type;
    // what to use for typeof checks.
    const typeStrings = {string: "string", boolean: "boolean", integer: "number", double:"number",
                        stringarray:"string", booleanarray:"boolean", integerarray: "number", doublearray: "number"}
    
    if (!propertyTypes.includes(type)) {
        throw new Error(`[${name}] "${propertyName}" has invalid type ${type} in widget definition`)
    }
    if (value === undefined) {
        console.warn(`[${name}] "${propertyName}" attribute was not found in config. Using default source.`)
        return defaultValue;
    }
    if (Array.isArray(value)) {
        if (value.length == 0) {
            console.warn(`[${name}] "${propertyName}" attribute was empty array. Using default source.`)
            return defaultValue;
        }
        // if we want a non-array type 
        if (["string", "boolean", "integer", "double"].includes(propertyDefinition.type)) {
            let type = propertyDefinition.type;
            // integers and doubles both show up as "number"
            let typeString = typeStrings[type];
            if (typeof value[0] !== typeString) {
                console.warn(`[${name}] "${propertyName}" expected ${type}, got array with non-${type} first element. Using default source.`)
                return defaultValue;
            }
            // it was a string
            console.warn(`[${name}] "${propertyName}" expected ${type}, got array with ${type} as first element. Using first element.`)
            return value[0];
        }

        if (["stringarray", "booleanarray", "integerarray", "doublearray"].includes(propertyDefinition.type)) {
            let type :string = propertyDefinition.type;
            // integers and doubles both show up as "number"
            let typeString = 
                typeStrings[type];
            if (!value.every((item=>typeof item === typeString))) {
                console.warn(`[${name}] "${propertyName}" expected ${type} array, got array with some non-${type} elements. Using default source.`)
                return defaultValue;
            }
            return value;
        }

        throw new Error(`[${name}] "${propertyName}" was array, found no matching type.`)
        
    }
    // value is not an array.
    if (typeof value !== typeStrings[type]) {
        if (["string", "boolean", "integer", "double"].includes(type)) {
            console.warn(
                `[${name}] "${propertyName}" expected ${type}, got ${typeof value}. Using default source.`)
            return defaultValue;
        }
        if (["stringarray", "booleanarray", "integerarray", "doublearray"].includes(type)) {
            console.warn(`[${name}] "${propertyName}" expected ${type}, got incompatible non-array type ${typeof value}. Using default source.`)
            return defaultValue;
        }
    }
    if (["stringarray", "booleanarray", "integerarray", "doublearray"].includes(type)) {
        console.warn(`[${name}] "${propertyName}" expected ${type}, got ${type.substring(0, type.length-5)}. Using value as first element`)
        return [value]
    }
    // it was the right thing the whole time.
    return value;
}

export let save = () => {
    async function saveLayout() {
        window.localStorage.setItem("frc-dashboard-layout", JSON.stringify(get(layout), (key,value)=>(key==="id"? undefined: value)))
    }
    return saveLayout();
}

export let validate = (unvalidatedJson) => {
    if (parse(unvalidatedJson)) {
        return true;
    }
    else {
        console.error(parse.errors) // error message from the last parse call
        //console.error(parse.position) // error position in string
        return false;
    }
}

export type Layout = {
    tabs: Array<Tab>
}
export type Tab = {
    name: "New Tab",
    elements: Array<DashboardElement>
}
export type DashboardElement = {
    name: string,
    type: string, // The type declaration has less specificity than the schema because we might add elements at runtime
    data: string | Array<string>,
    layout: ElementLayout,
    id?: string,
    meta?: {
        [key: string]:Object;   
    }
}
export type ElementLayout = {
    x: number | undefined,
    y: number | undefined,
    width: number,
    height: number
}