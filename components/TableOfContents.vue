<template>
  <aside class="p-2">
    <ul>
      <li v-for="chapter in toc" :key="chapter.id" class="py-1">
        <a :href='"#" + chapter.id'
          :class="{
            'text-purple-500 hover:text-purple-600': chapter.id === currentChapter,
            'text-md font-bold': chapter.depth == 1,
            'text-sm pl-1': chapter.depth == 2,
            'text-xs pl-2': chapter.depth == 3,
          }" >{{chapter.text}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: ['toc', 'currentChapter'],
}
</script>