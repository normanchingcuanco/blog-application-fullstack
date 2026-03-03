<template>
  <section class="admin-wrapper">
    <div class="container">

      <h1 class="admin-title">Admin Dashboard</h1>

      <!-- ================= SEARCH ================= -->
      <div class="admin-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by article title or author..."
          @input="handleSearch"
        />
      </div>

      <!-- ================= ADVISOR PERFORMANCE ================= -->
      <section
        v-if="!searchQuery && !postsLoading && !advisorsLoading"
        class="admin-summary"
      >
        <h2 class="admin-section-title">Advisor Performance</h2>

        <div v-if="rankedAdvisors.length" class="admin-grid">

          <div
            v-for="(advisor, index) in rankedAdvisors"
            :key="advisor._id"
            class="admin-card"
          >
            <h3 class="admin-card-title">
              #{{ index + 1 }} {{ advisor.name }}
            </h3>

            <p class="admin-subtext">
              {{ advisor.articleCount }}
              {{ advisor.articleCount === 1 ? "Article" : "Articles" }}
            </p>

            <p class="admin-subtext">
              Total Views: {{ advisor.totalViews }}
            </p>

            <p class="admin-subtext">
              Avg Views / Article:
              {{ advisor.articleCount
                  ? Math.round(advisor.totalViews / advisor.articleCount)
                  : 0 }}
            </p>

          </div>

        </div>

        <p v-else class="admin-empty">
          No advisor performance data available.
        </p>
      </section>

      <!-- ================= ARTICLE SUMMARY ================= -->
      <section
        v-if="!searchQuery && !postsLoading && !advisorsLoading"
        class="admin-summary"
      >
        <h2 class="admin-section-title">Articles Per Advisor</h2>

        <!-- No advisors case -->
        <p v-if="!advisorArticleSummary.length" class="admin-empty">
          No advisors available.
        </p>

        <!-- Advisors grid -->
        <div
          v-else
          class="admin-grid"
        >
          <div
            v-for="advisor in advisorArticleSummary"
            :key="advisor._id"
            class="admin-card"
          >
            <h3 class="admin-card-title">
              {{ advisor.name }}
            </h3>

            <p class="admin-subtext">
              {{ advisor.articles.length }}
              {{ advisor.articles.length === 1 ? "Article" : "Articles" }}
            </p>

            <!-- Articles list -->
            <div
              v-if="advisor.articles.length"
              class="admin-article-links"
            >
              <router-link
                v-for="article in advisor.articles"
                :key="article._id"
                :to="`/posts/${article._id}`"
                class="admin-post-link"
              >
                • {{ article.title }}
              </router-link>
            </div>

            <!-- No articles case -->
            <p
              v-else
              class="admin-empty"
            >
              No articles yet.
            </p>
          </div>
        </div>
      </section>

      <!-- ================= POSTS ================= -->
      <h2 class="admin-section-title">All Posts</h2>

      <p v-if="postsLoading" class="admin-empty">
        Loading posts...
      </p>

      <div v-else-if="posts.length" class="admin-grid">
        <div
          v-for="post in posts"
          :key="post._id"
          class="admin-card"
        >
          <router-link
            :to="`/posts/${post._id}`"
            class="admin-post-link"
          >
            <h3 class="admin-card-title">
              {{ post.title }}
            </h3>
          </router-link>

          <p class="admin-subtext">
            By
            <span v-if="post.advisor?.name">
              {{ post.advisor.name }}
            </span>
            <span v-else>
              {{ post.author?.username }}
            </span>
          </p>

          <div class="admin-actions">
            <button
              @click="editPost(post._id)"
              class="admin-btn"
            >
              Edit
            </button>

            <button
              @click="deletePost(post._id)"
              class="admin-btn danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <p v-else class="admin-empty">
        No matching posts found.
      </p>

      <!-- ================= ADVISORS ================= -->
      <section v-if="!searchQuery">
        <h2 class="admin-section-title">
          Advisor Applications
        </h2>

        <p v-if="advisorsLoading" class="admin-empty">
          Loading advisors...
        </p>

        <div v-else-if="advisors.length" class="admin-grid">
          <div
            v-for="advisor in advisors"
            :key="advisor._id"
            class="admin-card"
          >
            <h3 class="admin-card-title">
              {{ advisor.name }}
            </h3>

            <p class="admin-subtext">
              {{ advisor.title }}
            </p>

            <p class="admin-status">
              Status:
              <span
                :class="advisor.isActive ? 'status-active' : 'status-pending'"
              >
                {{ advisor.isActive ? "Active" : "Pending Approval" }}
              </span>
            </p>

            <div class="admin-actions">
              <button
                @click="editAdvisor(advisor._id)"
                class="admin-btn"
              >
                Edit
              </button>

              <button
                v-if="!advisor.isActive"
                @click="toggleAdvisor(advisor, true)"
                class="admin-btn"
              >
                Approve
              </button>

              <button
                v-if="advisor.isActive"
                @click="toggleAdvisor(advisor, false)"
                class="admin-btn"
              >
                Deactivate
              </button>

              <button
                @click="deleteAdvisor(advisor._id)"
                class="admin-btn danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <p v-else class="admin-empty">
          No advisors found.
        </p>
      </section>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const router = useRouter()

