<template>
  <div>
    <div class="relative mt-12 items-center justify-center flex flex-row  text-center">
      <h2 class="text-3xl capitalize font-bold tracking-tight text-gray-900 sm:text-4xl">
        {{ heading }}
      </h2>

      <div class="flex justify-end right-32 absolute">
        <NuxtLink
          href="/createarticle"
          class="flex justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Create New Article
        </NuxtLink>
      </div>
    </div>
    <div class="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-15 lg:pb-28">
      <div class="relative mx-auto max-w-lg lg:max-w-7xl">
        <div class="flex justify-end space-x-5">
          <div v-if="path=='/myarticles'" class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Type
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
                      <span
                        :disabled="accessType ==='public'"
                        :class="[`text-gray-500 block px-4 py-2 ${(accessType ==='public')? 'bg-gray-300': 'cursor-pointer'} text-sm`]"
                        @click="accessType = 'public'"
                      >
                        Public
                      </span>
                    </MenuItem>
                    <MenuItem>
                      <span
                        :disabled="accessType ==='private'"
                        :class="[`text-gray-500 block px-4 py-2 text-sm ${(accessType ==='private') ? 'bg-gray-300': 'cursor-pointer' }`]"
                        @click="accessType = 'private'"
                      >
                        Private
                      </span>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Sort
                  <FunnelIcon
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
                      <span
                        :disabled="sortOption ==='desc'"
                        :class="[`text-gray-500 block px-4 py-2 w-full text-sm ${(sortOption ==='desc') ? 'bg-gray-300' : 'cursor-pointer' } `]"
                        @click="sortOption = 'desc'"
                      >
                        Latest
                      </span>
                    </MenuItem>
                    <MenuItem>
                      <span
                        :disabled="sortOption ==='asc'"
                        :class="[`text-gray-500 block w-full px-4 py-2 text-sm ${(sortOption ==='asc') ? 'bg-gray-300' : 'cursor-pointer'}  `]"
                        @click="sortOption = 'asc'"
                      >
                        Oldest
                      </span>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div v-if="articles.length >0" class="grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          <Articlecard v-for="article in articles" :key="article.id" :post="article" :get-articles="getArticles" />
        </div>
        <div v-else class="text-2xl h-80 flex items-center justify-center tracking-tight text-gray-900 sm:text-xl">
          <span> You have not created any article yet. Please create a new article.</span>
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
import { FunnelIcon } from '@heroicons/vue/24/outline'

</script>

<script lang="ts">

type Articles = {
  id: number;
  title: string;
  description: string;
  public_access: boolean;
  category_id: number;
  user_id: number;
  created_at: Date;
  user_name: string;
  email: string;
  category_name: string;
}[]
export default {
  props: {
    posts: {
      type: Array as () => Articles,
      default () {
        return []
      }
    },
    heading: {
      type: String,
      default () {
        return ''
      }
    },
    getSortedArticles: {
      type: Function,
      default () {
        return () => {}
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
    const route = useRoute()
    const routeName = route.path
    return {
      categories: [],
      path: routeName,
      articles: [] as Articles,
      sortOption: 'asc',
      accessType: 'private'
    }
  },
  watch: {
    posts () {
      this.articles = this.posts
    },
    sortOption () {
      this.getSortedArticles(this.sortOption, this.accessType)
    },
    accessType () {
      this.getSortedArticles(this.sortOption, this.accessType)
    }
  }
}
</script>
