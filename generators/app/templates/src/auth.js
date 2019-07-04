import {HTTP} from '@/http'

const auth = {
  currentUser: undefined,
  accessToken: undefined,
  login(username, password) {
    return HTTP.post('/login', { username: username, password: password }).then(response => {
      this.currentUser = username;
      this.accessToken = response.data.access_token;
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
  }
}

export default auth
