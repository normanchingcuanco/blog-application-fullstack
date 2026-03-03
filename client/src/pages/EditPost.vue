<template>
  <section v-if="post" class="form-wrapper">
    <div class="form-container">

      <h1>Edit Article</h1>

      <form @submit.prevent="updatePost" class="form-card">

        <label>Title</label>
        <input v-model="post.title" required />

        <label>Content</label>
        <textarea v-model="post.content" rows="14" required></textarea>

        <!-- NEW: Advisor Dropdown -->
        <label>Associate with Advisor</label>
        <select v-model="selectedAdvisor">
          <option value="">None</option>
          <option
            v-for="advisor in advisors"
            :key="advisor._id"
            :value="advisor._id"
          >
            {{ advisor.name }}
          </option>
        </select>

        <button type="submit" class="btn-primary">
          Update
        </button>

      </form>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import API from "../services/api"

const route = useRoute()
const router = useRouter()

const post = ref(null)
const advisors = ref([])
const selectedAdvisor = ref("")

onMounted(async () => {
  const postRes = await API.get(`/posts/${route.params.id}`)
  post.value = postRes.data

  selectedAdvisor.value = post.value.advisor?._id || ""

  const advisorRes = await API.get("/advisors?admin=true")
  advisors.value = advisorRes.data
})

const updatePost = async () => {
  await API.put(`/posts/${route.params.id}`, {
    title: post.value.title,
    content: post.value.content,
    advisor: selectedAdvisor.value || null
  })

  router.push(`/posts/${route.params.id}`)
}
</script>

<style scoped>
.form-wrapper {
  padding: 120px 20px;
  background-color: var(--cream);
  min-height: 80vh;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
}

.form-card {
  background-color: var(--white);
  padding: 60px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 25px;
  margin-bottom: 10px;
  font-weight: 500;
}

input,
textarea,
select {
  padding: 14px;
  font-size: 1rem;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--terracotta);
}

button {
  margin-top: 40px;
}
</style>