import axios from 'axios'
import constants from './constants'

export const HTTP = axios.create({
  baseURL: constants.CONSULTAS_BACKEND_URL,
  withCredentials: true
})
