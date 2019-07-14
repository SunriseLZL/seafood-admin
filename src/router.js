import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/",
      redirect: "/login",
      component: () => import("./views/Layout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("./views/Home.vue"),
        }, {
          path: "/order",
          name: "order",
          component: () => import("./views/Order.vue"),
        }, {
          path: "/store",
          name: "store",
          component: () => import("./views/Food.vue"),
        }, {
          path: "/user",
          name: "user",
          component: () => import("./views/User.vue"),
        },
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    }
  ]
});
