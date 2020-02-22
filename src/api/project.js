import request, {
  appid
} from '@/utils/request'

export function getProjects(params) {
  return request({
    url: appid() + '/project/query',
    method: 'post',
    params
  })
}
export function addProject(params) {
  return request({
    url: appid() + '/project/add',
    method: 'post',
    params
  })
}
export function upDateProject(params) {
  return request({
    url: appid() + '/project/update',
    method: 'post',
    params
  })
}
export function delProject(params) {
  return request({
    url: appid() + '/project/del',
    method: 'post',
    params
  })
}
