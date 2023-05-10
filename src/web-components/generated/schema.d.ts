import { SchemaObject } from "ajv";

declare module "*.schema.json" {
    const value: SchemaObject;
    export default value;
}