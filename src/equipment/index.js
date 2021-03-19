import {get} from '@/plugin/axios'

// import BASTURL from '@/api/URL_PROXY'
let BASTURL = (window.ipConfig && window.ipConfig.BASE_URL) || (process.env.NODE_ENV == "development" ? "" : process.env.VUE_APP_BASEURL + "")

const URL_PROXY = BASTURL

// 获取列表
export const getTree = data => {
  return get({
    url: `${URL_PROXY}/eledevice/deviceApi/deviceTypeTree`,
    data: data
  })
}

// 获取下拉列表
export const getDropdowm = ({url, data}) => {
  return get({
    url: `${URL_PROXY}/eledevice/${url}`,
    data
  })
}

// 获取下拉列表
export const getPage = data => {
  return get({
    url: `${URL_PROXY}/eledevice/deviceApi/getDeviceListByType`,
    data
  })
}
