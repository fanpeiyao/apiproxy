import request from '@/utils/request'

export function getLists(params) {
  return request({
    url: '/apiproxy/query/list',
    method: 'post',
    params
  })
}
export function addQuery(params) {
  return request({
    url: '/apiproxy/query/add',
    method: 'post',
    params
  })
}
export function updateQuery(params) {
  return request({
    url: '/apiproxy/query/update',
    method: 'post',
    params
  })
}
export function delQuery(params) {
  return request({
    url: '/apiproxy/query/del',
    method: 'post',
    params
  })
}
