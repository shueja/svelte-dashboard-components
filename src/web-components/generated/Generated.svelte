<script lang="ts">
    import GeneratedTab from "./GeneratedTab.svelte";
    export let json;
    let tabs = [];
    let layout = {tabs:[]}
    $: {
        console.log(json)
        let layout = JSON.parse(json);
        tabs = (layout.hasOwnProperty("tabs") && Array.isArray(layout.tabs)) ? layout.tabs: [];
        console.log(layout);
    }
    
</script>

{#each tabs as tab}
<GeneratedTab layout={tab}/>
{/each}

