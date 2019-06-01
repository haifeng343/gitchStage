<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="电销姓名:">
          <el-input v-model="username" placeholder="请输入电销姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="从">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
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
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        :default-sort="{prop: 'RoyaltyAmount', order: 'descending'}"
        @sort-change="sortChange"
      >
        <el-table-column prop="Rank" align="center" label="名次"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="电销姓名"></el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="DistributionCount" align="center" label="分配数量" sortable="custom"></el-table-column>
        <el-table-column prop="ExportCount" align="center" label="已预约数量" sortable="custom"></el-table-column>
        <el-table-column prop="CallCount" align="center" label="拨打数量" sortable="custom"></el-table-column>
        <el-table-column prop="RoyaltyAmount" align="center" label="提成金额" sortable="custom">
          <template slot-scope="scope">{{ scope.row.RoyaltyAmount*1.0/100}}</template>
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
import { getRoyaltyRankList } from "api/entrust.js";
export default {
  name: "Delegateroyaltyrank",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      phone: "",
      type: 4,
      order: 2,
      typeList: [
        { id: 1, name: "分配数量" },
        { id: 2, name: "已预约数量" },
        { id: 3, name: "拨号数量" },
        { id: 4, name: "提成金额" }
      ],
      username: "",
      Name: "",
      Remark: "",
      time: [],
      starttime: "",
      editVisible: false,
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
    sortChange(column, prop, order) {
      var order = 2;
      if (column.order == "ascending") {
        order = 1;
      }
      var type = 4;
      if (column.prop == "DistributionCount") {
        type = 1;
      }
      if (column.prop == "ExportCount") {
        type = 2;
      }
      if (column.prop == "CallCount") {
        type = 3;
      }
      if (column.prop == "RoyaltyAmount") {
        type = 4;
      }
      this.Type = type;
      this.Order = order;
      this.cur_page = 1;
      this.getData();
    },
    openRemark(item) {
      this.Name = item.AccountName;
      this.Remark = item.Remark;
      this.editVisible = true;
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
        AccountMobile: this.phone,
        StartTime: this.starttime,
        EndTime: this.endtime,
        Type: this.Type,
        Order: this.Order
      };
      console.log(params);
      getRoyaltyRankList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
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