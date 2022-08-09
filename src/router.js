import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue' 
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
   },
   {
    path: '/test',
    name: 'App',
    component: App
   }
  ]
})
