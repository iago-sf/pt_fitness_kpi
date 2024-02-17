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
const deleteModal = ref(false)
const detailsModal = ref(false)
const linkToEdit = ref({
  id: null,
  url: null,
})

const showModal = (e, type = "details", callback = null) => {
  linkToEdit.value = { ...e }

  switch (type) {
    case "edit":
      editModal.value = true
      break
    case "details":
      callback && callback()
      detailsModal.value = true
      break
    case "delete":
      deleteModal.value = true
      break
  }
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

const clicks = ref({
  dates: {},
  user_agents: {},
})
const groupClicksInfo = (clk) => {
  clicks.value.dates = clk.reduce((acc, curr) => {
    const date = new Date(curr.created_at).toLocaleDateString()

    if (!acc[date]) {
      acc[date] = 1
    } else {
      acc[date]++
    }

    return acc
  }, {})

  clicks.value.user_agents = clk.reduce((acc, curr) => {
    let arr_agent = curr.user_agent.split(" ")
    curr.user_agent = arr_agent[arr_agent.length - 1]

    if (!acc[curr.user_agent]) {
      acc[curr.user_agent] = 1
    } else {
      acc[curr.user_agent]++
    }

    return acc
  }, {})
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
      :show="detailsModal"
      title="Details"
      actionText="Close"
      @close="detailsModal = false"
      @action="detailsModal = false"
    >
      <p v-if="linkToEdit.clicks_count == 0" class="text-secun font-semibold text-xl text-center">
        No visits yet
      </p>
      <div v-else class="overflow-hidden">
        <div class="mb-4">
          <p class="text-secun font-semibold text-xl">
            Total visits: <span class="text-secun font-normal">{{ linkToEdit.clicks_count }}</span>
          </p>
        </div>

        <div class="mb-4">
          <p class="text-secun font-semibold text-xl">Clicks by date:</p>
          <ul class="text-secun">
            <li v-for="(value, key) in clicks.dates" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </div>

        <div class="mb-4">
          <p class="text-secun font-semibold text-xl">Clicks by browser:</p>
          <ul class="text-secun">
            <li v-for="(value, key) in clicks.user_agents" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </div>
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
      <div
        v-for="link in links"
        :key="link.id"
        class="bg-secun p-4 rounded shadow overflow-hidden flex flex-col justify-between h-full"
      >
        <div>
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
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            class="text-primer font-semibold py-2 px-4 border border-primer bg-white hover:bg-primer hover:text-secun rounded shadow transition-colors"
            @click="showModal(link, 'edit')"
          >
            Edit
          </button>
          <button
            class="text-primer font-semibold py-2 px-4 border border-primer bg-white hover:bg-primer hover:text-secun rounded shadow transition-colors"
            @click="showModal(link, 'details', groupClicksInfo(link.clicks))"
          >
            Details
          </button>
          <button
            class="text-primer font-semibold py-2 px-4 border border-primer bg-white hover:bg-primer hover:text-secun rounded shadow transition-colors"
            @click="showModal(link, 'delete')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
