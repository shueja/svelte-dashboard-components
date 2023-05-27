<script>

    export let name;
    export let data;
    export let resolutionX;
</script>

<script context="module" lang="ts">
        import {WidgetDefinition, PropertyDefinition} from "../elementTypeDefs"
    export let config : WidgetDefinition = {
        "name": "Camera Stream",
        "id": "camera",
        "data": {
                type:"string",
                default:"about:blank",
                description:"The IP of the camera stream"
            },
        "properties": {

            "resolutionX": {
                type:"integer",
                default:640,
                description:"The horizontal width (px) of the stream",
                displayName: "X Resolution"
            }
        }
    };
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<iframe src={data} style="width:100%; height:100%" title={name}>{resolutionX}</iframe>