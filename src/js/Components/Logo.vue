<style lang="css">
  h1.title{
    max-width: 200px;
    margin: 25px auto;
  }
  .retro-icon{
    fill: #3c9;
  }
</style>
<template>
    <h1 class="title">
      <RetroIcon alt="Sprint Retro"
                 class="retro-icon"
                 @click="navigateHome">
    </h1>
</template>

<script>
import router from '../router';
import RetroIcon from 'img/retro.svg';

export default {
  components: {
    RetroIcon
  },
  methods: {
    navigateHome(){
      router.push('/');
    }
  }
}
</script>
