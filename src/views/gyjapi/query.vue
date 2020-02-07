<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
       <el-form-item label="项目名称">
        <el-select v-model="form.projectid" placeholder="请选择项目">
          <el-option  v-for="item in projects"
                        :key="item.projectid"
                        :label="item.projectname"
                        :value="item.projectid">
        </el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="查询接口">
        <el-select v-model="form.reqkey" placeholder="请选择要调试的查询接口">
          <el-option  v-for="item in apis"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
        </el-option>
        </el-select>
      </el-form-item>

   <!--    <el-form-item label="请求的key">
        <el-input v-model="form.reqkey" placeholder="请输入请求的key" />
      </el-form-item> -->

      <el-form-item label="版本号">
        <el-radio-group v-model="form.version">
          <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
          <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="发送渠道">
        <el-radio-group v-model="form.channel">
          <el-radio  v-for="item in channels"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                        {{item.label}}
          </el-radio>

        </el-radio-group>
      </el-form-item>



      <el-form-item label="Base64编码">
        <el-switch v-model="form.isBase64" />
      </el-form-item>

      <el-form-item label="私钥">
        <el-input v-model="form.privateKey"  type="textarea" :autosize="{ minRows:3}" placeholder="请输入您生成的RSA私钥" />
      </el-form-item>

      <el-form-item label="接口发送报文">
        <el-input v-model="form.reqdata" type="textarea" :autosize="{ minRows:10}"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>


      <el-form-item label="接口返回报文">
        <el-input v-model="form.respdata" :disabled="true" type="textarea" :autosize="{ minRows:10}"/>
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
            reqdata: '',
            respdata:'',
            reqkey:'ADDAGREEMENT',
            channel:'gyjapi',
            version:'2.0.0.0',
            isBase64:true,
            projectid:'yzt',
            privateKey:'',


        },


        projects:[],
         apis: [{
          value: 'ADDAGREEMENT',
          label: '商户签约(分行接口)'
        }, {
          value: 'QUERYAGREEMENT',
          label: '商户签约信息查询'
        }, {
          value: 'GYJWLHQRY',
          label: '结算账户明细查询'
        }],
        channels:[{
          value: 'gyjapi',
          label: '工银聚API'
        }]
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
  },
  created() {
      this.projects= [{
        projectid:'yzt',
        projectname:'银账通'
      },{
        projectid:'licai',
        projectname:'理财'
      }]
  },
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

