// 处理3D模型 参数依次为:vue实例/站室或管廊编号/容器div的id/选项

import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import MyFirstPersonControls from './controls/MyFirstPersonControls'
import {ComplexLoader as ModelLoader} from './loader/complex/ComplexLoader'
import $ from 'jquery'

import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

import TweenMax from './TweenMax.min'
import {BufferGeometry, Material, Texture} from "three";

function Model(vue, code, contenerId, opt) {
  // 默认选项
  this._default = {
    // 配置对象，包含3D模型加载时的文件以及需要切换的场景
    config: {
      files: {}, scene: {}, moveSpeed: 40.0, positions: [],
      fullScreen: {
        position: {x: 0, y: 0, z: 0},
        target: {x: 0, y: 0, z: 0}
      }
    },
    // 当模型被点击时触发的事件，目前需要手动为contenerId添加点击事件并调用model.click
    onModelClick: function (objList) {
    },
    // 模型场景初始化前的事件
    beforeInit: function () {
    },
    // 模型初始化后的事件
    afterInit: function () {
    },
    // 当config中配置的scene加载完成后触发的事件
    onSceneLoaded: function (scenceName) {
    },
    // 当单个obj文件加载完成后的事件
    onFileLoaded: function (obj, file) {
      // console.info(file.file, obj);
    },
    onAnimation() {
    },
    getClickIgnoreObj(mouse, objs) {

    }
  };
  this.clock = new THREE.Clock();
  this.mixer = null;
  this.options = Object.assign({}, this._default, opt);
  this.consInfo = this.options.config.scene || [];
  this.files = this.options.config.files || {};
  this.vue = vue;
  this.deviceList = [];
  this.objMap = {};
  this.bakData = {};
  this.alarmData = {};
  this.edges = {};
  this.camera, this.scene, this.renderer, this.mouse, this.raycaster, this.controls, this.container = null;
  this.contenerId = contenerId;
  this.container = document.getElementById(contenerId);
  this.animateId = null;
  this._labelFlag = false;
  this.labelData = [];
  this.positionMap = {};
  this.currentScence = null;

  this.velocity = new THREE.Vector3();
  this.direction = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.horizontalRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, 10);
  this.prevTime = performance.now();
  this.firstPersonControls = null;
  this.moveForward = false, this.moveLeft = false, this.moveBackward = false, this.moveRight = false, this.canJump = false;
  this.init3DModel();
}

// 显示一个或多个obj对象
Model.prototype.show = function (objects) {
  if (!objects)
    return;
  objects.forEach(function (o) {
    if (o)
      o.visible = true;
  })

}
// 隐藏一个或多个obj对象
Model.prototype.hide = function (objects) {
  if (!objects)
    return;
  objects.forEach(function (o) {
    if (o)
      o.visible = false;
  })
}
// 根据类型和名称从obj缓存中获取obj对象
Model.prototype.getObj = function (type, name) {
  let arr = this.objMap[type];
  if (name) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === name)
        return arr[i];
    }
    return null;
  }
  return arr;
}

function loadCallBack(models, type, trans, object, _this, _resolve) {
  let fileConfig = models[0];
  _this.scene.add(object);
  let scale = _this.options.config.objScale;
  if (scale) {
    object.scale.set(scale.x, scale.y, scale.z);
  }
  object.updateMatrix();
  let arr = [];
  if (Array.isArray(object)) {
    arr = object;
  } else {
    arr = object.children;
  }
  for (let i = 0; i < arr.length; i++) {
    let name = arr[i].name;
    // 判断文件是否需要透明化
    if (trans.indexOf(name) >= 0) {
      _this.transparent(arr[i], 0.25);
    }
    // 缓存obj对象
    if (!_this.objMap[type]) {
      let types = [arr[i]];
      _this.objMap[type] = types;
    } else {
      _this.objMap[type].push(arr[i]);
    }
    _this.deviceList.push(arr[i]);
  }

// 触发文件加载完成事件
  _this.options.onFileLoaded.call(_this, object, fileConfig);
  _resolve();
}

