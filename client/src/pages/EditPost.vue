<template>
  <div v-if="loaded">
    <h2>Edit Post</h2>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="form.title"
        type="text"
        required
      />

      <br /><br />

      <textarea
        v-model="form.content"
        required
      ></textarea>

      <br /><br />

      <button type="submit">Update</button>
    </form>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import API from "../services/api"

const route = useRoute()
const router = useRouter()

const form = reactive({
  title: "",
  content: ""
})

const loaded = ref(false)

const fetchPost = async () => {
  try {
    const res = await API.get(`/posts/${route.params.id}`)
    form.title = res.data.title
    form.content = res.data.content
    loaded.value = true
  } catch (error) {
    alert("Error loading post.")
  }
}

const handleSubmit = async () => {
  try {
    await API.put(`/posts/${route.params.id}`, form)
    router.push(`/posts/${route.params.id}`)
  } catch (error) {
    alert("Not authorized.")
  }
}

onMounted(() => {
  fetchPost()
})
</script>