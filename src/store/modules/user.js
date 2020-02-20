import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
        if (username == 'admin' && password == '111111') {
            const data = {
              token: 'admin-token'
            }
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve()
        }else{
            reject(error)
        }
      /* login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      }) */
    })
  },

  // get user info
  getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.token) {
                const data = {
                    roles: ['admin'],
                    introduction: '管理员',
                    avatar: 'static/images/logo.png',
                    name: 'Admin'
                }
                if (!data) {
                  reject('验证失败，请重新登录！')
                }

                const {
                  roles,
                  name,
                  avatar,
                  introduction
                } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                  reject('getInfo: 角色必须是非空数组！')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }else{
                reject(error)
            }
            /* getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                reject('验证失败，请重新登录！')
                }

                const { roles, name, avatar, introduction } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                reject('getInfo: 角色必须是非空数组！')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            }) */
        })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
        if (state.token) {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()

            dispatch('tagsView/delAllViews', null, { root: true })
            resolve()
        } else {
          reject(error)
        }

    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()

    //     dispatch('tagsView/delAllViews', null, { root: true })
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({
      commit,
      dispatch
    }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo');
      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      router.addRoutes(accessRoutes)

      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
