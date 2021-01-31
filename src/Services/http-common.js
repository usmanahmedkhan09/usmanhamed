import { env } from '../local-env.js';
const apiBaseURL = env.API_URL;
import user from '../auth'
import router from '../router'
import axiosHttp from 'axios'
import Vue from 'vue'
const axios = axiosHttp.create({
  baseURL: apiBaseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') !== null && localStorage.getItem('token') != undefined ? JSON.parse(localStorage.getItem('token')) : null}`,
    Accept: 'application/json',
    Pragma: 'no-cache',
  }
})


axios.interceptors.response.use(function (response)
{
  return response;
}, function (error)
{
  if (error.response.config.url && error.response.status === 404)
  {
    Vue.swal({
      icon: "error",
      type: "error",
      title: `This End Point (${error.response.config.url}) ${error.response.statusText}`
    });
  }
  if (error.response.status === 401)
  {
    Vue.swal({
      icon: "error",
      type: "error",
      title: 'دخول غير مرخص. يرجى إعادة تسجيل الدخول.'
    }).then((res) =>
    {
      if (res)
      {
        user.logout().then(
          result => router.push('/auth/login'),
        );
      }
    });
  }
  return Promise.reject(error)
})
export default axios;
