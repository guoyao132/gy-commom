import {BaseRealLoader} from "../BaseRealLoader";
import {ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader"

export class DAELoader extends BaseRealLoader {
  static LOADER_REG = /^(.+)\.(dae)$/i;

  constructor(path, name, type, version) {
    super(path, name, type, version);
    let result = DAELoader.LOADER_REG.exec(name);
    if (result) {
      this.realName = result[1];
      this.realType = result[2];
    }
  }
  load() {
    let self = this;
    return new Promise((resolve, reject) => {
      function onError(err) {
        console.error(err)
        reject(err)
      }

      new ColladaLoader().load(self.getAbsolutePath(), function (obj) {
        let params = {
          data: obj.scene,
          source: obj,
          path: self.path,
          name: self.name,
          type: self.realType
        }
        resolve(params);
      }, function () {

      }, onError)

    })
  }
}
