<script setup>
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import Navbar from "@/components/Navbar.vue"
import Modal from "@/components/Modal.vue"
import { useNotificationStore } from "@/store/notification.store"

const notiStore = useNotificationStore()
const router = useRouter()
const baseURL = window.location.origin
const user = ref(null)
const links = ref([])

const getUserURLs = async () => {
  try {
    const { data } = await axios.get("/api/get-urls")

    user.value = data.user
    links.value = data.links
  } catch (error) {
    router.push({ path: "/login" })
  }
}

const hidden = ref(true)
const hideText = (text, id) => {
  if (text.length > 20 && hidden.value) {
    return text.slice(0, 20) + "..."
  }

  return text
}

onMounted(() => {
  getUserURLs()
})

const errors = ref({
  url: null,
})

const editModal = ref(false)
const linkToEdit = ref({
  id: null,
  url: null,
})
const showEditModal = (e) => {
  linkToEdit.value = { ...e }
  editModal.value = true
}
const onEdit = async () => {
  try {
    const { data, status } = await axios.put("/api/update-url", linkToEdit.value)

    if (status === 200) {
      editModal.value = false
      notiStore.setNotification("URL updated successfully", "success")
      getUserURLs()
    }
  } catch (error) {
    notiStore.setNotification("An error occurred while updating the URL", "error")
  }
}

const deleteModal = ref(false)
const showDeleteModal = (e) => {
  linkToEdit.value = { ...e }
  deleteModal.value = true
}
const onDelete = async () => {
  try {
    const { status } = await axios.delete("/api/delete-url/" + linkToEdit.value.id)

    if (status === 200) {
      deleteModal.value = false
      notiStore.setNotification("URL deleted successfully", "success")
      getUserURLs()
    }
  } catch (error) {
    notiStore.setNotification("An error occurred while deleting the URL", "error")
  }
}

watch(
  () => linkToEdit.value.url,
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
  <div class="min-h-screen bg-primer w-full relative justify-center items-center">
    <Modal
      :show="editModal"
      title="Edit"
      actionText="Edit"
      @close="editModal = false"
      @action="onEdit"
    >
      <div class="mb-4">
        <input
          v-model="linkToEdit.url"
          type="text"
          name="url"
          placeholder="Enter your URL here"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-quinto leading-tight ring ring-secun focus:outline-none focus:shadow-outline"
        />

        <p v-if="errors.url" class="text- text-xs italic mt-2">Please enter a valid URL</p>
      </div>
    </Modal>

    <Modal
      :show="deleteModal"
      title="Delete"
      actionText="Delete"
      @close="deleteModal = false"
      @action="onDelete"
    >
      <p class="text-secun text-lg text-center">Are you sure you want to delete this URL?</p>
    </Modal>

    <Navbar />

    <div class="text-secun text-center">
      <h1 class="font-bold text-4xl">Welcome {{ user?.name }}</h1>
      <p class="font-semibold text-lg">Here are your shortened URLs</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 my-5">
      <div v-for="link in links" :key="link.id" class="bg-secun p-4 rounded shadow overflow-hidden">
        <p class="text-primer mb-4">
          <span>Your URL:</span>
          <span class="font-semibold" @click="hidden = !hidden">{{
            " " + hideText(link.url, link.id)
          }}</span>
        </p>
        <p class="text-primer mb-4">
          <span>Shorted URL:</span>
          <router-link
            :to="`/s/${link.code}`"
            class="font-semibold transition-colors hover:underline"
          >
            {{ " " + baseURL }}/s/{{ link.code }}
          </router-link>
        </p>

        <p class="text-primer mb-4">
          <span>Visits:</span>
          <span class="font-semibold">{{ " " + link.clicks_count }}</span>
        </p>

        <div class="flex fle-warp gap-4">
          <button
            class="w-full text-primer font-semibold py-2 px-4 border border-primer hover:bg-primer hover:text-secun rounded shadow transition-colors"
            @click="showEditModal(link)"
          >
            Edit
          </button>
          <button
            class="w-full text-primer font-semibold py-2 px-4 border border-primer hover:bg-primer hover:text-secun rounded shadow transition-colors"
            @click="showDeleteModal(link)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
