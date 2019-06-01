<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <div class="title-box">
          <h3>
            <i></i>席位列表
          </h3>
        </div>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="SeatNumber" align="center" label="席位编号"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="电话号码"></el-table-column>
        <el-table-column prop="BindingCount" align="center" label="使用人数"></el-table-column>
        <el-table-column prop="CreateTime" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="Time" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="openAccountList(scope.row)">电销人员列表</el-button>
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
  </div>
</template>

<script>
import { getSeatList } from "api/entrust.js";
export default {
  name: "Delegateseatlist",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      Name: "",
      Remark: "",
      editVisible: false,
      pageCount: 0,
      pagesize: 30
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    openAccountList(item) {
      this.$router.push({
        path: `/delegateseataccountlist/${item.Id}`,
        query: {
          name: item.SeatNumber
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
        pagecount: this.pagesize
      };
      getSeatList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    search() {
      this.cur_page = 1;
      this.getData();
    }
  }
};
</script>

<style scoped lang="less">
.title-box {
  padding: 0 15px;
  i {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 10px;
    background-color: #018adb;
  }
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