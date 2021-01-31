import axios from './http-common'
import common from './common'
const service = 'YearlySave';
export default {

    create: function(data){
        return axios.post(`/${service}/CreateYearlySave`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
    update: function(data){
        return axios.put(`/${service}/Update`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })

    },
    delete: function(survey_id) {
        return axios.delete(`/${service}/Delete/`+survey_id).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    get: function(survey_id) {        
        return axios.get(`/${service}/Get`,{
            params: {
              id: survey_id
            }
          }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getAll: function(obj){
        return axios.get(`/${service}/GetAll`, {
            params: obj
        }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    }

}