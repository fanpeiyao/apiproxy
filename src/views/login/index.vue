<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
    methods: {
        showPwd() {
        if (this.passwordType === 'password') {
            this.passwordType = ''
        } else {
            this.passwordType = 'password'
        }
        this.$nextTick(() => {
            this.$refs.password.focus()
        })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$router.push({ path: this.redirect || '/' })
                        this.loading = false
                    }).catch(() => {
                        this.loading = false;
                        this.$message({
                            showClose: true,
                            message: '用户名或密码错误',
                            type: 'error'
                        });
                    })
                } else {
                    console.log('登陆失败!')
                    return false
                }
            })
        }
    }
}
</script>

<style>
@supports (-webkit-mask:none) and (not (cater-color:#fff)) {
	.login-container .el-input input {
        color:#fff
    }
}
.login-container .el-input {
	display:inline-block;
	height:47px;
	width:85%
}
.login-container .el-input input {
	background:transparent;
	border:0;
	-webkit-appearance:none;
	border-radius:0;
	padding:12px 5px 12px 15px;
	color:#fff;
	height:47px;
	caret-color:#fff
}
.login-container .el-input input:-webkit-autofill {
	-webkit-box-shadow:0 0 0 1000px #283443 inset!important;
	box-shadow:inset 0 0 0 1000px #283443!important;
	-webkit-text-fill-color:#fff!important
}
.login-container .el-form-item {
	border:1px solid hsla(0,0%,100%,.1);
	background:rgba(0,0,0,.1);
	border-radius:5px;
	color:#454545
}
.login-container {
	min-height:100%;
	width:100%;
	background-color:#2d3a4b;
	overflow:hidden
}
.login-container .login-form {
	position:relative;
	width:520px;
	max-width:100%;
	padding:160px 35px 0;
	margin:0 auto;
	overflow:hidden
}
.login-container .tips {
	font-size:14px;
	color:#fff;
	margin-bottom:10px
}
.login-container .tips span:first-of-type {
	margin-right:16px
}
.login-container .svg-container {
	padding:6px 5px 6px 15px;
	color:#889aa4;
	vertical-align:middle;
	width:30px;
	display:inline-block
}
.login-container .title-container {
	position:relative
}
.login-container .title-container .title {
	font-size:26px;
	color:#eee;
	margin:0 auto 40px auto;
	text-align:center;
	font-weight:700
}
.login-container .show-pwd {
	position:absolute;
	right:10px;
	top:7px;
	font-size:16px;
	color:#889aa4;
	cursor:pointer;
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none
}
</style>
