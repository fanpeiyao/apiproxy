import Mock from 'mockjs'

const data = Mock.mock({
  'items': [{
    projectid: 'yzt',
    apiname: '外汇来汇明细通知',
    key: 'GYJREMITNOTIFY',
    version: '2.0.0.0',
    content: '1111111111111111111111111111111sssssssssssssssssssssvvvvvvvvvvvvvssssss',
    base64: '1'
  }, {
    projectid: 'yzt',
    apiname: '外汇来汇明细通知2',
    key: 'GYJREMITNOTIFY2',
    version: '2.0.0.0',
    content: '222222222222222222222222222222222sssssssssssssssssssssvvvvvvvvvvvvvssssss',
    base64: '1'
  }, {
    projectid: 'yzt',
    apiname: '外汇来汇明细通知3',
    key: 'GYJREMITNOTIFY3',
    version: '2.0.0.0',
    content: '333333333333333333333333333333333sssssssssssssssssssssvvvvvvvvvvvvvssssss',
    base64: '1'
  }]
})



export default [
  //查询
  {
    url: '/notice/query',
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
    url: '/notice/add',
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
    url: '/notice/update',
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
    url: '/notice/del',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        retMsg: '删除成功！'
      }
    }
  }
]
