<style lang="css">
</style>
<template lang="html">
  <div class="view container">
    <ul>
      <li v-for="type in types">
        <ul>
          <li v-for="comment in comments">{{comment.comment}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  computed: {
    types(){
      if(!Array.isArray(this.comments))return [];

      return this.comments.reduce(function(acc, val){
        if(!acc.includes(val.type)) acc.push(val.type);
        return acc;
      },[]);
    }
  },
  async created(){
    this.sprint = this.$route.params.sprintName;

    var {data} = await axios.get('/api/sprint', {params: {name: this.sprint}});
    this.comments = data.comments;
  },
  data(){
    return {
      comments: []
    }
  }
}
</script>
