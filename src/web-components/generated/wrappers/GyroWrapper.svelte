<script>
    export let data;
    export let name = "Gyro";
    console.log(data)
    import NT from "../../util/NT";
    import  "@frc-web-components/fwc/components/gyro"
    let valueTopic = NT.NTDouble(0.0, data);
    $: console.log($valueTopic)
</script>

<frc-gyro style="width:100%; height:100%; background:white;" value={$valueTopic} label={name}></frc-gyro>