import * as THREE from 'three'

import BASTURL from "../../../api/URL_PROXY.js"
const itowns = require('itowns')
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ComplexLoader} from "../model/loader/complex/ComplexLoader";
// import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
// import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {CSS2DRenderer, CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {SSAARenderPass} from 'three/examples/jsm/postprocessing/SSAARenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
// import {TWEEN} from 'three/examples/jsm/libs/tween.module.min'
// import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import bloom_shader_frag from "./shader/bloom_shader_frag";
import bloom_shader_vert from "./shader/bloom_shader_vert";
// import {getRig} from 'itowns/lib/Utils/CameraUtils'


import TweenMax from '../model/TweenMax.min'
// import {MeshLine, MeshLineMaterial} from "three.meshline";
import {MeshLine, MeshLineMaterial, MeshLineRaycast} from 'three.meshline';
import {
  BufferGeometry,
  LineBasicMaterial,
  Material,
  OrthographicCamera,
  Sphere,
  Texture,
  WebGLRenderTarget
} from "three";
import {gcj02towgs84} from "../../js/transformlat"

// var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
// var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
// var _c3DEngine = _interopRequireDefault(require("itowns/lib/Renderer/c3DEngine"));
// var _Scheduler = _interopRequireDefault(require("itowns/lib/Core/Scheduler/Scheduler"));
//
// var _MainLoop = _interopRequireWildcard(require("./Core/MainLoop"));
const darkMaterial = new THREE.MeshBasicMaterial({color: "black"});

const FONT = require('./utils/FZLanTingHeiS-UL-GB_Regular.json');

let playIndex = 1, playIndex2 = 0; // 供电关系下标
let playPoints = []; // 供电关系组装后的数据
let lineFinishedPoints = []; // 动画结束后的连线
let finishedTimes = 0;
let animationFrameID;
let animationGuijiID = null;
let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

class Model {
  constructor(vue, contenerId, opt) {
    this.vue = vue;
    this.isFirst = true;
    this.isDebug = opt.isDebug || false;
    // this.hasMap = false;
    this.hasMap = true;
    this.view = null;
    this.itowns = itowns;
    this.contenerId = contenerId;
    // this.mapURL = BASTURL + '/map/gaodeMap/mapabc/roadmap/${z}/${x}/${y}.png';
    // this.mapURL = BASTURL + '/map/gaodeMap/googleMap/googlemaps/roadmap/${z}/${x}/${y}.png';
    // this.mapURL = BASTURL + '/map/gaodeMap/googleMap/googlemaps/roadmap1/${z}/${x}/${y}.png';
    // this.mapURL = BASTURL + '/map/gaodeMap/googleMap/googlemaps/roadmap2/${z}/${x}/${y}.jpg';
    this.mapURL = BASTURL + '/map/gaodeMap/googleMap/${z}/${x}/${y}.jpg';

    this.mapURL2 = './img/map_bg_2.png';
    this.mapZoom = {
      min: 12,
      max: 18,
    }

    this._default = {
      config: {
        //配置对象包含3D模型加载时的文件以及需要切换的场景
        files: {},
        scene: {},
        moveSpeed: 40.0,
        positions: [],
        fullScreen: {
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          target: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      },
      //模型点击时触发的事件，目前需要手动为 contenerId添加点击事件，病调用model.click
      onModelClick(objList) {
      },
      //模型场景初始化前的事件
      beforeInit() {
      },
      //模型场景初始化后的事件
      afterInit() {
      },
      //当config中配置的screen加载完成后触发的事件
      onSceneLoader(scenceName) {
      },
      //当单个obj文件加载完成糊的事件
      onFileLoaded(obj, file) {
      },
      onAnimation() {
      },
      onBeforeRender() {
      },
      onAfterRender() {
      },
      getClickIgnoreObj(mouse, objs) {
      },
    }
    this.composer = null;
    //辉光
    this.finalComposer = null;
    this.bloomMaterials = {};
    this.bloomArr = [];

    this.font = null;
    this.clock = new THREE.Clock();
    this.mixer = null;
    this.cssRenderer = null;
    this.options = Object.assign({}, this._default, opt);
    this.consInfo = this.options.config.scene || {};
    this.files = this.options.config.files || {};
    this.deviceList = [];
    this.objMap = {};
    this.bakData = {};
    this.alarmData = {};
    this.edges = {};
    this.camera = null;
    this.scene = null;
    this.mouse = null;
    this.outlinePass = null;
    this.raycaster = null;
    this.controls = null;
    this.container = null;
    this.container = document.getElementById(this.contenerId);
    this.animateId = null;
    this._labelFlag = false;
    this.labelData = [];
    this.positionMap = {};
    this.currentScence = null;
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.rotation = new THREE.Vector3();
    this.animationList = [];
    this.horizontalRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, 10);
    this.lineTexture = null;
    this.weilanTexture = null;
    this.offsetMaterialArr = [];
    this.loadFileOffsetMaterialArr = [];
    this.luwangTexture = null;
    this.animateFlag = false;
    // this.powerTexture_01 = null;
    // this.powerTexture_02 = null;
    this.sceneGroup = [];
    this.labelNameList = [];
    this.meshLineGroup = null;
    this.resolution = null;

    // var engine; // options.renderer can be 2 separate things
    // engine = new _c3DEngine["default"](this.container, undefined);
    // this.mainLoop = new _MainLoop["default"](new _Scheduler["default"](), engine);
    this.init3DModel();


  }

  getTextureImg() {
    this.lineTexture = new THREE.TextureLoader().load(require('../../imgs/map/dianlan.png'));
    this.weilanTexture = new THREE.TextureLoader().load(require('../../imgs/map/dianziweilan.png'));
    this.luwangTexture = new THREE.TextureLoader().load(require('../../imgs/map/luwang.png'));
    // this.powerTexture_01 = new THREE.TextureLoader().load(require('../../imgs/map/powerStation_01.png')); // 供电关系贴图_01
    // this.powerTexture_02 = new THREE.TextureLoader().load(require('../../imgs/map/powerStation_02.png')); // 供电关系贴图_02
  }

  initItowns(){

    // let extent = new itowns.Extent(
    //   'EPSG:3946',
    //   -2178463.0844771997, -2177233.0088117006,
    //   4070583.2166874674, 4387792.125402556
    // );
    var placement = {
      coord: this.getCoordObj(116.39550791364454, 39.910490913329575),
      range: 4436.882842018815,
      heading: 2.1577581606670435,  //  旋转角度
      tilt: 33.046121484260354,    //倾斜角度
    };
    // 绘制地图
    this.view = new itowns.GlobeView(this.container, placement, {
      // mainLoop: this.mainLoop
    });
    let view = this.view;
    // 添加瓦片

    const tmsSource1 = new itowns.TMSSource({
      crs: 'EPSG:3857',
      format: 'image/png',
      url: this.mapURL,
      tileMatrixSet: 'PM',
      zoom: this.mapZoom,
    });
    const colorlayer1 = new itowns.ColorLayer('OPENSM', {
      source: tmsSource1,
      style: {},
    })
    colorlayer1.opacity = 1;
    const tmsSource2 = new itowns.TMSSource({
      crs: 'EPSG:3857',
      format: 'image/png',
      url: this.mapURL2,
      tileMatrixSet: 'PM',
      zoom: this.mapZoom,
    });
    const colorlayer2 = new itowns.ColorLayer('OPENSM2', {
      source: tmsSource2,
    })

    // view.addLayer(colorlayer2)
    if (this.hasMap) {
      view.addLayer(colorlayer1)
    }

    this.camera = view.camera.camera3D;


    let mouse = new THREE.Vector2();
    this.mouse = mouse;
    this.scene = view.scene;

    if(this.isDebug){
      let cameraHelper = new THREE.CameraHelper(this.camera);
      this.scene.add(cameraHelper);
      window.view = view;
      window.itowns = itowns;
    }

    let meshLineGroup = new THREE.Object3D();
    this.meshLineGroup = meshLineGroup;
    this.scene.add(meshLineGroup);
    //设置大小
    this.resolution = new THREE.Vector2(this.container.clientWidth, this.container.clientHeight);

    this.raycaster = new THREE.Raycaster();


    //文字加载
    var loader = new THREE.FontLoader();
    this.font = loader.parse(FONT);

  }

