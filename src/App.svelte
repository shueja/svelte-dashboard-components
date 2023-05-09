<script>
	import GridLayout from "./web-components/layout/GridLayout.svelte";
	import NT from "./web-components/util/NT";
    
    import Generated from "./web-components/generated/Generated.svelte";
    import layout from "./layout.json"
    // Add custom elements for code-driven layouts
    import PlumbedGrid from "./PlumbedGrid.svelte";
    import {addElement} from "./web-components/generated/elements"
    addElement("grid", PlumbedGrid);


    let json = NT.NTString("{}", "/SmartDashboard/json")
    
</script>

<GridLayout rows={9} columns={12} showLines={false}>
    <Generated json={$json}></Generated>
</GridLayout>