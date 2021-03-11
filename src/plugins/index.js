import common from './common'
import EarthModel from './js/itowns/Model'
import ThreeModel from './js/model/Model'
import {
  bd09togcj02,
  gcj02tobd09,
  wgs84togcj02,
  gcj02towgs84,
  bd09towgs84,
  wgs84tobd09,
} from './js/transformlat.js'

import './css/reset.css'

let install = (Vue, option) => {
  console.log(ThreeModel);
  Vue.prototype.$gyCom = common;
  //坐标转换相关方法
  Vue.prototype.$gyCom.bd09togcj02 = bd09togcj02;
  Vue.prototype.$gyCom.gcj02tobd09 = gcj02tobd09;
  Vue.prototype.$gyCom.wgs84togcj02 = wgs84togcj02;
  Vue.prototype.$gyCom.gcj02towgs84 = gcj02towgs84;
  Vue.prototype.$gyCom.bd09towgs84 = bd09towgs84;
  Vue.prototype.$gyCom.wgs84tobd09 = wgs84tobd09;
  Vue.prototype.EarthModel = EarthModel;
  Vue.prototype.ThreeModel = EarthModel;
}
export {
  install,
  EarthModel,
  ThreeModel,
  common,
  bd09togcj02,
  gcj02tobd09,
  wgs84togcj02,
  gcj02towgs84,
  bd09towgs84,
  wgs84tobd09,
};
export default {
  install,
  EarthModel,
  ThreeModel,
  common,
  bd09togcj02,
  gcj02tobd09,
  wgs84togcj02,
  gcj02towgs84,
  bd09towgs84,
  wgs84tobd09,
};
