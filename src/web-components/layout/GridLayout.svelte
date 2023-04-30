<script>
    export let columns;
    export let rows;
    export let square=true;
    let gridWidth;
    let gridHeight;
    let unitHeight = undefined;
    let unitWidth = undefined;
    let columnsCSS;
    let rowsCSS;
    $: if (!square) {
        columnsCSS = `repeat(${columns}, calc(${gridWidth}px / ${columns}))`
        rowsCSS = `repeat(${rows}, calc(${gridHeight}px / ${rows}))`
    } else {
        columnsCSS = `repeat(${columns}, calc(${gridWidth}px / ${columns}))`
        rowsCSS = `repeat(${rows}, calc(${gridWidth}px / ${columns}))`
    }
</script>
<div bind:clientHeight={gridHeight} bind:clientWidth={gridWidth}
    style="
    display:grid;
    width: 100%;
    height: 100%;
    grid-template-columns:{columnsCSS};
    grid-template-rows:{rowsCSS};">
<slot/>
</div>