const posts = ref([])
const advisors = ref([])
const postsLoading = ref(true)
const advisorsLoading = ref(true)
const searchQuery = ref("")

/* ================= FETCH POSTS ================= */

const fetchPosts = async () => {
  postsLoading.value = true

  const url = searchQuery.value
    ? `/posts?search=${searchQuery.value}`
    : "/posts"

  const res = await API.get(url)
  posts.value = res.data

  postsLoading.value = false
}

/* ================= FETCH ADVISORS ================= */

const fetchAdvisors = async () => {
  advisorsLoading.value = true
  const res = await API.get("/advisors?admin=true")
  advisors.value = res.data
  advisorsLoading.value = false
}

onMounted(async () => {
  await fetchPosts()
  await fetchAdvisors()
})

/* ================= HANDLE SEARCH ================= */

let searchTimeout = null

const handleSearch = () => {
  clearTimeout(searchTimeout)

  searchTimeout = setTimeout(() => {
    fetchPosts()
  }, 300)
}

/* ================= SUMMARY ================= */

const advisorArticleSummary = computed(() => {
  return advisors.value.map(advisor => {
    const advisorPosts = posts.value.filter(
      post => post.advisor?._id === advisor._id
    )

    return {
      ...advisor,
      articles: advisorPosts
    }
  })
})

/* ================= ADVISOR RANKING ================= */

const rankedAdvisors = computed(() => {
  return advisors.value
    .map(advisor => {
      const advisorPosts = posts.value.filter(
        post => post.advisor?._id === advisor._id
      )

      const totalViews = advisorPosts.reduce(
        (sum, post) => sum + (post.views || 0),
        0
      )

      return {
        ...advisor,
        articleCount: advisorPosts.length,
        totalViews
      }
    })
    .sort((a, b) => b.totalViews - a.totalViews)
})

/* ================= ACTIONS ================= */

const deletePost = async (id) => {
  await API.delete(`/posts/${id}`)
  fetchPosts()
}

const editPost = (id) => {
  router.push(`/edit/${id}`)
}

const editAdvisor = (id) => {
  router.push(`/admin/advisors/edit/${id}`)
}

const toggleAdvisor = async (advisor, status) => {
  const res = await API.put(`/advisors/${advisor._id}`, {
    isActive: status
  })

  advisor.isActive = res.data.isActive
}

const deleteAdvisor = async (id) => {
  await API.delete(`/advisors/${id}`)
  fetchAdvisors()
}
</script>

<style scoped>
.admin-wrapper {
  padding: 140px 20px;
  background-color: var(--cream);
  min-height: 100vh;
}

.admin-title {
  margin-bottom: 40px;
}

.admin-search {
  margin-bottom: 60px;
}

.admin-search input {
  width: 100%;
  max-width: 500px;
  padding: 14px;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
}

.admin-section-title {
  margin-bottom: 30px;
  margin-top: 80px;
}

.admin-grid {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.admin-card {
  background: var(--white);
  padding: 30px;
  border: 1px solid #eee;
}

.admin-card-title {
  margin-bottom: 10px;
}

.admin-subtext {
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.admin-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-btn {
  padding: 8px 14px;
  border: 1px solid var(--black);
  background: transparent;
  cursor: pointer;
}

.admin-btn.danger {
  border-color: #c0392b;
  color: #c0392b;
}

.admin-empty {
  color: var(--gray);
}

.admin-post-link {
  text-decoration: none;
  color: var(--black);
}

.admin-post-link:hover {
  color: var(--terracotta);
}

.admin-article-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.status-active {
  color: green;
}

.status-pending {
  color: orange;
}
</style>