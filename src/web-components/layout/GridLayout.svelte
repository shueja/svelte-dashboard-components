<script>
    export let columns;
    export let rows;
    export let square=true;
    export let showLines;
    let gridWidth;
    let gridHeight;
    let unitHeight = undefined;
    let unitWidth = undefined;
    let columnsCSS;
    let rowsCSS;
    $: if (!square) {
        unitHeight = gridHeight / rows;
        unitWidth = gridWidth / columns;
        columnsCSS = `repeat(${columns}, ${unitWidth}px)`
        rowsCSS = `repeat(${rows}, ${unitHeight}px )`
    } else {
        unitHeight = gridWidth/columns;
        unitWidth = gridWidth/columns;
        columnsCSS = `repeat(${columns}, ${unitHeight}px)`
        rowsCSS = `repeat(${rows}, ${unitWidth}px)`
    }
</script>
<div bind:clientHeight={gridHeight} bind:clientWidth={gridWidth}
    style="
    display:grid;
    width: 100%;
    height: 100%;
    grid-template-columns:{columnsCSS};
    grid-template-rows:{rowsCSS};

    {showLines ? `
    background-size: ${unitHeight}px ${unitWidth}px;
    background-image:
    linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);`:""}">
<slot/>
</div>