<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules"  label-width="120px">
      <el-form-item label="重定向地址" prop="redirectcode">
        <el-input v-model="form.redirectcode" placeholder="请输入重定向地址" />
      </el-form-item>

      <el-form-item label="环境编号" prop="redirectenv">
        <el-input v-model="form.redirectenv" placeholder="请输入环境编号"/>
      </el-form-item>

      <el-form-item label="重定向名称" prop="redirectname">
        <el-input v-model="form.redirectname" placeholder="请输入重定向名称"/>
      </el-form-item>

     <!--  <el-form-item label="重定向地址" prop="redirecthost">
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
import { redirect } from '@/api/req'

export default {
    data() {
        return {
            form: {
                redirectcode: '',
                redirectenv: '',
                redirectname: '',
                redirecthost: '',
                requrl: '',
            },
            rules: {
                redirectcode: [
                    { required: true, message: '请输入重定向地址', trigger: 'blur' },
                    { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
                ],
                redirectenv: [
                    { required: true, message: '请输入环境编号', trigger: 'blur' }
                ],
                redirectname: [
                    { required: true, message: '请输入重定向名称', trigger: 'blur' }
                ],
                /* region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ] */
            }
        }
    },
  methods: {
    onSubmit() {
        this.$refs['form'].validate((valid) => {
            if (valid) {

                var params = this.form;
                redirect().then(response => {
                    console.log(response.data.requrl);
                    window.open(response.data.requrl, '_blank').location;
                })

            } else {
                console.log('error submit!!');
                return false;
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

