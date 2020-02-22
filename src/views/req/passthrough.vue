<template>
   <div class="app-container">
         <!-- <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="透传目的地址" prop="url">
                <el-input v-model="form.url" placeholder="请输入透传目的地址"/>
            </el-form-item>
            <p class='tips'>
                透传目的地址格式：
                <span>http://gyjapi1.deenet.com.cn/apiproxy/passthrough/aaa/bbb，其中aaa和bbb请根据自己内容替换</span>
            </p>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
        </el-form> -->
          <div class="handle-box">
            <el-input  size="small" v-model="query.projectid" placeholder="项目编号" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.path" placeholder="path" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.name" placeholder="name" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

        <el-table  :data="tableData" border style="width: 100%">

            <el-table-column fixed  prop="projectid" label="项目编号"  width="180">
            </el-table-column>
            <el-table-column  prop="path" label="重定向url"  width="300"> </el-table-column>
            <el-table-column  prop="name" label="名称"  width="180"></el-table-column>
            <el-table-column  prop="url" label="透传目的地址" width="180"></el-table-column>
            <el-table-column  prop="redirecthost" label="重定向地址" width="300"></el-table-column>
            <el-table-column  prop="requrl" label="配置生成的请求地址" width="300"></el-table-column>


            <el-table-column fixed="right"  label="操作"  width="100">
                <template slot-scope="scope">
                    <el-button @click="onSubmit(scope.row)"  type="text" size="small">请求透传</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--分页-->
		<el-col :span="24" class="toolbar" v-show='tableData.length>0' >
			<el-pagination layout="prev, pager, next" :current-page.sync='currentpage' @current-change="handleCurrentChange" :page-size="pageSize" :total="tableData.length" style="float:right;">
			</el-pagination>
		</el-col>


    </div>
</template>


<script>
/* import { passthrough } from '@/api/req'

export default {
    data() {
        return {
            form: {
                url: '',
            },

            rules: {
                url: [
                    { required: true, message: '请输入透传目的地址', trigger: 'blur' },
                    { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入透传目的地址', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {

                    var params = this.form;
                    passthrough(params).then(response => {
                        console.log(response.data.requrl);
                        window.open(response.data.requrl, '_blank').location;
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
} */
</script>

<script>
import { getPass,addPass,updatePass,delPass } from '@/api/config'
import { passthrough } from '@/api/req'

export default {
    data() {
        return {
            query:{
                path: '',
                name: '',
                projectid: '',
            },
            tableData: [],
            page:1,
            pageSize:10,
            currentpage:1,
        }
    },
    methods: {

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
            console.log(params)
            getPass(params).then(result => {
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

.handle-box {
    margin-bottom: 20px;
}
.handle-input {
    width: 240px!important;
    display: inline-block;
}
.line{
  text-align: center;
}
</style>

