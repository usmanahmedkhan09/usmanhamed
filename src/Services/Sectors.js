import axios from './http-common'
import common from './common'
const service = 'EntitySector';
export default {
    getAllEntitySectors : function(){
        return axios.get(`/${service}/GetAll`).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    }
}