import request from '@/utils/request'

export function getQuery(params) {
  return request({
    url: '/apiproxy/interface/query',
    method: 'post',
    params
  })
}
export function addQuery(params) {
  return request({
    url: '/apiproxy/interface/add',
    method: 'post',
    params
  })
}
export function updateQuery(params) {
  return request({
    url: '/apiproxy/interface/update',
    method: 'post',
    params
  })
}
export function delQuery(params) {
  return request({
    url: '/apiproxy/interface/del',
    method: 'post',
    params
  })
}
