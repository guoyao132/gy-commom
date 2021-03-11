import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/ObjLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
// import {MtlObjBridge} from "three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

/**
 * 不使用缓存，直接加载文件
 * @param path 文件路径
 * @param name 文件名
 * @param type 文件格式
 * @param version 版本(暂时无用)
 * @constructor
 */
function DefaultModelLoader(path, name, type, version) {
  this.dbName = path;
  this.dbVersion = version;
  this.name = name;
  this.type = type;
  this.path = path;
}

DefaultModelLoader.prototype = {
  constructor: DefaultModelLoader,
  init: function () {
    return new Promise((resolve) => {
      resolve();
    });
  },
  load: function () {
    let _self = this;
    return new Promise(resolve => {
      if (_self.type === "obj") {
        _self.loadObj(_self.path, _self.name).then(function (data) {
          let params = {
            data: data.data,
            source: data.source,
            path: _self.path,
            name: _self.name,
            type: 'obj'
          }
          resolve(params);
        });
      } else if (_self.type === "gltf" || _self.type === "glb" || _self.type === "GLTF" || _self.type === "GLB") {
        _self.loadGLTF().then(function (data) {
          let params = {
            data: data.data,
            source: data.source,
            path: _self.path,
            name: _self.name,
            type: _self.type
          }
          resolve(params);
        })
      }
    })
  },
  loadGLTF: function () {
    let _self = this;
    return new Promise(resolve => {
      new GLTFLoader().setPath(_self.path).load(_self.name + "." + _self.type,
        function (obj) {
          let params = {
            data: obj.scene,
            source: obj,
            path: _self.path,
            name: _self.name,
            type: _self.type
          }
          resolve(params);
        })
    });
  },
  loadObj: function () {
    let _self = this;
    return new Promise(resolve => {
      new MTLLoader()
        .setPath(_self.path)
        // 加载材质文件
        .load(_self.name + ".mtl", function (materials) {
          // new OBJLoader2()
          //   .setModelName(_self.path + _self.name + ".obj")
          //   .addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(materials), true)
          //   // 加载模型文件
          //   .load(_self.getObjUrl(), function (object) {
          //     let params = {
          //       data: object,
          //       source: object,
          //       path: _self.path,
          //       name: _self.name,
          //       type: _self.type
          //     }
          //     resolve(params);
          //   }, function () {
          //   }, function (err) {
          //     console.error(err);
          //   });

          materials.preload();
          new OBJLoader().setMaterials(materials).load(_self.getObjUrl(), function(object){
            object.name = _self.path + _self.name + ".obj";
            resolve({
              data: object,
              source: object,
              path: _self.path,
              name: _self.name,
              type: _self.type,
            })
          })
        });
    })
  },
  getObjUrl() {
    let name = this.name + ".obj";
    let path = this.path;
    if (!path.endsWith("/")) {
      path = path + "/";
    }
    return path + name;
  },
  close() {
  }

}

export {DefaultModelLoader}




