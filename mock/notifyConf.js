import Mock from 'mockjs'

const data = Mock.mock({
  'items|3': [{
    projectid: 'yzt',
    apiname: '外汇来汇明细通知',
    key: 'GYJREMITNOTIFY',
    version: '2.0.0.0',
    content: 'sssssssssssssssssssssvvvvvvvvvvvvvssssss',
    base64: '1'
  }]
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
