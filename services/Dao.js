import * as firebase from "firebase";
import 'firebase/firestore'

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
        item.createdAt = Date.now();
        return db.collection(this.collection).add(item);
    }

    async list(){
        return db.collection(this.collection).get()
    }

    static instance(collection) {
        return new Dao(collection)
    }
}