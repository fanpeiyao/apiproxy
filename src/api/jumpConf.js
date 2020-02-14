import request from '@/utils/request'

export function getJump(params) {
  return request({
    url: '/apiproxy/interface/query',
    method: 'post',
    params
  })
}
export function addJump(params) {
  return request({
    url: '/apiproxy/interface/add',
    method: 'post',
    params
  })
}
export function updateJump(params) {
  return request({
    url: '/apiproxy/interface/update',
    method: 'post',
    params
  })
}
export function delJump(params) {
  return request({
    url: '/apiproxy/interface/del',
    method: 'post',
    params
  })
}
