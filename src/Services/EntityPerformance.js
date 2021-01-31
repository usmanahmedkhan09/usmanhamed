import axios from './http-common'
import common from './common'
const service = 'EntityPerformance';
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
}