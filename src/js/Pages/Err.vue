<style lang="scss">
  .err{
    h1{
      text-align: center;
    }
  }
</style>
<template lang="html">
  <div class="err">
    <Logo />
    <h1>Something went wrong!</h1>
  </div>
</template>

<script>
import Logo from 'Components/Logo.vue';

export default {
  components: {
    Logo
  }
}
</script>
