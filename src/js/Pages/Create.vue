<style lang="scss">
  .create{

    .inputs{
      flex-grow: 2;
    }
    .input-section{
      width: 70%;
      margin: 10px auto;
    }
    h1{
      text-align: center;
    }
    input{
      width: 100%;
    }
    label{
      display: block;
    }
  }
</style>
<template lang="html">
  <div class="create container">
    <h1 class="title">
      <RetroIcon class="retro-icon" />
    </h1>
    <h1>Create</h1>
    <div class="inputs">
      <div class="input-section">
        <label for="name">Name</label>
        <input type="text"
               name="name"
               v-model="name">
      </div>
      <div class="input-section">
        <label for="start">Start Date</label>
        <input type="date"
               name="start"
               v-model="start">
      </div>
      <div class="input-section">
        <label for="end">End Date</label>
        <input type="date"
               name="end"
               v-model="end">
      </div>
    </div>
    <button class="big-button" @click="submit">Submit</button>
  </div>
</template>

<script>
import qwest from 'qwest';
import router from '../router';

import RetroIcon from 'img/retro.svg';

export default {
  components: {
    RetroIcon
  },
  data(){
    return {
      name: '',
      start: '',
      end: ''
    }
  },
  methods: {
    submit(){
      qwest.post('/api/sprint', {
        name: this.name,
        start: this.start,
        end: this.end
      }, {dataType: 'json'});
    }
  }
}
</script>
