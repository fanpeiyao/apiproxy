<template>
  <div class="app-container">
    <!-- <el-form ref="form" :model="form" :rules="rules"  label-width="120px">

        <el-form-item label="重定向地址" prop="host">
            <el-input v-model="form.host" placeholder="请输入重定向地址"/>
        </el-form-item>
        <p class='tips'>
            重定向地址格式：
            <span>http://gyjapi1.deenet.com.cn/apiproxy/redirect/code/env，其中code和env请根据自己内容替换</span>
        </p>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>

    </el-form> -->


        <div class="handle-box">
           <el-input  size="small" v-model="query.code" placeholder="请输入重定向地址" class="handle-input mr10"></el-input>
            <el-input  size="small" v-model="query.env" placeholder="请输入环境编号" class="handle-input mr10"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>

        <el-table  :data="tableData" border style="width: 100%">

            <el-table-column  prop="code" label="重定向url"  width="300"> </el-table-column>
            <el-table-column  prop="env" label="环境编号"  width="180"></el-table-column>
            <el-table-column  prop="name" label="重定向名称" width="180"></el-table-column>
            <el-table-column  prop="host" label="重定向地址" width="300"></el-table-column>
            <el-table-column  prop="requrl" label="配置生成的请求地址" width="300"></el-table-column>


            <el-table-column fixed="right"  label="操作"  width="100">
                <template slot-scope="scope">
                    <el-button @click="onSubmit(scope.row)" type="text" size="small">请求重定向</el-button>
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
/* import { redirect } from '@/api/req'

export default {
    data() {
        return {
            form: {
                host: '',
            },
            rules: {
                host: [
                    { required: true, message: '请输入重定向地址', trigger: 'blur' },
                    { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的重定向地址', trigger: 'blur' }
                ],
            }
        }
    },
  methods: {
    onSubmit() {
        this.$refs['form'].validate((valid) => {
            if (valid) {

                var params = this.form;
                redirect(params).then(response => {
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
import { getRedirect,addRedirect,updateRedirect,delRedirect } from '@/api/config'
import { redirect } from '@/api/req'

export default {
    data() {
        return {
            query:{
                code: '',
                naenvme: ''
            },
            tableData: [],
            page:1,
            pageSize:10,
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

        //获取列表
        getData() {
            var that = this;
            this.listLoading = true;
            var params = {};
            params = this.query;
            params.pageNum = this.page;
            params.pageSize = this.pageSize;
            console.log(params)
            getRedirect(params).then(result => {
                that.listLoading = false;
                that.tableData = result.list;
            })

        },
        //
        handleSearch() {
            this.getData();
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

