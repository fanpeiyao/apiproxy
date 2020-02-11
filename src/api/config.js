import request from '@/utils/request'
//重定项地址配置查询
export function getRedirect(params) {
  return request({
    url: '/apiproxy/redirect/query',
    method: 'post',
    params
  })
}
//新增重定项地址配置
export function addRedirect(params) {
  return request({
    url: '/apiproxy/redirect/add',
    method: 'post',
    params
  })
}

//修改重定项地址配置
export function updateRedirect(params) {
  return request({
        url: '/apiproxy/redirect/update',
    method: 'post',
    params
  })
}

//删除重定项地址配置
export function delRedirect(params) {
    return request({
        url: '/apiproxy/redirect/del',
        method: 'post',
        params
    })
}
