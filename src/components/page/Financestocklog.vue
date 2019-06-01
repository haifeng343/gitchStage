<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">变更者:</label>
                <el-input v-model="name" placeholder="请输入变更者" class="handle-input mr10"></el-input>
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
                <el-table-column prop="LogId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="AccountId" align="center" label="库存账号" >
                </el-table-column>
                <el-table-column prop="PreMoney" align="center" label="变更前数量(分)">
                </el-table-column>
                <el-table-column prop="CurrMoney" align="center" label="变更后数量(分)">
                </el-table-column>
                <el-table-column prop="ChangeMoney" align="center" label="变更数量(分)">
                    <template slot-scope="scope">
                        {{scope.row.ChangeMoney > 0?`+${scope.row.ChangeMoney}`:scope.row.ChangeMoney}}
                    </template>
                </el-table-column>
                <el-table-column prop="Reason" align="center" label="变更原因">
                </el-table-column>
                <el-table-column prop="OperationName" align="center" label="变更者">
                </el-table-column>
                <el-table-column prop="CreateTime" align="center" label="变更时间">
                    <template slot-scope="scope">
                        {{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}
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
    import {getStockLog} from 'api/finance.js'
    export default {
        name: 'Financestocklog',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                phone:'',
                name:'',
                time:[],
                starttime:'',
                endtime:'',
                pageCount:0,
                pagesize:30
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
            async getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'OperationName': this.name,
                'ChangeStartTime': this.starttime,
                'ChangeEndTime': this.endtime
              }
              await getStockLog(params).then(res =>{
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