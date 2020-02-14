import request from '@/utils/request'

export function getNotify(params) {
  return request({
    url: '/apiproxy/interface/query',
    method: 'post',
    params
  })
}
export function addNotify(params) {
  return request({
    url: '/apiproxy/interface/add',
    method: 'post',
    params
  })
}
export function updateNotify(params) {
  return request({
    url: '/apiproxy/interface/update',
    method: 'post',
    params
  })
}
export function delNotify(params) {
  return request({
    url: '/apiproxy/interface/del',
    method: 'post',
    params
  })
}
