<template>
  <div class="app-container">

        <div class="handle-box">
            <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="onSubmit()">生成</el-button>
        </div>
        <el-form ref="form" :model="form" v-if='showForm' label-width="120px">
            <el-form-item label="公钥">
                <el-input  type="textarea" v-model="form.pubkey" disabled/>
            </el-form-item>

            <el-form-item label="私钥">
                <el-input  type="textarea" v-model="form.prikey" disabled />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="download()">下载</el-button>
            </el-form-item>

        </el-form>
  </div>
</template>

<script>
import { getCipher } from '@/api/assist'
export default {
    data() {
        return {
            form:{
                pubkey:'',
                prikey:''
            },
            showForm:false
        }
    },
    methods: {
        onSubmit() {
            console.log(1111)
            getCipher().then(result => {
                if(result.retCode == '200'){

                    this.showForm =true;
                    this.form = result.data;
                }
            })

        },
        download() {
            //创建元素
            var ele = document.createElement('a');
            //设置下载文件名
            ele.download = "cipher.txt";
            //隐藏元素
            ele.style.display = "none";
            var str = '公钥：' + this.form.pubkey +'\n\n私钥：' + this.form.prikey;
            //字符内容转变成blob地址
            var blob = new Blob([str]);
            //如果是链接，这里也可以直接设置链接地址
            ele.href = URL.createObjectURL(blob);
            document.body.appendChild(ele);
            //模拟点击
            ele.click();
            //移除元素
            document.body.removeChild(ele);

        },
    },
    created(){
        // this.onSubmit();
    }


}
</script>

<style scoped>
.line{
  text-align: center;
}
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
</style>

