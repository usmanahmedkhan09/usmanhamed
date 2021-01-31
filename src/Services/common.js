import axiosHttp from 'axios'

const axios = axiosHttp.create({
  baseURL: 'http://3.124.65.120/api/',
  headers: {
    Accept: 'application/json'
  }
})

export default {
  prepareThen(response)
  {
    return {
      code: response.status,
      message: response.data.message,
      data: response.data.result,
      success: true
    }
  },
  prepareValidationCatch(error)
  {
    return {
      code: error.response.status,
      errors: error.response.data.errors
    }
  },
  prepareGeneralCatch(error)
  {
    return {
      code: error.response.status,
      message: error.response.data.error,
      success: error.response.data.success
    }
  },
  prepare404Catch(error)
  {
    return {
      code: 404,
      message: 'Network Error',
      success: false
    }
  },
  prepareCatch(error)
  {
    if (error.response)
    {
      if (error.response.status === 422)
      {
        return this.prepareValidationCatch(error)
      } else
      {
        return this.prepareGeneralCatch(error)
      }
    } else if (!error.response)
    {
      return this.prepare404Catch(error)
    }
  },
  login: function (data)
  {
    let self = this;
    return axios.post('TokenAuth/Authenticate', data).then(response =>
    {
      return self.prepareThen(response)
    }).catch(error =>
    {
      return self.prepareCatch(error)
    })
  },
  resetPassword: function (data)
  {
    let self = this;
    return axios.post('/reset-password', data).then(response =>
    {
      return self.prepareThen(response)
    }).catch(error =>
    {
      return self.prepareCatch(error)
    })
  },
  logout: function ()
  {
    let self = this;
    return axios.get('/logout').then(response =>
    {
      return response
    }).catch(error =>
    {
      return error
    })
  },
  validateOTP: function (data)
  {
    let self = this;
    return axios.post('/validate-otp', data).then(response =>
    {
      return self.prepareThen(response)
    }).catch(error =>
    {
      return self.prepareCatch(error)
    })
  },
  ResetPassword: function (data)
  {
    let self = this;
    return axios.post('/TokenAuth/ForgetPassword', data).then(response =>
    {
      return self.prepareThen(response)
    }).catch(error =>
    {
      return self.prepareCatch(error)
    })
  },
  GetOtp: function (data)
  {
    let self = this;
    return axios.get(`TokenAuth/ResendOTP?username=` + data).then(response =>
    {
      return self.prepareThen(response)
    }).catch(error =>
    {
      return self.prepareCatch(error)
    })
  },
}
