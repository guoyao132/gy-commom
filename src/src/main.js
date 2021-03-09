import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import plugins from './plugins/index'

Vue.use(plugins)
// console.log(require.context);
// const requireComponent = require.context('./', true, '/\.vue/')   // 路径，是否查找子文件 文件类型
// console.log(requireComponent);

let a = Symbol.for('gy');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
