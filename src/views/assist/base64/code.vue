<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="待加密内容">
        <el-input v-model="form.content" placeholder="请输入待加密内容" type="textarea" :autosize="{ minRows:3}"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">加密</el-button>
      </el-form-item>


      <el-form-item label="加密结果" v-if='result'>
        <el-input v-model="result" disabled="" type="textarea" :autosize="{ minRows:3}"/>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        content: '',
      },
      result:''
    }
  },
  methods: {
    onSubmit() {
      this.result = '11111111111';
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

