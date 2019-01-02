import Dao from './Dao'

class FuelService {
    async save(refuelling) {
        return Dao.instance('refuelling').save(refuelling);
    }
    async list(){
        return Dao.instance('refuelling').list()
    }
}

export default new FuelService();