<template>
  <main class="mainContainer">
    <article class="articleContainer grid grid-cols-12">
      <div class="col-span-12 lg:col-span-11">
        <nuxt-picture
          :src="article.headerImage"
          class="headerImage"
          alt=""
        ></nuxt-picture>
      </div>
        <div class="card col-span-12 lg:col-span-11 p-4 lg:p-12">
          <header>
            <h1 class="font-bold text-5xl py-4">
              {{ article.title }}
            </h1>
            <div class="flex text-sm flex-col w-full">
              <div class="text-xs flex flex-row justify-between">
                <read-time :readingTime="article.readingTime" class="py-1" />
                <published-at :date="article.createdAt" class="py-1" />
              </div>
            </div>
          </header>
          <div>
            <nuxt-content :document="article" />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-1">
          <social-share-bar :title="article.title"/>
        </div>
        <div class="card col-span-12 lg:col-span-11 px-2">
          <script
            src="https://giscus.app/client.js"
            data-repo="KyleTryon/techsquidtv.com"
            data-repo-id="MDEwOlJlcG9zaXRvcnk0MDA2OTYzMzk="
            data-category="Blog Comments"
            data-category-id="DIC_kwDOF-IkE84B-3RT"
            data-mapping="title"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-theme="light"
            crossorigin="anonymous"
            async
          ></script>
        </div>
    </article>
  </main>
</template>

<style>
img {
  @apply rounded-sm shadow-sm mx-auto;
  max-height: 40vh;
}

.headerImage img {
  @apply w-full object-cover;
}

.articleContainer ol {
  @apply list-decimal ml-8;
}

.articleContainer a {
  @apply text-purple-500;
}

</style>

<script>
import SocialShareBar from '~/components/SocialShareBar.vue'
export default {
  components: { SocialShareBar },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const article = await $content('blog', slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      article,
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.article.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.article.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://techsquidtv.com/blog/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://techsquidtv.com/blog/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.article.image,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.article.image,
        },
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: 'Kyle Tryon (TechSquidTV)' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://techsquidtv.com/blog/${this.$route.params.slug}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${this.$config.baseUrl}/blog/${this.$route.params.slug}`,
        mainImage: this.article.image,
      }
      return getSiteMeta(metaData)
    },
  },
}
</script>
