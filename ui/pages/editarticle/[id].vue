<template>
  <div class="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-15 lg:pb-28">
    <div class="relative mx-auto max-w-lg lg:max-w-7xl">
      <div class="h-full flex justify-center">
        <div class="w-1/2 mt-5 md:mt-0 md:col-span-2">
          <h2 class="mt-6 mb-9 text-3xl font-bold tracking-tight text-gray-900">
            Edit Article
          </h2>
          <form @submit.prevent="validateForm">
            <div class="shadow sm:rounded-md  sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <div class="w-full col-span-3 sm:col-span-2">
                    <label for="articleTitle" class="block text-xl font-semibold text-gray-900">
                      Article Title
                    </label>
                    <div class=" mt-3 flex rounded-md shadow-sm">
                      <input
                        id="articleTitle"
                        v-model="title"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5"
                        placeholder="Title of your Article"
                        required
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <label for="about" class="block text-xl font-semibold text-gray-900">
                    About
                  </label>
                  <div class="mt-3">
                    <textarea
                      id="about"
                      v-model="description"
                      rows="4"
                      required
                      class="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Description of your article"
                    />
                  </div>
                </div>
                <div class="flex items-center">
                  <input
                    id="checked-checkbox"
                    v-model="public_access"
                    type="checkbox"
                    value="true"
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                  >
                  <label
                    for="checked-checkbox"
                    class="ml-2 block text-l font-semibold text-gray-900"
                  >Public</label>
                </div>
                <div class="flex flex-col">
                  <label
                    for="categories"
                    class="mx-2 block text-l font-semibold text-gray-900"
                  >Category</label>
                  <select
                    id="categories"
                    v-model="category_id"
                    required
                    class="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  >
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  :class="['-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2', title && description && category_id && 'hover:bg-gray-800']"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { createToaster } from '@meforma/vue-toaster'
import { useAuthStore } from '~~/store'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const toaster = createToaster({
  type: 'warning',
  position: 'top-right'
})
type Categories = {
  id?: number;
  name?: string;
}[]
type Article = {
current_user_reaction: string
  id: number;
  title: string;
  description: string;
  public_access: boolean;
  category_id: number;
  user_id: number;
  created_at: Date;
  likesCount: number;
}
export default {
  data () {
    const route = useRoute()
    const routeName = route.path.split('/')[2]
    const config = useRuntimeConfig()
    return {
      path: routeName,
      article: {} as Article,
      categories: [] as Categories,
      newArticel: {},
      title: '',
      description: '',
      public_access: false,
      category_id: 1,
      config,
      user
    }
  },
  watch: {
    article () {
      this.title = this.article.title
      this.description = this.article.description
      this.public_access = this.article.public_access
      this.category_id = this.article.category_id
    }

  },
  created () {
    this.getCategories()
    this.getArticle()
  },
  methods: {
    validateForm () {
      let incorrectInput = ''
      if (this.title.length < 5 || this.title.trim() === '') {
        incorrectInput += 'Title should be atleast five letters long!. '
        toaster.show(incorrectInput)
      } else if (!(this.description.length > 6 && this.description.length < 500) || this.description.trim() === '') {
        incorrectInput += 'Description should be greater than 6 characters and less than 500 characters!\n'
        toaster.show(incorrectInput)
      } else {
        this.updateArticle()
      }
    },
    async updateArticle () {
      await fetch('http://localhost:3000/articles/update', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          id: this.path,
          title: this.title,
          description: this.description,
          public_access: !!this.public_access,
          category_id: this.category_id
        })
      })
      navigateTo(`/articles/${this.path}`)
    },
    async getCategories () {
      const categories = await fetch('http://localhost:3000/categories/all')
      this.categories = await categories.json()
    },
    async getArticle () {
      const article = await fetch(`${this.config.public.baseUrl}/articles/details/${this.path}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.user.id
        })
      })
      this.article = await article.json()
      this.title = this.article.title
    }
  }

}
</script>
