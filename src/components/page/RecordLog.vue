<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="IP">
          <el-input v-model="IP"></el-input>
        </el-form-item>
        <el-form-item label="UA">
          <el-input v-model="UA"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
        <el-button type="primary" @click="add" style="float:right">添加模板</el-button>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="FamilyId" align="center" label="ID"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="UA"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="IP"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="创建时间"></el-table-column>
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
        IP: "",
        UA: ""
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
