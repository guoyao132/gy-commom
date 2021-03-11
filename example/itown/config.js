let basePath = "/newmodel/black";
const faguangSpeed = 0.005;
const haiSpeed = 0.001;
let config = {
  name: "test",
  code: "test",
  files: {
    home: [
      {
        path: basePath,
        file: "zhongnanhai.obj",
        x:116.388052,
        y:39.916978,
        z:5,
        rotateY: Math.PI / 180 * -1,
        isOffsetSpeed: haiSpeed ,
        objScale: {x: 0.95, y: 0.95, z: 0.95},
        emissive: true,
        isBloom: 0,
        hide: true,
        isOffsetSpeedType: 'x',
      },
      {path: basePath, file: "huabiao.obj",objScale: {x: 2, y: 2, z: 2},
        list: [
          {x:116.396878, y:39.908494, z:0},
          {x:116.398017, y:39.908494, z:0},
        ],
      },
    ],
  },
  objScale: {x: 1, y: 1, z: 1},
  scene: {
    "out": {
      type: ["home", 'huadeng', 'gugong', 'zhoubian', 'more', 'faguang', 'kehu', 'guiji'],
      // type: [],
      camera: {x:116.39550791364454, y:39.910490913329575, z:0, range: 4436.882842018815,tilt: 33.046121484260354, heading: 2.1577581606670435},
      trans: []
    },
  }
}

module.exports = config;
