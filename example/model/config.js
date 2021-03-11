let basePath = "/model/kaibizhan/CQK001/";
let config = {
  name: "广场开闭站",
  code: "CQK001",
  files: {
    house: [
      {path: basePath, file: "bianyaqi01.obj"},
      // {path: basePath, file: "bianyaqi02.obj"},
      // {path: basePath, file: "bianyaqi03.obj"},
      // {path: basePath, file: "bianyaqi04.obj"},
    ]
  },
  scene: {
    "out": {
      type: ["house"],
      camera: {'position': {x: 5, y: 2, z: 4}, "target": {x: 2, y: 1.5, z: -2.5}},
      trans: []
    }
  },
  basePath: basePath,
  positions: [
    {position: {x: 11.491609109421, y: 3.506618710430642, z: 2.38139197719655}, name: 'biaoji__1'},
    {position: {x:3.7194725148591883, y: 2.2995713664531414, z: 2.931879644718893}, name: 'biaoji__2'},
    {position: {x: -3.281729588448309, y: 2.2995713664531414, z: 2.503184813244658}, name: 'biaoji__3'},
    {position: {x: -9.765937297315107, y: 3.0106515137900423, z: -3.904015041926548}, name: 'biaoji__4'}
  ],
}

module.exports = config;
