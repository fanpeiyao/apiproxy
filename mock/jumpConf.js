import Mock from 'mockjs'

const data = Mock.mock({
      'items|3': [{
          id: '|1-100',
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
    url: '/jump/query',
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
    url: '/jump/add',
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
    url: '/jump/update',
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
    url: '/jump/del',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        retMsg: '删除成功！'
      }
    }
  }
]
