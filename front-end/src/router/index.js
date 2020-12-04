import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from "../views/About.vue";
import Recipes from "../views/Recipes.vue";
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
