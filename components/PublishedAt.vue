<template>
  <div class="flex flex-col">
    <span v-if="updated">Last updated: {{ formatDate(updated) }}</span>
    <span v-else>Published: {{ formatDate(created) }}</span>
  </div>
</template>

<script>
import formatDate from '../utils/formatDate'
export default {
  props: ['created', 'updated'],
  methods: {
    formatDate(date) {
      return formatDate(date)
    },
  },
}
</script>