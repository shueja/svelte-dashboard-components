<script>
    import NT from "svelte-web-components/util/NT";
	import "@frc-web-components/fwc/components/field/field"
    import "@frc-web-components/fwc/components/field/field-robot"
	export let table;
    let robotPose = NT.NTDoubleArray([], `${table.replace(/\/$/, '')}/Robot`);
    $: radiansRobotPose = [$robotPose[0], $robotPose[1], $robotPose[2] * Math.PI / 180.0]
</script>

<frc-field rotation={90} style="width:100%; height:100%;">
    <frc-field-robot pose={radiansRobotPose}></frc-field-robot>
</frc-field>