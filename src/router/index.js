import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/req',
    component: Layout,
    redirect: '/req/redirect',
    name: 'req',
    meta: {
      title: '请求转发',
      icon: 'example'
    },
    children: [{
      path: 'redirect',
      name: 'reqRedirect',
      component: () => import('@/views/req/redirect'),
      meta: {
        title: '请求重定向',
        icon: 'redirect'
      }
    }, {
      path: 'passtrough',
      name: 'reqPasstrough',
      component: () => import('@/views/req/passtrough'),
      meta: {
        title: '请求透传',
        icon: 'trough'
      }
    }]
  },


{
  path: '/gyjapi',
  component: Layout,
  redirect: '/gyjapi/noticeapi',
  name: 'gyjapi',
  meta: {
    title: '工银聚API接口',
    icon: 'api'
  },
  children: [

    {
      path: 'noticeapi',
      name: 'noticeapi',
      component: () => import('@/views/gyjapi/notice'),
      meta: {
        title: '通知接口',
        icon: 'notice'
      }
    }, {
      path: 'jumpapi',
      name: 'jumpapi',
      component: () => import('@/views/gyjapi/jump'),
      meta: {
        title: '页面跳转',
        icon: 'jump'
      }
    }, {
      path: 'queryapi',
      name: 'queryapi',
      component: () => import('@/views/gyjapi/query'),
      meta: {
        title: '查询接口',
        icon: 'query'
      }
    }
  ]
},

{
  path: '/config',
  component: Layout,
  redirect: '/config/redirectConf',
  name: 'Config',
  meta: {
    title: '功能配置',
    icon: 'config'
  },
  children: [{
        path: 'redirectConf',
        component: () => import('@/views/config/redirect'),
        meta: {
          title: '重定向地址配置'
        }
      }, {
        path: 'passConf',
        component: () => import('@/views/config/pass'),
        meta: {
          title: '透传配置'
        }
      }, {
        path: 'project',
        component: () => import('@/views/config/project'),
        meta: {
          title: '项目管理'
        }
      },{
    path: 'api',
    component: () => import('@/views/config/api/index'), // Parent router-view
    name: 'apiManage',
    meta: {
      title: '接口管理'
    },
    children: [ {
      path: 'api-notice',
      component: () => import('@/views/config/api/index'),  //暂时无用共用一个页面，有用时可单独新建
      name: 'api-notice',
      meta: {
        title: '通知接口'
      },
      children: [{
        path: 'no-add',
        component: () => import('@/views/config/api/notice/add'),
        name: 'no-add',
        meta: {
          title: '新增接口'
        }
      }, {
        path: 'no-del',
        component: () => import('@/views/config/api/notice/del'),
        name: 'no-del',
        meta: {
          title: '删除接口'
        }
      }, {
        path: 'no-update',
        component: () => import('@/views/config/api/notice/update'),
        name: 'no-update',
        meta: {
          title: '修改接口'
        }
      }]
    },
{
  path: 'api-query',
  component: () => import('@/views/config/api/index'),
  name: 'api-query',
  meta: {
    title: '查询接口'
  },
  children: [{
    path: 'query-add',
    component: () => import('@/views/config/api/query/add'),
    name: 'query-add',
    meta: {
      title: '新增接口'
    }
  }, {
    path: 'query-del',
    component: () => import('@/views/config/api/query/del'),
    name: 'query-del',
    meta: {
      title: '删除接口'
    }
  }, {
    path: 'query-update',
    component: () => import('@/views/config/api/query/update'),
    name: 'query-update',
    meta: {
      title: '修改接口'
    }
  }]
},
{
  path: 'api-jump',
  component: () => import('@/views/config/api/index'),
  name: 'api-jump',
  meta: {
    title: '页面跳转接口'
  },
  children: [{
    path: 'jump-add',
    component: () => import('@/views/config/api/jump/add'),
    name: 'jump-add',
    meta: {
      title: '新增接口'
    }
  }, {
    path: 'jump-del',
    component: () => import('@/views/config/api/jump/del'),
    name: 'jump-del',
    meta: {
      title: '删除接口'
    }
  }, {
    path: 'jump-update',
    component: () => import('@/views/config/api/jump/update'),
    name: 'jump-update',
    meta: {
      title: '修改接口'
    }
  }]
}]
  } ]
},
{
  path: '/assist',
  component: Layout,
  redirect: '/assist/table',
  name: 'assist',
  meta: {
    title: '辅助功能',
    icon: 'assist'
  },
  children: [{
    path: 'cipher',
    name: 'cipher',
    component: () => import('@/views/assist/cipher'),
    meta: {
      title: '公私钥生成',
      icon: 'cipher'
    }
  }, {
    path: 'RSA',
    name: 'RSA',
    component: () => import('@/views/assist/RSA'),
    meta: {
      title: 'RSA编码/解码',
      icon: 'RSA'
    }
  }, {
    path: 'base64',
    name: 'base64',
    component: () => import('@/views/assist/base64'),
    meta: {
      title: 'BASE64编码/解码',
      icon: 'code'
    }
  }, {
    path: 'websocket',
    name: 'websocket',
    component: () => import('@/views/assist/websocket'),
    meta: {
      title: '请求查看(websocket)',
      icon: 'websocket2'
    }
  }]
},


  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [{
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: {
        title: 'Table',
        icon: 'table'
      }
    }, {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: {
        title: 'Tree',
        icon: 'tree'
      }
    }]
  },



  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [{
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: {
        title: 'Menu1'
      },
      children: [{
        path: 'menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Menu1-1',
        meta: {
          title: 'Menu1-1'
        }
      }, {
        path: 'menu1-2',
        component: () => import('@/views/nested/menu1/menu1-2'),
        name: 'Menu1-2',
        meta: {
          title: 'Menu1-2'
        },
        children: [{
          path: 'menu1-2-1',
          component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
          name: 'Menu1-2-1',
          meta: {
            title: 'Menu1-2-1'
          }
        }, {
          path: 'menu1-2-2',
          component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
          name: 'Menu1-2-2',
          meta: {
            title: 'Menu1-2-2'
          }
        }]
      }, {
        path: 'menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3'),
        name: 'Menu1-3',
        meta: {
          title: 'Menu1-3'
        }
      }]
    }, {
      path: 'menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: {
        title: 'menu2'
      }
    }]
  },




  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router