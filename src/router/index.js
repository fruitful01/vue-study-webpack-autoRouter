import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'; // 引入routes
console.log('routes----', routes);
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
