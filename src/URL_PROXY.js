let BASTURL = window.ipConfig && window.ipConfig.BASE_URL;
if(!BASTURL){
  if(process.env.NODE_ENV == "development"){
    // BASTURL = window.envType == 'vis' ? 'http://192.168.1.233:10000' : "http://172.18.8.103:10000";
    // BASTURL = "http://172.18.8.240:10000";
    // BASTURL = "http://172.18.1.56:10000";
    // BASTURL = "http://172.18.8.125:10000";
    BASTURL = process.env.VUE_APP_BASEURL;
  }else{
    BASTURL = process.env.VUE_APP_BASEURL;
  }
}
export default BASTURL;
