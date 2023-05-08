<script>
    export let x = undefined;
    export let y = undefined;
    export let height = undefined;
    export let width = undefined;
    $: autoPlace = (x === undefined) || (y === undefined)
    $: autoSize = (height === undefined) || (width === undefined)
    let css = ""
    $: {
        css = ""
        if (!autoPlace) {
            css += `grid-column-start:${x}; grid-row-start:${y};`
        }
        if (!autoSize) {
            css += `grid-column-end: span ${width}; grid-row-end: span ${height}`
        }

    }
</script>
<style>
    .grid-item {
        border:2px solid red
    }
</style>
<div class="grid-item" style={css}>
<slot/>
</div>