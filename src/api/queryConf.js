import request, {
  appid
} from '@/utils/request'
export function getQuery(params) {
  return request({
    url: appid() + '/interface/query',
    method: 'post',
    params
  })
}
export function addQuery(params) {
  return request({
    url: appid() + '/interface/add',
    method: 'post',
    params
  })
}
export function updateQuery(params) {
  return request({
    url: appid() + '/interface/update',
    method: 'post',
    params
  })
}
export function delQuery(params) {
  return request({
    url: appid() + '/interface/del',
    method: 'post',
    params
  })
}
