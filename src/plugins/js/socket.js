import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let baseUrl = (window.ipConfig.WEBSOCKET_URL || 'http://localhost:8086')
baseUrl = process.env.VUE_APP_WEBSOCKETURL ? process.env.VUE_APP_WEBSOCKETURL : baseUrl

class Socket {
  constructor() {
    this.url = baseUrl;
    this.ws = new SockJS(this.url)
    this.topic = '';
    this.client = Stomp.over(this.ws)
    console.log("init SockJS")
    this.client.debug = function(str) {
      // console.log(str)
    }
    this.stompClient = this.client;
    this.isConnect = false;
    this.msgArr = [];
    this.connect();
  }

  connect(callback) {
    this.stompClient = this.client;
    this.stompClient.connect({}, frame => {
      this.isConnect = true;
      console.log(this.msgArr);
      this.msgArr.forEach(v => {
        console.log(v.msg)
        this.stompClient.subscribe('/topic/getResponse/' + v.msg, function (response) {
          v.callback && v.callback(response.body)
        })
      })
      this.msgArr = [];
    })
  }

  disconnect() {
    this.stompClient && this.stompClient.disconnect()
  }
  disconnectMsg(stompClient) {
    stompClient && stompClient.disconnect()
  }

  sendMsg(msg, callback){
    if(!this.isConnect){
      this.msgArr.push({
        msg, callback
      })
      return;
    }
    this.stompClient = this.client;
    this.stompClient.subscribe('/topic/getResponse/' + msg, function (response) {
      callback && callback(response.body)
    })
    return this.stompClient;
  }

  send(obj) {
    var msg = {
      'method': '/shiftRecord/saveReadShiftRecord',
      'info': obj
    };

    this.stompClient.send("/onMessage/shiftRecord/shiftRecordWs/wsCallGet", {},
      JSON.stringify({
        'message': JSON.stringify(
          msg
        )
      })
    )
  }

}

const socket = new Socket();

export default socket;
