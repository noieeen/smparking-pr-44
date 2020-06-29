import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Config from '../views/Config.vue'
import ServerSide from '../views/ServerSide.vue'
import Recommend from '../views/ShowRecommend.vue'
import StatusList from '../views/StatusList.vue'

import { fb } from "../firebase";
require("firebase/auth");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/statuslist",
    name: "list",
    component: StatusList
  },
  {
    path: '/config',
    name: 'config',
    component: Config,
    meta: { requiresAuth: true },
    children: [{
      path: '/config',
      name: 'config',
      component: ServerSide,

    },
    // {
    //   part: 'config', query: { floor: 'id' },
    //   component: ServerSide
    // },
    {
      path: "/floor/:id",
      name: "ServerSide",
      component: ServerSide,
      props: true
    },
    ]
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
