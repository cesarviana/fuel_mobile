import myMoment from './MyMoment'

import {AsyncStorage} from 'react-native'

export default class LocalDao {
    static async save(item) {
        const NEW_ITEM = item.id === undefined;
        const id = item.id || this.createUniqueId();
        if(NEW_ITEM) {
            item.createdAt = myMoment.isoDateTime();
        } else {
            item.updatedAt = myMoment.isoDateTime()
        }
        delete item.id;
        const json = JSON.stringify(item);
        AsyncStorage.setItem(id, json);
    }

    static createUniqueId() {
        return Math.random().toString() + "" + myMoment.isoDateTime();
    }

    static async list() {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        return result.map(arrayKeyValue => {
            const obj = JSON.parse(arrayKeyValue[1]);
            obj.id = arrayKeyValue[0];
            obj.key = this.createUniqueId();
            return obj
        }).sort((a,b)=>myMoment.compare(a.createdAt, b.createdAt));
    }

    static async delete(id) {
        return AsyncStorage.removeItem(id);
    }
}