import axios from './http-common'
import common from './common'
const service = 'SupportRequire';
export default {

    create: function (data)
    {
        return axios.post(`${service}/Create`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    update: function (data)
    {
        return axios.put(`${service}/Update`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })

    },
    delele: function (id)
    {
        return axios.delete(`${service}/Delete/` + id).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    get: function (id)
    {
        return axios.get(`${service}/Get`, {
            params: {
                id
            }
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAllByReport: function (obj)
    {
        return axios.get(`${service}/GetAllByReport`, {
            params: obj
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
        return axios.get(`${service}/GetAll`, {
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