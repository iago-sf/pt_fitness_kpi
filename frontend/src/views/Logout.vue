<script setup>
import axios from "axios"
import { useRouter } from "vue-router"
import { useAuthStore } from "../store/auth.store"
import { onBeforeMount } from "vue"
import { useNotificationStore } from "@/store/notification.store"

const router = useRouter()
const authStore = useAuthStore()
const notiStore = useNotificationStore()

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    notiStore.setNotification("You are not logged in", "error")
    router.push({ path: "/" })
  }
})

axios
  .post("/logout")
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      authStore.removeToken()
    }

    notiStore.setNotification("Logged out successfully", "success")
    router.push({ path: "/login" })
  })
  .catch((error) => {
    notiStore.setNotification("An error occurred while logging out", "error")
    router.push({ path: "/login" })
  })
</script>

<template>
  <div>Espere</div>
</template>
