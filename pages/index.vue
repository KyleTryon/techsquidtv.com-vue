<template>
  <main class="mainContainer">
    <ul class="grid grid-layout-1 md:masonry-2 items-stretch">
      <li v-for="(post, index) in posts" :key="index" class="break-inside" :class="{ 'md:latestArticle': index === 0 }">
        <nuxt-link :to="post.path">
          <article-card
            class="h-full pb-2"
            :title="post.title"
            :description="post.description"
            :image="post.headerImage"
            :tags="post.categories"
            :createdAt="post.createdAt"
            :updatedAt="post.updatedAt"
            :readingTime="post.readingTime"
            :video="post.headerVideoID"
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
      .sortBy('createdAt', 'desc')
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
