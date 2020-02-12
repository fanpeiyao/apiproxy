import request from '@/utils/request'

export function getJump(params) {
  return request({
    url: '/apiproxy/jump/list',
    method: 'post',
    params
  })
}
export function addJump(params) {
  return request({
    url: '/apiproxy/jump/add',
    method: 'post',
    params
  })
}
export function updateJump(params) {
  return request({
    url: '/apiproxy/jump/update',
    method: 'post',
    params
  })
}
export function delJump(params) {
  return request({
    url: '/apiproxy/jump/del',
    method: 'post',
    params
  })
}
