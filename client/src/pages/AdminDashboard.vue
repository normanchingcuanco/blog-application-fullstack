<template>
  <div>
    <h2>Admin Dashboard</h2>

    <div v-if="posts.length === 0">
      <p>No posts available.</p>
    </div>

    <div
      v-for="post in posts"
      :key="post._id"
      style="border-bottom: 1px solid gray; margin-bottom: 10px;"
    >
      <p><strong>{{ post.title }}</strong></p>

      <button @click="handleDelete(post._id)">
        Delete Post
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const posts = ref([])

const fetchPosts = async () => {
  try {
    const res = await API.get("/posts")
    posts.value = res.data
  } catch (error) {
    console.log("Error fetching posts")
  }
}

const handleDelete = async (id) => {
  try {
    await API.delete(`/posts/${id}`)
    fetchPosts()
  } catch (error) {
    alert("Not authorized.")
  }
}

onMounted(() => {
  fetchPosts()
})
</script>