<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="handleSubmit">
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

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const router = useRouter()

const form = reactive({
  email: "",
  password: ""
})

const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/login", form)

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))

    router.push("/")
  } catch (error) {
    alert(error.response?.data?.message || "Login failed.")
  }
}
</script>