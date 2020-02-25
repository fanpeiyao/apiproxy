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
    <el-table-column  prop="content" label="报文" width="1000"></el-table-column>
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
		<el-col :span="24" class="toolbar" v-show='tableData.length>0' >
			<el-pagination layout="prev, pager, next" :current-page.sync='currentpage' @current-change="handleCurrentChange" :page-size="pageSize" :total="tableData.length" style="float:right;">
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

    <el-form-item label="reqkey" :label-width="formLabelWidth" prop="reqkey">
      <el-input v-model="addForm.reqkey" placeholder="请输入reqkey" autocomplete="off"></el-input>
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
   <el-form-item class='properties' :label="'接口附加参数' + (index+1)" :label-width="formLabelWidth"  v-for="(item, index) in addForm.properties"  :key="item.index">
      <el-input v-model="item.keycode"   size="small" autocomplete="off" placeholder="请输入keycode" ></el-input>
      <el-input v-model="item.value" size="small" autocomplete="off" placeholder="请输入value" ></el-input>
        <i v-if=" addForm.properties.length<5" class='el-icon-plus' @click='addProps("addForm")'></i>
        <i v-if=" addForm.properties.length>1" class='el-icon-minus' @click='delProps("addForm",index)'></i>
    </el-form-item>

      <!-- <el-form-item label="示例代码" :label-width="formLabelWidth" prop="content">
        <el-input v-model="addForm.samplecode" type="textarea"  placeholder="请输入示例代码"
  :autosize="{ minRows:10}"/>
      </el-form-item> -->


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

    <el-form-item label="reqkey" :label-width="formLabelWidth" prop="reqkey">
      <el-input v-model="updateForm.reqkey" autocomplete="off" placeholder="请输入reqkey" ></el-input>
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

                <el-form-item class='properties' :label="'接口附加参数' + (index+1)" :label-width="formLabelWidth"  v-for="(item, index) in updateForm.properties"  :key="item.index">
                <el-input v-model="item.keycode"   size="small" autocomplete="off" placeholder="请输入keycode" ></el-input>
                <el-input v-model="item.value" size="small" autocomplete="off" placeholder="请输入value" ></el-input>
                    <i v-if=" updateForm.properties.length<5" class='el-icon-plus' @click='addProps("updateForm")'></i>
                    <i v-if=" updateForm.properties.length>1" class='el-icon-minus' @click='delProps("updateForm",index)'></i>
                </el-form-item>
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
                <!-- <div class="handle-box">


                    <el-button type="primary" size="small" icon="el-icon-edit"  class="handle-del mr10" @click="addFormVisibleConf = true;"> 新增
                    </el-button>


                    <el-input  size="small" v-model="queryConf.projectid"  placeholder="项目编号" class="handle-input mr10"></el-input>
                    <el-input  size="small" v-model="queryConf.apiname" maxlength="64" placeholder="接口名称" class="handle-input mr10"></el-input>
                    <el-input  size="small" v-model="queryConf.keycode" placeholder="字段keycode" class="handle-input mr10"></el-input>
                    <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearchConf">搜索</el-button>
                </div> -->

            <el-table  :data="tableDataConf"  border style="width: 100%">
                    <el-table-column  fixed  prop="projectid" label="项目编号" >
                    </el-table-column>
                    <el-table-column  prop="apiname" label="接口名称"  width="180"> </el-table-column>
                    <el-table-column  prop="keycode" label="keycode" >
                    </el-table-column>
                    <el-table-column  prop="value" label="value" ></el-table-column>
                    <!-- <el-table-column fixed="right" label="操作"  >
                        <template slot-scope="scope">
                            <el-button @click="onDelConf(scope.row)" type="text" size="small">删除</el-button>
                            <el-button type="text" size="small"  @click="onUpdateFormConf(scope.row)" >修改</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>


                <!--分页-->
                <!-- <el-col :span="24" class="toolbar" v-show='tableDataConf.length>0' >
                    <el-pagination layout="prev, pager, next" :current-page.sync='currentpageConf' @current-change="handleCurrentChangeConf" :page-size="pageSizeConf" :total="tableDataConf.length" style="float:right;">
                    </el-pagination>
                </el-col> -->

        </el-dialog>

               <!--  <el-dialog title="新增" :visible.sync="addFormVisibleConf">
                    <el-form :model="addFormConf" :rules="rulesConf" ref="addFormConf">
                        <el-form-item label="项目编号" :label-width="formLabelWidth" maxlength="32"  prop="projectid">
                        <el-input v-model="addFormConf.projectid" autocomplete="off" placeholder="请输入内容" ></el-input>
                        </el-form-item>

                        <el-form-item label="接口名称" :label-width="formLabelWidth" prop="apiname">
                        <el-input v-model="addFormConf.apiname" maxlength="64"  autocomplete="off" placeholder="请输入内容" ></el-input>
                        </el-form-item>

                        <el-form-item label="keycode" :label-width="formLabelWidth" prop="keycode">
                        <el-input v-model="addFormConf.keycode" autocomplete="off"  maxlength="32"  placeholder="请输入内容" ></el-input>
                        </el-form-item>

                        <el-form-item label="value" :label-width="formLabelWidth" prop="value">
                        <el-input v-model="addFormConf.value" autocomplete="off" maxlength="64"  placeholder="请输入内容" ></el-input>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addFormVisibleConf = false" size='small'>取 消</el-button>
                        <el-button type="primary" @click="onAddConf()" size='small'>确 定</el-button>
                    </div>
                </el-dialog>



                <el-dialog title="编辑" :visible.sync="upFormVisibleConf">
                    <el-form :model="updateFormConf" :rules="rulesConf" ref="updateFormConf">
                        <el-form-item label="项目编号" :label-width="formLabelWidth">
                        <el-input v-model="updateForm.projectid" disabled autocomplete="off" maxlength="32"  placeholder="请输入内容" ></el-input>
                        </el-form-item>


                        <el-form-item label="接口名称" :label-width="formLabelWidth">
                        <el-input v-model="updateFormConf.apiname" disabled autocomplete="off" maxlength="64"  placeholder="请输入内容" ></el-input>
                        </el-form-item>

                        <el-form-item label="keycode" :label-width="formLabelWidth" prop="keycode">
                        <el-input v-model="updateFormConf.keycode" autocomplete="off" maxlength="32"  placeholder="请输入内容" ></el-input>
                        </el-form-item>

                        <el-form-item label="value" :label-width="formLabelWidth" prop="value">
                        <el-input v-model="updateFormConf.value" autocomplete="off" maxlength="64"  placeholder="请输入内容" ></el-input>
                        </el-form-item>


                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="upFormVisibleConf = false" size='small'>取 消</el-button>
                        <el-button type="primary" @click="onUpdateConf()" size='small'>确 定</el-button>
                    </div>
                </el-dialog>
 -->
















  </div>
