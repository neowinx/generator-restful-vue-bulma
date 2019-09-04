import axios from 'axios'
import constants from './constants'
import auth from "./auth";
import router from "./router";

export const HTTP = axios.create({
  baseURL: constants.CONSULTAS_BACKEND_URL,
  withCredentials: true
})

//TODO: Need to manage better the re-auth when "Token has expired"
HTTP.interceptors.response.use(async function (response) {
  return response;
}, function (error) {
  if(error.response) {
    if(error.response.status === 401 && error.response.data && error.response.data.error === 'Token has expired') {
      auth.logout();
      router.push(constants.AUTH_URL);
    }
  }
  return Promise.reject(error);
});
