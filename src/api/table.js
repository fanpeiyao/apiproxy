import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/apiproxy/table/list',
    method: 'get',
    params
  })
}
