 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">父母姓名:</label>
                <el-input v-model="parentName" placeholder="请输入父母姓名" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8;">搜索</el-button>
                <download-excel
                class="export-excel-wrapper"
                :data="json_data"
                :fields="json_fields"
                name="订单访问详情.xls"
                >
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                <el-button type="primary" size="small">导出</el-button>
                </download-excel>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="JumpId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="OrderSn" align="center" label="父/母" >
                    <template slot-scope="scope">
                        {{scope.row.Father}}/{{scope.row.Mother}}
                    </template>
                </el-table-column>
                <el-table-column prop="Phone" align="center" label="手机号">
                </el-table-column>
                <!-- <el-table-column prop="ChildName" align="center" label="小孩姓名">
                </el-table-column> -->
                <el-table-column prop="VisitCount" align="center" label="访问次数">
                </el-table-column>
                <el-table-column label="操作"  align="center" >
                    <template slot-scope="scope">
                      <el-button type="text"  @click="jumpAccess(scope.row)">记录详情</el-button>
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
    import {getVisitInfo} from 'api/seller.js'
    export default {
        name: 'AccessDetail',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                order:'',
                orderId:'',
                phone:'',
                parentName:'',
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
                // excel
                json_fields: {
                    "小孩姓名": "ChildName",
                    "电话号码": "Phone",
                    "年龄": "Age",
                    "联系地址":'Address',
                    "设备信息": "Device",
                    "访问IP列表": "IpList",
                    "有效访问次数": "VisitCount",
                    "总访问次数": "TotalVisitCount",
                    "最新访问时间": "LastTime",
                },
                json_data: [],
                json_meta: [
                    [
                    {
                        " key ": " charset ",
                        " value ": " utf- 8 "
                    }
                    ]
                ]

            }
        },
        created() {
            this.getData();
            this.getAllData()
        },
        computed: {
        },
        watch:{
          $route(route){
            this.getData()
            this.getAllData()
          }
        },
        methods: {
            // 跳转到访问详情
            jumpAccess(item){
              this.$router.push(`/accessList/${item.JumpId}`)
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
            async getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'OrderId': this.$route.params.id,
                'ParentName': this.parentName,
                'Mobile':this.phone
              }
            await getVisitInfo(params).then(res =>{
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
            async getAllData() {
              const params = {
                'pageindex': 1,
                'pagecount': 100000,
                'OrderId': this.$route.params.id,
                'ParentName': '',
                'Mobile':''
              }
            await getVisitInfo(params).then(res =>{
                if (res && res.Success){
                        this.json_data = res.Data.List
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
        }
    }

</script>

<style scoped>
    .export-excel-wrapper{
        float: right;
    }
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