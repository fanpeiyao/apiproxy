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
const passData = Mock.mock({
    'items|10': [{
        path: '@id',
        name: '@name',
        url: '@url',
        redirecthost: '@url',
        requrl: '@url'
    }]
})
export default [

  //通知接口
  {
    url: '/apiproxy/notify/reqdata',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '调用成功！'
      }
    }
  },
  //修改
  {
    url: '/apiproxy/query/reqdata',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
          retMsg: '调用成功！'
      }
    }
  },
  //删除
  {
    url: '/apiproxy/jump/reqdata',
    type: 'post',
    response: config => {
      return {
            retCode: 200,
          retMsg: '调用成功！',
      }
    }
  },

  //通知接口
  {
    url: '/apiproxy/debug/notice',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '调用成功！',
        data: {
          resdata: 'ww'
        }
      }
    }
  },
  //修改
  {
    url: '/apiproxy/debug/query',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '调用成功！',
        data: {
          resdata: 'query'
        }
      }
    }
  },
  //删除
  {
    url: '/apiproxy/debug/jump',
    type: 'post',
    response: config => {
      return {
        retCode: 200,
        retMsg: '调用成功！',
        data: {
          resdata: 'jump'
        }
      }
    }
  },
]
