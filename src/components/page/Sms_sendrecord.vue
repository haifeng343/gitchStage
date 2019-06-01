<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="模板名称">
          <el-select v-model="formInline.region" placeholder="请输入模板名称">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父母姓名">
          <el-input v-model="formInline.user" placeholder="请输入父母姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="FamilyId" align="center" label="ID"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="模板名称"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="父/母"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="手机号"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="小孩姓名"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="状态"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="发送时间"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="完成时间"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>

      <!--短信状态-->
      <el-dialog title="号码链接详情" :visible.sync="tableVisible" width="600px">
        <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
          <el-table-column prop="FamilyId" align="center" label="号码"></el-table-column>
          <el-table-column prop="FamilyId" align="center" label="状态"></el-table-column>
          <el-table-column prop="FamilyId" align="center" label="创建时间"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="tableVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

      <!--模板内容-->
      <el-dialog title="模板内容" :visible.sync="contentVisible" width="600px" class="text1">
        <p>模板名称：英孚英语</p>
        <p>模板内容：英孚英语、英孚英语、英孚英语、英孚英语、英孚英语、英孚英语、英孚英语、英孚英语、英孚英语、英孚英语</p>
        <p style="margin-left:27px">URL：https://www.baidu.com</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="contentVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

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
      pagesize: 30,
      currentPage: 1,
      loading: false,
      tableVisible:false,
      contentVisible:false,
      formInline: {
        name: "",
        region: ""
      }
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
    search() {}
  }
};
</script>

<style lang="less" scoped>
.text1{
  font-size: 14px;
  line-height: 24px;
}
</style>