// 加载模型文件
Model.prototype.loadFile = function (models, type, trans) {
  let _this = this;
  let loaderType = _this.options.config.loaderType || "obj";
  let version = _this.options.config.version || 1;
  let fileConfig = models[0];
  let _start = new Date().getTime();
  return new Promise(resolve => {
      if (!fileConfig || !fileConfig.path) {
        resolve()
        return;
      }
      let loader = new ModelLoader(fileConfig.path, fileConfig.file, loaderType, version);
      loader.init().then(function () {
        loader.load().then(function (data) {
          let object = data.data;
          console.log(object)
          let _end = new Date().getTime();
          console.log("model file " + data.name + " load cost " + (_end - _start) + "ms. load type is " + data.type);
          let fileConfig = models[0];
          _this.scene.add(object);
          // _this.mixer = new THREE.AnimationMixer( object );
          // let action = _this.mixer.clipAction( object.animations[ 0 ] );
          // action.play();
          let scale = _this.options.config.objScale;
          if (scale) {
            object.scale.set(scale.x, scale.y, scale.z);
          }
          object.updateMatrix();
          let arr = [];
          if (Array.isArray(object)) {
            arr = object;
          } else {
            arr = object.children;
          }
          for (let i = 0; i < arr.length; i++) {
            let name = arr[i].name;
            // 判断文件是否需要透明化
            if (trans.indexOf(name) >= 0) {
              _this.transparent(arr[i], 0.25);
            }
            // 缓存obj对象
            if (!_this.objMap[type]) {
              let types = [arr[i]];
              _this.objMap[type] = types;
            } else {
              _this.objMap[type].push(arr[i]);
            }
            _this.deviceList.push(arr[i]);
          }
          // 触发文件加载完成事件
          _this.options.onFileLoaded.call(_this, object, fileConfig);
          loader.close();
          resolve();
        }).catch(err => {
          console.error("loader load error", err)
        });
      }).catch(err => {
        console.error("loader init error", err)
      })
    }
  )

// return new Promise(function (resolve) {
//   if (loaderType == "obj") {
//     new MTLLoader()
//       .setPath(fileConfig.path)
//       // 加载材质文件
//       .load(fileConfig.file + ".mtl", function (materials) {
//         materials.preload();
//         new OBJLoader()
//           .setMaterials(materials)
//           .setPath(fileConfig.path)
//           // 加载模型文件
//           .load(fileConfig.file + ".obj", function (object) {
//             let _end = new Date().getTime();
//             console.log("load file " + fileConfig.file + " cost " + (_end - _start) + "ms");
//             loadCallBack(models, type, trans, object, _this, resolve);
//           }, function () {
//           }, function (err) {
//             console.error(err);
//           });
//       })
//   } else if (loaderType == "gltf" || loaderType == "glb") {
//     new GLTFLoader().setPath(fileConfig.path).load(fileConfig.file + "." + loaderType,
//       function (obj) {
//         let _end = new Date().getTime();
//         console.log("load file " + fileConfig.file + " cost " + (_end - _start) + "ms");
//         loadCallBack(models, type, trans, obj.scene, _this, resolve);
//
//       })
//   }
// }).catch((err) => {
//   console.error(err);
// })

}
// 加载config中配置的一个场景
Model.prototype.loadScene = function (sceneName) {
  let _this = this;
  _this.currentScence = sceneName;
  let __start = new Date().getTime();
  let typeInfo = this.consInfo[sceneName];
  if (typeInfo) {
    let trans = typeInfo.trans || [];
    let types = typeInfo.type;
    let cameraInfo = typeInfo.camera;
    // 动画切换摄像头视角
    _this.changeCamera(cameraInfo.position, cameraInfo.target, function () {
        _this.hideAll();
        let funs = [];
        // 根据类型加载scene中配置的文件
        for (let i = 0; i < types.length; i++) {
          funs.push(_this.loadTypeDevice(types[i], trans));
        }
        Promise.all(funs).then(function () {
            let clipping = typeInfo.clipping;
            if (clipping) {
              setTimeout(function () {
                // 处理clipping
                _this.clipping(clipping.objs, clipping.position, clipping.start, clipping.end, clipping.time, function () {
                  let __end = new Date().getTime();
                  let time = __end - __start;
                  console.log("scene ‘" + sceneName + "’ loaded,cost " + time + "ms");
                  _this.options.onSceneLoaded.call(_this, sceneName);
                })
              }, 5000)
            } else {
              let __end = new Date().getTime();
              let time = __end - __start;
              console.log("scene " + sceneName + " loaded,cost " + time + "ms");
              _this.options.onSceneLoaded.call(_this, sceneName);
            }
          }
        ).catch((err) => {
          console.error(err);
        });
      }
    )
  } else {
    this.loadTypeDevice(sceneName, []).then(function () {
      let __end = new Date().getTime();
      let time = __end - __start;
      console.log("scene " + sceneName + " loaded,cost " + time + "ms");
      _this.options.onSceneLoaded.call(_this, sceneName);
    })

  }
}

