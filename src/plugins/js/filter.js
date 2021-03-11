export const dateFormat = (fmStr, time) => {
  fmStr = fmStr.replace(/Y/g, 'y')
  const weekCN = '一二三四五六日';
  const weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let milliSeconds = time.getMilliseconds();
  let week = time.getDay();

  month = month >= 10 ? month : ('0' + month);
  day = day >= 10 ? day : ('0' + day);
  hours = hours >= 10 ? hours : ('0' + hours);
  minutes = minutes >= 10 ? minutes : ('0' + minutes);
  seconds = seconds >= 10 ? seconds : ('0' + seconds);

  if (fmStr.indexOf('yyyy') !== -1) {
    fmStr = fmStr.replace('yyyy', year);
  } else {
    fmStr = fmStr.replace('yy', (year + '').slice(2));
  }
  fmStr = fmStr.replace('mm', month);
  fmStr = fmStr.replace('dd', day);
  fmStr = fmStr.replace('hh', hours);
  fmStr = fmStr.replace('MM', minutes);
  fmStr = fmStr.replace('ss', seconds);
  fmStr = fmStr.replace('SSS', milliSeconds);
  fmStr = fmStr.replace('W', weekCN[week - 1]);
  fmStr = fmStr.replace('ww', weekEN[week - 1]);
  fmStr = fmStr.replace('w', week);

  return fmStr;
}

// 数字转大写
export const amountMoneyUpcase = str => {
  let num = parseFloat(str)
  if (isNaN(num)) return ''
  let strOutput = ''
  let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
  num += '00'
  var intPos = num.indexOf('.')
  if (intPos >= 0){
      num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i=0; i < num.length; i++){
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
  }
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")
}

// 判断数字是否为NaN
export const numIsNun = num => {
  return isNaN(num) ? 0 : num
}

export const fixedNumberTwo = num => {
  return isNaN(Number(num)) ? '0.00' : Number(num).toFixed(2)
}

export const fixedNumber = (num, fixed) => {
  const numb = isNaN(Number(num)) ? 0 : num
  return Number(numb).toFixed(fixed)
}

// 取消时分秒
export const formatYMD = str => {
  if (Object.prototype.toString.call(str) !== '[object String]') return ''
  return str.split(' ')[0]
}

// 转化为万元
export const fixedNumberTwoWan = num => {
  return isNaN(Number(num) / 10000) ? '0.00' : Number(num / 10000).toFixed(2)
}