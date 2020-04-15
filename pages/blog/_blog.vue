<template>
  <div>
    <h1>{{blogPost.title}}</h1>
    <p>{{blogPost.description}}</p>
    <p v-html="$md.render(blogPost.body)" />
  </div>
</template>

<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload };
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`),
      }
  },
}
</script>
