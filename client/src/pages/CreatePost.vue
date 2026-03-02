<template>
  <div>
    <h2>Create Post</h2>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="form.title"
        type="text"
        placeholder="Title"
        required
      />

      <br /><br />

      <textarea
        v-model="form.content"
        placeholder="Content"
        required
      ></textarea>

      <br /><br />

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const router = useRouter()

const form = reactive({
  title: "",
  content: ""
})

const handleSubmit = async () => {
  try {
    await API.post("/posts", form)
    router.push("/")
  } catch (error) {
    alert("You must be logged in.")
  }
}
</script>