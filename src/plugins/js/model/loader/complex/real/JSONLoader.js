import {BaseRealLoader} from "../BaseRealLoader";
import {ObjectLoader} from "three/src/loaders/ObjectLoader"

export class JSONLoader extends BaseRealLoader {
  static LOADER_REG =/^(.+)\.(json)$/i;
    constructor(path, name, type, version) {
    super(path, name, type, version);
    let result = JSONLoader.LOADER_REG.exec(name);
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

      new ObjectLoader().load(self.getAbsolutePath(), function (obj) {
        let params = {
          data: obj,
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
