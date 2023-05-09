<script lang="ts">
import GridItem from "../layout/GridItem.svelte";
import "@frc-web-components/fwc/components"
import {elementData} from "./elements"

    export let json;
    // These are objects but we only use the keys array

    $: type = json.type;
    $: name = json.name;
    let valid = true;
    $: if (!Object.keys(elementData).includes(type)) {
                console.log(`Invalid element type ${type} not in ${Object.keys(elementData)}`);
                valid = false;
        }
    $: data = json.data;
    $: meta = (json[type] === undefined) ? elementData[type].defaultMeta : json[type] 
    let x = 1;
    let y = 1;
    let width = 1;
    let height = 1;
    // Making sure these are integers at least 1
    $: {
        // if the values are actually found in the json, round them to integers
        // and make them at least 1. Otherwise, leave them undefined for GridItem
        // to know to autoplace.
        // If we do Math operations on "undefined" it becomes NaN so instead we 
        // leave it alone
        x = json?.layout?.x;
        if (x !== undefined) {x = Math.max(1, Math.round(x))}
        y = json?.layout?.y;
        if (y !== undefined) {y = Math.max(1, Math.round(y))}

        // Min width and height are from the element properties
        //(specific to the dashboard, not the code layout json)
        let minWidth = elementData[type].layout.minWidth
        let minHeight = elementData[type].layout.minHeight

        width = json?.layout?.width;
        if (width !== undefined) {width = Math.max(minWidth, Math.round(width))}
        height = json?.layout?.height;
        if (height !== undefined) {height = Math.max(minHeight, Math.round(height))}
        json;
    }
</script>
{#if valid}
<GridItem x={x} y={y} width={width} height={height}>
    <svelte:component this={elementData[type].component} data={data} name={name} {...meta}></svelte:component>
</GridItem>
{/if}
