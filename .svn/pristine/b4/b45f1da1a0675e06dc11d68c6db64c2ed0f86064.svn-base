 <template>
    <div class="table">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>参数管理</el-breadcrumb-item>
            <el-breadcrumb-item>业务参数管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="container">
            <div class="handle-box">
                <label for="">参数名称:</label>
                <el-input v-model="name" placeholder="请输入参数名称" class="handle-input mr10"></el-input>
                <!-- <label for="">参数分类:</label>
                <el-select v-model="type" placeholder="请选择参数分类">
                  <el-option
                    v-for="item in paramsType"
                    :key="item.Id"
                    :label="item.TypeName"
                    :value="item.Id">
                  </el-option>
                </el-select> -->
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
                <!-- <el-button type="primary" style="float:right" @click="showAddForm">添加参数</el-button> -->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="ParamName" align="center" label="参数名称">
                </el-table-column>
                <el-table-column prop="ParamValue" align="center" label="参数值">
                </el-table-column>
                <!-- <el-table-column prop="ParamType" align="center" label="参数类型">
                </el-table-column> -->
                <el-table-column prop="Description" align="center" label="描述">
                </el-table-column>
                <!-- <el-table-column prop="CreateTime" align="center" label="添加时间">
                    <template slot-scope="scope">
                        {{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="LastModified" align="center" label="更新时间">
                    <template slot-scope="scope">
                        {{ scope.row.LastModified | normalTime(scope.row.LastModified)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                      <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="deleteData(scope.row.ParamName)">删除</el-button> -->
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
            <el-dialog title="添加业务参数" :visible.sync="addVisible" width="663px">
                <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
                    <el-form-item label="参数名称:" prop="name">
                        <el-input v-model="addForm.name" placeholder="请输入您要添加的参数名"></el-input>
                    </el-form-item>
                    <el-form-item label="参数值:" prop="value">
                        <el-input v-model="addForm.value" placeholder="请输入参数值"></el-input>
                    </el-form-item>
                    <el-form-item label="参数分类:" prop="typeid">
                        <el-select v-model="addForm.typeid" placeholder="请选择类型">
                          <el-option
                            v-for="item in paramsType"
                            :key="item.Id"
                            :label="item.TypeName"
                            :value="item.Id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述:" prop="desc">
                        <el-input v-model="addForm.desc" placeholder="请输入描述"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="_addParam('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog :title="`编辑业务参数-${editForm.name}`" :visible.sync="editVisible" width="663px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
                    <el-form-item label="参数名称:" prop="name">
                        <el-input v-model="editForm.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="参数值:" prop="value">
                        <el-input type="textarea" v-model="editForm.value" placeholder="请输入参数值"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="参数分类:" prop="typeid">
                        <el-select v-model="editForm.typeid" placeholder="请选择类型">
                          <el-option
                            v-for="item in paramsType"
                            :key="item.Id"
                            :label="item.TypeName"
                            :value="item.Id">
                          </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="描述:" prop="desc">
                        <el-input type="textarea" v-model="editForm.desc"></el-input>
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
    import {getBusParamList, addBusParam, editBusParam, deleteBusParam, getBusSystemPList} from 'api/system.js'
    export default {
        name: 'Businessparam',
        data() {
            return {
                tableData: [],
                paramsType:[],
                cur_page: 1,
                name:'',
                paramsname:'',
                Id:'',
                type:'',
                pageCount:0,
                pagesize:30,
                addVisible:false,
                editVisible:false,
                Path:'',
                addForm: {
                  name: '',
                  desc: '',
                  value:'',
                  typeid:''
                },
                editForm: {
                  name: '',
                  desc: '',
                  value:'',
                  typeid:'',
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                    desc:[
                        { required: true, message: '请输入描述', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    ],
                    value:[
                        { required: true, message: '请输入参数值', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    ],
                    typeid:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                editrules: {
                    value:[
                        { required: true, message: '请输入参数值', trigger: 'blur' },
                    ],
                    typeid:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                }

            }
        },
        created() {
            // this.getParamsType();
            this.getData();
        },
        computed: {
        },
        methods: {
            getParamsType() {
              const params = {
                'pageindex': 1,
                'pagecount': 100,
                'typename': '',
              }
              getBusSystemPList(params).then(res =>{
                this.paramsType = res.Data.List
              })
            },
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                      'ParamName': this.paramsname,
                      'TypeId': this.editForm.typeid,
                      'Description':this.editForm.desc,
                      'ParamValue': this.editForm.value
                    }
                    editBusParam(params).then(res =>{
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
              // this.Id = item.Id
              this.paramsname = item.ParamName
              this.editForm.name = item.ParamName
              this.editForm.desc = item.Description
              this.editForm.value = item.ParamValue
              this.editForm.typeid = item.TypeId
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.LastModified
            },
            showAddForm(){
              this.addVisible = true;
            },
            // 添加模块
            _addParam(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            'ParamName': this.addForm.name,
                            'Description': this.addForm.desc,
                            'TypeId': this.addForm.typeid,
                            'ParamValue': this.addForm.value
                        }
                        addBusParam(params).then(res =>{
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
            deleteData(paramname){
              this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const params = {
                  'paramname':paramname
                }
                deleteBusParam(params).then(res=> {
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
                'paramname': this.name,
                'typecode': this.type
              }
              getBusParamList(params).then(res =>{
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