import Mock from 'mockjs'

const data = Mock.mock({
    'items|5': [{
        projectid: '@id',
        redirectcode: '@id',
        redirectenv: '@cword("一二")',
        redirectname: '@ctitle',
        redirecthost: '@url',
        requrl: '@url'
    }]
})
const passData = Mock.mock({
    'items|5': [{
        projectid: '@id',
        path: '@id',
        name: '@name',
        url: '@url',
        redirecthost: '@url',
        requrl: '@url'
    }]
})


const interdata = Mock.mock({
      'items|3': [{
            projectid: 'yzt',
            apiname: '假接口名称' + '@name',
            key: '@id',
            version: '1.0.0.0',
            content: 'sssssssssssssssssssssvvvvvvvvvvvvvssssss',
            base64: '1'
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
        retMsg: '删除成功！'
      }
    }
  },
    //查询
    {
      url: '/apiproxy/passthrough/query',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          data: passData.items
        }
      }
    },
    //新增
    {
      url: '/apiproxy/passthrough/add',
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
      url: '/apiproxy/passthrough/update',
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
      url: '/apiproxy/passthrough/del',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          retMsg: '刹车成功！'
        }
      }
    },

    //查询
    {
      url: '/apiproxy/interface/query',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          data: interdata.items
        }
      }
    },
    //新增
    {
      url: '/apiproxy/interface/add',
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
      url: '/apiproxy/interface/update',
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
      url: '/apiproxy/interface/del',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          retMsg: '删除成功！'
        }
      }
    }
]
