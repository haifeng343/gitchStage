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
        <el-form-item label="Ip:">
          <el-input v-model="Ip" placeholder="请输入Ip"></el-input>
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
        <el-table-column prop="LoginTime" align="center" label="登录时间"></el-table-column>
        <el-table-column prop="LoginError" align="center" label="登录错误码"></el-table-column>
        <el-table-column prop="LoginOutTime" align="center" label="登出时间"></el-table-column>
        <el-table-column prop="LoginOutError" align="center" label="登出错误码"></el-table-column>
        <el-table-column prop="Ip" align="center" label="IP"></el-table-column>
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
        <el-input type="textarea" :rows="4" placeholder disabled v-model="Remark"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false" type="primary" size="medium">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoyaltyLoginLogList } from "api/entrust.js";
export default {
  name: "Delegateloginlog",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      Ip: "",
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
        Ip: this.Ip,
        StartTime: this.starttime,
        EndTime: this.endtime
      };
      getRoyaltyLoginLogList(params).then(res => {
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