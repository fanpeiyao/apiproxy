import request, {
  appid
} from '@/utils/request'
//根据projectid、apiname、version - 获取展示报文
export function getReqdata(params) {
  return request({
    url: appid() + '/notify/reqdata ',
    method: 'post',
    params
  })
}

export function noticeApi(params) {
  return request({
    url: appid() + '/gyjapi/notice ',
    method: 'post',
    params
  })
}

export function jumpApi(params) {
  return request({
    url: appid() + '/gyjapi/jump ',
    method: 'post',
    params
  })
}

export function queryApi(params) {
  return request({
    url: appid() + '/gyjapi/query ',
    method: 'post',
    params
  })
}
