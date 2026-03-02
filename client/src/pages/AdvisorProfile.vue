<template>
  <div class="page-container" v-if="advisor">
    <h1>{{ advisor.name }}</h1>

    <p v-if="advisor.title">
      <strong>{{ advisor.title }}</strong>
    </p>

    <p>{{ advisor.bio }}</p>

    <div v-if="advisor.specialties?.length">
      <h3>Specialties</h3>
      <ul>
        <li v-for="(item, index) in advisor.specialties" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="links" v-if="advisor.linkedinUrl || advisor.websiteUrl">
      <h3>Links</h3>

      <p v-if="advisor.linkedinUrl">
        <a :href="advisor.linkedinUrl" target="_blank">
          LinkedIn
        </a>
      </p>

      <p v-if="advisor.websiteUrl">
        <a :href="advisor.websiteUrl" target="_blank">
          Website
        </a>
      </p>
    </div>
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
import { useRoute } from "vue-router"
import API from "../services/api"

const route = useRoute()
const advisor = ref(null)
const error = ref(null)

const fetchAdvisor = async () => {
  try {
    const res = await API.get(`/advisors/${route.params.slug}`)
    advisor.value = res.data
  } catch (err) {
    console.error("Error loading advisor:", err)
    error.value = "Advisor not found."
  }
}

onMounted(() => {
  fetchAdvisor()
})
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.links a {
  color: blue;
}
</style>