/*
* 数组原型中添加remove 方法，
*
* */
import resetMessage from '../../assets/js/message'
import {gcj02towgs84} from "./transformlat"

const Message = resetMessage;
import {validatorMessage} from './validator'


var mso;
var mySipInfo;
var HOTTHIS = null;
// var INITINTERVAL=null;

export default {
  bd09togcj02(lon, lat){
    return bd09togcj02(Number(lon), Number(lat));
  },
  gcj02tobd09(lon, lat){
    return gcj02tobd09(Number(lon), Number(lat));
  },
  wgs84togcj02(lon, lat){
    return wgs84togcj02(Number(lon), Number(lat));
  },
  gcj02towgs84(lon, lat){
    return gcj02towgs84(Number(lon), Number(lat));
  },
  bd09towgs84(lon, lat){
    return bd09towgs84(Number(lon), Number(lat));
  },
  wgs84tobd09(lon, lat){
    return wgs84tobd09(Number(lon), Number(lat));
  },
  deepMerge(obj1, obj2) {
    let key;
    for (key in obj2) {
      if(!obj1[key]){
        obj1[key] = obj2[key]
        continue;
      }
      obj1[key] =
        obj1[key] &&
        (obj2[key] && obj2[key].toString() === "[object Object]")
          ? this.deepMerge(obj1[key], obj2[key])
          : ((Array.isArray(obj2[key]))
          ? this.deepArrMerge(obj1[key], obj2[key])
          : obj1[key] = obj2[key]);
    }
    return obj1;
  },
  /*
  * author: g
  * time: 2020/9/7 15:34
  * @desc 删除数组某个值
  * @params
  */
  arrRemoveVal(arr, val){
    var index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  },
  /*
  * author: g
  * time: 2020/8/28 9:20
  * @desc 水印
  * @params
  */

  watermark({t1, t2, t3,
              id,
              defaultSettings = {
                watermark_color: '#0e8eb5', //水印字体颜色
                watermark_alpha: 0.1, //水印透明度
                watermark_fontsize: '17px', //水印字体大小
                watermark_font: '微软雅黑',
                watermark_width: 200, //水印宽度
                watermark_height: 80, //水印长度
                watermark_angle: 15, //水印倾斜度数
              },
              intervalWidth = 300,
              intervalheight = 100,
              isOne = false,
  }) {
    var maxWidth = document.documentElement.clientWidth;
    var maxHeight = document.documentElement.clientHeight;
    var rowNumber = (maxWidth - 40 - 200) / intervalWidth;    //横向个数
    var coumnNumber = (maxHeight - 40 - 150) / intervalheight;   //纵向个数
    if(document.getElementById('shuiyin')){
      document.getElementById('shuiyin').remove();
    }
    var _temp = document.createElement('div');
    let addMarkFun = (x, y) => {
      var mark_div = document.createElement('div');
      mark_div.id = 'mark_div' + i + j;
      mark_div.className = 'mark_div';
      var span0 = document.createElement('div');
      span0.appendChild(document.createTextNode(t1));
      if(t2){
        var span1 = document.createElement('div');
        span1.appendChild(document.createTextNode(t2));
        mark_div.appendChild(span1);
      }
      if(t3){
        var span2 = document.createElement('div');
        span2.appendChild(document.createTextNode(t3));
        mark_div.appendChild(span2);
      }
      mark_div.appendChild(span0);
      //设置水印div倾斜显示
      mark_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.visibility = "";
      mark_div.style.left = x + 'px';
      mark_div.style.top = y + 'px';
      mark_div.style.overflow = "hidden";
      mark_div.style.zIndex = "9999";
      mark_div.style.pointerEvents = 'none'; //pointer-events:none  让水印不阻止交互事件
      mark_div.style.opacity = defaultSettings.watermark_alpha;
      mark_div.style.fontFamily = defaultSettings.watermark_font;
      mark_div.style.color = defaultSettings.watermark_color;
      mark_div.style.textAlign = "center";
      mark_div.style.display = "block";
      if(isOne){
        mark_div.style.display = "flex";
        mark_div.style.justifyContent = "center";
        mark_div.style.alignItems = "center";
        mark_div.style.fontSize = '12em';
        mark_div.style.position = "fixed";
        mark_div.style.width = '100%';
        mark_div.style.height = '100%';
      }else{
        mark_div.style.fontSize = defaultSettings.watermark_fontsize;
        mark_div.style.position = "absolute";
        mark_div.style.width = defaultSettings.watermark_width + 'px';
        mark_div.style.height = defaultSettings.watermark_height + 'px';
      }
      _temp.appendChild(mark_div);
    }
    _temp.id = 'shuiyin'
    if(isOne){
      addMarkFun(0, 0);
    }else{
      for (var i = 0; i < rowNumber; i++) {
        for (var j = 0; j < coumnNumber; j++) {
          var x = intervalWidth * i + 20;
          var y = intervalheight * j + 30;
          addMarkFun(x, y);
        }
      }
    }

    if(id){
      document.getElementById(id).appendChild(_temp)
    }else{
      document.body.appendChild(_temp);
    }
  },

  daochuFun(fun, searchKeys, name) {
    fun(searchKeys).then(resp => {
      const content = resp;
      const blob = new Blob([content]);
      const fileName = name;
      if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink)
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    })
  },
  downFileSuccFun(resp, name) {
    const content = resp;
    const blob = new Blob([content]);
    const fileName = name;
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a');
      elink.download = fileName;
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  },

  /*
  * author: g
  * time: 2020/7/21 14:08
  * @desc 获取周一和周日日期
  * @return [mon, sun] Date格式
  */
  getMonSunDate(nowDate) {
    nowDate = new Date(nowDate);
    let day = nowDate.getDay();
    (day == 0) && (day = 7);
    let start = new Date(nowDate.setDate(nowDate.getDate() - (day - 1)));
    let end = new Date(new Date(start).setDate(start.getDate() + 6));
    return [start, end]
  },
  /*
  * author: g
  * time: 2020/7/21 14:09
  * @desc 获取一周的日期数组
  * @return 数组 数据格式为Date
  */
  getWeekArr(nowDate) {
    let [start, end] = this.getMonSunDate(nowDate);
    let arr = [new Date(start)];
    for (let i = 0; i < 6; i++) {
      start.setDate(start.getDate() + 1);
      arr.push(new Date(start));
    }
    return arr;
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

  /*删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
  removeArray(_arr, _obj, key = 'id') {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
      if (_arr[i][key] == _obj) {
        if (i == 0) {
          _arr.shift(); //删除并返回数组的第一个元素
          return _arr;
        } else if (i == length - 1) {
          _arr.pop();  //删除并返回数组的最后一个元素
          return _arr;
        } else {
          _arr.splice(i, 1); //删除下标为i的元素
          return _arr;
        }
      }
    }
  },
  /*
  * author: g
  * time: 2020/7/16 10:58
  * @desc 表单验证
  * @params1 formData
  * @params2 验证规则对象
  */
  formDataValidator(formData, validatorObj) {
    for (let item of Object.values(validatorObj)) {
      if (item.required || item.type || item.len) {
        if (!validatorMessage({
          require: item.required,
          value: formData[item.prop],
          name: item.label,
          type: item.type || (item.len ? 'lenControl' : ''),
          len: item.len,
          isDigital: item.isDigital,
          isInt: item.isInt
        })) {
          return false
        }
      }
    }
    return true
  },

  //格式化日期
  /**
   * time 一个日期或者时间戳(number)
   * type 需要转换时间的格式
   *      hms 返回 h:m:s
   *      ymd 返回 y-m-d
   *      其他或者不传为：y-m-d h:m:s
   * customFormat 自定义返回时间格式
   *      例 y-m-d h:M:s、 yy/m/d、h:M:s、m/d h:M:s
   *      y:年，yy:年后两位，m:月，d:日，h:时，M:分，s: 秒
   *
   * */
  formatTime: function (time, type, customFormat) {
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
    if (customFormat) {
      customFormat = customFormat.replace(/yy/g, y.substring(2));
      customFormat = customFormat.replace(/y/g, y);
      customFormat = customFormat.replace(/m/g, m);
      customFormat = customFormat.replace(/d/g, d);
      customFormat = customFormat.replace(/h/g, h);
      customFormat = customFormat.replace(/M/g, M);
      customFormat = customFormat.replace(/s/g, s);
      return customFormat;
    } else {
      if (type === "hms") {
        dataStr = h + ":" + M + ":" + s;
      } else if (type === "ymd") {
        dataStr = y + "-" + m + "-" + d;
      }
    }
    return dataStr;
  },
  timeDifference(date, date2, timeDiff) {
    var kaishi = date; //开始时间
    var jieshu = null;
    if (date2) {
      jieshu = date2;
    } else {
      jieshu = new Date();
    } //结束时间
    if (!timeDiff) {
      timeDiff = 0;
    }
    var dateDiff = jieshu.getTime() - kaishi.getTime() - timeDiff; //时间差的毫秒数
    //计算出相差天数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    seconds >= 0 && seconds < 10 && (seconds = "0" + seconds);
    minutes >= 0 && minutes < 10 && (minutes = "0" + minutes);
    hours < 10 && (hours = "0" + hours);
    var shijian =
      dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    if (parseFloat(dayDiff)) {
      shijian =
        dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    } else {
      if (parseFloat(hours)) {
        shijian = hours + "小时" + minutes + "分钟" + seconds + "秒";
      } else {
        shijian = minutes + "分钟" + seconds + "秒";
      }
    }
    return shijian;
  },
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
              yNewData.push(yNewData[yNewData.length - 1]);
              newArrData.push([xIndex + j, yNewData[yNewData.length - 1]]);
            } else {
              yNewData.push(null);
              newArrData.push([xIndex + j, null]);
            }
          }
          if (parseFloat(arr2[1]) !== 0) {
            xNewData.push(parseFloat(arr2[0]));
            yNewData.push(yNewData[yNewData.length - 1]);
            newArrData.push([parseFloat(arr2[0]), yNewData[yNewData.length - 1]]);
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

  tableRowClassName: function ({row, rowIndex}) {
    if (rowIndex % 2 == 1) {
      return 'lightColor';
    } else {
      return 'darkColor';
    }
    return '';
  },

  cloneObj: function (obj) {
    var copy;
    switch (typeof obj) {
      case "undefined":
        break;
      case "number":
        copy = obj - 0;
        break;
      case "string":
        copy = obj + "";
        break;
      case "boolean":
        copy = obj;
        break;
      case "object":  //object分为两种情况 对象（Object）和数组（Array）
        if (obj === null) {
          copy = null;
        } else {
          if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
            copy = [];
            for (var i = 0; i < obj.length; i++) {
              copy.push(this.cloneObj(obj[i]));
            }
          } else {
            copy = {};
            for (var j in obj) {
              copy[j] = this.cloneObj(obj[j]);
            }
          }
        }
        break;
      default:
        copy = obj;
        break;
    }
    return copy;

  },

