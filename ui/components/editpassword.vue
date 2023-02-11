<template>
  <div class="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-15 lg:pb-28">
    <div class="relative mx-auto max-w-lg lg:max-w-7xl">
      <div class="h-full flex justify-center">
        <div class="w-full md:w-3/5 p-8 bg-white  shadow-md">
          <span class="text-xl font-semibold block"> Change Password</span>
          <div class="pb-4 mt-6">
            <label for="oldPassword" class="font-semibold text-gray-700 block pb-1">Old Password</label>
            <input
              id="oldPassword"
              v-model="oldPassword"
              class="border border-gray-300   rounded-r px-4 py-2 w-full"
              type="password"
            >
          </div>
          <div class="pb-4">
            <label for="newPassword" class="font-semibold text-gray-700 block pb-1">New Password</label>
            <input
              id="newPassword"
              v-model="newPassword"
              class="border border-gray-300   rounded-r px-4 py-2 w-full"
              type="password"
            >
          </div>
          <div class="pb-4">
            <label for="confirmPassword" class="font-semibold text-gray-700 block pb-1">Confirm
              Password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              class="border border-gray-300   rounded-r px-4 py-2 w-full"
              type="password"
            >
          </div>
          <div class="flex justify-end">
            <span
              class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 cursor-pointer"
              @click="validateForm"
            >Save</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createToaster } from '@meforma/vue-toaster'
const toaster = createToaster({
  type: 'warning',
  position: 'top-right'
})
export default {
  data () {
    const config = useRuntimeConfig()
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      config
    }
  },
  methods: {
    validateForm () {
      let incorrectInput = ''
      if (this.newPassword.length < 6 || this.newPassword.trim() === '') {
        incorrectInput += 'Password should be atleast six letters long!. '
        toaster.show(incorrectInput)
      } else if (this.newPassword !== this.confirmPassword) {
        incorrectInput += 'Confirm password doesnot match'
        toaster.show(incorrectInput)
      } else {
        this.updatePassword()
      }
    },
    async updatePassword () {
      const user = await fetch(`${this.config.public.baseUrl}/user/update-password`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            Authorization: localStorage.token
          },
          body: JSON.stringify({
            old_password: this.oldPassword,
            new_password: this.newPassword
          })
        })
      const res = await user
      if (res.status === 401) {
        toaster.show('Old password is incorrect!')
      } else {
        const response = await res.json()
        toaster.show(response.status)
      }
    }
  }
}
</script>
