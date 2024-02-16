import { createApp } from "vue"
import "./style.css"

import axios from "axios"

import router from "./router"
import App from "./App.vue"

const app = createApp(App)

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

try {
  await axios.get(`/sanctum/csrf-cookie`)
} catch (error) {
  console.error("Unable to get CSRF token", error)
}

app.use(router).mount("#app")
