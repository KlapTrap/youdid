import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home.vue';
import Commits from './views/Commits.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/prs',
      name: 'home',
      component: Home,
    },
    {
      path: '/commits',
      name: 'commits',
      component: Commits,
    },
    {
      path: '/*',
      redirect: '/prs',
    },
  ],
});

function hasQueryParams(route: Route) {
  return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
  if (!from) {
    next();
  }
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({ name: to.name, query: from.query });
  } else {
    next();
  }
});

export default router;
