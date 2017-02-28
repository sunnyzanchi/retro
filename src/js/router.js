import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Intro from 'Pages/Intro.vue';
import Main from 'Pages/Main.vue';
import Create from 'Pages/Create.vue';
import Sprint from 'Pages/CurrentSprint.vue';
import Err from 'Pages/Err.vue';
import Submitted from 'Pages/Submitted.vue';

Vue.component(Intro);
Vue.component(Main);
Vue.component(Create);
Vue.component(Sprint);
Vue.component(Err);
Vue.component(Submitted);

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
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
