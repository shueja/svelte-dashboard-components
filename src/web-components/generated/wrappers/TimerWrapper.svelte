<script>
    import Timer from "../../components/Timer.svelte";
    import NT from "../../util/NT";
    export let name;
    export let data;
    export let meta;
    let valueTopic = NT.NTDouble(-1, data);
</script>
<Timer label={name} value={$valueTopic}></Timer>