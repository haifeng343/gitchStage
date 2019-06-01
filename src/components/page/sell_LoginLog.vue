<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" style="margin:10px 0">
      <el-form-item label="销售姓名:">
        <el-input v-model="accountName" placeholder="请输入销售姓名"></el-input>
      </el-form-item>
      <el-form-item label="IP:">
        <el-input v-model="accountMobile" placeholder="请输入IP"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:10px">
        从
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getTime"
        ></el-date-picker>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="search()">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border class="table" ref="multipleTable">
      <el-table-column prop="date" align="center" label="ID"></el-table-column>
      <el-table-column prop="name" align="center" label="销售名字"></el-table-column>
      <el-table-column prop="address" align="center" label="登录时间"></el-table-column>
      <el-table-column prop="name" align="center" label="登录错误码"></el-table-column>
      <el-table-column prop="address" align="center" label="登出时间"></el-table-column>
      <el-table-column prop="address" align="center" label="登出错误码"></el-table-column>
      <el-table-column prop="address" align="center" label="IP"></el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      time: "",
      accountName: "",
      accountMobile: "",
      pageCount: 0,
      pagesize: 30,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    getTime() {
      if (this.time != null && this.time.length > 0) {
        this.starttime = this.time[0];
        this.endtime = this.time[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
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
    }
  }
};
</script>

<style>
</style>
