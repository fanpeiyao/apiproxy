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
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body;
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          retCode: 500,
          retMsg: 'Account and password are incorrect.'
        }
      }

      return {
        retCode: '00',
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
        console.log(config)
      const { token } = config.query
      const info = users[token]
        console.log(info)
      // mock error
      if (!info) {
        return {
          retCode: 50008,
          retMsg: 'Login failed, unable to get user details.'
        }
      }

      return {
        retCode: '00',
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        retCode: '00',
        data: 'success'
      }
    }
  }
]
