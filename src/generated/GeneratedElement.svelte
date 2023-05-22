<script lang="ts">
import GridItem from "svelte-web-components/layout/GridItem.svelte";
import "@frc-web-components/fwc/components"
import {DashboardElement} from "./layout"
import {elementData} from "./elements"
    import { afterUpdate } from "svelte";
    import { Writable } from "svelte/store";
    import { subStore } from "immer-loves-svelte";

    export let json :Writable<DashboardElement>;
    // These are objects but we only use the keys array
    let type = subStore(json, j=>j.type);
    let name = subStore(json, j=>j.name);
    let valid = true;
    $: if (!Object.keys(elementData).includes($type)) {
                console.log(`Invalid element type ${$type} not in ${Object.keys(elementData)}`);
                valid = false;
        }
    $: data = subStore(json, j=>j.data);
    $: meta = subStore(json, j=>j.meta);
    let x = subStore(json, json=>json.layout.x);
    let y = subStore(json, json=>json.layout.y);
    let width = subStore(json, json=>json.layout.width);
    let height = subStore(json, json=>json.layout.height);
    $: {
    // Making sure these are integers at least 1
        // if the values are actually found in the json, round them to integers
        // and make them at least 1. Otherwise, leave them undefined for GridItem
        // to know to autoplace.
        // If we do Math operations on "undefined" it becomes NaN so instead we 
        // leave it alone
        
        if ($x !== undefined) {$x = Math.max(1, Math.round($x))}
        if ($y !== undefined) {$y = Math.max(1, Math.round($y))}

        // Min width and height are from the element properties
        //(specific to the dashboard, not the code layout json)
        let minWidth = 1//elementData[type].layout.minWidth
        let minHeight =1// elementData[type].layout.minHeight

        if ($width !== undefined) {$width = Math.max(minWidth, Math.round($width))}
        if ($height !== undefined) {$height = Math.max(minHeight, Math.round($height))}
        json;
    }


    afterUpdate(()=>console.log("Rendering", $name))
</script>
{#if valid}
<GridItem bind:x={$x} bind:y={$y} width={$width} height={$height} >
    <svelte:component this={elementData[$type].component} data={$data} name={$name} {...$meta}></svelte:component>
</GridItem>
{/if}
