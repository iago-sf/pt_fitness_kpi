<script setup>
import axios from "axios"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const errors = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
})

const formData = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
})

const submit = async () => {
  try {
    let { data, status } = await axios.post("/register", formData.value)

    if (status === 201) {
      formData.value = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }

      router.push({ path: "/login" })
    }
  } catch (error) {
    errors.value = error.errors
  }
}
</script>

<template>
  <div>
    <form>
      <input type="text" v-model="formData.name" name="name" placeholder="Name" />
      <input type="text" v-model="formData.email" name="email" placeholder="Email" />
      <input type="password" v-model="formData.password" name="password" placeholder="Password" />
      <input
        type="password"
        v-model="formData.password_confirmation"
        name="password_confirmation"
        placeholder="Confirm Password"
      />
      <button type="submit" @click.prevent="submit">Register</button>
    </form>

    <router-link to="/">Volver</router-link>
  </div>
</template>
