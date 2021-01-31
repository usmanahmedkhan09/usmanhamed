import axios from './http-common'
import common from './common'
const service = 'Session';
export default {

    getCurrentLoginInformations: function(user_id) {        
        return axios.get(`/${service}/GetCurrentLoginInformations/`,{
            params: {
              id: user_id
            }
          }).then(response => {
            return common.prepareThen(response)
        }).catch(error => {
            return common.prepareCatch(error)
        })
    },


}