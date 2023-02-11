<template>
  <div class=" flex flex-row w-full mt-8   mr-3 text-sm text-gray-900 dark:text-white">
    <div class="mr-4">
      <Avatar :user-name="comment.user_name" />
    </div>
    <div class="w-full">
      <div class="flex justify-between align-middle">
        <div>
          <span rel="author" class="font-bold text-lg text-gray-900 dark:text-white">{{
            comment.user_name
          }} <span class="ml-2 text-base text-gray-500">says</span> </span>
        </div>
        <div class="text-sm text-gray-500 mr-6 flex items-center">
          <time>{{ formattedDate(new Date(comment.created_at))
          }}</time>
        </div>
      </div>
      <div class="mt-3">
        <p class="lead mt-3 text-base text-gray-500">
          {{ comment.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import formattedDate from './utils/formattedDate'
import avatar from './avatar.vue'
export default {
  components: { avatar },
  props: {
    comment: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      formattedDate
    }
  },
  methods: {
  }
}
</script>
