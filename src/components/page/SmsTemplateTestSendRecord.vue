<template>
  <div class="table">
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column align="center" label="模板名称">
          <template slot-scope="scope">
            <el-button type="text" @click="showTempleate(scope.row)">模板名称</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="SmsChannel" align="center" label="发送渠道"></el-table-column>
        <el-table-column prop="SignName" align="center" label="签名"></el-table-column>
        <el-table-column prop="Status" align="center" label="状态">
          <template slot-scope="scope">{{scope.row.Status | Status}}</template>
        </el-table-column>
        <el-table-column prop="SendCount" align="center" label="发送数量"></el-table-column>
        <el-table-column prop="SuccessCount" align="center" label="成功数量"></el-table-column>
        <el-table-column prop="CreateTime" align="center" label="发送时间"></el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="sendLog(scope.row)">发送记录</el-button>
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

      <!--查看模板信息-->
      <el-dialog title="短信模板" :visible.sync="showVisible" width="800px">
        <el-form :model="showForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="模板名称" prop="msgName">
            <el-input v-model="showForm.msgName"></el-input>
          </el-form-item>
          <el-form-item label="模板内容" prop="msgText">
            <el-input v-model="showForm.msgText"></el-input>
          </el-form-item>
          <el-form-item label="模板url" prop="msgUrl">
            <el-input v-model="showForm.msgUrl"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
      <!--查看记录-->
      <el-dialog title="查看发送记录" :visible.sync="seeRelod" width="1000px">
        <el-table :data="List" border class="table" ref="multipleTable">
          <el-table-column prop="Id" align="center" label="ID"></el-table-column>
          <el-table-column prop="Mobile" align="center" label="手机号"></el-table-column>
          <el-table-column prop="Name" align="center" label="姓名"></el-table-column>
          <el-table-column align="center" label="性别">
            <template slot-scope="scope">{{scope.row.Sex ==1?"男":"女"}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">{{scope.row.Status | logStatus}}</template>
          </el-table-column>
          <el-table-column prop="CreateTime" align="center" label="发送时间"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="seeRelod = false">关 闭</el-button>
        </span>
        <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount1"
        ></el-pagination>
      </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { TemplateSendorderList, TemplateSendrecordList } from "api/seller.js";
export default {
  name: "SmsTemplateTestSendRecord",
  data() {
    return {
      showVisible: false,
      seeRelod: false,
      currentPage: 1,
      pageCount: 0,
      pageSize: 30,
      tableData: [],
      ctId: "",
      showForm: {
        msgName: "",
        msgText: "",
        msgUrl: ""
      },

      List:[],
      id:'',
      currentPage1: 1,
      pageCount1: 0,
      pageSize1: 30,
    };
  },
  filters: {
    Status(params) {
      switch (params) {
        case 1:
          return "待发送";
        case 2:
          return "正在发送";
        case 4:
          return ".发送已完成";
      }
    },
    logStatus(params){
      switch (params) {
        case 0:
          return "等待发送";
        case 1:
          return "正在发送";
        case 2:
          return ".发送失败";
        case 3:
          return ".发送成功";
      }
    }
  },
  mounted() {
    this.ctId = this.$route.params.id;
    this._TemplateSendorderList();
  },
  computed: {},
  methods: {
    //获取列表
    _TemplateSendorderList() {
      const params = {
        Id: this.ctId,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      TemplateSendorderList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this._TemplateSendorderList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this._TemplateSendorderList();
    },
    showTempleate(item) {
      this.showVisible = true;
      this.showForm.msgName = item.MsgName;
      this.showForm.msgText = item.MsgText;
      this.showForm.msgUrl = item.MsgUrl;
    },
    //查看记录
    sendLog(item) {
      this.id = item.Id;
      this.seeRelod = true;
      this._TemplateSendrecordList();
    },
    _TemplateSendrecordList() {
      const params = {
        Id: this.id,
        pageindex: this.currentPage1,
        pagecount: this.pageSize1
      }
      TemplateSendrecordList(params).then( res => {
        this.List = res.Data.List;
        this.pageCount1 = res.Data.TotalCount;
        console.log(res);
      })
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this._TemplateSendrecordList();
    },
    // 分页导航
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this._TemplateSendrecordList();
    },
  }
};
</script>

<style scoped>
</style>