 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>注册记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">商家名称:</label>
                <el-input v-model="name" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <label for="">注册时间:</label>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="getTime"
                    >
                </el-date-picker>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="AccountNickName" align="center" label="商家名称">
                </el-table-column>
                <el-table-column prop="AccountName" align="center" label="手机号">
                </el-table-column>
                <el-table-column prop="AccountPhone" align="center" label="注册时手机号">
                </el-table-column>
                <el-table-column prop="IP" align="center" label="注册ip">
                </el-table-column>
                <el-table-column prop="DeviceUA" align="center" label="注册设备">
                </el-table-column>
                <el-table-column prop="ServerId" align="center" label="注册时服务器">
                </el-table-column>
                <el-table-column prop="RegistTime" align="center" label="注册时间">
                    <template slot-scope="scope">
                        {{ scope.row.RegistTime | normalTime(scope.row.RegistTime)}}
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
        </div>
    </div>
</template>

<script>
    import {getRegistList} from 'api/seller.js'
    export default {
        name: 'SellerRegistlog',
        data() {
            return {
                time:[],
                tableData: [],
                cur_page: 1,
                name:'',
                phone:'',
                starttime:'',
                endtime:'',
                Id:'',
                pageCount:0,
                pagesize:30,
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
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
                'accountname': this.name,
                'accountphone': this.phone,
                'starttime': this.starttime,
                'endtime': this.endtime
              }
              getRegistList(params).then(res =>{
                this.tableData = res.Data.List
                this.pageCount = res.Data.TotalCount
              })
            },
            search() {
                this.cur_page = 1
                this.getData();
            },
            getTime(){
                if(this.time != null && this.time.length > 0){
                    this.starttime = this.time[0]
                    this.endtime = this.time[1]
                }else{
                    this.starttime = ''
                    this.endtime = ''
                }
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