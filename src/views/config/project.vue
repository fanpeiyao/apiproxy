<template>
  <div class="app-container">

        <!-- <el-form ref="form"  >
            <el-form-item>
                <el-button type="primary" size="small" @click="addFormVisible = true">新增</el-button>
            </el-form-item>

        </el-form> -->
         <div class="handle-box">
            <el-button type="primary" class='mr10' size="small" @click="addFormVisible = true">新增</el-button>
            <el-input  size="small" v-model="query.projectid" maxlength="8" placeholder="请输入项目编号" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.projectname" maxlength="13" placeholder="请输入项目名称" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column  fixed prop="projectname" label="项目名称" width="150"> </el-table-column>
            <el-table-column  prop="projectid" label="项目编号" width="120"></el-table-column>
            <el-table-column  prop="prikey" label="私钥"  width="3000"></el-table-column>
            <el-table-column fixed="right" label="操作"  width="115">
                <template slot-scope="scope">
                    <el-button @click="copy(scope.row)" type="text" size="small">复制私钥</el-button>
                    <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
                    <!-- <el-button type="text" size="small"  @click="openUpForm(scope.row)" >修改</el-button> -->
                </template>
            </el-table-column>
        </el-table>


      <!--分页-->
      <el-col :span="24" class="toolbar" v-show='total>0' >
          <el-pagination layout="prev, pager, next" :current-page.sync='currentpage' @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
          </el-pagination>
      </el-col>




      <el-dialog title="新增项目" :visible.sync="addFormVisible">
  <el-form :model="addForm"  :rules="rules"   ref="addForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth" prop="projectid">
      <el-input v-model="addForm.projectid" maxlength="8" placeholder="请输入项目编号" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectname">
      <el-input v-model="addForm.projectname" maxlength="13" placeholder="请输入项目名称" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目私钥" :label-width="formLabelWidth" prop="prikey">
      <el-input v-model="addForm.prikey" maxlength="60" type="textarea"  placeholder="请输入您的私钥"  :autosize="{ minRows:5}" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onAdd()">确 定</el-button>
  </div>
</el-dialog>



<el-dialog title="编辑项目" :visible.sync="upFormVisible">
  <el-form :model="updateForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth">
      <el-input v-model="updateForm.projectid"  maxlength="8"  autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目名称" :label-width="formLabelWidth">
      <el-input v-model="updateForm.projectname" maxlength="13"  autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目私钥" :label-width="formLabelWidth">
      <el-input v-model="updateForm.prikey"  maxlength="60"  type="textarea"  placeholder="请输入您的私钥"  :autosize="{ minRows:5}"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="upFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onUpdate()">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
import { getProjects,getProInfo,addProject,upDateProject,delProject } from '@/api/project'
export default {
    data() {
        return {

            addForm: {
                projectid: '',
                projectname: '',
                prikey: '',
            },
            query:{
                projectname: '',
                projectid: '',
            },
            rules: {
                projectid: [
                    { required: true, message: '请输入项目编号', trigger: 'blur' },
                ],
                projectname: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                ],
                prikey: [
                    { required: true, message: '请输入私钥', trigger: 'blur' },
                ],
            },
            updateForm: {},

            tableData:[],
            total:0,
            page:1,
            pageSize:10,
            currentpage:1,
            formLabelWidth: '120px',
            addFormVisible: false,
            upFormVisible: false,
            total:0
        }
    },
    methods: {
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            delProject(row).then(result => {
                if(result.retCode == '00'){
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.listLoading = false;
                    this.getData();
                }
            })
        },
        openUpForm(row) {
            this.upFormVisible = true;
            this.updateForm = row;
        },
        onAdd() {
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    console.log(this.addForm)
                    addProject(this.addForm).then(result => {

                        if(result.retCode == '00'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
            this.addForm= {
                projectid: '',
                projectname: '',
                prikey: '',
            };
                            this.addFormVisible = false;
                            this.listLoading = false;
                            this.getData();
                        }
                    })
                }
            })
        },
        onUpdate(row) {
            this.listLoading = true;
            upDateProject(this.updateForm).then(result => {
                if(result.retCode == '00'){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.upFormVisible = false;
                    this.listLoading = false;
                    this.getData();
                }
            })
        },
        copy(row) {
            console.log(row.prikey);
            const input = document.createElement("input");
            input.setAttribute("readonly", "readonly");
            input.setAttribute("value", row.prikey);
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, 9999);
            if (document.execCommand("copy")) {
                document.execCommand("copy");
                this.$message({
                    message: '复制成功！',
                    type: 'success'
                })
            }
            document.body.removeChild(input);
        },
        //获取列表
        getData() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params = this.query;
            params.pageNum = this.page;
            params.pageSize = this.pageSize;
            console.log(params)
            getProjects(params).then(result => {
                that.listLoading = false;
                that.tableData = result.list;
                that.total = result.count;
            })

        },
        //分页展示
        handleCurrentChange(val) {
            this.page = val;
            this.getData();
        },
        //搜索
        handleSearch() {
            this.getData();
        },
        getInfo(row) {
            getProInfo(row).then(result => {
                console.log(result)
                that.info = result.data;
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
.handle-input {
    width: 240px!important;
    display: inline-block;
}
</style>

