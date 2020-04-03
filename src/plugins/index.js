import msg from './msg/msg'
import common from './common'

let plugins = {};

plugins.install = function(Vue, option){

  //自定义指令
  Vue.directive("focus", {
    inserted: function(el){
      el.focus();
    },
  })

  Vue.prototype.$common = common;
  Vue.component(msg.name, msg);
}

export default plugins;
// console.log(require.prototype);
// const requireComponent = require.context('./', true, '/\.vue/')   // 路径，是否查找子文件 文件类型
// console.log(requireComponent);
// const install = (Vue, option) => {
//   if(install.installed){
//     return
//   }else{
//     // option
//     requireComponent.keys().map(component => {
//       let config = requireComponent[component];
//       const configName = config.default.name;
//       Vue.component(configName, config.default || config);
//     })
//   }
// }
//
// export default {install};
