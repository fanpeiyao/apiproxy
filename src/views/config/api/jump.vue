<template>
  <div class="app-container">


        <div class="handle-box">
            <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="addFormVisible = true">新增</el-button>
            <el-select size="small" v-model="query.version" placeholder="版本号" class="handle-select mr10">
                <el-option key="1" label="2.0.0.0" value="2.0.0.0"></el-option>
                <el-option key="2" label="1.0.0.0" value="1.0.0.0"></el-option>
            </el-select>
            <el-input  size="small" v-model="query.projectid" placeholder="项目编号" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.apiname" placeholder="接口名称" class="handle-input mr10"></el-input>
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
            <el-table-column  prop="reqkey" label="reqkey"  width="300">
            </el-table-column>
            <el-table-column  prop="version" label="版本号" width="120"></el-table-column>
            <el-table-column  prop="content" :formatter="contentFormat"  label="报文" width="1000"></el-table-column>
            <el-table-column  prop="base64" label="base64" width="120"></el-table-column>


            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <el-button @click="openApiconf(scope.row)" type="text" size="small">
                    附加参数管理
                </el-button>
                <el-button type="text" size="small"  @click="onUpdateForm(scope.row)" >修改</el-button>
                <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>


      <!--分页-->
      <el-col :span="24" class="toolbar" v-show='total>0' >
          <el-pagination layout="prev, pager, next" :current-page.sync='currentpage' @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
          </el-pagination>
      </el-col>



            <el-dialog title="新增跳转接口"  class='addConf'  :visible.sync="addFormVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="项目编号" :label-width="formLabelWidth" prop="projectid">
                    <el-select v-model="addForm.projectid" placeholder="请选择项目">
                        <el-option  v-for="item in projects"  :key="item.projectid"  :label="item.projectname" :value="item.projectid">
                        </el-option>
                    </el-select>
                <!-- <el-input v-model="addForm.projectid" autocomplete="off" placeholder="请输入项目编号" ></el-input> -->
                </el-form-item>

                <el-form-item label="接口名称" :label-width="formLabelWidth" prop="apiname">
                <el-input v-model="addForm.apiname" autocomplete="off" placeholder="请输入接口名称" ></el-input>
                </el-form-item>

                <el-form-item label="reqkey" :label-width="formLabelWidth" prop="reqkey">
                <el-input v-model="addForm.reqkey" autocomplete="off" placeholder="请输入reqkey" ></el-input>
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
                    <el-input v-model="addForm.content" type="textarea"  placeholder="请输入报文内容"
            :autosize="{ minRows:10}"/>
                </el-form-item>

                <!-- <el-form-item label="示例代码" :label-width="formLabelWidth" prop="content">
                    <el-input v-model="addForm.samplecode" type="textarea"  placeholder="请输入示例代码"
            :autosize="{ minRows:10}"/>
                </el-form-item> -->


                <el-row class='addProperties' v-for="(item, index) in addForm.properties" :key='item.index'>
                    <el-form-item class='properties' :label="'接口附加参数' + (index+1)"  :label-width="formLabelWidth" :prop="'properties.' + index + '.key'" :rules="{ required: true, message: '请输入内容', trigger: 'blur'}" >
                        <el-input v-model="item.key"   size="small" autocomplete="off" placeholder="请输入key" ></el-input>
                    </el-form-item>
                    <el-form-item class='properties'  :prop="'properties.' + index + '.value'" :rules="{  required: true, message: '请输入内容', trigger: 'blur'  }">
                    <el-input v-model="item.value" size="small" autocomplete="off" placeholder="请输入value" ></el-input>
                    </el-form-item>
                    <el-form-item class='properties' :prop="'properties.' + index + '.description'"  :rules="{  required: true, message: '请输入内容', trigger: 'blur'  }"  >
                        <el-input v-model="item.description"   size="small" autocomplete="off" placeholder="请输入描述" ></el-input>
                    </el-form-item>
                    <i  class='el-icon-plus' @click='addProps("addForm")'></i>
                    <i v-if=" addForm.properties.length>1" class='el-icon-minus' @click='delProps("addForm",index)'></i>
            </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="onAdd()" size='small'>确 定</el-button>
            </div>
            </el-dialog>



            <el-dialog title="编辑跳转接口" class='addConf' :visible.sync="upFormVisible">
            <el-form :model="updateForm"  :rules="rules" ref="updateForm">
                <el-form-item label="项目编号" :label-width="formLabelWidth" prop="projectid">
                <el-input v-model="updateForm.projectid" disabled autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item label="接口名称" :label-width="formLabelWidth" prop="apiname">
                <el-input v-model="updateForm.apiname" disabled autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="reqkey" :label-width="formLabelWidth" prop="reqkey">
                <el-input v-model="updateForm.reqkey" disabled autocomplete="off" placeholder="请输入reqkey"></el-input>
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
                    <el-input v-model="updateForm.content" type="textarea" placeholder="请输入报文内容"
            :autosize="{ minRows:10}"/>
                </el-form-item>

                <el-row class='addProperties' v-for="(item, index) in updateForm.properties" :key='item.index'>
                    <el-form-item class='properties' :label="'接口附加参数' + (index+1)"  :label-width="formLabelWidth" :prop="'properties.' + index + '.key'" :rules="{ required: true, message: '请输入内容', trigger: 'blur'}" >
                        <el-input v-model="item.key"   size="small" autocomplete="off" placeholder="请输入key" ></el-input>
                    </el-form-item>
                    <el-form-item class='properties'  :prop="'properties.' + index + '.value'" :rules="{  required: true, message: '请输入内容', trigger: 'blur'  }">
                    <el-input v-model="item.value" size="small" autocomplete="off" placeholder="请输入value" ></el-input>
                    </el-form-item>
                    <el-form-item class='properties' :prop="'properties.' + index + '.description'"  :rules="{  required: true, message: '请输入内容', trigger: 'blur'  }"  >
                        <el-input v-model="item.description"   size="small" autocomplete="off" placeholder="请输入描述" ></el-input>
                    </el-form-item>
                    <i  class='el-icon-plus' @click='addProps("updateForm")'></i>
                    <i v-if=" updateForm.properties.length>1" class='el-icon-minus' @click='delProps("updateForm",index)'></i>
                </el-row>
                <!-- <el-form-item label="示例代码" :label-width="formLabelWidth" prop="content">
                    <el-input v-model="updateForm.samplecode" type="textarea"  placeholder="请输入示例代码"
            :autosize="{ minRows:10}"/>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="upFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="onUpdate()" size='small'>确 定</el-button>
            </div>
            </el-dialog>

            <!-- 接口附加参数管理 -->
            <el-dialog title="接口附加参数" class='apiconf' :visible.sync="apiConfVisible"  :close-on-click-modal="false">
                <el-table  :data="tableDataConf"  border style="width: 100%">
                    <el-table-column  prop="description" label="描述" ></el-table-column>
                    <el-table-column  prop="key" label="key" ></el-table-column>
                    <el-table-column  prop="value" label="value" ></el-table-column>
                </el-table>
            </el-dialog>


  </div>
