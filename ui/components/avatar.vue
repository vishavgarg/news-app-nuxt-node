<template>
  <div>
    <span class="bg-gray-300 flex items-center justify-center rounded-full h-10 w-10 text-gray-900">{{
      getInitialLetters(userName)
    }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    userName: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    getInitialLetters (userName: string) {
      const matches = userName.match(/\b(\w)/g)
      return matches?.join('').substring(0, 2)
    }
  }
}
</script>
