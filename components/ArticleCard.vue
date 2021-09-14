<template>
  <div>
    <article class="card h-full">
      <div class="cardHeader">
        <yt-video v-if="video" :vid="video" :title="vtitle"></yt-video>
        <nuxt-picture v-else :src="image" fit="cover" height="600px" loading="lazy" />
      </div>
      <summary class="p-4">
        <div class="text-xs flex flex-row justify-between">
          <read-time :readingTime="readingTime" class="py-1" />
          <published-at :created="createdAt" :updated="updatedAt" class="py-1" />
        </div>
        <h1 class="text-4xl">{{ title }}</h1>
        <p>{{ description }}</p>
      </summary>
    </article>
  </div>
</template>

<script lang="ts">
import ReadTime from './ReadTime.vue'
import YtVideo from './YtVideo.vue'
export default {
  components: { ReadTime, YtVideo },
  props: ['description', 'title', 'image', 'link', 'createdAt', 'updatedAt', 'readingTime', 'video', 'vtitle'],
}
</script>

<style>
.cardHeader img {
  width: 100%;
}
</style>
