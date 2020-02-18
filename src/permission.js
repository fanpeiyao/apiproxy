import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie

NProgress.configure({
    showSpinner: false
})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    document.title = 'apiproxy'


    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
            NProgress.done()
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next()
            } else {
                try {
                    //roles必须为数组! ['admin'] or ,['developer','editor']
                    const { roles } = await store.dispatch('user/getInfo');
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
                    // 获取异步路由并且加入路由中
                    router.addRoutes(accessRoutes)
                    next({
                        ...to,
                        replace: true
                    })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }


        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
