<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }

  .intro{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    overflow: auto;
    text-align: center;
    width: 100%;

    .title-container{
      display: flex;
      height: 50%;
      justify-content: center;
      h1.title{
        margin: auto;
        width: 80%;
      }
    }

    .name-container{
      height: 50%;

      input{
        border: 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        text-align: center;
        transition: border .1s;
        &:focus{
          border-bottom: 2px solid #36E3CF;
          outline: none;
        }
      }
      button{
        background: transparent;
        border: 0;
        display: block;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        margin: auto;
        text-transform: uppercase;
      }
    }
  }
</style>
<template>
  <div class="intro">
    <div class="title-container">
      <h1 class="title" key="title">
        <RetroIcon alt="Sprint Retro" class="retro-icon">
      </h1>
    </div>
    <div class="name-container">
      <p>Enter your name to continue</p>
      <input type="text" v-model="name" @keydown.enter="submit">
      <transition name="fade">
        <button v-show="name" @click="submit">Submit</button>
      </transition>
    </div>
  </div>
</template>
<script>
import RetroIcon from 'img/retro.svg';

export default {
  components: {
    RetroIcon
  },
  data(){
    return{
      name: ''
    }
  },
  methods: {
    submit(){
      localStorage.setItem('name', this.name);
      this.$emit('namesubmit');
    }
  }
}
</script>
