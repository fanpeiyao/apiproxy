<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="重定向url">
        <el-input v-model="form.path" placeholder="请输入重定向url" />
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称"/>
      </el-form-item>

      <el-form-item label="透传目的地址">
        <el-input v-model="form.url" placeholder="请输入透传目的地址"/>
      </el-form-item>

      <!-- <el-form-item label="重定向地址">
        <el-input v-model="form.redirecthost" placeholder="请输入重定向地址"/>
      </el-form-item> -->

      <!-- <el-form-item label="配置请求地址">
        <el-input v-model="form.requrl" placeholder="请输入配置请求地址"/>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        path: '',
        name: '',
        url: '',
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

