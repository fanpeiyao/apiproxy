import request, {
  appid
}
from '@/utils/request'
import qs from 'qs'

export function getRoutes() {
  return request({
    url: appid() + '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: appid() + '/roles',
    method: 'post'
  })
}

export function addRole(data) {
  return request({
    url: appid() + '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/apiproxy/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/apiproxy/role/${id}`,
    method: 'delete'
  })
}
