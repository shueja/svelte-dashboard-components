<script>
    export let time;
    export let max = 135.0;
    export let hms=false;
    export let showBar=true;
    let w;
    let h;
</script>
<style>
    .container {
        width:100%;
        height: 100%;
        text-align:center;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        --timer-bar-color: var(--frc-timer-bar-color, white);
        --timer-text-color: var(--frc-timer-text-color, white);
        color:var(--timer-text-color);
        border:2px solid var(--timer-bar-color);

    }
    .bar {
        height:10%;
        background:var(--timer-bar-color);
        align-self: end;
        
    }
</style>
<div class="container" style=" font-size:calc(0.5 * min({w}px,{h}px));"
    bind:clientWidth={w} bind:clientHeight={h}>
    <div style="height:10%; width:100%"></div>
    {time === -1 ? "--": `${Math.floor(time / 60).toFixed(0)}:${(time % 60).toFixed(2).toString().padStart(5, '0')}`}
    <div class="bar" style="width:calc(100% * max(0, min({max == 0 ? 0 : time / max}, 1)));"></div>
</div>