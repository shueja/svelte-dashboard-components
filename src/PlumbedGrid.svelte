<script>
    import NT from "svelte-web-components/util/NT";
	import Grid from "svelte-web-components/components/ScoringGrid.svelte";
	export let data;
	export let name;
	export let meta;
	
    let selection = NT.NTInt(0, data);
    let cubesScored = [];
	let conesScored = [];
	// $: {$selection; 
	// 	if ($selection % 3 == 1) {
	// 		cubesScored.push($selection); cubesScored=cubesScored
	// 	}
	// 	else {
	// 		conesScored.push($selection); conesScored=conesScored
	// 	}
	// 	if ($selection < 9) {
	// 		cubesScored.push($selection); cubesScored=cubesScored
	// 	}
	// }
</script>

<Grid selection={$selection} selectCallback={(val)=>{console.log(val); $selection = val}} cubesScored={cubesScored} conesScored={conesScored}></Grid>