<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="待加密内容" prop="content">
        <el-input
          v-model="form.content"
          placeholder="请输入待加密内容"
          type="textarea"
          :autosize="{ minRows:5}"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">加密</el-button>
      </el-form-item>

      <el-form-item label="加密结果" v-if="result">
        <el-input v-model="result" disabled type="textarea" :autosize="{ minRows:5}" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { base64Code } from "@/api/assist";
export default {
    data() {
        return {
            form: {
                content: ""
            },
            rules: {
                content: [
                    { required: true, message: '请输入待加密内容', trigger: 'blur' },
                ]
            },
            result: ""
        };
    },
  methods: {
    onSubmit() {
        this.$refs['form'].validate((valid) => {
            if (valid) {
                base64Code(this.form).then(result => {
                    if (result.retCode == '00') {
                        this.result = result.encrypt;
                    }
                });
            }
        });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

