<script>
    export let x = 1;
    export let y = 1;
    export let height = 1;
    export let width = 1;

</script>

<div style="grid-column: {x}/ span {width}; grid-row: {y} / span {height}">
<slot/>
</div>