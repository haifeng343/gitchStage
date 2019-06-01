 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">参数名称:</label>
                <el-input v-model="ParName" placeholder="请输入参数名称" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="ParamName" align="center" label="参数名称" >
                </el-table-column>
                <el-table-column prop="ParamValue" align="center" label="参数值" >
                </el-table-column>
                <el-table-column prop="Description" align="center" label="描述">
                </el-table-column>
                <el-table-column prop="LastModified" align="center" label="更新时间">
                    <template slot-scope="scope">
                        {{ scope.row.LastModified | normalTime(scope.row.LastModified)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑支付参数" :visible.sync="editVisible" width="633px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                    <el-form-item label="参数名称:" prop="name" >
                        <el-input v-model="editForm.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="参数值:" prop="value">
                        <el-input type="textarea" v-model="editForm.value"></el-input>
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
    import {getPayParamList, editPayParam} from 'api/system.js'
    export default {
        name: 'PayParam',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                ChannelCode:'',
                BusinessCode:'',
                ParName:'',
                Id:'',
                pageCount:0,
                pagesize:30,
                editVisible:false,
                editForm: {
                  name: '',
                  value:'',
                  des:'',
                  createTime:'',
                  updateTime:''
                },
                editrules: {
                    name: [
                    ],
                    value: [
                        { required: true, message: '请输入参数值', trigger: 'blur' },
                    ],
                    des: [
                    ]
                }

            }
        },
        created() {
          this.ChannelCode = localStorage.getItem('ChannelCode')
          this.BusinessCode = localStorage.getItem('BusinessCode')
          this.getData();
        },
        watch: {
          $route(route){
            this.ChannelCode = localStorage.getItem('ChannelCode')
            this.BusinessCode = localStorage.getItem('BusinessCode')
            this.getData();
          }
        },
        methods: {
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'ChannelCode':this.ChannelCode,
                        'BusinessCode': this.BusinessCode,
                        'ParName': this.editForm.name,
                        'ParValue': this.editForm.value,
                        'Description': this.editForm.des
                    }
                    editPayParam(params).then(res =>{
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
              this.editVisible = true
              this.editForm.name = item.ParamName
              this.editForm.value = item.ParamValue
              this.editForm.des = item.Description
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.LastModified
            },
            // 删除角色
            deleteData(ip){
              this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
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
                'ChannelCode': this.ChannelCode,
                'BusinessCode': this.BusinessCode,
                'ParName': this.ParName,
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
              }
              getPayParamList(params).then(res =>{
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