Model.prototype.clipping = function (names, position, start, end, time, callback) {
  let _this = this;
  let plane = new THREE.Plane(new THREE.Vector3(position.x, position.y, position.z),
    start);
  let edgePlane = plane.clone();
  edgePlane.negate();
  // let helper = new _THREE.PlaneHelper(plane, 1000, 0xff0000);
  // let edgeHelper = new _THREE.PlaneHelper(edgePlane, 1000, 0xffff00);
  // _this.scene.add(helper);
  // _this.scene.add(edgeHelper);
  for (let i = 0; i < names.length; i++) {
    let obj = _this.scene.getObjectByName(names[i]);
    if (obj) {
      let edge = _this.addEdge(obj, 0x00ffff, false);
      edge.material.clippingPlanes = [edgePlane];
      edge.visible = true;
      let materials = obj.material;
      for (let j = 0; j < materials.length; j++) {
        if (materials[j])
          materials[j].clippingPlanes = [plane];
      }
    }
  }
  let p1 = new Promise(resolve => {
    TweenMax.to(plane, time, {
      constant: end,
      onComplete: function () {
        resolve();
      }
    });
  })
  let p2 = new Promise(resolve => {
    TweenMax.delayedCall(0.5, function () {
      TweenMax.to(edgePlane, time, {
        constant: -end,
        onComplete: function () {
          resolve();
        }
      });
    });
  })
  Promise.all([p1, p2]).then(function () {
    if (callback)
      callback.call(_this);
  })
}
// 动态变更摄像头视角
Model.prototype.changeCamera = function (position, target, callback, controls) {
  controls = controls || this.controls;
  let _this = this;
  let list = [];
  if (position) {
    let p = new Promise(resolve => {
      position.onComplete = function () {
        resolve();
      };
      TweenMax.to(
        _this.camera.position,
        1,
        position
      );
    })
    list.push(p);
  }
  if (target) {
    let p = new Promise(resolve => {
      target.onComplete = function () {
        resolve();
      };
      TweenMax.to(
        controls.target, 1, target, {
          onComplete: callback
        }
      );
    });
    list.push(p);
  }
  if (list.length > 0)
    Promise.all(list).then(callback);
  else
    callback(false);
}
// 在time时间内将obj移动到target，完成后调用callback
Model.prototype.moveObj = function (
  obj = {position: {}},
  target = {}, time = 5,
  callback = function () {
  }) {
  let _this = this;
  target.onComplete = function () {
    callback.call(_this, obj, time, target, callback);
  };
  TweenMax.to(
    obj.position, time, target
  );
}
// 在time时间内将obj向duration移动distance距离，完成后调用callback
Model.prototype.moveObjDistance = function (obj, duration, distance, time, callback) {
  let _this = this;
  if (!obj.position)
    return;
  let position = {x: obj.position.x, y: obj.position.y, z: obj.position.z};
  position[duration] += distance;
  position.onComplete = function () {
    callback.call(_this, obj, duration, distance, time, callback);
  }
  TweenMax.to(
    obj.position, time, position
  );
}

