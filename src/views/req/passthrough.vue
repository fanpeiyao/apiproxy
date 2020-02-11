<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="透传目的地址" prop="url">
            <el-input v-model="form.url" placeholder="请输入透传目的地址"/>
        </el-form-item>

      <!-- <el-form-item label="重定向url" prop="path">
        <el-input v-model="form.path" placeholder="请输入重定向url" />
      </el-form-item>

      <el-form-item label="透传名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入透传名称"/>
      </el-form-item> -->

        <p class='tips'>
            透传目的地址格式：
            <span>http://gyjapi1.deenet.com.cn/apiproxy/passthrough/aaa/bbb，其中aaa和bbb请根据自己内容替换</span>
        </p>


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
import { passthrough } from '@/api/req'

export default {
    data() {
        return {
            form: {
               /*  path: '',
                name: '', */
                url: '',
            },

            rules: {
                url: [
                    { required: true, message: '请输入透传目的地址', trigger: 'blur' },
                    { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入透传目的地址', trigger: 'blur' }
                ],
                // path: [
                //     { required: true, message: '请输入重定向url', trigger: 'blur' }
                // ],
                // name: [
                //     { required: true, message: '请输入透传名称', trigger: 'blur' }
                // ],
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {

                    var params = this.form;
                    passthrough(params).then(response => {
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

