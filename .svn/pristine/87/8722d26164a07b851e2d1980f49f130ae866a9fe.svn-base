 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">IP地址:</label>
                <el-input v-model="Ip" placeholder="请输入IP地址" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
                <el-button type="primary" style="float:right" @click="showAddForm">添加安全码</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="Ip" align="center" label="IP" >
                </el-table-column>
                <el-table-column prop="Token" align="center" label="安全码" >
                </el-table-column>
                <el-table-column prop="Description" align="center" label="描述">
                </el-table-column>
                <el-table-column prop="UpdateTime" align="center" label="更新时间">
                    <template slot-scope="scope">
                        {{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button type="text" icon="el-icon-delete" class="red" @click="deleteData(scope.row.Ip)">删除</el-button>
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
            <el-dialog title="添加安全码" :visible.sync="addVisible" width="663px" autocomplete="off">
                <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
                    <el-form-item label="Ip地址:" prop="Ip">
                        <el-input v-model="addForm.Ip"></el-input>
                    </el-form-item>
                    <el-form-item label="安全码:" prop="token">
                        <el-input v-model="addForm.token"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="des">
                        <el-input type="textarea" v-model="addForm.des"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="addVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="_addAPI('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑安全码" :visible.sync="editVisible" width="633px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                    <el-form-item label="Ip地址:" prop="Ip" >
                        <el-input v-model="editForm.Ip"></el-input>
                    </el-form-item>
                    <el-form-item label="安全码:" prop="token">
                        <el-input v-model="editForm.token"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="des">
                        <el-input type="textarea" v-model="editForm.des"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-time-box">
                    <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span><span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="editVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="saveEdit('editForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getAPIList, addAPI, deleteAPI, editAPI} from 'api/system.js'
    export default {
        name: 'Saveapi',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                Ip:'',
                Id:'',
                pageCount:0,
                pagesize:30,
                addVisible:false,
                editVisible:false,
                departmentList:[],
                addForm: {
                  Ip: '',
                  token:'',
                  des:''
                },
                editForm: {
                  Ip: '',
                  token:'',
                  des:'',
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                    Ip: [
                        { required: true, message: '请输入Ip地址', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    token: [
                        { required: true, message: '请输入安全码', trigger: 'blur' },
                    ],
                },
                editrules: {
                    Ip: [
                        { required: true, message: '请输入Ip地址', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    token: [
                        { required: true, message: '请输入安全码', trigger: 'blur' },
                    ]
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
                        'Id':this.Id,
                        'Ip': this.editForm.Ip,
                        'Token': this.editForm.token,
                        'Description': this.editForm.des
                    }
                    editAPI(params).then(res =>{
                        if(res.Success){
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getData(this.cur_page)
                        this.editVisible = false;
                        }else{
                            this.$message(res.Message);
                        }
                    })
                } else {
                    return false;
                }
              });
            },
            // 显示编辑弹窗
            handleEdit(item){
              this.Id = item.Id
              this.editVisible = true
              this.editForm.Ip = item.Ip
              this.editForm.token = item.Token
              this.editForm.des = item.Description
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.UpdateTime
            },
            showAddForm(){
              this.addVisible = true;
            },
            // 添加
            _addAPI(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      const params = {
                        'Ip': this.addForm.Ip,
                        'Token': this.addForm.token,
                        'Description': this.addForm.des
                      }
                      addAPI(params).then(res =>{
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
            deleteData(ip){
              this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const params = {
                  'Ip':ip
                }
                deleteAPI(params).then(res=> {
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
                'pagecount': this.pagesize,
                'Ip': this.Ip,
              }
              getAPIList(params).then(res =>{
                if (res && res.Success){
                        this.tableData = res.Data.List
                        this.pageCount = res.Data.TotalCount
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
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