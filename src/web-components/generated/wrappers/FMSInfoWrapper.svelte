<script>
    import "@frc-web-components/fwc/dist/components/basic-fms-info.es"
    import NT from "../../util/NT";
    export let name;
    export let data;
    export let meta;
    let fmsControlData = NT.NTInt(0,"/FMSInfo/FMSControlData")
    let matchNumber = NT.NTInt(0,"/FMSInfo/MatchNumber")
    let matchType = NT.NTInt(0,"/FMSInfo/MatchType")
    let eventName = NT.NTString("Event", "/FMSInfo/EventName")
    $: console.log($fmsControlData)
</script>

<frc-basic-fms-info style="width:100%;height:100%;background:white"
    fms-control-data={$fmsControlData}
    match-number={$matchNumber}
    match-type={$matchType}
    event-name={$eventName}></frc-basic-fms-info>