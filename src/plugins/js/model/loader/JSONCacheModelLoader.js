// import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {MyMTLLoader} from './overwrite/MyMTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {ObjectLoader} from 'three'

/**
 * 将模型数据转换为json缓存到indexedDB
 * @param path 文件路径(同时也是数据库名)
 * @param name 文件名
 * @param type 文件格式
 * @param version 数据库版本
 * @constructor
 */
function JSONCacheModelLoader(path, name, type, version) {
  this.dbName = path;
  this.dbVersion = version;
  this.name = name;
  this.tableName = 'files';
  this.indexName = '_fileName';
  this.type = type;
  this.path = path;
}

JSONCacheModelLoader.prototype = {
  constructor: JSONCacheModelLoader,
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
      _self.getFileFromDB(_self.name + "." + _self.type).then(function (data) {
        let object = new ObjectLoader().parse(data)
        let params = {
          data: object,
          source: data,
          path: _self.path,
          name: _self.name,
          type: 'json'
        }
        resolve(params);
      }).catch(function () {
        if (_self.type === "obj" || _self.type === "OBJ") {
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
    });
  },
  loadGLTF: function () {
    let _self = this;
    return new Promise(resolve => {
      new GLTFLoader().setPath(_self.path).load(_self.name + "." + _self.type,
        function (obj) {
          _self.addFile2DB(_self.name + "." + _self.type, obj.scene.toJSON()).then(function () {
            console.log("入库成功");
          });
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
      new MyMTLLoader()
        .setPath(_self.path)
        // 加载材质文件
        .load(_self.name + ".mtl", function (materials) {
          materials.preload().then(function () {
            new OBJLoader()
              .setMaterials(materials)
              .setPath(_self.path)
              // 加载模型文件
              .load(_self.name + ".obj", function (object) {
                new Promise(resolve1 => {
                  let jStart = new Date().getTime();
                  let jsonData = object.toJSON();
                  let jEnd = new Date().getTime();
                  console.log("toJSON cost " + (jEnd - jStart) + "ms");
                  _self.addFile2DB(_self.name + ".obj", jsonData).then(function () {
                    let dEnd = new Date().getTime();
                    console.log("insert db success, cost " + (dEnd - jEnd) + "ms");
                    resolve1();
                  })
                }).then(function () {
                });
                let params = {
                  data: object,
                  source: object,
                  path: _self.path,
                  name: _self.name,
                  type: _self.type
                }
                resolve(params);
              }, function () {
              }, function (err) {
                console.error(err);
              });
          });
        });
    })
  },
  addFile2DB: function (name, data) {
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
        let _end = new Date().getTime();
        if (value) {
          console.log("get db data [" + name + "]  ,cost " + (_end - _start) + "ms");
          resolve(value);
        } else {
          console.log("get db data [" + name + "]  failed");
          reject();
        }
      };
      // transaction.oncomplete = function (event) {
      //
      // }
    })
  },
  close() {
    if (this.db)
      this.db.close();
  }
}

export {JSONCacheModelLoader}




