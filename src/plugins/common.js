export default {
  //小数减法
  floarSub: function (num1, num2) {
    let r1, r2, m;
    try {r1 = num1.toString().split('.')[1].length;} catch (e) {r1 = 0;}
    try {r2 = num2.toString().split(".")[1].length;} catch (e) {r2 = 0;}
    m = Math.pow(10, Math.max(r1, r2));
    let n = (r1 >= r2) ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
  },
  //小数加法
  floarAdd: function (num1, num2) {
    var r1, r2, m;
    try {r1 = num1.toString().split(".")[1].length} catch (e) {r1 = 0}
    try {r2 = num2.toString().split(".")[1].length} catch (e) {r2 = 0}
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(num1 * m + num2 * m) / m;
  },
  //小数乘法
  floarMul: function (num1, num2) {
    var m = 0, s1 = num1.toString(), s2 = num2.toString();
    try {m += s1.split(".")[1].length} catch (e) {}
    try {m += s2.split(".")[1].length} catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  floarDiv: function () {
    var t1 = 0, t2 = 0, r1, r2;
    try {t1 = arg1.toString().split(".")[1].length} catch (e) {}
    try {t2 = arg2.toString().split(".")[1].length} catch (e) {}
    r1 = Math.Number(arg1.toString().replace(".", ""));
    r2 = Math.Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
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
      alert("日期格式错误");
      return
    }
    let dataStr = "";
    let y = date.getFullYear().toString(),
      m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
      d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
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
    dataStr = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
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
  //获取上标或者下标数组
  getSmallNum(num, type){
    if(type){
      return 'º¹²³⁴⁵⁶⁷⁸⁹'.substring(num, num + 1);
    }else{
      return '₀₁₂₃₄₅₆₇₈₉'.substring(num, num + 1);
    }
  },
  //获取星期几
  convDate: function (num) {
    return '星期' + '日一二三四五六'.substr(num, 1)
  },
  //获取当前月份有多少天
  getEvryDay:function() {
    var curDate = new Date();
    /* 获取当前月份 */
    var curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    /* 返回当月的天数 */
    let day = curDate.getDate();
    return day;
  },
  //复制对象
  copyFn(obj) {
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
  }
}