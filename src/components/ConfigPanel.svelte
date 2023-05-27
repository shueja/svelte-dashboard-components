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
    $: {console.log("updating selectedElementStore", selectedElementStore = subStore(elements, e=>e[selectedIndex]))}

    afterUpdate(()=>{
        console.log("updating config panel")
        console.log($selectedElementStore)});
</script>
{#if expanded}
<div style="width:300px; flex-shrink:0; height:100%; background-color: grey; padding:8px">
    <button on:click={()=>save()}> Save Layout</button>
    <button on:click={()=>addWidget(selectedTab,"fms-info")}>+</button>
<button on:click={()=>{
    console.log("deleting", selectedIndex);
    let indexToDelete = selectedIndex;
    selectedIndex = $elements.length;
    
    $elements = $elements.toSpliced(indexToDelete, 1);
    
    //we need to manually update this because we might delete element 0 and need to relink to the new 0
    // without Svelte thinking selectedIndex changed.
    selectedElementStore = subStore(elements, e=>e[selectedIndex]);
    console.log("new selectedElementStore", get(selectedElementStore))
    console.log($layout)
    }}>Del</button>
{#key selectedIndex}
    {#if selectedIndex < $elements.length}
    <ElementConfig config={selectedElementStore}/>
    {/if}
{/key}
</div>
{/if}
