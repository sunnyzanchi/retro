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
    <Logo />
    <h1>New Sprint</h1>
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
    <button class="big-button"
            :disabled="!submittable"
            @click="submit">Create</button>
  </div>
</template>
<script>
import axios from 'axios';

import Logo from 'Components/Logo.vue';

export default {
  components: {
    Logo
  },
  computed: {
    submittable(){
      if(this.name.trim() !== '' &&
         this.start.trim() !== '' &&
         this.end.trim() !== '') return true;

      return false;
    }
  },
  data(){
    return {
      name: '',
      start: '',
      end: ''
    }
  },
  methods: {
    async submit(){
      try{
        await axios.put(`/api/sprints/${this.sprint}`, {
          start: this.start,
          end: this.end
        });
        this.$router.push('/submitted');
      }
      catch(err){
        this.$router.push('/err');
      }
    }
  }
}
</script>
