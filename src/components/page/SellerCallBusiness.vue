 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">商家名称:</label>
                <el-input v-model="name" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <label for="">状态:</label>
                <el-select v-model="status" placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="AccountName" align="center" label="商家名称">
                </el-table-column>
                <el-table-column prop="Mobile" align="center" label="手机号">
                </el-table-column>
                <el-table-column prop="SeatCount" align="center" label="席位数量">
                </el-table-column>
                <el-table-column prop="MobileCount" align="center" label="号码数量">
                </el-table-column>
                <el-table-column prop="TelephoneCount" align="center" label="座机数量">
                </el-table-column>
                <el-table-column prop="LicenceUrl" align="center" label="营业执照">
                  <template slot-scope="scope">
                    <el-button type="text"  @click="jumpUrl(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="Status" align="center" label="状态">
                  <template slot-scope="scope">
                    <el-button type="text"  @click="changeStatus(scope.row)">{{ getStatus(scope.row.Status)}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="StatusDes" align="center" label="状态描述">
                </el-table-column>
                <el-table-column label="操作"  align="center">
                  <template slot-scope="scope">
                    <el-button type="text"  @click="jumpToSeat(scope.row)">席位列表</el-button>
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
            <el-dialog title="营业执照" :visible.sync="imgVisible" width="633px">
              <img :src="imgURL" class="license">
            </el-dialog>
            <!--状态修改弹出框 -->
            <el-dialog :title="`状态修改-${changeForm.accountName}`" :visible.sync="changeVisible" width="663px">
                <el-form ref="changeForm" :model="changeForm" :rules="changerules" label-width="100px">
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="changeForm.status" placeholder="请选择" style="width:100%;">
                            <el-option
                                v-for="item in statusList1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态描述" prop="statusDes">
                        <el-input type="textarea" v-model="changeForm.statusDes" placeholder="请输入状态描述"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="medium" class="dialog-certain" @click="_changeStatus('changeForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import treeTable from 'base/treeTable'
    import {getSellerCallList,changeCallApplyStatus} from 'api/seller.js'
    export default {
        name: 'SellerCallBusiness',
        components:{
            treeTable
        },
        data() {
            return {
                tableData: [],
                statusList:[
                  {id:0,name:'全部'},
                  {id:1,name:'审核中'},
                  {id:2,name:'审核通过'},
                  {id:3,name:'审核失败'},
                  {id:4,name:'管理员作废'},
                  {id:5,name:'待审核'},
                ],
                statusList1:[
                  {id:1,name:'审核中'},
                  {id:2,name:'审核通过'},
                  {id:3,name:'审核拒绝'},
                  {id:4,name:'管理员作废'},
                ],
                changeForm: {
                  accountName:'商家',
                  statusDes:'',
                  status:'',
                },
                changeVisible:false,
                imgVisible:false,
                cur_page: 1,
                imgURL: '',
                order:'',
                status:0,
                Id:'',
                pageCount:0,
                name:'',
                phone:'',
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
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    des: [
                        { required: true, message: '请输入描述', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ]
                },
                changerules: {
                    status: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    statusDes:[
                        { required: true, message: '请输入描述', trigger: 'blur' },
                    ],
                },
                editrules: {
                    Ip: [
                        { required: true, message: '请输入Ip地址', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    token: [
                        { required: true, message: '请输入安全码', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    des: [
                        { required: true, message: '请输入描述', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            reloadData(){
                this.getData()
            },
            // 查看营业执照
            jumpUrl(item) {
              this.imgVisible = true;
              this.imgURL = `${item.LicenceUrl}?usertoken=gudi20181212001`;
            },
            // 席位列表
            jumpToSeat(item){
              this.$router.push(`/sellerCallSeatList/${item.Id}`)
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
                'Status': this.status,
                'AccountName': this.name,
                'Mobile': this.phone
              }
              getSellerCallList(params).then(res =>{
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
            },
            changeStatus(item){
                this.changeVisible = true
                this.ctId = item.Id
                this.changeForm.statusDes = item.StatusDes
                this.changeForm.accountName = item.AccountName
                this.changeForm.status = item.Status
            },
            // 修改状态
            _changeStatus(formName){
                this.$confirm('您确定要修改状态吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                      const params = {
                        'Id': this.ctId,
                        'Status': this.changeForm.status,
                        'StatusDes': this.changeForm.statusDes
                      }
                      changeCallApplyStatus(params).then(res =>{
                          if(res.Success){
                          this.$message({
                              showClose: true,
                              message: '修改成功',
                              type: 'success'
                          });
                          this.getData(this.cur_page)
                          this.changeVisible = false;
                          }else{
                              this.$message.error(res.Message);
                          }
                      })
                  } else {
                      return false;
                  }
              });
                
              }).catch(() => {
                
              });
            },
            //获取状态
            getStatus(Status){
              switch (Status) {
                case 0:
                  return '待审核'
                  break;
                case 1:
                  return '审核中'
                  break;
                case 2:
                  return '审核通过'
                  break;
                case 3:
                  return '审核失败'
                  break;
                case 4:
                  return '管理员作废'
                  break;
                default:
                  break;
              }
            },
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
    .license{
      width: 500px;
      height: auto;
    }
    .container{
        padding: 0 20px;
    }
</style>