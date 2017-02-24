import Vue from 'vue';
import router from './router';
import qwest from 'qwest';

const app = new Vue({
  router,
  el: '#app',
  created(){},
  data: {
    transition: ''
  },
  methods: {}
});

qwest.setDefaultOptions({
  dataType: 'json'
});
