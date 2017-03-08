<style lang="scss">
  .sprint-item{
    border: 1px solid #ccc;
    border-top: 0;
    border-radius: 5px;
    transition: .2s background;

    &:hover{
      background: #eee;
      cursor: pointer;
    }

    &:first-of-type{
      border-top: 1px solid #ccc;
    }

    h1{
      display: inline-block;
      margin: 0;
    }
  }
  .list{
    ol{
      flex-grow: 2;
      list-style-type: none;
      padding: 10px;
    }
    li{
      padding: 5px;
      min-height: 50px;
    }
  }
  h1.title{
    margin: 25px auto;
    max-width: 200px;
    width: 80%;
  }
  .empty{
    background: url('/img/empty-state.svg');
    background-size: cover;
    display: flex;
    flex-grow: 2;
    justify-content: center;
  }
  .empty-message{
    color: #777;
    margin: auto;
    text-align: center;
  }
</style>
<template>
  <div class="list container">
    <Logo />
    <ol v-if="sprints.length > 0">
      <li class="sprint-item"
          v-for="sprint in sprints"
          @click="navigate(sprint.name)">
        <div>
          <h1>{{sprint.name}}</h1>
          <span class="date">{{sprint.end | humanizeDate}}</span>
        </div>
      </li>
    </ol>
    <div class="empty" v-else>
      <p class="empty-message">There are currently no sprints. Why not <router-link to="/create">make one</router-link>?</p>
    </div>
    <button class="big-button" @click="createSprint">New Sprint</button>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';

import Logo from 'Components/Logo.vue';

export default {
  async beforeRouteEnter(to, from, next){
    const {data} = await axios.get('/api/sprints');
    next(vm => vm.sprints = data);
  },
  components: {
    Logo
  },
  data(){
    return {
      sprints: []
    }
  },
  filters: {
    humanizeDate(val){
      return moment(val).format('MMM Do');
    }
  },
  methods: {
    navigate(sprintName){
      this.$router.push({
        name: 'sprint',
        params: {sprintName}
      });
    },
    createSprint(){
      this.$router.push('/create');
    }
  }
}
</script>
