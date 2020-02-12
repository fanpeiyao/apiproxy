import request from '@/utils/request'

export function getNotify(params) {
  return request({
    url: '/apiproxy/notify/list',
    method: 'post',
    params
  })
}
export function addNotify(params) {
  return request({
    url: '/apiproxy/notify/add',
    method: 'post',
    params
  })
}
export function updateNotify(params) {
  return request({
    url: '/apiproxy/notify/update',
    method: 'post',
    params
  })
}
export function delNotify(params) {
  return request({
    url: '/apiproxy/notify/del',
    method: 'post',
    params
  })
}
