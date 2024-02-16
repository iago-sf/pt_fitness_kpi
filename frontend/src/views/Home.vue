<script setup>
import { useAuthStore } from "../store/auth.store"
const authStore = useAuthStore()
</script>

<template>
  <div>
    <router-link v-if="authStore.token" to="/logout">Logout</router-link>
    <router-link v-if="!authStore.token" to="/login">Login</router-link>
    <router-link v-if="!authStore.token" to="/register">Register</router-link>
  </div>
</template>

<style scoped></style>
