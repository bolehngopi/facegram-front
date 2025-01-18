import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})

Api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"))

    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => { return Promise.reject(error) }
)

export default Api;