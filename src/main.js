import Vue from 'vue'
import axios from "axios";
//axios全局配置
axios.defaults.withCredentials=true;
axios.defaults.crossDomain = true;
// axios.defaults.baseURL='http://192.168.50.198/';
axios.defaults.headers.common['token']='55a7fe525b5383feb4093d39dfd25062';
axios.defaults.headers.post['Content-type']='application/json';
Vue.prototype.$axios=axios;
import App from './App.vue'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import  comp from "./components/comp.js"

import '@/icons'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:comp
}).$mount('#app')
