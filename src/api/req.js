import request, {
  appid
} from '@/utils/request'

export function redirect(params) {
  return request({
    url: appid() + '/req/redirect ',
    method: 'post',
    data :params
  })
}
export function passthrough(params) {
  return request({
    url: appid() + '/req/passthrough ',
    method: 'post',
    data :params
  })
}
