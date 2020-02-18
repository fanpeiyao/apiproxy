const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '管理员',
      avatar: 'static/images/logo.png',
    name: 'Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'static/images/logo.png',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/apiproxy/user/login',
    type: 'post',
    response: config => {
        console.log(config)
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          retCode: 500,
          retMsg: 'Account and password are incorrect.'
        }
      }

      return {
        retCode: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/apiproxy/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          retCode: 50008,
          retMsg: 'Login failed, unable to get user details.'
        }
      }

      return {
        retCode: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/apiproxy/user/logout',
    type: 'post',
    response: _ => {
      return {
        retCode: 200,
        data: 'success'
      }
    }
  }
]
