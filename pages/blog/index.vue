<template>
  <main class="mainContainer">
    <div class="card">
    <div class="p-4">
      <h1 class="4xl">Blog</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <nuxt-link :to="post.path">
            <blog-list-item :post="post" />
          </nuxt-link>
        </li>
      </ul>
    </div>
    </div>
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

<style>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>