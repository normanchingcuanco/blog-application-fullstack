<template>
  <section v-if="post" class="post-wrapper">
    <div class="post-container">

      <!-- TITLE -->
      <h1 class="post-title">
        {{ post.title }}
      </h1>

      <!-- META -->
      <div class="post-meta">
        <span>
          By {{ post.author?.username }}
        </span>

        <span v-if="post.advisor">
          • Advisor:
          <router-link
            :to="`/advisors/${post.advisor.slug}`"
            class="advisor-link"
          >
            {{ post.advisor.name }}
          </router-link>
        </span>
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

/* Format content:
   - Auto link URLs
   - Preserve line breaks
*/
const formattedContent = computed(() => {
  if (!post.value?.content) return ""

  const urlRegex = /(https?:\/\/[^\s]+)/g

  return post.value.content
    .replace(urlRegex, '<a href="$1" target="_blank" class="post-link">$1</a>')
    .replace(/\n/g, "<br/>")
})

onMounted(async () => {
  try {
    const res = await API.get(`/posts/${route.params.id}`)
    post.value = res.data
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
  max-width: 800px; /* slightly wider */
  margin: 0 auto;
}

.post-title {
  font-size: 2.8rem;
  margin-bottom: 25px;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
}

.post-meta {
  color: var(--gray);
  margin-bottom: 50px;
  font-size: 0.9rem;
}

.advisor-link {
  color: var(--terracotta);
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