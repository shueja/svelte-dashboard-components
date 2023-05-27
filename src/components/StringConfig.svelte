<script lang="ts">
    import { Writable } from "svelte/store";
    import { TransactionStore } from "immer-loves-svelte";

    export let value : TransactionStore<String>
</script>

<input type="text" bind:value={$value} on:focusout={value.commit} on:change={value.commit}/>