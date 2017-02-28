<style lang="css">
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-to, .fade-leave{
    opacity: 1;
  }
  .fade-enter-active, .fade-leave-active{
    transition: .3s opacity;
  }
  .submitted{
    display: flex;
  }
  .submitted h1{
    color: #aaa;
    margin: auto;
  }
</style>
<template lang="html">
  <transition name="fade">
    <div class="submitted container">
      <h1>Submitted</h1>
    </div>
  </transition>
</template>

<script>
export default {
  mounted(){
    setTimeout(function(){
      this.$router.push('/');
    }, 1000);
  }
}
</script>
