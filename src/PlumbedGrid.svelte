<script>
    import NT from "svelte-web-components/util/NT";
	import Grid from "svelte-web-components/components/ScoringGrid.svelte";
	import "core-js/es/array/to-spliced"
	export let data;
	export let name;
	
    let selection = NT.NTInt(0, data);
    export let cubesScored = [];
	export let conesScored = [];
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
<script context="module" lang="ts">
	import { WidgetDefinition } from "./generated/elementTypeDefs";
export let config : WidgetDefinition = {
	"name": "Node Grid",
	"id": "grid",
	"data": {
			type: "string",
			default: "",
			description: "The NT path to the current selected node"
		},
	"properties": {
		"cubesScored": {
			type: "integerarray",
			default: [0],
			description: "The node IDs for each scored cube"
		}
	}
};
</script>

<Grid selection={$selection} selectCallback={(val)=>{console.log(val); $selection = val}} cubesScored={cubesScored} conesScored={conesScored}></Grid>