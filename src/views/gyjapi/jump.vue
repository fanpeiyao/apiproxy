<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目名称">
        <!-- <el-input v-model="form.projectid" placeholder="请输入项目编号" /> -->
        <el-select v-model="form.projectid" placeholder="请选择项目">
          <el-option  v-for="item in projects"
                        :key="item.projectid"
                        :label="item.projectname"
                        :value="item.projectid">
        </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="请求的key">
        <el-input v-model="form.reqkey" placeholder="请输入请求的key" />
      </el-form-item>



      <!-- <el-form-item label="用户编号">
        <el-input v-model="form.customerId" placeholder="请输入用户编号" />
      </el-form-item>

      <el-form-item label="用户名称">
        <el-input v-model="form.customerName" placeholder="用户名称" />
      </el-form-item>

       <el-form-item label="角色">
        <el-select v-model="form.roleid" placeholder="请选择角色">
          <el-option  value='1' label='经销商'></el-option>
          <el-option  value='2' label='业务员'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Trancode">
        <el-input v-model="form.trancode" placeholder="请输入Trancode" />
      </el-form-item> -->

      <el-form-item label="版本号">
        <el-radio-group v-model="form.version">
          <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
          <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="Base64编码">
        <el-switch v-model="form.base64"  active-value="1" inactive-value="0"/>
      </el-form-item>


      <!-- <el-form-item label="跳转地址">
        <el-input v-model="form.url" placeholder="请输入url" />
      </el-form-item> -->

      <el-form-item label="接口发送报文">
        <el-input v-model="form.reqdata" type="textarea"
  :autosize="{ minRows:10}"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>




    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        projectid: 'yzt',
        reqkey: '',
        url:'',
        reqdata: '',
        trancode:'',
        version:'2.0.0.0',
        base64:'1',//0-关 1-开
        roleid:'1',customerId:'',
        customerName:'',
        mobile:'',



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

