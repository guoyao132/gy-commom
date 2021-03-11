import path from 'path'

export class BaseRealLoader {

  constructor(path, name, type, version) {
    this.path = path;
    this.name = name;
    this.type = type;
    this.version = version;

    BaseRealLoader.LOADER_REG = null;
  }

  init() {
    return new Promise(resolve => resolve({}))
  }

  close() {
    return new Promise(resolve => resolve({}))
  }

  load() {
    return new Promise(resolve => resolve({}))
  }

  getAbsolutePath(name) {
    if (!name)
      name = this.name;
    return path.join(this.path, name)
  }
}



