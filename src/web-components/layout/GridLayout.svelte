<script>
    export let columns;
    export let rows;
    export let unitHeight = undefined;
</script>
<div style="
    display:grid;
    width: 100%;
    height: 100%;
    grid-template-columns:repeat({columns}, {unitHeight==undefined ? `calc(100%/${columns})` : unitHeight}); grid-template-rows:repeat({rows}, calc(100%/{rows}))">
<slot/>
</div>