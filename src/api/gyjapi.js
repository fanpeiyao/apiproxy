import request, {
  appid
} from '@/utils/request'
//根据projectid、apiname、version - 获取展示报文
export function getReqdata(params) {
  return request({
    url: appid() + '/notify/reqdata ',
    method: 'post',
    data :params
  })
}
/*
projectid
version
apiname
noticeurl
sendtype
base64
*/
export function noticeApi(params) {
  return request({
    url: appid() + '/gyjapi/notice ',
    method: 'post',
    data :params
  })
}

export function jumpApi(params) {
  return request({
    url: appid() + '/gyjapi/jump ',
    method: 'post',
    data :params
  })
}

export function queryApi(params) {
  return request({
    url: appid() + '/gyjapi/query ',
    method: 'post',
    data :params
  })
}
