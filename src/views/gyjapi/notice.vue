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

     <!-- <el-form-item label="Base64编码">
        <el-select v-model="form.isBase64" placeholder="请选择是否需要Base64编码">
          <el-option  value='0' label='否'></el-option>
          <el-option  value='1' label='是'></el-option>
        </el-select>
      </el-form-item> -->


      <el-form-item label="版本号">
        <el-radio-group v-model="form.version">
          <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
          <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
        </el-radio-group>
      </el-form-item>

     <!-- <el-form-item label="发送渠道">
        <el-select v-model="form.channel" placeholder="请选择发送渠道">
          <el-option  v-for="item in channels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
        </el-option>
        </el-select>
      </el-form-item> -->
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
        <el-switch v-model="form.base64"  active-value="1" inactive-value="0"/>
      </el-form-item>

      <el-form-item label="接口发送报文">
        <el-input v-model="form.reqdata" type="textarea"
  :autosize="{ minRows:10}"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>


      <el-form-item label="接口返回报文">
        <el-input v-model="form.respdata" :disabled="true" type="textarea"
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
        api: 'GYJWLHNOTIFY',
        reqdata: '',
        respdata:'',
        notifyurl:'',
        channel:'gyj',
        version:'2.0.0.0',
        base64:'1',
        projectid:'yzt'


      },


        projects:[],
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
          label: '工银聚API'
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

