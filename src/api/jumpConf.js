import request, {
  appid
} from '@/utils/request'

export function getJump(params) {
  return request({
    url: appid() + '/interface/query',
    method: 'post',
    params
  })
}
export function addJump(params) {
  return request({
    url: appid() + '/interface/add',
    method: 'post',
    params
  })
}
export function updateJump(params) {
  return request({
    url: appid() + '/interface/update',
    method: 'post',
    params
  })
}
export function delJump(params) {
  return request({
    url: appid() + '/interface/del',
    method: 'post',
    params
  })
}