Model.prototype.rotateObj = function (obj, duration, rad = Math.PI / 2) {
  let geometry = obj.geometry;
  // 先获取geometey的中心点位置并留存
  let center = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter(center);
  let x = center.x;
  let y = center.y;
  let z = center.z;
  geometry.center();
  switch (duration) {
    case "x":
    case "X":
      geometry.rotateX(rad);
      break;
    case "y":
    case "Y":
      geometry.rotateY(rad);
      break;
    case "z":
    case "Z":
      geometry.rotateZ(rad);
      break;
    default:
      console.warn("rotate->unknown duration:" + duration)
  }
  geometry.translate(x, y, z);
}
// 根据类型加载文件
Model.prototype.loadTypeDevice = function (devType, trans) {
  let _this = this;
  return new Promise(function (resolve) {
    if (!_this.objMap[devType] || _this.objMap[devType].length <= 0) {
      // 判断该类型是否被缓存过
      let pArr = [];
      // 没被缓存过则去加载该类型的所有文件
      for (let i = 0; i < _this.files[devType].length; i++) {
        let p = [_this.files[devType][i]];
        pArr.push(_this.loadFile(p, devType, trans));
      }
      Promise.all(pArr).then(function () {
        resolve();
      }).catch((err) => {
        console.error(err);
      });
    } else {
      // 被缓存过则将缓存的obj对象显示出来，并调整透明度
      let devList = _this.objMap[devType];
      for (let i = 0; i < devList.length; i++) {
        let name = devList[i].name;
        if (trans.indexOf(name) >= 0) {
          _this.transparent(devList[i], 0.25);
        } else {
          _this.resetTransparent(devList[i]);
        }
        devList[i].visible = true;
      }
      resolve();
    }
  }).catch((err) => {
    console.error(err);
  })
}
Model.prototype.changeAlarm = function (type) {
  if (!type)
    return;
  for (let i = 0; i < this.bakData.length; i++) {
    this.resetColor(i, this.bakData[i]);
  }
  this.bakData = {};
  let devList = this.consInfo[type];
  if (!devList)
    return;
  for (let i = 0; i < devList.type.length; i++) {
    let tt = devList.type[i]
    for (let k = 0; k < this.alarmData.length; k++) {
      let nn = this.alarmData[k];
      let obj = this.getDeviceObj(tt, nn);
      if (obj) {
        this.changeColor(obj, 0xff0000, tt + "@" + nn);
      }
    }
  }
}

Model.prototype.resetColor = function (name, m) {
  let names = name.split('@');
  let type = names[0];
  let rname = names[1];
  let obj = this.getObj(type, rname);
  if (obj)
    obj.material = m;
}

Model.prototype.changeColor = function (obj, color, key) {
  let m = obj.material;
  if (Array.isArray(m)) {
    let bm = [];
    for (let l = 0; l < m.length; l++) {
      let newm = m[l].clone();
      bm.push(newm.clone());
      newm.color.set(color);
      obj.material[l] = newm;
    }
    this.bakData[key] = bm;
  } else {
    let newm = m.clone();
    let bm = newm.clone();
    this.bakData[key] = bm;
    newm.color.set(color);
    obj.material = newm;
  }
}
// 调整obj文件的透明度
Model.prototype.transparent = function (obj, rate = 1) {
  let m = obj.material;
  if (Array.isArray(m)) {
    for (let j = 0; j < m.length; j++) {
      m[j].__oldOpacity = m[j].opacity;
      m[j].transparent = true;
      m[j].opacity = rate;
    }
  } else {
    m.__oldOpacity = m.opacity;
    m.transparent = true;
    m.opacity = rate;
  }
}
Model.prototype.resetTransparent = function (obj, defaultValue = 1) {
  let m = obj.material;
  if (Array.isArray(m)) {
    for (let j = 0; j < m.length; j++) {
      m[j].transparent = true;
      m[j].opacity = m.__oldOpacity || defaultValue;
    }
  } else {
    m[j].transparent = true;
    m.opacity = m.__oldOpacity || defaultValue;
  }
}
// 当浏览器窗口大小变化时触发
Model.prototype.resize = function () {

  this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
  console.log(isFull);

  // if (!isFull && this.firstPersonControls) {
  //   this.existFirstPerson();
  // }
  // if (!isFull && this.pointerControls) {
  //   this.pointerControls.unlock();
  // }
}
// 初始化3D模型
Model.prototype.init3DModel = function () {
  // 触发初始化前的事件
  this.options.beforeInit.call(this);
  let vue = this.vue;
  let container = this.container;
  let _this = this;
  let winWidth = window.innerWidth;
  let camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 3000000);
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0, 0);
  this.camera = camera;
  window.cameraModel = camera;
  camera.position.set(0, 0, 0);
  let mouse = new THREE.Vector2();
  this.mouse = mouse;
  let raycaster = new THREE.Raycaster();
  this.raycaster = raycaster;
  let scene = new THREE.Scene();
  this.scene = scene;
  window.cameraScene = scene;
  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);
  let pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  // let axesHelper = new THREE.AxesHelper(40000);
  // scene.add(axesHelper);
  // let gridHelper = new THREE.GridHelper(250, 250);
  // scene.add(gridHelper);

  let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.localClippingEnabled = true;
  this.renderer = renderer;
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  // let chelper = new THREE.CameraHelper(camera);
  // scene.add(chelper);
  renderer.render(scene, camera);
  this._initOrbitControls();
  // this.playFirstPerson();
  this.options.afterInit.call(this);
  // 触发初始化后的事件
  // this.addGuidePosition();
  this.animate(this);
}
Model.prototype.addGuidePosition = function () {
  let positions = this.options.config.positions || [];
  let pObj = [];
  let personConfig = this.options.config.firstPerson;
  let scale = !personConfig ? 5 : (personConfig.pointScale || 5);
  let groundHeight = !personConfig ? 5 : (personConfig.groundHeight || 5);
  let texture = new THREE.TextureLoader().load('model/img/position.png');
  for (let i = 0; i < positions.length; i++) {
    let p = positions[i];
    if (p.position) {
      let material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
      let geometry = new THREE.CircleGeometry(scale, 32);
      geometry.rotateY(Math.PI / 2);
      geometry.rotateZ(Math.PI / 2);
      let circle = new THREE.Mesh(geometry, material);
      circle.position.set(p.position.x, groundHeight, p.position.z);
      circle.name = "__position_" + i;
      pObj.push(circle);
      this.deviceList.push(circle);

      this.scene.add(circle);
    }
  }
  if (this.objMap.__position) {
    this.objMap.__position.concat(pObj);
  } else {
    this.objMap.__position = pObj;
  }

}
Model.prototype.playFullScreen = function () {
//   this.fullScreen(this.container);
//   let fullPosition = this.options.fullScreen || {
//     position: {x: 0, y: 0, z: 0},
//     target: {x: 0, y: 0, z: 0}
//   }
//   // this.changeCamera(fullPosition.position, fullPosition.target, function () {
//   if (this.controls) {
//     this.controls.dispose();
//     this.controls = null;
//   }
//   this._initPointerLockControls();
//   this.pointerControls.lock();
//   // })


}

