<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">商家名称:</label>
                <el-input v-model="username" placeholder="请输入商户名称" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <label for="">排序类型:</label>
                <el-select v-model="type" placeholder="请选择">
                    <el-option
                    v-for="item in TypeList"
                    :key="item.Type"
                    :label="item.TypeDes"
                    :value="item.Type">
                    </el-option>
                </el-select>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="AccountName" align="center" label="商家名称" >
                </el-table-column>
                <el-table-column prop="Phone" align="center" label="手机号">
                </el-table-column>
                <el-table-column prop="RechargeAmount" align="center" label="充值金额">
                  <template slot-scope="scope">
                        {{ scope.row.RechargeAmount | normalMoney(scope.row.RechargeAmount)}}
                    </template>
                </el-table-column>
                <el-table-column prop="RechargeCount" align="center" label="充值笔数">
                </el-table-column>
                <el-table-column prop="RemainAmount" align="center" label="余额">
                  <template slot-scope="scope">
                        {{ scope.row.RemainAmount | normalMoney(scope.row.RemainAmount)}}
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
    import {getRechargeRank} from 'api/finance.js'
    export default {
        name: 'Rechargerank',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                phone:'',
                username:'',
                type:1,
                TypeList:[
                  {
                    Type:1,
                    TypeDes:'充值金额'
                  },
                  {
                    Type:2,
                    TypeDes:'充值笔数'
                  },
                  {
                    Type:3,
                    TypeDes:'余额'
                  }
                ],
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
                'phone': this.phone,
                'type': this.type
              }
              getRechargeRank(params).then(res =>{
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