</template>

<script>
import { getInterface,getInterfaceInfo,addInterface,updateInterface,delInterface } from '@/api/config'
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
                    keycode:'',value:''
                }
            ]
        },
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

        tableData: [],
        formLabelWidth: '120px',
        addFormVisible: false,
        upFormVisible: false,
        page:1,
        pageSize:10,
        currentpage:1,



        //conf
        apiConfVisible: false,
        tableDataConf: [],
        /* queryConf:{
            projectid: '',
            apiname: '',
            keycode: '',
        },
        addFormConf: {
            projectid: '',
            apiname: '',
            keycode: '',
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
            keycode: [
                { required: true, message: '请输入keycode', trigger: 'blur' }
            ],
            value: [
                { required: true, message: '请输入value', trigger: 'blur' }
            ]
        },
        pageConf:1,
        pageSizeConf:7,
        currentpageConf:1,
        addFormVisibleConf: false,
        upFormVisibleConf: false, */
    }


  },
    methods: {
        onDel(row) {
            this.listLoading = true;
            console.log(row)
            row.type = '3';  //1通知2跳转3查询
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
            this.updateForm = row;
            this.upFormVisible = true
        },
        onAdd(row) {

            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    this.addForm.type = '3';  //1通知2跳转3查询
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
                                base64:'1'
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
                    this.updateForm.type = '3';  //1通知2跳转3查询
                    console.log(this.updateForm)
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
            params.type = '3';  //1通知2跳转3查询
            params.pageNum = this.page;
            params.pageSize = this.pageSize;
            getInterface(params).then(result => {
                console.log(result)
                that.listLoading = false;
                that.tableData = result.list;
            })

        },
        //分页展示
        handleCurrentChange(val) {
            this.page = val;
            this.getData();
        },


        //conf
        onDelConf(row) {
            this.listLoading = true;
            console.log(row)
            delApiConf(row).then(result => {
                if(result.retCode == '00'){
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.listLoading = false;
                    this.getDataConf();
                }
            })
        },
        onUpdateFormConf(row) {
            this.updateFormConf = row;
            this.upFormVisibleConf = true;
            // this.apiConfVisible = false;
        },
        onAddConf(row) {
            this.$refs['addFormConf'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    console.log(this.addFormConf)
                    addApiConf(this.addFormConf).then(result => {
                        if(result.retCode == '00'){
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addFormConf= {
                                projectid: '',
                                apiname: '',
                                keycode: '',
                                value:''
                            };
                            this.addFormVisibleConf = false;
                            this.apiConfVisible = true;
                            this.listLoading = false;
                            this.getDataConf();
                        }
                    })
                }
            })
        },
        onUpdateConf(row) {
            this.$refs['updateFormConf'].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    updateApiConf(this.updateFormConf).then(result => {
                        if(result.retCode == '00'){
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.upFormVisibleConf = false;
                            this.listLoading = false;
                            this.getDataConf();
                        }
                    })
                }
            })
        },
        //
        handleSearchConf() {
            this.getDataConf();
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
        getDataConf() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params = this.queryConf;
            params.pageNum = this.pageConf;
            params.pageSize = this.pageSizeConf;
            console.log(params)
            getApiConf(params).then(result => {
                that.listLoading = false;
                that.tableDataConf = result.list;
            })

        },
        //分页展示
        handleCurrentChangeConf(val) {
            this.pageConf = val;
            this.getDataConf();
        },
        openApiconf(row) {
            console.log(row)
            this.tableDataConf = row.properties;
            this.apiConfVisible = true;
        },
        addProps(formName) {
            this[formName].properties.push({keycode:'',value:''})
        },
        delProps(formName,index) {
            this[formName].properties.splice(index, 1)
        }
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


