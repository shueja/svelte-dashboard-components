<script lang="ts">
    import GridItem from "./GridItem.svelte";
    import ChooserWrapper from "./wrappers/ChooserWrapper.svelte";

    export let json;
    // These are objects but we only use the keys array
    let elementTypes = {
        "gyro": {},
        "drive": {},
        "graph": {},
        "chooser":{}
    }

    $: type = json.type;
    $: name = json.name;
    let valid = true;
    $: if (!Object.keys(elementTypes).includes(type)) {
                console.log(`Invalid element type ${type} not in ${Object.keys(elementTypes)}`);
                valid = false;
        }
    $: data = json.data;
    $: x = json?.layout?.x;
    $: y = json?.layout?.y;
    $: width = json?.layout?.width;
    $: height = json?.layout?.height;
</script>
<style>

    span {
        color:white;
        
    }
</style>
{#if valid}
<GridItem x={x} y={y} width={width} height={height}>
    {#if (type === "graph")}
        <span>graph Name={name} from:{data}</span>
    {:else if (type === "gyro")}
        <span>gyro Name={name} from:{data}</span>
    {:else if (type === "chooser")}
        <ChooserWrapper table={data} name={name}></ChooserWrapper>
    {/if}
</GridItem>
{/if}
