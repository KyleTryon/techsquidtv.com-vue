<template>
  <main class="mainContainer">
    <ul class="grid md:masonry-2">
      <li v-for="(post, index) in posts" :key="index" class="break-inside" :class="{ 'thisisfirst': index === 0 }">
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

<style>
@layer utilities {
  @variants responsive {
    .latestArticle {
      grid-column: 1 / span 2;
    }
  }
}
</style>

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
