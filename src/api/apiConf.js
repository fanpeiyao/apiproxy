import request from '@/utils/request'

export function getApiConf(params) {
  return request({
    url: '/apiproxy/attachmentinfo/query',
    method: 'post',
    params
  })
}
export function addApiConf(params) {
  return request({
    url: '/apiproxy/attachmentinfo/add',
    method: 'post',
    params
  })
}
export function updateApiConf(params) {
  return request({
    url: '/apiproxy/attachmentinfo/update',
    method: 'post',
    params
  })
}
export function delApiConf(params) {
  return request({
    url: '/apiproxy/attachmentinfo/del',
    method: 'post',
    params
  })
}
