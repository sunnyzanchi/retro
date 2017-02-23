<style lang="scss">
  .comments{
    padding: 5px;
    
    h1{
      font-size: 1.4em;
      margin: 0;
    }
    textarea{
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: auto;
      max-width: 500px;
      resize: none;
      width: 80%;
    }
  }

</style>
<template lang="html">
  <div class="comments">
    <h1>{{title}}</h1>
    <textarea v-for="comment in comments"></textarea>
    <button @click="addComment">+</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      comments: ['']
    }
  },
  methods: {
    addComment(){
      this.comments.push('');
    }
  },
  props: ['title']
}
</script>
