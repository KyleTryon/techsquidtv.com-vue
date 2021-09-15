<template>
  <div>
    <ts-nav />
    <nuxt />
    <footer class="text-center mt-4">
      <follow-bar />
      <p>This website is made with <a href="https://nuxtjs.org/">NuxtJS</a> and is open-source</p>
      <p>Find an issue or want to contribute? Jump over to GitHub</p>
    </footer>
  </div>
</template>

<style>
footer a {
  @apply text-purple-700
}
</style>