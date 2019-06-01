 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>部门管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">部门名称:</label>
                <el-input v-model="name" placeholder="请输入部门名称" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
                <el-button type="primary" style="float:right" @click="showAddForm">添加部门</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="Name" align="center" label="部门">
                </el-table-column>
                <el-table-column prop="UpdateTime" align="center" label="最后修改时间">
                    <template slot-scope="scope">
                        {{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button type="text" icon="el-icon-delete" class="red" @click="deleteData(scope.row.Id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="30"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageCount">
                </el-pagination>
            </div>
            <!-- 新增弹出框 -->
            <el-dialog title="添加部门" :visible.sync="addVisible" width="663px">
                <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
                    <el-form-item label="部门名称:" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="editVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="_addDepartment('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑部门" :visible.sync="editVisible" width="663px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
                    <el-form-item label="部门名称:" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>

                </el-form>
                <div class="dialog-time-box">
                    <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span><span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="editVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="saveEdit('editForm')">确 定</el-button>
                </span>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit('editForm')">确 定</el-button>
                </span> -->
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getDepartment, addDepartment, deleteDepartment, editDepartment} from 'api/user.js'
    export default {
        name: 'Department',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                name:'',
                Id:'',
                pageCount:0,
                pagesize:30,
                addVisible:false,
                editVisible:false,
                addForm: {
                  name: '',
                },
                editForm: {
                  name: '',
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                    name: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                },
                editrules: {
                    name: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                }

            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                      'name': this.editForm.name,
                      'id': this.Id
                    }
                    editDepartment(params).then(res =>{
                        if(res.Success){
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getData(this.cur_page)
                        this.editVisible = false;
                        }else{
                            this.$message.error(res.Message);
                        }
                    })
                } else {
                    return false;
                }
              });
            },
            // 显示编辑弹窗
            handleEdit(item){
              this.editVisible = true
              this.Id = item.Id
              this.editForm.name = item.Name
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.UpdateTime
            },
            showAddForm(){
              this.addVisible = true;
            },
            // 添加部门
            _addDepartment(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      const params = {
                        'name': this.addForm.name,
                      }
                      addDepartment(params).then(res =>{
                          if(res.Success){
                          this.$message({
                              showClose: true,
                              message: '添加成功',
                              type: 'success'
                          });
                          this.getData(this.cur_page)
                          this.addVisible = false;
                          }else{
                              this.$message.error(res.Message);
                          }
                      })
                  } else {
                      return false;
                  }
              });
            },
            // 删除角色
            deleteData(id){
              this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const params = {
                  'id':id
                }
                deleteDepartment(params).then(res=> {
                  if(res.Success){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    this.getData()
                  }else{
                    this.$message.error(res.Message)
                  }
                }).catch(error => {
                  console.log('error')
                })
                
              }).catch(() => {       
              });
            },
            //分页导航尺寸更改
            handleSizeChange(val){
                this.pagesize = val;
                this.getData();
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取表格数据
            getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagesize': this.pagesize,
                'name': this.name,
              }
              getDepartment(params).then(res =>{
                this.tableData = res.Data.List
                this.pageCount = res.Data.TotalCount
              })
            },
            search() {
                this.cur_page = 1
                this.getData();
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 230px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>