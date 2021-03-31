import {BaseRealLoader} from "../BaseRealLoader";
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
// import {OBJLoader2} from 'three/examples/jsm/loaders/ObjLoader2'
// import {MtlObjBridge} from "three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

export class ObjectLoader extends BaseRealLoader {
  static LOADER_REG = /^(.+)\.(obj|mtl)?$/i;

  constructor(path, name, type, version) {
    super(path, name, type, version);
    let result = ObjectLoader.LOADER_REG.exec(name);
    if (result) {
      this.realName = result[1];
      this.realType = result[2];
      if (!this.realType)
        this.realType = 'obj'
    }
  }

  load() {
    let self = this;
    let objPath = this.getAbsolutePath(this.realName + ".obj")
    let mtlPath = this.getAbsolutePath(this.realName + ".mtl")
    return new Promise((resolve, reject) => {
      function onError(err) {
        console.error(err)
        reject(err)
      }

      new MTLLoader()
        // 加载材质文件
        .load(mtlPath, function (materials) {
          // new OBJLoader2()
          //   .setModelName(objPath)
          //   .addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(materials), true)
          //   // 加载模型文件
          //   .load(objPath, function (object) {
          //     let params = {
          //       data: object,
          //       source: object,
          //       path: self.path,
          //       name: self.name,
          //       type: self.realType
          //     }
          //     resolve(params);
          //   }, function () {
          //   }, onError);
          //
          materials.preload();
          let loader= new OBJLoader()
          loader.setMaterials(materials)
          loader.load(objPath, function(object){
            object.name = objPath;
            resolve({
              data: object,
              source: object,
              path: self.path,
              name: self.name,
              type: self.realType,
            })
          }, function () {
          }, onError)

        }, function () {
        }, onError);

    })
  }
}
