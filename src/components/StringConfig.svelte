<script lang="ts">
    import {TextInput} from "carbon-components-svelte"
    import { Writable, get } from "svelte/store";
    import { TransactionStore } from "immer-loves-svelte";
    import { PropertyDefinition } from "../generated/elementTypeDefs";

    
    export let store : TransactionStore<string>
    export let propertyDefinition : PropertyDefinition<"string">
    let componentValue : null | string | number = get(store).toString();
    $: {
        if (componentValue === null) {componentValue = ""}
       else if (typeof componentValue === "number") {componentValue = `${componentValue}`}
       $store = componentValue
    }
    


</script>

<TextInput type={"text"} bind:value={componentValue} placeholder={propertyDefinition.displayName} labelText={propertyDefinition.displayName} inline={true}></TextInput>
<!-- <input type="text" bind:value={$value} on:focusout={value.commit} on:change={value.commit}/> -->