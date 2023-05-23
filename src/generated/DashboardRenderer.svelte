<script lang="ts">
    import GeneratedTab from "./GeneratedTab.svelte";
    import {subStore} from "immer-loves-svelte"
    import { Layout } from "./layout";
    import { Writable } from "svelte/store";
    import GridLayout from "svelte-web-components/layout/GridLayout.svelte";

    export let layout : Writable<Layout>;
</script>


    {#each $layout.tabs as _, i}
    <GeneratedTab layout={subStore(layout, layout=>layout.tabs[i])}/>
    {/each}

