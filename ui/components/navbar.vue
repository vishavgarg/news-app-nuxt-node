<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-gray-800">
    <div class=" px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:justify-start">
          <NuxtLink href="/" class="flex flex-shrink-0 items-center">
            <img class="hidden h-8 w-auto lg:block" src="../assets/logo/tnews-logo.svg" alt="Your Company">
          </NuxtLink>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[item.href == path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <Avatar :user-name="user?.name" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    href="/editprofile"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >
                    Edit
                    Profile
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    href="/editpassword"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >
                    Edit Password
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700', ]"
                    @click="signout"
                  >
                    Sign out
                  </NuxtLink>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { storeToRefs, mapActions } from 'pinia'
import { useAuthStore } from '~~/store'
</script>

<script lang="ts">
const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'My Articles', href: '/myarticles' },
  { name: 'Categories', href: '/categories' }
]
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { setUser } = mapActions(useAuthStore, ['setUser'])

export default {
  props: {
    path: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      user,
      setUser
    }
  },
  methods: {
    signout () {
      this.setUser({})
      localStorage.clear()
      navigateTo('/login')
    }
  }
}
</script>
