<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">席位编号:</label>
                <el-input v-model="seatNumber" placeholder="请输入席位编号" class="handle-input mr10"></el-input>
                <label for="">使用号码:</label>
                <el-input v-model="mobile" placeholder="请输入电话号码" class="handle-input mr10"></el-input>
                <label for="">使用商家:</label>
                <el-input v-model="accountName" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8;">搜索</el-button>
                <el-button type="primary" style="float:right" @click="showAddForm">增加席位</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="SeatId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="SeatNumber" align="center" label="席位编号" >
                </el-table-column>
                <el-table-column prop="Mobile" align="center" label="被使用电话号码" >
                </el-table-column>
                <el-table-column prop="AccountName" align="center" label="被使用商家" >
                </el-table-column>
                <el-table-column prop="Type" align="center" label="类型" >
                  <template slot-scope="scope">
                      {{getType(scope.row.Type)}}
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
                        @change="changeStatus($event, scope.row.SeatId)"
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
                      <el-button type="text" icon="el-icon-delete" class="red" @click="deleteData(scope.row.SeatId)">删除</el-button>
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
                    <el-form-item label="席位号码:" prop="SeatNumber">
                        <el-input v-model="addForm.SeatNumber" placeholder="席位号码"></el-input>
                    </el-form-item>
                    <el-form-item label="席位账号:" prop="SeatAccount">
                        <el-input v-model="addForm.SeatAccount" placeholder="席位账号"></el-input>
                    </el-form-item>
                    <el-form-item label="席位密码:" prop="SeatPassword">
                        <el-input type="password" v-model="addForm.SeatPassword" placeholder="席位密码"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="Description">
                        <el-input type="textarea"  v-model="addForm.Description" placeholder="描述"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="addVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="_addCallSeat('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title='编辑席位' :visible.sync="editVisible" width="633px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                    <el-form-item label="席位号码:" prop="SeatNumber">
                        <el-input v-model="editForm.SeatNumber" placeholder="席位号码"></el-input>
                    </el-form-item>
                    <el-form-item label="席位账号:" prop="SeatAccount">
                        <el-input v-model="editForm.SeatAccount" placeholder="席位账号"></el-input>
                    </el-form-item>
                    <el-form-item label="席位密码:" prop="SeatPassword">
                        <el-input type="password" v-model="editForm.SeatPassword" placeholder="席位密码"></el-input>
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
        </div>
    </div>
</template>

<script>
    import {setCallSeatStatus, addCallSeat, editCallSeat, deleteCallSeat,getCallSeatList} from 'api/system.js'
    export default {
        name: 'CallSeatList',
        data() {
            return {
                SeatData:[],
                tableData: [],
                cur_page: 1,
                seatNumber:'',
                accountName:'',
                mobile:'',
                type:0,
                Id:'',
                pageCount:0,
                pagesize:30,
                addVisible:false,
                editVisible:false,
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
                  SeatNumber: '',
                  SeatAccount:'',
                  SeatPassword:'',
                  Description:''
                },
                editForm: {
                  SeatNumber: '',
                  SeatAccount:'',
                  SeatPassword:'',
                  Description:'',
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                    SeatNumber:[
                        { required: true, message: '请输入席位号码', trigger: 'blur' },
                    ],
                    SeatAccount:[
                        { required: true, message: '请输入席位账号', trigger: 'blur' },
                    ],
                    SeatPassword:[
                        { required: true, message: '请输入席位密码', trigger: 'blur' },
                    ],
                    Description: [
                        { message: '请输入描述', trigger: 'blur' }
                    ]
                },
                editrules: {
                   SeatNumber:[
                        { required: true, message: '请输入席位号码', trigger: 'blur' },
                    ],
                    SeatAccount:[
                        { required: true, message: '请输入席位账号', trigger: 'blur' },
                    ],
                    SeatPassword:[
                        { required: true, message: '请输入席位密码', trigger: 'blur' },
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
              setCallSeatStatus(params).then(res =>{
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
            },
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'Id': this.Id,
                        'SeatNumber': this.editForm.SeatNumber,
                        'SeatAccount': this.editForm.SeatAccount,
                        'SeatPassword': this.$md5(this.editForm.SeatPassword),
                        'Description': this.editForm.Description,
                        
                    }
                    editCallSeat(params).then(res =>{
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
              this.Id = item.SeatId
              this.editForm.SeatNumber = item.SeatNumber;
              this.editForm.SeatAccount = item.SeatAccount;
              this.editForm.SeatPassword = item.SeatPassword;
              this.editForm.Description = item.Description;
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.UpdateTime
            },
            //获取类型
            getType(type){
              switch (type) {
                case 0:
                  return '未知'
                  break;
                case 1:
                  return '座机'
                  break;
                case 2:
                  return '电话条'
                  break;
                default:
                  break;
              }
            },
            showAddForm(){
              this.addVisible = true;
              this.addForm.SeatNumber = '';
              this.addForm.SeatAccount = '';
              this.addForm.SeatPassword = '';
              this.addForm.Description = '';
            },
            // 添加席位
            _addCallSeat(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      const params = {
                        'SeatNumber': this.addForm.SeatNumber,
                        'SeatAccount': this.addForm.SeatAccount,
                        'SeatPassword': this.$md5(this.addForm.SeatPassword),
                        'Description': this.addForm.Description,
                      }
                      addCallSeat(params).then(res =>{
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
                deleteCallSeat(params).then(res=> {
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
                'Mobile':this.mobile,
                'SeatNumber':this.seatNumber,
                'AccountName':this.accountName,
                'Type':0,
                'Status':0,
                'pageindex':this.cur_page,
                'pagecount':this.pagesize
              }
              getCallSeatList(params).then(res =>{
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