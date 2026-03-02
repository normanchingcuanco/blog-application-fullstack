<template>
  <div>
    <h3>Comments</h3>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="content"
        type="text"
        placeholder="Write a comment..."
        required
      />
      <button type="submit">Comment</button>
    </form>

    <br />

    <div
      v-for="comment in comments"
      :key="comment._id"
      style="border-bottom: 1px solid gray; margin-bottom: 5px;"
    >
      <p>{{ comment.content }}</p>
      <small>By: {{ comment.author?.username }}</small>

      <button
        v-if="canDelete(comment)"
        @click="handleDelete(comment._id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const props = defineProps({
  postId: String
})

const comments = ref([])
const content = ref("")

const user = JSON.parse(localStorage.getItem("user"))

const fetchComments = async () => {
  try {
    const res = await API.get(`/comments/${props.postId}`)
    comments.value = res.data
  } catch (error) {
    console.log("Error fetching comments")
  }
}

const handleSubmit = async () => {
  try {
    await API.post(`/comments/${props.postId}`, {
      content: content.value
    })
    content.value = ""
    fetchComments()
  } catch (error) {
    alert("Must be logged in to comment.")
  }
}

const handleDelete = async (id) => {
  try {
    await API.delete(`/comments/${id}`)
    fetchComments()
  } catch (error) {
    alert("Not authorized.")
  }
}

const canDelete = (comment) => {
  return user?.id === comment.author?._id || user?.isAdmin
}

onMounted(() => {
  fetchComments()
})
</script>