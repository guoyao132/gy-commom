import {BaseRealLoader} from "../BaseRealLoader";
import {GLTFLoader as Loader} from 'three/examples/jsm/loaders/GLTFLoader'

export class GLTFLoader extends BaseRealLoader {
  static LOADER_REG = /^(.+)\.(gltf|\.glb)$/i;

  constructor(path, name, type, version) {
    super(path, name, type, version);
    let result = GLTFLoader.LOADER_REG.exec(name);
    if (result) {
      this.realName = result[1];
      this.realType = result[2];
    }
  }

  load() {
    let _self = this;
    return new Promise((resolve, reject) => {
      function onError(err) {
        console.error(err)
        reject(err)
      }

      new Loader().load(_self.getAbsolutePath(),
        function (obj) {
          let params = {
            data: obj.scene,
            source: obj,
            path: _self.path,
            name: _self.name,
            type: _self.realType
          }
          resolve(params);
        }, function () {

        }, onError)
    });
  }
}
