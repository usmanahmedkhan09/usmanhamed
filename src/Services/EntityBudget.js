import axios from './http-common'
import common from './common'
const service = 'EntityBudget';
export default {

    createBudget: function(data){
        return axios.post(`/${service}/Create`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
    updateBudget: function(data){
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
    getEnityBudget: function(tenant_id) {    
        return axios.get(`/${service}/GetEntityBudget`,{
            params: {
                tenantId: tenant_id
            }
          }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getAllTenants: function(obj){
        return axios.get(`/${service}/GetAll`, {
            params: obj
        }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    // for Dashbaord
    getAllEntities: function(){
        return axios.get(`/${service}/GetAllEntities`).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    changeStatus: function(id){
        return axios.post(`/${service}/ChangeEntityStatus?TenantId=`+id,{}).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
}