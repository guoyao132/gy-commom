// import store from '@/store'
import axios from 'axios'
import {Loading} from 'element-ui'
import resetMessage from '../../assets/js/message'
const Message = resetMessage;
import qs from 'qs'
import {router} from '@/router/router';
// import routerVis from '@/packDir/vis/router';

//国密包引入
const SM4 = require('gm-crypt').sm4


const encryptionUrlArr=[
  /* {name:'用户添加编辑保存',url:'/sys/user/save'},
  {name:'用户添加编辑保存',url:'/sys/user/save'},
  {name:'修改密码',url:'/sys/user/changePassword'},
  {name:'登录',url:'/auth/oauth/token'}, */
]


/** 控制是否加密 **/
// const enableAES = true;


function strToHexCharCode(str) {
  if(str === "")
    return "";
  var hexCharCode = [];
  hexCharCode.push("0x");
  for(var i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16));
  }
  return hexCharCode.join("");
}

const cipherMode = 1; // 1 - C1C3C2，0 - C1C2C3，默认为1

let getAesKey = function (len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  var maxPos = $chars.length;
  var keyStr = '';
  for (let i = 0; i < len; i++) {
    keyStr += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return keyStr;
};
var  aeskey = getAesKey().toString().substring(0, 16);
// aeskey='2XyA2w6NWhQmCkY3'
// aeskey='4h5yw5HbiwZyfRa6'
//sm4 配置config
let sm4Config = {
  // sm4 密钥
  key: aeskey,
  // key: 'Fd6xZfwz5JizJinM',

  // 加密模式cbc 或 ecb
  mode: 'ecb', // default

  // optional; when use cbc mode, it's �necessary
  iv: 'UISwD9fW6cFh9SNS', // default is null

  // 类型，base64 或 text
  cipherType: 'base64' // default is base64
}

//加密
let sm4 = new SM4(sm4Config)
// let plaintext = "{name:jijiangchuan,age:18}"
// let ciphertext = sm4.encrypt('n+7tOni4o8FLWF9P8bMGfxs3N7jtYSfSDjA+eYOK/6Vcu/7xUMCJ+U4uSu9g30yHdHFQP0HTNXx78KJ03bhEFscKxCDzRRfx1Y914cHkORGrLX9W3u8E9OLZ8fCqu+gvwDTuFhStMUREoC4bl96pFvkhNHxoaWzBRKiB0FbA5N8=')

//解密
// let ciphertext1 = ciphertext
// let plaintext1 = sm4.decrypt('n+7tOni4o8FLWF9P8bMGfxs3N7jtYSfSDjA+eYOK/6Vcu/7xUMCJ+U4uSu9g30yHdHFQP0HTNXx78KJ03bhEFscKxCDzRRfx1Y914cHkORGrLX9W3u8E9OLZ8fCqu+gvwDTuFhStMUREoC4bl96pFvkhNHxoaWzBRKiB0FbA5N8=')

/** 后端给的国网 SM2 的公钥 **/
var publicKey='041CB0B7F9910687E87836EB28F46875448B25E78B103C7E0E750F7D00626CB51CE25C4DAAC7745EDAF538001F79F8BD4C0ECC14F4E838A75893749B6066731B6B';

/** 用 SM2 的公钥加密 SM4 的key **/
const enKey = smEncrypt.sm2Encrypt(aeskey, publicKey)


// 创建一个错误
function errorCreate(msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog(error) {

  // if (!(error.response && error.response.data && error.response.data.errorCode == 'SYS.0017')) {
  //   // 显示提示
  //   Message({
  //     message: error.message,
  //     type: 'info',
  //     duration: 8 * 1000
  //   })
  // }

}

// JSON axios
axios.defaults.transformRequest = [function (data, config) {
  if (config['Content-Type'] == 'application/x-www-form-urlencoded') {
    return qs.stringify(data);
  } else if (config['Content-Type'] == 'application/json') {
    return JSON.stringify(data);
  } else {
    return data;
  }

}];
// 创建一个 axios 实例
const service = axios.create({
  // baseURL: 'http://192.168.1.99:10000',
  timeout: 300000 // 请求超时时间
})

// 请求拦截器
let loadingInstance;
var i = 0;

service.interceptors.request.use(
  config => {
    if (config.url.indexOf('auth/oauth/token') >= 0
      || config.url.indexOf('svg/rtDaxingerzhiModbus') >= 0
      || config.url.indexOf('/dpweb/jiexiantu/loadJiexiantuDataNew') >= 0
    ) {
    } else {
      config.headers['Authorization'] = sessionStorage.getItem("zhxd_token") ? 'bearer' + sessionStorage.getItem("zhxd_token") : '';
    }
    // 在请求发送之前做一些处理
    // const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    let postNoloading = false;
    if(config.method == 'post'){
      let postData = config.data;
      if(postData && postData.noLoading){
        postNoloading = true;
      }
    }
    if (!((config.params && config.params.noLoading) || postNoloading)) {
      i++
      loadingInstance = Loading.service({ //加载loading
        fullscreen: true,
        text: 'Loading',
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }


    let enableSta=false;
    encryptionUrlArr.forEach((v,k)=>{
      if(config.url.indexOf(v.url)>-1){
        enableSta=true;
        return enableSta
      }

    })

    //enableSta  = true:加密 , window.encryption.enableAES = true :加密
    if(!enableSta && !window.encryption.enableAES){
        return config;
    }

    /*  密码加密需求前加密配置方案代码 ↓ */
    // if (!window.encryption.enableAES) {
    //   return config;
    // }
    /*  密码加密需求前加密配置方案代码 ↑ */


    // if(config.headers['Content-Type'].indexOf('application/json')==-1){
    //   return config;
    // }


    if (config.data&&config.data.toString() == "[object FormData]") {
      let headers = config.headers;
      // var myFormData = new FormData();//new 出来得对象有问题
      var fileData = new Array();
      var objData = {};
      var objF={};
      var delEntity = new Array();
      var ent = config.data.entries();
      while (true) {
        var entry = ent.next();
        if (entry.done) {
          break;
        }
        if (entry.value[1].type == undefined) {
          // objData[entry.value[0]] = entry.value[1];
          let key=entry.value[0];
          let value=entry.value[1];
          delEntity.push({[key]:value});
          // config.data.delete(key)
        }
        // else {
        //   // fileData.push(entry.value[1])
        //   myFormData.append('flie',entry.value[1]);
        //
        // }
      }
      //增加文件md5的校验
      if(delEntity && delEntity[0]){

        config.data.append("zhxd-data", sm4.encrypt(JSON.stringify(delEntity[0])));
        headers["sm4-key"] = enKey;//国网加密设置 header 头；
      }
      // myFormData.append("zhxd-data", sm4.encrypt(JSON.stringify(delEntity[0])));
      // config.data=myFormData;
      return config

    }
    let url = config.url;
    let whIndex = url.indexOf("?");
    let urlPObj = null;
    if (whIndex != -1) {
      let newUrl = url.substring(0, whIndex);
      config.url = newUrl;
      let p = url.substring(whIndex + 1);
      let pArr = p.split("&");
      urlPObj = {};
      pArr.forEach(v => {
        let vArr = v.split("=");
        if (vArr.length > 1) {
          urlPObj[vArr[0]] = vArr[1];
        }
      })
    }
    let params = config.params;//大兴post
    let datas = config.data;//可视化post
    let signdata = "";
    let signdataD = "";
    if (params || urlPObj || datas) {
      params || (params = {});
      datas || (datas = {});
      urlPObj || (urlPObj = {});
      let newP = {};
      let newD = {};
      newP = {...params, ...urlPObj};
      newD = datas;

      signdata = JSON.stringify(newP);
      signdataD = JSON.stringify(newD);
      // let str = encrypt(signdata);
      let str = sm4.encrypt(signdata);//国网加密数据
      let strD = sm4.encrypt(signdataD);//国网加密数据
      let obj = {
        "zhxd-data": str
      };
      let objD = {
        "zhxd-data": strD
      };

      config.params = JSON.stringify(newP) == '{}' ? {} : obj;
      config.data = JSON.stringify(newD) == '{}' ? {} : objD;

    }
    let headers = config.headers;


    headers["sm4-key"] = enKey;//国网加密设置 header 头；
    return config
  },
  error => {
    // 发送失败
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    let params = response.config.params;

    let config = response.config;

    let postNoloading = false;
    if(config.method == 'post'){
      let str = config.data;
      if(typeof str == 'string' && str.indexOf('noLoading') != -1){
        postNoloading = true;
      }
    }
    if(!((params && params.noLoading) || postNoloading)){
      i--;
    }
    (i <= 0) && loadingInstance && loadingInstance.close && setTimeout(() => {
      loadingInstance.close();
    }, 500);
    let status ;
    let dataAxios;

    let enableSta=false;
    encryptionUrlArr.forEach((v,k)=>{
      if(response.config.url.indexOf(v.url)>-1){
        enableSta=true;
        return enableSta
      }

    })


    if (enableSta||window.encryption.enableAES && (response.headers['content-type'] && response.headers['content-type'].indexOf('application/json')>-1)) {

      if(response && response.data && response.data['zhxd-data']){
        dataAxios =  JSON.parse(sm4.decrypt(response && response.data && response.data['zhxd-data']))
      }else{
        dataAxios = response && response.data;
      }
      status = dataAxios.status;
    } else {
      dataAxios =  response.data
      status = dataAxios.status;
    }
    if (status == "SUCCEED" ||status == "WARRING" || status == undefined) {////其中 undefined 针对导出数据字节流的情况

      // if (enableAES) {
      //   // return JSON.parse(decrypt(dataAxios));//原来解密
      //   // JSON.parse(sm4.decrypt(dataAxios)),
      //   // return JSON.parse(sm4.decrypt(dataAxios));//国网解密
      // } else {
      //   return dataAxios;
      // }

      return dataAxios;

    } else {
      if (dataAxios.errorMessage) {
        Message({
          message: dataAxios.errorMessage || "服务器内部错误!",
          type: 'info'
        });
      }
      return Promise.reject(response.data);
    }
  },
  error => {
    var _this = this;
    var msgData=null;

    let enableSta=false;
    encryptionUrlArr.forEach((v,k)=>{
      if(error.response.config.url.indexOf(v.url)>-1){
        enableSta=true;
        return enableSta
      }

    })

    if (enableSta||window.encryption.enableAES) {
      if(error.response.status=='478'||error.response.status=='401'){
        msgData=  error.response.data
      }else{
        msgData =  JSON.parse(sm4.decrypt(error.response.data['zhxd-data']))
      }
    } else {

      msgData =  error.response.data
    }


    let config = error.response.config;
    let params = config.params;
    let postNoloading = false;
    if(config.method == 'post'){
      let str = config.data;
      if(typeof str == 'string' && str.indexOf('noLoading') != -1){
        postNoloading = true;
      }
    }
    if(!((params && params.noLoading) || postNoloading)){
      i--;
    }
    (i <= 0) && loadingInstance.close();

    if (error && error.response) {

      var status = error.response.status;

      if (status == 478) {// 验证码错误相关问题，此处需要单独在 login.vue 中处理；
        Message({
          message: msgData.errorMessage,
          type: 'info'
        });
      } else if (status == 401) { // 此处需要单独在 login.vue 中处理；
          if(msgData.errorCode != 'SYS.0017'){

          Message({
            message: msgData.errorMessage,
            type: 'info'
          });
        }else{
          if(window.zhxdSafetyHat){
            window.zhxdSafetyHat.close();
            console.info('关闭WebSocket')
          }
        }

        if(window.location.href.indexOf('startexam') != -1){
          router.replace('/answerlogin')
        }else{
          router.replace('/login')
        }
        return
      } else if(status == 403){
        router.push({
          name: 'errorPage',
          replace: true,
          params: {
            status: status
          }
        })
        return
      } else { //其他错误错误码统一弹框
        let url = (error.response && error.response.config && error.response.config.url) || '';
        if(status == 404 && url.indexOf('file') != -1){
          Message({
            message: "文件已被删除！",
            type: 'info'
          });
        }else{
          Message({
            message: msgData.errorMessage  || "服务器内部错误!",
            type: 'info'
          });
        }

      }

      // switch (error.response.status) {
      //   case 400:
      //     error.message = '请求错误';
      //     break
      //   case 401:
      //     error.message = '未授权，请登录';
      //     break
      //   case 403:
      //     error.message = '拒绝访问';
      //     break
      //   case 404:
      //     error.message = `请求地址出错: ${error.response.config.url}`;
      //     break
      //   case 408:
      //     error.message = '请求超时';
      //     break
      //   case 500:
      //     error.message = '服务器内部错误';
      //     break
      //   case 501:
      //     error.message = '服务未实现';
      //     break
      //   case 502:
      //     error.message = '网关错误';
      //     break
      //   case 503:
      //     error.message = '服务不可用';
      //     break
      //   case 504:
      //     error.message = '网关超时';
      //     break
      //   case 505:
      //     error.message = 'HTTP版本不受支持';
      //     break
      //   default:
      //     break
      // }

    }
    errorLog(error)
    return Promise.reject(error)
  }
)


// JSON axios
const get = (data) => {
  return service({
    method: "get",
    url: data.url,
    params: data.data,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: data.auth
  })
}

// JSON axios
const post = (data) => {
  return service({
    method: "post",
    url: data.url,
    data: data.data,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: data.auth
  })
}
const put = (data) => {
  return service({
    method: "put",
    url: data.url,
    data: data.data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-8'
    }
  })
}
const deleted = (data) => {
  return service({
    method: "delete",
    url: data.url,
    data: data.data,
  })
}


const postFormdata = (data) => {
  return service({
    method: "post",
    url: data.url,
    data: data.data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: data.auth
  })
}

/* 下载文件、上传文件  表单提交
*
*  ①如果表单提交，并且返回的数据类型为json 时，需要传入   responseType:'json' ,method:'post'
*  ②上传和下载文件时：根据具体情况传入 method 和 contenType 此时不需要传入 responseType
*
* */
const ajaxFile = (data) => {
  // params: data.data,
  let opt = {
    method: data.method || "get",
    url: data.url,
    responseType: data.responseType || 'blob',// 表明返回服务器返回的数据类型
    headers: {
      'Content-Type': data.contenType || 'multipart/form-data'
    }
  };
  if(data.method == 'post'){
    opt.data = data.data;
  }else{
    opt.params = data.data;
  }
  return service(opt)
}

const base_url = '/robot'
function service_p (param) {
  return service(Object.assign({ method: 'post' }, param,
    {url: `${proxy}${base_url}${param.url}`},
    {headers: { 'Content-Type': 'application/json'}},
  )).then(res => {
    if (res) {
      return res.result
    } else {
      return  []
    }
  })
}

function service_p_formData (param) {
  return service(Object.assign({ method: param.method }, param,
    {url: `${proxy}${base_url}${param.url}`},
    {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}},
  )).then(res => {
    if (res) {
      return res.result
    } else {
      return  []
    }
  })
}
export {get, post, put, deleted, ajaxFile, postFormdata, axios, service}



