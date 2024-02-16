<script setup>
import { computed, ref, watch } from "vue"
import { useAuthStore } from "../store/auth.store"
import axios from "axios"
const authStore = useAuthStore()

const errors = ref({
  url: null,
})
const form = computed(() => {
  if (errors.value.url) return false
  if (!url.value) return false
  return true
})
const url = ref("")
const shortedURL = ref("")

const submit = async () => {
  if (!form.value) return

  const { data } = await axios.post("/api/store-url", { url: url.value })
  console.log("data", data)

  shortedURL.value = window.location.origin + "/s/" + data.code
}

watch(
  url,
  (value) => {
    if (value && value.length > 0) {
      const urlRegex = /^(http|https):\/\/[^ "]+$/
      errors.value.url =
        urlRegex.test(value) && value.split(".").length >= 2 ? null : "Please enter a correct URL"
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="bg-primer h-screen w-full relative justify-center items-center">
    <div v-if="authStore.isAuthenticated" class="p-4 flex flex-wrap justify-end space-x-4">
      <router-link
        to="/logout"
        class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
        >Logout</router-link
      >
    </div>
    <div v-else class="p-4 flex flex-wrap justify-end space-x-4">
      <router-link
        to="/login"
        class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
        >Login</router-link
      >
      <router-link
        to="/register"
        class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
        >Register</router-link
      >
    </div>
    <div
      class="absolute w-full h-1/2 md:w-1/2 md:translate-x-1/2 translate-y-1/2 px-10 rounded transition-all"
    >
      <div class="flex flex-wrap items-center w-full h-full scale-125">
        <div class="w-full text-center px-5">
          <h1 class="text-secun font-bold text-4xl">Shorten your URL</h1>

          <p v-if="shortedURL.length > 0" class="text-secun font-semibold text-lg">
            Your shorted URL is: <a :href="shortedURL">{{ shortedURL }}</a>
          </p>
          <p v-else class="text-secun font-semibold text-lg">
            Enter your URL and get a shortened version
          </p>

          <form class="w-full mt-5" @submit.prevent="submit">
            <div class="mb-4">
              <input
                v-model="url"
                type="text"
                name="url"
                placeholder="Enter your URL here"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-quinto leading-tight ring ring-secun focus:outline-none focus:shadow-outline"
              />

              <p v-if="errors.url" class="text- text-xs italic mt-2">Please enter a valid URL</p>
            </div>
            <div class="mb-4 text-center">
              <button
                class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
                type="submit"
              >
                Short URL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
