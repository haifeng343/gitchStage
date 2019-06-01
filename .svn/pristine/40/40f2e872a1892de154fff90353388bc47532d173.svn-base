<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <label for>从</label>
        <el-date-picker
          v-model="time"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button @click="seach()" type="primary">搜索</el-button>
      </div>
      <el-table :data="tableData" fixed border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column align="center" label="变更前余额">
          <template
            slot-scope="scope"
          >{{ scope.row.PreAdvanceBalance | normalMoney(scope.row.PreAdvanceBalance)}}</template>
        </el-table-column>
        <el-table-column align="center" label="变更后余额">
          <template
            slot-scope="scope"
          >{{ scope.row.CurrentAdvanceBalance | normalMoney(scope.row.CurrentAdvanceBalance)}}</template>
        </el-table-column>
        <el-table-column align="center" label="变更金额">
          <template
            slot-scope="scope"
          >{{ scope.row.ChangeAdvanceBalance | normalMoney(scope.row.ChangeAdvanceBalance)}}</template>
        </el-table-column>
        <el-table-column prop="Reason" align="center" label="变更原因"></el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="scope">{{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}</template>
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
    </div>
  </div>
</template>

<script>
import { getCallCenterAccountBalanceChangeList } from "api/entrust.js";
export default {
  name: "DelegateMoneyChangeLog",
  data() {
    return {
      accountId: 0,
      accountName: "",
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数
      time: []
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatemoneychangelog") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.accountId = this.$route.params.id;
      this.accountName = this.$route.query.name;
      this._getCallCenterAccountBalanceChangeList();
    },
    seach() {
      this.cur_page = 1;
      this._getCallCenterAccountBalanceChangeList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getCallCenterAccountBalanceChangeList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getCallCenterAccountBalanceChangeList();
    },
    //查询电销人员余额变更日志列表
    _getCallCenterAccountBalanceChangeList() {
      const params = {
        AccountId: this.accountId,
        StartTime: this.time == null ? "" : this.time[0],
        EndTime: this.time == null ? "" : this.time[1],
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getCallCenterAccountBalanceChangeList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
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
  width: 220px;
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