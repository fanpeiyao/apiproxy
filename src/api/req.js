import request, {
  appid
}
from '@/utils/request'
import qs from 'qs'

export function redirect(params) {
  return request({
    url: appid() + '/req/redirect ',
    method: 'post',
    data :params
  })
}
export function passthrough(params) {
  return request({
    url: appid() + '/passthrough/option ',
    method: 'post',
    data :params
  })
}
