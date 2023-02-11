<template>
  <div>
    <Articles :heading="heading" :posts="articles" :get-sorted-articles="getSortedArticles" :get-articles="getArticles" />
  </div>
</template>

<script lang="ts">
export default {
  data () {
    const config = useRuntimeConfig()
    const heading = 'My Private publications'
    return {
      articles: [],
      heading,
      config
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const articles = await fetch(`${this.config.public.baseUrl}/articles/user`, {
        headers: {
          Authorization: localStorage.token
        }
      })
      this.articles = await articles.json()
    },
    async getSortedArticles (type = 'asc', accessType: string) {
      const article = await fetch(`${this.config.public.baseUrl}/articles/user?` + new URLSearchParams({ date_order: type, access_type: accessType }), {
        headers: {
          Authorization: localStorage.token
        }
      })
      this.heading = (accessType === 'public')
        ? 'My Public Publications'
        : 'My Private Publication'
      this.articles = await article.json()
    }
  }
}
</script>
