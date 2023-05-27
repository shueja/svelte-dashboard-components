<script>
    import GridItem from "svelte-web-components/layout/GridItem.svelte";
	import GridLayout from "svelte-web-components/layout/GridLayout.svelte";
	import NT from "svelte-web-components/util/NT";
    import ConfigPanel from "./components/ConfigPanel.svelte";
    import DashboardRenderer from "./generated/DashboardRenderer.svelte";
    import layout, {validate} from "./generated/layout"
    // Add custom elements for code-driven layouts
    import PlumbedGrid from "./PlumbedGrid.svelte";
    import {addElement} from "./generated/elements"
    import { subStore } from "immer-loves-svelte";
    import SelectionLayer from "./components/select/SelectionLayer.svelte";
    import { afterUpdate } from "svelte";
    //addElement("grid", PlumbedGrid);

    // This exists to be able to trigger a full dashboard rerender when opening a new layout file.
    let nonce = 0;
    //let layoutString = "{}"
    async function fetchLayout() {
        let json = await window.localStorage.getItem("frc-dashboard-layout")
        console.log("loading layout from local storage", json)
        if (json === null) {
          let file = await fetch("layout/layout.json")
          json = JSON.stringify(await file.json());
          console.log("loading layout from file", json)
        }
        

        layout.setFromString(json)
        console.log("after parsing", $layout);
        nonce ++;
        return json
    }

    const fetchPromise = fetchLayout();

    
    //console.log(JSON.stringify(layout))
    let x = subStore(layout, layout=>layout.tabs[0].elements[0].layout.x);

    let selectedIndex = 0;
    //setInterval(()=>$x = ($x % 3) + 1, 1000)

    let json = NT.NTString("{}", "/SmartDashboard/json")
    let inConfigMode = false;
    afterUpdate(()=>{console.warn("Rendering Full App")})
</script>
{#key nonce}
<div style="width:100%; height:100%; display:flex">
    <ConfigPanel layout={layout} selectedTab={0} selectedIndex={selectedIndex} expanded={inConfigMode}></ConfigPanel>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div style="flex: 0 0 1; width:10px; min-width:10px; height:100%;background:rgb(100, 100, 100)" on:click={()=>inConfigMode = !inConfigMode}> >>></div>
    <div style="flex-grow:1">
        
        <GridLayout cellHeight={50} cellWidth={50} showLines={true}>

             <DashboardRenderer layout={layout}></DashboardRenderer>
             {#if inConfigMode}
            <div style="position:absolute; top:0; left:0; width:{50 * 50}px; height: {50 * 50}">
                <SelectionLayer tab={subStore(layout, l=>l.tabs[0])} bind:selectedIndex></SelectionLayer>
            </div>
            {/if}
            
        </GridLayout>
    </div>

</div>
{/key}


    