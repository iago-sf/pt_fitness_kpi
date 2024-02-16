import { createApp } from "vue"
import { createPinia } from "pinia"
import axios from "axios"
import "./style.css"

import router from "./router"
import App from "./App.vue"

import { useAuthStore } from "./store/auth.store"

const app = createApp(App)
const pinia = createPinia()

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      const authStore = useAuthStore()
      authStore.setToken(response.data.token)
    }

    return response
  },
  (error) => error
)

try {
  await axios.get(`/sanctum/csrf-cookie`)
} catch (error) {
  console.error("Unable to get CSRF token", error)
}

app.use(router).use(pinia).mount("#app")
