import { defineStore } from "pinia"

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    show: false,
    message: "",
    type: "",
  }),
  actions: {
    setNotification(message, type = "success") {
      this.message = message
      this.type = type
      this.show = true
    },
    clearNotification() {
      this.show = false
      this.message = ""
      this.type = ""
    },
  },
})
