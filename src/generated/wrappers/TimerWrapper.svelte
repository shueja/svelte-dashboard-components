<script>
    import Timer from "svelte-web-components/components/Timer.svelte";
    import NT from "svelte-web-components/util/NT";
    export let name;
    export let data;
    export let meta;
    let valueTopic = NT.NTDouble(-1, data);
</script>
<Timer label={name} value={$valueTopic}></Timer>