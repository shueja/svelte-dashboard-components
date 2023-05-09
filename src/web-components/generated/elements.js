import ChooserWrapper from "./wrappers/ChooserWrapper.svelte";
import GyroWrapper from "./wrappers/GyroWrapper.svelte";
import DifferentialDrivebaseWrapper from "./wrappers/DifferentialDrivebaseWrapper.svelte";
import GraphWrapper from "./wrappers/GraphWrapper.svelte";
import TimerWrapper from "./wrappers/TimerWrapper.svelte";
import FMSInfoWrapper from "./wrappers/FMSInfoWrapper.svelte"


let rawElementData = {
    "gyro": {
        component: GyroWrapper,
        layout: {
            minWidth: 3,
            minHeight:3,
        },
        defaultMeta: {},
        name: "Gyro"
    },
    "drive": {
        component: DifferentialDrivebaseWrapper
    },
    "graph":{
        component: GraphWrapper
    },
    "chooser":{
        component: ChooserWrapper
    },
    "timer":{component: TimerWrapper},
    "fms-info": {component: FMSInfoWrapper}
}



export let elementData = {}


let defaultData = {
    layout: {
        minWidth:1,
        minHeight:1
    },
    defaultMeta: {}
}
export function addElement(type, element, config={}){
    // We assign the config data onto a new object created from the default data
    // This effectively "fills out" the config object where the default data has properties
    // the config is missing
    config = Object.assign(Object.create(defaultData), config);
    config.name = type;
    config.component = element;
    elementData[type] = config;
}

Object.keys(rawElementData).forEach(type=>{
    addElement(type, rawElementData[type].component, rawElementData[type]);
})

export function getElement() {}