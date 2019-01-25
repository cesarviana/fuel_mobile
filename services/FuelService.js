import Dao from './Dao'

class FuelService {
    static async save(refuelling) {
        return Dao.save(refuelling);
    }
    static async list(){
        return Dao.list()
    }
    static async delete(id){
        return Dao.delete(id)
    }
}

export default FuelService;