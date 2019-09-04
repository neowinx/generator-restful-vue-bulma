import {HTTP} from '@/http'
import constants from "./constants";

const auth = {
  currentUser: undefined,
  //TODO: Store this in the access_token and use it from there
  challenge: undefined,
  accessToken: undefined,
  payload: undefined,
  login(username, password) {
    return HTTP.post(constants.AUTH_URL, { username: username, password: password }).then(response => {
      this.currentUser = username;
      this.challenge = password;
      this.accessToken = response.data.access_token;
      this.payload = JSON.parse(atob(auth.accessToken.split('.')[1]));
      HTTP.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`
      return username
    }).catch(error => {
      if(error && error.response) {
        // Lets try to improve error messages to present them to the user
        switch(error.response.status) {
          case 400:
            return Promise.reject({
              message: 'Ingrese ambos datos, usuario y contraseña'
            })
          case 401:
            return Promise.reject({
              message: 'Usuario y/o password incorrectos'
            })
          default:
            return Promise.reject(error)
        }
      } else {
        return Promise.reject(error)
      }
    })
  },
  logout() {
    this.currentUser = undefined
    this.accessToken = undefined
    this.payload = undefined
  }
}

export default auth
