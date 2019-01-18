import Dao from './Dao'

class FuelService {
    static async save(refuelling) {
        return Dao.instance('refuelling').save(refuelling);
    }
    static async list(){
        return Dao.instance('refuelling').list()
    }
    static async delete(id){
        return Dao.instance('refuelling').delete(id)
    }
}

export default FuelService;