Model.prototype._initFirstPersonControls = function () {
  this.firstPersonControls = new MyFirstPersonControls(this.camera, this.renderer.domElement);
}


Model.prototype.playFirstPerson = function () {
  this.addGuidePosition();
  let _this = this;
  let positions = this.options.config.positions || [];
  let p = positions[0];
  if (p) {
    this.changeCamera(p.position, null, function () {
      if (_this.controls) {
        _this.controls.dispose();
        _this.controls = null;
      }
      _this._initFirstPersonControls();
    })
  }
}
Model.prototype.existFirstPerson = function () {
  if (this.firstPersonControls) {
    this.firstPersonControls.dispose();
    this.firstPersonControls = null;
  }
  let positions = this.objMap.__position;
  if (positions) {
    for (let i = 0; i < positions.length; i++) {
      let p = positions[i];
      p.visible = false;
      this.scene.remove(p);
    }
  }
  delete this.objMap.__position;
  this._initOrbitControls();
}

Model.prototype._initOrbitControls = function (disable, target) {
  let _this = this;
  let controls = new OrbitControls(this.camera, this.renderer.domElement);
  if (target)
    controls.target = target;
  controls.addEventListener('change', function () {
    _this.render(_this);
  });
  controls.minDistance = 1;
  controls.maxDistance = 200000;
  //上下翻转的最小角度
  controls.minPolarAngle = 0.25;
  //是否允许缩放
  controls.enableZoom = !disable;
  controls.enableDamping = !disable; // an animation loop is required when either damping or auto-rotation are enabled
  controls.enableRotate = !disable;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enablePan = !disable;
  controls.enableKeys = false;
  this.controls = controls;
}
Model.prototype._initPointerLockControls = function () {
  let _this = this;
  let pointerControls = new PointerLockControls(this.camera, this.container);
  pointerControls.addEventListener('lock', function () {
    console.log("lock");
    $(window).keydown(function (event) {
      _this.onKeyDown(event)
    });
    $(window).keyup(function (event) {
      _this.onKeyUp(event);
    });
  });
  pointerControls.addEventListener('unlock', function () {
    console.log("unlock");
    if (_this.pointerControls) {
      _this.pointerControls.dispose();
      _this.pointerControls = null;
    }
    _this._initOrbitControls();
    $(window).unbind("keyup");
    $(window).unbind("keydown");
  })
  this.pointerControls = pointerControls;
}

