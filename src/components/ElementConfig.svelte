<script lang="ts">
    import { subStore, transactionStore } from "immer-loves-svelte";
    import { Writable } from "svelte/store";
    import { DashboardElement } from "../generated/layout";
    import {elementData} from "../generated/elements";


    export let config :Writable<DashboardElement>

    let x = subStore(config, c=>c.layout.x);
    let name = transactionStore<String>(subStore(config, c=>c.name))
    let type = transactionStore<String>(subStore(config, c=>c.type))
</script>
<div style="width:100%">
<button on:click={()=>$x--}/>
<button on:click={()=>$x++}/>
<input type="text" bind:value={$name} on:focusout={name.commit} on:change={name.commit}/>
<select bind:value={$type} on:change={type.commit}>
    {#each Object.keys(elementData) as type}
        <option value={type}>{type}</option>
    {/each}
</select>
</div>