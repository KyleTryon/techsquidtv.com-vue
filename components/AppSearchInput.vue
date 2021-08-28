<script>
  export default {
    data() {
      return {
      searchQuery: '',
      articles: [],
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = [];
          return;
        }
        this.articles = await this.$content('articles')
          .limit(12)
          .search(searchQuery)
          .fetch();
      }
    }
}
</script>