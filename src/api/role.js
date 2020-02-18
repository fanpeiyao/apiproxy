import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/apiproxy/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/apiproxy/roles',
    method: 'post'
  })
}

export function addRole(data) {
  return request({
    url: '/apiproxy/role',
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
