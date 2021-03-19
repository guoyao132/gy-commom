import {get, post, ajaxFile, postFormdata, service, put, deleted} from '@/plugin/axios' // 系统设置接口文件
// 解决测试环境和生产环境404的问题
import BASTURL from "@/api/URL_PROXY.js"

let BASEURL = BASTURL;
export { URL_PROXY }

let URL_PROXY = process.env.NODE_ENV == "development" ? "/rbac" : BASEURL + '/rbac';
let hatUrl = process.env.NODE_ENV == "development" ? "/hat" : BASEURL + '/hat';

let SYSTEM_API = {

    // menuListParent: 'http://192.168.1.111:10008' + "/sys/menu/listParent",
    menuListParent: URL_PROXY + "/sys/menu/listParent",
    menuListChildren: URL_PROXY + "/sys/menu/listChildren",
    getXTUserTableUrl: URL_PROXY + "/sys/user/page",
    userTableDeleteUrl: URL_PROXY + "/sys/user/delete",
    resetPwdUrl: URL_PROXY + "/sys/user/resetPwd",

    exportXLSUrl: URL_PROXY + "/sys/user/export",
    userTemplateUrl: URL_PROXY + "/sys/user/exportDefaultTemplate?moduleNameCn=模板-人员",
    userImportUrl: URL_PROXY + "/sys/user/import",

    getRizhiUrl: URL_PROXY + "/sys/log/page",
    getPersonalMsgUrl: URL_PROXY + "/sys/user/get",
    getRoleListUrl: URL_PROXY + "/sys/role/list",
    pageRoleListUrl: URL_PROXY + "/sys/role/page",
    deleteRoleUrl: URL_PROXY + "/sys/role/delete",
    getPersonalRoleUrl: URL_PROXY + "/sys/role/get",
    getDictDataUrl: URL_PROXY + "/sys/dict/listByType",
    saveRoleUrl: URL_PROXY + "/sys/role/save",
    getRoleFPListUrl: URL_PROXY + "/sys/role/listUserByRole",
    removeFPUrl: URL_PROXY + "/sys/role/removeUser",
    getCompanyPersionUrl: URL_PROXY + "/sys/role/listUserByOffice",
    roleAssignRoleUrl: URL_PROXY + "/sys/role/assignRole",
    savePersonalMsgUrl: URL_PROXY + "/sys/user/save",
    assignRolesByUserIdUrl: URL_PROXY + "/sys/role/assignRolesByUserId",

    dictDelete: URL_PROXY + "/sys/dict/delete",
    dictListType: URL_PROXY + "/sys/dict/list/type",
    dictListByType: URL_PROXY + "/sys/dict/listByType",
    dictPage: URL_PROXY + "/sys/dict/page",
    dictSave: URL_PROXY + "/sys/dict/save",

    areaTree: URL_PROXY + "/sys/area/tree",
    areaSave: URL_PROXY + "/sys/area/save",
    areaDelete: URL_PROXY + "/sys/area/delete",

    menuDelete: URL_PROXY + "/sys/menu/delete",
    menuForm: URL_PROXY + "/sys/menu/form",
    menuSave: URL_PROXY + "/sys/menu/save",
    menuUpdateSort: URL_PROXY + "/sys/menu/updateSort",


    rtconfigDelete: URL_PROXY + "/rtconfig/rtConfiguration/delete",
    rtconfigPage: URL_PROXY + "/rtconfig/rtConfiguration/page",
    rtconfigSava: URL_PROXY + "/rtconfig/rtConfiguration/save",
    rtconfigUpdate: URL_PROXY + "/rtconfig/rtConfiguration/update",

    officeDelete: URL_PROXY + "/sys/office/delete",
    officeForm: URL_PROXY + "/sys/office/form",
    officeGet: URL_PROXY + "/sys/office/get",
    officeSave: URL_PROXY + "/sys/office/save",
    officeTree: URL_PROXY + "/sys/office/tree",
    officeUserList: URL_PROXY + "/sys/office/user/list",

    //代码管理
    gencodeTables: URL_PROXY + "/gencode/pageTables",
    gencodeConfiginfo: URL_PROXY + "/gencode/configinfo",
    gencodeColumns: URL_PROXY + "/gencode/columns",
    gencodeCode: URL_PROXY + "/gencode/code",

    //路由管理
    routePage: URL_PROXY + "/route/page",
    addRoute: URL_PROXY + "/route",
    editRoute: URL_PROXY + "/route",
    delRoute: URL_PROXY + "/route",
    refreshCache: URL_PROXY + "/route/apply",
    getRouteEdit: URL_PROXY + "/route",


    // 告警管理
    sys_message: URL_PROXY + "/sys/message/page",

    //智能视频分析
    videoResultPage: BASEURL + "/video/rtAiMessage/page",
    videoResultAudit: BASEURL + "/video/rtAiMessage/audit",
    videoResultType: BASEURL + "/video/rtAiMessage/getType",
    videoFwq: BASEURL + "/video/rtAiServer",
    videoFwqPage: BASEURL + "/video/rtAiServer/page",
    pageVideoPushRecord: BASEURL + "/video/pushRecord/page",
    deleteVideoPushRecord: BASEURL + "/video/pushRecord/delete",

    // 定时任务
    dingshirenwuJob: BASEURL + "/quartz/job",
    dingshirenwuhttpJob: BASEURL + "/quartz/httpJob",

    //值班计划
    banzuList: URL_PROXY + "/sys/office/getOfficeListByCode",
    banzuListZS: URL_PROXY + "/sys/office/getOfficeByCode",
    zbjhPersion: URL_PROXY + "/sys/office/getUserByCode",
    userByOfficeId: URL_PROXY + "/sys/office/getUserByOfficeId",

    //备品备件 仪器仪表
    kufangList: URL_PROXY + "/sys/dict/listByType",



    findAuthUserInfo: URL_PROXY + "/sys/user/findAuthUserInfo",


}

