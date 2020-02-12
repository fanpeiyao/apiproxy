import Mock from 'mockjs'

const data = Mock.mock({
  'items|3': [{
    projectid: '@projectid',
    projectname: '@projectname',
    prikey: '@sentence(10, 20)'
  }]
})

let Random = Mock.Random;
Random.extend({
  projectname: function (date) {
    var projectname = ['银账通', '理财', '到账伴侣']
    return this.pick(projectname)
  },
  projectid: function (date) {
    var projectname = ['yzt', 'licai', 'dzbl']
    return this.pick(projectname)
  }
})



export default [
  //查询
  {
    url: '/apiproxy/notify/list',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        data: data.items
      }
    }
  },
  //新增
  {
    url: '/apiproxy/notify/add',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '新增成功！'
      }
    }
  },
  //修改
  {
    url: '/apiproxy/notify/update',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '修改成功！'
      }
    }
  },
  //删除
  {
    url: '/apiproxy/notify/del',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '删除成功！'
      }
    }
  }
]
