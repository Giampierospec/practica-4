import Vue from 'vue';
import App from './App.vue';
import Form from './Components/Form/Form';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
  {path:'/',component:App},
  {path:'/frm',component:Form}
];
const router = new VueRouter({
  routes
});
new Vue({
  el:'#app',
  router
});
