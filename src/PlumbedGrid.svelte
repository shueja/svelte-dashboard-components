<script>
    import NT from "./web-components/util/NT";
	import Grid from "./web-components/components/ScoringGrid.svelte";
	export let selectionKey;
    let selection = NT.NTInt(0, selectionKey);
    let cubesScored = [];
	let conesScored = [];
	$: {$selection; 
		if ($selection % 3 == 1) {
			cubesScored.push($selection); cubesScored=cubesScored
		}
		else {
			conesScored.push($selection); conesScored=conesScored
		}
		if ($selection < 9) {
			cubesScored.push($selection); cubesScored=cubesScored
		}
	}
</script>

<Grid selection={$selection} selectCallback={(val)=>{console.log(val); $selection = val}} cubesScored={cubesScored} conesScored={conesScored}></Grid>