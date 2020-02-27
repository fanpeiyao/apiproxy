<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px"  :rules="rules">
        <el-form-item label="项目名称" prop="projectid">
            <!-- <el-select v-model="form.projectid" placeholder="请选择项目" @change="getApis()">
                <el-option  v-for="item in projects"
                                :key="item.projectid"
                                :label="item.projectname"
                                :value="item.projectid">
                </el-option>
            </el-select> -->
             <el-select v-model="form.projectid" placeholder="请选择或输入项目编号搜索" filterable :filter-method="selectChange"  @change="getApis()" clearable>
                <el-option  v-for="item in projects"  :key="item.projectid"  :label="item.projectname" :value="item.projectid"></el-option>
                <div style="bottom: 0;width: 100%;background: #fff">
                    <el-pagination small  layout="prev, pager, next"  :current-page.sync='currentpage'  @current-change="handleCurrentChange" :page-size="pageSize" :total="proTotal"  >
                    </el-pagination>
                </div>
            </el-select>
        </el-form-item>

        <el-form-item label="查询接口" prop="apiname">
            <el-select v-model="form.apiname" placeholder="请选择要调试的查询接口"  @change="getReqdata(form.apiname)">
            <el-option  v-for="item in apis"
                            :key="item.id"
                            :label="item.apiname"
                            :value="item.apiname">
            </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="版本号">
            <el-radio-group v-model="form.version">
            <el-radio  label='2.0.0.0'>2.0.0.0</el-radio>
            <el-radio  label='1.0.0.0'>1.0.0.0（自19年7月起不再提供对接支持）</el-radio>
            </el-radio-group>
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

        <el-form-item label="appid">
            <el-input v-model="form.appid" placeholder="请输入appid" />
        </el-form-item>
   <!--    <el-form-item label="请求的key">
        <el-input v-model="form.reqkey" placeholder="请输入请求的key" />
      </el-form-item> -->


      <!-- <el-form-item label="发送渠道">
        <el-radio-group v-model="form.channel">
          <el-radio  v-for="item in channels"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                        {{item.label}}
          </el-radio>

        </el-radio-group>
      </el-form-item> -->



      <!-- <el-form-item label="Base64编码">
        <el-switch v-model="form.base64"  active-value="1" inactive-value="0" />
      </el-form-item> -->

      <!-- <el-form-item label="私钥">
        <el-input v-model="form.privateKey"  type="textarea" :autosize="{ minRows:3}" placeholder="请输入您生成的RSA私钥" />
      </el-form-item> -->

        <el-form-item label="企业私钥"  prop="prikey">
            <el-input v-model="form.prikey" type="textarea"  placeholder="请输入您的私钥"  :autosize="{ minRows:3}"/>
        </el-form-item>


      <!-- <el-form-item label="接口发送报文"  prop="content">
        <el-input v-model="form.content" type="textarea" :autosize="{ minRows:10}"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>


      <el-form-item label="接口返回报文">
        <el-input v-model="respdata" :disabled="true" type="textarea" :autosize="{ minRows:10}"/>
      </el-form-item> -->

        <el-row>
            <el-col :span="12">
                 <el-form-item label="接口发送报文"  prop="content">
                    <el-input v-model="form.content" type="textarea"  :autosize="{ minRows:20}"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <label  class="el-form-item__label" style="width: 120px;">接口示例报文</label>
                <div class="el-form-item__content example">
                    <section class="normal markdown-section">
                        <!-- <pre> -->
                            <!-- <code class="lang-xml"> -->
                            <xmp v-html="form.samplecode"></xmp>
                        <!-- </code> -->
                        <!-- </pre> -->

                    </section>

                </div>
            </el-col>
        </el-row>


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
import { queryApi} from '@/api/gyjapi'
import { showXml} from '@/utils'
export default {
    data() {
        return {
            form: {
                content: '',
                apiname:'',
                appid:'',
                // channel:'gyjapi',
                version:'2.0.0.0',
                // base64:'1',
                projectid:'',
                prikey:'',
                samplecode:''
            },
            resdata:'',
            rules: {
                content: [
                    { required: true, message: '请输入报文内容', trigger: 'blur' },
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
                appid: [
                    { required: true, message: '请输入企业私钥', trigger: 'blur' }
                ],
            },
            currentpage:1,
            page:1,
            pageSize:6,
            projects:[],
            apis: [],
            channels:[{
                value: 'gyjapi',
                label: '工银聚API'
            }],
            proTotal:0,
            apicurrentpage:1,
            apiPage:1,
            apiPageSize:1006,
            apiTotal:'',
        }
    },
    methods: {
        onSubmit() {
             this.$refs['form'].validate((valid) => {
                if (valid) {
                    //根据产品编号获取该产品私钥
                    /* var project = this.projects.find((i) => {
                        return i.projectid == this.form.projectid;
                    });
                    this.form.prikey = project.prikey; */

                    this.form.content = encodeURI(this.form.content);
                    console.log(this.form)
                    queryApi(this.form).then(result => {
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
            if(this.page){
                    params.pageNum =  this.page;
            }else{
                    params.pageNum =  1;
            }
            params.pageSize =this.pageSize;
            console.log(params)
            getProjects(params).then(result => {
                console.log(result)
                that.listLoading = false;
                that.projects = result.list;
                that.proTotal = result.count;
            })

        },
        //查询通知接口列表 --- 若有翻页则前端selec要更改
        getApis() {
            var that = this;
            this.listLoading = true;
            var params=  {};
            params.type=3;
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
            this.form.samplecode =  ret.samplecode;
            this.form.properties = ret.properties;
            // this.form.samplecode =  showXml(ret.samplecode);
        },

        selectChange(val) {
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
                console.log(this.projects)
//                this.currentpage = 1;
                this.loading = false
            }).catch(e => {
                this.loading = false
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
    },
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

