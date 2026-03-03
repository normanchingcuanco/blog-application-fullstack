<template>
  <section class="section-wrapper">
    <div class="section-container">

      <h1>Admin Dashboard</h1>

      <!-- ================= POSTS ================= -->
      <h2 style="margin-top: 60px;">All Posts</h2>

      <div v-if="posts.length">
        <div
          v-for="post in posts"
          :key="post._id"
          style="margin: 30px 0; border-bottom: 1px solid #ddd; padding-bottom: 20px;"
        >
          <strong>{{ post.title }}</strong>

          <div style="margin-top: 15px;">
            <button @click="editPost(post._id)">Edit</button>
            <button @click="deletePost(post._id)" style="margin-left: 15px;">
              Delete
            </button>
          </div>
        </div>
      </div>

      <p v-else>No posts found.</p>


      <!-- ================= ADVISORS ================= -->
      <h2 style="margin-top: 80px;">Advisor Applications</h2>

      <div v-if="advisors.length">
        <div
          v-for="advisor in advisors"
          :key="advisor._id"
          style="margin: 30px 0; border-bottom: 1px solid #ddd; padding-bottom: 20px;"
        >
          <strong>{{ advisor.name }}</strong>
          <p style="color: var(--gray); margin: 8px 0;">
            {{ advisor.title }}
          </p>

          <p style="font-size: 0.9rem; margin-bottom: 12px;">
            Status:
            <span
              :style="{ color: advisor.isActive ? 'green' : 'orange' }"
            >
              {{ advisor.isActive ? 'Active' : 'Pending Approval' }}
            </span>
          </p>

          <div>
            <button @click="editAdvisor(advisor._id)">
              Edit
            </button>

            <button
              v-if="!advisor.isActive"
              @click="toggleAdvisor(advisor, true)"
              style="margin-left: 10px;"
            >
              Approve
            </button>

            <button
              v-if="advisor.isActive"
              @click="toggleAdvisor(advisor, false)"
              style="margin-left: 10px;"
            >
              Deactivate
            </button>

            <button
              @click="deleteAdvisor(advisor._id)"
              style="margin-left: 10px;"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <p v-else>No advisors found.</p>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const posts = ref([])
const advisors = ref([])
const router = useRouter()

onMounted(async () => {
  const postsRes = await API.get("/posts")
  posts.value = postsRes.data

  const advisorRes = await API.get("/advisors?admin=true")
  advisors.value = advisorRes.data
})

/* ================= POSTS ================= */

const deletePost = async (id) => {
  await API.delete(`/posts/${id}`)
  posts.value = posts.value.filter(p => p._id !== id)
}

const editPost = (id) => {
  router.push(`/edit/${id}`)
}

/* ================= ADVISORS ================= */

const toggleAdvisor = async (advisor, status) => {
  const res = await API.put(`/advisors/${advisor._id}`, {
    isActive: status
  })

  advisor.isActive = res.data.isActive
}

const deleteAdvisor = async (id) => {
  await API.delete(`/advisors/${id}`)
  advisors.value = advisors.value.filter(a => a._id !== id)
}

const editAdvisor = (id) => {
  router.push(`/admin/advisors/edit/${id}`)
}
</script>