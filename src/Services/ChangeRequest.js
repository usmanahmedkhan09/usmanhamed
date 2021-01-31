import axios from './http-common'
import common from './common'
const service = 'ChangeRequest';
export default {

    create: function (data)
    {
        return axios.post(`/${service}/CreateChangeRequest`, data).then(response =>
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
    delete: function (id)
    {
        return axios.delete(`/${service}/Delete/` + id).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    get: function (id)
    {
        return axios.get(`/${service}/Get`, {
            params: {
                id: id
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
        return axios.get(`/${service}/GetAllChangeRequests`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getInitiativesForChangeRequest: function ()
    {
        return axios.get(`/${service}/GetInitiativesForChangeRequest`).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    updateStatus: function (data)
    {
        return axios.post(`/${service}/ApproveRejectChangeRequest`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },

    getStats: function (obj)
    {
        return axios.get(`/${service}/GetChangeRequestofEntity`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getChangeRequestValues: function (obj)
    {
        return axios.get(`/${service}/GetChangeRequestValue`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },


}