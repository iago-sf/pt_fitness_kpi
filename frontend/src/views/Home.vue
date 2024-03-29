<script setup>
import { computed, ref, watch } from "vue"
import axios from "axios"
import Navbar from "@/components/Navbar.vue"
import { useNotificationStore } from "@/store/notification.store"

const notiStore = useNotificationStore()
const url = ref("")
const shortedURL = ref("")

const errors = ref({
  url: null,
})
const form = computed(() => {
  if (errors.value.url) return false
  if (!url.value) return false
  return true
})

const submit = async () => {
  if (!form.value) return

  try {
    const { data } = await axios.post("/api/store-url", { url: url.value })

    shortedURL.value = window.location.origin + "/s/" + data.code

    notiStore.setNotification("URL shorted successfully", "success")
  } catch (error) {
    notiStore.setNotification("An error occurred while shorting the URL", "error")
  }
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
    <Navbar />

    <div
      class="absolute w-full h-1/2 md:w-1/2 md:translate-x-1/2 translate-y-1/2 px-10 rounded transition-all"
    >
      <div class="flex flex-wrap items-center w-full h-full scale-125">
        <div class="w-full text-center px-5">
          <h1 class="text-secun font-bold text-4xl">
            {{ shortedURL.length > 0 ? "Here is your shorted URL:" : "Shorten your URL" }}
          </h1>

          <p v-if="shortedURL.length > 0" class="text-secun font-semibold text-lg">
            <a
              :href="shortedURL"
              class="font-bold group transition duration-500 inline-block w-fit"
            >
              {{ shortedURL }}
              <span
                class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-secun"
              ></span>
            </a>
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
