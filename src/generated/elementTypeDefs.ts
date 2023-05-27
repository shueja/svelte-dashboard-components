import { ComponentType, SvelteComponentTyped } from "svelte"

export type WidgetDefinition = {
    name:String,
    id:String,
    data: PropertyDefinition<"string" | "stringarray">,
    properties:{

        [key:string]:PropertyDefinition<PropertyType>
    },
    layout?: {
        minWidth?: number,
        minHeight?: number
    }
}

export type PropertyType = "string" | "stringarray"  |
"integer" | "integerarray" | 
"boolean" | "booleanarray" |
 "double" | "doublearray"

export interface PropertyTypeMap {
    "string": string, "stringarray": Array<string>,
    "integer": number, "integerarray": Array<number>,
    "double" : number, "doublearray" : Array<number>,
    "boolean" : boolean, "booleanarray" : Array<boolean>
}

export const propertyTypes = ["string", "stringarray","integer", "integerarray", 
"boolean", "booleanarray", "double", "doublearray"]

export type PropertyDefinition<T extends PropertyType> = {
    type: T,
    default: PropertyTypeMap[T]
    description?: String,
    displayName?: String
}


export type ComponentWithConfig = ComponentType<SvelteComponentTyped> & {config: WidgetDefinition}

export type WidgetRegistry = {[key:string] : ComponentWithConfig}