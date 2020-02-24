import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: '管理员，可看任何页面，进行任意操作',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: '业务员，部分页面可见',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
]

export default [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        retCode: '00',
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/roles',
    type: 'post',
    response: _ => {
      return {
        retCode: '00',
        data: roles
      }
    }
  },

  // add role
  {
    url: '/role',
    type: 'post',
    response: {
      retCode: '00',
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      retCode: '00',
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      retCode: '00',
      data: {
        status: 'success'
      }
    }
  }
]
