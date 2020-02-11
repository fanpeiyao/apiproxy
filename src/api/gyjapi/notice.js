import request from '@/utils/request'
//根据projectid、apiname、version - 获取展示报文
export function redirect(params) {
  return request({
    url: '/apiproxy/notify/reqdata ',
    method: 'post',
    params
  })
}