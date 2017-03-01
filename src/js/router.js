import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Create from 'Pages/Create.vue';
import Err from 'Pages/Err.vue';
import Intro from 'Pages/Intro.vue';
import Main from 'Pages/Main.vue';
import Sprint from 'Pages/CurrentSprint.vue';
import Submitted from 'Pages/Submitted.vue';
import View from 'Pages/View.vue';

const routes = [
  {path: '/', component: Main},
  {path: '/create', component: Create},
  {
    name: 'sprint',
    path: '/sprint/:sprintName',
    component: Sprint
  },
  {path: '/err', component: Err},
  {
    name: 'submitted',
    path: '/submitted',
    component: Submitted
  },
  {
    name: 'view',
    path: '/view/:sprintName',
    component: View
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
