<script>
    export let data;
    export let name = "Chooser";
    import NT from "svelte-web-components/util/NT";
    import  "@frc-web-components/fwc/components/sendable-chooser"
    let options = NT.NTStringArray([], `${data.replace(/\/$/, '')}/options`);
	let selected = NT.NTString("", `${data.replace(/\/$/, '')}/selected`)
	let active = NT.NTString("", `${data.replace(/\/$/, '')}/active`)
</script>

<frc-sendable-chooser options={$options} active={$active} default={$active} label={name}
    on:change={(e)=>$selected= e.detail.selected}></frc-sendable-chooser>
