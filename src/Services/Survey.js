import axios from './http-common'
import common from './common'
const service = 'Survey';
export default {

    createSurvey: function(data){
        return axios.post(`/${service}/Create`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
    updateSurvey: function(data){
        return axios.put(`/${service}/Update`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })

    },
    changeStatus: function(data){
        return axios.post(`/${service}/ChangeStatus`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })

    },
    deleteSurvey: function(survey_id) {
        return axios.delete(`/${service}/Delete/`+survey_id).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getSurvey: function(survey_id) {        
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
    getAllSurveys: function(obj){
        return axios.get(`/${service}/GetAll`, {
            params: obj
        }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    }

}