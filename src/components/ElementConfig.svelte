<script lang="ts">
    import { subStore, transactionStore } from "immer-loves-svelte";
    import { Writable } from "svelte/store";
    import { DashboardElement } from "../generated/layout";
    import {elementData} from "../generated/elements";


    export let config :Writable<DashboardElement>

    let x = subStore(config, c=>c.layout.x);
    let name = transactionStore<String>(subStore(config, c=>c.name))
    let type = transactionStore<String>(subStore(config, c=>c.type))
    let data = transactionStore<String | Array<String>>(subStore(config, c=>c.data))
</script>
<div style="width:100%">
<input type="text" bind:value={$name} on:focusout={name.commit} on:change={name.commit}/>
<input type="text" bind:value={$data} on:focusout={data.commit} on:change={data.commit}/>
<select bind:value={$type} on:change={type.commit}>
    {#each Object.keys(elementData) as type}
        <option value={type}>{type}</option>
    {/each}
</select>
</div>