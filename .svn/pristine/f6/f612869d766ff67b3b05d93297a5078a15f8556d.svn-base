<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">商家名称:</label>
                <el-input v-model="username" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <label for="">订单号:</label>
                <el-input v-model="ordersn" placeholder="请输入订单号" class="handle-input mr10"></el-input>
                <label for="">状态:</label>
                <el-select v-model="status" placeholder="请选择状态">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="OrderSN" align="center" label="充值订单号" >
                </el-table-column>
                <el-table-column prop="PayAccountName" align="center" label="付款商家" >
                </el-table-column>
                <el-table-column prop="PayAccountPhone" align="center" label="付款手机号" >
                </el-table-column>
                <el-table-column prop="DstAccountName" align="center" label="充值商家" >
                </el-table-column>
                <el-table-column prop="DstAccountPhone" align="center" label="充值手机号">
                </el-table-column>
                <el-table-column prop="GoodsBasicMoney" align="center" label="原价(分)">
                   <template slot-scope="scope">
                        {{scope.row.GoodsBasicMoney}}
                    </template>
                </el-table-column>
                <el-table-column prop="PayMoney" align="center" label="实付金额(分)">
                </el-table-column>
                <el-table-column prop="FreeBasicMoney" align="center" label="到账赠送金额(分)">
                </el-table-column>
                <el-table-column prop="PayType" align="center" label="支付方式">
                </el-table-column>
                <el-table-column prop="Status" align="center" label="状态">
                  <template slot-scope="scope">
                        {{getStatus(scope.row.Status)}}
                    </template>
                </el-table-column>
                <el-table-column prop="RechargeTime" align="center" label="充值时间">
                    <template slot-scope="scope">
                        {{ scope.row.RechargeTime | normalTime(scope.row.RechargeTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button v-show="scope.row.Status == '8'" type="text"  class="red" @click="openDetail(scope.row)">退款详情</el-button>
                      <el-button v-show="scope.row.Status != '1' && scope.row.Status != '2' && scope.row.Status != '8' && scope.row.Status != '81'" type="danger"  @click="openRefund(scope.row)">退款</el-button>
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
            <!--退款弹出框 -->
            <el-dialog :title="`退款信息-${aayAccountName}`" :visible.sync="addVisible" width="663px">
                <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="130px">
                    <el-form-item label="最多可退:" >
                        <span>{{addForm.goodsBasicMoney | normalMoney(addForm.goodsBasicMoney)}}元</span>
                    </el-form-item>
                    <el-form-item label="退款金额(元):" prop="refundmoney">
                        <el-input v-model="addForm.refundmoney"></el-input>
                    </el-form-item>
                    <el-form-item label="退款原因:" prop="refundReason">
                        <el-input type="textarea" v-model="addForm.refundReason"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="_refund('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog :title="`退款详情-${aayAccountName}`" :visible.sync="editVisible" width="633px">
                <el-form ref="editForm" :model="editForm"  label-width="120px">
                    <el-form-item label="退款金额:">
                        <el-input v-model="editForm.refundmoney" disabled style="width:90%"></el-input>(元)
                    </el-form-item>
                    <el-form-item label="退款原因:">
                        <el-input v-model="editForm.refundReason" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="退款完成时间:">
                        <el-input v-model="editForm.time" disabled></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="editVisible = false">取 消</el-button> -->
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getRechargeRecord, refund, getRefundDetail} from 'api/finance.js'
    export default {
        name: 'Rechargerecord',
        data() {
            var refundMaxmoney = (rule,value,callback) => {
                if(!value){
                    return callback(new Error('退款金额不能为空'))
                }else{
                    if(value > this.addForm.goodsBasicMoney){
                        callback(new Error('退款金额不能大于充值金额'))
                    }else{
                        if (!parseFloat(value)){
                            callback(new Error('请输入正确的金额'))
                        }else{
                            callback();
                        }
                        
                    }
                }
            }
            return {
                tableData: [],
                cur_page: 1,
                phone:'',
                username:'',
                ordersn:'',
                pageCount:0,
                status:0,
                statusList:[
                    {id:0,name:'全部'},
                    {id:1,name:'支付中'},
                    {id:2,name:'支付关闭'},
                    {id:3,name:'已支付'},
                    {id:4,name:'库存不足'},
                    {id:5,name:'成功充值'},
                    {id:6,name:'订单关闭导致退款'},
                    {id:7,name:'管理员产生的退款'},
                    {id:8,name:'退款成功'},
                    ],
                pagesize:30,
                aayAccountName:'商家',
                addVisible:false,
                editVisible: false,
                addForm: {
                  refundReason:'',
                  refundmoney:'',
                  goodsBasicMoney:'',
                  ordersn:''
                },
                editForm: {
                  refundReason:'',
                  refundmoney:'',
                  ime:'',
                },
                addrules: {
                    refundmoney: [
                        { validator:refundMaxmoney,required: true, trigger: 'blur' }
                    ],
                    refundReason:[
                        { required: true, message: '请输入退款原因', trigger: 'blur' },
                    ],
                },
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            // 显示退款详情
            openDetail(item){
                this.editVisible = true
                this.aayAccountName = item.PayAccountName
                const params = {
                    'ordersn': item.OrderSN,
                }
                getRefundDetail(params).then(res =>{
                    this.editForm.refundReason = res.Data.Reason
                    this.editForm.refundmoney = res.Data.RefundMoney/100
                    this.editForm.time = res.Data.FinishTime
                })
            },
            // 显示退款弹窗
            openRefund(item){
                this.addVisible = true
                this.addForm.goodsBasicMoney = item.PayMoney
                this.aayAccountName = item.PayAccountName
                this.addForm.ordersn = item.OrderSN
            },
            // 退款
            _refund(formName){
                this.$confirm('您确定要退款吗?', '退款', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                      const params = {
                        'ordersn': this.addForm.ordersn,
                        'refundmoney': parseInt(this.addForm.refundmoney*100),
                        'refundReason': this.addForm.refundReason
                      }
                      refund(params).then(res =>{
                          if(res.Success){
                          this.$message({
                              showClose: true,
                              message: '退款成功',
                              type: 'success'
                          });
                          this.getData(this.cur_page)
                          this.addVisible = false;
                          }else{
                              this.$message.error(res.Message);
                          }
                      })
                  } else {
                      return false;
                  }
              });
              }).catch(() => {
                  
              });
              
            },
            //获取状态
            getStatus(Status){
              switch (Status) {
                case 1:
                  return '支付中'
                  break;
                case 2:
                  return '支付关闭'
                  break;
                case 3:
                  return '已支付'
                  break;
                case 4:
                  return '库存不足'
                  break;
                case 5:
                  return '成功充值'
                  break;
                case 6:
                  return '订单关闭导致退款'
                  break;
                case 7:
                  return '管理员产生的退款'
                  break;
                case 8:
                  return '退款成功'
                  break;
                case 81:
                  return '退款中'
                  break;
                default:
                  break;
              }
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
                'ordersn': this.ordersn,
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'accountname': this.username,
                'accountphone': this.phone,
                'Status':this.status
              }
              getRechargeRecord(params).then(res =>{
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