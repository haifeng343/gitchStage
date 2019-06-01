<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>-->
    </el-breadcrumb>
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
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="电销姓名"></el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="手机号"></el-table-column>
        <el-table-column align="center" label="提成金额">
          <template slot-scope="scope">{{ scope.row.RoyaltyAmount*1.0/100}}</template>
        </el-table-column>
        <el-table-column align="center" label="奖励金额">
          <template slot-scope="scope">{{ scope.row.OtherAmount*1.0/100}}</template>
        </el-table-column>
        <el-table-column align="center" label="实际结算金额">
          <template slot-scope="scope">{{ scope.row.ActuaAmount*1.0/100}}</template>
        </el-table-column>
        <el-table-column prop="SettlementPerson" align="center" label="结算人"></el-table-column>
        <el-table-column prop="Description" align="center" label="结算周期">
          <template
            slot-scope="scope"
          >{{ scope.row.SettlementStartTime}}至{{scope.row.SettlementEndTime}}</template>
        </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="结算时间"></el-table-column>
        <el-table-column prop="Remark" align="center" label="备注">
          <template slot-scope="scope">
            <el-button type="text" @click="openRemark(scope.row)">查看</el-button>
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
      <el-dialog :title="`备注-${Name}`" :visible.sync="editVisible" width="663px" autocomplete="off">
        <el-input type="textarea" :rows="6" placeholder disabled v-model="Remark"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false" type="primary" size="medium">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoyaltyLogList } from "api/entrust.js";
export default {
  name: "Delegateroyaltylog",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      phone: "",
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
        EndTime: this.endtime
      };
      getRoyaltyLogList(params).then(res => {
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