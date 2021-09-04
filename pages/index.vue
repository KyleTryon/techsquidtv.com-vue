<template>
  <main class="mainContainer">
    <ul class="masonry-1 md:masonry-2">
      <li v-for="post in posts" :key="post.title" class="break-inside mb-4">
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
