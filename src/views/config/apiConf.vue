<template>
  <div class="app-container">

        <div class="handle-box">
            <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="addFormVisible = true"> 新增
            </el-button>


            <el-input  size="small" v-model="query.projectid" placeholder="项目编号" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.apiname" placeholder="接口名称" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.key" placeholder="字段key" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

       <el-table  :data="tableData"  border style="width: 100%">
            <el-table-column  fixed  prop="projectid" label="项目编号" >
            </el-table-column>
            <el-table-column  prop="apiname" label="接口名称"  width="180"> </el-table-column>
            <el-table-column  prop="key" label="key" >
            </el-table-column>
            <el-table-column  prop="value" label="value" ></el-table-column>
            <el-table-column fixed="right" label="操作"  >
            <template slot-scope="scope">
                <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
                <el-button type="text" size="small"  @click="onUpdateForm(scope.row)" >修改</el-button>
            </template>
            </el-table-column>
        </el-table>



<el-dialog title="新增配置" :visible.sync="addFormVisible">
  <el-form :model="addForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth">
      <el-input v-model="addForm.projectid" autocomplete="off" placeholder="请输入内容" ></el-input>
    </el-form-item>

    <el-form-item label="接口名称" :label-width="formLabelWidth">
      <el-input v-model="addForm.apiname" autocomplete="off" placeholder="请输入内容" ></el-input>
    </el-form-item>

    <el-form-item label="key" :label-width="formLabelWidth">
      <el-input v-model="addForm.key" autocomplete="off" placeholder="请输入内容" ></el-input>
    </el-form-item>

    <el-form-item label="value" :label-width="formLabelWidth">
      <el-input v-model="addForm.value" autocomplete="off" placeholder="请输入内容" ></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false" size='small'>取 消</el-button>
    <el-button type="primary" @click="onAdd()" size='small'>确 定</el-button>
  </div>
</el-dialog>



<el-dialog title="编辑跳转接口" :visible.sync="upFormVisible">
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

    <el-form-item label="value" :label-width="formLabelWidth">
      <el-input v-model="updateForm.value" autocomplete="off"></el-input>
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
            projectid: '',
            apiname: '',
            key: '',
        },
        addForm: {
            projectid: '',
            apiname: '',
            key: '',
            value:''
        },
        updateForm: {},

        tableData: [ {
            projectid: 'yzt',
            apiname: '外汇来汇明细通知',
            key:'GYJREMITNOTIFY',
            value:'2.0.0.0'
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
    width: 200px;
    display: inline-block;
}

</style>

