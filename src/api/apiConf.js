import request, {
  appid
} from '@/utils/request'

export function getApiConf(params) {
  return request({
    url: appid() + '/attachmentinfo/list',
    method: 'post',
    params
  })
}
export function addApiConf(params) {
  return request({
    url: appid() + '/attachmentinfo/add',
    method: 'post',
    params
  })
}
export function updateApiConf(params) {
  return request({
    url: appid() + '/attachmentinfo/update',
    method: 'post',
    params
  })
}
export function delApiConf(params) {
  return request({
    url: appid() + '/attachmentinfo/del',
    method: 'post',
    params
  })
}
