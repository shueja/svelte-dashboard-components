import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
import { writable } from 'svelte/store';
import { onDestroy } from 'svelte';

class NT {
    constructor(ip) {
        this.ip = ip;
        this.nt  = NetworkTables.getInstanceByURI(ip);
        this.ntSubscribers = {}
    }

    setIP(ip) {
        if(this.ip !== ip) {
            this.nt.changeURI(ip);
        }
        this.ip = ip;        
    }
    NTValue(init, key, topicType) {
        if (this.ntSubscribers[key] !== undefined) {
            return this.ntSubscribers[key];
        }
        console.log("new subscriber for", key, "existing", this.ntSubscribers);
        let _val = init;
        const subs = [];
        let topic = this.nt.createTopic(key, topicType);
        topic.subscribe((value)=>{
                _val = value;
                subs.forEach((fn) => fn(_val));
            }
        );
        topic.publish();

        onDestroy(()=>{
            topic.unpublish();
            topic.unsubscribe();
        })
        
        const subscribe = (cb) => {
            subs.push(cb);
            cb(_val);
        
            return () => {
                const index = subs.findIndex((fn) => fn === cb);
                subs.splice(index, 1);
            };
        };
        
        const set = (v) => {
            topic.setValue(v);
            _val = v;
            subs.forEach((fn) => fn(_val));
        };
        
        const update = (fn) => set(fn(_val));
        const type = () => topicType;
        const ret = { subscribe, set, update, type};
        this.ntSubscribers[key] = ret;
        return ret;
    }

    NTInt(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kInteger) }
    NTDouble(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kDouble) }
    NTBoolean(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kBoolean) }
    NTString(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kString) }
    NTIntArray(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kIntegerArray) }
    NTDoubleArray(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kDoubleArray) }
    NTBooleanArray(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kBooleanArray) }
    NTStringArray(init, key){return this.NTValue(init, key, NetworkTablesTypeInfos.kStringArray) }
    
}




export default new NT("127.0.0.1");