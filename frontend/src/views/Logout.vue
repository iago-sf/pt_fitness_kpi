<script setup>
import axios from "axios"
import { useRouter } from "vue-router"
import { useAuthStore } from "../store/auth.store"
import { onBeforeMount } from "vue"

const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(() => {
  if (!authStore.isAuthenticated) router.push({ path: "/" })
})

axios
  .post("/logout")
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      authStore.removeToken()
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
