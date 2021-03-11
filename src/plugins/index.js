import common from './common'
import EarthModel from './js/itowns/Model'
import ThreeModel from './js/model/Model'

import './css/reset.css'

let install = (Vue, option) => {
  Vue.prototype.$gyCom = common;
  Vue.prototype.EarthModel = EarthModel;
  Vue.prototype.ThreeModel = EarthModel;
}
export {
  install,
  EarthModel,
  ThreeModel,
  common,
};
export default {
  install,
  EarthModel,
  ThreeModel,
  common,
};
