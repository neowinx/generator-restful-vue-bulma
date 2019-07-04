import {HTTP} from '@/http'

const auth = {
  currentUser: undefined,
  accessToken: undefined,
  login(username, password) {
    return HTTP.post('/login', { username: username, password: password }).then(response => {
      this.currentUser = username;
      this.accessToken = response.data.access_token;
      return username
    })
  },
  logout() {
    this.currentUser = undefined
    this.accessToken = undefined
  }
}

export default auth
