<template>
  <div class="content">
    <el-form
      :inline="true"
      style="margin:30px 0;line-height:40px;"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="销售姓名：">
        <el-input v-model="formInline.user" placeholder="请输入销售姓名"></el-input>
      </el-form-item>
      <el-form-item label="销售类型：">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border class="table" ref="multipleTable">
      <el-table-column prop="date" align="center" label="ID"></el-table-column>
      <el-table-column prop="name" align="center" label="变更前姓名">
        <template slot-scope="scope">
          <el-button type="text" @click="prevName(scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" align="center" label="变更后姓名">
        <template slot-scope="scope">
          <el-button type="text" @click="nextName(scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="电话"></el-table-column>
      <el-table-column prop="address" align="center" label="销售类型"></el-table-column>
      <el-table-column prop="name" align="center" label="变更原因"></el-table-column>
      <el-table-column prop="address" align="center" label="变更时间"></el-table-column>
    </el-table>

    <!--详情弹窗-->
    <el-dialog :title="titleSup+'-'" :visible.sync="disNameVisiable" width="600px">
      <ul class="disNameVisiable">
        <li><p>销售姓名：</p>张三</li>
        <li><p>手机号码：</p>张三</li>
        <li><p>性别：</p>张三</li>
        <li><p>身份证：</p>张三</li>
        <li><p>部门：</p>张三</li>
        <li><p>职位：</p>张三</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disNameVisiable = false">取 消</el-button>
      </span>
    </el-dialog>

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
      formInline: {
        user: "",
        region: ""
      },
      titleSup:'销售详情',
      disNameVisiable: false,
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
    onSubmit() {
      console.log("submit!");
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
    prevName(item) {
      this.disNameVisiable = true;
    },
    nextName(item) {
      this.disNameVisiable = true;
    },
  }
};
</script>

<style scoped>
.blue {
  color: #409eff;
}
.disNameVisiable {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.disNameVisiable li{
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: black;
    text-align: left;
}
.disNameVisiable li p{
    width: 75px;
    text-align: left;
}
</style>
