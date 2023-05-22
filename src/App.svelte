<script>
	import GridLayout from "svelte-web-components/layout/GridLayout.svelte";
	import NT from "svelte-web-components/util/NT";
    import ConfigPanel from "./components/ConfigPanel.svelte";
    import DashboardRenderer from "./generated/DashboardRenderer.svelte";
    import layout, {validate} from "./generated/layout"
    // Add custom elements for code-driven layouts
    import PlumbedGrid from "./PlumbedGrid.svelte";
    import {addElement} from "./generated/elements"
    import { subStore } from "immer-loves-svelte";
    addElement("grid", PlumbedGrid);

    let nonce = 0;
    //let layoutString = "{}"
    async function fetchLayout() {
        let json = await window.localStorage.getItem("frc-dashboard-layout")//await fetch("layout/layout.json")
        // let body = await json.json();
        // let layoutString = JSON.stringify(body)
        layout.setFromString(json)
        nonce ++;
        return json
    }

    const fetchPromise = fetchLayout();

    
    //console.log(JSON.stringify(layout))
    let x = subStore(layout, layout=>layout.tabs[0].elements[0].layout.x);
    //setInterval(()=>$x = ($x % 3) + 1, 1000)

    let json = NT.NTString("{}", "/SmartDashboard/json")
    
</script>
{#key nonce}
<div style="display:flex; width:100%; height:100%">
    <ConfigPanel layout={layout}></ConfigPanel>
    <DashboardRenderer layout={layout}></DashboardRenderer>
</div>
{/key}


    