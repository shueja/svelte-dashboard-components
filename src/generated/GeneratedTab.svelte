<script lang="ts">
    import { Writable, get } from "svelte/store";
    import GeneratedElement from "./GeneratedElement.svelte";
    import { Tab } from "./layout";
    import { subStore } from "immer-loves-svelte";
    export let layout : Writable<Tab>;
    //console.log(layout)
    let tabName = $layout.name;
    $: console.log(layout)
    let elements = subStore(layout, l=>l.elements);
</script>

{#each $elements as element, i}
<GeneratedElement json={subStore(layout, (layout)=> layout.elements[i])}></GeneratedElement>
{/each}