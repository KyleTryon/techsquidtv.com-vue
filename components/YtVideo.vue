<template>
    <div class="videoWrapper">
      <iframe
      :src="videoURL"
      title="YouTube video player"
      allow="autoplay; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: ["vid"],
  computed: {
    videoURL() {
      return `https://www.youtube.com/embed/${this.vid}`
    }
  }
}
</script>

<style>
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  width: 100%;

}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>