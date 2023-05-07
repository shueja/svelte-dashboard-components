<script>
	import GridItem from "./web-components/layout/GridItem.svelte";
	import GridLayout from "./web-components/layout/GridLayout.svelte";
	import NT from "./web-components/util/NT";
    import Timer from "./web-components/components/Timer.svelte";
    import PlumbedGrid from "./PlumbedGrid.svelte";
    import PlumbedChooser from "./PlumbedChooser.svelte";
    import PlumbedField from "./PlumbedField.svelte";

	let count = NT.NTInt(0, "SmartDashboard/count");
	let time = NT.NTInt(-1, "/DriverDisplay/matchTime");
</script>

<GridLayout rows={9} columns={12}>
    <GridItem height={3} x={1} y={1} width={9}>
        <PlumbedGrid selectionKey="/DriverDisplay/selection"></PlumbedGrid>
    </GridItem>
    <GridItem height={5} x={10} y={1} width={3}>
        <PlumbedField table={"/Shuffleboard/RobotContainer/m_field"}></PlumbedField>
    </GridItem>
    <GridItem height={1} x={5} y={4} width={1}>	
        <button style="width:100%; height:100%;" on:click={()=>$count =0}>inc</button>
    </GridItem>
    <GridItem height={1} width={4} x={1} y={4}>
        <PlumbedChooser table="/SmartDashboard/Auto choices"/>	
    </GridItem>
    <GridItem height={1} width={4} x={6} y={4}>
        <Timer time={$time}></Timer>
    </GridItem>
</GridLayout>