<style lang="scss">
  .err{
    h1{
      text-align: center;
    }
  }
</style>
<template lang="html">
  <div class="err">
    <h1 class="title">
      <RetroIcon class="retro-icon" />
    </h1>
    <h1>Something went wrong!</h1>
  </div>
</template>

<script>
import RetroIcon from 'img/retro.svg';

export default {
  components: {
    RetroIcon
  }
}
</script>
