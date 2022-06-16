import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import * as guards from "./guards";

const SignIn = () => import("../views/auth/SignIn.vue");
const SignUp = () => import("../views/auth/SignUp.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignIn,
  },
  {
    path: "/sign-out",
    name: "signUp",
    component: SignUp,
    beforeEnter: guards.guest,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "!text-amber-600 underline",
  linkExactActiveClass: "!text-amber-600 underline",
  routes,
});

export default router;
