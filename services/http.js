require('dotenv').config()
// NOTE: NO import axios.
let axiosInstance = null

export function setAxiosInstance(instance) {
  axiosInstance = instance
  axiosInstance.defaults.baseURL = process.env.BASE_URL || 'http://localhost:8080/api'
}

// rest of code now uses axiosInstance where axios used to be.
