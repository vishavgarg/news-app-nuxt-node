<template>
  <div>
    <Navbar :path="path" />
    <div class="mt-10">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { storeToRefs, mapActions } from 'pinia'
import { useAuthStore } from '~~/store'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { setUser } = mapActions(useAuthStore, ['setUser'])
export default {
  data () {
    return {
      path: '',
      user,
      setUser
    }
  },

  watch: {
    $route (newPath) {
      this.path = newPath.fullPath
    }
  },
  mounted () {
    if (!Object.keys(this.user).length) {
      localStorage.getItem('user') ? this.setUser(JSON.parse(localStorage.getItem('user') || '{}')) : navigateTo('/login')
    }
  },
  created () {
    const route = useRoute()
    const routeName = route.path
    this.path = routeName
  }
}
</script>
