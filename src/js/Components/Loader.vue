<style lang="css">
  @keyframes blip {
    0% {transform: translateX(0);}
    50% {transform: translateX(96px);}
    100% {transform: translateX(0);}
  }
  @keyframes msg {
    0% {opacity: 1;}
    75% {opacity: 1;}
    100% {opacity: 0;}
  }
  .loading{
    background: rgba(51, 204, 153, .3);
    margin: 10px auto 0;
    width: 100px;
    height: 4px;
  }
  .loading-blip{
    animation: 2s blip infinite;
    background: #3c9;
    height: 4px;
    width: 4px;
  }
  .collapse-enter{
    transform: scaleY(0);
    transition: .3s transform;
  }
  .collapse-enter-to{
    transform: scaleY(1);
  }
  .collapse-leave{
    transform: scaleY(1);
    transition: .3s transform;
  }
  .collapse-leave-to{
    transform: scaleY(0);
  }
  .msg{
    animation: 2s msg;
    color: #3c9;
    margin: 5px 0 0;
    text-align: center;
  }
</style>
<template lang="html">
  <transition name="collapse">
    <div v-if="active" class="loading">
      <div class="loading-blip"></div>
    </div>
    <p class="msg" v-else>{{msg}}</p>
  </transition>
</template>
<script>
export default {
  props: ['active', 'msg']
}
</script>
