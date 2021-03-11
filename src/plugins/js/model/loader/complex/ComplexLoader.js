import {RealLoaderCollection} from './real/RealLoaderCollection'
import {JSONLoader as DefaultLoader} from "./real/JSONLoader";

/**
 * 3d模型加载器，根据文件后缀名，使用不同的加载器
 */
export class ComplexLoader {
  constructor(path, name, type, version) {
    this.loader = null;
    for (let i = 0; i < RealLoaderCollection.length; i++) {
      let Loader = RealLoaderCollection[i];
      if (Loader.LOADER_REG && Loader.LOADER_REG.test(name)) {
        this.loader = new Loader(path, name, type, version);
        break;
      }
    }
    // 未找到对应的加载类，使用默认的加载类
    if (!this.loader) {
      this.loader = new DefaultLoader(path, name, type, version)
    }
  }

  getLoader() {
    return this.loader;
  }

  init() {
    return this.loader.init()
  }

  load() {
    return this.loader.load()
  }

  close() {
    return this.loader.close()
  }
}

