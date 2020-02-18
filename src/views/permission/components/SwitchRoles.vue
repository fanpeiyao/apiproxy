<template>
  <div>

        <div style="margin-bottom:15px;">
            目前用户角色：{{ roles }}
        </div>
        切换用户角色：
        <el-radio-group v-model="switchRoles">
            <el-radio-button label="editor" />
            <el-radio-button label="admin" />
        </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        //来调取store里的user.js的changeRoles方法，从而更新
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
