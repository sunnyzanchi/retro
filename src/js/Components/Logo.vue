<style lang="css">
  h1.title{
    max-width: 200px;
    margin: 25px auto;
  }
  h1.title:hover{
    cursor: pointer;
  }
  .retro-icon{
    fill: #3c9;
  }
</style>
<template>
    <h1 class="title">
      <RetroIcon alt="Sprint Retro"
                 class="retro-icon"
                 @click.native="navigateHome" />
    </h1>
</template>

<script>
import RetroIcon from 'img/retro.svg';

export default {
  components: {
    RetroIcon
  },
  methods: {
    navigateHome(){
      this.$router.push('/');
    }
  }
}
</script>
