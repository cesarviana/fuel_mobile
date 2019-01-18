import moment from 'moment'

class MyMoment {
    static fromNow(stringMoment) {
        return moment(stringMoment).fromNow().toString()
    }

    static isoDateTime(date) {
        return moment(date).format();
    }

    static compare(a,b){
        return moment(a).isBefore(moment(b)) ? 1 : -1;
    }
}

export default MyMoment;