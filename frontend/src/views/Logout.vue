<script setup>
import axios from "axios"
import { useRouter } from "vue-router"
import { useAuthStore } from "../store/auth.store"

const router = useRouter()

axios
  .post("/logout")
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const authStore = useAuthStore()
      authStore.setToken(null)
    }

    router.push({ path: "/login" })
  })
  .catch((error) => {
    router.push({ path: "/login" })
  })
</script>

<template>
  <div>Espere</div>
</template>
