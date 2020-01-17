import Vue from 'vue';
import App from './app.vue';
import router from './router/index';
import './index.css';
Promise.resolve().finally();
new Vue({
  el: '#root',
  router,
  render: (h) => h(App),
});

console.log(process.env.NODE_ENV);
