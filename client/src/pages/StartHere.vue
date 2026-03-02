<template>
  <div class="page-container" v-if="page">
    <h1>{{ page.title }}</h1>

    <!-- Optional Video -->
    <div v-if="page.videoUrl" class="video-wrapper">
      <iframe
        :src="page.videoUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Render HTML content -->
    <div v-html="page.content"></div>
  </div>

  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const page = ref(null)
const error = ref(null)

const fetchPage = async () => {
  try {
    const res = await API.get("/pages/start-here")
    page.value = res.data
  } catch (err) {
    console.error("Error loading Start Here page:", err)
    error.value = "Unable to load page."
  }
}

onMounted(() => {
  fetchPage()
})
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.video-wrapper {
  margin: 20px 0;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>