// 遍历ID获取name
  idToName(treeData, id) {
    let result = '';

    // 递归
    let recursion = (treeData, id) => {
      // treeData数据为空的时候直接返回
      if (!treeData || !treeData.length) {
        return;
      }

      for (let i = 0, len = treeData.length; i < len; i++) {
        let childs = treeData[i].children;
        if (treeData[i].id == id) {
          result = treeData[i].name
        }
        if (childs && childs.length > 0) {
          recursion(childs, id);
        }
      }
      return result || '';
    };

    return recursion(treeData, id);
  },
  /*
  * idToValueByKeyDefined
  * @gy
  * @2021/3/11 17:57
  * @description 根据id获取对应key值
  */
  idToValueByKeyDefined(treeData, id, key) {
    let result = '';

    // 递归
    let recursion = (treeData, id) => {
      // treeData数据为空的时候直接返回
      if (!treeData || !treeData.length) {
        return;
      }

      for (let i = 0, len = treeData.length; i < len; i++) {
        let childs = treeData[i].children;
        if (treeData[i].id == id) {
          result = treeData[i][key]
        }
        if (childs && childs.length > 0) {
          recursion(childs, id);
        }
      }
      return result || '';
    };

    return recursion(treeData, id);
  },

  /*
  * idToValueDefinedByKeyDefined
  * @gy
  * @2021/3/11 17:57
  * @description 根据指定valuekey和指定的value值获取对应key值
  */
  idToValueDefinedByKeyDefined(treeData, valueKey, value, key) {
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
  // 移除当前树节点
  removeNode(arr, id) {
    arr.forEach((v, k) => {
      if (v.id == id) {
        if (arr instanceof Array) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
              arr.splice(i, 1);
              i--;
            }
          }
        }
        arr.splice(i, 1);
      } else {
        if (v.children) {
          this.removeNode(v.children, id);
        }
      }
    })
    return arr;
  },
  //查找当前节点的指定父节点
  parentsUntil(el, selector, filter) {
    const result = [];
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    // match start from parent
    el = el.parentElement;
    while (el && !matchesSelector.call(el, selector)) {
      if (!filter) {
        result.push(el);
      } else {
        if (matchesSelector.call(el, filter)) {
          result.push(el);
        }
      }
      el = el.parentElement;
    }
    return result;
  },

  //表格 有些行中 根据某些参数值相同进行合并时 调用此方法
  getRowIndex(objArr, index) {
    return objArr[index]._rs === 0 ? this.getRowIndex(objArr, index - 1) : index;
  },


  spanMethod(name) {
    var _this = this;
    // name 需要做相邻合并的属性名称
    var a = []; // 做一个二维数组


    return function objectSpanMethod({row, column, rowIndex, columnIndex}) {

      // 合并第nameClunmnIndex列
      if (column.property === name) {
        let aI = a[columnIndex] && a[columnIndex][rowIndex];

        if (!aI) {
          // 未判断过的进行相关处理
          if (!a[columnIndex]) {
            a[columnIndex] = [];
          }

          aI = {
            _rs: 1,
            _cs: 1,
            [name]: row[name],
          };

          a[columnIndex][rowIndex] = aI;

          if (rowIndex && a[columnIndex][rowIndex - 1][name] === row[name]) {
            // 如果不是第一个参数 且上一个参数和这一个参数相同

            // 隐藏这个参数
            aI._rs = 0;
            aI._cs = 0;

            a[columnIndex][
              _this.getRowIndex(a[columnIndex], rowIndex - 1)
              ]._rs += 1;
          }

        }

        return [aI._rs, aI._cs]
      }
    };

  },

  //筛选树形table数据
  searchChildrenFilter(data, val, key) {
    key || (key = 'name');
    if (data[key].indexOf(val) != -1) {
      return true;
    } else {
      if (data.children && Array.isArray(data.children)) {
        let children = [];
        let newChild = data.children;
        for (let i = 0; i < newChild.length; i++) {
          let v = newChild[i];
          if (this.searchChildrenFilter(v, val, key)) {
            children.push(v);
          }
        }
        data.children = children;
        if (data.children.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },

  //小数乘法
  flortMul: function (num1, num2) {
    var m = 0, s1 = num1.toString(), s2 = num2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  //除法
  flortDiv: function (num1, num2) {
    if (num2 == 0) {
      return 0;
    }
    var t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = num1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
      t2 = num2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  },
  //小数加法
  flortAdd: function (num1, num2) {
    var r1, r2, m;
    try {
      r1 = num1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = num2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(num1 * m + num2 * m) / m;
  },
  //小数减法
  flortSub: function (num1, num2) {
    let r1, r2, m;
    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    let n = (r1 >= r2) ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
  },
  //获取本月最大天数
  getEvryDay: function (date) {
    var curDate = date ? new Date(date) : new Date();
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    let day = curDate.getDate();
    return day;
  },


  keyToVal: function (key, val, arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] == value) {
        return arr[i][val]
      }
    }
  },

  objectSpanMethod({row, column, rowIndex, columnIndex}) {
    const span = column['property'] + '-span'
    if (row[span]) {
      return row[span]
    }
  },

  mergeTableRow(data, merge) {
    if (!merge || merge.length === 0) {
      return data
    }
    let keyType = "";
    let mList = {};
    let prevKey = null;
    merge.forEach((m, i) => {
      mList = {};
      data = data.map((v, index) => {
        const rowVal = v[m];
        if (i != 0) {
          let str = '';
          for (let n = 0; n < i; n++) {
            let mergeKey = merge[n];
            str += v[mergeKey];
          }
          keyType = str;
        }
        let key = keyType + rowVal;
        if(prevKey && (key != prevKey) && mList[key]){
          mList[key] = null;
        }
        prevKey = key;
        if (mList[key]) {
          mList[key]++
          data[index - (mList[key] - 1)][m + '-span'].rowspan++
          v[m + '-span'] = {
            rowspan: 0,
            colspan: 0
          }
        } else {
          mList[key] = 1
          v[m + '-span'] = {
            rowspan: 1,
            colspan: 1
          }
        }
        return v
      })
    })
    return data;
  },

  //接口数组转为对象
  getObjforAjax(vue, urlFun, arrName, keyName, callback) {
    vue.$dxcjAjax[urlFun]().then(resp => {
      let result = resp.result;
      if (result) {
        let obj = {};
        if (Array.isArray(result)) {
          result.forEach(v => {
            let key = v[keyName];
            obj[key] = v;
          })
        }
        vue.$data[arrName] = obj;
        if (callback) {
          callback();
        }
      }
    })
  },

  // 树转一维数组
  tree2array: function (tree, child) { // this.$common.tree2array(data, 'children');
    let lists = [];
    let toArr = function (children, child) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i][child];
        lists.push(children[i]);
        if (c && c.length > 0) {
          toArr(c, child);
        }
      }
    }
    toArr(tree, child);
    return lists;
  },

  type(para) {
    return Object.prototype.toString.call(para)
  },
  unique(arr) {
    return [...new Set(arr)]
  },
  inherit(Target, Origin) {
    function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    // 最终的原型指向
    Target.prop.uber = Origin.prototype;
  },
  getUrlParam(sKey) {
    let sUrl = location.href;
    var result = {};
    sUrl.replace(/(\w+)=(\w+)(?=[&|#])/g, function (ele, key, val) {
      if (!result[key]) {
        result[key] = val;
      } else {
        var temp = result[key];
        result[key] = [].concat(temp, val);
      }
    })
    if (!sKey) {
      return result;
    } else {
      return result[sKey] || '';
    }
  },
  addClass(elm, newClass) {
    var classes = elm.className.split(' ');
    var classIndex = this.hasClass(elm, newClass);
    if (classIndex == -1) classes.push(newClass);
    elm.className = classes.join(' ');
  },

  hasClass(elm, className) {
    var classes = elm.className.split(' ');
    for (var a in classes) {
      if (classes[a] == className) return a;
    }
    return -1;
  },

  delClass(elm, className) {
    var classes = elm.className.split(' ');
    var classIndex = this.hasClass(elm, className);
    if (classIndex != -1) classes.splice(classIndex, 1);
    elm.className = classes.join(' ');
  }

}


