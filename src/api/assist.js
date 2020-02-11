import request from '@/utils/request'

export function getCipher(params) {
  return request({
    url: '/apiproxy/assist/getCipher',
    method: 'post',
    params
  })
}

export function rsaDecode(params) {
  return request({
    url: '/apiproxy/assist/rsaDecode',
    method: 'post',
    params
  })
}


export function rsaCode(params) {
  return request({
    url: '/apiproxy/assist/rsaCode',
    method: 'post',
    params
  })
}

export function base64Decode(params) {
  return request({
    url: '/apiproxy/assist/base64Decode',
    method: 'post',
    params
  })
}

export function base64Code(params) {
  return request({
    url: '/apiproxy/assist/base64Code',
    method: 'post',
    params
  })
}