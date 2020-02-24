<template>
  <div class="app-container">

        <div class="handle-box">
            <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="addFormVisible = true"> 新增
            </el-button>


            <el-input  size="small" v-model="query.projectid"  placeholder="项目编号" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.apiname" maxlength="64" placeholder="接口名称" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.keycode" placeholder="字段keycode" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

       <el-table  :data="tableData"  border style="width: 100%">
            <el-table-column  fixed  prop="projectid" label="项目编号" >
            </el-table-column>
            <el-table-column  prop="apiname" label="接口名称"  width="180"> </el-table-column>
            <el-table-column  prop="keycode" label="keycode" >
            </el-table-column>
            <el-table-column  prop="value" label="value" ></el-table-column>
            <el-table-column fixed="right" label="操作"  >
            <template slot-scope="scope">
                <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
                <el-button type="text" size="small"  @click="onUpdateForm(scope.row)" >修改</el-button>
            </template>
            </el-table-column>
        </el-table>


        <!--分页-->
		<el-col :span="24" class="toolbar" v-show='tableData.length>0' >
			<el-pagination layout="prev, pager, next" :current-page.sync='currentpage' @current-change="handleCurrentChange" :page-size="pageSize" :total="tableData.length" style="float:right;">
			</el-pagination>
		</el-col>



        <el-dialog title="新增" :visible.sync="addFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
            <el-form-item label="项目编号" :label-width="formLabelWidth" maxlength="32"  prop="projectid">
            <el-input v-model="addForm.projectid" autocomplete="off" placeholder="请输入内容" ></el-input>
            </el-form-item>

            <el-form-item label="接口名称" :label-width="formLabelWidth" prop="apiname">
            <el-input v-model="addForm.apiname" maxlength="64"  autocomplete="off" placeholder="请输入内容" ></el-input>
            </el-form-item>

            <el-form-item label="keycode" :label-width="formLabelWidth" prop="keycode">
            <el-input v-model="addForm.keycode" autocomplete="off"  maxlength="32"  placeholder="请输入内容" ></el-input>
            </el-form-item>

            <el-form-item label="value" :label-width="formLabelWidth" prop="value">
            <el-input v-model="addForm.value" autocomplete="off" maxlength="64"  placeholder="请输入内容" ></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false" size='small'>取 消</el-button>
            <el-button type="primary" @click="onAdd()" size='small'>确 定</el-button>
        </div>
        </el-dialog>



        <el-dialog title="编辑" :visible.sync="upFormVisible">
        <el-form :model="updateForm" :rules="rules" ref="updateForm">
            <el-form-item label="项目编号" :label-width="formLabelWidth">
            <el-input v-model="updateForm.projectid" disabled autocomplete="off" maxlength="32"  placeholder="请输入内容" ></el-input>
            </el-form-item>


            <el-form-item label="接口名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.apiname" disabled autocomplete="off" maxlength="64"  placeholder="请输入内容" ></el-input>
            </el-form-item>

            <el-form-item label="keycode" :label-width="formLabelWidth" prop="keycode">
            <el-input v-model="updateForm.keycode" autocomplete="off" maxlength="32"  placeholder="请输入内容" ></el-input>
            </el-form-item>

            <el-form-item label="value" :label-width="formLabelWidth" prop="value">
            <el-input v-model="updateForm.value" autocomplete="off" maxlength="64"  placeholder="请输入内容" ></el-input>
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
import { getApiConf,addApiConf,updateApiConf,delApiConf } from '@/api/apiConf'
export default {
  data() {
    return {
        query:{
            projectid: '',
            apiname: '',
            keycode: '',
        },
        addForm: {
            projectid: '',
            apiname: '',
            keycode: '',
            value:''
        },
        updateForm: {},


        rules: {
            projectid: [
                { required: true, message: '请输入项目编号', trigger: 'blur' }
            ],
            apiname: [
                { required: true, message: '请输入接口名称', trigger: 'blur' }
            ],
            keycode: [
                { required: true, message: '请输入keycode', trigger: 'blur' }
            ],
            value: [
                { required: true, message: '请输入value', trigger: 'blur' }
            ]
        },
        tableData: [],
        page:1,
        pageSize:10,
        currentpage:1,
        formLabelWidth: '120px',
        addFormVisible: false,
        upFormVisible: false,
    }


  },
    methods: {
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            delApiConf(row).then(result => {
                if(result.retCode == '00'){
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
                    console.log(this.addForm)
                    addApiConf(this.addForm).then(result => {
                        if(result.retCode == '00'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addForm= {
                                projectid: '',
                                apiname: '',
                                keycode: '',
                                value:''
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
            this.$refs['updateForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    updateApiConf(this.updateForm).then(result => {
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
                }
            })
        },
        //
        handleSearch() {
            this.getData()
            // var that = this;
            // this.listLoading = true;
            // console.log(this.query)
            // getApiConf(this.query).then(result => {
            //     that.listLoading = false;
            //     this.page = 1;
            //     that.tableData = result.data;
            // })
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
            getApiConf(params).then(result => {
                that.listLoading = false;
                that.tableData = result.list;
            })

        },
        //分页展示
        handleCurrentChange(val) {
            this.page = val;
            this.getData();
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
    width: 200px;
    display: inline-block;
}

</style>

