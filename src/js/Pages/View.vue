<style lang="css">
</style>
<template lang="html">
  <div class="view container">
    <ul>
      <li v-for="comment in comments"></li>
    </ul>
  </div>
</template>
<script>
import qwest from 'qwest';

export default {
  created(){
    const self = this;
    this.sprint = this.$route.params.sprintName;

    qwest.get('/api/sprint', {name: this.sprint})
  }
}
</script>
