import * as firebase from "firebase";
import 'firebase/firestore'
import myMoment from './MyMoment'

const config = {
    apiKey: "AIzaSyBr_8dPvdG5ddSzsR3jazrRZE-2ZCNJOnE",
    authDomain: "fuel-5a718.firebaseapp.com",
    databaseURL: "https://fuel-5a718.firebaseio.com",
    projectId: "fuel-5a718",
    storageBucket: "fuel-5a718.appspot.com",
    messagingSenderId: "810510314769"
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

export default class Dao {
    constructor(collection) {
        this.collection = collection;
    }

    async save(item) {
        const id = item.id;
        delete item.id;
        if (id) {
            item.updatedAt = myMoment.isoDateTime();
            return db.collection(this.collection).doc(id).set(item)
        } else {
            item.createdAt = myMoment.isoDateTime(item.createdAt);
            return db.collection(this.collection).add(item);
        }
    }

    async list() {
        let snapshot = await db.collection(this.collection).get();
        const list = [];
        snapshot.forEach(doc => {
            let item = doc.data();
            list.push(item);
            item.id = doc.id;
            item.key =  item.id + Math.random();
        });
        return list.sort((a, b) => myMoment.compare(a.createdAt, b.createdAt))
    }

    async delete(id){
        return db.collection(this.collection).doc(id).delete()
    }

    static instance(collection) {
        return new Dao(collection)
    }
}