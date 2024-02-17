<script setup>
import axios from "axios"
import { computed, ref, watch } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const errors = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
})

const form = computed(() => {
  if (
    errors.value.name ||
    errors.value.email ||
    errors.value.password ||
    errors.value.password_confirmation
  ) {
    return false
  }
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.password ||
    !formData.value.password_confirmation
  ) {
    return false
  }

  return true
})

const formData = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
})

const submit = async () => {
  if (!form.value) return

  try {
    let { status } = await axios.post("/register", formData.value)

    if (status >= 200 && status < 300) {
      formData.value = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }

      router.push({ path: "/" })
    }
  } catch (error) {
    const { data } = error.response

    if (data.error == "Already authenticated") router.push({ path: "/" })
    if (data.errors) errors.value = data.errors
  }
}

watch(
  formData,
  (value) => {
    if (value.name) {
      errors.value.name =
        value.name.length >= 3 ? null : "Name field has to be at least 3 characters long"
    }

    if (value.email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      errors.value.email = emailRegex.test(value.email)
        ? null
        : "Please enter a correct email address"
    }

    if (value.password) {
      errors.value.password =
        value.password.length >= 8 ? null : "Password field has to be at least 8 characters long"
    }

    if (value.password_confirmation) {
      errors.value.password_confirmation =
        value.password_confirmation === value.password ? null : "Passwords do not match"
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="bg-primer h-screen w-full flex flex-wrap justify-center items-center">
    <div
      class="bg-secun w-[90%] h-3/4 md:h-1/2 md:w-1/2 lg:w-1/4 px-10 rounded shadow-xl transition-all"
    >
      <div class="flex flex-wrap justify-center items-center h-full">
        <form class="w-full inline-block" @submit.prevent="submit">
          <h1 class="text-center text-3xl my-4">Register</h1>
          <div class="mb-4">
            <input
              v-model="formData.name"
              type="text"
              name="name"
              placeholder="Name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-quinto leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.name" class="text-primer text-xs italic">
              Name field has to be at least 3 characters long
            </p>
          </div>

          <div class="mb-4">
            <input
              v-model="formData.email"
              type="text"
              name="email"
              placeholder="Email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-quinto leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.email" class="text-primer text-xs italic">
              Please enter a correct email
            </p>
          </div>

          <div class="mb-4">
            <input
              type="password"
              v-model="formData.password"
              name="password"
              placeholder="Password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-quinto leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.password" class="text-primer text-xs italic">
              Please enter a correct password
            </p>
          </div>

          <div class="mb-4">
            <input
              type="password"
              v-model="formData.password_confirmation"
              name="password_confirmation"
              placeholder="Confirm Password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-quinto leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.password_confirmation" class="text-primer text-xs italic">
              Please enter a correct password
            </p>
          </div>

          <div class="text-center mb-4">
            <button
              :disabled="!form"
              class="text-quinto font-semibold py-2 px-4 border border-quinto rounded shadow transition-colors"
              :class="!form ? 'cursor-not-allowed' : 'hover:bg-quinto hover:text-white'"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        <div class="text-center text-gray-800 text-lg w-full">
          <div>
            <router-link to="/login" class="hover:text-black">
              Already have an account yet?
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
