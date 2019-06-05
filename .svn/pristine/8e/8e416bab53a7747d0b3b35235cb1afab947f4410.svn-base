<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="父母姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="FamilyId" align="center" label="ID"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="父/母"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="手机号"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="小孩姓名"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="访问次数"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="recordLog(scope.row)">记录详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>


    </div>
  </div>
</template>

<script>
// import { getFamilyBaseSourceList, setFamilyStatusSourceSet, addFamilySourceList, setExportTmk, } from "api/userdata.js";
export default {
  data() {
    return {
      List: [],
      pageCount: 0,
      pageSize: 30,
      currentPage: 1,
      loading: false,
      addVisible: false,
      grow: false,
      formInline: {
        name: "",
        mobile: ""
      },
     
    };
  },
  methods: {
    //分页导航尺寸更改
    handleSizeChange(val) {
      //   this.pagesize = val;
      //   this.loading = true;
      //   this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      //   this.cur_page = val;
      //   this.loading = true;
      //   this.getData();
    },
    search() {},
    recordLog(item) {
        this.$router.push({
          path:`/RecordLog/${item.FamilyId}`,
          query:{
            name : item.OrderName
          }})
    },

  }
};
</script>

<style lang="less" scoped>
.grow {
  background-color: #d4d4d4;
  color: #ffffff;
}
.text2{
  font-size: 12px;
  color: #ccc;
  text-align: right;
}
.three tr{
  height:30px;
  line-height: 30px;
}
</style>
