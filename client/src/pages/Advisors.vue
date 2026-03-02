<template>
  <div class="page-container">
    <h1>Transition Advisors</h1>

    <div v-if="advisors.length === 0">
      <p>No advisors available yet.</p>
    </div>

    <div
      v-for="advisor in advisors"
      :key="advisor._id"
      class="advisor-card"
    >
      <h2>
        <router-link :to="`/advisors/${advisor.slug}`">
          {{ advisor.name }}
        </router-link>
      </h2>

      <p>{{ advisor.title }}</p>

      <p v-if="advisor.specialties?.length">
        <strong>Specialties:</strong>
        {{ advisor.specialties.join(", ") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const advisors = ref([])

const fetchAdvisors = async () => {
  try {
    const res = await API.get("/advisors")
    advisors.value = res.data
  } catch (error) {
    console.error("Error loading advisors:", error)
  }
}

onMounted(() => {
  fetchAdvisors()
})
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.advisor-card {
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
}
</style>