<script lang="ts">
    import GridItem from "svelte-web-components/layout/GridItem.svelte";
    import "@frc-web-components/fwc/components"
    import {DashboardElement} from "../../generated/layout"
    import {elementData} from "../../generated/elements"
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
    
    
        afterUpdate(()=>console.log("Rendering", $name))
    </script>
    {#if valid}
        <svelte:component this={elementData[$type].component} data={$data} name={$name} {...$meta}></svelte:component>
    {/if}
    