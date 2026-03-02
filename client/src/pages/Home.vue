<template>
  <div>
    <h2>All Blog Posts</h2>

    <div v-if="posts.length === 0">
      <p>No posts yet.</p>
    </div>

    <div v-for="post in posts" :key="post._id" style="border: 1px solid black; margin-bottom: 10px; padding: 10px;">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content.substring(0, 100) }}...</p>
      <p><strong>Author:</strong> {{ post.author?.username }}</p>

      <router-link :to="`/posts/${post._id}`">
        Read More
      </router-link>
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

onMounted(() => {
  fetchPosts()
})
</script>