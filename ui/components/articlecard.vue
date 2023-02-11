<template>
  <div class="bg-gray-100 p-4 rounded-2xl">
    <div>
      <div class="flex flex-row justify-between">
        <p class="text-xl font-semibold text-gray-900">
          {{ post.title }}
        </p>
        <Menu v-if="path == '/myarticles'" as="div" class="relative mx-3 inline-block text-left">
          <div>
            <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900">
              <ChevronDownIcon
                class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
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
              class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem>
                  <span class="text-gray-500 block px-4 py-2 text-sm cursor-pointer" @click="editArticle">Edit Article</span>
                </MenuItem>
                <MenuItem>
                  <span class="text-gray-500 block px-4 py-2 text-sm cursor-pointer" @click="deleteArticle">Delete Article</span>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <p
        style="-webkit-mask-image:linear-gradient(0deg, rgba(255, 255, 255, 0) 11.2%, #FFFFFF 93.91%)"
        class="mt-3 text-base h-32  text-gray-500"
      >
        {{ post.description }}
      </p>
      <NuxtLink :href="`/articles/${post.id}`" class="text-gray-500 border-b-2 border-gray-300">
        Click To Continue Reading
      </NuxtLink>
    </div>
    <div class="mt-6 flex items-center">
      <div class="flex-shrink-0">
        <span>
          <span class="sr-only">{{ post.user_name }}</span>
          <avatar :user-name="post.user_name" />
        </span>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">
          <span>{{ post.user_name }}</span>
        </p>
        <div class="flex space-x-1 text-sm text-gray-500">
          <time>{{ formattedDate(new Date(post.created_at)) }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {
  Menu, MenuButton, MenuItem, MenuItems
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

</script>
<script lang="ts">
import { defineComponent } from 'vue'
import formattedDate from './utils/formattedDate'
export default defineComponent({
  props: {
    post: {
      type: Object,
      default () {
        return {}
      }
    },
    getArticles: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  data () {
    const config = useRuntimeConfig()
    const route = useRoute()
    const routeName = route.path
    return {
      path: routeName,
      config,
      formattedDate
    }
  },
  methods: {
    editArticle () {
      navigateTo(`/editarticle/${this.post.id}`)
    },
    async deleteArticle () {
      await fetch(`${this.config.public.baseUrl}/articles/delete/${this.post.id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: localStorage.token
        }
      })
      this.getArticles()
    }
  }
})
</script>