export default {
    getFindAuthUserInfo: data => get({url: SYSTEM_API.findAuthUserInfo, data}), // 查询值班计划的班组
    //值班计划
    getBanzuList: data => get({url: SYSTEM_API.banzuList, data}), // 查询值班计划的班组
    getBanzuListZS: data => get({url: SYSTEM_API.banzuListZS, data}), // 站室查询值班计划的班组
    getZbjhPersion: data => get({url: SYSTEM_API.zbjhPersion, data}), // 查询值班计划的班组
    getKufangList: data => get({url: SYSTEM_API.kufangList, data}), // 查询值班计划的班组
    getUserByOfficeId: data => get({url: SYSTEM_API.userByOfficeId, data}), // 根据班组ID获取人员


    getMenuListParent: data => get({url: SYSTEM_API.menuListParent, data}), // 查询一级菜单
    getMenuListChildren: data => get({url: SYSTEM_API.menuListChildren, data}), // 查询子菜单级菜单
    getListByRole: data => get({url: URL_PROXY + '/sys/menu/listByRole', data}), // 查询子菜单级菜单
    getXTUserTable: data => post({url: SYSTEM_API.getXTUserTableUrl, data}), // 系统设置/用户table数据获取
    userTableDelete: data => get({url: SYSTEM_API.userTableDeleteUrl, data}), // 系统设置/删除用户
    getPersonalMsg: data => get({url: SYSTEM_API.getPersonalMsgUrl, data}), // 系统设置/单个用户查询
    logout: data => get({url: BASEURL + '/auth/authentication/logout', data}), // 退出登录
    exportXLS: data => ajaxFile({method: 'post', contenType: 'application/json', url: SYSTEM_API.exportXLSUrl, data}), // 导出用户
    userTemplate: data => ajaxFile({url: SYSTEM_API.userTemplateUrl, data}), // 用户模板下载
    downloadUserTemplate: SYSTEM_API.userTemplateUrl, // 用户模板下载url

    userImport: data => ajaxFile({
        method: 'post',
        responseType: '',
        contenType: '',
        url: SYSTEM_API.userImportUrl,
        data
    }), // 用户导入文件

    exportUserXLS: SYSTEM_API.userImportUrl, // 用户导入url
    addCacheCanshu: data => get({url: URL_PROXY + '/rtconfig/rtConfiguration/flush', data}), // 参数 缓存
    addCacheZidian: data => get({url: URL_PROXY + '/sys/dict/flush', data}), // 字典缓存

    uploadFile: data => ajaxFile({
        method: 'post',
        responseType: 'json',
        contenType: '',
        url: URL_PROXY + '/sys/file/uploadOne',
        data
    }), // 单个文件导入



    dataPermGet: data => get({url: URL_PROXY + "/sys/dataPerm/get", data}), // 数据权限管理-右侧树选中状态查询查询
    dataPermSave: data => post({url: URL_PROXY + "/sys/dataPerm/save ", data}), // 数据权限管理-右侧树查询
    dataPermDel: data => get({url: URL_PROXY + "/sys/dataPerm/del", data}), // 删除数据权限
    changeUserStatus: data => get({url: URL_PROXY + "/sys/user/changeUserStatus" + "/" + data.loginName + "/0"}), // 手动解锁

    getRizhi: data => post({url: SYSTEM_API.getRizhiUrl, data}), // 日志查询列表
    getRoleList: data => get({url: SYSTEM_API.getRoleListUrl, data}), // 角色列表获取
    pageRoleList: data => get({url: SYSTEM_API.pageRoleListUrl, data}), // 角色列表分页查询
    deleteRole: data => get({url: SYSTEM_API.deleteRoleUrl, data}), // 角色删除
    getPersonalRole: data => get({url: SYSTEM_API.getPersonalRoleUrl, data}), // 获取单个角色信息
    getDictData: data => get({url: SYSTEM_API.getDictDataUrl, data}), // 字典类型查询‘sys_data_scope：数据范围’
    saveRole: data => post({url: SYSTEM_API.saveRoleUrl, data}), // 角色保存
    getRoleFPList: data => get({url: SYSTEM_API.getRoleFPListUrl, data}), // 获取角色分配的用户
    removeFP: data => get({url: SYSTEM_API.removeFPUrl, data}), // 移除用户
    getCompanyPersion: data => get({url: SYSTEM_API.getCompanyPersionUrl, data}), // 获取机构下的用户
    roleAssignRole: data => post({url: SYSTEM_API.roleAssignRoleUrl, data}), // 获取机构下的用户
    assignRolesByUserId: data => post({url: SYSTEM_API.assignRolesByUserIdUrl, data}), // 多角色分配

    getUserByUserName: data => get({url: URL_PROXY + "/sys/user/getUser" + "/" + data.userName + ""}), // 手动解锁

    savePersonalMsg: data => post({url: SYSTEM_API.savePersonalMsgUrl, data}), // 系统设置/保存用户信息
    // savePersonalMsg: data => ajaxFile({
    //   method: 'post',
    //   contenType: '',
    //   responseType: 'json',
    //   url: SYSTEM_API.savePersonalMsgUrl,
    //   data
    // }), // 系统设置/保存用户信息

    dictDelete: data => get({url: SYSTEM_API.dictDelete, data}), // 系统设置/删除字典
    dictListType: data => get({url: SYSTEM_API.dictListType, data}), // 系统设置/字典类型查询
    dictListByType: data => get({url: SYSTEM_API.dictListByType, data}), // 系统设置/根据字典类型查询
    dictPage: data => post({url: SYSTEM_API.dictPage, data}), // 系统设置/字典分页查询
    dictSave: data => post({url: SYSTEM_API.dictSave, data}), // 系统设置/保存字典

    areaTree: data => get({url: SYSTEM_API.areaTree, data}), // 系统设置/查询区域树
    areaSave: data => post({url: SYSTEM_API.areaSave, data}), // 系统设置/保存区域
    areaDelete: data => get({url: SYSTEM_API.areaDelete, data}), // 系统设置/删除区域

    menuDelete: data => get({url: SYSTEM_API.menuDelete, data}), // 系统设置/删除菜单信息
    menuForm: data => get({url: SYSTEM_API.menuForm, data}), // 系统设置/查询新增菜单
    menuSave: data => post({url: SYSTEM_API.menuSave, data}), // 系统设置/保存菜单
    menuUpdateSort: data => post({url: SYSTEM_API.menuUpdateSort, data}), // 系统设置/修改菜单排序

    //路由管理
    routePage: data => get({url: SYSTEM_API.routePage, data}),
    addRoute: data => post({url: SYSTEM_API.addRoute, data}),
    editRoute: data => put({url: SYSTEM_API.editRoute, data}),
    delRoute: id => deleted({url: SYSTEM_API.delRoute + '/' + id}),
    refreshCache: data => get({url: SYSTEM_API.refreshCache, data}),
    getRouteEdit: data => get({url: SYSTEM_API.getRouteEdit + '/' + data.id}),

    // 告警管理
    sys_message: data => post({url: SYSTEM_API.sys_message, data}),

    //代码管理
    gencodeTables: data => get({url: SYSTEM_API.gencodeTables, data}),//获取代码管理table数据
    gencodeConfiginfo: data => get({url: SYSTEM_API.gencodeConfiginfo, data}),//获取代码编辑时基本数据
    gencodeColumns: data => get({url: SYSTEM_API.gencodeColumns, data}),//获取代码编辑时表格数据
    gencodeCode: data => ajaxFile({method: 'post', contenType: 'application/json', url: SYSTEM_API.gencodeCode, data}), //生成代码文件

    rtconfigDelete: data => get({url: SYSTEM_API.rtconfigDelete, data}), // 系统设置/删除参数
    rtconfigPage: data => post({url: SYSTEM_API.rtconfigPage, data}), // 系统设置/参数分页查询
    rtconfigSava: data => post({url: SYSTEM_API.rtconfigSava, data}), // 系统设置/新增参数
    rtconfigUpdate: data => post({url: SYSTEM_API.rtconfigUpdate, data}), // 系统设置/更新参数

    officeDelete: data => get({url: SYSTEM_API.officeDelete, data}), // 系统设置/删除用户
    officeForm: data => get({url: SYSTEM_API.officeForm, data}), // 系统设置/生成机构编码
    officeGet: data => get({url: SYSTEM_API.officeGet, data}), // 系统设置/根据ID查询机构信息
    officeSave: data => post({url: SYSTEM_API.officeSave, data}), // 系统设置/保存机构信息
    officeTree: data => get({url: SYSTEM_API.officeTree, data}), // 系统设置/查询组织机构树
    officeUserList: data => get({url: SYSTEM_API.officeUserList, data}), // 系统设置/查询机构下的所有人员

    //个人信息
    findUserInfoById: data => get({url: URL_PROXY + "/sys/user/get", data}),//通过id获取用户信息
    userSave: data => post({url: URL_PROXY + "/sys/user/modifyUserInfo", data}),//修改个人信息
    changePassword: data => post({url: URL_PROXY + "/sys/user/changePassword", data}),//修改密码
    resetPwd: data => get({url: URL_PROXY + "/sys/user/resetPwd/" + data.loginName}),//通过id获取用户信息

    getLoginType: data => get({url: BASEURL + "/token/health", data}),//获取 SIP 号
    getSip: data => get({url: hatUrl + "/sip/get", data}),//获取 SIP 号
    queryAddressBook: data => get({url: hatUrl + "/sip/queryAddressBook", data}),//获取通讯录
    getPosition: data => get({url: hatUrl + "/realTimeLocation/get", data}),//获取点位
    getLocus: data => post({url: hatUrl + "/locus/list", data}),//获取轨迹

    sipPage: data => post({url: hatUrl + "/sip/page", data}),//获取列表sipPage
    sipAdd: data => post({url: hatUrl + "/sip/saveSip", data}),//新增sip号
    sipDelete: data => get({url: hatUrl + "/sip/delete", data}),//删除1sip号

    queryUnBindUsers: data => get({url: hatUrl + "/sip/queryUnBindUsers", data}),//查询未绑定的sip 用户
    bindUser: data => get({url: hatUrl + "/sip/bindUser", data}),//安全帽和人员的绑定

    queryOnlineUsers: data => get({url: hatUrl + "/sip/queryOnlineUsers", data}),//获取SIP在线用户
    broadcastSave: data => post({url: hatUrl + "/broadcast/save", data}),//新增广播
    broadcastPage: data => post({url: hatUrl + "/broadcast/list", data}),//获取广播列表

    //数据采集
    sjcjList: data => post({url: hatUrl + "/media/list", data}),//获取人员列表

    //视频智能分析
    videoResultPage: data => get({url: SYSTEM_API.videoResultPage, data}),
    videoResultAudit: data => put({url: SYSTEM_API.videoResultAudit, data}),
    videoResultType: data => get({url: SYSTEM_API.videoResultType, data}),
    getVideoFwqPage: data => get({url: SYSTEM_API.videoFwqPage, data}),
    pageVideoPushRecord: data => post({url: SYSTEM_API.pageVideoPushRecord, data}),
    deleteVideoPushRecord: id => deleted({url: SYSTEM_API.deleteVideoPushRecord + '/' + id}),
    putVideoFwq: data => put({url: SYSTEM_API.videoFwq, data}),
    postVideoFwq: data => post({url: SYSTEM_API.videoFwq, data}),
    deleteVideoFwq: id => deleted({url: SYSTEM_API.videoFwq + '/' + id}), // 删除管廊段

    // 定时任务
    dingshirenwuPage: data => get({url: SYSTEM_API.dingshirenwuhttpJob + '/jobs', data}), // 定时任务分页
    addDingshirenwu: data => post({url: SYSTEM_API.dingshirenwuhttpJob + '/add', data}), // 添加定时任务
    deleteDingshirenwu: data => post({url: SYSTEM_API.dingshirenwuJob + '/delete?' + data}), // 删除定时任务
    editDingshirenwu: data => post({url: SYSTEM_API.dingshirenwuJob + '/update?' + data}), // 编辑
    zxjlDingshirenwu: data => get({url: SYSTEM_API.dingshirenwuhttpJob + '/jobLogs', data}), // 执行记录
    pauseDingshirenwu: data => post({url: SYSTEM_API.dingshirenwuJob + '/pause?' + data}), // 暂停
    resumeDingshirenwu: data => post({url: SYSTEM_API.dingshirenwuJob + '/resume?' + data}), // 恢复
    getLishijilu: data => get({url: SYSTEM_API.dingshirenwuhttpJob + '/historyJobs', data}), // 历史任务
    getjobLogs: data => get({url: SYSTEM_API.dingshirenwuhttpJob + '/jobLogs', data}), // 执行记录

    // 在线用户列表
    getUserOnlineList: data => get({url: BASTURL + "/auth/authentication/count/users", data}), // 在线用户列表
    removeToken: data => get({url: BASTURL + "/auth/authentication/removeToken", data}), // 强制下线



    // 下载文件 全局
    download: data => ajaxFile({url:URL_PROXY+ "/sys/file/download", data}).then((res) => {
        const content = res;
        const blob = new Blob([content]);

        if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = data.name;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);// 释放URL 对象
            document.body.removeChild(elink)
        } else { // IE10+下载
            navigator.msSaveBlob(blob, name)
        }
    }).catch(err => {
        console.error("导出失败");
    }),


}

