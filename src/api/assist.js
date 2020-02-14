import request from '@/utils/request'

export function getCipher(params) {
  return request({
    url: '/apiproxy/encryption/getKeyPair',
    method: 'post',
    params
  })
}

export function rsaDecode(params) {
  return request({
    url: '/apiproxy/encryption/RSADecrypt',
    method: 'post',
    params
  })
}


export function rsaCode(params) {
  return request({
    url: '/apiproxy/encryption/RSAEncrypt',
    method: 'post',
    params
  })
}

export function base64Decode(params) {
  return request({
    url: '/apiproxy/encryption/BASE64Decrypt',
    method: 'post',
    params
  })
}

export function base64Code(params) {
  return request({
    url: '/apiproxy/encryption/BASE64Encrypt',
    method: 'post',
    params
  })
}