<template>
  <div>
    <article
      class="card "
    >
      <div class="">
        <nuxt-picture :src="image" fit="cover" height="600px"/>
      </div>
      <summary class="p-4">
        <div class="text-xs flex flex-row justify-between">
          <read-time :readingTime="readingTime" class="py-1" />
          <published-at :date="createdAt" class="py-1" />
        </div>
        <h1 class="font-black text-4xl">{{title}}</h1>
        <p>{{description}}</p>
      </summary>
    </article>
  </div>
</template>

<script lang="ts">
import ReadTime from './ReadTime.vue'
export default {
  components: { ReadTime },
  props: ['description', 'title', 'image', 'link', 'createdAt', "readingTime"]
}
</script>

<style></style>
