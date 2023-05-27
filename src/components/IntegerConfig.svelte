<script lang="ts">
    import { Writable } from "svelte/store";
    import { TransactionStore, subStore, transactionStore } from "immer-loves-svelte";
    import { PropertyDefinition } from "../generated/elementTypeDefs";

    export let propertyDefinition : PropertyDefinition<"integer">
    export let store :TransactionStore<Number>
    console.log ("Creating Integer Config Field")
</script>

<input type="number" placeholder={propertyDefinition.displayName.toString()} bind:value={$store} on:focusout={store.commit} on:change={store.commit}/>