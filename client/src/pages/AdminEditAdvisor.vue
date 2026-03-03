<template>
  <section class="section-wrapper">
    <div class="section-container">

      <h1>Edit Advisor</h1>

      <form v-if="advisor" @submit.prevent="updateAdvisor" class="edit-form">

        <label>Name</label>
        <input v-model="advisor.name" />

        <label>Slug</label>
        <input v-model="advisor.slug" />

        <label>Title</label>
        <input v-model="advisor.title" />

        <label>Bio</label>
        <textarea v-model="advisor.bio" rows="5"></textarea>

        <label>Specialties (comma separated)</label>
        <input v-model="specialtiesString" />

        <label>Avatar URL</label>
        <input v-model="advisor.avatarUrl" />

        <label>LinkedIn URL</label>
        <input v-model="advisor.linkedinUrl" />

        <label>Website URL</label>
        <input v-model="advisor.websiteUrl" />

        <button type="submit" class="btn-primary">
          Save Changes
        </button>

      </form>

      <p v-else>Loading advisor...</p>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import API from "../services/api"

const route = useRoute()
const router = useRouter()

const advisor = ref(null)
const specialtiesString = ref("")

onMounted(async () => {
  const res = await API.get(`/advisors?admin=true`)
  advisor.value = res.data.find(a => a._id === route.params.id)

  if (advisor.value?.specialties?.length) {
    specialtiesString.value = advisor.value.specialties.join(", ")
  }
})

const updateAdvisor = async () => {
  await API.put(`/advisors/${advisor.value._id}`, {
    ...advisor.value,
    specialties: specialtiesString.value
      ? specialtiesString.value.split(",").map(s => s.trim())
      : []
  })

  alert("Advisor updated successfully.")
  router.push("/admin")
}
</script>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--terracotta);
}

button {
  margin-top: 20px;
  align-self: flex-start;
}
</style>