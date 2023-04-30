<script>
	import GridItem from "./web-components/layout/GridItem.svelte";
	import GridLayout from "./web-components/layout/GridLayout.svelte";
	import NT from "./web-components/util/NT";
	import Grid from "./web-components/components/ScoringGrid.svelte";
    import Timer from "./web-components/components/Timer.svelte";
	NT.setIP("127.0.0.1");
	let count = NT.NTInt(0, "SmartDashboard/count");
	let time = NT.NTInt(-1, "/SmartDashboard/matchTime");
	// This part would be two NT IntegerArrays
	let cubesScored = [];
	let conesScored = [];
	$: {$count; 
		if ($count % 3 == 1) {
			cubesScored.push($count); cubesScored=cubesScored
		}
		else {
			conesScored.push($count); conesScored=conesScored
		}
		if ($count < 9) {
			cubesScored.push($count); cubesScored=cubesScored
		}
	}
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
		<GridItem height={3} x={1} y={1} width={9}>
			<Grid  selection={count} cubesScored={cubesScored} conesScored={conesScored}></Grid>
		</GridItem>
		<GridItem height={1} x={1} y={4} width={1}>	
			<button style="width:100%; height:100%;" on:click={()=>$count =0}>inc</button>
		</GridItem>
		<GridItem height={1} width={4} x={6} y={4}>
			<Timer time={$time}></Timer>
		</GridItem>
	</GridLayout>
</main>