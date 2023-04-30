<script>
    export let table;

    import NT from "./web-components/util/NT";
    import  "@frc-web-components/fwc/components/sendable-chooser"
    let options = NT.NTStringArray([], `${table.replace(/\/$/, '')}/options`);
	let selected = NT.NTString("", `${table.replace(/\/$/, '')}/selected`)
	let active = NT.NTString("", `${table.replace(/\/$/, '')}/active`)
</script>

<frc-sendable-chooser options={$options} active={$active} default={$active}
    on:change={(e)=>$selected= e.detail.selected}></frc-sendable-chooser>
