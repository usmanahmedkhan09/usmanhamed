import axios from './http-common'
import common from './common'
const service = 'SurveyResponse';
export default {

    createSurveyResponse: function (data)
    {
        return axios.post(`${service}/CreateSurveyResponse`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    updateCard: function (data)
    {
        return axios.put(`${service}/Update`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })

    },
    deleteCard: function (card_id)
    {
        return axios.delete(`${service}/Delete/` + card_id).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getCard: function (card_id)
    {
        return axios.get(`${service}/Get`, {
            params: {
                id: card_id
            }
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAllCards: function (obj)
    {
        return axios.get(`${service}/GetAll`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getSurveyReponse: function (obj)
    {
        return axios.get(`/${service}/GetResponseByEntityAndCard`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    }

}