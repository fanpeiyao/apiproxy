import request from '@/utils/request'

export function getProjects(params) {
  return request({
    url: '/apiproxy/project/list',
    method: 'post',
    params
  })
}
export function addProject(params) {
  return request({
    url: '/apiproxy/project/add',
    method: 'post',
    params
  })
}
export function upDateProject(params) {
  return request({
    url: '/apiproxy/project/update',
    method: 'post',
    params
  })
}
export function delProject(params) {
  return request({
    url: '/apiproxy/project/del',
    method: 'post',
    params
  })
}
