<template>
  <div class="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-15 lg:pb-28">
    <div class="relative mx-auto max-w-lg lg:max-w-7xl">
      <div class="h-full flex justify-center">
        <div class="w-full md:w-3/5 p-8 bg-white  shadow-md">
          <span class="text-xl font-semibold block"> Edit Your Profile</span>
          <div class="pb-6 mt-6">
            <label for="name" class="font-semibold text-gray-700 block pb-1">Name</label>
            <div class="flex">
              <input
                id="username"
                v-model="name"
                required
                class="rounded-r border border-gray-300  px-4 py-2 w-full"
                type="text"
                placeholder="Enter name"
              >
            </div>
          </div>
          <div class="pb-4">
            <label for="email" class="font-semibold text-gray-700 block pb-1">Email</label>
            <input
              id="email"
              v-model="email"
              required
              class="border border-gray-300   rounded-r px-4 py-2 w-full"
              type="email"
              placeholder="Enter Email"
            >
          </div>
          <div class="flex justify-end">
            <span
              href="#"
              :class="['-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 cursor-pointer', name && email ? 'hover:bg-gray-800' : '']"
              @click="validateForm"
            >Save</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, storeToRefs } from 'pinia'
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
      name: '',
      email: '',
      setUser,
      config,
      user
    }
  },
  created () {
    this.name = this.user.name
    this.email = this.user.email
  },
  methods: {
    validateForm () {
      if (this.name.length < 5 || this.name.trim() === '') {
        toaster.show('Name should be atleast six letters long!')
      } else {
        this.editProfile()
      }
    },
    async editProfile () {
      const user = await fetch(`${this.config.public.baseUrl}/user/update`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            Authorization: localStorage.token
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email
          })
        })
      const res = await user
      if (res.status === 401) {
        toaster.show('Email already exists!')
      } else {
        const response = await res.json()
        toaster.show(response.status)
        const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), name: this.name, email: this.email }
        this.setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    }
  }
}
</script>
