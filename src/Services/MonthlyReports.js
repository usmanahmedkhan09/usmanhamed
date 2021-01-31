import axios from './http-common'
import common from './common'
import { data } from 'jquery';
const service = 'MonthlyReport';
export default {

    create: function (data)
    {
        return axios.post(`/${service}/SubmitReport`, data).then(response =>
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
    delete: function (survey_id)
    {
        return axios.delete(`/${service}/Delete/` + survey_id).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    get: function (survey_id)
    {
        return axios.get(`/${service}/Get`, {
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
    getSubmittedAll: function (obj)
    {
        return axios.get(`/${service}/GetAllSubmittedReports`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getDraftReports: function (obj)
    {
        return axios.get(`/${service}/GetCurrentMonthNonSubmittedReport`, {
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
        return axios.get(`/${service}/GetAll`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    GetEntityReportSubmissionStatus: function (obj)
    {
        return axios.get(`/${service}/GetEntityReportSubmissionStatus`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAllInitiatives: function (obj)
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
    approveReport: function (data)
    {
        return axios.post(`/${service}/ApproveDisapproveMonthlyReport`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    feedbackSubmit: function (data)
    {
        return axios.post(`/${service}/SubmitFeedBack`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getFeedback: function (id)
    {
        return axios.get(`/${service}/GetFeedBack`, {
            params: {
                reportId: reportId
            }
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getActivityLogs: function (obj)
    {
        return axios.get(`/${service}/GetFeedBack`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },

    getSummeryForCSE: function (obj)
    {
        return axios.get(`/${service}/GetSummeryForCSE`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    submitFinalReport: function (data)
    {
        return axios.post(`/${service}/ApproveByCSE`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    copyLastMonthReport: function (id)
    {
        return axios.post(`/${service}/CopyLastMonthReport?tenantid=` + id, {}).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getEntityDashboard: function ()
    {
        return axios.get(`/${service}/GetEntityDashboard`).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAdminDashboard: function (obj)
    {
        return axios.get(`/${service}/GetAdminDashboard`).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getCSEDashboard: function (data)
    {
        return axios.post(`/${service}/GetCSEDashboard`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    GetAllCSEFeedBack: function (obj)
    {
        return axios.get(`/${service}/GetAllCSEFeedBack`, {
            params: obj
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    GetMonthlyReports: function (payload)
    {
        return axios.get(`/${service}/GetMonthlyReportDashboard`, {
            params: payload
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    CSEReportEvulation: function (data)
    {
        return axios.post(`/${service}/GetCSEDashboardEvaluation`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    ReportEvulation: function (data)
    {
        return axios.get(`/${service}/ReportEvaluation`, { params: data }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    GetReportByMonth: function (payload)
    {
        return axios.get(`/${service}/GetMonthlyReportByMonthDashboard`, {
            params: payload
        }).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAllEntityDetails: function (data)
    {
        return axios.post(`/${service}/CSETenantDashboard`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getNonSubmitedReports: function (data)
    {
        return axios.post(`/${service}/CSETenantDashboardNonSubmittedEntities`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getSectors: function ()
    {
        return axios.get(`/${service}/GetUserSector`,).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getYearlyReports: function (data)
    {
        return axios.get(`/${service}/GetReportTimeLine?year=${data.year}&tenantid=${data.tenantid}`,).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    }
}