import request, {
  appid
} from '@/utils/request'
//查询项目列表
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
//查询某个项目
export function qryInfo(params) {
  return request({
    url: appid() + '/project/qry',
    method: 'post',
    params
  })
}
