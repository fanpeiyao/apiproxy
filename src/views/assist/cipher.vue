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
      this.$message('submit!');
        this.showForm =true;
        this.form.pubkey='11';

        this.form.pubkey='22'

    },
    download() {
        console.log();
      },
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

