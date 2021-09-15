<template>
  <iframe
    width="100%"
    height="315"
    :src="'https://www.youtube.com/embed/' + vid"
    :srcdoc="
      '<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/' +
      vid +
      '?autoplay=1><img src=' +
      thumbnailURL +
      ' loading=lazy alt=' +
      title +
      '><span>▶</span></a>'
    "
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    :title="title"
    loading="lazy"
  ></iframe>
</template>

<script>
export default {
  props: ['vid', 'title'],
  async fetch() {
    await this.getThumbnailURL()
  },
  methods: {
    async getThumbnailURL() {
      const JPG_URL = `https://i.ytimg.com/vi/${this.vid}/hqdefault.jpg`
      const WEBP_URL = `https://i.ytimg.com/vi_webp/${this.vid}/maxresdefault.webp`
      let response = await fetch(WEBP_URL)
      if (response.ok) {
        this.thumbnailURL = WEBP_URL
      } else {
        this.thumbnailURL = JPG_URL
      }
    },
    data() {
      return {
        thumbnailURL: `https://img.youtube.com/vi/${this.vid}/maxresdefault.jpg`,
      }
    },
  },
}
</script>
