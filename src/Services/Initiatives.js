import axios from './http-common'
import common from './common'
const service = 'Initiative';
export default {

    create: function (data)
    {
        return axios.post(`/${service}/Create`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    update: function (data)
    {
        return axios.put(`/${service}/Update`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })

    },
    delete: function (data)
    {
        return axios.delete(`/${service}/Delete?Id=` + data.id).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    get: function (survey_id)
    {
        return axios.get(`/${service}/GetCompleteInitiative`, {
            params: {
                id: survey_id
            }
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAll: function (obj)
    {
        return axios.get(`/${service}/GetAllInitiatives`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getInitiativeAssessment: function (obj)
    {
        return axios.get(`/${service}/GetInitiativeAssessment`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    submitInitiativeAssessment: function (data)
    {
        return axios.post(`/${service}/SubmitAssessment`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    submitSummaryOfInitiative: function (data)
    {
        return axios.post(`/${service}/AddInitiativeSummery`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },

}