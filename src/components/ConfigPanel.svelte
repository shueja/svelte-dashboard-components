<script lang="ts">
    import { Writable, get } from "svelte/store";
    import { DashboardElement, Layout, save } from "../generated/layout";
    import ElementConfig from "./ElementConfig.svelte";
    import { subStore } from "immer-loves-svelte";
    import { afterUpdate } from "svelte";

    export let layout: Writable<Layout>
    let elements = subStore(layout, l=>l.tabs[0].elements);
    afterUpdate(()=>console.log("updating config panel"))
</script>

<div style="width:150px; height:100%; background-color: white">
    <button on:click={()=>save()}> Save Layout</button>
    <button on:click={()=>$elements = [...$elements, {
        name: "New Element",
        type: "drive",
        data: "",
        layout: {x: undefined, y : undefined, width: 1, height: 1},
        meta: {}
    }

]}> +</button>
    {#each $elements as element, i}
        <ElementConfig config={subStore(layout, layout=>layout.tabs[0].elements[i])}/>
    {/each}
    
</div>