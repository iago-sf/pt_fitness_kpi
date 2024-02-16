<script setup>
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

axios
  .post("/logout")
  .then((res) => {
    router.push({ path: "/login" })
  })
  .catch((error) => {
    router.push({ path: "/login" })
  })
</script>

<template>
  <div>Espere</div>
</template>
