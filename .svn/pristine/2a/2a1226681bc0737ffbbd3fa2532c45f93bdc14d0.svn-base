<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
               <ul class="item-ul">
                 <li class="item-li flex li1 ">
                   <p class="title flex t1">
                     总充值笔数
                   </p>
                   <p class="li-p flex">{{TotalRechargeCount}}<span>笔</span></p>
                 </li>
                 <li class="item-li flex li1 ">
                   <p class="title flex t1">
                     当前账户总余额
                   </p>
                   <p class="li-p flex">
                     {{AccountRemainAmount/100}}<span>元</span>
                   </p>
                 </li>
                 <li class="item-li flex li1 ">
                   <p class="title flex t1">
                     累计充值金额
                   </p>
                   <p class="li-p flex">{{TotalRechargeAmount/100}}<span>元</span></p>
                 </li>
                 <li class="item-li flex li2">
                   <p class="title flex t2">
                     累计库存金额
                   </p>
                   <p class="li-p flex">
                     {{TotalStockAmount/100}}<span>元</span>
                   </p>
                 </li>
                 <li class="item-li flex li2">
                   <p class="title flex t2">
                     库存剩余金额
                   </p>
                   <p class="li-p flex">
                     {{RemainStockAmount/100}}<span>元</span>
                   </p>
                 </li>
                 <li class="item-li flex li3">
                   <p class="title flex t3">
                     商家总数
                   </p>
                   <p class="li-p flex">
                     {{TotalSellerCount}}<span>家</span>
                   </p>
                 </li>
                 <li class="item-li flex li3">
                   <p class="title flex t3">
                     有效商家数量
                   </p>
                   <p class="li-p flex">{{SmsSellerCount}}<span>家</span></p>
                 </li>
                 <li class="item-li flex li4">
                   <p class="title flex t4">
                     短信订单总量
                   </p>
                   <p class="li-p flex">{{TotalSmsOrderCount}}<span>单</span></p>
                 </li>
                 <li class="item-li flex li4">
                   <p class="title flex t4">
                     累计发送数量
                   </p>
                   <p class="li-p flex">{{TotalSmsSendCount}}<span>条</span></p>
                 </li>
                 <li class="item-li flex li4">
                   <p class="title flex t4">
                     短信成功数量
                   </p>
                   <p class="li-p flex">
                     {{TotalSmsSendSuccessCount}}<span>条</span>
                   </p>
                 </li>
               </ul>

            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Time" align="center" label="时间" >
                </el-table-column>
                <el-table-column prop="RechargeCount" align="center" label="充值笔数" >
                </el-table-column>
                <el-table-column prop="RechargeAmount" align="center" label="充值金额(元)">
                  <template slot-scope="scope">
                        {{scope.row.RechargeAmount/100}}
                    </template>
                </el-table-column>
                <el-table-column prop="SellerCount" align="center" label="商家总数">
                </el-table-column>
                <el-table-column prop="SmsOrderCount" align="center" label="短信订单数">
                </el-table-column>
                <el-table-column prop="SmsSendCount" align="center" label="短信发送量">
                </el-table-column>
                <el-table-column prop="SmsSendSuccessCount" align="center" label="发送成功数">
                </el-table-column>
                <el-table-column prop="SmsSendFailCount" align="center" label="发送失败数">
                </el-table-column>
                <el-table-column prop="SmsSendSuccessRate" align="center" label="成功率">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {StockOverview} from 'api/finance.js'
    export default {
        name: 'FinancialList',
        data() {
            return {
                tableData: [],
                TotalRechargeCount:0,
                TotalRechargeAmount:0,
                TotalStockAmount:0,
                RemainStockAmount:0,
                TotalSellerCount:0,
                TotalSmsOrderCount:0,
                TotalSmsSendCount:0,
                TotalSmsSendSuccessCount:0,
                AccountRemainAmount:0,
                SmsSellerCount:0
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            // 获取表格数据
            async getData() {
              const params = {
              }
              await StockOverview(params).then(res =>{
                this.TotalRechargeCount = res.Data.TotalRechargeCount
                this.TotalRechargeAmount = res.Data.TotalRechargeAmount
                this.TotalStockAmount = res.Data.TotalStockAmount
                this.RemainStockAmount = res.Data.RemainStockAmount
                this.TotalSellerCount = res.Data.TotalSellerCount
                this.TotalSmsOrderCount = res.Data.TotalSmsOrderCount
                this.TotalSmsSendCount = res.Data.TotalSmsSendCount
                this.TotalSmsSendSuccessCount = res.Data.TotalSmsSendSuccessCount
                this.AccountRemainAmount = res.Data.AccountRemainAmount
                this.SmsSellerCount = res.Data.SmsSellerCount
                this.tableData = res.Data.StatisticList
              })
            },
        }
    }

</script>

<style scoped lang="less">
    .item-li{
      float: left;
      width: 149px;
      height: 78px;
      margin-right: 5px;
      border-radius: 6px;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      .li-p{
        width: 100%;
        height: 49px;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span{
          font-size: 14px;
          margin-left:6px; 
        }
      }
    }
    .li1{
      background-color: #47c6bd;
    }
    .li2{
      background-color: #f0d057;
    }
    .li3{
      background-color: #ef8587;
    }
    .li4{
      background-color: #7999f1;
      
    }
    .title{
      width: 100%;
      height: 29px;
      font-size: 14px;
      color: #ffffff;
      border-radius: 6px 6px 0 0;
      justify-content: center;
      align-items: center;
    }
    .t1{
      background-color: #35aaa1;
    }
    .t2{
      background-color: #ebba31;
    }
    .t3{
      background-color: #db666c;
    }
    .t4{
      background-color: #3623e2;
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