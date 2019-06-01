 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">订单号:</label>
                <el-input v-model="order" placeholder="请输入订单号" class="handle-input mr10"></el-input>
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
            <tree-table :data="tableData" :columns="columns" border v-on:listenChild="reloadData()"></tree-table>
            <!-- <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="OrderSn" align="center" label="订单号" >
                </el-table-column>
                <el-table-column prop="OrderId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="SellerName" align="center" label="商家名称">
                </el-table-column>
                <el-table-column prop="SellerPhone" align="center" label="手机号">
                </el-table-column>
                <el-table-column prop="TemplateName" align="center" label="模板名称">
                </el-table-column>
                <el-table-column prop="Status" align="center" label="状态">
                  <template slot-scope="scope">
                        {{ getStatus(scope.row.Status)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CreateTime" align="center" label="创建时间">
                    <template slot-scope="scope">
                        {{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="FinishTime" align="center" label="完成时间">
                    <template slot-scope="scope">
                        {{ scope.row.FinishTime | normalTime(scope.row.FinishTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align="center" width="300">
                    <template slot-scope="scope">
                      <el-button type="text"  @click="jumpDetail(scope.row)">订单详情</el-button>
                      <el-button type="text"  @click="jumpAccess(scope.row)">访问详情</el-button>
                      <el-button type="text"  @click="jumpSend(scope.row)">发送详情</el-button>
                    </template>
                </el-table-column>
            </el-table> -->
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
                        <el-input v-model="editForm.Ip" disabled></el-input>
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
    import treeTable from 'base/treeTable'
    import {getOrderList} from 'api/seller.js'
    export default {
        name: 'Sellersmsorderlist',
        components:{
            treeTable
        },
        data() {
            return {
                tableData: [],
                statusList:[
                  {id:0,name:'全部状态'},
                  {id:1,name:'待发送'},
                  {id:2,name:'正在发送'},
                  {id:3,name:'商家取消发送'},
                  {id:4,name:'发送已完成'},
                  {id:5,name:'订单被无效'},
                ],
                cur_page: 1,
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
                columns:[
                    {
                        text: '订单号',
                        value: 'OrderSn',
                        width:'250'
                    },
                    {
                        text: 'ID',
                        value: 'OrderId',
                    },
                    {
                        text: '商家名称',
                        value: 'SellerName',
                    },
                    {
                        text: '手机号',
                        value: 'SellerPhone',
                    },
                    {
                        text: '模板名称',
                        value: 'TemplateName',
                    },
                    {
                        text: '状态',
                        value: 'Status',
                    },
                    {
                        text: '发送费用',
                        value: 'PayMoney',
                    },
                    {
                        text: '成功发送数量',
                        value: 'SuccessCount',
                    },
                    {
                        text: '创建时间',
                        value: 'CreateTime',
                    },
                    {
                        text: '完成时间',
                        value: 'FinishTime',
                    },
                    {
                        text: '操作',
                        value: 'function',
                        width:'350'
                    },
                ]
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
            // 跳转到订单详情
            jumpDetail(item){
              this.$router.push(`/sellersmsorderDetail/${item.OrderId}`)
            },
            // 跳转到访问详情
            jumpAccess(item){
              this.$router.push(`/accessDetail/${item.OrderId}`)
            },
            // 跳转到发送详情
            jumpSend(item){
              this.$router.push(`/sendDetail/${item.OrderId}`)
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
                'OrderSN': this.order,
                'Status': this.status,
                'AccountName': this.name,
                'Phone': this.phone
              }
              getOrderList(params).then(res =>{
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
            //获取状态
            getStatus(Status){
              switch (Status) {
                case 1:
                  return '待发送'
                  break;
                case 2:
                  return '正在发送'
                  break;
                case 3:
                  return '商家取消发送'
                  break;
                case 4:
                  return '发送已完成'
                  break;
                case 5:
                  return '订单被无效'
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
</style>