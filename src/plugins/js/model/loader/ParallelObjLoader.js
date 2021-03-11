import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js";
import {MtlObjBridge} from "three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";
import {OBJLoader2Parallel} from "./overwrite/obj2/OBJLoader2Parallel.js";

// import {LoadedMeshUserOverride} from "three/examples/jsm/loaders/obj2/shared/MeshReceiver.js";

/**
 * obj文件异步加载器
 * @constructor
 */
function ParallelObjLoader(path, name, type, version) {
  this.dbName = path;
  this.dbVersion = version;
  this.name = name;
  this.type = type;
  this.path = path;
  this.asyncQueue = {};
}

ParallelObjLoader.prototype = {
  init() {
    return new Promise(resolve => {
      resolve();
    })
  },
  load() {
    let _self = this;
    return new Promise(resolve => {
      _self.loadObj().then(function (data) {
        resolve(data);
      })
    })
  },
  loadObj() {
    let _self = this;
    let path = _self.path;
    let name = _self.name;
    let objName = name + ".obj";
    let mtlName = name + ".mtl";
    return new Promise(resolve => {
      let mtlLoader = new MTLLoader().setPath(path);
      mtlLoader.load(mtlName, function (materials) {
        function callbackOnLoad(object) {
          let params = {
            data: object,
            source: object,
            path: path,
            name: name,
            type: 'obj'
          }
          resolve(params);
        }
        let objLoader2Parallel = new OBJLoader2Parallel()
          .setModelName(name)
          .setPath(path)
          .setLogging(true,true)
          .setJsmWorker(true, new URL("js/model/OBJLoader2JsmWorker.js", window.location.href))
          .setCallbackOnLoad(callbackOnLoad)
          .addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(materials), true);
        objLoader2Parallel.getWorkerExecutionSupport().setTerminateWorkerOnLoad(true);
        objLoader2Parallel.load(_self.getObjUrl(name), callbackOnLoad);
      })
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

export {ParallelObjLoader}
