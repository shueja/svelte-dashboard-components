<script>
	import GridItem from "./web-components/layout/GridItem.svelte";
	import GridLayout from "./web-components/layout/GridLayout.svelte";
	import NT from "./web-components/util/NT";
    import Timer from "./web-components/components/Timer.svelte";
	import  "@frc-web-components/fwc/components/sendable-chooser"
    import PlumbedGrid from "./PlumbedGrid.svelte";
    import PlumbedChooser from "./PlumbedChooser.svelte";


	NT.setIP("127.0.0.1");
	let count = NT.NTInt(0, "SmartDashboard/count");
	let time = NT.NTInt(-1, "/SmartDashboard/matchTime");
</script>
<style>
	:global(div) {
		box-sizing: border-box;
	}
	:global(html){
		--background-contrast-color: white;
		--background-color:black;
	}
	:global(body) {
		padding:8px;
		background-color: var(--background-color);
		width:100vw;
		height:100vh;
	}
</style>

<main style="width:100%; height:100%; box-sizing:border-box">
	<GridLayout rows={9} columns={9}>
		<GridItem height={2} x={1} y={1} width={6}>
			<PlumbedGrid selectionKey="SmartDashboard/count"></PlumbedGrid>
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
</main>