<template>
  <div class="app-container">

    <el-form ref="form"  >
      <el-form-item>
        <el-button type="primary" size="small" @click="addFormVisible = true">新增</el-button>
      </el-form-item>

    </el-form>
       <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="projectname"
      label="项目名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="projectid"
      label="项目编号"
      width="120">
    </el-table-column>

    <el-table-column  prop="prikey" label="私钥"  width="3000"></el-table-column>


    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="copy(scope.row)" type="text" size="small">复制私钥</el-button>
        <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small"  @click="upFormVisible = true" >修改</el-button>
      </template>
    </el-table-column>
  </el-table>




<el-dialog title="新增项目" :visible.sync="addFormVisible">
  <el-form :model="addForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth">
      <el-input v-model="addForm.projectid" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目名称" :label-width="formLabelWidth">
      <el-input v-model="addForm.projectname" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目私钥" :label-width="formLabelWidth">
      <el-input v-model="addForm.prikey" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onAdd()">确 定</el-button>
  </div>
</el-dialog>



<el-dialog title="编辑项目" :visible.sync="upFormVisible">
  <el-form :model="updateForm">
    <el-form-item label="项目编号" :label-width="formLabelWidth">
      <el-input v-model="updateForm.projectid" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目名称" :label-width="formLabelWidth">
      <el-input v-model="updateForm.projectname" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="项目私钥" :label-width="formLabelWidth">
      <el-input v-model="updateForm.prikey" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="upFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onUpdate(scope.row)">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
export default {
    data() {
        return {
        addForm: {
            projectid: '',
            projectname: '',
            prikey: '',
        },
        updateForm: {
            projectid: '',
            projectname: '',
            prikey: '',
        },

        tableData: [{
            projectid: 'dzbl',
            projectname: '到账伴侣',
            prikey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC71XxqUGmI5kNbzPxGNABKE/vgCsntc76l+Mi9CCKGEBfwWxMSOPu/uAFtCKCU1tboySsAfzKaoku2mu/TuW6lbJiuH511sFgX355dzfSGrxJML0gqGg/QgcE8cPL+mXEnip6XAHYht/NBGh2AUuHm6N3iyEhhz1wStmC+Hk7d4QIDAQAB1'
        }, {
            projectid: 'yzt',
            projectname:'银账通',
            prikey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC71XxqUGmI5kNbzPxGNABKE/vgCsntc76l+Mi9CCKGEBfwWxMSOPu/uAFtCKCU1tboySsAfzKaoku2mu/TuW6lbJiuH511sFgX355dzfSGrxJML0gqGg/QgcE8cPL+mXEnip6XAHYht/NBGh2AUuHm6N3iyEhhz1wStmC+Hk7d4QIDAQAB2'
        }, {
            projectid: 'licai',
            projectname: '理财',
            prikey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC71XxqUGmI5kNbzPxGNABKE/vgCsntc76l+Mi9CCKGEBfwWxMSOPu/uAFtCKCU1tboySsAfzKaoku2mu/TuW6lbJiuH511sFgX355dzfSGrxJML0gqGg/QgcE8cPL+mXEnip6XAHYht/NBGh2AUuHm6N3iyEhhz1wStmC+Hk7d4QIDAQAB3'
        }],
        formLabelWidth: '120px',
        addFormVisible: false,
        upFormVisible: false,
        }


    },
    methods: {
        onSubmit() {
            this.$message('submit!')
        },
        onDel(row) {
            console.log(row);
        },
        onUpdateForm(row) {
            console.log(row);
        },
        onAdd(row) {
            console.log(row);
        },
        onUpdate(row) {
            console.log(row);
        },
        copy(row) {
            console.log(row.prikey);
            const input = document.createElement("input");
            input.setAttribute("readonly", "readonly");
            input.setAttribute("value", row.prikey);
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, 9999);
            if (document.execCommand("copy")) {
                document.execCommand("copy");
                this.$message({
                    message: '复制成功！',
                    type: 'success'
                })
            }
            document.body.removeChild(input);
        }
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

