<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="merid">
        <el-input v-model="form.merid" placeholder="请输入商户编号" />
      </el-form-item>

       <el-form-item label="通知接口">
        <el-select v-model="form.api" placeholder="请选择要调试的通知接口">
          <el-option  v-for="item in apis"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知地址">
        <el-input v-model="form.notifyurl" placeholder="请输入通知地址" />
      </el-form-item>

  <el-form-item label="发送渠道">
        <el-select v-model="form.channel" placeholder="请选择发送渠道">
          <el-option  v-for="item in channels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="接口发送报文">
        <el-input v-model="form.reqdata" type="textarea"
  :autosize="{ minRows:10}"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>


      <el-form-item label="接口返回报文">
        <el-input v-model="form.respdata" type="textarea"
  :autosize="{ minRows:10}"/>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        merid: '',
        api: '',
        reqdata: '',
        respdata:'',
        notifyurl:'',
        channel:''

      },

        apis: [{
          value: 'GYJWLHNOTIFY',
          label: '结算账户明细通知'
        }, {
          value: 'GYJBILLNOTIFY',
          label: '票据状态通知'
        }, {
          value: 'GYJREMITNOTIFY',
          label: '外汇来汇明细通知'
        }],
        channels:[{
          value: 'gyj',
          label: '工银聚'
        },{
          value: 'gyjapi',
          label: '工银聚'
        },{
          value: 'icbc',
          label: '总行发送'
        }]
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

