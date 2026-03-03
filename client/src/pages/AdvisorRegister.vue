<template>
  <section class="advisor-register-wrapper">
    <div class="advisor-register-container">

      <!-- ================= SUCCESS STATE ================= -->
      <div v-if="submitted" class="success-state">
        <p class="form-eyebrow">Application Submitted</p>
        <h1 class="form-title">Thank You, {{ name }}.</h1>

        <p class="form-intro">
          Your application has been received and is currently under review.
          You will receive a confirmation email shortly with next steps.
        </p>

        <div class="email-preview">
          <p><strong>From:</strong> RESET Platform</p>
          <p><strong>To:</strong> {{ linkedinUrl || "your email on file" }}</p>
          <hr />
          <p>
            Hi {{ name }},
          </p>
          <p>
            Thank you for applying to become a Transition Advisor at RESET.
            Our team will review your application and reach out within 3–5 business days.
          </p>
          <p>
            We appreciate your willingness to support career shifters.
          </p>
          <p>
            — RESET Team
          </p>
        </div>

        <router-link to="/advisors" class="btn-primary">
          Return to Advisors
        </router-link>
      </div>

      <!-- ================= FORM ================= -->
      <div v-else>
        <p class="form-eyebrow">Transition Advisor Application</p>
        <h1 class="form-title">Become a Transition Advisor</h1>

        <p class="form-intro">
          If you have successfully transitioned into tech and want to guide others,
          share your experience and help career shifters navigate their journey.
        </p>

        <form @submit.prevent="submitAdvisor" class="advisor-form">

          <div class="form-section">
            <h3>Basic Information</h3>

            <div class="form-group">
              <label>Full Name</label>
              <input v-model="name" required />
            </div>

            <div class="form-group">
              <label>Public URL Slug</label>
              <input v-model="slug" required />
            </div>

            <div class="form-group">
              <label>Professional Title</label>
              <input v-model="title" />
            </div>
          </div>

          <div class="form-section">
            <h3>Profile</h3>

            <div class="form-group">
              <label>Short Bio</label>
              <textarea v-model="bio" rows="5"></textarea>
            </div>

            <div class="form-group">
              <label>Specialties (comma separated)</label>
              <input v-model="specialties" />
            </div>

            <div class="form-group">
              <label>Avatar URL</label>
              <input v-model="avatarUrl" />
            </div>
          </div>

          <div class="form-section">
            <h3>Links</h3>

            <div class="form-group">
              <label>LinkedIn URL</label>
              <input v-model="linkedinUrl" />
            </div>

            <div class="form-group">
              <label>Personal Website</label>
              <input v-model="websiteUrl" />
            </div>
          </div>

          <button type="submit" class="btn-primary submit-btn">
            Submit Application
          </button>

        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"
import API from "../services/api"

const name = ref("")
const slug = ref("")
const title = ref("")
const bio = ref("")
const specialties = ref("")
const avatarUrl = ref("")
const linkedinUrl = ref("")
const websiteUrl = ref("")
const submitted = ref(false)

const submitAdvisor = async () => {
  try {
    await API.post("/advisors/apply", {
      name: name.value,
      slug: slug.value,
      title: title.value,
      bio: bio.value,
      specialties: specialties.value
        ? specialties.value.split(",").map(s => s.trim()).filter(Boolean)
        : [],
      avatarUrl: avatarUrl.value,
      linkedinUrl: linkedinUrl.value,
      websiteUrl: websiteUrl.value
    })

    submitted.value = true
  } catch (err) {
    alert("Error submitting application.")
  }
}
</script>

<style scoped>
.advisor-register-wrapper {
  padding: 160px 20px;
  background-color: var(--cream);
}

.advisor-register-container {
  max-width: 850px;
  margin: 0 auto;
}

.form-eyebrow {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.85rem;
  color: var(--gray);
  margin-bottom: 20px;
}

.form-title {
  font-size: 3rem;
  margin-bottom: 25px;
}

.form-intro {
  max-width: 650px;
  margin-bottom: 80px;
  color: var(--gray);
  line-height: 1.9;
}

.advisor-form {
  display: flex;
  flex-direction: column;
  gap: 70px;
}

.form-section h3 {
  margin-bottom: 30px;
  font-size: 1.4rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

input,
textarea {
  padding: 14px;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  background-color: var(--white);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--terracotta);
}

.submit-btn {
  align-self: flex-start;
  margin-top: 20px;
}

/* ================= SUCCESS STATE ================= */

.success-state {
  text-align: left;
}

.email-preview {
  margin: 50px 0;
  padding: 30px;
  background-color: var(--white);
  border: 1px solid #eee;
  line-height: 1.8;
}

.email-preview hr {
  margin: 15px 0;
}
</style>