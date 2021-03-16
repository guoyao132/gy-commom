// 正则
let regexp = {
  isPassword: function (str) { //密码验证
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    var flag = reg.test(str);
    return flag; 
  },
  //签章密码校验
  isQianZhangPassword: function (str) { //密码验证
    var reg = /^[a-zA-Z0-9]{5,16}$/;
    var flag = reg.test(str);
    return flag;
  },

  isEmail: function (str) { //邮箱
    var reg = /^[A-Za-z\d]+([-_.A-Za-z\d]+)*@([A-Za-z\d]+[-_.])+[A-Za-z\d_-]{2,5}$/;
    var flag = reg.test(str);
    return flag;
  },
  isPhoneNum: function (str) { //手机号码
    var reg = /^1[3456789]\d{9}$/;
    var flag = reg.test(str);
    return flag;
  },
  isIdCard: function (str) { //校验身份证号码，15位或者18位，最后一位可以输入X
    var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    var flag = reg.test(str);
    if(str.indexOf('*')>-1){
      return true;
    }else{
      return flag;
    }
  },
  isNumeric: function (str) { //是否数值
    var reg = /^-?[0-9]+\.?[0-9]*$/;
    var flag = reg.test(str);
    return flag;
  },
  isIntNum: function (str) { //是否整数
    var reg = /^-?[0-9]*$/;
    var flag = reg.test(str);
    return flag;
  },
  isDigital: function (str) { //是否数字
    var reg = /^[0-9]+$/;
    var flag = reg.test(str);
    return flag;
  },
  isChinese: function (str) { //是否中文
    var flag = true;
    var testStr = /^[\u4e00-\u9fa5]*$/;
    return testStr.test(str);
  },
  isEnglish: function (str) {  // 是否英文
    var testStr = /^[A-Za-z]+$/;
    return testStr.test(str);
  },
  isEmpty: function (str) { //是否是空字符串
    return str.replace(/^\s+|\s+$/g, '') == "";
  },
  isImg: function (str) { //图片格式
    var reg = /.+(\.gif|\.jpg|\.jpeg|\.png)$/i;
    var flag = reg.test(str);
    return flag;
  },
  isUrl: function (str) { //是否为url路径
    return (/^(https:|http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/).test(str);
  },
}
//用弹框提示文字
// 各类型验证方法
let regMessageFun = function (obj) {
  switch (obj.type) {
    case 'email': //邮箱
      if (regexp.isEmail(obj.value)) {
        return true;
      } else {
        return '邮箱格式不正确';
      }
      break;
    case 'number': //整数
      let regStr = 'isNumeric'
      if (obj.isInt) {
        regStr = 'isIntNum';
      }
      if (obj.isDigital) {
        regStr = 'isDigital';
      }
      if (regexp[regStr](obj.value)) {
        let maxNum = Math.pow(10, obj.len);
        if (parseFloat(obj.value) > maxNum) {
          return `${obj.name}不能超过${obj.len}位数!`;
        }
        return true;
      } else {
        if (obj.isInt) {
          return `${obj.name}必须为整数!`;
        } else {
          return `${obj.name}必须为数字!`;
        }
      }
      break;

    case 'phone': //手机
      if (regexp.isPhoneNum(obj.value)) {
        return true;
      } else {
        return '手机号格式不正确';
      }
      break;

    case 'password': //密码
      if (regexp.isPassword(obj.value)) {
        return true;
      } else {
        return '不低于8位的英文和数字组合！';
      }
      break;
    case 'qzPassword': //密码
      if (regexp.isQianZhangPassword(obj.value)) {
        return true;
      } else {
        return '不低于5位的英文和数字组合！';
      }
      break;
    case 'lenControl': //长度控制
      if (obj.value.length <= obj.len) {
        return true;
      } else {
        obj.value.substring(0, obj.len);
        return `${obj.name}不能超过${obj.len}位!`;
      }
      break;
    case 'idcard': //身份证号
      if (regexp.isIdCard(obj.value)) {
        return true;
      } else {
        return '请输入正确的身份证号！';
      }
      break;

    case 'integer'://正整数
        if (/^[1-9]\d*$/.test(obj.value)){
          return true;
        } else {
          return `${obj.name}仅支持正整数！`;
        }
      break;
    default:
      return '暂无该类型';
  }
}

/*
* validatorMessage
* @gy
* @2021/3/9 11:11
* @description 正则验证
* @param {string} name     名称
* @param {string} value    值
* @param {boolean} require  是否必填
* @param {string} type  email，number，phone，password，lenControl，idcard，integer
* @param {boolean} type number isInt  是否是整数
* @param {boolean} type lenControl len  多少字符
*/
function validatorMessage(obj) {
  if(typeof obj.value == 'string'){
    let len = obj.value.length;
    obj.value = obj.value.trim();
    let len2 = obj.value.length;
    if(len != len2){
      return '文字前后请勿添加多余空格！';
    }
  }
  if (!!obj.require) { // 必填
    if (obj.type) {
      if (obj.value === 0 || obj.value) {
        return regMessageFun(obj);
      } else {
        return `请添加${obj.name}！`;
      }
    } else {
      if(Array.isArray(obj.value)){
        if (obj.value.length != 0) {
          return true;
        } else {
          return `请添加${obj.name}！`;
        }
      }else{
        if (obj.value === 0 || obj.value) {
          return true;
        } else {
          return `请添加${obj.name}！`;
        }
      }
    }
  } else { // 非必填
    if (!!obj.value) {
      return regMessageFun(obj);
    }
    return true;
  }
}

export {regexp, validatorMessage};

// 调用

