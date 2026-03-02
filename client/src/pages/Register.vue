<template>
  <div>
    <h2>Register</h2>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="form.username"
        type="text"
        placeholder="Username"
        required
      />

      <br /><br />

      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        required
      />

      <br /><br />

      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        required
      />

      <br /><br />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const router = useRouter()

const form = reactive({
  username: "",
  email: "",
  password: ""
})

const handleSubmit = async () => {
  try {
    await API.post("/auth/register", form)
    alert("Registration successful. Please login.")
    router.push("/login")
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed.")
  }
}
</script>