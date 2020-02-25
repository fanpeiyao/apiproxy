import request, {
  appid
} from '@/utils/request'
//查询项目列表
export function getProjects(data) {
  return request({
    url: appid() + '/project/list',
    method: 'post',
    data
  })
}
export function addProject(data) {
  return request({
    url: appid() + '/project/add',
    method: 'post',
    data
  })
}
export function upDateProject(data) {
  return request({
    url: appid() + '/project/update',
    method: 'post',
    data
  })
}
export function delProject(data) {
  return request({
    url: appid() + '/project/del',
    method: 'post',
    data
  })
}
//查询某个项目
export function qryInfo(data) {
  return request({
    url: appid() + '/project/qry',
    method: 'post',
    data
  })
}
