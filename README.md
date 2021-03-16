# $gyCom 共用方法

## 浮点数加减乘除（flortAdd/flortSub/flortMul/flortDiv）
```
params:
    num1 (Number), 
    num2 (Number)
```

### 格式化日期(formatTime)
```
params: 
    time: Date || string(时间格式)
    type： 'ymd' || 'hms' || 'y-m-d h:m:s'(自定义时间格式，y -> yy 年份取后两位)
```
### 判断是否是数字(isRealNum)
```
params: 
    val(排除空字符串和null的影响)
```
### 格式化科学计数法的数字(formatNum)
```
params: 
    number(数字太长在浏览器中会自动转换为科学计数法)
```
### 各种坐标系转换坐标(bd09togcj02/gcj02tobd09/wgs84togcj02/gcj02towgs84/bd09towgs84/wgs84tobd09)
```
params: 
    lon(经度)
    lat(纬度)
    //bd09百度   gcj02   wgs84
```
### 删除数组某个值(arrRemoveVal)
```
params: 
    arr(要删除的数组)
    val(值)
```
### 数组值为对象时，删除数组某个值(removeArray)
```
params: 
    _arr(要删除的数组)
    _obj(值)
    key(默认id)
```
### 添加水印(watermark)
```
params: 
    {   
        t1(第一行文字)
        t2(第二行文字)
        t3(第三行文字)
        id(父容器ID)
        defaultSettings(样式)
        intervalWidth(宽度)
        intervalheight(高度)
        isOne(是否只有一个)
    }
```
### 导出(daochuFun)
```
params: 
    fun(导出axios方法)
    searchKeys(参数)
    name(导出名字)
```
### 下载文件(downFileSuccFun)
```
params: 
    resp(相应主体)
    name(文件名)
```
### 获取指定日期所在的周一和周日的日期(getMonSunDate)
```
params: 
    nowDate(日期)
```
### 获取指定日期一周的日期数组(getWeekArr)
```
params: 
    nowDate(日期)
```
### 根据某个属性和值获取数组中的对象的指定值(getNameById)
```
params: 
    val(值)
    list(数组)
    idCoe(值的属性)
    namCol(指定属性)
```
### 表单验证(formDataValidator)
```
params: 
    formData(数据)
    validatorObj(验证规则)
        例：validatorObj: {
                'stationName': {
                  label: '常备名称',
                  prop: 'stationName',
                  required: true,
                  tyep: '',
                  len: '',  长度控制  
                  isInt: '' 是否整数  
                },
            },
```
### 格式日期(formatTime)
```
params: 
    time(时间)
    type(ymd/hms)
    customFormat(自定义格式)
```
### 计算两个日期的差，并转为中文(timeDifference)
```
params: 
    date(时间)
    date2(时间)
    timeDiff(需要去掉的时间)
```
### 格式图表数据(formatEchatsData)
```
params: 
    xData(时间数据数组)
    yData(值数组)
return 
    将日期转为小数并返回一个数组
```
### 将时分秒变成数字(formatHourToNum)
```
params: 
    time(时间)
    type(ymd/hms)
    customFormat(自定义格式)
```
### tabel添加不同class(tableRowClassName)
```
    应用在element-ui表格上，添加 lightColor 和 darkColor class
```
### 克隆对象(cloneObj)
```
params: 
    obj
```
### 表格数据合并行(mergeTableRow)
```
params: 
    data
    merge(需要合并的属性数组)
表格添加  
      :span-method="$common.objectSpanMethod"
```
### 获取值数据类型(type)
```
params: 
    data
```
### 数组去重(unique)
```
params: 
    data
```
### 圣杯模式(inherit)
```
params: 
    data
```
### 获取URL上的参数(getUrlParam)
```
params: 
    sKey
```
