import axios from 'axios'

// const BASE_URL = 'http://127.0.0.1:8000'
// const BASE_URL = 'http://13.48.130.144:8000'
const BASE_URL = 'https://demo.symbiosistrading.com'

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})