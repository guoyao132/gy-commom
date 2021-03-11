import Model from './Model'
import $ from 'jquery'

function kaibizhanModel(vue, code, contenerId) {
  let kbzmodel = null;

  function fjswinResize() {
    kbzmodel.resize();
  }

  this.destroy = function () {
    window.removeEventListener('resize', fjswinResize, false);
    if (kbzmodel != null)
      kbzmodel.destroy();
    kbzmodel = null;
    this.vue = null;
    return;
  }

  this.changeCamera = function(position, target){
    kbzmodel.changeCamera(position, target);
  }

  this.setFirstPersonControls = function(position){ // 第一人称视角 position: {x: 5, y: 5, z:5}
    kbzmodel.changeCamera(position, null, function () {
      if (kbzmodel.controls) {
        kbzmodel.controls.dispose();
        kbzmodel.controls = null;
      }
      kbzmodel._initFirstPersonControls();
    })
  }

  let config = null;

  try {
    config = require("./config/kaibizhan/kaibizhan_" + code);
  } catch (e) {
    console.error(e)
    config = require("./config/kaibizhan/kaibizhan_public");
  }


  let options = {
    config: config,
    afterInit: function () {
      vue.animateId = this.animateId;
      this.loadScene('out');

      // 循环添加标签
      // for(let i=0; i<config.positions.length; i++){
      //   this.loadBuildBiaoji(config, config.positions[i].position, config.positions[i].name);
      // }
    },
    onSceneLoaded: function (sceneName) {
      let _this = this;
      let sceneConfig = config.scene;
      if (sceneConfig && sceneConfig[sceneName]) {

      }
    },
    onModelClick: function (modelList) {
      if (modelList && modelList.length > 0) {
        let obj = modelList[0].object;
        if (obj) {
          // let name = obj.name;
          kbzmodel.vue.modelClickInfo(obj, event);
        }
      }
    }
  }

  $(function () {
    let downtime = 0;

    kbzmodel = new Model(vue, code, contenerId, options);
    let dom = $('#' + contenerId);
    dom.on('pointerdown', function () {
      downtime = event.timeStamp;
    });
    dom.on('mousemove', function () {
    });
    dom.on('pointerup', function () {
      let uptime = event.timeStamp;
      if (uptime - downtime < 500) {
        if ($(event.target).parent().prop("id") == contenerId)
          kbzmodel.onModelClick.call(kbzmodel, event);
      }
    });
    window.addEventListener('resize', fjswinResize, false);


    // 监听ESC
    ;(function(f){
      if(navigator.userAgent.indexOf('MSIE') !== -1){
        document.attachEvent('onkeydown', (event)=>{
          if(event.keyCode == 27){
            f.call(this, event);
          }``
        });
      }else{
        document.addEventListener('keydown', (e)=>{
          if(e.which == 27){
            f.call(this, e);
          }
        }, false);
      }
    })(function(e){
      kbzmodel.vue.stationOption.show = false;
      kbzmodel.existFirstPerson();
    });
  });
}


export {kaibizhanModel}
