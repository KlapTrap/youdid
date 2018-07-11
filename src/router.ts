import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Commits from './views/Commits.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/commits',
      name: 'commits',
      component: Commits
    }
  ]
});
