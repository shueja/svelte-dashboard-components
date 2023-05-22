import Ajv2020 from "ajv/dist/2020"
import * as schema from "./layout.schema.json"
import { elementData } from "./elements";
import { get, writable } from "svelte/store";

import defaultLayout from "./default.json"
console.log(schema)
const ajv = new Ajv2020()
console.log(elementData)
schema.$defs.element.properties.type.enum = Object.keys(elementData);
console.log(schema)
const parse = ajv.compile(schema)

const {set, subscribe, update} = writable(defaultLayout)
let layout = {
    set, subscribe, update,
    setFromString: (json: string) => {
        console.log(json)
        let layoutObject = JSON.parse(json);
        if (validate(layoutObject)) {
            set(layoutObject)
            console.log(layoutObject);
        }
    },
    deepSet: (newLayout: Layout) => {
        
    }
};

export default layout;

export let save = () => {
    async function saveLayout() {
        window.localStorage.setItem("frc-dashboard-layout", JSON.stringify(get(layout)))
    }
    return saveLayout();
}

export let validate = (unvalidatedJson) => {
    if (parse(unvalidatedJson)) {
        return true;
    }
    else {
        console.warn(parse.errors) // error message from the last parse call
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
    meta: any
}
export type ElementLayout = {
    x: number,
    y: number,
    width: number,
    height: number
}