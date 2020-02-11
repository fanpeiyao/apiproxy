import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    redirectcode: '@id',
    redirectenv: '@cword("一二")',
    redirectname: '@ctitle',
    redirecthost: '@url',
    requrl: '@url'
  }]
}) 
export default [
  //查询
  {
    url: '/apiproxy/redirect/query',
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
    url: '/apiproxy/redirect/add',
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
    url: '/apiproxy/redirect/update',
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
    url: '/apiproxy/redirect/del',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '刹车成功！'
      }
    }
  }
]
