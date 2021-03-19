import {get, post, ajaxFile, postFormdata, service, put, deleted} from '@/plugin/axios' // 系统设置接口文件
// import BASTURL from "@/api/URL_PROXY.js"

let BASTURL = (window.ipConfig && window.ipConfig.BASE_URL) || (process.env.NODE_ENV == "development" ? "" : process.env.VUE_APP_BASEURL + "")

let GUANGCHANG_API = {

  dropdownList: BASTURL + "", // 获取下拉
  //站室维护
  stationList: BASTURL + "/eledevice/stationInfo/queryStationByAll",
  // stationList: "/wu/stationInfo/queryStationByAll",
  stationInfo: BASTURL + "/eledevice/stationInfo/",
  queryStationByAll: BASTURL + "/eledevice/stationInfo/queryStationByAll", //获取上级电源列表
  stationInfoPage: BASTURL + "/eledevice/stationInfo/getPage",   //站室分页
  stationInfoEdit: BASTURL + "/eledevice/stationInfo/editDict",  //站室编辑
  stationInfoDelete: BASTURL + "/eledevice/stationInfo/delete",  //删除站室
  stationBatchImportF: BASTURL + "/eledevice/stationInfo/stationBatchImportF",    //站室导出
  stationExport: BASTURL + "/eledevice/stationInfo/stationExport",    //站室导出
  exportStationTemplate: BASTURL + "/eledevice/deviceApi/exportDefaultTemplate",    //站室导出
  deviceImport: BASTURL + "/eledevice/deviceApi/deviceImport",    //
  deviceExport: BASTURL + "/eledevice/deviceApi/deviceExport",    //
  deviceTypeTree: BASTURL + "/eledevice/deviceApi/deviceTypeTree", //模板树列表
  exportDeviceTemplate: BASTURL + "/eledevice/deviceApi/exportDeviceTemplate", //下载模本文件
  deviceCountTotal: BASTURL + "/eledevice/deviceApi/countTotal", //下载模本文件
  getParentStationInfo: BASTURL + "/eledevice/cableLineInfo/findCableLineInfoByStationCode", //  /eledevice/deviceDisconnSwitch/getParentStationInfo
  getStationSwtichByType: BASTURL + "/eledevice/deviceDisconnSwitch/getStationSwtichByType", //
  queryInitCheckInfo: BASTURL + "/eledevice/stationInitCheck/queryInitCheckInfo", //
  switchStationList: BASTURL + "/eledevice/stationInfo/switchStationList", //


  //站室编辑
  saveBatchQuexianInfo: BASTURL + "/eledevice/quexianInfo/saveBatchQuexianInfo", //
  findQuexianInfo: BASTURL + "/eledevice/quexianInfo/findQuexianInfo", //
  saveBatchYinhuanInfo: BASTURL + "/eledevice/yinhuanInfo/saveBatchYinhuanInfo", //
  findYinhuanInfo: BASTURL + "/eledevice/yinhuanInfo/findYinhuanInfo", //
  saveBatchGuzhangInfo: BASTURL + "/eledevice/guzhangInfo/saveBatch", //
  findGuzhangInfo: BASTURL + "/eledevice/guzhangInfo/getList", //
  saveBatchYuAnInfo: BASTURL + "/eledevice/stationReservePlans/saveBatch", //
  findYuAnInfo: BASTURL + "/eledevice/stationReservePlans/queryByStationCode", //
  saveBatchXianguiInfo: BASTURL + "/eledevice/stationXiangui/saveBatch", //
  findXianguiInfo: BASTURL + "/eledevice/stationXiangui/getList", //



  //点位管理
  loadYaoceYaoxinDianweiXiala :BASTURL + "/eledevice/yaoceYaoxinDianwei/loadYaoceYaoxinDianweiXiala",
  dianweiKaiguanList: BASTURL + '/eledevice/deviceDisconnSwitch/getPage',
  dianweiDaozhaList: BASTURL + '/eledevice/deviceDisconnSwitch/getPage',
  dianweiBianyaqiList: BASTURL + '/eledevice/deviceTransformer/getPage',
  dianweiMuxianList: BASTURL + '/eledevice/deviceMuxian/getPage',
  dianweiYipipei: BASTURL + '/eledevice/deviceYaoceYaoxinMap/loadDeviceYaoxinYaoceData',
  dianweiSave:BASTURL + '/eledevice/deviceYaoceYaoxinMap/bindDeviceYaoxinYaoce',
  dianweiDelete: BASTURL+'/eledevice/deviceYaoceYaoxinMap/delDeviceYaoceYaoxinMap',//点位绑定的删除
  dianweiWeiHuList : BASTURL + '/eledevice/yaoceYaoxinDianwei/loadYaoceYaoxinDianwei',//点位维护列表页
  dianweiWeiHuDelete: BASTURL + '/eledevice/yaoceYaoxinDianwei/delYaoceYaoxinDianwei',//点位维护删除页
  dianweiWeiHuDaoru: BASTURL + '/eledevice/yaoceYaoxinDianwei/importYaoceYaoxinDianwei',//点位维护导入
  dianweiWeiHuAdd: BASTURL + '/eledevice/yaoceYaoxinDianwei/addYaoceYaoxinDianwei',//点位维护新增接口

  //
  //设备导入记录
  importListPage: BASTURL + "/eledevice/deviceHandleLog/getPage",    //列表
  importListDelete: BASTURL + "/eledevice/deviceHandleLog/delByTblAndBatchNo",    //删除
  stationCheckLoadData:BASTURL +"/eledevice/deviceHandleLog/checkLoadData",//变电站设备导入，check数据
  stationUrl: BASTURL + "/wiringdiagram/stationInfo/loadHuadengZhaomingPrevious",



  jiexiantuPage: BASTURL + "/wiringdiagram/switchingRoomWiringDiagram/page",
  jiexiantuUrl: BASTURL + "/wiringdiagram/switchingRoomWiringDiagram/getRtSwRoWiDiByStaCodeOrId",
  deleteJiexiantuL: BASTURL + "/wiringdiagram/switchingRoomWiringDiagram",
  biaozhunkaApi: BASTURL + "/eledevice/partmentStandardContent", // 标准卡
  bujianApi: BASTURL + "/eledevice/devicePartment", // 部件
  equipmentUrl: BASTURL + "/eledevice", // 设备操作
  eledeviceUrl: BASTURL + "/eledevice", // 设备操作
  deviceImgSave: BASTURL + "/eledevice/deviceImg/saveImgList",
  deviceImgList: BASTURL + "/eledevice/deviceImg/getImgList",
  stationImgSave: BASTURL + "/eledevice/stationDeviceImg/batchSave",
  stationImgList: BASTURL + "/eledevice/stationDeviceImg/list",


  //站室改建记录
  stationBuildLog: BASTURL + "/eledevice/stationBuildLog/",
  //站室开关负荷
  stationSwitchWithLoad: BASTURL + "/eledevice/stationSwitchWithLoad/",


  //部件
  bujianApi2: BASTURL + "/ticket/parts", // 部件
  //部件标准项
  bjBiaoZhunXiang:  BASTURL + "/ticket/content/",
  getPartList:  BASTURL + "/ticket/parts/getPartList",
  cardInputType:  BASTURL + "/ticket/dict/cardInputType",
  biaoZhunXiangDownload: BASTURL + "/ticket/content/downloadTemplate", // 部件标准项下载
  biaoZhunXiangImport: BASTURL + "/ticket/content/import", // 部件标准项导入

  //工单类型
  workorderType:  BASTURL + "/ticket/workorderType/",
  workorderTypeContent:  BASTURL + "/ticket/workorderTypeContent/",
  partsList:  BASTURL + "/ticket/parts/list",
  contentList:  BASTURL + "/ticket/content/list",
  contentBzxByStation:  BASTURL + "/ticket/content/getStandardList",
  getStandardListIsTrue:  BASTURL + "/ticket/content/getStandardListIsTrue",





  //工单管理
  //计划
  workorderPlan:  BASTURL + "/ticket/workorderPlan/",
  //列表
  workorder:  BASTURL + "/ticket/workorder/",
  queryFlowActive:  BASTURL + "/ticket/activitiFlow/queryFlowActive",
  getByOrderNo:  BASTURL + "/ticket/workorder/getByOrderNo",
  postUploadOrderFile:BASTURL + "/ticket/workorder/uploadOrderFile",
  findFlowByActTaskId:BASTURL + "/ticket/activitiFlow/findFlowByActTaskId",


  //获取工单状态列表
  dictOrderType:  BASTURL + "/ticket/dict/orderType",
  dictStationType:  BASTURL + "/ticket/dict/stationType",
  workorderRecord: BASTURL + "/ticket/workorderRecord/listContent",
  workorderRecordImg: BASTURL + "/ticket/workorder/getRecordImgByOrderNo",
  orderHis: BASTURL + "/ticket/workorderProcessHistory/getByOrderNo",
  orderHisImg: BASTURL + "/ticket/workorderProcessHistory/getByOrderNoWithImg",
  orderGuidang: BASTURL + "/ticket/workorder/evaluateAdnFile",
  orderHistoryTime: BASTURL + "/ticket/workorderProcessHistory/getOrderHistoryTime",
  getLocationByOrderNo: BASTURL + "/ticket/workorderLocation/getLocationByOrderNo",
  orderLocation: BASTURL + "/ticket/workorderLocation/getLocationByOrderNo",
  getWeishengDevByOrderNo: BASTURL + "/ticket/WeishengMcu/getWeishengDevByOrderNo",

  // 周期计划
  loadWorkorderCycle:  BASTURL + "/ticket/workorderCycle/loadWorkorderCycle",
  listTaskType:  BASTURL + "/ticket/workorderType/listTaskType",
  cardTypeList:  BASTURL + "/ticket/workorderType/list",
  saveWorkorderCycle:  BASTURL + "/ticket/workorderCycle/saveWorkorderCycle",
  stationByCycleId:  BASTURL + "/ticket/workorderCycle/getStationByCycleId",
  delWorkorderCycle:  BASTURL + "/ticket/workorderCycle/delWorkorderCycle",

  // 政治保电
  loadBaodianTask:  BASTURL + "/ticket/baodianTask/loadBaodianTask",
  loadBaodianTaskAll:  BASTURL + "/ticket/baodianTask/loadBaodianTaskList",
  saveBaodianTask:  BASTURL + "/ticket/baodianTask/saveBaodianTask",
  deleteBaodianTask:  BASTURL + "/ticket/baodianTask/deleteBaodianTask",
  loadBaodianTaskById:  BASTURL + "/ticket/baodianTask/loadBaodianTaskById",
  findCustomerByStationCode:  BASTURL + '/ticket/baodianTaskStation/findCustomerByStationCode',

  // 小微曲线xiaowei
  queryCurrentData: BASTURL + '/tdengine/taosdb/queryCurrentData',
  lineDownData: BASTURL + '/tdengine/taosdb/list',
  querylineClient: BASTURL + '/tdengine/taosdb/queryClient',


  //库房信息
  stockInfo: BASTURL + "/ticket/stockInfo/",
  // 库房
  stockOut: BASTURL + "/ticket/stockOut", // 出库
  stockIn: BASTURL + "/ticket/stockIn", // 入库
  stockObjects: BASTURL + "/ticket/stockObjects", // 库存管理
  stockCheck: BASTURL + "/ticket/stockCheckController", // 检查记录
  stockObjectsStatistics: BASTURL + "/ticket/StockObjectsStatistics/", // 统计

  //仪器仪表
  yqybIn: BASTURL + "/ticket/instrumentIn", //仪器仪表入库
  yqybOut: BASTURL + "/ticket/instrumentOut", //一起仪表出库
  yqybObjs: BASTURL + "/ticket/instrumentObjects", //仪器仪表台账


  //值班计划

  zbjh: BASTURL + "/ticket/beondutyPlan/",
  zbjhGroup: BASTURL + "/ticket/attendanceOfficeGroup/getGroup",
  attendancePlan: BASTURL + "/ticket/attendancePlan/",
  exportAttendance: BASTURL + "/ticket/attendancePlanExport/exportAttendance",


  //个人履历
  grllInfo: BASTURL + "/ticket/libPersonInfo/getCurrentUserInfo",
  isManager: BASTURL + "/ticket/libPersonInfo/isManager",
  grllInfoId: BASTURL + "/ticket/libPersonInfo/get",
  grllDaochu: BASTURL + "/ticket/libPersonInfo/exportList",
  grllDaochugr: BASTURL + "/ticket/libPersonInfo/exports",
  grllDaochuXiang: BASTURL + "/ticket/libPersonInfo/getExportPersonField",
  grllPage: BASTURL + "/ticket/libPersonInfo/page",
  addGrllInfo: BASTURL + "/ticket/libPersonInfo",
  personFamily: BASTURL + "/ticket/libPersonFamily",
  personSchool: BASTURL + "/ticket/libPersonSchool",
  personWork: BASTURL + "/ticket/libPersonWork",
  personMeeting: BASTURL + "/ticket/personMeeting",
  grllSq: BASTURL + "/ticket/libPersonInfoAuth",
  grllSqPage: BASTURL + "/ticket/libPersonInfoAuth/page",
  grllSqShenhe: BASTURL + "/ticket/libPersonInfoAuth/auth",
  buchongxinxi: BASTURL + "/ticket/libPersonExtendField",

  //交接班记录
  jiaojiebanPage: BASTURL + "/ticket/shiftRecord/getPage",
  jiaojiebanDetail: BASTURL + "/ticket/shiftRecord/getShiftDetails",
  getShiftInfo: BASTURL + "/ticket/shiftRecord/getShiftInfo",

  //掌纹
  quyu: BASTURL + "/zhangwen/installationArea/",
  zhangwenDevice: BASTURL + "/zhangwen/zhangwenDevice/",
  zhangwenji: BASTURL + "/zhangwen/zhangwen/",

  //缺陷等级
  workorderFault: BASTURL + "/ticket/workorderFault/",
  workorderFaultImg: BASTURL + "/ticket/workorderFaultImg/",


  //锁具
  lockInfo: BASTURL + "/ticket/lockInfo/",
  lockLog: BASTURL + "/ticket/lockLog/",
  lockAuth: BASTURL + "/ticket/lockAuth/",
  addAuthUser: BASTURL + "/ticket/lockAuthUser/addAuthUser",
  lockAuthStation: BASTURL + "/ticket/lockAuthStation/",
  lockAuthDevice: BASTURL + "/ticket/lockAuthDevice/",

  // 电缆
  dianlanUrl: BASTURL + "/eledevice/cableLineInfo",

  //工井
  FindAllCableLineInfo: BASTURL + "/eledevice/cableLineInfo/findAllCableLineInfo",  //工井下拉路线
  gongjingListPage : BASTURL + "/eledevice/cableGongjing/GongjingPage",  //工井列表
  saveGongJingEdit: BASTURL + "/eledevice/cableGongjing/edit",
  saveGongJingAdd: BASTURL + "/eledevice/cableGongjing/add",
  deleteGongJing: BASTURL + "/eledevice/cableGongjing/delete",
  gongJingPosition: BASTURL + "/eledevice/cableLineInfo/findNeighPosition",
  // GET
  // 电缆接头
  getLoadLineInterfaceInfo: BASTURL + "/eledevice/cableLineInterface/loadLineInterfaceInfo", //分页查询电缆接头信息
  deleteDianlanjietou : BASTURL +"/eledevice/cableLineInterface/delLineInterfaceInfo",//删除线路接头关系
  saveDianlanjittou:  BASTURL +"/eledevice/cableLineInterface/editLineInterfaceInfo",//编辑线路接头信息
  addLineInterfaceInfo:  BASTURL +"/eledevice/cableLineInterface/addLineInterfaceInfo",//编辑线路接头信息

  //字典表
  getDictListByType: BASTURL + "/eledevice/deviceApi/getDictListByType",

  // 定值单
  dingzhidan4: BASTURL + "/eledevice/stationForm04kv",
  dingzhidan10: BASTURL + "/eledevice/stationForm10kv",
  DZDstationList: BASTURL + '/ticket/lockAuthStation/findStation',

  // 客户
  customApi: BASTURL + '/eledevice/customerInfo',
  customVip: BASTURL + '/rbac/sys/user/findAllUser',
  groupInfo: BASTURL + '/rbac/sys/user/userGroupInfo',
  companyGroup: BASTURL + '/daping/dPSysRbac/userGroupInfo',
  biandianzhan: BASTURL + '/eledevice/stationInfo/findAllBiandianzhan',
  peidianshi: BASTURL + '/eledevice/stationInfo/findAllkaibizhanzhanAndPeidianshi',

  //首页大屏改动接口
  stationSYUrl: BASTURL + "/daping/wiringdiagram/listQuery",
  lineSYInfo:BASTURL + '/daping/eledevice/loadLineCoordinateForDp',
  safeDaysInfo:BASTURL + '/daping/eledevice/getSafeDays',
  getSYStationCountForIndex: BASTURL + '/daping/eledevice/getStationCountForIndex',

  //home
  kehuNum: BASTURL + '/daping/eledevice/countCustomerLevelForDp',
  countAbnormal: BASTURL + '/daping/eledevice/countAbnormalNumForDp',
  eledevice: BASTURL + '/daping/eledevice/',
  // beondutyPlan: BASTURL + '/daping/ticket/loadBeondutyPlanForDp',
  beondutyPlan: BASTURL + '/daping/ticket/loadPlanForDp',
  lineInfo: BASTURL + '/eledevice/cableLineInfo/loadLineCoordinateForDp',
  indexWorkorder: BASTURL + '/daping/ticket/indexWorkorder',
  findOrderByOfficeId: BASTURL + '/daping/ticket/findOrderByOfficeId',
  gongjingList: BASTURL + '/daping/eledevice/queryList',
  gongjingCount: BASTURL + '/daping/eledevice/queryCount',
  stationRedInScheduleList: BASTURL + '/eledevice/switch/getStationRedInScheduleList',
  stationRedOutScheduleList: BASTURL + '/eledevice/switch/getStationRedOutScheduleList',
  loadChangbeiAndPeidianxiangInfo: BASTURL + '/daping/eledevice/loadChangbeiAndPeidianxiangInfo',
  loadCustomerAndLineInfo: BASTURL + '/daping/eledevice/loadCustomerAndLineInfo',
  listCableLineInfo: BASTURL + '/daping/eledevice/listCableLineInfo',
  loadZzbdOrderOfToday: BASTURL + '/daping/user/loadZzbdOrderOfToday',
  loadCustomerDetail: BASTURL + '/daping/user/loadCustomerDetail',
  loadCustomerLine: BASTURL + '/daping/cableLineInfo/loadCableInfoByCustomerNo',
  loadCableInfoByStationCode: BASTURL + '/daping/cableLineInfo/loadCableInfoByStationCode',
  loadStationDetailInfo: BASTURL + '/daping/station/loadStationDetailInfo',
  loadHuadengPeidianxiangDetail: BASTURL + '/daping/station/loadHuadengPeidianxiangDetail',
  loadZhaomingPreviousInfo: BASTURL + '/daping/station/loadZhaomingPrevousInfo',
  dpCableLinesituation: BASTURL + '/daping/cableLineInfo/dpCableLinesituation',
  loadFuheOfFirstPage: BASTURL + '/daping/fuhe/loadFuheOfFirstPage',
  loadFuheQuxianOfStation: BASTURL + '/daping/fuhe/loadFuheQuxianOfStation',
  loadPeidianxiangCurrentFuhe: BASTURL + '/daping/fuhe/loadPeidianxiangCurrentFuhe',
  loadLinshijiedianOfPeidianxiang: BASTURL + '/daping/station/loadLinshijiedianOfPeidianxiang',
  loadByqFuzailv: BASTURL + '/daping/fuhe/loadByqFuzailv',
  loadFuheAndFuzailvOfCustomer: BASTURL + '/daping/fuhe/loadFuheAndFuzailvOfCustomer',
  loadStationInfoByCustomerNo: BASTURL + '/daping/station/loadStationInfoByCustomerNo',
  loadCurrentAndFuzailvOfLine: BASTURL + '/daping/fuhe/loadCurrentAndFuzailvOfLine',
  findStationNumByType: BASTURL + '/daping/eledevice/findStationNumByType',
  getDangList: BASTURL + '/daping/user/getDangList',
  loadCustomer1Info: BASTURL + '/daping/user/loadCustomer1NInfo',
  loadHuadengInfoOfCamera: BASTURL + '/daping/dpVideoCamera/loadHuadengInfoOfCamera',
  loadCableLineOfBaozhang: BASTURL + '/daping/cableLineInfo/loadCableLineOfBaozhang',
  loadStationOfBaozhang: BASTURL + '/daping/ticket/loadStationOfBaozhang',



  //工单
  loadOrderDetailOfToday: BASTURL + '/daping/ticket/loadOrderDetailOfToday',
  loadWorkOrderOfMonth: BASTURL + '/daping/ticket/loadWorkOrderOfMonth',
  loadWorkOrderOfTeam: BASTURL + '/daping/ticket/loadWorkOrderOfTeam',
  loadWorkOrderOfToday: BASTURL + '/daping/ticket/loadWorkOrderOfToday',
  loadTeamAndPersonNumInfo: BASTURL + '/daping/user/loadTeamAndPersonNumInfo',
  loadTodayOrderOfTeam: BASTURL + '/daping/ticket/loadTodayOrderOfTeam',
  loadWorkorderProcess: BASTURL + '/daping/ticket/loadWorkorderProcess',
  //智能拓扑
  loadJiexiantuByStationCode: BASTURL + '/daping/station/loadJiexiantuByStationCode',
  getCableLineInfoList: BASTURL + '/eledevice/switch/getCableLineInfoList',

  //mapchange
  rewriteLinePosition: BASTURL + '/eledevice/cableLineInfo/rewriteLinePosition',
  saveStationLoc: BASTURL + '/eledevice/stationInfo/saveStationLoc',
  // 遥测遥信
  deviceUrl: BASTURL + '/eledevice', // 遥测遥信
  jxtStation: BASTURL + '/eledevice/stationInfo/getWiringStationList', // 接线图站室
  dpUserApi: BASTURL + '/daping/user', // 大屏人员
  dpTicketApi: BASTURL + '/daping/ticket', // 大屏
  dpEledeviceApi: BASTURL + '/daping/eledevice', // 大屏设备
  userTitleByUserId: BASTURL + '/ticket/dict/userTitleByUserId', // 勋章
  dpAreaApi: BASTURL + '/daping/area/loadAreaCoordinateInfo', // 大屏区域
  zhanshigongdan: BASTURL + '/daping/station/loadStationInfoByTeamNames', // 根据运维班组获取站室和工单
  jxtDiaoduhao: BASTURL + '/wiringdiagram/deviceDisconnSwitch/queryMCUscheduleNumList', // 获取站室下调度号
  queryTypeCodeList: BASTURL + '/wiringdiagram/deviceDisconnSwitch/queryTypeCodeList', // 获取站室接线图类型
  getGaoYaData: BASTURL + '/daping/dpYaoceDataTemp/getGaoYaData', // 获取详情

  // 通道监测
  pageweishengMCU: BASTURL + '/eledevice/weishengMCU/pageweishengMCU', // 列表
  saveOrUpdate: BASTURL + '/eledevice/weishengMCU/saveOrUpdate', // 列表
  countYaoceDataByParam: BASTURL + '/eledevice/yaoceData/detailYaoceDataByParam', // 详情列表

  // 台区设备
  devDiaoduList: BASTURL + '/eledevice/weishengDevDiaoduhaoLuming/WeishengDevDiaoduhaoLumingpage', // 列表
  selectBystationCode: BASTURL + '/eledevice/weishengDevDiaoduhaoLuming/selectBystationCode', // 站室编码查询
  scheduleNumSelect: BASTURL + '/eledevice/weishengDevDiaoduhaoLuming/selectByscheduleNum', // 调度号查询

  saveDapingImage: BASTURL + '/eledevice/customerInfo/saveDapingImage', // 保存政治供电照片
  loadTicketOfZzbd: BASTURL + '/daping/ticket/loadTicketOfZzbd', // 获取工单
  loadAllFuheQuxian: BASTURL + '/daping/fuhe/loadAllFuheQuxian', // 负荷曲线
  statisticsBaodianTaskDays: BASTURL + '/daping/ticket/statisticsBaodianTaskDays', // 保电任务
  shiShiFuHeJianKong: BASTURL + '/daping/fuhe/shiShiFuHeJianKong', // 负荷
  findOrderByTaskId: BASTURL + '/ticket/baodianTask/findOrderByTaskId', // 宝典任务详情
  getOrgCameraTree: BASTURL + '/daping/video/op/getOrgCameraTree', // 获取视频树
  deviceTypeTreeNew: BASTURL + '/eledevice/deviceApi/deviceTypeTreeNew', // 站室分类

  videoCameraGetlistTree: BASTURL + '/video/stationInfo/getlistTree', // 左侧树
  videoCameraYiFenPeipage: BASTURL + '/video/videoCamera/yiFenPeipage', // 已分配 => stationCode
  videoCameraWeiFenPeipage: BASTURL + '/video/videoCamera/weiFenPeipage', // 未分配
  videoCameraBangding: BASTURL + '/video/videoCamera/bangding', // 绑定
  videoCameraJieBang: BASTURL + '/video/videoCamera/jieBang', // 解绑
  videoOperation: BASTURL + '/video/videoOperation/', // 解绑
  queryCameraList: BASTURL + '/video/videoCamera/queryCameraList', // 解绑
  huaDengList: BASTURL + '/video//stationInfo/huaDengList', // 解绑

  queryStationCurrentInfo: BASTURL + '/daping/dpYaoceDataTemp/queryStationCurrentInfo', // PPT 站室负荷列表

  // 保电任务新页面
  getWeatherByTime: BASTURL + '/daping/weather/getWeatherByTime', // 天气接口 ?nowTime=
  loadStationInfoOfBaodian: BASTURL + '/daping/ticket/loadStationInfoOfBaodian', // 站线情况
  loadBaodianDevice: BASTURL + '/daping/ticket/loadBaodianDevice', // 人民大会堂
  loadBaodianTextNum: BASTURL + '/daping/ticket/loadBaodianTextNum', // 保障资料实时查询
  loadFuheQuxianOfLianghui: BASTURL + '/daping/fuhe/loadFuheQuxianOfLianghui', // 地区负荷有功曲线
  loadBaozhangWorkorder: BASTURL + '/daping/ticket/loadBaozhangWorkorder', // 保障工单信息
  loadBaozhangTeam: BASTURL + '/daping/user/loadBaozhangTeam', // 保障团队接口
  loadPeidianLeader: BASTURL + '/daping/user/loadPeidianLeader', // 负责人和组长信息 ?teamName=
  load1NCustomerInfo: BASTURL + '/daping/user/load1NCustomerInfo', // 1+N 客户下拉接口
  loadDuizhangOf1N: BASTURL + '/daping/user/loadDuizhangOf1N', // 1+N 队长信息查询接口 ?customerName=
  loadUserInfoOf1N: BASTURL + '/daping/user/loadUserInfoOf1N', // (弹窗)1+N人员查询接口 ?customerName=
  loadPeidianBaozhangUser: BASTURL + '/daping/user/loadPeidianBaozhangUser', // (弹窗)查询组员信息 ?teamName=&groupName=

  //天气
  loadWeatherInfo: BASTURL + '/ticket/sysWeather/loadWeatherInfo', // 地区负荷有功曲线
  importWeatherInfo: BASTURL + '/ticket/sysWeather/importWeatherInfo', // 地区负荷有功曲线
  delBaodianWorkorder: BASTURL + '/ticket/baodianWorkorder/delBaodianWorkorder', // 地区负荷有功曲线
  //保障工单
  loadBaodianWorkorderInfo: BASTURL + '/ticket/baodianWorkorder/loadBaodianWorkorderInfo', // 地区负荷有功曲线
  importBaodianWorkorder: BASTURL + '/ticket/baodianWorkorder/importBaodianWorkorder', // 地区负荷有功曲线
  delWeatherInfo: BASTURL + '/ticket/sysWeather/delWeatherInfo', // 地区负荷有功曲线

  loadWaringMessageOfLianghui: BASTURL + '/daping/waring/loadWaringMessageOfLianghui', // 政协告警信息
}

