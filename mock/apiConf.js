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
    url: '/apiproxy/apiConf/list',
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
    url: '/apiproxy/apiConf/add',
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
    url: '/apiproxy/apiConf/update',
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
    url: '/apiproxy/apiConf/del',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '删除成功！'
      }
    }
  }
]
