<template>
  <main class="mainContainer">
    <article class="grid grid-layout-1 lg:grid-layout-3">
      <div class="grid-item headerArea lg:headerArea-lg">
        <yt-video
          v-if="article.headerVideoID"
          :vid="article.headerVideoID"
          :title="article.headerVideoTitle"
        ></yt-video>
        <nuxt-picture
          v-else
          :src="article.headerImage"
          class="headerImage"
          :alt="article.title"
        ></nuxt-picture>
      </div>
      <div class="grid-item lg:tocArea-lg mx-auto">
        <div class="hidden lg:block lg:sticky lg:top-12">
          <table-of-contents
            :toc="article.toc"
            :currentChapter="currentChapter"
          />
          <div class="flex flex-row flex-wrap p-2 rounded border mx-2">
            <nuxt-link
              v-for="tag in article.tags"
              :key="tag"
              :to="'/blog/tags/' + tag"
            >
              <div class="m-2">
                <span
                  class="
                    text-xs
                    bg-purple-400
                    rounded-sm
                    shadow-sm
                    p-1
                    text-white
                  "
                  >{{ tag }}</span
                >
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="grid-item contentArea lg:contentArea-lg card px-4 lg:px-8">
        <header>
          <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl py-6">
            {{ article.title }}
          </h1>
          <div class="flex text-sm flex-col w-full mb-2">
            <div class="text-xs flex flex-row justify-between">
              <read-time :readingTime="article.readingTime" class="py-1" />
              <published-at
                :created="article.createdAt"
                :updated="article.updatedAt"
                class="py-1"
              />
            </div>
          </div>
        </header>
        <div>
          <nuxt-content :document="article" />
        </div>
      </div>
      <div class="grid-item lg:socialArea-lg">
        <social-share-bar :title="article.title" />
      </div>
      <div class="grid-item lg:newsletterArea-lg">
        <revue-signup />
      </div>
      <div class="grid-item lg:commentArea-lg">
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
@layer utilities {
  @variants responsive {
    .grid-layout-3 {
      column-count: 3;
      grid-template-columns: 2fr 9.5fr 0.5fr;
    }

    .headerArea-lg {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }

    .contentArea-lg {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
    }

    .socialArea-lg {
      grid-column: 3 / span 1;
      grid-row: 2 / span 1;
    }

    .tocArea-lg {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }

    .newsletterArea-lg {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
    }

    .commentArea-lg {
      grid-column: 2 / span 1;
      grid-row: 4 / span 1;
    }
  }
}

iframe {
  @apply mx-auto;
}

.grid-item {
  min-width: 0;
  min-height: 0;
}

article ol {
  @apply list-decimal ml-8;
}

article h2 {
  @apply text-3xl;
}

article h3 {
  @apply text-2xl;
}

article h4 {
  @apply text-xl;
}
</style>

<script>
import SocialShareBar from '~/components/SocialShareBar.vue'
import YtVideo from '~/components/YtVideo.vue'
export default {
  components: { SocialShareBar, YtVideo },
  data() {
    return {
      currentChapter: '',
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0.5,
      },
    }
  },
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
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting) {
          this.currentChapter = id
        }
      })
    }, this.observerOptions)
    // Track all sections that have an `id` applied
    document.querySelectorAll('.nuxt-content h2[id]').forEach((section) => {
      this.observer.observe(section)
    })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  head() {
    return {
      title: `${this.article.title}`,
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
          content: this.article.headerImage,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.article.headerImage,
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
