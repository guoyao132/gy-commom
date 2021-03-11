let basePath = "/newmodel/black";
const faguangSpeed = 0.005;
const haiSpeed = 0.001;
let config = {
  name: "test",
  code: "test",
  files: {
    home: [
      {path: basePath, file: "zhongnanhai.obj",x:116.388052, y:39.916978, z:5, rotateY: Math.PI / 180 * -1, isOffsetSpeed: haiSpeed , objScale: {x: 0.95, y: 0.95, z: 0.95} },
      {path: basePath, file: "guoqi.obj",x:116.397618, y:39.906903, z:0},
      // {path: basePath, file: "huadeng_9_dianxiang.FBX",x:116.397918, y:39.906903, z:0, objScale: {x: 10, y: 10, z: 10}, isAnimation: 1},
      // {path: basePath, file: "biandianzhanguangquan02.FBX",x: 116.401062, y: 39.901143, z: 100, rotateX: Math.PI, objScale: {x: 5, y: 5, z: 5}, isAnimation: 1},
      {path: basePath, file: "yingxiongjinianbei.obj",x: 116.397713, y: 39.904601, z: 0},
      {path: basePath, file: "zhongguoqianbibowuguan.obj",x: 116.395053, y: 39.902379, z: 0},
      {path: basePath, file: "beijingshidianligongsi-qianmen.obj",x: 116.390054, y: 39.901286, z: 0},
      {path: basePath, file: 'jingshangongyuan.obj', x: 116.396743, y: 39.925847, z: 0, objScale: {x: 0.9, y: 0.9, z: 0.9}}
    ],
    faguang: [
      {path: basePath, file: "guojiadajuyuan.obj",x:116.389878, y:39.904883, z:0, isOffsetSpeed: faguangSpeed},

      // {path: basePath, file: "RMDHT.obj",x:116.393786, y:39.904989, z:0},
      {path: basePath, file: "renmindahuitang.obj",x:116.393786, y:39.904989, z:0},
      {path: basePath, file: "renmindahuitang-faguang.obj",x:116.393786, y:39.904989, z:0, isBloom: 0, isOffsetSpeed: faguangSpeed, emissive: true},
      {path: basePath, file: "maozhuxijiniantang.obj",x: 116.397815, y: 39.902517, z: 0},
      // {path: basePath, file: "maozhuxijiniantang-faguang.obj",x: 116.397815, y: 39.902517, z: 0, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "quanguorendajiguanbangonglou.obj",x:116.394043, y:39.901216, z:0, objScale: {x: 1.5, y: 1.5, z: 1.5}},
      {path: basePath, file: "quanguorendajiguanbangonglou-faguang.obj",x: 116.394043, y:39.901216, z: 0, objScale: {x: 1.5, y: 1.5, z: 1.5}},
      {path: basePath, file: "zhongguoguojiabowuguan.obj",x: 116.401554, y: 39.90521, z: 0},
      {path: basePath, file: "zhongguoguojiabowuguan-faguang.obj",x: 116.401554, y: 39.90521, z: 0, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "renmindahuitangbinguan.obj",x:116.392895, y:39.902567, z:0, objScale: {x: 1.1, y: 1.1, z: 1.1}},
      // {path: basePath, file: "renmindahuitangbinguan-faguang.obj",x:116.392895, y:39.902567, z:0, objScale: {x: 1.1, y: 1.1, z: 1.1}},

      {path: basePath, file: "guowuyuanjiguanshiwuguanlijufuwusi.obj",x: 116.380098, y: 39.921018, z: 0, rotateY: Math.PI / 180 * 182, objScale: {x: 0.8, y: 0.8, z: 0.8}},
      {path: basePath, file: "guowuyuanjiguanshiwuguanlijufuwusi-faguang.obj",x: 116.380058, y: 39.920658, z: 0, rotateY: Math.PI / 180 * 182, objScale: {x: 0.8, y: 0.8, z: 0.8}},
      {path: basePath, file: "guangdianzongju.obj",x: 116.354221, y: 39.905398, z: 0, rotateY: Math.PI / 180 * 182, objScale: {x: 1.2, y: 1.2, z: 1.2}},
      {path: basePath, file: "guangdianzongju-faguang.obj",x: 116.354221, y: 39.905398, z: 0, rotateY: Math.PI / 180 * 182, objScale: {x: 1.2, y: 1.2, z: 1.2}, isBloom: 0},
      {path: basePath, file: "guojiadianwanggongsi-xidan.obj",x: 116.377613, y: 39.906028, z: 0,  rotateY: 0, objScale: {x: 1.5, y: 1.5, z: 1.5}},
      // {path: basePath, file: "guojiadianwanggongsi-xidan-faguang.obj",x: 116.377213, y: 39.906228, z: 0,  rotateY: 0},
      {path: basePath, file: "quanguozhengxiejiguanfuwuju.obj",x: 116.363721, y: 39.920394, z: 0, rotateY: Math.PI / 180 * 90, objScale: {x: 0.6, y: 0.6, z: 0.6}},
      {path: basePath, file: "quanguozhengxiejiguanfuwuju-faguang.obj",x: 116.363721, y: 39.920394, z: 0, rotateY: Math.PI / 180 * 90, objScale: {x: 0.6, y: 0.6, z: 0.6}},
      {path: basePath, file: "beijingtielugonganju.obj",x: 116.410419, y: 39.907492, z: 0,},
      {path: basePath, file: "changanjulebu.obj",x: 116.409079, y: 39.907422, z: 0,},
      {path: basePath, file: "shengtaihuanjingbu.obj",x: 116.407818, y: 39.907059, z: 0,},
      {path: basePath, file: "guojiayiminguanliju.obj",x: 116.404846, y: 39.90506, z: 0},

    ],
    more: [
      {path: basePath, file: "huabiao.obj",objScale: {x: 2, y: 2, z: 2},
        list: [
          {x:116.396878, y:39.908494, z:0},
          {x:116.398017, y:39.908494, z:0},
        ],
      },
      {path: basePath, file: "zhengyangmen.obj",
        list: [
          {x: 116.39795, y: 39.899358, z: 0,},
          {x:116.397872, y: 39.900598, z: 0},
        ],
      },
    ],
    guiji: [
      {path: basePath, file: "xiaoren.obj",x:116.397618, y:39.906903, z:0, type: 'guiji', objScale: {x: 1, y: 1, z: 1}, rotateY: Math.PI / 180 * 90},
    ],
    biaoji: [
      {path: basePath, file: "biaoji.obj", objScale: {x: 0.4, y: 0.4, z: 0.4},
        hide: true,
        list: [
          {x:116.382899, y:39.91706, z:0, objName: 'biaoji-zhongxinxizhan'},
          {x:116.3924034, y:39.90547714, z:0, objName: 'biaoji-rendabeizhan'},
          {x:116.409641, y:39.900007, z:0, objName: 'biaoji-chongwenxi'},
          {x:116.3955012, y:39.90253894, z:0, objName: 'biaoji-guangchang'},
        ],
      },
    ],
    huadeng: [
      // {path: basePath, file: "guangchangludeng.obj",list: []},
      // {path: basePath, file: "ludeng.obj", x: 116.39771, y: 39.903073, z: 0},
      // {path: basePath, file: "ludeng-deng.obj", },
    ],
    gugong: [
      // {path: basePath, file: "jinshuiqiao.obj",x:116.397486, y:39.908227, z:-5, objScale: {x: 2, y: 2, z: 2}},
      {path: basePath, file: "gugong.obj", x:116.397173, y: 39.91561, z:  0, objScale: {x: 0.95, y: 0.95, z: 0.95}},
      {path: basePath, file: "gugonghuchenghe.obj", x:116.397173, y: 39.91561, z:  -2, objScale: {x: 0.95, y: 0.95, z: 0.95}, isOffsetSpeed: 0.001},
      {path: basePath, file: "laodongrenminwenhuagong.obj", x:116.397173, y: 39.91561, z: 0, objScale: {x: 0.95, y: 0.95, z: 0.95}},
      {path: basePath, file: "laodongrenminwenhuagong_dimian.obj", x:116.397173, y: 39.91561, z: -2, objScale: {x: 0.95, y: 0.95, z: 0.95}},
      {path: basePath, file: "zhongshangongyuan.obj", x:116.397173, y: 39.91561, z:  0, objScale: {x: 0.95, y: 0.95, z: 0.95}},
      {path: basePath, file: "zhongshangongyuan_dimian.obj", x:116.397173, y: 39.91561, z:  -2, objScale: {x: 0.95, y: 0.95, z: 0.95}},
      {path: basePath, file: "gugongdimian.obj", x:116.397173, y: 39.91561, z:  -2, objScale: {x: 0.95, y: 0.95, z: 0.95}},
      {path: basePath, file: "guanlitai.obj", x:116.397449, y: 39.909119, z: 0, rotateY: Math.PI / 180 * 362, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "tiananmen.obj", x:116.397449, y: 39.909119, z: 0, rotateY: Math.PI / 180 * 3, objScale: {x: 1, y: 1, z: 1}, isBloom: 0},
      // {path: basePath, file: "tiananmenkuang.obj", x:116.397449, y: 39.909119, z: 0, rotateY: Math.PI / 180 * 3, objScale: {x: 2.5, y: 2.5, z: 2.5}, isBloom: 0},
    ],
    erhuan: [
      // {path: basePath, file: "erhuan.obj", x:116.378591, y: 39.910351, z: 10, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: -0.01, isOffsetSpeedType: 'x'},
      {path: basePath, file: "luwangliuguang.obj", x:116.378591, y: 39.910351, z: 10, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: 0.05, isOffsetSpeedType: 'x'},
      {path: basePath, file: "dongxicheng.obj", x:116.378591, y: 39.910351, z: 10, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: 0.05, isOffsetSpeedType: 'x'},
      {path: basePath, file: "dongxicheng_bian.obj", x:116.378591, y: 39.910351, z: 10, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: 0.05, isOffsetSpeedType: 'x'},
      {path: basePath, file: "erhuan_bian.obj", x:116.378591, y: 39.910351, z: 10, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: 0.05, isOffsetSpeedType: 'x'},
    ],
    zhoubian: [
      // {path: basePath, file: "zhoubianjianzhu.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 6.2, y: 6.2, z: 6.2}},
      // {path: basePath, file: "zhoubianjianzhu.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},


      {path: basePath, file: "hexinjianzhudimian.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian_bian.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu01.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian01.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu02.obj", x: 116.397515, y: 39.906117, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian02.obj", x: 116.397515, y: 39.906117, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu03.obj", x: 116.397515, y: 39.906117, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian03.obj", x: 116.397515, y: 39.906117, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu04.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian04.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu05.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian05.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu06.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhudimian06.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},
      {path: basePath, file: "hexinjianzhu07.obj", x: 116.397515, y: 39.905517, z: 0, rotateY: Math.PI / 180 * -0, objScale: {x: 0.38, y: 0.3, z: 0.365}},

      {path: basePath, file: "zhoubian_gongyuan.obj", x:116.378591, y: 39.910351, z: 10, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "zhoubian_he.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: haiSpeed},
      {path: basePath, file: "zhoubian_he02.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}, isOffsetSpeed: haiSpeed},
      {path: basePath, file: "waiweijianzhukuai01.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai02.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai03.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai04.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai05.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai06.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai07.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai08.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai09.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai010.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai011.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai012.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai013.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai014.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai015.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},

      {path: basePath, file: "waiweijianzhukuai016.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai017.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai018.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai019.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai020.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai021.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai022.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai023.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai024.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai025.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai026.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai027.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai028.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai029.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai030.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai031.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai032.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "waiweijianzhukuai033.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      {path: basePath, file: "gongyuan02.obj", x:116.378591, y: 39.910351, z: 20, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},
      // {path: basePath, file: "zhoubian_jianzhudiji.obj", x:116.378591, y: 39.910351, z: 0, rotateY: 0, objScale: {x: 1, y: 1, z: 1}},






      {path: basePath, file: "E001.obj", x:116.405391, y: 39.915201, z: 0, rotateY: Math.PI / 180 * 361, objScale: {x: 1.4, y: 1.4, z: 1.4}},
      // {path: basePath, file: "E002.obj", x:116.417124, y: 39.915425, z: 0, objScale: {x: 1.4, y: 1.4, z: 1.4}},
      // {path: basePath, file: "E003.obj", x:116.40424, y: 39.904059, z: 0, objScale: {x: 0.8, y: 0.8, z: 0.8}, rotateY: Math.PI / 180 * -2},
      // {path: basePath, file: "E004.obj", x:116.4126, y: 39.904443, z: 0, objScale: {x: 0.9, y: 0.9, z: 0.9}},
      // {path: basePath, file: "W001.obj", x:116.388113, y: 39.911691, z: 0, rotateY: Math.PI / 180 * 359, objScale: {x: 0.88, y: 0.88, z: 0.88}},
      // {path: basePath, file: "W002.obj", x:116.380394, y: 39.911286, z: 0, rotateY: Math.PI / 180 * 359, objScale: {x: 0.92, y: 0.92, z: 0.92}},
      // {path: basePath, file: "W003.obj", x:116.366017, y: 39.911552, z: 0, rotateY: Math.PI / 180 * 359, objScale: {x: 0.92, y: 0.92, z: 0.92}},
      // {path: basePath, file: "W004.obj", x:116.389346, y: 39.903747, z: 0, rotateY: Math.PI / 180 * 361, objScale: {x: 0.92, y: 0.92, z: 0.92}},
      // {path: basePath, file: "W005.obj", x:116.379846, y: 39.903447, z: 0, rotateY: Math.PI / 180 * 360, objScale: {x: 0.9, y: 0.9, z: 0.9}},
      // {path: basePath, file: "W006.obj", x:116.295876, y: 39.92067, z: 0, rotateY: Math.PI / 180 * 360, objScale: {x: 0.9, y: 0.9, z: 0.9}},
      // {path: basePath, file: "S001.obj", x:116.392771, y: 39.8970237, z: 0, rotateY: Math.PI / 180 * -1, objScale: {x: 1.3, y: 1.3, z: 1.3}},
      // {path: basePath, file: "o001.obj", x:116.345576, y: 39.91567, z: 0, rotateY: Math.PI / 180 * -1, objScale: {x: 1, y: 0.92, z: 0.82}},
      // {path: basePath, file: "ceshixiaokuai.obj", x:116.373342, y: 39.915984, z: 0, rotateY: Math.PI / 180 * 1, objScale: {x: 4.2, y: 4.2, z: 4.2}},
    ],
    kehu: [
      {path: basePath, file: "582YiTai.obj", x: 116.402538, y: 39.886947, z: 0, rotateY: Math.PI / 180 * 180, objScale: {x: 0.9, y: 0.9, z: 0.9}},
      {path: basePath, file: "582YiTai-FaGuang.obj", x: 116.402538, y: 39.886947, z: 0, rotateY: Math.PI / 180 * 180, objScale: {x: 0.9, y: 0.9, z: 0.9}, isOffsetSpeed: faguangSpeed,},
      {path: basePath, file: "801DanWei.obj", x: 116.364945, y: 39.912964, z: 0, objScale: {x: 2.5, y: 2.5, z: 2.5}},
      {path: basePath, file: "801DanWei-FaGuang.obj", x: 116.364945, y: 39.912964, z: 0, objScale: {x: 2.5, y: 2.5, z: 2.5}, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "919GongCheng.obj", x: 116.379147, y: 39.914906, z: 0},
      {path: basePath, file: "919GongCheng-FaGuang.obj", x: 116.379147, y: 39.914906, z: 0, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "beijingshirenminzhengfu.obj", x:116.408304, y: 39.905758, z: 0, objScale: {x: 0.8, y: 0.8, z: 0.8}},
      {path: basePath, file: "beijingshirenminzhengfu-faguang.obj", x:116.408304, y: 39.905758, z: 0, isOffsetSpeed: faguangSpeed, objScale: {x: 0.8, y: 0.8, z: 0.8}},
      {path: basePath, file: "beijingshiwei.obj", x:116.410354, y: 39.905939, z: 0, rotateY: Math.PI / 180 * 5},
      {path: basePath, file: "beijingshiwei-faguang.obj", x:116.410354, y: 39.905939, z: 0, rotateY: Math.PI / 180 * 5, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "ShiRenDaBanGongTing.obj", x: 116.423624, y: 39.917093, z: 0, objScale: {x: 1.5, y: 1.5, z: 1.5}},
      {path: basePath, file: "ShiRenDaBanGongTing-FaGuang.obj", x: 116.423624, y: 39.917093, z: 0, objScale: {x: 1.5, y: 1.5, z: 1.5}, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "ShiZhengXieBanGongLou.obj", x: 116.425043, y: 39.910519, z: 0, objScale: {x: 1.5, y: 1.5, z: 1.5}},
      {path: basePath, file: "ShiZhengXieBanGongLou-FaGuang.obj", x: 116.425043, y: 39.910519, z: 0, objScale: {x: 1.5, y: 1.5, z: 1.5}, isOffsetSpeed: faguangSpeed},
      {path: basePath, file: "XinHuaTongXunShe.obj", x: 116.371044, y: 39.900558, z: 0, objScale: {x: 2, y: 2, z: 2}},
      {path: basePath, file: "XinHuaTongXunShe-FaGuang.obj", x: 116.371044, y: 39.900558, z: 0, objScale: {x: 2, y: 2, z: 2}, isOffsetSpeed: faguangSpeed},
    ],
    station: [
      {path: basePath, file: "xiaokuai.obj",objScale: {x: 5, y: 2, z: 2},
      // {path: basePath, file: "dimianmingcheng.obj",objScale: {x: 5, y: 2, z: 2},
        list: [
          {x:116.3924034, y:39.90547714, z:120}, // 人大北开闭站
          {x:116.3931118, y:39.90415755, z:120}, // 人大南开闭站
          {x:116.37616945131006, y:39.91118450961134, z:120}, // 西单变电站
          {x:116.3912149542528, y:39.901733131136844, z:120}, // 前门变电站
          {x:116.41682306091472, y:39.899399157039234, z:120}, // 崇文门变电站
          {x:116.36372315645346, y:39.90131289893168, z:120}, // 长椿街变电站
          {x:116.4135378752268, y:39.910191566069855, z:120}, // 王府井变电站

          // {x:116.482447, y:39.906969, z:120}, // 西大望 真实描点数据
          // {x:116.432626, y:39.880092, z:120}, // 龙潭湖 真实描点数据
          {x:116.433324, y:39.907893, z:120}, // 西大望 修改后的假数据
          {x:116.420128, y:39.896057, z:120}, // 龙潭湖 修改后的假数据

          {x:116.3954238, y:39.90867174, z:120}, // 公前站
          {x:116.3999536277404, y:39.90873808348356, z:120}, // 文前站
          {x:116.396209035432, y:39.90696560097213, z:120}, // 旗西站
          {x:116.39899261403924, y:39.90699141965957, z:120}, // 旗东站
          {x:116.3955012, y:39.90248894, z:120}, // 广场站
          {x:116.40080130617757, y:39.90635152237815, z:120}, // 国博站
        ]
      }
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
    "stuffStructure": {
      type: ["home", 'huadeng', 'gugong', 'zhoubian', 'more', 'faguang', 'kehu', 'biaoji'],
      // type: [],
      camera: {x:116.39550791364454, y:39.910490913329575, z:0, range: 4436.882842018815,tilt: 33.046121484260354, heading: 2.1577581606670435},
      trans: []
    },
    "aboutCenter": {
      type: ["home", 'huadeng', 'gugong', 'zhoubian', 'more', 'faguang', 'kehu', 'guiji', 'erhuan'],
      // type: [],
      camera: {x:116.39550791364454, y:39.910490913329575, z:0, range: 20000,tilt: 33.046121484260354, heading: 2.1577581606670435},
      trans: []
    },
    "powerLine": {
      type: ["home", 'huadeng', 'gugong', 'zhoubian', 'more', 'faguang', 'kehu', "station"],
      camera: {x:116.387847309, y:39.90766462912, z:0, range: 3521,tilt: 62, heading: 0},
      // camera: {x:116.399992, y:39.908887, z:0, range: 5500,tilt: 75, heading: 0},
      trans: []
    }
  }
}

module.exports = config;
