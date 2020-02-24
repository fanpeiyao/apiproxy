<template>
    <div class="app-container">

         <div class="handle-box">
            <el-button type="primary" class='mr10'  size="small" @click="addFormVisible = true">新增</el-button>

            <el-input  size="small" v-model="query.path"   maxlength="64" placeholder="请输入重定向地址" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.name"   maxlength="3" placeholder="请输入名称" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

        <el-table  :data="tableData" border style="width: 100%">



            <el-table-column  prop="path" label="重定向地址"   > </el-table-column>
            <el-table-column  prop="name" label="名称"   ></el-table-column>
            <el-table-column  prop="url" label="透传目的地址" ></el-table-column>
            <!-- <el-table-column  prop="redirecthost" label="重定向地址" width="300"></el-table-column> -->
            <el-table-column  prop="requrl" label="配置生成的请求地址" width="300"></el-table-column>


            <el-table-column fixed="right"  label="操作"  width="155">
                <template slot-scope="scope">
                    <el-button @click="onSubmit(scope.row)"  type="text" size="small">请求透传</el-button>
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
            <el-form :model="addForm" label-width="120px"  :rules="rules"  ref="addForm" >
                <el-form-item label="重定向地址" prop="path">
                    <el-input v-model="addForm.path"  maxlength="64" placeholder="请输入重定向地址" />
                </el-form-item>

                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name"  maxlength="3" placeholder="请输入名称"/>
                </el-form-item>

                <el-form-item label="透传目的地址" prop="url">
                    <el-input v-model="addForm.url"  maxlength="64" placeholder="请输入透传目的地址"/>
                </el-form-item>

                <!-- <el-form-item label="重定向地址" prop="redirecthost">
                    <el-input v-model="addForm.redirecthost" placeholder="请输入重定向地址"/>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd()">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="编辑" :visible.sync="upFormVisible">
            <el-form :model="updateForm" label-width="120px"  :rules="rules"  ref="updateForm" >
                <el-form-item label="重定向地址" prop="path">
                    <el-input v-model="updateForm.path"  maxlength="64" placeholder="请输入重定向地址" />
                </el-form-item>

                <el-form-item label="名称" prop="name">
                    <el-input v-model="updateForm.name" maxlength="3" placeholder="请输入名称"/>
                </el-form-item>

                <el-form-item label="透传目的地址" prop="url">
                    <el-input v-model="updateForm.url"  maxlength="64" placeholder="请输入透传目的地址"/>
                </el-form-item>

                <!-- <el-form-item label="重定向地址" prop="redirecthost">
                    <el-input v-model="updateForm.redirecthost" placeholder="请输入重定向地址"/>
                </el-form-item> -->

                <el-form-item label="生成的请求地址" >
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
import { getPass,addPass,updatePass,delPass } from '@/api/config'
import { passthrough } from '@/api/req'

export default {
    data() {
        return {
            form: {
                path: '',
                name: '',
                url: '',
                // redirecthost:'',
            },
            query:{
                path: '',
                name: '',
                // projectid: '',
            },
            rules: {
                // redirecthost: [
                //     { required: true, message: '请输入重定向地址', trigger: 'blur' },
                //     { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
                // ],
                path: [
                    { required: true, message: '请输入重定向地址', trigger: 'blur' },,
                    // { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入重定向名称', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: '请输入透传目的地址', trigger: 'blur' },
                ],
                requrl: [
                    { required: true, message: '请输入重定向地址', trigger: 'blur' },
                    { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
                ],
            },
            addForm: {
                path: '',
                name: '',
                url: '',
            },
            addFormVisible: false,
            upFormVisible: false,
            updateForm:{},
            tableData: [],
            page:1,
            pageSize:10,
            currentpage:1,
        }
    },
    methods: {
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            delPass(row).then(result => {
                if(result.retCode == '00'){
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
                    console.log(this.addForm)
                    addPass(this.addForm).then(result => {
                        if(result.retCode == '00'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addForm = {
                                path: '',
                                name: '',
                                url: '',
                            };
                            this.addFormVisible = false;
                            this.getData();
                        }
                    })
                }
            })
        },
        onUpdate() {
            this.$refs['updateForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    console.log(this.updateForm)
                    updatePass(this.updateForm).then(result => {
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
        onSubmit(row) {
            passthrough(row).then(response => {
                console.log(response.data.requrl);
                window.open(response.data.requrl, '_blank').location;
            })
        },
        //分页展示
        handleCurrentChange(val) {
            this.page = val;
            this.getData();
        },
        //
        handleSearch() {
            this.getData();
        },
        //获取列表
        getData() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params = this.query;
            params.pageNum = this.page;
            params.pageSize = this.pageSize;
            getPass(params).then(result => {
                console.log(result)
                that.listLoading = false;
                that.tableData = result.list;
            })

        },
    },
    created(){
        this.getData();
    }
}
</script>
<style lang="">

.handle-box {
    margin-bottom: 20px;
}
.handle-input {
    width: 240px!important;
    display: inline-block;
}
</style>

