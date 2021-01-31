import axios from './http-common'
import common from './common'
const service = 'Card';
export default {

    createCard: function(data){
        return axios.post(`${service}/Create`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })
    },
    updateCard: function(data){
        return axios.put(`${service}/Update`,data).then(response => {
            return common.prepareThen(response)
        }).catch(error => {            
            return common.prepareCatch(error)
        })

    },
    deleteCard: function(survey_id) {
        return axios.delete(`${service}/Delete/`+survey_id).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getCard: function(survey_id) {        
        return axios.get(`${service}/Get`,{
            params: {
              id: survey_id
            }
          }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getAllCards: function(obj){
        return axios.get(`${service}/GetAll`, {
            params: obj
        }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },
    getCardQuestion: function(card_id) {        
        return axios.get(`${service}/GetAllQuestionByCardId`,{
            params: {
                cardId: card_id
            }
          }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },

}