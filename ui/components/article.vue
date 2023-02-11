<template>
  <div class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white">
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
        <header class="mb-4 lg:mb-6 not-format">
          <address class="flex items-center mb-6 not-italic">
            <div class="w-full  inline-flex items-center mr-3 text-sm text-gray-900">
              <div class="mr-4">
                <Avatar :user-name="user?.name" />
              </div>
              <div class="w-full flex justify-between">
                <div>
                  <span href="#" rel="author" class="text-xl font-bold text-gray-900">{{
                    article.title
                  }}</span>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time>{{ formattedDate(new Date(`${article.created_at}`)) }}</time>
                  </div>
                </div>
                <div class="mr-4 cursor-pointer">
                  <Likebutton :current-user-reaction="reaction" @click="changeReaction" />
                  <span class="flex mt-2 text-sm text-gray-500">Liked by <p
                    class="text-gray-900 font-medium mx-1"
                  >{{ article.likesCount }}</p>
                    People</span>
                </div>
              </div>
            </div>
          </address>
          <h1
            class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
          >
            {{ article.title }}
          </h1>
        </header>
        <p class="lead mt-3 text-base text-gray-500">
          {{ article.description }}
        </p>
        <div class="my-7">
          <span class="text-xl font-bold text-gray-900">Comments</span>
          <Showcomment v-for="comment in comments" :key="comment.id" :comment="comment" />
        </div>
        <div class="flex flex-col space-y-6">
          <span class="text-xl font-bold text-gray-900">Leave a Comment</span>
          <commentbox
            :get-article="getArticle"
            :article_id="article.id"
            :user_id="user?.id"
            :user-name="user?.name"
          />
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import formattedDate from './utils/formattedDate'
import { useAuthStore } from '~~/store'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
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
type Comments ={
  id: string;
  comment: string;
  article_id: number;
  user_id: number;
  created_at: Date;
  user_name: string;
}[]
export default {
  props: {
    articleId: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    const config = useRuntimeConfig()
    const route = useRoute()
    const routeName = route.path
    return {
      path: routeName,
      article: {} as Article,
      user,
      comments: [] as Comments,
      reaction: '',
      config,
      formattedDate
    }
  },
  watch: {
    user () {
      this.getArticle()
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    async getArticle () {
      const article = await fetch(`${this.config.public.baseUrl}/articles/details/${this.articleId}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.user.id
        })
      })
      this.article = await article.json()
      this.reaction = this.article.current_user_reaction
      const comments = await fetch(`${this.config.public.baseUrl}/comments/article/${this.article.id}`, {
        headers: {
          'content-type': 'application/json'
        }
      })
      this.comments = await comments.json()
    },
    async changeReaction () {
      await fetch(`${this.config.public.baseUrl}/reactions/change-reaction`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            reaction: `${this.reaction ? '' : 'like'}`,
            user_id: this.user.id,
            article_id: this.article.id
          })
        }
      )
      this.getArticle()
    }
  }
}
</script>
