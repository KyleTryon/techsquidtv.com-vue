import getSiteMeta from "./utils/getSiteMeta";
const meta = getSiteMeta();

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TechSquidTV - Developer Content Creator Blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "HandheldFriendly", content: "True" },
      {
        hid: 'description',
        name: 'description',
        content: 'Blog posts and videos for developers on topics such as Docker, TypeScript, Hardware and Development.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { property: "og:site_name", content: "TechSquidTV Blog" },
      { hid: "og:type", property: "og:type", content: "website" },

      {
        hid: "og:description",
        property: "og:description",
        content: "Blog posts and videos for developers on topics such as Docker, TypeScript, Hardware and Development.",
      },
      { property: "og:image:width", content: "1080" },
      { property: "og:image:height", content: "1080" },
      { name: "twitter:site", content: "@techsquidtv" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, {
      hid: "canonical",
      rel: "canonical",
      href: "https://techsquidtv.com",
    },],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [`./static/global.css`],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
  ],

  generate: {
    // choose to suit your project
    interval: 2000,
    fallback: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    hostname: 'website.com'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  image: {
    // Options
  },

  googleFonts: {
    families: {
      Arimo: [400, 900],
      Nunito: [300, 900],
    },
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)
        document.readingTime = text
      }
    }
  }

}
