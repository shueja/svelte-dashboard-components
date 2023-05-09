<script>
    import GeneratedElement from "./GeneratedElement.svelte";
    export let layout;
    console.log(layout)
    let tabName = "";
    let elements = [];
    $: {
        tabName = (layout.hasOwnProperty("name") && typeof layout.name == "string") ? layout.name: "";
        console.log(tabName);
        layout = layout;
    }
    $: {
        elements = (layout.hasOwnProperty("elements") && Array.isArray(layout.elements)) ? layout.elements: [];
        console.log(elements)
        elements = elements.filter(element => {
            if (!element.hasOwnProperty("name") || !typeof element.name == "string") {return false;}
            if (!element.hasOwnProperty("type") || !typeof element.type == "string") {return false;}
            return true;
        });
        layout = layout}
</script>

{#each elements as element}
<GeneratedElement json={element}></GeneratedElement>
{/each}