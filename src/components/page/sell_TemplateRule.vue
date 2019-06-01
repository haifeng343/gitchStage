<template>
  <div class="table">
    <div class="container">
      <el-table :data="tableData" fixed border ref="multipleTable" max-height="650">
        <el-table-column prop="name" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="name" align="center" label="模板名称"></el-table-column>
        <el-table-column prop="name" align="center" label="模板名称"></el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ],
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0 //总条数
    };
  },
  methods: {
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getCallCenterAccountList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getCallCenterAccountList();
    }
  }
};
</script>

<style scoped>
</style>
