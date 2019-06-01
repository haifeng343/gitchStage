 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">

        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">父母姓名:</label>
                <el-input v-model="name" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <label for="">从:</label>
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="getTime"
                    >
                </el-date-picker>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="FamilyId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="Father" align="center" label="父/母" >
                    <template slot-scope="scope">
                        {{scope.row.Father}}/{{scope.row.Mother}}
                    </template>
                </el-table-column>
                <el-table-column prop="ChildName" align="center" label="孩子姓名">
                </el-table-column>
                <el-table-column prop="Age" align="center" label="年龄">
                </el-table-column>
                <el-table-column prop="Area" align="center" label="地区">
                </el-table-column>
                <el-table-column prop="LastStatus" align="center" label="状态">
                  <template slot-scope="scope">
                        {{ getStatus(scope.row.LastStatus)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CallTimes" align="center" label="已拨次数">
                </el-table-column>
                <el-table-column prop="LastCallTime" align="center" label="最新拨打时间">
                    <template slot-scope="scope">
                        {{ scope.row.LastCallTime | normalTime(scope.row.LastCallTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LastCallSecond" align="center" label="最新通话时长">
                    <template slot-scope="scope">
                        {{ scope.row.LastCallSecond | formatSeconds(scope.row.LastCallSecond)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align="center" width="150">
                    <template slot-scope="scope">
                      <el-button type="text"  @click="openSmsRecord(scope.row)">短信记录</el-button>
                      <el-button type="text"  @click="openCallRecord(scope.row)">电话记录</el-button>
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
            <!-- 短信记录弹出框 -->
            <el-dialog :title="`短信记录-${FamilyId}`" :visible.sync="addVisible" width="663px" autocomplete="off">
                <el-table :data="smsRecordData" border class="table">
                    <el-table-column prop="ContentTemplateName" align="center" label="模板名称" >
                    </el-table-column>
                    <el-table-column prop="ContentTemplateDes" align="center" label="模板内容" >
                    </el-table-column>
                    <el-table-column prop="SignName" align="center" label="短信签名" >
                    </el-table-column>
                    <el-table-column prop="Status" align="center" label="状态" >
                        <template slot-scope="scope">
                            {{ getSendStatus(scope.row.Status)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="SendTime" align="center" label="发送时间" >
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 电话记录弹出框 -->
            <el-dialog :title="`电话记录-${FamilyId}`" :visible.sync="editVisible" width="663px" autocomplete="off">
                <el-table :data="callRecordData" border class="table">
                    <!-- <el-table-column prop="ContentTemplateName" align="center" label="ID" >
                    </el-table-column> -->
                    <el-table-column prop="Father" align="center" label="父母" >
                        <template slot-scope="scope">
                            {{ scope.row.Father}}/{{ scope.row.Mother}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Mobile" align="center" label="手机号码" >
                    </el-table-column>
                    <el-table-column prop="Status" align="center" label="状态" >
                        <template slot-scope="scope">
                            {{getStatus(scope.row.LastStatus)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="LastCallTime" align="center" label="拨打时间" >
                    </el-table-column>
                    <el-table-column prop="LastCallSecond" align="center" label="通话时长" >
                        <template slot-scope="scope">
                            {{scope.row.LastCallSecond |formatSeconds(scope.row.LastCallSecond)}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getSellerCallRecord,getSellerCallSmsRecord,getSellerCallRecordInfo} from 'api/seller.js'
    export default {
        name: 'SellerCallRecord',
        data() {
            return {
                callRecordData:[],
                smsRecordData:[],
                tableData: [],
                statusList:[
                  {id:0,name:'全部状态'},
                  {id:1,name:'待发送'},
                  {id:2,name:'正在发送'},
                  {id:3,name:'商家取消发送'},
                  {id:4,name:'发送已完成'},
                  {id:5,name:'订单被无效'},
                ],
                time:[],
                cur_page: 1,
                order:'',
                status:0,
                FamilyId:'',
                Id:'',
                pageCount:0,
                name:'',
                phone:'',
                starttime:'',
                endtime:'',
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
            // 打开短信记录
            openSmsRecord(item){
              this.addVisible = true
              this.FamilyId = item.FamilyId
              this._getSellerCallSmsRecord()
            },
           // 打开电话记录
            openCallRecord(item){
              this.editVisible = true
              this.FamilyId = item.FamilyId
              this._getSellerCallRecordInfo()
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
                'Starttime':this.starttime,
                'Endtime':this.endtime,
                'Parent': this.name,
                'Mobile': this.phone,
                'OrderId':this.$route.params.id
              }
              await getSellerCallRecord(params).then(res =>{
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
            // 获取短信记录列表
            async _getSellerCallSmsRecord() {
              const params = {
                'OrderId': this.$route.params.id,
                'FamilyId':this.FamilyId
              }
              await getSellerCallSmsRecord(params).then(res =>{
                if (res && res.Success){
                        this.smsRecordData = res.Data
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
              })
            },
            // 获取电话记录列表
            async _getSellerCallRecordInfo() {
              const params = {
                'OrderId': this.$route.params.id,
                'FamilyId':this.FamilyId
              }
              await getSellerCallRecordInfo(params).then(res =>{
                if (res && res.Success){
                        this.callRecordData = res.Data
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
              })
            },
            getTime(){
                if(this.time != null && this.time.length > 0){
                    this.starttime = this.time[0]
                    this.endtime = this.time[1]
                }else{
                    this.starttime = ''
                    this.endtime = ''
                }
            },
            //获取状态
            getStatus(Status){
              switch (Status) {
                case 0:
                  return '通话中'
                  break;
                case 1:
                  return '已接通'
                  break;
                case 2:
                  return '未接通'
                  break;
                default:
                  break;
              }
            },
            getSendStatus(Status){
              switch (Status) {
                case 0:
                  return '等待发送'
                  break;
                case 1:
                  return '正在发送'
                  break;
                case 2:
                  return '发送失败'
                  break;
                case 3:
                  return '发送成功'
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