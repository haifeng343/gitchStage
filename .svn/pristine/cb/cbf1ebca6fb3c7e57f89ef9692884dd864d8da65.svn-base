<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" style="margin:10px 0">
      <el-form-item label="销售姓名:">
        <el-input v-model="accountName" placeholder="请输入销售姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="accountMobile" placeholder="请输入手机号"></el-input>
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
      <el-table-column prop="address" align="center" label="商家数"></el-table-column>
      <el-table-column prop="name" align="center" label="充值总金额"></el-table-column>
      <el-table-column prop="address" align="center" label="已消费总金额"></el-table-column>
      <el-table-column prop="address" align="center" label="总提成金额"></el-table-column>
      <el-table-column prop="address" align="center" label="本次可提"></el-table-column>
      <el-table-column prop="address" align="center" label="未确认金额"></el-table-column>
      <el-table-column prop="address" align="center" label="开始日期"></el-table-column>
      <el-table-column prop="address" align="center" label="截止日期"></el-table-column>
      <el-table-column align="center" width="100" label="操作">
          <template slot-scope="scope">
              <el-button type="text" @click="Settlement(scope.row)">提成结算</el-button>
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
    },
    Settlement(item){
        this.$router.push('/sell_CommissSettlment');
    }
  }
};
</script>

<style>
</style>
