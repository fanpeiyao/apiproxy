import request, {
  appid
} from '@/utils/request'
export function getCipher(params) {
  return request({
    url: '/encryption/getKeyPair',
    method: 'post',
    params
  })
}

export function rsaDecode(params) {
  return request({
    url: appid() + '/encryption/RSADecrypt',
    method: 'post',
    params
  })
}


export function rsaCode(params) {
  return request({
    url: appid() + '/encryption/RSAEncrypt',
    method: 'post',
    params
  })
}

export function base64Decode(params) {
  return request({
    url: appid() + '/encryption/BASE64Decrypt',
    method: 'post',
    params
  })
}

export function base64Code(params) {
  return request({
    url: appid() + '/encryption/BASE64Encrypt',
    method: 'post',
    params
  })
}