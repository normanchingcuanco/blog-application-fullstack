<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>

    <p>{{ post.content }}</p>

    <p>
      <strong>Author:</strong> {{ post.author?.username }}
    </p>

    <div v-if="canModify" style="margin-bottom: 10px;">
      <router-link :to="`/edit/${post._id}`">
        <button>Edit</button>
      </router-link>

      <button @click="handleDelete">Delete</button>
    </div>

    <hr />

    <CommentSection :postId="post._id" />
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import API from "../services/api"
import CommentSection from "../components/CommentSection.vue"

const route = useRoute()
const router = useRouter()

const post = ref(null)

const user = JSON.parse(localStorage.getItem("user"))

const canModify = computed(() => {
  if (!post.value) return false
  return user?.id === post.value.author?._id || user?.isAdmin
})

const fetchPost = async () => {
  try {
    const res = await API.get(`/posts/${route.params.id}`)
    post.value = res.data
  } catch (error) {
    console.log("Error loading post")
  }
}

const handleDelete = async () => {
  try {
    await API.delete(`/posts/${route.params.id}`)
    router.push("/")
  } catch (error) {
    alert("Not authorized.")
  }
}

onMounted(() => {
  fetchPost()
})
</script>