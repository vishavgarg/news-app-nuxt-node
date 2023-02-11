<template>
  <div class="px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-15 lg:pb-28">
    <div class=" relative mx-auto max-w-lg lg:max-w-7xl">
      <div class="flex justify-end ">
        <NuxtLink href="/createcategory" class="flex mb-14  justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Create Category
        </NuxtLink>
      </div>
      <div class="grid gap-16 pt-12 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex  justify-center h-30 w-60  cursor-pointer"
          @click="handleClick(category.name, category.id)"
        >
          <div
            class="flex items-center justify-center font- h-full w-full  p-6 rounded-lg shadow-lg bg-gray-700 hover:bg-gray-800 max-w-sm"
          >
            <h5 class="text-white text-xl leading-tight font-medium mb-2">
              {{ category.name }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type Categories = {
  id: number;
  name: string;
}[]
export default {
  data () {
    const config = useRuntimeConfig()
    return {
      categories: [] as Categories,
      config
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const categories = await fetch(`${this.config.public.baseUrl}/categories/all`)
      this.categories = await categories.json()
    },
    handleClick (categoryName: string, categoryId: number) {
      navigateTo(`/${categoryName.toLowerCase()}/${categoryId}`)
    }
  }
}
</script>
