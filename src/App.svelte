<script>
	import GridLayout from "./web-components/layout/GridLayout.svelte";
	import NT from "./web-components/util/NT";
    
    import Generated from "./web-components/generated/Generated.svelte";
    import layout from "../public/layout/layout.json"
    // Add custom elements for code-driven layouts
    import PlumbedGrid from "./PlumbedGrid.svelte";
    import {addElement} from "./web-components/generated/elements"
    addElement("grid", PlumbedGrid);
    //let layoutString = "{}"
    async function fetchLayout() {
        let json = await fetch("layout/layout.json")
        let body = await json.json();
            let layoutString = JSON.stringify(body)
            console.log(body)
            return layoutString
    }

    const fetchPromise = fetchLayout();

    
    //console.log(JSON.stringify(layout))


    let json = NT.NTString("{}", "/SmartDashboard/json")
    
</script>

<GridLayout rows={9} columns={12} showLines={false}>
    {#await fetchPromise}
        <p>loading JSON layout</p>
    {:then layoutString} 
        <Generated json={layoutString}></Generated>
    {/await}
    
</GridLayout>