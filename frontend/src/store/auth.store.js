import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    user: null,
  }),

  actions: {
    login(user) {
      this.user = user
    },
    logout() {
      this.user = null
    },
  },
})
