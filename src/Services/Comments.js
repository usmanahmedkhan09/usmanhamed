import axios from './http-common'
import common from './common'
import { param } from 'jquery';
const service = 'MonthlyReportComment';
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
    Delete: function (data)
    {
        return axios.delete(`/${service}/Delete?id=` + data.id).then(response =>
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
    GetAllComments: function (data)
    {
        return axios.get(`/${service}/GetInitiativeComments?iniciativeid=` + data.id + '&reportid=' + data.reportid,).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    LastMonthComment: function (data)
    {
        return axios.post(`/${service}/LastMonthComments?tenantId=${data.tenantId}&InitiativeNumber=${data.InitiativeNumber}&ReportId=${data.ReportId}&Initiavtiveid=${data.Initiavtiveid}`).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
}