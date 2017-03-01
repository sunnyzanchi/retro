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
import qwest from 'qwest';

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
  created(){
    const self = this;
    this.sprint = this.$route.params.sprintName;

    qwest.get('/api/sprint', {name: this.sprint})
    .then(function(xhr, response){
      self.comments = response.comments;
    })
    //TODO: Handle error
    .catch(err => err);
  },
  data(){
    return {
      comments: []
    }
  }
}
</script>
