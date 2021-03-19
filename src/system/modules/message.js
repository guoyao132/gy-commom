import {default as request} from './service'

import { Notification } from 'element-ui';
// import router from '@/packDir/vis/router' //自己项目路由
import {router} from '@/router/router'; //系统设置路由

let timerID
if (sessionStorage.getItem("zhxd_token")) { // 若已登录则检查需要提示的消息
  clearInterval(timerID)
  //setTimeout(messageToNotify, 3000) // 刷新页面后弹出
  timerID = setInterval(()=>{
    messageToNotify()
  }, 1000 * 60 * 30)
}



function handleMessageNotify(messages) { // 弹出消息框
  const messagetypes = [
    {t: 'ACCOUNT_DORMANCY', name: '账号休眠'},
    {t: 'ACCOUNT_OPERATOR', name: '账号操作'}
  ]
  messages.forEach((m, index) => {
    const curMessage = messagetypes.find(types => types.t === m.business_type)
    setTimeout(() => { // 使用定时器使弹框逐个弹出
      const instance = Notification({
        title: curMessage ? `${curMessage.name}消息`: '',
        dangerouslyUseHTMLString: true,
        message: `
          <span style="cursor:pointer;">
            您有
            <strong style="color:#b01120;">${m.nums}</strong>
            条${curMessage.name}类消息(点击查看)
          </span>
        `,
        type: 'warning',
        duration: 10000,
        customClass: 'system-notification-msg',
        onClick: ()=>{
          router.push('/xitongsz/message')
          instance.close()
        }
      })
    }, index * 200)
  })
}

export function messageToNotify () { // 该接口获取需要告警弹框的消息
  return request({
    url: `/sys/message/count`,
    method: 'get',
    params: { noLoading: 1 }
  }).then(res => {
    if(res){
      handleMessageNotify(res)
    }
    return res
  })
}

export function getMessageList (data, ui_notify) { // 消息列表
  return request({
    url: `/sys/message/page`,
    method: 'post',
    data
  }).then(res => {
    return res
  })
}

export function markMessageAsRead ({id}) { // 将消息设为已读
  return request({
    url: `/sys/message/changeStatus`,
    method: 'get',
    params: {msgId: id}
  })
}