<template>
  <main class="mainContainer">
    <ul class="grid md:grid-cols-2 gap-6">
      <li v-for="post in posts" :key="post.title" class="md:first:col-span-2">
        <nuxt-link :to="post.path">
          <article-card
            :title="post.title"
            :description="post.description"
            :image="post.headerImage"
            :tags="post.categories"
            :createdAt="post.createdAt"
            :readingTime="post.readingTime"
          />
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, error }) {
    const posts = await $content('blog')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Failed to fetch post' })
      })
    return {
      posts,
    }
  },
}
</script>
