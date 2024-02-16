import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("token"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem("token", token)
    },
    removeToken() {
      this.token = null
      localStorage.removeItem("token")
    },
  },
})