export default {
  //智能拓扑
  loadJiexiantuByStationCode: data => get({url: GUANGCHANG_API.loadJiexiantuByStationCode, data}),
  getCableLineInfoList: data => get({url: GUANGCHANG_API.getCableLineInfoList, data}),
  //工单
  getLoadOrderDetailOfToday: data => get({url: GUANGCHANG_API.loadOrderDetailOfToday, data}),
  getLoadWorkOrderOfMonth: data => get({url: GUANGCHANG_API.loadWorkOrderOfMonth, data}),
  getLoadWorkOrderOfTeam: data => get({url: GUANGCHANG_API.loadWorkOrderOfTeam, data}),
  getLoadWorkOrderOfToday: data => get({url: GUANGCHANG_API.loadWorkOrderOfToday, data}),
  getLoadTeamAndPersonNumInfo: data => get({url: GUANGCHANG_API.loadTeamAndPersonNumInfo, data}),
  getLoadTodayOrderOfTeam: data => get({url: GUANGCHANG_API.loadTodayOrderOfTeam, data}),
  getLoadWorkorderProcess: data => get({url: GUANGCHANG_API.loadWorkorderProcess, data}),


  //mapchange
  postSaveStationLoc: data => post({url: GUANGCHANG_API.saveStationLoc, data}),
  postRewriteLinePosition: data => post({url: GUANGCHANG_API.rewriteLinePosition, data}),

  //大屏首页改接口
    //获取站室
    getSYStationList: data => get({url: GUANGCHANG_API.stationSYUrl, data}),
    getSYLineInfo: data => get({url: GUANGCHANG_API.lineSYInfo, data}),
    getSYStationCountForIndex: data => get({url: GUANGCHANG_API.getSYStationCountForIndex, data}),
    getSafeDays: data => get({url: GUANGCHANG_API.safeDaysInfo, data}),

  //home页
  getStationCountForIndex: data => get({url: GUANGCHANG_API.stationInfo + "getStationCountForIndex", data}),
  getKehuNum: data => get({url: GUANGCHANG_API.kehuNum, data}),
  getCountAbnormal: data => get({url: GUANGCHANG_API.countAbnormal, data}),
  findFaultByStation: data => get({url: GUANGCHANG_API.eledevice + 'findFaultByStation', data}),
  findStationNumByType: data => get({url: GUANGCHANG_API.eledevice + 'findStationNumByType', data}),
  getBeondutyPlan: data => get({url: GUANGCHANG_API.beondutyPlan, data}),
  getLineInfo: data => get({url: GUANGCHANG_API.lineInfo, data}),
  getIndexWorkorder: data => get({url: GUANGCHANG_API.indexWorkorder, data}),
  getFindOrderByOfficeId: data => get({url: GUANGCHANG_API.findOrderByOfficeId, data}),
  getGongjingList: data => get({url: GUANGCHANG_API.gongjingList, data}),
  getGongjingCount: data => get({url: GUANGCHANG_API.gongjingCount, data}),
  getStationRedInScheduleList: data => get({url: GUANGCHANG_API.stationRedInScheduleList, data}),
  getStationRedOutScheduleList: data => get({url: GUANGCHANG_API.stationRedOutScheduleList, data}),
  getLoadChangbeiAndPeidianxiangInfo: data => get({url: GUANGCHANG_API.loadChangbeiAndPeidianxiangInfo, data}),
  getLoadCustomerAndLineInfo: data => get({url: GUANGCHANG_API.loadCustomerAndLineInfo, data}),
  getListCableLineInfo: data => get({url: GUANGCHANG_API.listCableLineInfo, data}),
  getLoadZzbdOrderOfToday: data => get({url: GUANGCHANG_API.loadZzbdOrderOfToday, data}),
  getLoadCustomerDetail: data => get({url: GUANGCHANG_API.loadCustomerDetail, data}),
  getLoadCustomerLine: data => get({url: GUANGCHANG_API.loadCustomerLine, data}),
  getLoadStationDetailInfo: data => get({url: GUANGCHANG_API.loadStationDetailInfo, data}),
  getLoadHuadengPeidianxiangDetail: data => get({url: GUANGCHANG_API.loadHuadengPeidianxiangDetail, data}),
  getLoadZhaomingPreviousInfo: data => get({url: GUANGCHANG_API.loadZhaomingPreviousInfo, data}),
  getDpCableLinesituation: data => get({url: GUANGCHANG_API.dpCableLinesituation, data}),
  getLoadFuheOfFirstPage: data => get({url: GUANGCHANG_API.loadFuheOfFirstPage, data}),
  getLoadFuheQuxianOfStation: data => get({url: GUANGCHANG_API.loadFuheQuxianOfStation, data}),
  getLoadPeidianxiangCurrentFuhe: data => get({url: GUANGCHANG_API.loadPeidianxiangCurrentFuhe, data}),
  getLoadLinshijiedianOfPeidianxiang: data => get({url: GUANGCHANG_API.loadLinshijiedianOfPeidianxiang, data}),
  getLoadByqFuzailv: data => get({url: GUANGCHANG_API.loadByqFuzailv, data}),
  loadStationInfoByCustomerNo: data => get({url: GUANGCHANG_API.loadStationInfoByCustomerNo, data}),
  getLoadFuheAndFuzailvOfCustomer: data => get({url: GUANGCHANG_API.loadFuheAndFuzailvOfCustomer, data}),
  getLoadCurrentAndFuzailvOfLine: data => get({url: GUANGCHANG_API.loadCurrentAndFuzailvOfLine, data}),
  getFindStationNumByType: data => get({url: GUANGCHANG_API.findStationNumByType, data}),

  getDropdownList: ({url, data}) => get({url: GUANGCHANG_API.dropdownList + url, data}), // 获取下拉列表数据
  getFileMuban: ({url, data}) => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.dropdownList + url,
    data,
  }),
  postImportFile: ({url, data}) => post({url: GUANGCHANG_API.dropdownList + url, data}),

  getDictListByType: data => get({url: GUANGCHANG_API.getDictListByType, data}),

  //变电站导入的数据检查
  checkoutDateStation: data =>get({url:GUANGCHANG_API.stationCheckLoadData,data}),

  // 获站室列表
  getStationLists: data => get({url: GUANGCHANG_API.stationList, data}),

  //工井管理

  getFindAllCableLineInfo: data => get({url: GUANGCHANG_API.FindAllCableLineInfo, data}),//路线下拉
  getGongjingListPage :data => get({url: GUANGCHANG_API.gongjingListPage, data}),//工井列表
  saveGongJingEdit: data => post({url: GUANGCHANG_API.saveGongJingEdit, data}),// 编辑保存
  saveGongJingAdd: data => post({url: GUANGCHANG_API.saveGongJingAdd, data}),// 编辑保存
  deleteGongJing:data => get({url: GUANGCHANG_API.deleteGongJing, data}),//删除工井列表
  gongJingPosition:data => get({url: GUANGCHANG_API.gongJingPosition, data}),//获取工井坐标
  // deleteGongJing

  //电缆接头
  getDianLanJieTou: data =>get({url: GUANGCHANG_API.getLoadLineInterfaceInfo, data}),//获取电缆接头列表
  deleteDianLanJieTou: data =>get({url: GUANGCHANG_API.deleteDianlanjietou, data}),//删除电缆接头
  saveDianlanjittou:data =>post({url: GUANGCHANG_API.saveDianlanjittou, data}),//编辑保存
  addLineInterfaceInfo:data =>post({url: GUANGCHANG_API.addLineInterfaceInfo, data}),//编辑保存
  //获取上级电源列表

  getStationInfoPage: data => get({url: GUANGCHANG_API.stationInfoPage, data}),
  addStationInfo: data => post({url: GUANGCHANG_API.stationInfoEdit, data}),
  queryInitCheckInfo: data => get({url: GUANGCHANG_API.queryInitCheckInfo, data}),
  updateStationInfo: data => post({url: GUANGCHANG_API.stationInfoEdit, data}),
  deletedStationInfo: data => get({url: GUANGCHANG_API.stationInfoDelete, data}),
  getStationInfoListSjdy: data => get({url: GUANGCHANG_API.queryStationByAll, data}),
  getDeviceTypeTree: data => get({url: GUANGCHANG_API.deviceTypeTree, data}),
  getDeviceCountTotal: data => get({url: GUANGCHANG_API.deviceCountTotal, data}),
  getParentStationInfo: data => get({url: GUANGCHANG_API.getParentStationInfo, data}),
  getStationSwtichByType: data => get({url: GUANGCHANG_API.getStationSwtichByType, data}),
  getDeviceExport: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.deviceExport,
    data
  }),
  getExportDeviceTemplate: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.exportDeviceTemplate,
    data
  }),

  //点位管理
  getDianweiXialaLeftListInfo : data => get({url: GUANGCHANG_API.loadYaoceYaoxinDianweiXiala, data}),
  getDianweiKaiguanList: data => get({url: GUANGCHANG_API.dianweiKaiguanList, data}),
  getDianweiDaozhaList: data => get({url: GUANGCHANG_API.dianweiDaozhaList, data}),
  getDianweiBianyaqiList: data => get({url: GUANGCHANG_API.dianweiBianyaqiList, data}),
  getDianweiMuxianList: data => get({url: GUANGCHANG_API.dianweiMuxianList, data}),
  getDianweiYipipei: data => get({url: GUANGCHANG_API.dianweiYipipei, data}),
  postDianweiSave :  data => post({url: GUANGCHANG_API.dianweiSave, data}),
  postDianweiDelete :  data => postFormdata({url: GUANGCHANG_API.dianweiDelete, data}),
  getDianweiWeiHuList :  data => get({url: GUANGCHANG_API.dianweiWeiHuList, data}),
  postDianweiWeiHuDelete :  data => postFormdata({url: GUANGCHANG_API.dianweiWeiHuDelete, data}),
  postDianweiWeiHuDaoru :  data => post({url: GUANGCHANG_API.dianweiWeiHuDaoru, data}),
  postDianweiWeiHuAdd:  data => post({url: GUANGCHANG_API.dianweiWeiHuAdd, data}),
  // dianweiWeiHuAdd


  //站室编辑
  postSaveBatchQuexianInfo: data => post({url: GUANGCHANG_API.saveBatchQuexianInfo, data}),
  geFfindQuexianInfo: data => get({url: GUANGCHANG_API.findQuexianInfo, data}),
  postSaveBatchYinhuanInfo: data => post({url: GUANGCHANG_API.saveBatchYinhuanInfo, data}),
  geFfindYinhuanInfo: data => get({url: GUANGCHANG_API.findYinhuanInfo, data}),
  postsaveBatchGuzhangInfo: data => post({url: GUANGCHANG_API.saveBatchGuzhangInfo, data}),
  getFindGuzhangInfo: data => get({url: GUANGCHANG_API.findGuzhangInfo, data}),
  postsaveBatchYuAnInfo: data => post({url: GUANGCHANG_API.saveBatchYuAnInfo, data}),
  getFindYuAnInfo: data => get({url: GUANGCHANG_API.findYuAnInfo, data}),
  postSaveBatchXianguiInfo: data => post({url: GUANGCHANG_API.saveBatchXianguiInfo, data}),
  getFindXianguiInfo: data => get({url: GUANGCHANG_API.findXianguiInfo, data}),
  //华灯照明
  stationInfoHdzmPage: data => get({url: GUANGCHANG_API.stationInfo + "loadHuadengZhaomingInfo", data}),
  stationInfoHdzmDetail: data => get({url: GUANGCHANG_API.stationInfo + "huadengZhaomingDetail", data}),
  stationInfoHdzmEdit: data => post({url: GUANGCHANG_API.stationInfo + "saveHuadengZhaomingInfo", data}),
  stationInfoHdzmDel: data => postFormdata({url: GUANGCHANG_API.stationInfo + "delHuadengZhaoming", data}),
  stationInfoHdzmDianyuan: data => get({url: GUANGCHANG_API.stationInfo + "loadZhaomingDianyuanInfo", data}),
  stationInfoHdPdxPage: data => get({url: GUANGCHANG_API.stationInfo + "loadHuadengPeidianxiang", data}),
  stationInfoHdPdxEdit: data => post({url: GUANGCHANG_API.stationInfo + "saveHuadengPeidianxiang", data}),
  stationInfoHdPdxExprot: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.stationInfo + 'exportHuadengPeidianxiang',
    data
  }),
  stationInfoHdCbPage: data => get({url: GUANGCHANG_API.stationInfo + "loadHuadengChangbei", data}),
  stationInfoHdCbEdit: data => post({url: GUANGCHANG_API.stationInfo + "saveHuadengChangbei", data}),
  stationInfoHdCbDetails: data => get({url: GUANGCHANG_API.stationInfo + "detailHuadengChangbei", data}),
  stationInfoHdCbExprot: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.stationInfo + 'exportHuadengChangbei',
    data
  }),

  getHdzmList: data => get({url: GUANGCHANG_API.stationInfo + "loadHuadengZhaomingXiala", data}),
  getHdcbList: data => get({url: GUANGCHANG_API.stationInfo + "loadHuadengChangbeiXiala", data}),

  stationInfoHdzmDaochu: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.stationInfo + 'exportHuadengZhaomingFile',
    data
  }),
  stationInfoHdzmDianyunDaochu: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.stationInfo + 'exportZhaomingDianyuanFile',
    data
  }),


  postDeviceImport: data => post({url: GUANGCHANG_API.deviceImport, data}),
  stationBatchImportF: data => post({url: GUANGCHANG_API.stationBatchImportF, data}),
  getStationExport: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.stationExport,
    data
  }),
  exportStationTemplate: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    url: GUANGCHANG_API.exportStationTemplate,
    data
  }),
  getImportListPage: data => get({url: GUANGCHANG_API.importListPage, data}),
  getImportListDelete: data => get({url: GUANGCHANG_API.importListDelete, data}),


  postOrderDaochu: (url ,data)=> ajaxFile({
    method: 'get',
    contenType: 'application/x-www-form-urlencoded',
    url: BASTURL + '/ticket/statistics/getCardFile/'+url,
    data
  }),// 工单导出






  // 获取站室
  getStationList: data => get({url: GUANGCHANG_API.stationUrl, data}),
  // 接线图列表分页
  getJiexiantuPage: data => get({url: GUANGCHANG_API.jiexiantuPage, data}),
  // 根据站室获取接线图列表
  getJiexiantuList: data => get({url: GUANGCHANG_API.jiexiantuUrl, data}),
  // 删除接线图
  deleteJiexiantuL: id => get({url: `${GUANGCHANG_API.deleteJiexiantuL}/${id}`}),
  // 设备维护
  addOrEditEquipmengt: (url, data) => post({url: GUANGCHANG_API.equipmentUrl + url, data}), // 新增编辑
  getDevicePage: (url, data) => get({url: GUANGCHANG_API.eledeviceUrl + url, data}), // 新增编辑
  deleteEquipment: (url, data) => get({url: GUANGCHANG_API.equipmentUrl + url, data}), // 删除
  postDeviceImgSave: data => post({url: GUANGCHANG_API.deviceImgSave, data}), // 删除
  postDeviceImgList: data => post({url: GUANGCHANG_API.deviceImgList, data}), // 删除
  postStationImgSave: data => post({url: GUANGCHANG_API.stationImgSave, data}), // 删除
  getStationImgList: data => get({url: GUANGCHANG_API.stationImgList, data}), // 删除

  //站室改建记录
  // stationBuildLog
  stationBuildLogPage: (data) => get({url: GUANGCHANG_API.stationBuildLog + 'page', data}), // 新增编辑
  stationBuildLogList: (data) => get({url: GUANGCHANG_API.stationBuildLog + 'list', data}), // 新增编辑
  stationBuildLogDel: (data) => get({url: GUANGCHANG_API.stationBuildLog + 'delete', data}), // 新增编辑
  stationBuildLogAdd: (data) => post({url: GUANGCHANG_API.stationBuildLog + 'addOrUpdate', data}), // 新增编辑
  stationBuildLogBatchAdd: (data) => post({url: GUANGCHANG_API.stationBuildLog + 'batchAdd', data}),
  stationBuildLogMuban: GUANGCHANG_API.stationBuildLog + 'downloadTemplate',
  stationBuildLogImport: GUANGCHANG_API.stationBuildLog + 'import',
  stationBuildLogExport: data => ajaxFile({
    method: 'post',
    contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.stationBuildLog + 'exportExcel',
    data
  }),// 工单导出
  //站室开关负荷
  stationSwitchWithLoadList: (data) => get({url: GUANGCHANG_API.stationSwitchWithLoad + 'listbystationCode', data}), // 新增编辑
  stationSwitchWithLoadBatchAdd: (data) => post({url: GUANGCHANG_API.stationSwitchWithLoad + 'batchAdd', data}), // 新增编辑
  stationSwitchWithLoadPage: (data) => get({url: GUANGCHANG_API.stationSwitchWithLoad + 'page', data}), // 新增编辑
  stationSwitchWithLoadDel: (data) => get({url: GUANGCHANG_API.stationSwitchWithLoad + 'delete', data}), // 新增编辑
  stationSwitchWithLoadAdd: (data) => post({url: GUANGCHANG_API.stationSwitchWithLoad + 'addOrUpdate', data}), // 新增编辑
  stationSwitchWithLoadMuban: GUANGCHANG_API.stationSwitchWithLoad + 'downloadTemplate',
  stationSwitchWithLoadImport: GUANGCHANG_API.stationSwitchWithLoad + 'import',
  stationSwitchWithLoadExport: data => ajaxFile({
    method: 'post',
    contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.stationSwitchWithLoad + 'exportExcel',
    data
  }),// 工单导出
  // 接线图列表分页

  // 部件、标准卡
  getDeviceList: data => get({url: GUANGCHANG_API.bujianApi + '/loadDeviceInfo', data}), // 获取设备列表
  addOrEditDevicePartment: data => post({url: GUANGCHANG_API.bujianApi2 + '/addOrUpdate', data}), // 添加编辑部件
  deleteDevicePartment: id => get({url: GUANGCHANG_API.bujianApi2 + '/delById?id=' + id}), // 删除部件
  getDevicePartmentPage: data => postFormdata({url: GUANGCHANG_API.bujianApi2 + '/page', data}), // 部件分页查询
  getDevicePartmentListById: data => get({url: GUANGCHANG_API.bujianApi + '/loadDevicePartmentInfo', data}), // 根据设备获取部件列表
  getBZKPage: data => get({url: GUANGCHANG_API.biaozhunkaApi + '/loadStandardContentPage', data}), // 标准卡分页查询
  addOrEditBZK: data => post({url: GUANGCHANG_API.biaozhunkaApi + '/addOrEditStandardContentInfo', data}), // 新增标准卡
  deleteBZK: id => post({url: GUANGCHANG_API.bujianApi + 'delStandardContentInfo?standardContentId=' + id}), // 删除标准卡
  getBZKInfo: data => get({url: GUANGCHANG_API.bujianApi + '/loadStandardContentDetail', data}), // 标准卡详情


  //部件标准项
  getBjBiaoZhunXiang: data => get({url: GUANGCHANG_API.bjBiaoZhunXiang + 'page', data}), // 部件标准项分页
  editSortNums: data => post({url: GUANGCHANG_API.bjBiaoZhunXiang + 'editSortNums', data}), // 部件标准项分页
  getPartList: data => post({url: GUANGCHANG_API.getPartList, data}), // 部件列表
  getCardInputType: data => get({url: GUANGCHANG_API.cardInputType, data}), // 部件列表
  postBjBiaoZhunXiangAdd: data => post({url: GUANGCHANG_API.bjBiaoZhunXiang + 'addOrUpdate', data}), // 部件标准项新增修改
  postBjBiaoZhunXiangDel: data => get({url: GUANGCHANG_API.bjBiaoZhunXiang + 'del', data}), // 部件标准项删除
  biaoZhunXiangDownload: GUANGCHANG_API.biaoZhunXiangDownload, // 部件标准项下载
  biaoZhunXiangImport: GUANGCHANG_API.biaoZhunXiangImport, // 部件标准项导入


  //工单类型
  getWorkorderType: data => get({url: GUANGCHANG_API.workorderType + 'page', data}), // 部件标准项分页
  postWorkorderTypeAdd: data => post({url: GUANGCHANG_API.workorderTypeContent + 'addTypeAndContent', data}), // 部件标准项新增修改
  addCardByStationType: data => post({url: GUANGCHANG_API.workorderTypeContent + 'addCardByStationType', data}), // 部件标准项新增修改
  getWorkorderTypeDel: data => get({url: GUANGCHANG_API.workorderType + 'del', data}), // 部件标准项删除
  getWorkorderTypeContent: data => get({url: GUANGCHANG_API.workorderTypeContent + 'list', data}), // 工单类型相关标准项列表
  postWorkorderTypeContentAdd: data => post({url: GUANGCHANG_API.workorderTypeContent + 'addContent', data}), // 工单类型添加标注项列表
  postWorkorderTypeContentDel: data => get({url: GUANGCHANG_API.workorderTypeContent + 'del', data}), // 工单类型添加标注项列表
  findDeviceByStation: data => get({url: GUANGCHANG_API.workorderTypeContent + 'findDeviceByStation', data}), // 工单类型添加标注项列表
  getPartsList: data => get({url: GUANGCHANG_API.partsList, data}), // 根据设备获取部件列表
  postContentList: data => post({url: GUANGCHANG_API.contentList, data}), // 根据部件获取标准项列表
  postContentBzxByStation: data => post({url: GUANGCHANG_API.contentBzxByStation, data}), // 根据部件获取标准项列表
  postStandardListIsTrue: data => post({url: GUANGCHANG_API.getStandardListIsTrue, data}), // 根据部件获取标准项列表

  //工单管理
  //下发工单
  getPlanPage: data => get({url: GUANGCHANG_API.workorderPlan + 'page', data}), //下发工单列表
  postPlanAdd: data => post({url: GUANGCHANG_API.workorderPlan + 'add', data}), //新增下发工单
  getTaskPoolStationAndLine: data => get({url: GUANGCHANG_API.workorderPlan + 'stationList', data}), //新增下发工单
  getStationListByTypes: data => get({url: GUANGCHANG_API.workorderPlan + 'stationListByTypes', data}), // 多选获取站室
  getWorkorderTypeList: data => get({url: GUANGCHANG_API.workorderType + 'list', data}), //新增下发工单
  postWorkorderTypeDel: data => postFormdata({url: GUANGCHANG_API.workorderPlan + 'del', data}), //新增下发工单
  postWorkorderTypeExec: data => post({url: GUANGCHANG_API.workorderPlan + 'exec', data}), //新增下发工单

  //工单列表
  getFindWork: data => get({url: GUANGCHANG_API.workorder + 'page', data}), //
  getFindWorkUserList: data => get({url: GUANGCHANG_API.workorder + 'getUserList', data}), //
  getByOrderNo: data => get({url: GUANGCHANG_API.getByOrderNo, data}), //
  orderWorkorderDetail: data => get({url: GUANGCHANG_API.workorderRecord, data}), //
  orderWorkorderDetailImg: data => get({url: GUANGCHANG_API.workorderRecordImg, data}), //
  getOrderHis: data => get({url: GUANGCHANG_API.orderHis, data}), //
  getOrderHisImg: data => get({url: GUANGCHANG_API.orderHisImg, data}), //
  getOrderGuidang: data => postFormdata({url: GUANGCHANG_API.orderGuidang, data}),
  getOrderHistoryTime: data => get({url: GUANGCHANG_API.orderHistoryTime, data}),
  getLocationByOrderNo: data => get({url: GUANGCHANG_API.getLocationByOrderNo, data}),
  getOrderLocation: data => get({url: GUANGCHANG_API.orderLocation, data}),
  getDictOrderType: data => get({url: GUANGCHANG_API.dictOrderType, data}), //
  getDictstationtype: data => get({url: GUANGCHANG_API.dictStationType, data}), //
  postUploadOrderFile: data => post({url: GUANGCHANG_API.postUploadOrderFile, data}), //
  postWorkOrderTreeList: data => get({url: GUANGCHANG_API.workorderPlan + 'queryTaskTypeTree', data}),  // tree
  toFindFlowByActTaskId: data => get({url: GUANGCHANG_API.findFlowByActTaskId, data}),  // 详情步骤
  getWeishengDevByOrderNo: data => get({url: GUANGCHANG_API.getWeishengDevByOrderNo, data}),  // 巡视详情

  // 周期计划
  getLoadWorkorderCycle: data => get({url: GUANGCHANG_API.loadWorkorderCycle, data}), // 列表
  getListTaskType: data => get({url: GUANGCHANG_API.listTaskType, data}), // 筛选级联数据
  getCardTypeList: data => get({url: GUANGCHANG_API.cardTypeList, data}), // 标准卡
  saveWorkorderCycle: data => post({url: GUANGCHANG_API.saveWorkorderCycle, data}), // 保存
  getStationByCycleId: data => get({url: GUANGCHANG_API.stationByCycleId, data}), // 详情
  toDelWorkorderCycle: data => postFormdata({url: GUANGCHANG_API.delWorkorderCycle, data}), // 删除

  // 政治保电
  getLoadBaodianTask: data => get({url: GUANGCHANG_API.loadBaodianTask, data}), // 列表
  getLoadBaodianTaskAll: data => get({url: GUANGCHANG_API.loadBaodianTaskAll, data}), // 列表  all
  saveBaodianTask: data => post({url: GUANGCHANG_API.saveBaodianTask, data}), // 保存
  handleDelBaodianTask: data => postFormdata({url: GUANGCHANG_API.deleteBaodianTask, data}), // 删除
  getLoadBaodianTaskById: data => get({url: GUANGCHANG_API.loadBaodianTaskById, data}), // 详情
  getFindCustomerByStationCode: data => post({url: GUANGCHANG_API.findCustomerByStationCode, data}), // 客户信息

  // 小微曲线
  getXiaoWeiLineDownUpdate: data => get({url: GUANGCHANG_API.queryCurrentData, data}), // 下边3秒钟
  getXiaoWeiLineDown: data => get({url: GUANGCHANG_API.lineDownData, data}), // 下边3分钟
  getQuerylineClient: data => get({url: GUANGCHANG_API.querylineClient, data}), // 上边某段时间



  //备品备件


  // 出库
  addStockOut: data => post({url: GUANGCHANG_API.stockOut + '/add', data}), // 新增出库
  editStockOut: data => post({url: GUANGCHANG_API.stockOut + '/edit', data}), // 修改出库
  backStockOut: data => postFormdata({url: GUANGCHANG_API.stockOut + '/back', data}), // 归还
  noBackStockOut: data => postFormdata({url: GUANGCHANG_API.stockOut + '/noBack', data}), // 归还
  doOutStock: data => postFormdata({url: GUANGCHANG_API.stockOut + '/doOutStock', data}), // 出库
  getStockList: data => get({url: GUANGCHANG_API.stockOut + '/getStockList', data}), // 获取仓库及位置列表
  getPositionList: data => get({url: GUANGCHANG_API.stockOut + '/getPositionList', data}), // 获取仓库位置
  getCodeList: data => get({url: GUANGCHANG_API.stockOut + '/queryList', data}), // 获取code
  getStockOutList: data => get({url: GUANGCHANG_API.stockOut + '/page', data}), // 出库表格
  deleteStockOut: id => deleted({url: GUANGCHANG_API.stockOut + '/' + id}), // 删除
  ckDownloadExcel: data => ajaxFile({
    method: 'get',
    url: GUANGCHANG_API.stockOut + '/downloadExcel',
    data
  }),
  getObjModelList: data => get({url: GUANGCHANG_API.stockOut + '/queryObjModelList', data}), // 获取code
  getObjNameList: data => get({url: GUANGCHANG_API.stockOut + '/queryObjNameList', data}), // 获取code
  getObjNameListAll: data => get({url: GUANGCHANG_API.stockOut + '/queryStockOutObjNameList', data}), // 获取code

  // 入库
  addStockIn: data => post({url: GUANGCHANG_API.stockIn + '/add', data}), // 新增入库
  getStockInList: data => get({url: GUANGCHANG_API.stockIn + '/page', data}), // 入库表格
  doInStock: data => post({url: GUANGCHANG_API.stockIn + '/doInStock', data}), // 入库表格
  deleteStockIn: id => deleted({url: GUANGCHANG_API.stockIn + '/' + id}), // 删除
  editStockInList: data => post({url: GUANGCHANG_API.stockIn + '/edit', data}), // 编辑
  stockInNameList: data => get({url: GUANGCHANG_API.stockIn + '/queryObjNameList', data}), // 编辑
  downloadExcel: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.stockIn + '/downloadExcel',
    data
  }),

  // 库存管理
  getStockObjects: data => get({url: GUANGCHANG_API.stockObjects + '/page', data}), // 库存表格
  getStationDeviceOrderList: data => get({url: GUANGCHANG_API.findStationDeviceOrderList, data}),
  postStockBatchCheck: data => post({url: GUANGCHANG_API.stockObjects + '/batchCheck', data}), // 库存表格
  postStockBatchDiaobo: data => post({url: GUANGCHANG_API.stockObjects + '/batchDiaobo', data}), // 库存表格
  stockObjectsNameList: data => get({url: GUANGCHANG_API.stockObjects + '/queryObjNameList', data}), // 编辑
  // GET /rtStockObjects/downloadExcel
  kcDownloadExcel: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.stockObjects + '/downloadExcel',
    data
  }),
  // 检查记录
  getStockCheckPage: data => get({url: GUANGCHANG_API.stockCheck + '/queryPage', data}), // 库存表格
  stockCheckNameList: data => get({url: GUANGCHANG_API.stockCheck + '/queryObjNameList', data}), // 编辑
  jcjlDownloadExcel: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.stockCheck + '/downloadExcel',
    data
  }),
  //备品备件统计
  stockObjectsStatisticsPage: data => get({url: GUANGCHANG_API.stockObjectsStatistics + 'page', data}), // 库存表格
  stockObjectsStatisticsDown: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.stockObjectsStatistics + 'downloadExcel',
    data
  }),

  //仪器仪表
  addYqybIn: data => post({url: GUANGCHANG_API.yqybIn + '/add', data}), // 新增入库
  doInYqybIn: data => post({url: GUANGCHANG_API.yqybIn + '/doInInstrument', data}), // 入库
  editYqybIn: data => put({url: GUANGCHANG_API.yqybIn + '/edit', data}), // 编辑
  pageYqybIn: data => get({url: GUANGCHANG_API.yqybIn + '/page', data}), // 查询
  deleteYqybIn: id => deleted({url: GUANGCHANG_API.yqybIn + '/' + id}), // 查询
  yqybExcel: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.yqybIn + '/downloadExcel',
    data
  }),
  //仪器仪表借用管理
  addYqybOut: data => post({url: GUANGCHANG_API.yqybOut + '/add', data}), // 新增出库
  doInYqybOut: data => post({url: GUANGCHANG_API.yqybOut + '/doOutInstrument', data}), // 出库
  backYqybOut: data => get({url: GUANGCHANG_API.yqybOut + '/back', data}), // 归还
  editYqybOut: data => put({url: GUANGCHANG_API.yqybOut + '/edit', data}), // 编辑
  pageYqybOut: data => get({url: GUANGCHANG_API.yqybOut + '/page', data}), // 查询
  deleteYqybOut: id => deleted({url: GUANGCHANG_API.yqybOut + '/' + id}), // 查询
  yqybStockList: data => get({url: GUANGCHANG_API.yqybOut + '/getStockList', data}), // 获取仓库
  yqybPositionList: data => get({url: GUANGCHANG_API.yqybOut + '/getPositionList', data}), // 获取仓库位置
  yqybCodeList: data => get({url: GUANGCHANG_API.yqybOut + '/queryList', data}), // 获取code
  yqybExcelOut: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.yqybOut + '/downloadExcel',
    data
  }),
  //仪器仪表台账
  pageYqybTz: data => get({url: GUANGCHANG_API.yqybObjs + '/page', data}), // 查询
  yqybExcelTz: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.yqybObjs + '/downloadExcel',
    data
  }),

  //值班计划
  // getZbjhPage: data => get({url: GUANGCHANG_API.zbjh + 'loadBeondutyPlan', data}), // 查询
  getZbjhPage: data => get({url: GUANGCHANG_API.attendancePlan + 'getPlanList', data}), // 查询
  changePlanUser: data => postFormdata({url: GUANGCHANG_API.attendancePlan + 'changePlanUser', data}), // 选择人员
  getZbjhEdit: data => post({url: GUANGCHANG_API.zbjh + 'editBeondutyPlan', data}), // 查询
  postZbjhSave: data => post({url: GUANGCHANG_API.zbjh + 'savePlan', data}), // 查询
  postZbjhIsSave: data => post({url: GUANGCHANG_API.attendancePlan + 'savePlan', data}), // 查询
  getGroupListById: data => get({url: GUANGCHANG_API.zbjhGroup, data}), // 查询
  postZbjhExport: data => ajaxFile({
    method: 'post',
    contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.zbjh + 'exportBeondutyPlan',
    data
  }),
  exportAttendance: data => ajaxFile({
    method: 'get',
    contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.exportAttendance,
    data
  }),




  //个人履历
  getGrllInfo: data => get({url: GUANGCHANG_API.grllInfo, data}),
  getIsManager: data => get({url: GUANGCHANG_API.isManager, data}),
  getGrllInfoId: data => get({url: GUANGCHANG_API.grllInfoId, data}),
  getGrllPage: data => get({url: GUANGCHANG_API.grllPage, data}),
  postGrllInfo: data => post({url: GUANGCHANG_API.addGrllInfo, data}),
  deletePersonFamily: id => deleted({url: GUANGCHANG_API.personFamily + '/' + id}),
  deletePersonSchool: id => deleted({url: GUANGCHANG_API.personSchool + '/' + id}),
  deletePersonWork: id => deleted({url: GUANGCHANG_API.personWork + '/' + id}),
  deletePersonMeeting: id => deleted({url: GUANGCHANG_API.personMeeting + '/' + id}),
  getGrllDaochuXiang: data => get({url: GUANGCHANG_API.grllDaochuXiang, data}),
  getGrllDaochu: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.grllDaochu,
    data
  }),
  getGrllDaochugr: data => ajaxFile({
    method: 'get',
    contenType: 'application/json',
    // contenType: 'application/x-www-form-urlencoded',
    url: GUANGCHANG_API.grllDaochugr,
    data
  }),
  //履历审核
  postGrllSq: data => postFormdata({url: GUANGCHANG_API.grllSq, data}),
  getGrllSqPage: data => get({url: GUANGCHANG_API.grllSqPage, data}),
  postgrllSqShenhe: data => postFormdata({url: GUANGCHANG_API.grllSqShenhe, data}),


  // 补充信息
  getBcxx: data => get({url: GUANGCHANG_API.buchongxinxi + '/getExtendFields', data}),
  addBcxx: data => post({url: GUANGCHANG_API.buchongxinxi + '/addExtendField', data}),
  updateBcxx: data => post({url: GUANGCHANG_API.buchongxinxi + '/modifyExtendField', data}),
  deleteBcxx: data => post({url: GUANGCHANG_API.buchongxinxi + '/removeExtendField', data}),

  //交接班记录
  jiaojiebanPage: data => get({url: GUANGCHANG_API.jiaojiebanPage, data}),
  jiaojiebanDetail: data => get({url: GUANGCHANG_API.jiaojiebanDetail, data}),
  toGetShiftInfo: data => get({url: GUANGCHANG_API.getShiftInfo, data}),


  //掌纹
  quyuPage: data => get({url: GUANGCHANG_API.quyu + 'loadInstallationAreaPage', data}),
  quyuSave: data => postFormdata({url: GUANGCHANG_API.quyu + 'saveInstallationArea', data}),
  quyuDel: data => postFormdata({url: GUANGCHANG_API.quyu + 'delInstallationArea', data}),
  quyuAreaList: data => get({url: GUANGCHANG_API.quyu + 'showAreaList', data}),
  //掌纹设备
  zhangwenDevicePage: data => get({url: GUANGCHANG_API.zhangwenDevice + 'loadZhangwenDevicePage', data}),
  zhangwenDeviceSave: data => postFormdata({url: GUANGCHANG_API.zhangwenDevice + 'saveZhangwenDevice', data}),
  zhangwenDeviceDel: data => postFormdata({url: GUANGCHANG_API.zhangwenDevice + 'delZhangwenDevice', data}),
  //掌纹设备同步

  addZhangwenjiUser: data => postFormdata({url: GUANGCHANG_API.zhangwenji + 'addZhangwenjiUser', data}),
  synchronismUserHander: data => postFormdata({url: GUANGCHANG_API.zhangwenji + 'synchronismUserHander', data}),

  //缺陷登记
  quexianDjPage: data => get({url: GUANGCHANG_API.workorderFault + 'page', data}),
  postQuexianDj: data => post({url: GUANGCHANG_API.workorderFault + 'add', data}),
  putQuexianDj: data => post({url: GUANGCHANG_API.workorderFault + 'edit', data}),
  postQuexianPaidan: data => postFormdata({url: GUANGCHANG_API.workorderFault + 'dispatch', data}),
  getDisposeState: data => get({url: GUANGCHANG_API.workorderFault + 'getFaultStatus', data}),
  getQuexianImg: data => get({url: GUANGCHANG_API.workorderFaultImg + 'getByFaultNo', data}),

  //库房信息
  getStockInfoPage: data => get({url: GUANGCHANG_API.stockInfo + 'page', data}),
  getStockInfoAdd: data => post({url: GUANGCHANG_API.stockInfo + 'add', data}),
  getStockInfoEdit: data => post({url: GUANGCHANG_API.stockInfo + 'edit', data}),
  getStockInfoDelete: data => get({url: GUANGCHANG_API.stockInfo + 'delete', data}),
  getStockInfoList: data => get({url: GUANGCHANG_API.stockInfo + 'queryList', data}),

  //锁具

  lockInfoPage: data => get({url: GUANGCHANG_API.lockInfo + 'loadLockInfo', data}),
  lockInfoDel: data => postFormdata({url: GUANGCHANG_API.lockInfo + 'delLockInfo', data}),
  lockInfoEdit: data => postFormdata({url: GUANGCHANG_API.lockInfo + 'editLockInfo', data}),
  lockInfoStation: data => post({url: GUANGCHANG_API.lockInfo + 'chooseStationForLock', data}),
  lockLogPage: data => get({url: GUANGCHANG_API.lockLog + 'loadLockLog', data}),
  lockInfoStationDevice: data => get({url: GUANGCHANG_API.lockInfo + 'loadStationDevice', data}),
  //锁具授权
  lockAuthPage: data => get({url: GUANGCHANG_API.lockAuth + 'loadLockAuth', data}),
  lockAuthAdd: data => postFormdata({url: GUANGCHANG_API.lockAuth + 'addLockAuth', data}),
  lockAuthDel: data => postFormdata({url: GUANGCHANG_API.lockAuth + 'delLockAuth', data}),
  postAddAuthUser: data => post({url: GUANGCHANG_API.addAuthUser, data}),

  getFindAuthStation: data => get({url: GUANGCHANG_API.lockAuthStation + 'findAuthStation', data}),
  postAddAuthStation: data => post({url: GUANGCHANG_API.lockAuthStation + 'addAuthStation', data}),
  postFindStation: data => get({url: GUANGCHANG_API.lockAuthStation + 'findStation', data}),
  postAddAuthDevice: data => post({url: GUANGCHANG_API.lockAuthDevice + 'addAuthDevice', data}),
  getFindAuthDevice: data => get({url: GUANGCHANG_API.lockAuthDevice + 'findAuthDevice', data}),

  // 电缆
  getLoadCableInfoByStationCode: data => get({url: GUANGCHANG_API.loadCableInfoByStationCode, data}), // 电缆分页
  getDianlanList: data => get({url: GUANGCHANG_API.dianlanUrl + '/loadCableLineInfo', data}), // 电缆分页
  addDianlan: data => post({url: GUANGCHANG_API.dianlanUrl + '/addCableLineInfo', data}), // 电缆新增
  editDianlan: data => post({url: GUANGCHANG_API.dianlanUrl + '/editCableLineInfo', data}), // 电缆编辑
  deleteDianlan: data => postFormdata({url: GUANGCHANG_API.dianlanUrl + '/delCableLineInfo', data}), // 删除电缆
  getDianlanDetail: data => get({url: GUANGCHANG_API.dianlanUrl + '/detailCableLineInfo', data}), // 查看电缆线路明细
  uploadDL: data => ajaxFile({
    method: 'post',
    url: GUANGCHANG_API.dianlanUrl + '/importCableLineInfo',
    data
  }),

  // 定值单
  getDZD4List: data => get({url: GUANGCHANG_API.dingzhidan4 + '/loadStationForm04kvData', data}), // 定值单0.4分页
  addDZD4: data => postFormdata({url: GUANGCHANG_API.dingzhidan4 + '/saveStationForm04kvData', data}), // 定值单0.4新增
  deleteDZD4: data => postFormdata({url: GUANGCHANG_API.dingzhidan4 + '/delStationForm04kv', data}), // 删除定值单0.4

  getDZD10List: data => get({url: GUANGCHANG_API.dingzhidan10 + '/loadStationForm10kvData', data}), // 定值单10分页
  addDZD10: data => postFormdata({url: GUANGCHANG_API.dingzhidan10 + '/saveStationForm10kv', data}), // 定值单10新增
  deleteDZD10: data => postFormdata({url: GUANGCHANG_API.dingzhidan10 + '/delStationForm10kv', data}), // 删除定值单10

  importDZD04: GUANGCHANG_API.dingzhidan4 + '/importStationForm04kvData',
  importDZD10: GUANGCHANG_API.dingzhidan10 + '/importStationForm10kvData',
  downloadDZD04: GUANGCHANG_API.dingzhidan4 + '/downloadStationForm04kvExcel',
  downloadDZD10: GUANGCHANG_API.dingzhidan10 + '/downloadStationForm10kvExcel',

  getStationListDZD: data => get({url: GUANGCHANG_API.DZDstationList, data}),

  // 客户
  getCustomList: data => get({url: GUANGCHANG_API.customApi + '/loadCustomerInfo', data}), // 客户分页
  getCustomInfo: data => get({url: GUANGCHANG_API.customApi + '/loadCustomerDeatilInfo', data}), // 客户详情
  addCustom: data => post({url: GUANGCHANG_API.customApi + '/saveCustomerInfo', data}), // 客户新增
  editCustom: data => post({url: GUANGCHANG_API.customApi + '/editCustomerInfo', data}), // 客户编辑
  deleteCustom: data => post({url: GUANGCHANG_API.customApi + '/delCustomerInfo', data}), // 删除客户
  loadCustomerInfoForSelect: data => get({url: GUANGCHANG_API.customApi + '/loadCustomerInfoForSelect', data}), // 删除客户
  getcustomVip: data => get({url: GUANGCHANG_API.customVip, data}),

  getBiandianzhan: data => get({url: GUANGCHANG_API.biandianzhan, data}),
  getPeidianshi: data => get({url: GUANGCHANG_API.peidianshi, data}),
  getCableLineInfo: data => get({url: GUANGCHANG_API.dianlanUrl + '/findCableLineInfo', data}),
  getBYQList: data => get({url: GUANGCHANG_API.dianlanUrl + '/findBianyaqiNo', data}),
  getDDHList: data => get({url: GUANGCHANG_API.dianlanUrl + '/findDiaoduhao', data}),
  // 遥测遥信分页
  getYCYXList: (url, data) => get({url: GUANGCHANG_API.deviceUrl + url, data}),
  getDevice: (url, data) => get({url: GUANGCHANG_API.deviceUrl + url, data}),
  getJXTStationList: data => get({url: GUANGCHANG_API.jxtStation, data}),
  getGaoYaData: data => get({url: GUANGCHANG_API.getGaoYaData, data}),

  // 通道监测
  getPageweishengMCU: data => get({url: GUANGCHANG_API.pageweishengMCU, data}),
  postSaveOrUpdate: data => postFormdata({url: GUANGCHANG_API.saveOrUpdate, data}),
  getCountYaoceDataByParam: data => get({url: GUANGCHANG_API.countYaoceDataByParam, data}),


  // 台区设备
  getDevDiaoduList: data => get({url: GUANGCHANG_API.devDiaoduList, data}), // 列表
  getSelectBystationCode: data => get({url: GUANGCHANG_API.selectBystationCode, data}), // 站室编码查询
  getScheduleNumSelect: data => get({url: GUANGCHANG_API.scheduleNumSelect, data}), // 调度号查询



  // 大屏人员
  computeNumByAgeAndSex: data => get({url: `${GUANGCHANG_API.dpUserApi}/computeNumByAgeAndSex`, data}),
  computeNumByEducationalBackground: data => get({url: `${GUANGCHANG_API.dpUserApi}/computeNumByEducationalBackground`, data}),
  computeNumByProfessionTechniqueCertification: data => get({url: `${GUANGCHANG_API.dpUserApi}/computeNumByProfessionTechniqueCertification`, data}),
  computeNumByTechniqueClass: data => get({url: `${GUANGCHANG_API.dpUserApi}/computeNumByTechniqueClass`, data}),
  computeNumByWorkingYears: data => get({url: `${GUANGCHANG_API.dpUserApi}/computeNumByWorkingYears`, data}),
  loadCustomerNumber: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadCustomerNumber`, data}),
  countByDangLing: data => get({url: `${GUANGCHANG_API.dpUserApi}/countByDangLing`, data}),
  loadInnerJobInfo: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadInnerJobInfo`, data}),
  loadTeamAndPersonNumInfo: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadTeamAndPersonNumInfo`, data}),
  loadUserAgeAndWorkingYears: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadUserAgeAndWorkingYears`, data}),
  loadAvgAgeOfDangyuan: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadAvgAgeOfDangyuan`, data}),
  loadUserEntryAndLeaveInfo: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadUserEntryAndLeaveInfo`, data}),
  loadUserNumQuota: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadUserNumQuota`, data}),
  loadUserScoreInfo: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadUserScoreInfo`, data}),
  loadZhengzhigongdianUserNum: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadZhengzhigongdianUserNum`, data}),
  loadZzbdOrderInfo: data => get({url: `${GUANGCHANG_API.dpUserApi}/loadZzbdOrderInfo`, data}),
  findAllUserLocation: data => get({url: `${GUANGCHANG_API.dpUserApi}/findAllUserLocation`, data}),
  findOnlineUser: data => get({url: `${GUANGCHANG_API.dpUserApi}/findOnlineUser`, data}),
  countBaodianTask: data => get({url: `${GUANGCHANG_API.dpTicketApi}/countBaodianTask`, data}), // 政治保电任务
  userAndOrder: data => get({url: `${GUANGCHANG_API.dpTicketApi}/userAndOrder`, data}),
  toGetDangList: data => get({url: `${GUANGCHANG_API.getDangList}`, data}),
  loadCustomer1Info: data => get({url: `${GUANGCHANG_API.loadCustomer1Info}`, data}),
  getUserTitleByUserId: data => get({url: `${GUANGCHANG_API.userTitleByUserId}`, data}),
  loadHuadengZhaomingStatus: data => get({url: `${GUANGCHANG_API.dpEledeviceApi}/loadHuadengZhaomingStatus`, data}),
  getDpArea: data => get({url: `${GUANGCHANG_API.dpAreaApi}`, data}),
  zhanshigongdan: data => get({url: `${GUANGCHANG_API.zhanshigongdan}`, data}),
  getjxtDiaoduhao: data => get({url: `${GUANGCHANG_API.jxtDiaoduhao}`, data}),
  queryTypeCodeList: data => get({url: `${GUANGCHANG_API.queryTypeCodeList}`, data}),
  saveDapingImage: data => post({url: `${GUANGCHANG_API.saveDapingImage}`, data}),
  loadTicketOfZzbd: data => get({url: `${GUANGCHANG_API.loadTicketOfZzbd}`, data}),
  groupInfo: data => get({url: `${GUANGCHANG_API.groupInfo}`, data}),
  companyGroup: data => get({url: `${GUANGCHANG_API.companyGroup}`, data}),
  loadAllFuheQuxian: data => get({url: `${GUANGCHANG_API.loadAllFuheQuxian}`, data}),
  statisticsBaodianTaskDays: data => get({url: `${GUANGCHANG_API.statisticsBaodianTaskDays}`, data}),
  shiShiFuHeJianKong: data => get({url: `${GUANGCHANG_API.shiShiFuHeJianKong}`, data}),
  findOrderByTaskId: data => get({url: `${GUANGCHANG_API.findOrderByTaskId}`, data}),
  getOrgCameraTree: data => get({url: GUANGCHANG_API.getOrgCameraTree, data}),
  deviceTypeTreeNew: data => get({url: GUANGCHANG_API.deviceTypeTreeNew, data}),
  switchStationList: data => get({url: GUANGCHANG_API.switchStationList, data}),
  videoCameraGetlistTree: data => get({url: GUANGCHANG_API.videoCameraGetlistTree, data}),
  videoCameraYiFenPeipage: data => get({url: GUANGCHANG_API.videoCameraYiFenPeipage, data}),
  videoCameraWeiFenPeipage: data => get({url: GUANGCHANG_API.videoCameraWeiFenPeipage, data}),
  videoCameraBangding: data => post({url: GUANGCHANG_API.videoCameraBangding, data}),
  videoCameraJieBang: data => get({url: GUANGCHANG_API.videoCameraJieBang, data}),
  queryStationCurrentInfo: data => get({url: GUANGCHANG_API.queryStationCurrentInfo, data}),
  getLoadHuadengInfoOfCamera: data => get({url: GUANGCHANG_API.loadHuadengInfoOfCamera, data}),
  loadStationInfoOfBaodian: data => get({url: GUANGCHANG_API.loadStationInfoOfBaodian, data}),
  loadBaodianDevice: data => get({url: GUANGCHANG_API.loadBaodianDevice, data}),
  loadBaodianTextNum: data => get({url: GUANGCHANG_API.loadBaodianTextNum, data}),
  loadFuheQuxianOfLianghui: data => get({url: GUANGCHANG_API.loadFuheQuxianOfLianghui, data}),
  loadCableLineOfBaozhang: data => get({url: GUANGCHANG_API.loadCableLineOfBaozhang, data}),
  loadStationOfBaozhang: data => get({url: GUANGCHANG_API.loadStationOfBaozhang, data}),
  videoOperationPage: data => get({url: GUANGCHANG_API.videoOperation + 'page', data}),
  videoOperationBind: data => post({url: GUANGCHANG_API.videoOperation + 'bind', data}),
  videoOperationEdit: data => post({url: GUANGCHANG_API.videoOperation + 'edit', data}),
  videoOperationDelete: data => get({url: GUANGCHANG_API.videoOperation + 'delete', data}),
  queryCameraList: data => get({url: GUANGCHANG_API.queryCameraList, data}),
  huaDengList: data => get({url: GUANGCHANG_API.huaDengList, data}),

  loadBaozhangWorkorder: data => get({url: GUANGCHANG_API.loadBaozhangWorkorder, data}),
  loadBaozhangTeam: data => get({url: GUANGCHANG_API.loadBaozhangTeam, data}),
  loadPeidianLeader: data => get({url: GUANGCHANG_API.loadPeidianLeader, data}),
  loadPeidianBaozhangUser: data => get({url: GUANGCHANG_API.loadPeidianBaozhangUser, data}),
  load1NCustomerInfo: data => get({url: GUANGCHANG_API.load1NCustomerInfo, data}),
  loadDuizhangOf1N: data => get({url: GUANGCHANG_API.loadDuizhangOf1N, data}),
  loadUserInfoOf1N: data => get({url: GUANGCHANG_API.loadUserInfoOf1N, data}),
  getWeatherByTime: data => get({url: GUANGCHANG_API.getWeatherByTime, data}),

  //天气
  loadWeatherInfo: data => get({url: GUANGCHANG_API.loadWeatherInfo, data}),
  importWeatherInfo: data => get({url: GUANGCHANG_API.importWeatherInfo, data}),
  delWeatherInfo: data => postFormdata({url: GUANGCHANG_API.delWeatherInfo, data}),
  //保障工单
  loadBaodianWorkorderInfo: data => get({url: GUANGCHANG_API.loadBaodianWorkorderInfo, data}),
  importBaodianWorkorder: data => get({url: GUANGCHANG_API.importBaodianWorkorder, data}),
  delBaodianWorkorder: data => postFormdata({url: GUANGCHANG_API.delBaodianWorkorder, data}),
  loadWaringMessageOfLianghui: data => get({url: GUANGCHANG_API.loadWaringMessageOfLianghui, data}),
}