Model.prototype.onKeyDown = function (event) {
  console.log("down");
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      this.moveForward = true;
      break;
    case 37: // left
    case 65: // a
      this.moveLeft = true;
      break;
    case 40: // down
    case 83: // s
      this.moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      this.moveRight = true;
      break;
    case 32: // space
      this.canJump = true;
      break;
  }
};
Model.prototype.onKeyUp = function (event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      this.moveForward = false;
      break;
    case 37: // left
    case 65: // a
      this.moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      this.moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      this.moveRight = false;
      break;
    case 32:
      this.canJump = false;
      break;
  }
};

Model.prototype.fullScreen = function (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else {
    console.warn("不支持全屏");
  }
}
Model.prototype.animate = function (_this) {
  let animateId = requestAnimationFrame(function () {
    _this.animate(_this);
  });
  if (_this.mixer)
    _this.mixer.update(this.clock.getDelta());
  if (_this.controls)
    _this.controls.update();
  if (_this.firstPersonControls)
    _this.firstPersonControls.update();
  if (_this.pointerControls && _this.pointerControls.isLocked === true) {
    let moveSpeed = this.options.config.moveSpeed || 40.0;
    // raycaster.ray.origin.copy(controls.getObject().position);
    // raycaster.ray.origin.y -= 10;
    // var intersections = raycaster.intersectObjects(objects);
    // var onObject = intersections.length > 0;
    var time = performance.now();
    var delta = (time - _this.prevTime) / 1000;
    _this.velocity.x -= _this.velocity.x * 10.0 * delta;
    _this.velocity.z -= _this.velocity.z * 10.0 * delta;
    // velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    _this.direction.z = Number(_this.moveForward) - Number(_this.moveBackward);
    _this.direction.x = Number(_this.moveRight) - Number(_this.moveLeft);
    _this.direction.normalize(); // this ensures consistent movements in all directions

    //判断是否接触到了模型
    // _this.rotation.copy(_this.pointerControls.getObject().getWorldDirection(new _THREE.Vector3(-1, 0, -1)));
    //
    // //判断鼠标按下的方向
    // var m = new _THREE.Matrix4();
    // if(_this.direction.z > 0){
    //   if(_this.direction.x > 0){
    //     m.makeRotationY(Math.PI/4);
    //   }
    //   else if(this.direction.x < 0){
    //     m.makeRotationY(-Math.PI/4);
    //   }
    //   else{
    //     m.makeRotationY(0);
    //   }
    // }
    // else if(_this.direction.z < 0){
    //   if(this.direction.x > 0){
    //     m.makeRotationY(Math.PI/4*3);
    //   }
    //   else if(_this.direction.x < 0){
    //     m.makeRotationY(-Math.PI/4*3);
    //   }
    //   else{
    //     m.makeRotationY(Math.PI);
    //   }
    // }
    // else{
    //   if(_this.direction.x > 0){
    //     m.makeRotationY(Math.PI/2);
    //   }
    //   else if(this.direction.x < 0){
    //     m.makeRotationY(-Math.PI/2);
    //   }
    // }
    // //给向量使用变换矩阵
    // _this.rotation.applyMatrix4(m);
    // //horizontal.setDirection(rotation);
    // _this.horizontalRaycaster.set( _this.pointerControls.getObject().position , _this.rotation );
    //
    // var horizontalIntersections = _this.horizontalRaycaster.intersectObjects( _this.scene.children, true);
    // var horOnObject = horizontalIntersections.length > 0;
    //
    // //判断移动方向修改速度方向
    // if(!horOnObject){
    if (_this.moveForward || _this.moveBackward) _this.velocity.z -= _this.direction.z * moveSpeed * delta;
    if (_this.moveLeft || _this.moveRight) _this.velocity.x -= _this.direction.x * moveSpeed * delta;
    // }

    _this.pointerControls.moveRight(-_this.velocity.x * delta);
    _this.pointerControls.move(-_this.velocity.z * delta);
    // controls.getObject().position.y += (velocity.y * delta); // new behavior
    // if (controls.getObject().position.y < 10) {
    //   velocity.y = 0;
    //   controls.getObject().position.y = 10;
    //   canJump = true;
    // }
    _this.prevTime = time;
  }
  _this.render(_this);
  _this.options.onAnimation.call(_this);
  _this.animateId = animateId;
  _this._aniShowLabel(_this);
  _this.camera.updateProjectionMatrix();
}
// 销毁方法
Model.prototype.destroy = function () {
  this.hideLabel();
  // this.scene.dispose()
  if (this.controls)
    this.controls.dispose();
  if (this.pointerControls)
    this.pointerControls.dispose();
  // 移除dom元素
  this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
  // 取消浏览器动画渲染
  cancelAnimationFrame(this.animateId);
  function disposeMaterial(m) {
    if (m && m instanceof Material) {
      for (let i in m) {
        if (m[i] && m[i] instanceof Texture && typeof m[i].dispose === "function") {
          m[i].dispose();
          m[i] = null;
        }
      }
    }
    if (typeof m.dispose === "function") {
      m.dispose()
    }
  }

  this.scene.traverse((c) => {
    if (c.geometry && c.geometry instanceof BufferGeometry && typeof c.geometry.dispose === "function") {
      c.geometry.dispose();
      c.geometry = null
    }
    if (c.material) {
      if (Array.isArray(c.material)) {
        c.material.forEach((m) => {
          disposeMaterial(m)
        })
        c.material = null
      } else {
        let m = c.material;
        disposeMaterial(m)
        c.material = null
      }
    }
    c.parent = null;
  })
  this.scene.children = [];
  this.scene = null;
  this.camera = null;
  this.objMap = {};
  this.edges = null;
  window.cameraScene = null;
  window.cameraModel = null;
  this.renderer.dispose();
  this.renderer.forceContextLoss();
  this.renderer.domElement = null;
  this.renderer = null;

}
// 将obj文件的3D位置转化为浏览器的left,top
Model.prototype.getPosition = function (obj) {
  let geometry = obj.geometry;
  geometry.computeBoundingBox();
  let centroid = new THREE.Vector3();
  centroid.addVectors(geometry.boundingBox.min, geometry.boundingBox.max);
  centroid.multiplyScalar(0.5);
  centroid.applyMatrix4(obj.matrixWorld);
  // 判断是否在视野范围内
  if (!this.inCamera(centroid)) {
    // 不在视野范围内，返回false
    return false;
  } else {
    let vector = centroid.project(this.camera);
    // 在视野范围内，将三维坐标转化成二维
    let halfWidth = this.container.clientWidth / 2,
      halfHeight = this.container.clientHeight / 2;
    let x = Math.round(vector.x * halfWidth + halfWidth),
      y = Math.round(-vector.y * halfHeight + halfHeight);
    return {x: x, y: y};
  }
}