</template>

<script>
import { getInterface,getInterfaceInfo,addInterface,updateInterface,delInterface } from '@/api/config'
import { getProjects} from '@/api/project'

import { getApiConf,addApiConf,updateApiConf,delApiConf } from '@/api/apiConf'
export default {
  data() {
    return {
        query:{
            version:'',
            apiname:'',
            projectid:''
        },
        addForm: {
            projectid: '',
            apiname: '',
            reqkey: 'biz_content',
            version:'2.0.0.0',
            content:'',
            base64:'1',
            samplecode:'',
            properties:[
                {
                    key:'',value:'',description:''
                }
            ]

        },
        /* addConfForm: {
            key:'',
            value:''

        }, */
        jump:true,//jump页面还是jumpconf页面
        updateForm: {},

        rules: {
            projectid: [
                { required: true, message: '请输入项目编号', trigger: 'blur' }
            ],
            apiname: [
                { required: true, message: '请输入接口名称', trigger: 'blur' }
            ],
            reqkey: [
                { required: true, message: '请输入reqkey', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入报文内容', trigger: 'blur' }
            ]
        },
        confRules: {
            key: [
                { required: true, message: '请输入key', trigger: 'blur' }
            ],
            value: [
                { required: true, message: '请输入value', trigger: 'blur' }
            ]
        },
        tableData: [],
        formLabelWidth: '120px',
        addFormVisible: false,
        upFormVisible: false,
        page:1,
        pageSize:10,
        currentpage:1,
        projects:[],
        total:0,
        //conf
        apiConfVisible: false,
        queryConf:{
            projectid: '',
            apiname: '',
            key: '',
        },
        addFormConf: {
            projectid: '',
            apiname: '',
            key: '',
            value:''
        },
        updateFormConf: {},


        rulesConf: {
            projectid: [
                { required: true, message: '请输入项目编号', trigger: 'blur' }
            ],
            apiname: [
                { required: true, message: '请输入接口名称', trigger: 'blur' }
            ],
            key: [
                { required: true, message: '请输入key', trigger: 'blur' }
            ],
            value: [
                { required: true, message: '请输入value', trigger: 'blur' }
            ]
        },
        tableDataConf: [],
    }


  },
    methods: {
        onSubmit() {
            this.$message('submit!')
        },
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            row.type = '2';  //1通知2跳转3查询
            delInterface(row).then(result => {
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
            if(row.properties.length == 0){
                row.properties = [
                    {
                        key:'',value:''
                    }
                ];
            }
            this.updateForm = row;
            this.upFormVisible = true
        },
        onAdd(row) {
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    this.addForm.type = '2';  //1通知2跳转3查询
                    this.addForm.content = encodeURI(this.addForm.content)
                    console.log(this.addForm)
                    addInterface(this.addForm).then(result => {

                        if(result.retCode == '00'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addForm={
                                projectid: '',
                                apiname: '',
                                reqkey: 'biz_content',
                                version:'2.0.0.0',
                                content:'',
                                base64:'1',
                                samplecode:'',
                                properties:[
                                    {
                                        key:'',value:'',description:''
                                    }
                                ]
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
                    this.updateForm.type = '2';  //1通知2跳转3查询
                    console.log(this.updateForm)
                    this.updateForm.content = encodeURI(this.updateForm.content)
                    updateInterface(this.updateForm).then(result => {
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
        handleSearch() {
            this.getData()
        },
        //获取列表
        getData() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params = this.query;
            params.type = '2';  //1通知2跳转3查询
            params.pageNum = this.page;
            params.pageSize = this.pageSize;
            console.log(params)
            getInterface(params).then(result => {
                console.log(result)
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


        //conf
        openApiconf(row) {
            this.tableDataConf = row.properties;
            this.apiConfVisible = true;

        },
        addProps(formName) {
            this[formName].properties.push({key:'',value:''})
        },
        delProps(formName,index) {
            this[formName].properties.splice(index, 1)
        },
        contentFormat(row, column) {
            return decodeURI(row.content);
        },
        getProData() {
            var that = this;
            this.listLoading = true;
            //分页展示待定
            var params = {};
            params.pageNum =  this.page;
            params.pageSize =1000;
            getProjects(params).then(result => {
                that.listLoading = false;
                that.projects = result.list;
            })

        },
    },
    created(){
        this.getData();
        this.getProData();
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

