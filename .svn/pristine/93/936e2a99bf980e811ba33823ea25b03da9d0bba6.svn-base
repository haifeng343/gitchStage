 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">电话号码:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <label for="">状态:</label>
                <el-select v-model="type" placeholder="请选择">
                    <el-option
                    v-for="item in bannerTypeList1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-button icon="search" @click="search" style="color:018AD8;">搜索</el-button>
                <el-button type="primary" style="float:right" @click="showAddForm">增加号码</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="Mobile" align="center" label="电话号码" >
                </el-table-column>
                <el-table-column prop="SeatCount" align="center" label="席位数量" >
                  <template slot-scope="scope">
                      <el-button type="text" @click="openSeatList(scope.row)">{{scope.row.SeatCount}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="150" align="center">
                  <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.Status"
                        active-text="有效"
                        inactive-text="无效"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeStatus($event, scope.row.Id)"
                      >
                      </el-switch>
                  </template>
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
            <el-dialog title="添加号码" :visible.sync="addVisible" width="663px" autocomplete="off">
                <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
                    <el-form-item label="电话号码:" prop="Mobile">
                        <el-input v-model="addForm.Mobile" placeholder="电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="Description">
                        <el-input type="textarea"  v-model="addForm.Description" placeholder="描述"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="addVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="_addCallMobile('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title='编辑号码' :visible.sync="editVisible" width="633px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                    <el-form-item label="电话号码:" prop="Mobile">
                        <el-input v-model="editForm.Mobile" placeholder="电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="Description">
                        <el-input type="textarea"  v-model="editForm.Description" placeholder="描述"></el-input>
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
            <el-dialog :title="`席位列表-${SeatMobile}`" :visible.sync="openVisible" width="633px">
              <el-table :data="SeatData" border class="table" ref="multipleTable">
                <el-table-column prop="SeatId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="AccountName" align="center" label="商家名称" >
                </el-table-column>
                 <el-table-column prop="SeatNumber" align="center" label="席位编号">
                </el-table-column>
                <el-table-column prop="CreateTime" align="center" label="创建时间">
                    <template slot-scope="scope">
                        {{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}
                    </template>
                </el-table-column>
              </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getCallMobileList,setCallMobileStatus, addCallMobile, editCallMobile, deleteCallMobile,getCallSeatList} from 'api/system.js'
    export default {
        name: 'CallMobileList',
        data() {
            return {
                SeatData:[],
                tableData: [],
                cur_page: 1,
                SeatMobile:'',
                name:'',
                phone:'',
                isShowDelete:false,
                imageUrl:'',
                type:0,
                Id:'',
                Path:'',
                myHeaders:{
                    application:`manager`
                },
                pageCount:0,
                pagesize:30,
                addVisible:false,
                editVisible:false,
                openVisible:false,
                bannerTypeList:[],
                bannerTypeList1:[
                   {
                        id:0,
                        name:'全部'
                   },
                   {
                        id:1,
                        name:'有效'
                   },
                   {
                        id:2,
                        name:'无效'
                   },

                ],
                addForm: {
                  Mobile: '',
                  Description:'',
                },
                editForm: {
                  Mobile: '',
                  Description:'',
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                    Mobile:[
                        { required: true, message: '请输入正确的电话', trigger: 'blur' },
                    ],
                    Description: [
                        { message: '请输入描述', trigger: 'blur' }
                    ]
                },
                editrules: {
                    Mobile:[
                        { required: true, message: '请输入正确的电话', trigger: 'blur' },
                    ],
                    Description: [
                        { message: '请输入描述', trigger: 'blur' }
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
            // 修改switch的状态
            changeStatus(status,id){
              const params = {
                'Id': id,
                "Status": status,
              }
              setCallMobileStatus(params).then(res =>{
                if(res.Success){
                  this.$message({
                    showClose: true,
                    message: '状态更新成功',
                    type: 'success'
                  });
                  this.getData(this.cur_page)
                }
              })
            },
            // 打开席位列表
            openSeatList(item){
              this.openVisible = true
              this.SeatMobile = item.Mobile
              this._getCallSeatList(item.Mobile)
            },
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'Id': this.Id,
                        'Mobile':this.editForm.Mobile,
                        'Description': this.editForm.Description,
                        
                    }
                    editCallMobile(params).then(res =>{
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
              this.Id = item.Id
              this.editForm.Mobile = item.Mobile
              this.editForm.Description = item.Description
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.UpdateTime
            },
            showAddForm(){
              this.addVisible = true;
              this.addForm.Mobile = '';
              this.addForm.Description = '';
            },
            // 添加广告
            _addCallMobile(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      const params = {
                        'Mobile': this.addForm.Mobile,
                        'Description': this.addForm.Description,
                      }
                      addCallMobile(params).then(res =>{
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
              this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const params = {
                  'id':id
                }
                deleteCallMobile(params).then(res=> {
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
            _getCallSeatList(mobile) {
              const params = {
                'Mobile':mobile,
                'Type':0,
                'Status':0,
                'pageindex':1,
                'pagecount':30
              }
              getCallSeatList(params).then(res =>{
                if (res && res.Success){
                        this.SeatData = res.Data.List
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
              })
            },
            // 获取表格数据
            getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'Mobile': this.phone,
                'Status': this.type
              }
              getCallMobileList(params).then(res =>{
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
    .el-icon-plus{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
    }
</style>
<style>
    .upload-delete{
        color: #fff !important;
        position: absolute;
        top: 45%;
        left: 45%;
        font-size:24px;
    }
</style>