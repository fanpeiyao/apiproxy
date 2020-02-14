import request from '@/utils/request'
//根据projectid、apiname、version - 获取展示报文
export function getReqdata(params) {
  return request({
    url: '/apiproxy/notify/reqdata ',
    method: 'post',
    params
  })
}

export function noticeApi(params) {
  return request({
    url: '/apiproxy/gyjapi/notice ',
    method: 'post',
    params
  })
}

export function jumpApi(params) {
  return request({
    url: '/apiproxy/gyjapi/jump ',
    method: 'post',
    params
  })
}

export function queryApi(params) {
  return request({
    url: '/apiproxy/gyjapi/query ',
    method: 'post',
    params
  })
}