  initLight(){

    //环境光
    this.ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(this.ambientLight);
    // this.pointLight = new THREE.PointLight(0xffffff, 0.8);
    // this.camera.add(this.pointLight);


    // const pmremGenerator = new THREE.PMREMGenerator(renderer); // 使用hdr作为背景色
    // pmremGenerator.compileEquirectangularShader();
    //
    // new RGBELoader()
    //   .setDataType(THREE.UnsignedByteType)
    //   .load('/newmodel/black/yewan.hdr', function (texture) {
    //     const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    //     // envMap.isPmremTexture = true;
    //     pmremGenerator.dispose();
    //
    //     self.scene.environment = envMap; // 给场景添加环境光效果
    //     self.scene.background = envMap; // 给场景添加背景图
    //   });
  }

  initCssLabel(){
    //lable绘制
    let cssRenderer = new CSS2DRenderer();
    cssRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.zIndex = 2;
    this.container.appendChild(cssRenderer.domElement);
    this.cssRenderer = cssRenderer;
  }

  initComposer(){
    // 外发光
    // this.outlinePass = new OutlinePass(new THREE.Vector2(this.container.clientWidth, this.container.clientHeight), this.scene, this.camera);
    // this.outlinePass.edgeStrength = 1.5;//包围线浓度
    // this.outlinePass.edgeGlow = 10;//边缘线范围
    // this.outlinePass.edgeThickness = 0.5;//边缘线浓度
    // this.outlinePass.pulsePeriod = 0;//包围线闪烁频率
    // this.outlinePass.visibleEdgeColor.set('#1375E8');//包围线颜色
    // this.outlinePass.hiddenEdgeColor.set('#1375E8');//被遮挡的边界线颜色
    // this.composer.addPass(this.outlinePass);

    let renderer = this.view.mainLoop.gfxEngine.renderer;
    this.composer = new EffectComposer(renderer);
    const renderScene = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderScene);
    //抗锯齿
    let ssaaPass = new SSAARenderPass(this.scene, this.camera);
    ssaaPass.unbiased = false;
    ssaaPass.sampleLevel = 3;
    //辉光
    this.finalComposer = new EffectComposer(renderer);
    this.finalComposer.addPass(renderScene);


    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: {value: null},
          bloomTexture: {value: self.composer.renderTarget2.texture}
        },
        vertexShader: bloom_shader_vert,
        fragmentShader: bloom_shader_frag,
        defines: {}
      }), "baseTexture"
    );
    finalPass.needsSwap = true;

    this.finalComposer.addPass(ssaaPass)
    this.finalComposer.addPass(finalPass)
    this.composer.addPass(ssaaPass)
  }

  initRender(){
    const self = this;
    function darkObjMaterial(obj) {
      let bloom = self.bloomArr || [];
      if (obj.isMesh && obj.visible === true) {
        if (!obj.name || bloom.indexOf(obj.name) === -1) {
          self.bloomMaterials[obj.uuid] = obj.material;
          obj.material = darkMaterial;
        }
      }
    }

    function resetObjMaterial(obj) {
      if (obj.isMesh && obj.visible === true) {
        if (self.bloomMaterials[obj.uuid]) {
          obj.material = self.bloomMaterials[obj.uuid];
        }
      }
    }

    this.view.render = function render() {
      if (!self.view) {
        return;
      }
      var g = self.view.mainLoop.gfxEngine;
      var r = g.renderer
      self.animate();
      if (self.bloomArr.length != 0) {
        self.scene.traverse(darkObjMaterial);
        self.composer.render();
        self.scene.traverse(resetObjMaterial);
        self.finalComposer.render()
      } else {
        self.composer.render();
      }
      g.label2dRenderer.render(self.scene, self.camera)
      if (self.view.mainLoop.renderingState == 0) {
        self.view.notifyChange();
      }

      // if(view.mainLoop.renderingState = 0) {
      //   requestAnimationFrame(function (timestamp) {
      //     view.mainLoop._step(view, timestamp);
      //   });
      // }
    }
  }

  init3DModel() {
    this.getTextureImg();
    this.options.beforeInit.call(this);
    // 绘制地图
    this.initItowns();
    let view = this.view;
    this.initLight();
    //地图参数控制值
    this._initOrbitControls();
    this.initCssLabel();
    this.initComposer();
    this.initRender();
    this.options.afterInit.call(this);
  }

  drapText(text, {size = 1000, lon = 116.408689, lat = 39.912421, hei = 0}) {
    const textShapes = this.font.generateShapes(text, size)
    let geometry = new THREE.ShapeBufferGeometry(textShapes);
    const textMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(255, 255, 255),
    });
    let text1 = new THREE.Mesh(geometry, textMaterial);

    var coord = this.getCoordXyz(lon, lat, hei);
    text1.position.copy(coord);
    this.scene.add(text1);
    this.view.notifyChange();
  }

  dropWeilan(arr, repeatX, name, opt) {
    const geometry = new THREE.Geometry();
    // arr = arr || [];
    let zArr = [];
    let allLen = 0;
    let pointLenArr = [];

    let hei = (opt && opt.hei) || 0
    arr.forEach((v, i) => {
      let lon = Number(v.lng);
      let lat = Number(v.lat);
      let xyz = this.changeCoordinates(lon, lat, hei);
      let xyz2 = this.changeCoordinates(lon, lat, hei + 50);
      let xyzV3 = new THREE.Vector3(xyz[0], xyz[1], xyz[2]);
      let xyzV32 = new THREE.Vector3(xyz2[0], xyz2[1], xyz2[2]);
      geometry.vertices.push(xyzV3);
      geometry.vertices.push(xyzV32);
      let len;
      if (i == 0) {
        len = 0;
      } else {
        let prevVal = arr[i - 1];
        len = this.GetDistance(lon, lat, prevVal.lng, prevVal.lat);
      }
      allLen += len;
      pointLenArr.push(allLen);
    })

    let faceArr = [];
    let arrLen = arr.length * 2;
    for (let i = 0; i < arrLen; i += 2) {
      let a = i - 1;
      let b = i;
      let c = i + 1;
      let d = i + 2;
      if (a > 0) {
        faceArr.push(new THREE.Face3(a, b, c));
      }
      if (d < arrLen) {
        faceArr.push(new THREE.Face3(c, b, d));
      }
    }
    geometry.faces = faceArr;
    pointLenArr.forEach((v, i) => {
      if (i != 0) {
        let prevVal = pointLenArr[i - 1];
        let num1 = prevVal / allLen;
        let num2 = v / allLen;
        let uv1 = new THREE.Vector2(num1, 1);
        let uv2 = new THREE.Vector2(num1, 0);
        let uv3 = new THREE.Vector2(num2, 1);
        let uv4 = new THREE.Vector2(num2, 0);
        geometry.faceVertexUvs[0].push([uv1, uv2, uv4])
        geometry.faceVertexUvs[0].push([uv1, uv4, uv3])
      }
    })

    geometry.computeBoundingSphere();

    const texture = new THREE.TextureLoader().load(require('../../imgs/map/dianziweilan.png'));
    // const texture = new THREE.TextureLoader().load( require('../../imgs/map/weilan.png'));
    texture.repeat = new THREE.Vector2(repeatX, 1);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

// 立即使用纹理进行材质创建
    const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    material.transparent = true;//是否透明
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.name = name || 'weilan';
    this.offsetMaterialArr.push({
      name: mesh.name,
      speed: 0.05,
      type: 'x',
    })
    this.scene.add(mesh);

    if (name != 'weilan5')
      this.dropFanwei(arr, 'fanwei' + mesh.name, hei + 2, opt);
  }

  dropFanwei(arr, name, hei = 2, opt) {
    const californiaPts = [];
    let list = [];
    arr.forEach(v => {
      let lon = Number(v.lng);
      let lat = Number(v.lat);
      let xyz = this.changeCoordinates(lon, lat, hei);
      let xyzV3 = new THREE.Vector3(xyz[0], xyz[1], xyz[2]);
      californiaPts.push(xyzV3);
      list.push(new THREE.Vector2(xyzV3.x, xyzV3.y));
    })
    const heartShape = new THREE.Shape(list);
    const geometry = new THREE.ShapeGeometry(heartShape);

    let vertices = geometry.vertices;
    for (let i = 0; i < vertices.length; i++) {
      geometry.vertices[i].z = californiaPts[i].z;
    }


    let color = (opt && opt.color && new THREE.Color(opt.color)) || 0x08292C;
    const material = new THREE.MeshBasicMaterial({
      color: 0x08292C,   //0x06396f
      side: THREE.DoubleSide,
      transparent: true,
      opacity: (opt && opt.fanweiOpt) || 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    // mesh.scale.set(0.5, 0.5, 0.5);
    // var meshCoord1 = this.getCoordXyz(116.400525, 39.902782, 50);
    // mesh.position.copy(meshCoord1);
    // mesh.lookAt(new THREE.Vector3(0, 0, 0));
    // mesh.rotateX(Math.PI );
    mesh.updateMatrixWorld();
    this.scene.add(mesh);
    this.view.notifyChange();
  }

  //地图参数控制
  _initOrbitControls() {
    let controls = this.view.controls;
    controls.minDistance = 100;
    controls.maxDistance = 20000;
    controls.minPolarAngle = Math.PI / 180 * 5;
    controls.maxPolarAngle = Math.PI / 180 * 70;
    this.view.controls.enableDamping = false;

    // DOLLY: {mouseButton: 1, enable: true}
    // MOVE_GLOBE: {mouseButton: 0, enable: true, finger: 1}   鼠标左键移动
    // NONE: {}
    // ORBIT: {mouseButton: 0, keyboard: 17, enable: true, finger: 2}    绕中心旋转
    // PAN: {mouseButton: 2, up: 38, bottom: 40, left: 37, right: 39, up: 38}    修改地面高度
    // PANORAMIC: {mouseButton: 0, keyboard: 16, enable: true}  旋转镜头
    controls.states.ORBIT = {
      mouseButton: 2,
      enable: true,
      finger: 2
    }
    controls.states.PAN.enable = false;

    this.controls = controls;
  }

  animate() {
    let dealData = this.clock.getDelta();
    this.camera.updateProjectionMatrix();
    this.animationList.forEach(v => {
      v[1].updateMatrixWorld();
      v[0].getMixer().update(dealData);
    })
    this.loadFileOffsetMaterialArr.forEach(v => {
      let offsetMaterial = this.scene.getObjectByName(v.name);
      if (offsetMaterial) {
        let index = v.materIndex || 0;
        let material = offsetMaterial.material[index] || offsetMaterial.material;
        let map = material.map;
        let type = v.type || 'y';
        map && map.offset && (map.offset[type] += (v.speed));
      }
    })
    this.offsetMaterialArr.forEach(v => {
      let offsetMaterial = this.scene.getObjectByName(v.name);
      if (offsetMaterial) {
        if (v.type == 'weilan') {
          let scale = offsetMaterial.scale;
          let y = scale.y;
          let dir = -1;
          if (y <= 1) {
            dir = 1
          } else if (y >= 1.2) {
            dir = -1;
          } else {
            dir = offsetMaterial.userData.dir || -1;
          }

          y += (dir * 0.01)
          y = parseFloat(parseFloat(y).toFixed(2))
          offsetMaterial.userData.dir = dir;
          offsetMaterial.scale.set(scale.x, y, scale.z);
          offsetMaterial.updateMatrixWorld();
        } else {
          let material = offsetMaterial.material[0] || offsetMaterial.material;
          let map = material.map;
          let type = v.type || 'y';
          map && map.offset && (map.offset[type] += (v.speed));
        }
      }
    })
    this.options.onAnimation.call(this);
    this.renderCss();
  }

  renderCss() {
    this.cssRenderer.render(this.scene, this.camera);
  }

  removeLabel(notRemove) {
    if (this.labelNameList) {
      this.labelNameList.forEach(v => {
        let isRemove = true;
        if (notRemove) {
          if (Array.isArray(notRemove)) {
            notRemove.forEach(val => {
              if (v.indexOf(val) != -1) {
                isRemove = false;
              }
            })
          } else if (v.indexOf(notRemove) != -1) {
            isRemove = false;
          }
        }
        if (!isRemove) {
          return;
        }
        let obj = this.scene.getObjectByName(v);
        if (obj) {
          this.scene.remove(obj);
        }
      })
    }
  }

  createText() {

  }

  createLabel(list, type) {
    list.forEach(v => {
      this.createOneLabel(v, `${type}-${v.id}`);
    })
  }

  createOneLabel(obj, id) {
    let element = document.getElementById(id);
    if (!element) {
      console.error(`not find label id ${id}`);
      return
    }
    let pos = this.getCoordXyz(obj.lon, obj.lat, obj.height);
    if (!pos) {
      console.error(`no lon or lat id is ${id} name ${obj.stationName}`);
      return
    }
    let object = new CSS2DObject(element);
    pos.y = pos.y - 1; // 将多余的图形往地下偏移
    object.position.copy(pos);
    object.rotation.copy(new THREE.Euler(0, 0, 0));
    object.lookAt(new THREE.Vector3(0, 0, 0));
    object.rotateX(Math.PI / 2);
    object.rotateZ(Math.PI);
    object.updateMatrixWorld();
    object.name = id;
    this.labelNameList.push(object.name);
    this.scene.add(object);
    this.view.notifyChange();
  }

  // 按照顺序动态显示标签
  createLabelOrderByList(playIndex, timer = 1000) {
    let setPowerLabels = this.vue.setPowerLabels || [];
    let labelPlay = setPowerLabels[playIndex - 1] || []; // 默认在连线之前就要显示第一个标签
    for (let i = 0; i < labelPlay.length; i++) {
      this.createLabel(labelPlay, 'gdgx');
    }

    if (window.timerCurveShape) {
      window.clearTimeout(window.timerCurveShape);
    }

    if (playIndex > lineFinishedPoints.length) {
      return;
    }

    window.timerCurveShape = setTimeout(() => {
      this.setPowerLine(lineFinishedPoints[playIndex - 1], playIndex - 1);
      if (!this.animateFlag) {
        this.animateFlag = true;
      }
      this.removeMesh("tubeMeshLinepoints");
    }, timer)
  }

  // 组装数据
  createPowerPoints(list, diffObj) {
    playIndex = 1;
    playIndex2 = 0; // 供电关系下标
    playPoints = []; // 供电关系组装后的数据
    lineFinishedPoints = []; // 动画结束后的连线
    finishedTimes = 0

    let setPoints = list;
    let pointCurrentStart, pointCurrentEnd;

    for (let i = 0; i < setPoints.length; i++) {
      playPoints.push([]);
      for (let j = 0; j < setPoints[i].length; j++) {
        playPoints[i].push([]);
        for (let m = 0; m < setPoints[i][j].length; m++) {
          if (setPoints[i][j][m] == diffObj['n2'] || setPoints[i][j][m] == diffObj['n3']) { // 折中点特殊处理：注意 setPoints 下标
            pointCurrentStart = this.changeCoordinates(setPoints[i][j][m]['lon'], setPoints[i][j][m]['lat'], 120);
            playPoints[i][j].push(new THREE.Vector3(pointCurrentStart[0], pointCurrentStart[1], pointCurrentStart[2]));

            if (setPoints[i][j].length > 1 && m < (setPoints[i][j].length - 1)) {
              if (j == 8) { // 创建折中点
                playPoints[i][j].push({
                  x: -2178226.7263674177,
                  y: 4389067.475090398,
                  z: 4069638.831815902,
                  isVector3: true
                });
              }

              if (j == 9) {
                playPoints[i][j].push({
                  x: -2178222.2330241115,
                  y: 4389077.65542164,
                  z: 4069630.3148084073,
                  isVector3: true
                });
              }
            }
          } else { // 折中点正常处理
            pointCurrentStart = this.changeCoordinates(setPoints[i][j][m]['lon'], setPoints[i][j][m]['lat'], 120);
            playPoints[i][j].push(new THREE.Vector3(pointCurrentStart[0], pointCurrentStart[1], pointCurrentStart[2]));
            if (setPoints[i][j].length > 1 && m < (setPoints[i][j].length - 1)) {
              pointCurrentEnd = this.changeCoordinates(setPoints[i][j][m]['lon'], setPoints[i][j][m + 1]['lat'], 120);
              playPoints[i][j].push(new THREE.Vector3(pointCurrentEnd[0], pointCurrentEnd[1], pointCurrentEnd[2])); // 创建折中点
            }
          }
        }
      }
    }

    for (let i = 0; i < playPoints.length; i++) {
      lineFinishedPoints.push([]);
      for (let j = 0; j < playPoints[i].length; j++) {
        lineFinishedPoints[i].push([[playPoints[i][j][0]['x'], playPoints[i][j][0]['y'], playPoints[i][j][0]['z']], [playPoints[i][j][1]['x'], playPoints[i][j][1]['y'], playPoints[i][j][1]['z']]]);
        lineFinishedPoints[i].push([[playPoints[i][j][1]['x'], playPoints[i][j][1]['y'], playPoints[i][j][1]['z']], [playPoints[i][j][2]['x'], playPoints[i][j][2]['y'], playPoints[i][j][2]['z']]]);
      }
    }


    // this.createCurveShape(playPoints[0][0], playPoints[0].length);
  }


  // 供电关系图
  setGuijiPowerLine(arr, len) {
    let curveObj = {}, points;
    let tubeMaterial, tubeGeometry, powerTexture;
    let meshName;

    for (let i = 0; i < arr.length; i++) {
      points = [];
      for (let j = 0; j < arr[i].length; j++) {
        points.push(new THREE.Vector3(arr[i][j][0], arr[i][j][1], arr[i][j][2]));
      }
      let curve = curveObj['curve-' + i];
      curve = new THREE.CatmullRomCurve3(points, false);
      tubeGeometry = new THREE.TubeGeometry(curve, len, 9, 4, false);

      powerTexture = new THREE.TextureLoader().load(require('../../imgs/map/powerStation_01.png'));

      meshName = 'powerStation_' + new Date().getTime() + '_' + i;

      powerTexture.repeat.x = 50;
      powerTexture.wrapS = THREE.RepeatWrapping;
      powerTexture.wrapT = THREE.RepeatWrapping;

      tubeMaterial = new THREE.MeshPhongMaterial({
        map: powerTexture,
        transparent: true
      })

      let meshTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      meshTube.name = meshName;
      this.scene.add(meshTube);
    }
  }

  clearGuijiShape() {
    animationGuijiID && window.cancelAnimationFrame(animationGuijiID);
    animationGuijiID = null;
  }

  createGuijiShape(arrs, arr2) {
    let uv1 = new THREE.Vector2(0, 1);
    let uv2 = new THREE.Vector2(0, 0);
    let uv3 = new THREE.Vector2(1, 1);
    let uv4 = new THREE.Vector2(1, 0);

    if (!arrs || arrs.length === 0)
      return;

    let sp = new Sphere();
    sp = sp.setFromPoints(arrs);

    let coord = new itowns.Coordinates("EPSG:4978");

    coord.setFromVector3(sp.center);

    let range = sp.radius;
    this.changeCamera({
      coord: coord,
      range: range * 2,
      tilt: 45,
      // heading: 0,   //  旋转角度
      time: 2000 // 持续时间
    })

    let self = this;
    let len = arrs.length * 2;

    let curve1 = new THREE.CatmullRomCurve3(arrs, false);
    let tubeGeometry = new THREE.TubeGeometry(curve1, len, 9, 3, false);
    let tubeMaterial = new THREE.MeshPhongMaterial({color: 0xf3820a});
    let tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tubeMesh.name = "tubeMeshLinepoints1";
    self.scene.add(tubeMesh);

    /*
    let points = curve1.getPoints(len);

    let length = points.length;
    let val = 0;

    renderPoints();

    function renderPoints() {
      self.clearGuijiShape();
      animationGuijiID = requestAnimationFrame(renderPoints);
      if (val == length - 1) {
        window.cancelAnimationFrame(animationGuijiID);
        animationGuijiID = null;
        // self.removeMesh('tubeMeshLinepoints1')
        // self.setGuijiPowerLine(arr2, len);
        return;
      }

      drawLine();
    }


    function drawLine() {
      if (val == length - 1) {
        return;
      }

      let subPoints1 = points[val];
      let subPoints2 = points[(val + 1) % length];

      let subPoints = [];
      subPoints.push(subPoints1);
      subPoints.push(subPoints2);

      // let geometryPoints = new THREE.BufferGeometry().setFromPoints(subPoints);
      // let line = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({color: 0xce81d7}));
      // line.name = "tubeMeshLinepoints1";
      // self.scene.add(line);

      let curve = new THREE.CatmullRomCurve3(subPoints, false); /!* 是否闭合 *!/
       let tubeGeometry = new THREE.TubeGeometry(curve, 1, 9, 3, false);
       /!*tubeGeometry.faces.push(new THREE.Face3(0,0,0));
       tubeGeometry.faceVertexUvs[0].push([uv1, uv2, uv4])
       tubeGeometry.faceVertexUvs[0].push([uv1, uv4, uv3])

       let tubeMaterial, powerTexture;
       if(playIndex > 2){
         self.powerTexture_01.wrapS = THREE.RepeatWrapping;
         self.powerTexture_01.wrapT = THREE.RepeatWrapping;
         powerTexture = self.powerTexture_01;
       }else{
         self.powerTexture_02.wrapS = THREE.RepeatWrapping;
         self.powerTexture_02.wrapT = THREE.RepeatWrapping;
         powerTexture = self.powerTexture_02;
       }
*!/
       let tubeMaterial = new THREE.MeshPhongMaterial({color: 0xce81d7});
       let tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
       tubeMesh.name = "tubeMeshLinepoints1";
       self.scene.add(tubeMesh);

      val++;
    }*/
  }

  createCurveShape(arrs, len) {
    if (animationFrameID) {
      window.cancelAnimationFrame(animationFrameID);
      animationFrameID = null;
    }
    let uv1 = new THREE.Vector2(0, 1);
    let uv2 = new THREE.Vector2(0, 0);
    let uv3 = new THREE.Vector2(1, 1);
    let uv4 = new THREE.Vector2(1, 0);

    let self = this;

    let curve1 = new THREE.LineCurve3(arrs[0], arrs[1]);
    let points1 = curve1.getPoints(5);
    let curve2 = new THREE.LineCurve3(arrs[1], arrs[2]);
    let points2 = curve2.getPoints(5);

    let length = points1.length + points2.length;
    let val = 0;
    let points = points1.concat(points2);

    renderPoints();

    function renderPoints() {
      animationFrameID = requestAnimationFrame(renderPoints);
      if (val == length - 1) {
        window.cancelAnimationFrame(animationFrameID);
        animationFrameID = null;
        self.removeMesh("tubeMeshLinepoints");
        return;
      }
      drawLine();
    }


    function drawLine() {
      if (val == length - 1) {
        self.removeMesh("tubeMeshLinepoints");
        return;
      }

      let subPoints1 = points[val];
      let subPoints2 = points[(val + 1) % length];

      let subPoints = [];
      subPoints.push(subPoints1);
      subPoints.push(subPoints2);

      let geometryPoints = new THREE.BufferGeometry().setFromPoints(subPoints);
      let line = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({color: 0xce81d7}));
      line.name = "tubeMeshLinepoints";
      self.scene.add(line);

      /* let curve = new THREE.CatmullRomCurve3(subPoints, false); /!* 是否闭合 *!/
       let tubeGeometry = new THREE.TubeGeometry(curve, 1, 1, 3, false);
       tubeGeometry.faces.push(new THREE.Face3(0,0,0));
       tubeGeometry.faceVertexUvs[0].push([uv1, uv2, uv4])
       tubeGeometry.faceVertexUvs[0].push([uv1, uv4, uv3])

       let tubeMaterial, powerTexture;
       if(playIndex > 2){
         self.powerTexture_01.wrapS = THREE.RepeatWrapping;
         self.powerTexture_01.wrapT = THREE.RepeatWrapping;
         powerTexture = self.powerTexture_01;
       }else{
         self.powerTexture_02.wrapS = THREE.RepeatWrapping;
         self.powerTexture_02.wrapT = THREE.RepeatWrapping;
         powerTexture = self.powerTexture_02;
       }

       tubeMaterial = new THREE.MeshPhongMaterial({
         map: powerTexture,
         transparent: true
       });
       let tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
       tubeMesh.name = "tubeMeshLinepoints";
       self.scene.add(tubeMesh);*/

      val++;
    }
  }

  createCurveShapeByClick() {
    let lineTimer = 2000; // 持续时间
    playIndex2 = 0;

    // 根据不同的 playIndex 调整摄像头视角
    if (playIndex < playPoints.length) {
      let coord, range, tilt;

      if (playIndex == 1) {
        coord = this.getCoordObj(116.39341366784129, 39.90495769879127, 0);
        range = 3703.887666162837;
        tilt = 37.446605920019906;
      }

      if (playIndex == 2) {
        // 西大望龙潭湖真实视角
        // coord = this.getCoordObj(116.39813549054195, 39.89848559957171, 0);
        // range = 7401.460836279117;
        // tilt = 47.07830287022709;

        // 西大望龙潭湖调整后的视角
        coord = this.getCoordObj(116.38606089171353, 39.903779882919984, 0);
        range = 4002.3729295172825;
        tilt = 47.07114351601026;
      }

      if (playIndex == 3) {
        coord = this.getCoordObj(116.39723524407515, 39.90700452213892, 0);
        range = 2381.806452353073;
        tilt = 33.033669608198565;
      }

      if (playIndex == 4) {
        coord = this.getCoordObj(116.39835221719522, 39.90732101524589, 0);
        range = 2708.1267323830634;
        tilt = 44.989423813329786;
        lineTimer = 1000;

        // 清除最开始渲染的三根线的视角
        this.removeMesh('powerstationDelete0');
        this.removeMesh('powerstationDelete1');
        this.removeMesh('powerstationDelete2');
      }

      this.changeCamera({
        coord: coord,
        range: range,
        // heading: 0,   //  旋转角度
        tilt: tilt,    // 倾斜角度
        time: lineTimer // 持续时间
      });
    }

    window.timerCurveShape = setTimeout(() => {
      let playArr = playPoints[playIndex] || [];
      for (let i = 0; i < playArr.length; i++) {
        this.createCurveShape(playArr[i], playArr.length);
      }

      playIndex++;

      // 依次创建标签
      this.createLabelOrderByList(playIndex, lineTimer);
    }, lineTimer);
  }

  //根据类型和名称从obj缓存中获取obj对象
  getObj(type, name) {
    let arr = this.objMap[type];
    if (arr && name) {
      let obj = arr.find(v => v.name === name)
      return obj || null;
    }
    return arr;
  }

  getPosition3D(obj) {
    let geometry = obj.geometry;
    //计算当前几何体的外边界矩形，更新boundingBox属性
    geometry.computeBoundingBox()
    let centroid = new THREE.Vector3();
    centroid.addVectors(geometry.boundingBox.min, geometry.boundingBox.max);
    //放大0.5倍
    centroid.multiplyScalar(0.5)
    centroid.applyMatrix4(obj.matrixWold);
    return centroid;
  }

  //判断是否在页面显示范围内
  inCamera(centroid) {
    let tempV = centroid.clone().applyMatrix4(this.camera.matrixWorldInverse).applyMatrix4(this.camera.projectionMatrix);
    if ((Math.abs(tempV.x) > 1) || (Math.abx(tempV.y) > 1) || (Math.abs(tempV.z) > 1)) {
      return false
    } else {
      return true;
    }

  }

  getPosition(obj) {
    let centroid = this.getPosition3D(obj);
    if (!this.inCamera(centroid)) {
      return false;
    } else {
      let vector = centroid.project(this.camera);
      //在视野范围内，将三维坐标张转换为二位坐标
      let halfWidth = this.container.clientWidth / 2;
      let halfHeight = this.container.clientHeight / 2;
      let x = Math.round(vector.x * halfWidth + halfWidth),
        y = Math.round(-vector.y * halfHeight + halfHeight);
      return {x: x, y: y};
    }
  }

  changeObjects(objects, status) {
    if (!objects)
      return;
    objects.forEach(v => {
      if (v)
        v.visible = status;
    })
  }

  onModelClick() {
    let offsetLeft = this.container.offsetLeft;
    let offsetTop = this.container.offsetTop;
    this.mouse.x = ((event.clientX - offsetLeft) / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -((event.clientY - offsetTop) / this.container.clientHeight) * 2 + 1;
    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = [];
    intersects = this.raycaster.intersectObjects(this.deviceList, true);
    if (intersects && intersects.length > 0) {
      this.options.onModelClick.call(this, intersects);
    }
  }

  show(objects) {
    this.changeObjects(objects, true);
  }

  hide(objects) {
    this.changeObjects(objects, false);
  }

  cloneObject3D(obj) {
    const cloneObj = obj.clone();
    cloneObj.children.map((v, i) => { //克隆材质
      if (v.material) {
        if (Array.isArray(v.material)) {
          let arr = [];
          let material = obj.children[i].material;
          material.forEach(val => {
            arr.push(val.clone());
          })
          v.material = arr;
        } else {
          v.material = obj.children[i].material.clone();
        }
      }
    });

    return cloneObj;
  }

  loadHuadengModel(list, modelType = 0) {
    let huadeng = this.files.huadeng[modelType]
    let models = [
      {
        path: huadeng.path,
        file: huadeng.file,
        list: list || [],
      }
    ];
    let type = 'out';
    this.loadFile(models, type);
  }

  loadFile(models, type, trans) {
    let self = this;
    let loaderType = self.options.config.loaderType || "obj";
    let version = self.options.config.version || 1;
    let fileConfig = models[0];
    let _start = new Date().getTime();
    return new Promise((resolve, reject) => {
      if (!fileConfig || !fileConfig.path) {
        resolve()
        return;
      }

      //加载模型
      var promiseCollada = new ComplexLoader(fileConfig.path, fileConfig.file,).load().then(collada => {
        if (!self.view) {
          reject('取消模型加载！')
          return;
        }
        var modelInit = collada.data;

        let modelList = [];
        if (fileConfig.list) {
          modelList = fileConfig.list;
        } else {
          modelList = [{x: fileConfig.x, y: fileConfig.y, z: fileConfig.z, objName: fileConfig.objName}];
        }
        let len = modelList.length;
        modelList.forEach(v => {
          let model = null;
          if (len == 1) {
            model = modelInit;
          } else {
            model = self.cloneObject3D(modelInit);
          }
          let z = parseFloat(v.z) + 3
          let coord = this.getCoordXyz(v.x, v.y, z);
          model.position.copy(coord);
          model.lookAt(model.position.clone().add(coord.geodesicNormal));
          model.rotateX((fileConfig.rotateX || fileConfig.rotateX == 0) || Math.PI / 2);
          let rotateY = fileConfig.rotateY;
          if (!rotateY && rotateY != 0) {
            rotateY = Math.PI / 180 * 2;
          }
          model.rotateY(rotateY);
          let scale = fileConfig.objScale || self.options.config.objScale || {x: 3, y: 3, z: 3};
          model.scale.set(scale.x, scale.y, scale.z);
          if (fileConfig.type == 'guiji') {
            model.name = 'guiji';
            model.visible = false;
          }
          if (v.objName) {
            model.name = v.objName;
          }
          if (fileConfig.hide) {
            if (v.objName != 'biaoji-zhongxinxizhan')
              model.visible = false;
          }
          model.userData = {x: v.x, y: v.y, z: z};

          self.options.onFileLoaded.call(self, model, fileConfig, collada);


          // update coordinate of the mesh
          model.updateMatrixWorld();
          // self.outlinePass.selectedObjects  = [model];
          // self.selectedObjects.push(model)
          // self.outlinePass.selectedObjects  = self.selectedObjects;

          if (fileConfig.isOffsetSpeed) {
            let obj = {
              name: model.children[0].name,
              speed: fileConfig.isOffsetSpeed || 0.01,
            };
            if (fileConfig.isOffsetSpeedType) {
              obj.type = fileConfig.isOffsetSpeedType;
            }
            if (model.children[0].name == 'dongxicheng') {
              self.loadFileOffsetMaterialArr.push({
                ...obj,
                speed: obj.speed * -1,
                materIndex: 1,
              })
            } else {
              self.loadFileOffsetMaterialArr.push(obj)
            }
          }

          let name = model.children[0].name;
          if (name.indexOf('dimian') != -1) {
            model.children[0].material.transparent = true;
            model.children[0].material.opacity = 0.3
          }
          // if(fileConfig.emissive){
          //   // model.children[0].material.emissive = new THREE.Color("rgb(255, 255, 255)");
          //   model.children[0].material.emissiveIntensity = 5;
          // }
          self.scene.add(model);
          if (fileConfig.isBloom && model.children[0] && model.children[0].name) {
            self.bloomArr.push(model.children[0].name)
          }
          self.view.notifyChange();

          // console.log(model);
          if (fileConfig.isAnimation && model.animations && model.animations[0]) {
            // if (fileConfig.isAnimation) {
            let mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(model.animations[0]);
            action.play();
            self.animationList.push([
              action,
              model,
            ]);
          }


          let arr = [];
          if (Array.isArray(model)) {
            arr = model;
          } else {
            arr = model.children;
          }

          for (let i = 0; i < arr.length; i++) {
            let name = arr[i].name;
            // 判断文件是否需要透明化
            // if (trans.indexOf(name) >= 0) {
            //   self.transparent(arr[i], 0.25);
            // }
            // 缓存obj对象
            if (!self.objMap[type]) {
              let types = [arr[i]];
              self.objMap[type] = types;
            } else {
              self.objMap[type].push(arr[i]);
            }
            self.deviceList.push(arr[i]);
          }
        })
        resolve()
      }).catch(err => {
        console.error("loader init error", err)
      })
    })
  }

  loadTypeDevice(devType, trans) {
    let self = this;
    return new Promise(function (resolve) {
      if (!self.objMap[devType] || self.objMap[devType].length <= 0) {
        // 判断该类型是否被缓存过
        let pArr = [];
        // 没被缓存过则去加载该类型的所有文件
        for (let i = 0; i < self.files[devType].length; i++) {
          let p = [self.files[devType][i]];
          pArr.push(self.loadFile(p, devType, trans));
        }
        Promise.all(pArr).then(function () {
          resolve();
        }).catch((err) => {
          console.error(err);
        });
      } else {
        // 被缓存过则将缓存的obj对象显示出来，并调整透明度
        let devList = self.objMap[devType];
        for (let i = 0; i < devList.length; i++) {
          let name = devList[i].name;
          devList[i].visible = true;
        }
        resolve();
      }
    }).catch((err) => {
      console.error(err);
    })
  }


  initSceneCamera() {
    let self = this;
    let sceneName = this.currentScence;
    let typeInfo = self.consInfo[sceneName];
    let cameraInfo = typeInfo.camera;
    let obj = {
      coord: this.getCoordObj(cameraInfo.x, cameraInfo.y, cameraInfo.z),
    }
    if (cameraInfo.range || cameraInfo.range == 0) {
      obj.range = cameraInfo.range;
    }
    if (cameraInfo.heading || cameraInfo.heading == 0) {
      obj.heading = cameraInfo.heading;
    }
    if (self.isFirst) {
      self.isFirst = false;
    } else {
      if (!obj.heading) {
        obj.heading = 0;
      }
    }
    if (cameraInfo.tilt || cameraInfo.tilt == 0) {
      obj.tilt = cameraInfo.tilt;
    }
    var placement = obj;
    self.changeCamera(placement);
  }

  initModelPos() {
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      let children = this.scene.children[i];
      let userData = children.userData;
      if (userData.x) {
        let xyz = this.getCoordXyz(userData.x, userData.y, userData.z);
        children.position.copy(xyz);
        children.updateMatrixWorld();
      }
    }
  }

  loadScene(sceneName) {
    let self = this;
    if (this.currentScence != sceneName) {
      this.currentScence = sceneName;
      let typeInfo = this.consInfo[sceneName];
      if (typeInfo) {
        let trans = typeInfo.trans || [];
        let types = typeInfo.type;

        this.hideAll();
        this.initSceneCamera();
        this.initModelPos();

        let funs = [];
        // 根据类型加载scene中配置的文件
        for (let i = 0; i < types.length; i++) {
          funs.push(self.loadTypeDevice(types[i], trans));
        }
        Promise.all(funs).then(function () {
          self.options.onSceneLoaded.call(self, sceneName);
        }).catch((err) => {
          self.options.onSceneLoaded.call(self, sceneName);
          console.error(err);
        });

      } else {
        // this.loadTypeDevice(sceneName, []).then(() => {
        //   this.options.onSceneLoaded.call(this, sceneName);
        // })
      }
    } else {
      this.initSceneCamera();
      this.initModelPos();
      this.options.onSceneLoaded.call(self, sceneName);
    }


  }

  // 隐藏所有缓存的obj
  hideAll() {
    this.animationList = [];
    this.offsetMaterialArr = [];
    for (let i in this.objMap) {
      if (i == "__position") {
        continue;
      }
      this.hide(this.objMap[i]);
    }
  }

  clickChangeCamera(obj, opt = {
    range: 1500,
    tilt: 45,
  }) {
    let placement = {
      coord: this.getCoordObj(obj.lon || obj.lng, obj.lat, 0),
    }
    opt.range && (placement.range = opt.range);

    opt.tilt && (placement.tilt = opt.tilt);

    opt.heading && (placement.heading = opt.heading);
    // if(cameraInfo.heading || cameraInfo.heading == 0){
    //   placement.heading = cameraInfo.heading;
    // }
    // if(cameraInfo.tilt || cameraInfo.tilt == 0){
    //   obj.tilt = cameraInfo.tilt;
    // }

    this.changeCamera(placement);
  }

  changeCamera(opt) {
    //coord: Coordinate （默认值：）currentCoordinate—相机看地理坐标
    //tilt: Number （默认值：）currentTilt—相机倾斜度
    //heading: Number （默认值：）currentHeading—相机的航向，以度为单位
    //range: Number （默认值：）currentRange—相机到目标坐标的距离，以米为单位
    //time: Number （默认值：）2500—动画的持续时间，以毫秒为单位
    //proxy: boolean （默认值：）true—使用代理来处理相机的转换。如果proxy == true，则其他摄影机的转换将停止装备的转换
    //easing: Number （默认值：）TWEEN.Easing.Quartic.InOut—进出缓动动画
    //     Back: {In: ƒ, Out: ƒ, InOut: ƒ}  先回退一点在正常
    //     Bounce: {In: ƒ, Out: ƒ, InOut: ƒ}  抖动
    //     Circular: {In: ƒ, Out: ƒ, InOut: ƒ}  慢- 块-慢
    //     Cubic: {In: ƒ, Out: ƒ, InOut: ƒ} 慢- 加速块-慢
    //     Elastic: {In: ƒ, Out: ƒ, InOut: ƒ}  多次抖动
    //     Exponential: {In: ƒ, Out: ƒ, InOut: ƒ}
    //     Linear: {None: ƒ}
    //     Quadratic: {In: ƒ, Out: ƒ, InOut: ƒ}
    //     Quartic: {In: ƒ, Out: ƒ, InOut: ƒ}
    //     Quintic: {In: ƒ, Out: ƒ, InOut: ƒ}
    //     Sinusoidal: {In: ƒ, Out: ƒ, InOut: ƒ}
    //callback: function （可选的） - 回调调用每个动画的帧（参数是当前的cameraTransform和worldTargetPosition）
    //stopPlaceOnGroundAtEnd: boolean （默认值：）defaultStopPlaceOnGroundAtEnd—在动画结束时将目标停在地面上
    let obj = this.getCameraDetails();
    if (obj.heading == opt.heading) {
      delete opt.heading;
    }
    itowns.CameraUtils.sequenceAnimationsToLookAtTarget(this.view, this.camera, [opt])
  }

  changeCoordinates(longitude, latitude, height = 1) {
    let lon = Number(longitude) || 0;
    let lat = Number(latitude) || 0;
    let h = Number(height);
    let res = this.getCoordXyz(lon, lat, h);

    return [res.x, res.y, res.z];
  }

  // 移除网格 removeMesh("powerStation");
  removeMesh(childName) {
    if (Array.isArray(childName)) {
      for (let i = this.scene.children.length - 1; i >= 0; i--) {
        if (childName.indexOf(this.scene.children[i].name) != -1) {
          this.scene.remove(this.scene.children[i]);
        }
      }
    } else {
      for (let i = this.scene.children.length - 1; i >= 0; i--) {
        if (this.scene.children[i].name.indexOf(childName) != -1) {
          this.scene.remove(this.scene.children[i]);
        }
      }
    }
  }

  // 供电关系图
  setPowerLine(arr, index) {
    let rpxArr = this.vue.repeatxArrs[index] || [];
    let curveObj = {}, points;
    let tubeMaterial, tubeGeometry, powerTexture;
    let repeatX, meshName;

    for (let i = 0; i < arr.length; i++) {
      points = [];
      for (let j = 0; j < arr[i].length; j++) {
        points.push(new THREE.Vector3(arr[i][j][0], arr[i][j][1], arr[i][j][2]));
      }
      let curve = curveObj['curve-' + i];
      curve = new THREE.CatmullRomCurve3(points, false);
      tubeGeometry = new THREE.TubeGeometry(curve, 1, 9, 4, false);

      // 设置不同的分段数和贴图

      if(index == 0 || index == 1){
        powerTexture = new THREE.TextureLoader().load(require('../../imgs/map/powerStation_02.png'));
      }else if(index == 2){
        powerTexture = new THREE.TextureLoader().load(require('../../imgs/map/powerStation_01.png'));
      }else{
        powerTexture = new THREE.TextureLoader().load(require('../../imgs/map/powerStation_02.png'));
      }

      if (rpxArr.length > 0) {
        repeatX = rpxArr[i];
      }

      meshName = 'powerStation_' + new Date().getTime() + '_' + i + '_powerstationDelete' + index;
      this.offsetMaterialArr.push({
        name: meshName,
        speed: -0.1,
        type: "x"
      })

      if (!!repeatX) {
        powerTexture.repeat.x = repeatX;
      }
      powerTexture.offset.y = 0.5;

      powerTexture.wrapS = THREE.RepeatWrapping;
      powerTexture.wrapT = THREE.RepeatWrapping;

      tubeMaterial = new THREE.MeshPhongMaterial({
        map: powerTexture,
        transparent: true
      })

      let meshTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      meshTube.name = meshName;
      this.scene.add(meshTube);
    }
  }

  setCurve(arr, texture = 'lineTexture', radius = 3, meshName, radiusSegments = 3) {
    let curveObj = {}, points;
    let tubeMaterial, tubeGeometry;
    let group = new THREE.Group();
    this.scene.add(group);

    for (let i = 0; i < arr.length; i++) {
      points = [];
      for (let j = 0; j < arr[i].length; j++) {
        points.push(new THREE.Vector3(arr[i][j][0], arr[i][j][1], arr[i][j][2]));
      }
      let curve = curveObj['curve-' + i];
      curve = new THREE.CatmullRomCurve3(points, false);/* 是否闭合 */
      tubeGeometry = new THREE.TubeGeometry(curve, 25, radius, radiusSegments, false);

      this[texture].wrapS = THREE.RepeatWrapping;
      this[texture].wrapT = THREE.RepeatWrapping;
      tubeMaterial = new THREE.MeshPhongMaterial({
        map: this[texture],
        transparent: true,
        side: THREE.DoubleSide
      });

      let meshTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      if (!!meshName) {
        group.name = meshName;
      }

      group.add(meshTube)
    }
  }

  setLine(arr) {
    let points, material, geometry, tline;

    for (let i = 0; i < arr.length; i++) {
      points = [];
      for (let j = 0; j < arr[i].length; j++) {
        points.push(new THREE.Vector3(...arr[i][j]));
      }
      material = new THREE.LineBasicMaterial({
        color: this.colorLine(),
        linewidth: 1,
        // transparent: true,
        // opacity: 0.5,
      });
      geometry = new THREE.Geometry();
      geometry.vertices.push(...points);

      tline = new THREE.Line(geometry, material);
      this.scene.add(tline);
    }
  }

  colorLine() {
    return Math.round(Math.random() * 0xffffff);
  }

  GetDistance(lng1, lat1, lng2, lat2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  }

  destroy() {
    this.view.dispose();

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

    this.view.scene.traverse((c) => {
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
      c.material = null
    })
    this.view.scene.children = [];
    this.view.scene = null;
    this.view.camera = null;

    this.objMap = null;
    this.edges = null;
    this.view._layers = null;
    this.view._fullSizeDepthBuffer = null;
    this.view._pixelDepthBuffer = null;
    this.view.mainLoop.gfxEngine.renderer.dispose();

    this.view.mainLoop.gfxEngine.renderer.forceContextLoss();
    this.view.mainLoop.gfxEngine.renderer.domElement = null;
    this.view.mainLoop.gfxEngine.renderer = null;
    this.view.mainLoop = null;
    this.view = null;
    this.scene = null;

    if (this.composer) {
      for (let i in this.composer) {
        if (this.composer[i] instanceof WebGLRenderTarget && typeof this.composer[i].dispose === "function") {
          this.composer[i].dispose();
        }
      }
      this.composer = null;
    }

    if (this.finalComposer) {
      for (let i in this.finalComposer) {
        if (this.finalComposer[i] instanceof WebGLRenderTarget && typeof this.finalComposer[i].dispose === "function") {
          this.finalComposer[i].dispose();
        }
      }
      this.finalComposer = null;
    }
    this.offsetMaterialArr = null;
    this.loadFileOffsetMaterialArr = null;


    window.view = null;
    window.itowns = null;
    window.timerCurveShape = null;
  }

  getCoordObj(lon, lat, hei = 0) {
    lon = Number(lon) || 0;
    lat = Number(lat) || 0;
    hei = Number(hei);

    let lonlat = gcj02towgs84(lon, lat)
    var coord = new itowns.Coordinates('EPSG:4326', lonlat[0], lonlat[1], hei);
    return coord;
  }

  getCoordXyz(lon, lat, hei = 0) {
    lon = Number(lon) || 0;
    lat = Number(lat) || 0;
    hei = Number(hei);
    var coord = this.getCoordObj(lon, lat, hei).as("EPSG:4978");
    return coord;
  }

  getVector3(lon, lat, hei = 0) {
    lon = Number(lon) || 0;
    lat = Number(lat) || 0;
    hei = Number(hei);
    var xyz = new THREE.Vector3(lon, lat, hei);
    return xyz;
  }

  changeObjPosByName(name, toPos, isParent, time = 0.5) {
    let self = this;
    return new Promise(resolve => {
      let lon = toPos.lon || 0, lat = toPos.lat || 0, hei = toPos.hei || 0;
      let xyz = null;
      if (toPos.x && toPos.y && toPos.z) {
        xyz = toPos;
      } else {
        xyz = this.getCoordXyz(lon, lat, hei);
      }
      let object = null;
      if (typeof name == 'string') {
        object = self.scene.getObjectByName(name);
        if (isParent) {
          object = object.parent;
        }
      } else {
        object = name;
      }

      if (object) {
        TweenMax.to(object.position, time, {
          x: xyz.x,
          y: xyz.y,
          z: xyz.z,
          ease: Power0.easeNone,
          onUpdate: function () {
            if (object.visible) {
              object.updateMatrixWorld();
              self.view.notifyChange()
            }
          },
          onComplete: function () {
            resolve();
          },
        });

      }
    })

  }

  setObjPosByName(name, pos) {
    let lon = pos.lon, lat = pos.lat, hei = pos.hei || 0;
    let xyz = null;
    if (lon && lat) {
      xyz = this.getCoordXyz(lon, lat, hei);
    } else {
      return;
    }
    let object = this.scene.getObjectByName(name);
    if (object) {
      object.position.copy(xyz);
      object.updateMatrixWorld();
      this.view.notifyChange();
    }
  }

  getCameraDetails() {
    let obj = itowns.CameraUtils.getTransformCameraLookingAtTarget(this.view, this.camera);
    return obj;
  }

  droeMeshLine(geo, option) {
    const g = new MeshLine();
    g.setGeometry(geo);

    var material = new MeshLineMaterial({
      useMap: 0,
      color: 0xe4393c,
      opacity: 1,
      resolution: this.resolution,
      sizeAttenuation: false,
      lineWidth: 1000000000,
    });
    const mesh = new THREE.Mesh(g.geometry, material);
    mesh.name = 'meshlinetest';
    this.meshLineGroup.add(mesh);
    this.meshLineGroup.updateMatrixWorld();

    this.view.notifyChange();
  }
}

export default Model;
