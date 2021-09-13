<template>
  <aside class="p-2">
    <ul>
      <li v-for="chapter in titles" :key="chapter.id" class="py-1">
        <a :href='"#" + chapter.id'
          :class="{
            'text-purple-500 hover:text-purple-600': chapter.id === currentChapter,
          }" >{{chapter.text}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: ['toc', 'currentChapter'],
  computed: {
    titles() {
      return this.toc.filter(chapter => chapter.depth === 2)
    }
  }
}
</script>