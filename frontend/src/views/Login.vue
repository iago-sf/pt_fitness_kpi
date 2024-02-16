<script setup>
import axios from "axios"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const errors = ref({
  email: null,
  password: null,
})

const formData = ref({
  email: "",
  password: "",
})

const submit = async () => {
  try {
    let { status } = await axios.post("/login", formData.value)

    if (status >= 200 && status < 300) {
      formData.value = {
        email: "",
        password: "",
      }

      router.push({ path: "/" })
    }
  } catch (error) {
    errors.value = error.errors
  }
}
</script>

<template>
  <div>
    <form>
      <input type="text" v-model="formData.email" name="email" placeholder="Email" />
      <input type="password" v-model="formData.password" name="password" placeholder="Password" />

      <button type="submit" @click.prevent="submit">login</button>
    </form>

    <router-link to="/">Volver</router-link>
  </div>
</template>
