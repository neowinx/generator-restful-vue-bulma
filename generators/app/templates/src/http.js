import axios from 'axios'
import constants from './constants'
import auth from './auth'

export const HTTP = axios.create({
  baseURL: constants.CONSULTAS_BACKEND_URL,
  withCredentials: true
})

//TODO: Need to manage better the re-auth when "Token has expired"
HTTP.interceptors.response.use(async function (response) {
  if(response.status === 401 && response.data && response.data.message === 'Token has expired') {
    auth.login(auth.currentUser, auth.challenge)
    console.log(`El token a expirado. Resultado de reautenticar ${response}`);
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});
