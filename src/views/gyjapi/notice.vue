<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px"  :rules="rules">
        <el-form-item label="项目名称" prop="projectid">
            <!-- <el-select v-model="form.projectid" placeholder="请选择项目"  @change="getApis()">
                <el-option  v-for="item in projects"  :key="item.projectid"  :label="item.projectname" :value="item.projectid">
                </el-option>
            </el-select> -->



            <el-select v-model="form.projectid" :clearable=false  placeholder="请选择或输入项目编号搜索"  filterable :filter-method="selectChange"  @change="getApis()" >
                <el-option  v-for="item in projects"  :key="item.projectid"  :label="item.projectname" :value="item.projectid"></el-option>
                <div style="bottom: 0;width: 100%;background: #fff" v-if="proTotal>0">
                    <el-pagination small  layout="prev, pager, next"  :current-page.sync='currentpage'  @current-change="handleCurrentChange" :page-size="pageSize" :total="proTotal"  >
                    </el-pagination>
                </div>
            </el-select>


        </el-form-item>

        <el-form-item label="通知接口" prop="apiname">
            <!--<el-select v-model="form.apiname" placeholder="请选择要调试的通知接口"   @change="getReqdata()">
                <el-option  v-for="item in apis"  :key="item.apiname" :label="item.apiname"  :value="item.apiname"></el-option>
            </el-select>-->
            <el-select v-model="form.apiname" :clearable=false  placeholder="请选择要调试的通知接口"  filterable :filter-method="apiselectChange"   @change="getReqdata()" >
                <el-option  v-for="item in apis"  :key="item.apiname" :label="item.apiname"  :value="item.apiname"></el-option>
                <div style="bottom: 0;width: 100%;background: #fff" v-if="apiTotal>7">
                    <el-pagination small  layout="prev, pager, next"  :current-page.sync='apicurrentpage'  @current-change="apihandleCurrentChange" :page-size="apiPageSize" :total="apiTotal"  >
                    </el-pagination>
                </div>
            </el-select>
        </el-form-item>


        <el-form-item label="版本号" >
            <el-radio-group v-model="form.version">
                <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
                <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="通知地址" prop="noticeurl">
            <el-input v-model="form.noticeurl" placeholder="请输入通知地址" />
        </el-form-item>


        <el-form-item
            :label="item.description"
            v-for="(item,index) in form.properties"
            :prop="'properties.' + index + '.value'"
            :rules="{
                required: true, message: '请输入内容', trigger: 'blur'
            }"
            :key='item.key'>
            <el-input v-model="item.value" placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="Base64编码">
            <el-select v-model="form.isBase64" placeholder="请选择是否需要Base64编码">
            <el-option  value='0' label='否'></el-option>
            <el-option  value='1' label='是'></el-option>
            </el-select>
        </el-form-item> -->


        <!-- <el-form-item label="发送渠道">
            <el-select v-model="form.sendtype" placeholder="请选择发送渠道">
            <el-option  v-for="item in sendtypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
            </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="发送渠道">
            <el-radio-group v-model="form.sendtype">
            <el-radio  v-for="item in sendtypes" :key="item.value" :label="item.value" :value="item.value">
                {{item.label}}
            </el-radio>

            </el-radio-group>
        </el-form-item>



        <el-form-item label="Base64编码">
            <el-switch v-model="form.base64" disabled="" active-value="1" inactive-value="0"/>
        </el-form-item>

        <el-form-item label="企业私钥"  prop="prikey">
            <el-input v-model="form.prikey" type="textarea"  placeholder="请输入您的私钥"  :autosize="{ minRows:3}"/>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>


        <!-- <el-form-item label="接口发送报文"  prop="content">
            <el-input v-model="form.content" type="textarea"  :autosize="{ minRows:10}"/>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>


        <el-form-item label="接口返回报文">
            <el-input v-model="resdata" :disabled="true" type="textarea" :autosize="{ minRows:10}"/>
        </el-form-item> -->


        <el-row>
            <el-col :span="12">
                 <el-form-item label="接口发送报文"  prop="content">
                    <el-input v-model="form.content" type="textarea"  :autosize="{ minRows:20}"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="接口返回报文">
                    <el-input v-model="resdata" :disabled="true" type="textarea" :autosize="{ minRows:20}"/>
                </el-form-item>
            </el-col>
        </el-row>


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
            /*必输*/apiname: '',
            /*必输*/content: '',
            /*必输*/noticeurl:'',
            /*必输*/sendtype:'gyj',
            /*必输*/version:'2.0.0.0',
            /*必输*/base64:'1',
            /*必输*/projectid:'',
            /*接口卡附加参数*/properties:[],
            /**/prikey:''
        },
        currentpage:1,
        page:1,
        pageSize:6,
        apicurrentpage:1,
        apiPage:1,
        apiPageSize:6,
        resdata:'',
        rules: {
            content: [
                { required: true, message: '请输入报文内容', trigger: 'blur' },
            ],
            noticeurl: [
                { required: true, message: '请输入通知地址', trigger: 'blur' },
                { pattern:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message:'请输入正确的通知地址', trigger: 'blur' }
            ],
            projectid: [
                { required: true, message: '请选择项目', trigger: 'change' }
            ],
            apiname: [
                { required: true, message: '请选择接口', trigger: 'change' }
            ],
            prikey: [
                { required: true, message: '请输入企业私钥', trigger: 'blur' }
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
        sendtypes:[{
            value: 'gyj',
            label: '工银聚'
            },{
            value: 'gyjapi',
            label: '工银聚API'
            },{
            value: 'icbc',
            label: '总行发送'
        }],
            proTotal:'',
            apiTotal:'',
    }
  },
    methods: {
        onSubmit() {
             this.$refs['form'].validate((valid) => {
                if (valid) {
                    //根据产品编号获取该产品私钥
                    /* console.log(this.projects)
                    var project = this.projects.find((i) => {
                        return i.projectid == this.form.projectid;
                    });
                    this.form.prikey = project.prikey; */

                    this.form.content = encodeURI(this.form.content);
                    console.log(this.form)
                    noticeApi(this.form).then(result => {
                        // this.$message('submit!');
                        this.resdata = result.data.resdata;
                    });

                }
            })
        },
        getProData() {
            var that = this;
            this.listLoading = true;
            //分页展示待定
            var params = {};

            params.pageNum =  this.page;
            params.pageSize =this.pageSize;
            console.log(params)
            getProjects(params).then(result => {
                that.listLoading = false;
                that.projects = result.list;
                that.proTotal = result.count;
            })

        },
        //查询通知接口列表 --- 若有翻页则前端selec要更改
        getApis() {
            this.apiname= '';
            this.content= '';
            var that = this;
            this.listLoading = true;
            var params=  {};
            params.type=1;
            params.projectid=this.form.projectid;

            params.pageNum =  this.apiPage;
            params.pageSize =this.apiPageSize;
            console.log(params)
            //分页展示待定
            getInterface(params).then(result => {
                that.listLoading = false;
                that.apis = result.list;
                that.apiTotal = result.count;
                console.log(that.apis)
            })

        },
        //根据apikey获取报文内容
        getReqdata() {
            var ret = this.apis.find((i) => {
                return i.apiname == this.form.apiname;
            });
            this.form.content = ret.content;
            //根据接口展示版本？？？
            this.form.version = ret.version;
            this.form.properties = ret.properties;
        },


        selectChange(val) {
            console.log(val)
            // 如果存在上一次请求，则取消上一次请求
            if (this.cancel) {
                this.cancel()
            }
            this.search(val)
        },
        handleCurrentChange(val) {
            this.currentpage = val;
            this.page = val;
            console.log(val)
            this.search('',val);
        },
        search(projectid,page) {
            this.loading = true;
            var params = {};
            params.projectid =  projectid;

            if(page){
                    params.pageNum = page;
            }else{
                    params.pageNum =  1;
            }
            params.pageSize = this.pageSize;
            console.log(params)
            getProjects(params).then(result => {
                this.listLoading = false;
                this.projects = result.list;
                this.loading = false
            }).catch(e => {
                this.loading = false
            })
        },

        apiselectChange(val) {
            console.log(val)
            // 如果存在上一次请求，则取消上一次请求
            if (this.cancel) {
                this.cancel()
            }
            this.apisearch(val)
        },
        apihandleCurrentChange(val) {
            this.apicurrentpage = val;
            this.page = val;
            console.log(val)
            this.apisearch('',val);
        },
        apisearch(projectid,page) {
            this.loading = true;
            var that = this;
            var params = {};
            params.projectid =  this.form.projectid;

            if(page){
                params.pageNum = page;
            }else{
                params.pageNum =  1;
            }
            params.type=1;
            params.pageSize = this.apiPageSize;
            console.log(params)
            //分页展示待定
            getInterface(params).then(result => {
                that.apis = result.list;
                that.apiTotal = result.count;
            })
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


         /* this.$axios({
                method:'post',
                url:'https://gyj1.dccnet.com.cn/webgate/dzbldataview/dataviewdetail/query',
                data:{    //这里是发送给后台的数据
                      userId:'<!--结算账户明细通知接口xml--><GYJ><pub><TransCode>{{transCode}}</TransCode><CIS>{{CIS}}</CIS><TransDate>{{transDate}}</TransDate><TransTime>{{transTime}}</TransTime><fSeqno></fSeqno></pub><out><transtime>{{transFull}}</transtime><orderid>{{transCode}}</orderid><total>20</total><batch>1</batch><rds><rd><wlhsellerid>icbctest_jx|icbctest_jx</wlhsellerid><wlhcustomerid>wang01|wanghaibing02</wlhcustomerid><gjksellerid></gjksellerid><gjkcustomerid></gjkcustomerid><transno>17193000001</transno><transtime>20170712163034</transtime><transamount>0.01</transamount><payeracctno>6222081207005577777</payeracctno><payeracctname>王海兵</payeracctname><payeeacctno>1204060019278900305</payeeacctno><payeeacctname>嘉兴分行测试集团总公司</payeeacctname><abstractinfo>网转</abstractinfo><purpose>-</purpose><postscript>-</postscript><oppositebankno>-</oppositebankno><oppositebankname>-</oppositebankname><currentbalance>287.67</currentbalance><proofno>0</proofno><sendtype></sendtype><transcode>2713</transcode><drcrf>2</drcrf><tellerno>59</tellerno><type></type><cardno></cardno><cardname></cardname><remark1></remark1><remark2></remark2><remark3></remark3><currtype>1</currtype></rd></rds></out></GYJ>',
                      token:'33',
                }
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)       //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            }) */


    },
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

