<template>
  <div class="app-container">

        <div class="handle-box">
            <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="addFormVisible = true">新增</el-button>
            <el-select size="small" v-model="query.version" placeholder="版本号" class="handle-select mr10">
                <el-option key="1" label="2.0.0.0" value="2.0.0.0"></el-option>
                <el-option key="2" label="1.0.0.0" value="1.0.0.0"></el-option>
            </el-select>
            <el-input  size="small" v-model="query.transcode" placeholder="接口名称" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

       <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="projectid"
      label="项目编号"
      width="150">
    </el-table-column>
    <el-table-column  prop="apiname" label="接口名称"  width="180"> </el-table-column>
    <el-table-column  prop="key" label="key"  width="300">
    </el-table-column>
    <el-table-column  prop="version" label="版本号" width="120"></el-table-column>
    <el-table-column  prop="content" label="报文" width="400"></el-table-column>
    <el-table-column  prop="base64" label="base64" width="120"></el-table-column>


    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small"  @click="onUpdateForm(scope.row)" >修改</el-button>
      </template>
    </el-table-column>
  </el-table>



<el-dialog title="新增查询接口" :visible.sync="addFormVisible">
  <el-form :model="addForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth">
      <el-input v-model="addForm.projectid" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="接口名称" :label-width="formLabelWidth">
      <el-input v-model="addForm.apiname" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="key" :label-width="formLabelWidth">
      <el-input v-model="addForm.key" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label="版本号" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.version">
          <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
          <el-radio  label='1.0.0.0'>1.0.0.0</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Base64编码" :label-width="formLabelWidth">
        <el-switch v-model="addForm.base64"  active-value="1" inactive-value="0"/>
      </el-form-item>

      <el-form-item label="报文" :label-width="formLabelWidth">
        <el-input v-model="addForm.content" type="textarea"
  :autosize="{ minRows:10}"/>
      </el-form-item>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false" size='small'>取 消</el-button>
    <el-button type="primary" @click="onAdd()" size='small'>确 定</el-button>
  </div>
</el-dialog>



<el-dialog title="编辑查询接口" :visible.sync="upFormVisible">
  <el-form :model="updateForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth">
      <el-input v-model="updateForm.projectid" disabled autocomplete="off"></el-input>
    </el-form-item>


    <el-form-item label="接口名称" :label-width="formLabelWidth">
      <el-input v-model="updateForm.apiname" disabled autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="key" :label-width="formLabelWidth">
      <el-input v-model="updateForm.key" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label="版本号" :label-width="formLabelWidth">
        <el-radio-group disabled v-model="updateForm.version">
          <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
          <el-radio  label='1.0.0.0'>1.0.0.0</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Base64编码" :label-width="formLabelWidth">
        <el-switch v-model="updateForm.base64" active-value="1" inactive-value="0" />
      </el-form-item>

      <el-form-item label="报文" :label-width="formLabelWidth">
        <el-input v-model="updateForm.content" type="textarea"
  :autosize="{ minRows:10}"/>
      </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="upFormVisible = false" size='small'>取 消</el-button>
    <el-button type="primary" @click="onUpdate(scope.row)" size='small'>确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
        query:{
            version:'',
            transcode:''
        },
        addForm: {
            projectid: '',
            apiname: '',
            key: '',
            version:'2.0.0.0',
            content:'',
            base64:'1'
        },
        updateForm: {},

        tableData: [ {
            projectid: 'yzt',
          apiname: '商户签约(分行接口)',
          key:'ADDAGREEMENT',
            version:'2.0.0.0',
            content:'ssssssssssssssssss',
            base64:'1'
        }],
        formLabelWidth: '120px',
        addFormVisible: false,
        upFormVisible: false,
    }


  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onDel(row) {
        console.log(row);
      },
    onUpdateForm(row) {
        this.updateForm = row;
        this.upFormVisible = true
      },
    onAdd(row) {
        console.log(row);
      },
    onUpdate(row) {
        console.log(row);
      },
       //
        handleSearch() {

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


