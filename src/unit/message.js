import {Message} from "element-ui";

let messageInstance = null;
const resetMessage = (options) => {
  if(messageInstance) {
    messageInstance.close()
  }
  // 这个是Message 距离窗口顶部的偏移量 不需要设置就不加
  options.offset = 60;

  messageInstance = Message(options)
};
['error','success','info','warning'].forEach(type => {
  resetMessage[type] = options => {
    if(typeof options === 'string') {
      options = {
        message:options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export default  resetMessage