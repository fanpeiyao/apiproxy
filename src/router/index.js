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
    }, {
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
        }, {
            path: 'api',
            component: () => import('@/views/config/api/index'), // Parent router-view
            name: 'apiManage',
            meta: {
                title: '接口管理'
            },
            children: [{
                path: 'api-notice',
                component: () => import('@/views/config/api/notice'), 
                name: 'api-notice',
                meta: {
                    title: '通知接口'
                }
            }, {
                path: 'api-query',
                component: () => import('@/views/config/api/query'),
                name: 'api-query',
                meta: {
                    title: '查询接口'
                }
            }, {
                path: 'api-jump',
                component: () => import('@/views/config/api/jump'),
                name: 'api-jump',
                meta: {
                    title: '页面跳转接口'
                }
            }]
        }]
    }, {
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