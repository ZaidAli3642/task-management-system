import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://tms.bogholderiet.gl/api/v1.0',
})

export default apiClient
