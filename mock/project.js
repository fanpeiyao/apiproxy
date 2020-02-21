import Mock from 'mockjs'

const data = Mock.mock({
  'items': [{
    projectid: 'yzt',
    projectname: '银账通',
    prikey: '@sentence(10, 20)'
  },
    {
        projectid: 'licai',
        projectname: '理财',
        prikey: '@sentence(10, 20)'
    }, {
      projectid: 'dzbl',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'yzt8',
      projectname: '银账通',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'licai2',
      projectname: '理财',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'dzbl3',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'yzt2',
      projectname: '银账通',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'licai1',
      projectname: '理财',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'dzbl1',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'yzt1',
      projectname: '银账通',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'licai8',
      projectname: '理财',
      prikey: '@sentence(10, 20)'
    }, {
      projectid: 'dzbl8',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }]
})

let Random = Mock.Random;
Random.extend({
    projectname: function(date) {
        var projectname = ['银账通', '理财', '到账伴侣']
        return this.pick(projectname)
    },
    projectid: function (date) {
      var projectname = ['yzt', 'licai', 'dzbl']
      return this.pick(projectname)
    }
})



export default [
    //查询
    {
        url: '/apiproxy/project/list',
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
        url: '/apiproxy/project/add',
        type: 'post',
        response: config => {
        return {
            retCode: 200,
            retMsg:'新增成功！'
        }
        }
    },
    //修改
    {
        url: '/apiproxy/project/update',
        type: 'post',
        response: config => {
        return {
            retCode: 200,
            retMsg:'修改成功！'
        }
        }
    },
    //删除
    {
      url: '/apiproxy/project/del',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          retMsg: '刹车成功！'
        }
      }
    }
]
