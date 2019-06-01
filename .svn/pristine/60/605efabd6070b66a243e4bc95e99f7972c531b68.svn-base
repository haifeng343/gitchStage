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
                <!-- <label for="">状态:</label>
                <el-select v-model="status" placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select> -->
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <div class="title-box">
              <span>验证总次数{{allData.MaxCheckCount}}次</span>
              <span>已购买次数{{allData.BuyCheckCount}}次</span>
              <span>已验证{{allData.CheckedCount}}次</span>
              <span>剩余验证次数{{allData.RemainCheckCount}}次</span>
              <el-button type="text" @click="lookDetail">查看验证详情</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column  align="center" label="父母" >
                  <template slot-scope="scope">
                    {{scope.row.Father}}/{{scope.row.Mother}}
                  </template>
                </el-table-column>
                <el-table-column prop="Mobile" align="center" label="手机号">
                </el-table-column>
                <el-table-column prop="ChildName" align="center" label="小孩姓名">
                </el-table-column>
                <el-table-column prop="Status" align="center" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.Status === 2" class="sendError">{{getStatus(scope.row.Status)}}</span>
                    <el-button @click="lookNumberDetail(scope.row.List)" type="text" v-else-if="scope.row.Status === 3 && scope.row.Batch > 1">{{getStatus(scope.row.Status)}}({{scope.row.Batch}})</el-button>
                    <span type="text" v-else-if="scope.row.Status === 3 && scope.row.Batch == 1">{{getStatus(scope.row.Status)}}({{scope.row.Batch}})</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Ip" align="center" label="是否验证">
                  <template slot-scope="scope">
                    {{scope.row.IsChecked ? '是' : '否'}}
                  </template>
                </el-table-column>
                <el-table-column prop="SendTime" align="center" label="发送时间">
                </el-table-column>
                <el-table-column prop="FinishTime" align="center" label="完成时间">
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
            <el-dialog :title="`已验证详情`" :visible.sync="lookVisible" width="800px" height="500px" autocomplete="off">
                <el-table :data="virifyData" border class="table" ref="multipleTable1">
                    <el-table-column  align="center" label="父母" >
                    <template slot-scope="scope">
                        {{scope.row.Father}}/{{scope.row.Mother}}
                    </template>
                    </el-table-column>
                    <el-table-column prop="Mobile" align="center" label="手机号">
                    </el-table-column>
                    <el-table-column prop="ChildName" align="center" label="小孩姓名">
                    </el-table-column>
                    <el-table-column prop="CheckedTime" align="center" label="验证时间">
                    </el-table-column>
                </el-table>
            </el-dialog>
            <el-dialog :title="`号码链详情`" :visible.sync="numberVisible" width="800px" height="500px" autocomplete="off">
                <el-table :data="numberData" border class="table" ref="multipleTable1">
                    <el-table-column prop="Mobile" align="center" label="号码">
                    </el-table-column>
                    <el-table-column prop="ChildName" align="center" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.Status === 2" class="sendError">{{getStatus(scope.row.Status)}}</span>
                            <span v-else>{{getStatus(scope.row.Status)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="SendTime" align="center" label="创建时间">
                    </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="numberVisible = false">关 闭</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getSendInfo} from 'api/seller.js'
    export default {
        name: 'sendDetail',
        data() {
            return {
                tableData: [],
                detailList:[],
                cur_page: 1,
                status:'',
                virifyData:[],
                numberData:[],
                statusList:[
                  {id:0,name:'全部'},
                  {id:1,name:'已验证'},
                  {id:2,name:'发送失败'},
                  {id:3,name:'发送成功'},
                ],
                allData:{},
                parentName:'',
                Id:'',
                pageCount:0,
                pagesize:30,
                lookVisible:false,
                editVisible:false,
                numberVisible:false,
                departmentList:[],
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        watch:{
            $route(route){
                if(route.matched[1].path == '/sendDetail/:id'){
                    this.getData();
                }
            }
        },
        methods: {
            lookNumberDetail(list){
                this.numberData = list
                this.numberVisible = true
            },
            // 查看验证详情
            lookDetail(){
              this.lookVisible = true
              this.getDetail()
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
                'ParentName':this.parentName,
                'Stauts':''
              }
            await getSendInfo(params).then(res =>{
                if (res && res.Success){
                        this.tableData = res.Data.List
                        this.pageCount = res.Data.TotalCount
                        this.allData = res.Data
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
              })
            },
            // 获取验证详情
            async getDetail() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': 100,
                'OrderId': this.$route.params.id,
                'ParentName':this.parentName,
                'Status': 1
              }
            await getSendInfo(params).then(res =>{
                if (res && res.Success){
                        this.virifyData = res.Data.List
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
                case 0:
                  return '全部'
                  break;
                case 1:
                  return '已验证'
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
    .sendError{
        color: #ff0000;
    }
    .title-box{
      text-align: right;
    }
    .title-box span{
      margin-right: 10px;
      color: #BBBBBB;
    }
    .handle-box {
        margin-bottom: 5px;
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