<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="电销姓名:">
          <el-input v-model="username" placeholder="请输入电销姓名"></el-input>
        </el-form-item>
        <el-form-item label="从">
          <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border class="table" ref="multipleTable" v-loading="loading">
        <el-table-column prop="AccountId" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="电销姓名"></el-table-column>
        <el-table-column prop="DistributionCount" align="center" label="分配数量"></el-table-column>
        <el-table-column prop="AppointmentCount" align="center" label="已预约数量"></el-table-column>
        <el-table-column prop="PreBasicMoney" align="center" label="结算单数">
          <template slot-scope="scope">
            <el-button type="text" @click="toBalance(scope.row)">{{scope.row.SettleCount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="提成金额">
          <template slot-scope="scope">
            <span>{{scope.row.RoyaltyAmount*1.0/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="StartTime" align="center" label="结算周期">
          <template slot-scope="scope">
            <span v-if="scope.row.StartTime.length>0">{{scope.row.StartTime}}至{{scope.row.EndTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Time" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="CalculatePoint(scope.row)">计算提点</el-button>
            <el-button type="text" @click="balance(scope.row)">结算</el-button>
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
      <el-dialog
        :title="`结算单数-${Name}`"
        :visible.sync="editVisible"
        width="663px"
        autocomplete="off"
      >
        <el-table :data="callRecordData" border class="table">
          <el-table-column prop="Month" align="center" label="月份"></el-table-column>
          <el-table-column prop="Count" align="center" label="单数"></el-table-column>
          <el-table-column prop="RoyaltyPoint" align="center" label="提点数">
            <template slot-scope="scope">
              <span>{{scope.row.RoyaltyPoint*1.0/100}}%</span>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false" type="primary" size="medium">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoyaltyList, calculatePoint } from "api/entrust.js";
export default {
  name: "Delegateroyalty",
  data() {
    return {
      tableData: [],
      callRecordData: [],
      cur_page: 1,
      phone: "",
      username: "",
      Name: "",
      time: [],
      starttime: "",
      editVisible: false,
      loading: false,
      endtime: "",
      pageCount: 0,
      pagesize: 30
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    // 计算提点
    CalculatePoint(item) {
      this.loading = true;
      const params = {
        AccountId: item.AccountId,
        StartTime: item.StartTime,
        EndTime: item.EndTime
      };
      calculatePoint(params)
        .then(res => {
          if (res.Success) {
            this.getData();
          }
          let _this = this;
          setTimeout(() => {
            _this.loading = false;
            this.$message.success("提点计算成功");
          }, 500);
        })
        .catch(e => {
          let _this = this;
          _this.loading = false;
        });
    },
    // 打开结算表格
    toBalance(item) {
      this.editVisible = true;
      this.Name = item.AccountName;
      this.callRecordData = item.PointList;
    },
    balance(item) {
      this.$router.push({
        path: `/delegatebalance/${item.AccountId}`,
        query: {
          name: item.AccountName,
          StartTime: item.StartTime,
          EndTime: item.EndTime
        }
      });
    },
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
        AccountName: this.username,
        StartTime: this.starttime,
        EndTime: this.endtime
      };
      getRoyaltyList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
        if(res.Data.TotalCount>0){
          this.time=[res.Data.List[0].StartTime,res.Data.List[0].EndTime];
        }
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