Model.prototype.inCamera = function (v) {
  let tempV = v.clone().applyMatrix4(this.camera.matrixWorldInverse).applyMatrix4(this.camera.projectionMatrix);
  // 判断是否在视野范围内
  if ((Math.abs(tempV.x) > 1) || (Math.abs(tempV.y) > 1) || (Math.abs(tempV.z) > 1))
    // 不在视野范围内，返回false
    return false;
  else
    return true;
}
// 当模型被点击,找出被点击的模型(config中配置的被透明化的obj将被排除)
Model.prototype.onModelClick = function () {
  if (this.deviceList == null || this.deviceList.length <= 0)
    return false;
  let offset = $(this.container).offset();
  this.mouse.x = ((event.clientX - offset.left) / $(this.container).innerWidth()) * 2 - 1;
  this.mouse.y = -((event.clientY - offset.top) / $(this.container).innerHeight()) * 2 + 1;
  // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
  this.raycaster.setFromCamera(this.mouse, this.camera);
  let intersects = [];
  let objList = [];
  let trans = this.consInfo[this.currentScence] ? (this.consInfo[this.currentScence].trans || []) : [];
  let customerTrans = this.options.getClickIgnoreObj.call(this, this.mouse, this.deviceList);
  if (customerTrans)
    trans = trans.concat(customerTrans);
  if (trans)
    for (let i = 0; i < this.deviceList.length; i++) {
      if (trans.indexOf(this.deviceList[i].name) < 0) {
        objList.push(this.deviceList[i]);
      }
    }
  intersects = this.raycaster.intersectObjects(objList, true);
  if (intersects && intersects.length > 0) {
    this.options.onModelClick.call(this, intersects);
  }
}

