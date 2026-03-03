<template>
  <section v-if="post" class="post-wrapper">
    <div class="post-container">

      <!-- TITLE -->
      <h1 class="post-title">
        {{ post.title }}
      </h1>

      <!-- META -->
      <div class="post-meta">

        <!-- If advisor exists -->
        <div v-if="post.advisor && post.advisor.name" class="author-wrapper">

          <img
            v-if="post.advisor.avatarUrl"
            :src="post.advisor.avatarUrl"
            :alt="post.advisor.name"
            class="author-avatar"
          />

          <div class="author-text">
            <span class="by-label">By</span>
            <router-link
              :to="`/advisors/${post.advisor.slug}`"
              class="advisor-link"
            >
              {{ post.advisor.name }}
            </router-link>
          </div>

        </div>

        <!-- Fallback to normal author -->
        <div v-else class="author-wrapper">
          <span>By {{ post.author?.username }}</span>
        </div>

        <!-- OPTIONAL: Show views count -->
        <div class="views-count" v-if="post.views !== undefined">
          • {{ post.views }} views
        </div>

      </div>

      <!-- CONTENT -->
      <div
        class="post-content"
        v-html="formattedContent"
      ></div>

      <!-- COMMENTS -->
      <div class="comments-section">
        <CommentSection :postId="post._id" />
      </div>

    </div>
  </section>

  <section v-else class="loading">
    <p>Loading article...</p>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import API from "../services/api"
import CommentSection from "../components/CommentSection.vue"

const route = useRoute()
const post = ref(null)

/* Format content */
const formattedContent = computed(() => {
  if (!post.value?.content) return ""

  const urlRegex = /(https?:\/\/[^\s]+)/g

  return post.value.content
    .replace(urlRegex, '<a href="$1" target="_blank" class="post-link">$1</a>')
    .replace(/\n/g, "<br/>")
})

onMounted(async () => {
  try {
    // 1️⃣ Load post normally
    const res = await API.get(`/posts/${route.params.id}`)
    post.value = res.data

    // 2️⃣ Increment views in background (no await blocking UI)
    API.put(`/posts/${route.params.id}/view`)
      .then(updated => {
        post.value.views = updated.data.views
      })
      .catch(() => {
        // Silent fail – analytics should never break UI
      })

  } catch (err) {
    console.error("Error loading post:", err)
  }
})
</script>

<style scoped>
.post-wrapper {
  padding: 120px 20px;
  background-color: var(--cream);
  min-height: 80vh;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
}

.post-title {
  font-size: 2.8rem;
  margin-bottom: 30px;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
}

.post-meta {
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.author-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 1px solid #eee;
}

.author-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  color: var(--gray);
}

.by-label {
  color: var(--gray);
}

.advisor-link {
  color: var(--terracotta);
  font-weight: 500;
}

.views-count {
  font-size: 0.9rem;
  color: var(--gray);
}

.post-content {
  line-height: 1.9;
  font-size: 1.1rem;
  color: var(--black);
  letter-spacing: 0.2px;
}

.post-content br {
  margin-bottom: 12px;
  display: block;
  content: "";
}

.post-content :deep(.post-link) {
  color: #1e6bd6;
  text-decoration: underline;
  font-weight: 500;
}

.post-content :deep(.post-link:hover) {
  color: #154a99;
}

.comments-section {
  margin-top: 100px;
}

.loading {
  padding: 120px 20px;
  text-align: center;
}
</style>