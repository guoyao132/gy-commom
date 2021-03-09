import common from './common'

import './css/reset.css'

let plugins = {};

plugins.install = function(Vue, option){
  Vue.prototype.$gyCom = common;

  window.gyrreu = require;
  const requireComponent = require.context('./components', true, /\.vue$/)   // 路径
  requireComponent.keys().map(component => {
    console.log(component);
    let config = requireComponent(component);
    const configName = config.default.name;
    Vue.component(configName, config.default || config);
  })
}

export default plugins;
