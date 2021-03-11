/*

import Model from '@/assets/js/itowns/Model.js'
import * as THREE from "three";

class testModel {
  constructor(vue, code, containerId) {
    this.vue = vue;
    this.code = code;
    this.containerId = containerId;
    this.model = null;
    this.mixers = [];
    this.config = null;
    this.shaders = {};
    this.line_reg = /^line_.*$/;
    this.downtime = 0;
    this.options = null;
    this.init();
    this.mixer
    this.animation = {};
    this.clock = new THREE.Clock();
  }


  init() {
    this.config = require("./config/test.js");

    let self = this;
    this.options = {
      config: this.config,
      onAnimation: function () {
        self.model.lineTexture && self.model.lineTexture.offset && (self.model.lineTexture.offset.x += 0.03); // 设置纹理偏移
        self.model.luwangTexture && self.model.luwangTexture.offset && (self.model.luwangTexture.offset.x += 0.03); // 设置路网偏移

        // 供电关系动画
        if (self.model.animateFlag) {
          self.model.powerTexture_01 && self.model.powerTexture_01.offset && (self.model.powerTexture_01.offset.x += 0.06);
          self.model.powerTexture_02 && self.model.powerTexture_02.offset && (self.model.powerTexture_02.offset.x += 0.06);
        }

        // let offsetMaterial = this.scene.getObjectByName('renmindahuitang_faguang');
        // if(offsetMaterial){
        //   offsetMaterial.material[0].map.offset.y += (0.01);
        // }
      },
      onFileLoaded(obj, config) {
        if (config.file == 'biandianzhanguangquan02.FBX') {
          self.mixer = new THREE.AnimationMixer(obj);
          const action = self.mixer.clipAction(obj.animations[0]);
          action.play();
          this.animationList.push(action);
        }
      },
      afterInit: function () {
        this.loadScene('out');
        self.initAfter(this);
      },

      onSceneLoaded: function (sceneName) {

      },
      onModelClick: function (modelList) {
        // this.hideLabel()
        if (modelList && modelList.length > 0) {
          self.vue.onModelClick(modelList)
        }
      }
    }
    this.model = new Model(this.vue, this.containerId, this.options);
  }

  initAfter(model) {
    this.vue.initAfter && this.vue.initAfter(model);
  }

  resize() {
    this.model.resize();
  }

  destroy() {
    if (this.model != null)
      this.model.destroy();
    this.model = null;
  }

  hideLabel() {
    this.model.hideLabel()
  }

  showLabel(data) {
    this.model.showLabel(data);
  }

  changeCamera(position, target, callback) {
    this.model.changeCamera(position, target, callback);
  }

  selectObject(obj) {
    this.model.outlinePass.selectedObjects = [obj];
  }

  down(e) {
    this.downtime = e.timeStamp;
  }

  up(e) {
    let uptime = e.timeStamp;
    if (uptime - this.downtime < 500) {
      this.model.onModelClick.call(this.model);
    }
  }

  move(e) {
  }
}

export default testModel;

 */