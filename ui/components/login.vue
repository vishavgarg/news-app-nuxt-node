<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-black backdrop-blur-md bg-opacity-10 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              >
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              >
            </div>
          </div>
          <div>
            <button
              :disabled="!(email && password)"
              :class="['flex w-full justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm', email && password ? 'hover:bg-gray-800' : '', 'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2']"
            >
              Sign in
            </button>
          </div>
          <div class="mt-8 text-center">
            <NuxtLink to="/register" class="font-medium text-gray-800 hover:text-gray-500">
              Register new account
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs, mapActions } from 'pinia'
import { createToaster } from '@meforma/vue-toaster'
import { useAuthStore } from '../store'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const toaster = createToaster({
  type: 'warning',
  position: 'top-right'
})
const { setUser } = mapActions(useAuthStore, ['setUser'])
export default {
  data () {
    const config = useRuntimeConfig()
    return {
      email: '',
      password: '',
      setUser,
      config,
      user
    }
  },

  methods: {
    async login () {
      try {
        const user = await fetch(`${this.config.public.baseUrl}/user/login`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          })
        const res = await user.json()
        this.setUser(res.user)
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('token', res.token)
        navigateTo('/')
      } catch (err) {
        toaster.show('Invalid User Email or Password')
      }
    }
  }
}
</script>
