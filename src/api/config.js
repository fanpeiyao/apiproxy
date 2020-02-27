import request, {
  appid
}
from '@/utils/request'
import qs from 'qs'
//重定项地址配置查询
export function getRedirect(params) {
  return request({
    url: appid() + '/redirect/list',
    method: 'post',
    data :params
  })
}
//新增重定项地址配置
export function getRedirectInfo(params) {
  return request({
    url: appid() + '/redirect/info',
    method: 'post',
    data :params
  })
}

//新增重定项地址配置
export function addRedirect(params) {
  return request({
    url: appid() + '/redirect/add',
    method: 'post',
    data :params
  })
}

//修改重定项地址配置
export function updateRedirect(params) {
  return request({
        url: appid() + '/redirect/update',
    method: 'post',
    data :params
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
    url: appid() + '/passthrough/list',
    method: 'post',
    data :params
  })
}
//重定项地址配置查询
export function getPassInfo(params) {
  return request({
    url: appid() + '/passthrough/info',
    method: 'post',
    data: params
  })
}
//新增重定项地址配置
export function addPass(params) {
  return request({
    url: appid() + '/passthrough/add',
    method: 'post',
    data :params
  })
}

//修改重定项地址配置
export function updatePass(params) {
  return request({
    url: appid() + '/passthrough/update',
    method: 'post',
    data :params
  })
}

//删除重定项地址配置
export function delPass(params) {
  return request({
    url: appid() + '/passthrough/del',
    method: 'post',
    data :params
  })
}

export function getInterface(params) {
  return request({
    url: appid() + '/interface/list',
    method: 'post',
    data: params
  })
}
export function getInterfaceInfo(params) {
  return request({
    url: appid() + '/interface/info',
    method: 'post',
    data :params
  })
}
export function addInterface(params) {
    console.log(params)
  return request({
    url: appid() + '/interface/add',
    method: 'post',
    data :params
  })
}
export function updateInterface(params) {
  return request({
    url: appid() + '/interface/update',
    method: 'post',
    data :params
  })
}
export function delInterface(params) {
  return request({
    url: appid() + '/interface/del',
    method: 'post',
    data :params
  })
}
