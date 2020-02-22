import request, {
  appid
} from '@/utils/request'

export function login(data) {
  return request({
    url: appid() + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: appid() + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: appid() + '/user/logout',
    method: 'post'
  })
}
