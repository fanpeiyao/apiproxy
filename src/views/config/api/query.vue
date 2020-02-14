<template>
  <div class="app-container">

        <div class="handle-box">
            <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="addFormVisible = true">新增</el-button>
            <el-select size="small" v-model="query.version" placeholder="版本号" class="handle-select mr10">
                <el-option key="1" label="2.0.0.0" value="2.0.0.0"></el-option>
                <el-option key="2" label="1.0.0.0" value="1.0.0.0"></el-option>
            </el-select>
            <el-input  size="small" v-model="query.projectid" placeholder="项目编号" class="handle-input mr10"></el-input>
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
    <el-table-column  prop="content" label="报文" width="1000"></el-table-column>
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


        <!--分页-->
		<el-col :span="24" class="toolbar" v-show='tableData.length>0' >
			<el-pagination layout="prev, pager, next" :current-page.sync='currentpage' @current-change="handleCurrentChange" :page-size="limit" :total="tableData.length" style="float:right;">
			</el-pagination>
		</el-col>


<el-dialog title="新增查询接口" :visible.sync="addFormVisible">
  <el-form :model="addForm" :rules="rules" ref="addForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth"  prop="projectid">
      <el-input v-model="addForm.projectid" placeholder="请输入项目编号" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="接口名称" :label-width="formLabelWidth" prop="apiname">
      <el-input v-model="addForm.apiname" placeholder="请输入接口名称" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="key" :label-width="formLabelWidth" prop="key">
      <el-input v-model="addForm.key" placeholder="请输入key" autocomplete="off"></el-input>
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

      <el-form-item label="报文" :label-width="formLabelWidth" prop="content">
        <el-input v-model="addForm.content" type="textarea" placeholder="请输入报文内容"
  :autosize="{ minRows:10}"/>
      </el-form-item>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false" size='small'>取 消</el-button>
    <el-button type="primary" @click="onAdd()" size='small'>确 定</el-button>
  </div>
</el-dialog>



<el-dialog title="编辑查询接口" :visible.sync="upFormVisible">
  <el-form :model="updateForm"  :rules="rules" ref="updateForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth" prop="projectid">
      <el-input v-model="updateForm.projectid" disabled autocomplete="off" placeholder="请输入项目编号" ></el-input>
    </el-form-item>


    <el-form-item label="接口名称" :label-width="formLabelWidth" prop="apiname">
      <el-input v-model="updateForm.apiname" disabled autocomplete="off" placeholder="请输入接口名称" ></el-input>
    </el-form-item>

    <el-form-item label="key" :label-width="formLabelWidth" prop="key">
      <el-input v-model="updateForm.key" autocomplete="off" placeholder="请输入key" ></el-input>
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

      <el-form-item label="报文" :label-width="formLabelWidth" prop="content">
        <el-input v-model="updateForm.content" type="textarea"  placeholder="请输入报文内容" :autosize="{ minRows:10}"/>
      </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="upFormVisible = false" size='small'>取 消</el-button>
    <el-button type="primary" @click="onUpdate()" size='small'>确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
import { getInterface,addInterface,updateInterface,delInterface } from '@/api/config'
export default {
  data() {
    return {
        query:{
            version:'',
            transcode:'',
            projectid:''
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

        rules: {
            projectid: [
                { required: true, message: '请输入项目编号', trigger: 'blur' }
            ],
            apiname: [
                { required: true, message: '请输入接口名称', trigger: 'blur' }
            ],
            key: [
                { required: true, message: '请输入key', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入报文内容', trigger: 'blur' }
            ]
        },

        tableData: [],
        formLabelWidth: '120px',
        addFormVisible: false,
        upFormVisible: false,
        page:0,
        limit:10,
        currentpage:1,
    }


  },
    methods: {
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            row.type = '3';  //1通知2跳转3查询
            delInterface(row).then(result => {
                if(result.retCode == '200'){
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.addFormVisible = false;
                    this.listLoading = false;
                    this.getData();
                }
            })
        },
        onUpdateForm(row) {
            this.updateForm = row;
            this.upFormVisible = true
        },
        onAdd(row) {

            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    this.addForm.type = '3';  //1通知2跳转3查询
                    addInterface(this.addForm).then(result => {

                        if(result.retCode == '200'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addFormVisible = false;
                            this.listLoading = false;
                            this.getData();
                        }
                    })
                }
            })
        },
        onUpdate(row) {
             this.$refs['updateForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    this.updateForm.type = '3';  //1通知2跳转3查询
                    updateInterface(this.updateForm).then(result => {
                        if(result.retCode == '200'){
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.upFormVisible = false;
                            this.listLoading = false;
                            this.getData();
                        }
                    })
                }
             })
        },
        //
        handleSearch() {

        },
        //获取列表
        getData() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params.type = '3';  //1通知2跳转3查询
            params = this.query;
            params.page = this.page;
            getInterface(params).then(result => {
                console.log(result)
                that.listLoading = false;
                that.tableData = result.data;
            })

        },
    },
    created(){
        this.getData();
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
    width: 240px;
    display: inline-block;
}
</style>


