<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>登录日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">用户名:</label>
                <el-input v-model="username" placeholder="请输入用户名" class="handle-input mr10"></el-input>
                <label for="">IP:</label>
                <el-input v-model="loginip" placeholder="请输入IP地址" class="handle-input mr10"></el-input>
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
                <el-table-column prop="Id" align="center" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="UserName" align="center" label="用户名" >
                </el-table-column>
                <el-table-column prop="LoginTime" align="center" label="登录时间">
                    <template slot-scope="scope">
                        {{ scope.row.LoginTime | normalTime(scope.row.LoginTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LoginErrorCode" align="center" label="登录错误码" >
                </el-table-column>
                <el-table-column prop="LogoutTime" align="center" label="登出时间">
                    <template slot-scope="scope">
                        {{ scope.row.LogoutTime | normalTime(scope.row.LogoutTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LogoutErrorCode" align="center" label="登出错误码" >
                </el-table-column>
                <el-table-column prop="LoginIp" align="center" label="IP">
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
    import {getLoginLog} from 'api/log.js'
    export default {
        name: 'Loginlog',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                loginip:'',
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
                'pagesize': this.pagesize,
                'username': this.username,
                'loginip': this.loginip,
                'starttime': this.starttime,
                'endtime': this.endtime
              }
              getLoginLog(params).then(res =>{
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
        width: 200px;
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