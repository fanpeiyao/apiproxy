import Mock from 'mockjs'

const data = Mock.mock({
  'items': [{
      id:'1',
    projectid: 'yzt',
    projectname: '银账通',
    prikey: '@sentence(10, 20)'
  },
    {
      id: '2',
        projectid: 'licai',
        projectname: '理财',
        prikey: '@sentence(10, 20)'
    }, {
      id: '3',
      projectid: 'dzbl',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }, {
      id: '4',
      projectid: 'yzt8',
      projectname: '银账通',
      prikey: '@sentence(10, 20)'
    }, {
      id: '5',
      projectid: 'licai2',
      projectname: '理财',
      prikey: '@sentence(10, 20)'
    }, {
      id: '6',
      projectid: 'dzbl3',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }, {
      id: '7',
      projectid: 'yzt2',
      projectname: '银账通',
      prikey: '@sentence(10, 20)'
    }, {
      id: '8',
      projectid: 'licai1',
      projectname: '理财',
      prikey: '@sentence(10, 20)'
    }, {
      id: '9',
      projectid: 'dzbl1',
      projectname: '到账伴侣',
      prikey: '@sentence(10, 20)'
    }, {
      id: '10',
      projectid: 'yzt1',
      projectname: '银账通',
      prikey: '@sentence(10, 20)'
    }, {
      id: '11',
      projectid: 'licai8',
      projectname: '理财',
      prikey: '@sentence(10, 20)'
    }, {
      id: '12',
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
    //查询列表
    {
        url: '/project/list',
        type: 'post',
        response: config => {
            return {
                retCode: '00',
                list: data.items,
                count:13
            }
        }
    },
    //查询详情
    {
      url: '/project/qry',
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
        url: '/project/add',
        type: 'post',
        response: config => {
        return {
            retCode: '00',
            retMsg:'新增成功！'
        }
        }
    },
    //修改
    {
        url: '/project/update',
        type: 'post',
        response: config => {
        return {
            retCode: '00',
            retMsg:'修改成功！'
        }
        }
    },
    //删除
    {
      url: '/project/del',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          retMsg: '刹车成功！'
        }
      }
    }
]
