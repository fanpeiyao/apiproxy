// Just a mock data

export const constantRoutes = [
    {
        path: '/login',
        component: 'views/login/index',
        hidden: true
    },
    {
        path: '/404',
        component: 'views/404',
        hidden: true
    },
    {
        path: '/',
        component: 'layout/Layout',
        redirect: 'dashboard',
        children: [
        {
            path: 'dashboard',
            component: 'views/dashboard/index',
            name: 'Dashboard',
            meta: {
            title: '首页',
            icon: 'dashboard'
            }
        }
        ]
    },
    {
        path: '/gyjapi',
        component: 'layout/Layout',
        redirect: '/gyjapi/noticeapi',
        name: 'gyjapi',
        meta: {
            title: '工银聚API接口',
            icon: 'api'
        },
        children: [{
            path: 'noticeapi',
             name: 'noticeapi',
            component: 'views/gyjapi/notice',
            meta: {
                title: '通知接口',
                icon: 'notice'
            }
        }, {
            path: 'jumpapi',
            name: 'jumpapi',
            component: 'views/gyjapi/jump',
            meta: {
                title: '页面跳转',
                icon: 'jump'
            }
        }, {
          path: 'queryapi',
          name: 'queryapi',
            component: 'views/gyjapi/query',
            meta: {
                title: '查询接口',
                icon: 'query'
            }
        }]
    },

]

export const asyncRoutes = [
    {
        path: '/config',
        component: 'layout/Layout',
        redirect: '/config/redirectConf',
        name: 'Config',
        meta: {
            title: '功能配置',
            icon: 'config',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
            path: 'api',
            component: 'views/config/api/index', // Parent router-view
            name: 'apiManage',
            meta: {
            title: '接口管理'
            },
            children: [{
                path: 'api-notice',
                component: 'views/config/api/notice',
                name: 'api-notice',
                meta: {
                    title: '通知接口'
                }
            }, {
            path: 'api-query',
            component: 'views/config/api/query',
            name: 'api-query',
            meta: {
                title: '查询接口'
            }
            }, {
            path: 'api-jump',
            component: 'views/config/api/jump',
            name: 'api-jump',
            meta: {
                title: '页面跳转接口'
            }
            }]
        }, {
            path: 'apiConf',
            component: 'views/config/apiConf',
            name: 'apiConf',
            meta: {
            title: '接口附加参数管理'
            }
        }, {
            path: 'redirectConf',
            component: 'views/config/redirect',
            meta: {
            title: '重定向地址配置'
            }
        }, {
            path: 'passConf',
            component: 'views/config/pass',
            meta: {
            title: '透传配置'
            }
        }, {
            path: 'project',
            component: 'views/config/project',
            meta: {
            title: '项目管理',
            roles: ['admin']
            }
        }]
    },
    {
        path: '/permission',
        component: 'layout/Layout',
        redirect: '/permission/index',
        alwaysShow: true,
        meta: {
            title: '权限配置',
            icon: 'lock',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'directive',
                component: 'views/permission/directive',
                name: 'DirectivePermission',
                meta: {
                    title: '指令权限'
                }
            },
            {
                path: 'role',
                component: 'views/permission/role',
                name: 'RolePermission',
                meta: {
                    title: '角色权限',
                    roles: ['admin']
                }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]
