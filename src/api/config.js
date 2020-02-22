import request, {
  appid
} from '@/utils/request'
//重定项地址配置查询
export function getRedirect(params) {
  return request({
    url: appid() + '/redirect/query',
    method: 'post',
    params
  })
}
//新增重定项地址配置
export function addRedirect(params) {
  return request({
    url: appid() + '/redirect/add',
    method: 'post',
    params
  })
}

//修改重定项地址配置
export function updateRedirect(params) {
  return request({
        url: appid() + '/redirect/update',
    method: 'post',
    params
  })
}

//删除重定项地址配置
export function delRedirect(params) {
    return request({
        url: appid() + '/redirect/del',
        method: 'post',
        params
    })
}

//重定项地址配置查询
export function getPass(params) {
  return request({
    url: appid() + '/passthrough/query',
    method: 'post',
    params
  })
}
//新增重定项地址配置
export function addPass(params) {
  return request({
    url: appid() + '/passthrough/add',
    method: 'post',
    params
  })
}

//修改重定项地址配置
export function updatePass(params) {
  return request({
    url: appid() + '/passthrough/update',
    method: 'post',
    params
  })
}

//删除重定项地址配置
export function delPass(params) {
  return request({
    url: appid() + '/passthrough/del',
    method: 'post',
    params
  })
}

export function getInterface(params) {
  return request({
    url: appid() + '/interface/query',
    method: 'post',
    params
  })
}
export function addInterface(params) {
  return request({
    url: appid() + '/interface/add',
    method: 'post',
    params
  })
}
export function updateInterface(params) {
  return request({
    url: appid() + '/interface/update',
    method: 'post',
    params
  })
}
export function delInterface(params) {
  return request({
    url: appid() + '/interface/del',
    method: 'post',
    params
  })
}
