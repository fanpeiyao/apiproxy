<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="项目名称" prop="projectid">
            <el-select v-model="form.projectid" placeholder="请选择项目"  @change="getApis()">
                <el-option  v-for="item in projects" :key="item.projectid"  :label="item.projectname" :value="item.projectid">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="版本号">
            <el-radio-group v-model="form.version">
            <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
            <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
            </el-radio-group>
        </el-form-item>

            <el-form-item label="跳转接口" prop="apiname">
                <el-select v-model="form.apiname" placeholder="请选择要调试的跳转接口"   @change="getReqdata()">
                    <el-option  v-for="item in apis"  :key="item.key" :label="item.apiname"  :value="item.key"></el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="Trancode"  prop="transcode">
            <el-input v-model="form.transcode" placeholder="请输入transcode" />
        </el-form-item>



        <el-form-item label="用户编号"  prop="customerId">
            <el-input v-model="form.customerId" placeholder="请输入用户编号" />
        </el-form-item>

        <el-form-item label="用户名称"  prop="customerName">
            <el-input v-model="form.customerName" placeholder="用户名称" />
        </el-form-item>

        <!-- <el-form-item label="角色">
            <el-select v-model="form.roleid" placeholder="请选择角色">
            <el-option  value='1' label='经销商'></el-option>
            <el-option  value='2' label='业务员'></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Trancode">
            <el-input v-model="form.trancode" placeholder="请输入Trancode" />
        </el-form-item> -->


        <el-form-item label="Base64编码">
            <el-switch v-model="form.base64"  active-value="1" inactive-value="0"/>
        </el-form-item>


        <!-- <el-form-item label="跳转地址">
            <el-input v-model="form.url" placeholder="请输入url" />
        </el-form-item> -->

        <el-form-item label="接口发送报文" prop="reqdata">
            <el-input v-model="form.reqdata" type="textarea"
    :autosize="{ minRows:10}"/>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>




        </el-form>
    </div>
</template>

<script>
import { getProjects} from '@/api/project'
import { getInterface} from '@/api/config'
import { jumpApi} from '@/api/gyjapi'
export default {
    data() {
        return {
            form: {
                projectid: '',
                transcode: '',
                url:'',
                reqdata: '',
                trancode:'',
                version:'2.0.0.0',
                base64:'1',//0-关 1-开
                roleid:'1',
                customerId:'',
                customerName:'',
                mobile:'',
            },

            rules: {
                reqdata: [
                    { required: true, message: '请输入报文内容', trigger: 'blur' },
                ],
                projectid: [
                    { required: true, message: '请选择项目', trigger: 'change' }
                ],
                apiname: [
                    { required: true, message: '请选择接口', trigger: 'change' }
                ],
                customerName: [
                    { required: true, message: '请选择接口', trigger: 'blur' }
                ],
                customerId: [
                    { required: true, message: '请选择接口', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请选择接口', trigger: 'blur' }
                ],
                transcode: [
                    { required: true, message: '请选择接口', trigger: 'blur' }
                ],
            },
            projects:[],
            apis: [],
            channels:[
                {
                    value: 'gyj',
                    label: '工银聚'
                },{
                    value: 'gyjapi',
                    label: '工银聚API'
                },{
                    value: 'icbc',
                    label: '总行发送'
                }
            ]
        }
    },
    methods: {
        onSubmit() {
             this.$refs['form'].validate((valid) => {
                if (valid) {
                    //根据产品编号获取该产品私钥
                    console.log(this.projects)
                    var project = this.projects.find((i) => {
                        return i.projectid == this.form.projectid;
                    });
                    this.form.prikey = project.prikey;

                    jumpApi(this.form).then(result => {
                        this.$message('submit!');
                    });
                }
            })
        },
        getProData() {
            var that = this;
            this.listLoading = true;
            //分页展示待定
            getProjects().then(result => {
                that.listLoading = false;
                that.projects = result.data;
            })

        },
        //查询通知接口列表 --- 若有翻页则前端selec要更改
        getApis() {
            console.log(1111111111)
            var that = this;
            this.listLoading = true;
            var params=  {};
            params.type=2;
            params.projectid=this.form.projectid;
            //分页展示待定
            getInterface(params).then(result => {
                that.listLoading = false;
                that.apis = result.data;
                console.log(that.apis)
            })

        },
        //根据apikey获取报文内容
        getReqdata() {
            var ret = this.apis.find((i) => {
                return i.key == this.form.apiname;
            });
            this.form.reqdata = ret.content;
        },
  },
  created() {
        //查询项目列表可供选择
        this.getProData();
  },
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

