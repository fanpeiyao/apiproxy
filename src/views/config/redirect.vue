<template>
    <div class="app-container">
        <!-- <el-form ref="form" :model="form" label-width="120px">
           <el-form-item label="重定向url">
                <el-input v-model="form.redirectcode" placeholder="请输入重定向url" />
            </el-form-item>

            <el-form-item label="环境编号">
                <el-input v-model="form.redirectenv" placeholder="请输入环境编号"/>
            </el-form-item>

            <el-form-item label="重定向名称">
                <el-input v-model="form.redirectname" placeholder="请输入重定向名称"/>
            </el-form-item>

            <el-form-item label="重定向地址">
                <el-input v-model="form.redirecthost" placeholder="请输入重定向地址"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">新增</el-button>
            </el-form-item>
        </el-form> -->

        <el-form ref="form"  >
            <el-form-item>
                <el-button type="primary" size="small" @click="addFormVisible = true">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table  :data="tableData" border style="width: 100%">

            <el-table-column  prop="redirectcode" label="重定向url"  width="300"> </el-table-column>
            <el-table-column  prop="redirectenv" label="环境编号"  width="180"></el-table-column>
            <el-table-column  prop="redirectname" label="重定向名称" width="180"></el-table-column>
            <el-table-column  prop="redirecthost" label="重定向地址" width="300"></el-table-column>
            <el-table-column  prop="requrl" label="配置生成的请求地址" width="300"></el-table-column>


            <el-table-column fixed="right"  label="操作"  width="170">
                <template slot-scope="scope">
                    <el-button @click="onSubmit(scope.row)" type="text" size="small">请求重定向</el-button>
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




        <el-dialog title="新增" :visible.sync="addFormVisible">
            <el-form :model="addForm" label-width="120px"  :rules="rules"   ref="addForm">
                <el-form-item label="重定向url" prop="redirectcode">
                    <el-input v-model="addForm.redirectcode" placeholder="请输入重定向url" />
                </el-form-item>

                <el-form-item label="环境编号" prop="redirectenv">
                    <el-input v-model="addForm.redirectenv" placeholder="请输入环境编号"/>
                </el-form-item>

                <el-form-item label="重定向名称" prop="redirectname">
                    <el-input v-model="addForm.redirectname" placeholder="请输入重定向名称"/>
                </el-form-item>

                <el-form-item label="重定向地址" prop="redirecthost">
                    <el-input v-model="addForm.redirecthost" placeholder="请输入重定向地址"/>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd()">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="编辑" :visible.sync="upFormVisible">
            <el-form :model="updateForm" label-width="120px" :rules="rules"  ref="updateForm">
               <el-form-item label="重定向url" prop="redirectcode">
                    <el-input v-model="updateForm.redirectcode" placeholder="请输入重定向url" />
                </el-form-item>

                <el-form-item label="环境编号" prop="redirectenv">
                    <el-input v-model="updateForm.redirectenv" placeholder="请输入环境编号"/>
                </el-form-item>

                <el-form-item label="重定向名称" prop="redirectname">
                    <el-input v-model="updateForm.redirectname" placeholder="请输入重定向名称"/>
                </el-form-item>

                <el-form-item label="重定向地址" prop="redirecthost">
                    <el-input v-model="updateForm.redirecthost" placeholder="请输入重定向地址"/>
                </el-form-item>

                <el-form-item label="生成的请求地址" prop="requrl">
                    <el-input v-model="updateForm.requrl" disabled=""/>
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
import { getRedirect,addRedirect,updateRedirect,delRedirect } from '@/api/config'

import { redirect } from '@/api/req'

export default {
  data() {
    return {
        form: {
            redirectcode: '',
            redirectenv: '',
            redirectname: '',
            redirecthost: '',
            requrl: '',
        },
        rules: {
            redirecthost: [
                { required: true, message: '请输入重定向地址', trigger: 'blur' },
                { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
            ],
            redirectenv: [
                { required: true, message: '请输入重定向地址', trigger: 'blur' },
            ],
            redirectname: [
                { required: true, message: '请输入重定向名称', trigger: 'blur' },
            ],
            redirectcode: [
                { required: true, message: '请输入重定向地址', trigger: 'blur' },
            ],
            requrl: [
                { required: true, message: '请输入重定向地址', trigger: 'blur' },
                { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
            ],
        },
        addForm: {
            redirectcode: '',
            redirectenv: '',
            redirectname: '',
            redirecthost: '',
            requrl: '',
        },

        addFormVisible: false,
        upFormVisible: false,
        updateForm:{},
        tableData: [],
        page:0,
        limit:10,
        currentpage:1,
    }
  },
    methods: {
        onSubmit(row) {
            redirect(row).then(response => {
                console.log(response.data.requrl);
                window.open(response.data.requrl, '_blank').location;
            })
        },
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            delRedirect(row).then(result => {
                if(result.retCode == '200'){
                    this.listLoading = false;
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.addFormVisible = false;
                    this.getData();
                }
            })
        },
        onUpdateForm(row) {
            this.upFormVisible = true;
            this.updateForm = row;
        },
        onAdd(row) {
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    addRedirect(this.addForm).then(result => {
                        if(result.retCode == '200'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addFormVisible = false;
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
                    updateRedirect(this.updateForm).then(result => {
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
        //获取列表
        getData() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params.page = this.page;
            getRedirect(params).then(result => {
                console.log(result)
                that.listLoading = false;
                that.tableData = result.data;
            })

        },
        //分页展示
        handleCurrentChange(val) {
            this.page = val-1;
            this.getData();
        },
    },
    created(){
        this.getData();
    }
}
</script>
