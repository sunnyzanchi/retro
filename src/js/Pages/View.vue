<style lang="scss">
  .view{

    h1{
      text-align: center;
    }
    h2{
      margin: 0;
    }
    ul{
      list-style-type: none;
      padding: 0;
    }
    .comments{
      margin: 0 auto;
      max-width: 550px;
      padding: 5px;
      width: 100%;
    }
    .header{
      margin-bottom: 20px;
    }
    .name, .subtitle{
      display: block;
      float: none;
      margin: 0;
      text-align: center;
    }
    .subtitle{
      color: #aaa;
      font-size: 1.2em;
      font-style: italic;
    }
    .item{
      border: 1px solid #ccc;
      border-top: 0;
      border-radius: 5px;
      padding: 8px 5px;

      &:first-of-type{
        border-top: 1px solid #ccc;
      }
    }
    .item-group{
      margin-top: 5px;
      margin-bottom: 20px;
    }
  }
</style>
<template lang="html">
  <div class="view container">
    <Logo />
    <div class="header">
      <h1 class="name">{{sprint}}</h1>
      <h2 class="subtitle">{{randomSubtitle}}</h2>
    </div>
    <div class="comments">
      <ul>
        <li v-for="type in types">
          <h2>{{type}}</h2>
          <ul class="item-group">
            <li class="item"
                v-for="comment in comments"
                v-if="comment.type === type">{{comment.comment}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Logo from 'Components/Logo.vue';

export default {
  components: {
    Logo
  },
  computed: {
    randomSubtitle(){
      const index = Math.floor(Math.random() / (1 / this.availableSubtitles.length));

      return this.availableSubtitles[index];
    },
    types(){
      if(!Array.isArray(this.comments))return [];

      return this.comments.reduce(function(acc, val){
        if(!acc.includes(val.type)) acc.push(val.type);

        return acc;
      }, []);
    }
  },
  async created(){
    this.sprint = this.$route.params.sprintName;

    var {data} = await axios.get('/api/sprint', {params: {name: this.sprint}});
    this.comments = data.comments;
  },
  data(){
    return {
      comments: [],
      availableSubtitles: ['The results are in!', 'Nice', 'Check it out!'],
      sprint: null
    }
  }
}
</script>
