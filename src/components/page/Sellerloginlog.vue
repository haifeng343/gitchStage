<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>登录日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">商家名:</label>
                <el-input v-model="username" placeholder="请输入商家名" class="handle-input mr10"></el-input>
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
                <el-table-column prop="AccountNickName" align="center" label="商家名" >
                </el-table-column>
                <el-table-column prop="AccountPhone" align="center" label="手机号" >
                </el-table-column>
                <el-table-column prop="LoginIp" align="center" label="登录IP" >
                </el-table-column>
                <el-table-column prop="LoginTime" align="center" label="登录时间">
                    <template slot-scope="scope">
                        {{ scope.row.LoginTime | normalTime(scope.row.LoginTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LoginError" align="center" label="登录错误码" >
                </el-table-column>
                <el-table-column prop="LoginoutTime" align="center" label="登出时间">
                    <template slot-scope="scope">
                        {{ scope.row.LoginoutTime | normalTime(scope.row.LoginoutTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LoginoutError" align="center" label="登出错误码" >
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
    import {getSellerLoginLog} from 'api/seller.js'
    export default {
        name: 'Sellerloginlog',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                phone:'',
                username:'',
                idx: -1,
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
            getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'accountname': this.username,
                'accountphone': this.phone,
                'starttime': this.starttime,
                'endtime': this.endtime
              }
              getSellerLoginLog(params).then(res =>{
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
        width: 300px;
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