import Mock from 'mockjs'

const data = Mock.mock({
  'items|3': [{
        projectid: 'yzt',
      apiname: '商户签约(分行接口)',
      key: 'ADDAGREEMENT',
      version: '2.0.0.0',
      content: 'ssssssssssssssssss',
      base64: '1'
  }]
})



export default [
  //查询
  {
    url: '/apiproxy/queryinfo/query',
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
    url: '/apiproxy/queryinfo/add',
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
    url: '/apiproxy/queryinfo/update',
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
    url: '/apiproxy/queryinfo/del',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '删除成功！'
      }
    }
  }
]
