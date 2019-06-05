<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="父母姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="父/母">
          <template slot-scope="scope">{{scope.row.FatherName}}/{{scope.row.MotherName}}</template>
        </el-table-column>
        <el-table-column prop="Mobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="ChildName" align="center" label="小孩姓名"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-button type="text" @click="seeStatus(scope.row)" :class="{'red':scope.row.Status==2}">{{scope.row.Status | Status}}<span v-if="scope.row.SourceBatch>1">({{scope.row.SourceBatch}})</span></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="发送时间"></el-table-column>
        <el-table-column prop="FinishTime" align="center" label="完成时间"></el-table-column>
      </el-table>

      <!--查看弹窗-->
      <el-dialog title="详细数据" :visible.sync="seeVisible" width="700px">
        <el-table v-loading="loading" :data="detailList" border class="table" ref="multipleTable">
        <el-table-column prop="Mobile" align="center" label="手机号"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span :class="{'red':scope.row.Status==2}">{{scope.row.Status | Status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="发送时间"></el-table-column>
      </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="seeVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

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
import { smsTaskSendRecord } from "api/userdata.js";
export default {
  data() {
    return {
      List: [],
      detailList:[],//详情列表
      seeVisible:false,
      pageCount: 0,
      pageSize: 30,
      currentPage: 1,
      loading: false,
      addVisible: false,
      grow: false,
      formInline: {
        name: ""
      },
      Id: "",
      ordername: "",
      orderId:'',
    };
  },
  mounted() {
    this.orderId = this.$route.params.id;
    this.ordername = this.$route.params.OrderName;
    this._smsTaskSendRecord(0).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
  },
  filters: {
    Status(params) {
      switch (params) {
        case 0:
          return "等待发送";
        case 1:
          return "正在发送";
        case 2:
          return "发送失败";
        case 3:
          return "发送成功";
      }
    }
  },
  methods: {
    _smsTaskSendRecord(SourceId) {
      const params = {
        Parent: SourceId>0?"":this.formInline.name,
        OrderId: this.orderId,
        TemplateName: "",
        SourceId: SourceId,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      return smsTaskSendRecord(params);
    },
    seeStatus(item) {
      this.seeVisible = true;
      this.Id = item.Id;
      this._smsTaskSendRecord(item.SourceId).then(res => {
        this.detailList = res.Data.List;
      });
    },

    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pageSize = val;
      this._smsTaskSendRecord(0).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this._smsTaskSendRecord(0).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    search() {
      this.currentPage = 1;
      this._smsTaskSendRecord(0).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.grow {
  background-color: #d4d4d4;
  color: #ffffff;
}
.text2 {
  font-size: 12px;
  color: #ccc;
  text-align: right;
}
.three tr {
  height: 30px;
  line-height: 30px;
}
</style>
