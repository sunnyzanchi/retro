<style lang="scss">
  .sprint{
    display: flex;
    flex-direction: column;
    height: 100%;

    .name, .date{
      display: block;
      float: none;
      margin: 0;
      text-align: center;
    }
    .date{
      color: #aaa;
      font-size: 1.2em;
      font-style: italic;
    }
    .header{
      margin-bottom: 20px;
    }
    ul{
      list-style-type: none;
      padding: 0;
    }
  }
</style>
<template lang="html">
  <div class="container">
    <Logo />
    <div class="sprint">
      <div class="header">
        <h1 class="name">{{sprint}}</h1>
        <h2 class="date">Ends in {{daysTilEnd}}</h2>
      </div>
      <ul>
        <li v-for="type in types">
          <CommentCreator :title="type.name"
                          v-model="type.comments"/>
        </li>
      </ul>
      <button class="big-button"
              :disabled="!submittable"
              @click="submit">Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import CommentCreator from 'Components/CommentCreator.vue';
import Logo from 'Components/Logo.vue';

export default {
  async created(){
    this.sprint = this.$route.params.sprintName;

    try{
      const {data} = await axios.get(`/api/sprints/${this.sprint}`);
      this.start = data.meta.start;
      this.end = data.meta.end;
    }
    catch(err){
      console.log(err);
      this.$router.replace('/err');
    }
  },
  components: {
    CommentCreator,
    Logo
  },
  computed: {
    daysTilEnd(){
      const end = moment(this.end);
      const days = end.diff(moment(), 'days') + 1;

      return calculate(days);

      function calculate(days){
        if(days === 1) return 'one day';
        if(days < 7) return numberToWord(days) + ' days'
        if(days === 7) return 'one week';
        if(days < 14) return 'a week and ' + calculate(days - 7);
        if(days === 14) return 'two weeks'
        return 'over two weeks';
      }

      function numberToWord(number){
        if(number === 1) return 'one';
        if(number === 2) return 'two';
        if(number === 3) return 'three';
        if(number === 4) return 'four';
        if(number === 5) return 'five';
        if(number === 6) return 'six';
        if(number === 7) return 'seven';
        if(number === 8) return 'eight';
        if(number === 9) return 'nine';
        return number;
      }
    },
    submittable(){
      for(let type of this.types){
        if(typeof type.comments[0] === 'string' && type.comments[0].trim() !== '') return true;
      }
      return false;
    }
  },
  data(){
    return {
      end: null,
      sprint: null,
      start: null,
      types: [
        {
          name: 'The Good',
          comments: []
        },
        {
          name: 'The Bad',
          comments: []
        },
        {
          name: 'Suggestions',
          comments: []
        }
      ]
    }
  },
  filters: {
    humanizeDays(days){
    }
  },
  methods: {
    async submit(){
      const user = localStorage.getItem('name');
      const data = [];

      for(let type of this.types){
        for(let comment of type.comments){
          data.push({
            comment,
            user,
            type: type.name
          });
        }
      }

      try{
        await axios.post(`/api/sprints/${this.sprint}/comments`, data);
        this.$router.push('/submitted');
      }
      catch(err){
        this.$router.push('/err');
      }

    }
  }
}
</script>
