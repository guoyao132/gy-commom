import {service as axios_service} from '@/plugin/axios/index'
import {URL_PROXY} from '../index'

export default function service(param = {}, ui_notify = false) {
  param.url = URL_PROXY + param.url
  return axios_service({
    ...param,
    headers: { 'Content-Type': 'application/json'}
  }).then(res=> {
    if(res) {
      return res.result
    } else {
      return []
    }
  })
}