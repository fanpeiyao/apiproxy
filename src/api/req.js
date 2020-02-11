import request from '@/utils/request'

export function redirect(params) {
  return request({
    url: '/apiproxy/req/redirect ',
    method: 'post',
    params
  })
}
export function passthrough(params) {
  return request({
    url: '/apiproxy/req/passthrough ',
    method: 'post',
    params
  })
}
