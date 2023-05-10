<script>
    import GeneratedTab from "./GeneratedTab.svelte";
    import Ajv2020 from "ajv/dist/2020"
    import * as schema from "./layout.schema.json"
    export let json = "{}";
    console.log(schema)
    const ajv = new Ajv2020()

    const parse = ajv.compile(schema)
    let tabs = [];
    $: {
        console.log(json)
        let layout = JSON.parse(json);
        if (parse(layout)) {
            tabs = layout.tabs;
            console.log(layout);
        }
        else {
            tabs = [];
            console.warn(parse.errors) // error message from the last parse call
            //console.error(parse.position) // error position in string
        }
        
    }

    function isValidLayout (layout){
        return (layout.hasOwnProperty("tabs") && Array.isArray(layout.tabs));
    } 
    
</script>

{#each tabs as tab}
<GeneratedTab layout={tab}/>
{/each}

