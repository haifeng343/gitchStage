<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <el-checkbox v-model="checked" @change="checkChange()">显示全部结算类型(如未勾选只显示有效、下期结算类型)</el-checkbox>
        <span class="handle-box-span" v-if="starttime.length>0">结算周期：{{starttime}}至{{endtime}}</span>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="SellerName" align="center" label="商家名称"></el-table-column>
        <el-table-column prop="DelegateName" align="center" label="委托名称"></el-table-column>
        <el-table-column prop="RealPersonCount" align="center" label="任务数量"></el-table-column>
        <el-table-column prop="DistributionCount" align="center" label="分配数量"></el-table-column>
        <el-table-column prop="ExportCount" align="center" label="已完成预约数"></el-table-column>
        <el-table-column prop="TotalPrice" align="center" label="总价">
          <template slot-scope="scope">
            <span>{{scope.row.TotalPrice*1.0/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PreBasicMoney" align="center" label="提成点数">
          <template slot-scope="scope">
            <el-button type="text" @click="toBalance(scope.row)">{{scope.row.RoyaltyPoint*1.0/100}}%</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="提成金额">
          <template slot-scope="scope">
            <span>{{scope.row.RoyaltyAmount*1.0/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DelegateFinishTime" align="center" label="委托完成日期"></el-table-column>
        <el-table-column prop="SettlementType" align="center" label="结算类型">
          <template slot-scope="scope">
            <el-dropdown placement="bottom-start">
              <span class="el-dropdown-link">
                {{transformType(scope.row.SettlementType)}}
                <i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a href="javascript:;" class="handle-box-span" @click="changeType(scope.row,1)">有效</a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="javascript:;" class="handle-box-span" @click="changeType(scope.row,2)">无效</a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a
                    href="javascript:;"
                    class="handle-box-span"
                    @click="changeType(scope.row,3)"
                  >下期结算</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
      <div class="bottom-box">
        <span class="mar20">提成金额：{{TotalAmount}}</span>
        <span class="mar20">其它金额：</span>
        <el-input
          v-model="OtherAmount"
          @input="getAmount"
          class="mar20"
          style="display:inline-block;width:120px;"
        ></el-input>
        <span class="mar20">实际结算金额：{{RealAmount}}元</span>
        <el-button type="primary" @click="openSettle">结 算</el-button>
      </div>
      <el-dialog
        :title="`设置提点-${Name}`"
        :visible.sync="editVisible"
        width="663px"
        autocomplete="off"
      >
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="150px">
          <el-form-item label="提点数(%)" prop="RoyaltyPoint">
            <el-input v-model="editForm.RoyaltyPoint" placeholder="提点数"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveEdit('editForm')">确 定</el-button>
          <el-button @click="editVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提成结算确认" :visible.sync="settleVisible" width="663px" autocomplete="off">
        <el-form ref="settleForm" :model="settleForm" :rules="settlerules" label-width="150px">
          <el-form-item label="提成金额">
            <span>{{TotalAmount}}</span>
          </el-form-item>
          <el-form-item label="其他金额">
            <span>{{OtherAmount}}</span>
          </el-form-item>
          <el-form-item label="实际结算金额">
            <span class="red">{{RealAmount}}</span>
          </el-form-item>
          <el-form-item label="结算人" prop="SettlementPerson">
            <el-input v-model="settleForm.SettlementPerson" placeholder="结算人"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="Remark">
            <el-input v-model="settleForm.Remark" type="textarea" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSettle('settleForm')">确 定</el-button>
          <el-button @click="settleVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRoyaltyBalanceList,
  modifyBalancePoint,
  modifySettlementType,
  settleAmount
} from "api/entrust.js";
export default {
  name: "delegateBalance",
  data() {
    return {
      tableData: [],
      TotalAmount: "",
      OtherAmount: 0,
      RealAmount: "",
      callRecordData: [],
      checked: false,
      cur_page: 1,
      phone: "",
      username: "",
      Name: "",
      Id: "",
      time: [],
      editForm: {
        RoyaltyPoint: ""
      },
      editrules: {
        RoyaltyPoint: [
          { required: true, message: "请输入提点数", trigger: "blur" }
        ]
      },
      settleForm: {
        SettlementPerson: "",
        Remark: ""
      },
      settlerules: {
        SettlementPerson: [
          { required: true, message: "请输入结算人", trigger: "blur" }
        ],
        Remark: [{ required: true, message: "请输入结算人", trigger: "blur" }]
      },
      starttime: "",
      editVisible: false,
      settleVisible: false,
      endtime: "",
      pageCount: 0,
      pagesize: 30
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatebalance") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      this.starttime = this.$route.query.StartTime;
      this.endtime = this.$route.query.EndTime;
      this.OtherAmount = 0;
      this.getData();
    },
    checkChange() {
      this.getData();
    },
    openSettle() {
      this.settleVisible = true;
    },
    // 结算
    saveSettle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            AccountId: this.$route.params.id,
            OtherAmount: this.OtherAmount * 100,
            SettlementPerson: this.settleForm.SettlementPerson,
            Remark: this.settleForm.Remark,
            StartTime: this.$route.query.StartTime,
            EndTime: this.$route.query.EndTime
          };
          settleAmount(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "提成结算已确认",
                type: "success"
              });
              this.getData(this.cur_page);
              this.settleVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 其它金额改变
    getAmount(value) {
      if (value != "") {
        this.RealAmount =
          this.TotalAmount + (parseInt(value * 100) * 1.0) / 100;
        this.OtherAmount = (parseInt(value * 100) * 1.0) / 100;
      } else {
        this.RealAmount = this.TotalAmount;
      }
    },
    // 修改结算类型
    changeType(item, Type) {
      const params = {
        Id: item.DistributionId,
        SettlementType: Type
      };
      modifySettlementType(params).then(res => {
        if (res.Success) {
          this.$message({
            showClose: true,
            message: "结算类型修改成功",
            type: "success"
          });
          this.getData(this.cur_page);
        }
      });
    },
    // 转换类型
    transformType(type) {
      switch (type) {
        case 1:
          return "有效";
          break;
        case 2:
          return "无效";
          break;
        case 3:
          return "下期结算";
          break;
        default:
          return "未知";
          break;
      }
    },
    // 打开结算表格
    toBalance(item) {
      this.editVisible = true;
      this.Name = item.DelegateName;
      this.editForm.RoyaltyPoint = (item.RoyaltyPoint * 1.0) / 100;
      this.Id = item.DistributionId;
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Id: this.Id,
            RoyaltyPoint: this.editForm.RoyaltyPoint * 100
          };
          modifyBalancePoint(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "提点数修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    balance(item) {},
    //分页导航尺寸更改
    handleSizeChange(val) {
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
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        AccountId: this.$route.params.id,
        StartTime: this.$route.query.StartTime,
        EndTime: this.$route.query.EndTime,
        IsShowInvalid: this.checked
      };
      getRoyaltyBalanceList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
        this.TotalAmount = (res.Data.TotalAmount * 1.0) / 100;
        this.OtherAmount=0;
        this.RealAmount = (res.Data.TotalAmount * 1.0) / 100;
      });
    },
    search() {
      this.cur_page = 1;
      this.getData();
    },
    getTime() {
      if (this.time != null && this.time.length > 0) {
        this.starttime = this.time[0];
        this.endtime = this.time[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
    }
  }
};
</script>

<style scoped>
.mar20 {
  margin-right: 20px;
}
.bottom-box {
  padding: 30px 5px;
  border-top: 1px solid #f4f4f4;
}
.handle-box-span {
  color: #606266;
  font-weight: 500;
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>