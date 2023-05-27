<script lang="ts">
    import {hashCode} from "../util/hash" 
    import { TransactionStore, subStore, transactionStore} from "immer-loves-svelte";
    import { Writable, get } from "svelte/store";
    import { DashboardElement, changeWidgetType } from "../generated/layout";
    import {widgetDefinitions} from "../generated/elements";
    import { WidgetDefinition, PropertyTypeMap } from "../generated/elementTypeDefs";
    import StringConfig from "./StringConfig.svelte";
    import IntegerConfig from "./IntegerConfig.svelte";


    export let config :Writable<DashboardElement>

     let widgetDefinition: WidgetDefinition;

    let name = transactionStore<String>(subStore(config, c=>c.name))
    let type = transactionStore<String>(subStore(config, c=>c.type))
    let data = transactionStore<String | Array<String>>(subStore(config, c=>c.data))

    let propertyStores = {}
    $: if (Object.keys(widgetDefinitions).includes($type.toString())) {
        console.log("[ElementConfig]", widgetDefinitions[$type.toString()])
        console.log(widgetDefinitions[$type.toString()].config)
        widgetDefinition = widgetDefinitions[$type.toString()]?.config
    } else {
        console.log(widgetDefinitions, "does not include", $type.toString())
        widgetDefinition = undefined;
    }
    
    // The mapping of types to config elements 
    let configComponents = 
    {string: StringConfig, integer:IntegerConfig}

    let dataStore = (transactionStore(subStore(config, c=>(c.data))) as TransactionStore<string>)

</script>
<div style="width:100%">
<StringConfig propertyDefinition={
    {
        type:"string",
        default:widgetDefinition.name.toString(),
        description: "The display name of the element",
        displayName: "Name"
    }} store={

        transactionStore(subStore(config, c=>c.name))}></StringConfig>
{#if widgetDefinition.data.type === "string" && typeof $config.data === "string"} 
<StringConfig propertyDefinition={
    {
        type:"string",
        default:widgetDefinition.data.toString(),
        description: "The data source of the element",
        displayName: "Source"
    }} store={
    dataStore}></StringConfig>
{/if}
<!-- <input type="text" bind:value={$name} on:focusout={name.commit} on:change={name.commit}/> -->
<input type="text" bind:value={$data} on:focusout={data.commit} on:change={data.commit}/>
{JSON.stringify(widgetDefinition)}
<select bind:value={$type} on:change={(e)=>changeWidgetType(config, e.currentTarget.value)}>
    {#each Object.keys(widgetDefinitions) as type}
        <option value={type}>{widgetDefinitions[type].config.name}</option>
    {/each}
</select>
{#key Object.keys($config.meta[get(type).toString()])}
    {#each Object.keys(widgetDefinition.properties) as option (hashCode(option))}
        <svelte:component
            this={configComponents[widgetDefinition.properties[option].type]}
            propertyDefinition={widgetDefinition.properties[option]}
            store={transactionStore(subStore(config, c=>c.meta[$type.toString()][option]))}
            ></svelte:component>
    {/each}
{/key}
</div>