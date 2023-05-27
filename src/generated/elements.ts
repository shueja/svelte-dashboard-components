import ChooserWidget, {config as ChooserWidgetConfig} from "./wrappers/ChooserWrapper.svelte";
import GyroWidget, {config as GyroWidgetConfig} from "./wrappers/GyroWrapper.svelte";
import DifferentialDrivebaseWidget from "./wrappers/DifferentialDrivebaseWrapper.svelte";
import GraphWidget from "./wrappers/GraphWrapper.svelte";
import TimerWidget from "./wrappers/TimerWrapper.svelte";
import FMSInfoWidget, {config as FMSInfoWidgetConfig} from "./wrappers/FMSInfoWrapper.svelte";
import CameraWidget, {config as CameraWidgetConfig} from "./wrappers/CameraWrapper.svelte"
import Timer from "svelte-web-components/components/Timer.svelte";
import { ComponentType, SvelteComponent, SvelteComponentTyped } from "svelte";
import { WidgetDefinition, WidgetRegistry } from "./elementTypeDefs";

Object.assign(CameraWidget, {config: CameraWidgetConfig})



export let widgetDefinitions : WidgetRegistry = {
    "gyro": Object.assign(GyroWidget, {config: GyroWidgetConfig}),
    "chooser": Object.assign(ChooserWidget, {config: ChooserWidgetConfig}),
    "fms-info": Object.assign(FMSInfoWidget, {config: FMSInfoWidgetConfig}),
    "camera": Object.assign(CameraWidget, {config: CameraWidgetConfig}),
}

export let addElement = (id: string, constructor: ComponentType<SvelteComponentTyped>, definition: WidgetDefinition) => {
    widgetDefinitions[id] = Object.assign(constructor, {config: definition});
}
