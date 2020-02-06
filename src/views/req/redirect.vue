<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="重定向url">
        <el-input v-model="form.redirectcode" placeholder="请输入重定向url" />
      </el-form-item>

      <el-form-item label="环境编号">
        <el-input v-model="form.redirectenv" placeholder="请输入redirectenv"/>
      </el-form-item>

      <el-form-item label="重定向名称">
        <el-input v-model="form.redirectname" placeholder="请输入重定向名称"/>
      </el-form-item>

      <el-form-item label="重定向地址">
        <el-input v-model="form.redirecthost" placeholder="请输入重定向地址"/>
      </el-form-item>

      <el-form-item label="配置请求地址">
        <el-input v-model="form.requrl" placeholder="请输入配置请求地址"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        redirectcode: '',
        redirectenv: '',
        redirectname: '',
        redirecthost: '',
        requrl: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

