import axios from './http-common'
import common from './common'
import { param } from 'jquery';
const service = 'CommentPreSetService';
export default {

    getAllpresets: function (data)
    {
        return axios.get(`/${service}/GetAll`, data).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    EvalluationPreSets: function ()
    {
        return axios.get(`/${service}/GetAllEvaluationPreSets`).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },
    getAllCommentspresets: function ()
    {
        return axios.get(`/${service}/GetAllInitiativePreSets`).then(response =>
        {
            return common.prepareThen(response)
        }).catch(error =>
        {
            return common.prepareCatch(error)
        })
    },


}