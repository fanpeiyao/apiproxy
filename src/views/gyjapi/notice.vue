<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px"  :rules="rules">
        <el-form-item label="项目名称" prop="projectid">
            <el-select v-model="form.projectid" placeholder="请选择项目"  @change="getApis()">
                <el-option  v-for="item in projects"  :key="item.projectid"  :label="item.projectname" :value="item.projectid">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="版本号" >
            <el-radio-group v-model="form.version">
                <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
                <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="通知接口" prop="apiname">
            <el-select v-model="form.apiname" placeholder="请选择要调试的通知接口"   @change="getReqdata()">
                <el-option  v-for="item in apis"  :key="item.key" :label="item.apiname"  :value="item.key"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="通知地址" prop="notifyurl">
            <el-input v-model="form.notifyurl" placeholder="请输入通知地址" />
        </el-form-item>

        <!-- <el-form-item label="Base64编码">
            <el-select v-model="form.isBase64" placeholder="请选择是否需要Base64编码">
            <el-option  value='0' label='否'></el-option>
            <el-option  value='1' label='是'></el-option>
            </el-select>
        </el-form-item> -->



        <!-- <el-form-item label="发送渠道">
            <el-select v-model="form.channel" placeholder="请选择发送渠道">
            <el-option  v-for="item in channels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
            </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="发送渠道">
            <el-radio-group v-model="form.channel">
            <el-radio  v-for="item in channels" :key="item.value" :label="item.value" :value="item.value">
                {{item.label}}
            </el-radio>

            </el-radio-group>
        </el-form-item>



        <el-form-item label="Base64编码">
            <el-switch v-model="form.base64"  active-value="1" inactive-value="0"/>
        </el-form-item>

        <el-form-item label="接口发送报文"  prop="reqdata">
            <el-input v-model="form.reqdata" type="textarea"  :autosize="{ minRows:10}"/>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>


        <el-form-item label="接口返回报文">
            <el-input v-model="resdata" :disabled="true" type="textarea" :autosize="{ minRows:10}"/>
        </el-form-item>

        </el-form>
    </div>
</template>

<script>

import { getProjects} from '@/api/project'
import { getInterface} from '@/api/config'
import { noticeApi} from '@/api/gyjapi'

export default {
    data() {
        return {
        form: {
            apiname: '',
            reqdata: '',
            resdata:'',
            notifyurl:'',
            channel:'gyj',
            version:'2.0.0.0',
            base64:'1',
            projectid:'',
            prikey:''
        },
        resdata:'',
        rules: {
            reqdata: [
                { required: true, message: '请输入报文内容', trigger: 'blur' },
            ],
            notifyurl: [
                { required: true, message: '请输入通知地址', trigger: 'blur' },
                { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的通知地址', trigger: 'blur' }
            ],
            projectid: [
                { required: true, message: '请选择项目', trigger: 'change' }
            ],
            apiname: [
                { required: true, message: '请选择接口', trigger: 'change' }
            ],
        },

        projects:[],
        apis: [
            /* {
            value: 'GYJWLHNOTIFY',
            label: '结算账户明细通知'
            }, {
            value: 'GYJBILLNOTIFY',
            label: '票据状态通知'
            }, {
            value: 'GYJREMITNOTIFY',
            label: '外汇来汇明细通知'
            } */
        ],
        channels:[{
            value: 'gyj',
            label: '工银聚'
            },{
            value: 'gyjapi',
            label: '工银聚API'
            },{
            value: 'icbc',
            label: '总行发送'
        }]
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

                    noticeApi(this.form).then(result => {
                        this.$message('submit!');
                        this.resdata = result.data.resdata;
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
            var that = this;
            this.listLoading = true;
            var params=  {};
            params.type=1;
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
        /* this.projects= [{
            projectid:'yzt',
            projectname:'银账通'
        },{
            projectid:'licai',
            projectname:'理财'
        }] */
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

