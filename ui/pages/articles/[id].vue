<template>
  <div>
    <Article :article-id="articleId" />
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      articleId: '' as string
    }
  },
  created () {
    const route = useRoute()
    this.articleId = route.params.id as string
  }
}
</script>
