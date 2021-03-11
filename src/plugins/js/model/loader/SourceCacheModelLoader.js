import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {FileLoader} from 'three'

/**
 * 将源文件数据缓存到indexedDB
 * @param path 文件路径(同时也是数据库名)
 * @param name 文件名
 * @param type 文件格式
 * @param version 数据库版本
 * @constructor
 */
function SourceCacheModelLoader(path, name, type, version) {
  this.dbName = path;
  this.dbVersion = version;
  this.name = name;
  this.tableName = 'files';
  this.indexName = '_fileName';
  this.type = type;
  this.path = path;
}

SourceCacheModelLoader.prototype = {
  constructor: SourceCacheModelLoader,
  init: function () {
    let _self = this;
    let db = null;
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(_self.dbName, _self.dbVersion);
      request.onerror = function (event) {
        console.log('数据库打开报错', event);
        reject(event);
      };
      request.onsuccess = function (event) {
        db = request.result;
        _self.db = db;
        if (!db.objectStoreNames.contains(_self.tableName)) {
          db.createObjectStore(_self.tableName, {keyPath: _self.indexName});
        }
        console.log('数据库打开成功', event);
        resolve();
      };
      request.onupgradeneeded = function (event) {
        db = event.target.result;
        // 版本不一致，且表存在，删除之前的表，创建新表
        if (db.objectStoreNames.contains(_self.tableName)) {
          db.deleteObjectStore(_self.tableName);
        }
        db.createObjectStore(_self.tableName, {keyPath: _self.indexName});
        _self.db = db;
        console.log('数据库升级成功', event);
        resolve();
      }
    })

  },
  load: function () {
    let _self = this;
    return new Promise(resolve => {
      _self.loadDB().then(resolve).catch(function () {
        _self.loadSourceFile().then(resolve);
      })
    })
  },
  loadDB: function () {
    let type = this.type;
    let _self = this;
    return new Promise((resolve, reject) => {
      if (type === "obj" || type === "OBJ") {
        _self.loadObjFromDB().then(resolve).catch(reject);
      } else if (type === "gltf" || type === "glb" || type === "GLTF" || type === "GLB") {
        _self.loadGLTFFromDB().then(resolve).catch(reject);
      }
    })
  },
  loadSourceFile: function () {
    let type = this.type;
    let _self = this;
    return new Promise((resolve, reject) => {
      if (type === "obj" || type === "OBJ") {
        _self.loadObj().then(resolve).catch(reject);
      } else if (type === "gltf" || type === "glb" || type === "GLTF" || type === "GLB") {
        _self.loadGLTF().then(resolve).catch(reject);
      }
    })
  },
  loadGLTF: async function () {
    let _self = this;
    let path = _self.path;
    let name = _self.name;
    let gltfName = name + "." + _self.type
    let loader = new GLTFLoader().setPath(_self.path);
    let data = await _self.loadFile(path, gltfName);
    _self.addFile2DB(path, gltfName, {data: data}).then(function () {
    })
    let obj = loader.parse(data);
    data = null;
    let params = {
      data: obj.scene,
      source: obj,
      path: _self.path,
      name: _self.name,
      type: _self.type
    }
    return params;
  },
  loadGLTFFromDB: function () {
    let type = this.type;
    let name = this.name;
    let gltfName = name + "." + type;
    let _self = this;
    let loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      _self.getFileFromDB(gltfName).then(function (data) {
        data = data.data;
        let obj = loader.parse(data);
        let params = {
          data: obj.scene,
          source: obj,
          path: _self.path,
          name: _self.name,
          type: _self.type
        }
        resolve(params);
      }).catch(reject);
    })
  },
  loadObjFromDB: function () {
    return new Promise((resolve, reject) => {
      let mtlName = this.name + ".mtl";
      let objName = this.name + ".obj";
      let _self = this;
      let mtlLoader = new MTLLoader()
      let objLoader = new OBJLoader()
      this.getFileFromDB(mtlName).then(function (mtlData) {
        _self.getFileFromDB(objName).then(function (objData) {
          mtlData = mtlData.data;
          objData = objData.data;
          let mtl = mtlLoader.parse(mtlData, _self.path);
          objLoader.setMaterials(mtl);
          let object = objLoader.parse(objData);
          mtlData = null;
          objData = null;
          let params = {
            data: object,
            source: object,
            path: _self.path,
            name: _self.name,
            type: _self.type
          }
          resolve(params);
        }).catch(function () {
          console.log("load from db error :" + objName);
          reject();
        });
      }).catch(function () {
        console.log("load from db error :" + mtlName);
        reject();
      })
    })

  },
  loadObj: async function () {
    let _self = this;
    let path = _self.path;
    let name = _self.name;
    let mtlName = name + ".mtl";
    let objName = name + ".obj";
    let mtlLoader = new MTLLoader()
    let mtlData = await _self.loadFile(path, mtlName, mtlLoader.manager);
    _self.addFile2DB(path, mtlName, {data: mtlData}).then(function () {
    });
    let materials = mtlLoader.parse(mtlData, path);
    materials.preload();
    let objLoader = new OBJLoader()
      .setMaterials(materials)
      .setPath(path);
    let objData = await _self.loadFile(path, objName, objLoader.manager);
    _self.addFile2DB(path, objName, {data: objData}).then(function () {
    })
    let object = objLoader.parse(objData);
    let params = {
      data: object,
      source: object,
      path: _self.path,
      name: _self.name,
      type: _self.type
    }
    return params
  },

  addFile2DB: function (path, name, data) {
    let db = this.db;
    data[this.indexName] = name;
    let tableName = this.tableName;
    return new Promise((resolve, reject) => {
      let request = db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .add(data);
      request.onsuccess = function (event) {
        resolve(event);
      };
      request.onerror = function (event) {
        reject(event);
      }
    })
  },
  getFileFromDB(name) {
    let _start = new Date().getTime();
    let db = this.db;
    let tableName = this.tableName;
    return new Promise((resolve, reject) => {
      let transaction = db.transaction([tableName], 'readonly');
      let objectStore = transaction.objectStore(tableName);
      let request = objectStore.get(name);
      request.onerror = function (event) {
        reject(event);
      };
      let value = null;
      request.onsuccess = function (event) {
        value = event.target.result;

      };
      transaction.oncomplete = function (event) {
        let _end = new Date().getTime();
        if (value) {
          console.log("get db data [" + name + "]  ,cost " + (_end - _start) + "ms");
          resolve(value);
        } else {
          console.log("get db data [" + name + "]  failed", event);
          reject();
        }
      }
    })
  },
  loadFile(path, name, manager) {
    let loader = new FileLoader(manager);
    return new Promise(resolve => {
      loader.setPath(path);
      loader.load(name, function (data) {
        resolve(data);
      });
    })
  },
  close() {
    if (this.db)
      this.db.close();
  }
}

export {SourceCacheModelLoader}




