<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>

    <div v-if="page.videoUrl" style="margin-bottom: 20px;">
      <iframe
        :src="page.videoUrl"
        width="560"
        height="315"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Render HTML content -->
    <div v-html="page.content"></div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const page = ref(null)

const fetchPage = async () => {
  try {
    const res = await API.get("/pages/about")
    page.value = res.data
  } catch (error) {
    console.log("Error loading About page")
  }
}

onMounted(() => {
  fetchPage()
})
</script>