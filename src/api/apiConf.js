import request from '@/utils/request'

export function getApiConf(params) {
  return request({
    url: '/apiproxy/apiConf/list',
    method: 'post',
    params
  })
}
export function addApiConf(params) {
  return request({
    url: '/apiproxy/apiConf/add',
    method: 'post',
    params
  })
}
export function updateApiConf(params) {
  return request({
    url: '/apiproxy/apiConf/update',
    method: 'post',
    params
  })
}
export function delApiConf(params) {
  return request({
    url: '/apiproxy/apiConf/del',
    method: 'post',
    params
  })
}
