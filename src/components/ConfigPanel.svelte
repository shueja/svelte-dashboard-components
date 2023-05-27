<script lang="ts">
    import { Writable, derived, get } from "svelte/store";
    import { DashboardElement, Layout, addWidget, save } from "../generated/layout";
    import ElementConfig from "./ElementConfig.svelte";
    import { subStore } from "immer-loves-svelte";
    import { afterUpdate } from "svelte";
    import {v4 as uuid} from "uuid";
    export let selectedTab = 0;
    export let selectedIndex = 0;
    $: console.log(selectedIndex)
    export let expanded = true;
    export let layout: Writable<Layout>
    let elements = subStore(layout, l=>l.tabs[0].elements);
    let selectedElementStore = subStore(elements, e=>e[selectedIndex]);
    $: selectedIndex, selectedElementStore = subStore(elements, e=>e[selectedIndex])

    afterUpdate(()=>{
        console.log("updating config panel")
        console.log($selectedElementStore)});
</script>
{#if expanded}
<div style="width:200px; height:100%; background-color: white">
    <button on:click={()=>save()}> Save Layout</button>
    <button on:click={()=>addWidget(selectedTab,"fms-info")}>+</button>
<button on:click={()=>{$elements = $elements.toSpliced(selectedIndex, 1); selectedIndex = 0;}}>Del</button>
{#key selectedIndex}
    <ElementConfig config={selectedElementStore}/>
{/key}
</div>
{/if}
