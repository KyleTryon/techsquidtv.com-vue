<template>
  <div class="flex flex-col-reverse md:flex-row py-4 border-t border-b">
    <div class="px-2 flex flex-col justify-center flex-1">
      <h2>{{post.title}}</h2>
      <p>{{post.description}}</p>
      <div >
        <read-time :readingTime="post.readingTime" class="py-1" />
        <published-at :created="post.createdAt" :updated="post.updatedAt" class="py-1" />
      </div>
    </div>
    <div class="flex-1">
      <yt-video v-if="post.headerVideoID" :vid="post.headerVideoID"></yt-video>
      <nuxt-picture v-else :src="post.headerImage" fit="cover" class="block h-full"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>