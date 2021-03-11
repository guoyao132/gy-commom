import {BaseRealLoader} from '../BaseRealLoader'
import {FBXLoader as Loader} from "three/examples/jsm/loaders/FBXLoader"

export class FBXLoader extends BaseRealLoader {
  static LOADER_REG = /^(.+)\.(fbx)$/i;

  constructor(path, name, type, version) {
    super(path, name, type, version);
    let result = FBXLoader.LOADER_REG.exec(name);
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

      new Loader().load(_self.getAbsolutePath(), function (object) {
        let params = {
          data: object,
          source: object,
          path: _self.path,
          name: _self.name,
          type: _self.realType
        }
        resolve(params);
      }, function () {
      }, onError)
    })
  }

}
