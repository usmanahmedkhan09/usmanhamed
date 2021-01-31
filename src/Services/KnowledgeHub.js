import axios from './http-common'
import common from './common'
const service = 'KnowledgeCenter';
export default {
    createKnowledge: function(data){
        return axios.post(`/${service}/CreateKnowledgeCenter`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
    updateUser: function(data){
        return axios.put(`/${service}/Update`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })

    },
    delete: function(id) {
        return axios.delete(`/${service}/Delete?Id=`+id).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getUser: function(user_id) {        
        return axios.get(`/${service}/Get/`,{
            params: {
              id: user_id
            }
          }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getAllData: function(obj){
        return axios.get(`/${service}/GetAll`,{
            params: obj
        }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    changePassword: function(data){
        return axios.post(`/${service}/ChangePassword`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
    changeStatus: function(id){
        return axios.post(`/${service}/ChangeStatus?userId=`+id,{}).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },

}