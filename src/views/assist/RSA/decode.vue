<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="私钥"  prop='prikey'>
        <el-input v-model="form.prikey" placeholder="请输入私钥" />
      </el-form-item>

      <el-form-item label="待解密内容"  prop='content'>
        <el-input v-model="form.content" placeholder="待解密内容" type="textarea" :autosize="{ minRows:3}"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">解密</el-button>
      </el-form-item>


      <el-form-item label="解密结果" v-if='result'>
        <el-input v-model="result" disabled="" type="textarea" :autosize="{ minRows:3}"/>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
import { rsaDecode } from '@/api/assist'
export default {
    data() {
        return {
            form: {
                prikey: '',
                content: '',
            },
            rules: {
                content: [
                    { required: true, message: '请输入待解密内容', trigger: 'blur' },
                ],
                prikey: [
                    { required: true, message: '请输入私钥', trigger: 'blur' },
                ]
            },
            result:''
        }
    },
  methods: {
    onSubmit() {
        this.$refs['form'].validate((valid) => {
            if (valid) {
                rsaDecode(this.form).then(result => {
                    if (result.retCode == "200") {
                        this.result = result.data.reqdata;
                    }
                });
            }
        });
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

