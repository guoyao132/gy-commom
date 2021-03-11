import {validatorMessage} from './validator'

export default {
  //浮点数减法
  floatSub: function (num1, num2) {
    let r1, r2, m;
    try {r1 = num1.toString().split('.')[1].length;} catch (e) {r1 = 0;}
    try {r2 = num2.toString().split(".")[1].length;} catch (e) {r2 = 0;}
    m = Math.pow(10, Math.max(r1, r2));
    let n = (r1 >= r2) ? r1 : r2;
    return Number((Math.round(num1 * m - num2 * m) / m).toFixed(n));
  },
  //浮点数加法
  floatAdd: function (num1, num2) {
    var r1, r2, m;
    try {r1 = num1.toString().split(".")[1].length} catch (e) {r1 = 0}
    try {r2 = num2.toString().split(".")[1].length} catch (e) {r2 = 0}
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(num1 * m + num2 * m) / m;
  },
  //浮点数乘法
  floatMul: function (num1, num2) {
    var m = 0, s1 = num1.toString(), s2 = num2.toString();
    try {m += s1.split(".")[1].length} catch (e) {}
    try {m += s2.split(".")[1].length} catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  //浮点数出发
  floatDiv: function (arg1, arg2) {
    if (arg1 == 0 || arg2 == 0) {
      return 0;
    }
    var t1 = 0, t2 = 0, r1, r2;
    try {t1 = arg1.toString().split(".")[1].length} catch (e) {}
    try {t2 = arg2.toString().split(".")[1].length} catch (e) {}
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return Number((r1 / r2) * Math.pow(10, t2 - t1));
  },
  //格式化日期
  /**
   * time 一个日期或者时间戳(number)
   * type 需要转换时间的格式
   *      hms 返回 h:m:s
   *      ymd 返回 y-m-d
   *      其他或者不传为：y-m-d h:m:s
   *     自定义返回时间格式
   *      例 y-m-d h:M:s、 yy/m/d、h:M:s、m/d h:M:s
   *      y:年，yy:年后两位，m:月，d:日，h:时，M:分，s: 秒
   *
   * */
  formatTime: function (time, type) {
    let date = new Date(time);
    if (date == "Invalid Date") {
      console.error("日期格式错误");
      return
    }
    let dataStr = "";
    let y = date.getFullYear().toString(),
      m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
      d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    dataStr = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
    if (type === "hms") {
      dataStr = h + ":" + M + ":" + s;
    } else if (type === "ymd") {
      dataStr = y + "-" + m + "-" + d;
    }else if(type){
      dataStr = type;
      dataStr = dataStr.replace(/yy/g, y.substring(2));
      dataStr = dataStr.replace(/y/g, y);
      dataStr = dataStr.replace(/m/g, m);
      dataStr = dataStr.replace(/d/g, d);
      dataStr = dataStr.replace(/h/g, h);
      dataStr = dataStr.replace(/M/g, M);
      dataStr = dataStr.replace(/s/g, s);
    }
    return dataStr;
  },
  //判断是否为数字
  isRealNum: function (val) {
    if (val === "" || val == null) {
      return false;
    }
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  },
  //格式化科学计数法的数字
  formatNum: function (num) {
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  },
  //获取上标或者下标数字
  getSmallNum(num, type = 0){
    if(type){
      return 'º¹²³⁴⁵⁶⁷⁸⁹'.substring(num, num + 1);
    }else{
      return '₀₁₂₃₄₅₆₇₈₉'.substring(num, num + 1);
    }
  },
  //星期转汉字
  convDate: function (num = 0) {
    return '星期' + '日一二三四五六'.substr(num, 1)
  },
  //获取月份有多少天
  getMonthLen:function({year = new Date().getFullYear(), month = new Date().getMonth() + 1} = {}) {
    return new Date(year, month, 0).getDate();
  },
  //复制对象
  copyObjFn(obj) {
    if (obj == null) {
      return null
    }
    var result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = copyFn(obj[key]);  // 如果是对象，再次调用该方法自身
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  /*
  * author: g
  * time: 2020/7/16 10:52
  * @desc 根据键名比较获取对应的另一个键名的值
  * @params1 val 判断值
  * @params2 list 数组或对象
  * @params3 idCol 需要比较的键名
  * @params4 nameCol 需要获取的键名
  */
  getNameById(val, list, idCol, nameCol) {
    if (list) {
      for (let i in list) {
        if (list[i][idCol] == val)
          return list[i][nameCol];
      }
    }
    return null;
  },
  /*
  * author: g
  * time: 2020/7/17 17:58
  * @desc 树列表中 通过value和valuekey 获取指定key的值
  * @params1 treeData
  * @params2 valueKey
  * @params3 value
  * @params4 key
  */
  getTreeKeyByValkey(treeData, valueKey, value, key) {
    let result = '';

    // 递归
    let recursion = (treeData, valueKey) => {
      // treeData数据为空的时候直接返回
      if (!treeData || !treeData.length) {
        return;
      }

      for (let i = 0, len = treeData.length; i < len; i++) {
        let childs = treeData[i].children;
        if (treeData[i][valueKey] == value) {
          result = treeData[i][key]
        }
        if (childs && childs.length > 0) {
          recursion(childs, valueKey);
        }
      }
      return result || '';
    };

    return recursion(treeData, valueKey);
  },
  /*
 * author: g
 * time: 2020/7/16 10:58
 * @desc 表单验证
 * @params1 formData
 * @params2 验证规则对象
 */
  formDataValidator(formData, validatorObj){
    for (let item of Object.values(validatorObj)) {
      if (item.required || item.type || item.len) {
        if (!validatorMessage({
          require: item.required,
          value: formData[item.prop],
          name: item.label,
          type: item.type || (item.len ? 'lenControl' : ''),
          len: item.len,
          isDigital: item.isDigital
        })) {
          return false
        }
      }
    }
    return true
  },
  /*
  * author: g
  * time: 2020/7/17 17:51
  * @desc 格式化echarts数据，将数据变为一个数组，x为value的数组
  * @params1 xData x周的数据数组(需要年月日时分秒)
  * @params2 yData y周的数据数组
  */
  formatEchatsData(xData, yData) {
    let newArrData = [];
    let xNewData = [];
    let yNewData = [];
    if (Array.isArray(xData)) {
      let xIndex = 0;
      // "2017-10-01 10:01:01"
      xData.forEach((v, i) => {
        let arr1 = v.split(" ");
        let time = arr1.length > 1 ? arr1[1] : arr1[0];
        let arr2 = time.split(":");
        let xHour = parseFloat(arr2[0]);
        if (xHour == xIndex) {
          if (i === 0) {
            if (parseFloat(arr2[1]) !== 0) {
              xNewData.push(0);
              yNewData.push(null);
              newArrData.push([0, null]);
              let arr22 = 0;
              if (arr2[2]) {
                arr22 = arr2[2];
              }
              let x = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60) + (parseFloat(arr22) / 3600);
              xNewData.push(x);
              yNewData.push(yData[i]);
              newArrData.push([x, yData[i]]);
            } else {
              xNewData.push(0);
              yNewData.push(yData[i]);
              newArrData.push([0, yData[i]]);
            }
          } else {
            let arr22 = 0;
            if (arr2[2]) {
              arr22 = arr2[2];
            }
            let x = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60) + (parseFloat(arr22) / 3600);
            xNewData.push(x);
            yNewData.push(yData[i]);
            newArrData.push([x, yData[i]]);
          }
        } else {
          let len = xHour - xIndex;
          if (i === 0) {
            xNewData.push(0);
            yNewData.push(null);
            newArrData.push([0, null]);
          }
          for (let j = 1; j < len; j++) {
            xNewData.push(xIndex + j);
            if (yNewData.length > 0) {
              //是否需要给有间隔的数据添加数据
              // yNewData.push(yNewData[yNewData.length - 1]);
              // newArrData.push([xIndex + j, yNewData[yNewData.length - 1]]);
            } else {
              yNewData.push(null);
              newArrData.push([xIndex + j, null]);
            }
          }
          if (parseFloat(arr2[1]) !== 0) {
            //是否需要给有间隔的数据添加数据
            // xNewData.push(parseFloat(arr2[0]));
            // yNewData.push(yNewData[yNewData.length - 1]);
            // newArrData.push([parseFloat(arr2[0]), yNewData[yNewData.length - 1]]);
            let arr22 = 0;
            if (arr2[2]) {
              arr22 = arr2[2];
            }
            let x = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60) + (parseFloat(arr22) / 3600);
            x = parseFloat(x.toFixed(2));
            xNewData.push(x);
            yNewData.push(yData[i]);
            newArrData.push([x, yData[i]]);
          } else {
            let arr22 = 0;
            if (arr2[2]) {
              arr22 = arr2[2];
            }
            let x = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60) + (parseFloat(arr22) / 3600);
            x = parseFloat(x.toFixed(2));
            xNewData.push(x);
            yNewData.push(yData[i]);
            newArrData.push([x, yData[i]]);
          }
        }
        xIndex = xHour;
      })
      return newArrData
    } else {
      return [];
    }
  },
  //将时分秒变为数字
  formatHourToNum(v) {
    if (!v) {
      v = '';
    }
    let arr1 = v.split(" ");
    let time = arr1.length > 1 ? arr1[1] : arr1[0];
    let arr2 = time.split(":");
    let arr22 = 0;
    if (arr2[2]) {
      arr22 = arr2[2];
    }
    let x = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60) + (parseFloat(arr22) / 3600);
    return x;
  },
}