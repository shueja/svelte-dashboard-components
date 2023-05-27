<script lang="ts">
    import { Writable } from "svelte/store";
    import {NumberInput} from "carbon-components-svelte"
    import { TransactionStore, subStore, transactionStore } from "immer-loves-svelte";
    import { PropertyDefinition } from "../generated/elementTypeDefs";

    export let propertyDefinition : PropertyDefinition<"integer">
    export let store :TransactionStore<number>
    console.log ("Creating Integer Config Field")
</script>

<NumberInput bind:value={$store} placeholder={propertyDefinition.displayName} label={propertyDefinition.displayName} helperText={propertyDefinition.description}></NumberInput>
<!-- <input type="number" placeholder={propertyDefinition.displayName} bind:value={$store} on:focusout={store.commit} on:change={store.commit}/> -->