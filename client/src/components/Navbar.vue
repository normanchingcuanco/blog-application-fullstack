<template>
  <nav style="margin-bottom: 20px;">
    <router-link to="/">Home</router-link> |

    <router-link v-if="isLoggedIn" to="/create">
      Create Post
    </router-link> |

    <router-link v-if="isAdmin" to="/admin">
      Admin
    </router-link> |

    <router-link v-if="!isLoggedIn" to="/login">
      Login
    </router-link> |

    <router-link v-if="!isLoggedIn" to="/register">
      Register
    </router-link>

    <button v-if="isLoggedIn" @click="logout">
      Logout
    </button>
  </nav>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const user = computed(() => {
  return JSON.parse(localStorage.getItem("user"))
})

const isLoggedIn = computed(() => {
  return !!localStorage.getItem("token")
})

const isAdmin = computed(() => {
  return user.value?.isAdmin
})

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  router.push("/login")
}
</script>