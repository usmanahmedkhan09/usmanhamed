import axios from './http-common'
import common from './common'
import { param } from 'jquery';
const service = 'MonthlyReportReply';
export default {

    Create: function (data)
    {
        return axios.post(`/${service}/Create`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    Update: function (data)
    {
        return axios.put(`/${service}/Update`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    Delete: function (data)
    {
        return axios.delete(`/${service}/Delete?Id=` + data.id).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    GetAllComments: function (data)
    {
        return axios.get(`/${service}/GetInitiativeComments?id=` + data.id,).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
}