import Mock from 'mockjs'

const data = Mock.mock({
      'items|3': [{
          projectid: 'yzt',
          apiname: '外汇来汇明细通知',
          key: 'GYJREMITNOTIFY',
          value: '2.0.0.0'
      }]
})


export default [
  //查询
  {
    url: '/apiproxy/attachmentinfo/query',
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
    url: '/apiproxy/attachmentinfo/add',
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
    url: '/apiproxy/attachmentinfo/update',
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
    url: '/apiproxy/attachmentinfo/del',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '删除成功！'
      }
    }
  }
]
