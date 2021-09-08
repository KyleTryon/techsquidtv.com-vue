<template>
  <div class="flex flex-col-reverse md:flex-row py-4 border-t border-b">
    <div class="px-2 flex flex-col justify-center flex-1">
      <h2>{{post.title}}</h2>
      <p>{{post.description}}</p>
      <div >
        <read-time :readingTime="post.readingTime" class="py-1" />
        <published-at :date="post.createdAt" class="py-1" />
      </div>
    </div>
    <div class="flex-1">
      <nuxt-picture :src="post.headerImage" fit="cover" class="block h-full"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>