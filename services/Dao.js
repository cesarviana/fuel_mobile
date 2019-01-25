import myMoment from './MyMoment'

import {AsyncStorage} from 'react-native'

export default class LocalDao {
    static async save(item) {
        const NEW_ITEM = item.id === undefined;
        if(NEW_ITEM) {
            item.id = this.createUniqueId();
            item.createdAt = myMoment.isoDateTime()
        }
        if (!NEW_ITEM) {
            item.updatedAt = myMoment.isoDateTime()
        }
        return AsyncStorage.setItem(item.id, JSON.stringify(item));
    }

    static createUniqueId() {
        return Math.random().toString() + "" + myMoment.isoDateTime();
    }

    static async list() {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        return result.map(arrayKeyValue => {
            const obj = JSON.parse(arrayKeyValue[1]);
            obj.key = this.createUniqueId();
            return obj
        });
    }

    static async delete(id) {
        return AsyncStorage.removeItem(id);
    }
}