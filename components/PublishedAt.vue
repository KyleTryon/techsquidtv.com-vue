<template>
  <span>Published: {{ formatDate(date) }}</span>
</template>

<script>
import formatDate from '../utils/formatDate'
export default {
  props: ['date'],
  methods: {
    formatDate(date) {
      return formatDate(date)
    },
  },
}
</script>