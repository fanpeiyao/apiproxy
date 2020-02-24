import Mock from 'mockjs'

const data = Mock.mock({
    'items|5': [{
        code: '@id',
        env: '@cword("一二")',
       name: '@ctitle',
        host: '@url',
        requrl: '@url'
    }]
})
const passData = Mock.mock({
    'items|5': [{
        path: '@id',
        name: '@name',
        url: '@url',
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
            base64: '1',
            samplecode: '<?xml version="1.0" encoding ="UTF-8"?><GYJ><pub><TransCode>DZBLSIGN_Develop2</TransCode><MerId>daizhangtest</MerId><TranDate>20181225</TranDate><TranTime>093737</TranTime><TransNo>TN20181225093737</TransNo></pub><in><Techno>daizhangtest</Techno><Intno>10086</Intno><Accname></Accname><Accno></Accno><EnterprizeCreditNo>1122334455</EnterprizeCreditNo></in></GYJ>'
      }]
})

export default [
  //查询
  {
    url: '/redirect/query',
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
    url: '/redirect/add',
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
    url: '/redirect/update',
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
    url: '/redirect/del',
    type: 'post',
    response: config => {
      return {
        retCode: '00',
        retMsg: '删除成功！'
      }
    }
  },
    //查询
    {
      url: '/passthrough/query',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          list: passData.items
        }
      }
    },
    //新增
    {
      url: '/passthrough/add',
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
      url: '/passthrough/update',
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
      url: '/passthrough/del',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          retMsg: '刹车成功！'
        }
      }
    },

    //查询
    {
      url: '/interface/query',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          list: interdata.items
        }
      }
    },
    //新增
    {
      url: '/interface/add',
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
      url: '/interface/update',
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
      url: '/interface/del',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          retMsg: '删除成功！'
        }
      }
    }
]
