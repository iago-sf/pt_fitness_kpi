import { defineStore } from "pinia"

// este auth store guarda un token, si el token existe el usuario esta autenticado y devolvera true si no existe devolvera false
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token
    },
  },
})
