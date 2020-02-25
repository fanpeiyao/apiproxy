import Mock from 'mockjs'

const data = Mock.mock({
      'items|7': [{
          projectid: 'yzt',
          apiname: '外汇来汇明细通知',
          attkey: 'GYJREMITNOTIFY',
          value: '2.0.0.0'
      }]
})


export default [
  //查询
  {
    url: '/attachmentinfo/query',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        list: data.items
      }
    }
  },
  //新增
  {
    url: '/attachmentinfo/add',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        retMsg: '新增成功！'
      }
    }
  },
  //修改
  {
    url: '/attachmentinfo/update',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        retMsg: '修改成功！'
      }
    }
  },
  //删除
  {
    url: '/attachmentinfo/del',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        retMsg: '删除成功！'
      }
    }
  }
]