Model.prototype.render = function (_this) {
  _this.renderer.render(_this.scene, _this.camera);
}

Model.prototype.computeScale = function (geometry, num) {
  if (!num)
    num = 200;
  geometry.computeBoundingBox();
  let maxX = geometry.boundingBox.max.x;
  let minX = geometry.boundingBox.min.x;
  let maxY = geometry.boundingBox.max.y;
  let minY = geometry.boundingBox.min.y;
  let maxZ = geometry.boundingBox.max.z;
  let minZ = geometry.boundingBox.min.z;
  let maxDis = Math.sqrt((maxX - minX) * (maxX - minX) + (maxY - minY) * (maxY - minY) + (maxZ - minZ) * (maxZ - minZ)) / num;
  let scale = 1.0 / maxDis;
  return scale;
}
// 隐藏所有缓存的obj
Model.prototype.hideAll = function () {
  for (let i in this.objMap) {
    if (i == "__position")
      continue;
    this.hide(this.objMap[i]);
  }
}

// 为obj添加边框
Model.prototype.addEdge = function (object, color, visible = true) {
  if (this.edges[object.id]) {
    this.edges[object.id].visible = visible;
    return;
  }
  let edge = new THREE.EdgesGeometry(object.geometry);
  let line = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({color: color ? color : 0x00ffff}));
  line.visible = visible;
  this.edges[object.id] = line;
  this.scene.add(line);
  return line;
}
// 移除obj边框
Model.prototype.removeEdge = function (obj) {
  if (obj) {
    return
  }
  if (this.edges[obj.id]) {
    this.edges[obj.id].visible = false;
  }
}
// 隐藏所有obj的边框
Model.prototype.clearEdge = function () {
  this.hide(this.edges)
}

Model.prototype.showLabel = function (data = []) {
  $('.m-info-win').each(function () {
    if (!$(this).is('.peidianshi')) {
      $(this).hide();
    }
  });
  for (let i = 0; i < data.length; i++) {
    let objName = data[i].obj;
    let obj = this.scene.getObjectByName(objName);
    if (obj) {
      let position = obj.position.clone();
      data[i]._position = position;
    }
  }
  this.labelData = data;
  this._labelFlag = true;
}

Model.prototype.hideLabel = function () {
  this._labelFlag = false;
  this.labelData = [];
  $('.m-info-win').hide();
}
Model.prototype._aniShowLabel = function (_this) {
  if (_this._labelFlag && _this.labelData && _this.labelData.length > 0) {
    let data = _this.labelData;
    for (let i = 0; i < data.length; i++) {
      let divId = data[i].div;
      let objName = data[i].obj;
      let objFile = data[i].objFile;
      let obj = _this.getObj.call(_this, objFile, objName);
      if (obj) {
        let position = _this.getPosition.call(_this, obj);
        let dom = $('#' + divId);
        if (position) {
          dom.css({
            left: position.x,
            top: position.y,
            position: 'absolute',
            display: 'block'
          });
        } else {
          dom.hide();
        }
      } else {
        $('#' + divId).hide();
      }
    }
  } else {
    $('.m-info-win').each(function () {
      if (!$(this).is('.peidianshi')) {
        $(this).hide();
      }
    });
  }
}

/* 设置开闭站标记 */
Model.prototype.loadBuildBiaoji = function (config, pos, name) {
  let _this = this;
  let loader = new OBJLoader();
  let mtlLoader = new MTLLoader();

  mtlLoader.setPath(config.basePath);
  mtlLoader.load('kaibizhan__biaoji.mtl', (mtl) => {
    mtl.preload();
    loader.setMaterials(mtl);
    loader.setPath(config.basePath);
    loader.load('kaibizhan__biaoji.obj', function (object) {
        // let renderingParent = new THREE.Group();
        // renderingParent.scale.set(1, 1, 1);
        object.position.set(pos.x, pos.y, pos.z);
        object.name = name;
        object.userData.pos = pos;
        object.name = name;
        // renderingParent.add(object);
        _this.scene.add(object);
        _this.deviceList.push(object);
      }
    );
  });
}

export default Model
