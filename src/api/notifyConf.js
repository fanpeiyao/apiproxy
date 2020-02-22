import request, {
  appid
} from '@/utils/request'

export function getNotify(params) {
  return request({
    url: appid() + '/interface/query',
    method: 'post',
    params
  })
}
export function addNotify(params) {
  return request({
    url: appid() + '/interface/add',
    method: 'post',
    params
  })
}
export function updateNotify(params) {
  return request({
    url: appid() + '/interface/update',
    method: 'post',
    params
  })
}
export function delNotify(params) {
  return request({
    url: appid() + '/interface/del',
    method: 'post',
    params
  })
}
