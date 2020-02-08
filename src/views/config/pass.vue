<template>
    <div class="app-container">

        <el-form ref="form"  >
            <el-form-item>
                <el-button type="primary" size="small" @click="addFormVisible = true">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table  :data="tableData" border style="width: 100%">

            <el-table-column  prop="path" label="重定向url"  width="300"> </el-table-column>
            <el-table-column  prop="name" label="名称"  width="180"></el-table-column>
            <el-table-column  prop="url" label="透传目的地址" width="180"></el-table-column>
            <el-table-column  prop="redirecthost" label="重定向地址" width="300"></el-table-column>
            <el-table-column  prop="requrl" label="配置生成的请求地址" width="300"></el-table-column>


            <el-table-column fixed="right"  label="操作"  width="100">
                <template slot-scope="scope">
                    <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small"  @click="onUpdateForm(scope.row)" >修改</el-button>
                </template>
            </el-table-column>
        </el-table>




        <el-dialog title="新增" :visible.sync="addFormVisible">
            <el-form :model="addForm" label-width="120px">
                <el-form-item label="重定向url">
                    <el-input v-model="addForm.path" placeholder="请输入重定向url" />
                </el-form-item>

                <el-form-item label="环境编号">
                    <el-input v-model="addForm.name" placeholder="请输入名称"/>
                </el-form-item>

                <el-form-item label="重定向名称">
                    <el-input v-model="addForm.url" placeholder="请输入透传目的地址"/>
                </el-form-item>

                <el-form-item label="重定向地址">
                    <el-input v-model="addForm.redirecthost" placeholder="请输入重定向地址"/>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd()">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="编辑" :visible.sync="upFormVisible">
            <el-form :model="updateForm" label-width="120px">
                <el-form-item label="重定向url">
                    <el-input v-model="updateForm.path" placeholder="请输入重定向url" />
                </el-form-item>

                <el-form-item label="名称">
                    <el-input v-model="updateForm.name" placeholder="请输入名称"/>
                </el-form-item>

                <el-form-item label="透传目的地址">
                    <el-input v-model="updateForm.url" placeholder="请输入透传目的地址"/>
                </el-form-item>

                <el-form-item label="重定向地址">
                    <el-input v-model="updateForm.redirecthost" placeholder="请输入重定向地址"/>
                </el-form-item>

                <el-form-item label="生成的请求地址">
                    <el-input v-model="updateForm.requrl" disabled=""/>
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
      form: {
        path: '',
        name: '',
        url: '',
          redirecthost:'',
      },

        addForm: {
          path: '',
          name: '',
          url: '',
          redirecthost:'',
        },

        addFormVisible: false,
        upFormVisible: false,
        updateForm:{},
        tableData: [{
          path: '11',
          name: '22',
          url: '33',
          redirecthost:'44',
          requrl:'55'
        }, {
          path: '11',
          name: '22',
          url: '33',
          redirecthost:'44',
          requrl:'55'
        }, {
          path: '11',
          name: '22',
          url: '33',
          redirecthost:'44',
          requrl:'55'
        }],
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
        this.upFormVisible = true;
        console.log(row);
        this.updateForm = row;
    },
    onAdd(row) {
        console.log(row);
      },
    onUpdate(row) {
      this.$message('submit!')
      }
  }
}
</script>


