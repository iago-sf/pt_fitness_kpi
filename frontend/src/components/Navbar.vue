<script setup>
import { useRouter } from "vue-router"
import { useAuthStore } from "@/store/auth.store"

const authStore = useAuthStore()
const router = useRouter()
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="p-4 flex flex-wrap justify-end space-x-4">
    <router-link
      v-if="!(router.currentRoute.value.name == 'Home')"
      to="/"
      class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
    >
      Go short
    </router-link>
    <router-link
      v-if="!(router.currentRoute.value.name == 'Dashboard')"
      to="/dashboard"
      class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
    >
      Dashboard
    </router-link>
    <router-link
      to="/logout"
      class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
    >
      Logout
    </router-link>
  </div>
  <div v-else class="p-4 flex flex-wrap justify-end space-x-4">
    <router-link
      to="/login"
      class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
    >
      Login
    </router-link>
    <router-link
      to="/register"
      class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
    >
      Register
    </router-link>
  </div>
</template>
