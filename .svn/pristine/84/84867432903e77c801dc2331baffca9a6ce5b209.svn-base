<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="模板名称">
          <el-input v-model="formInline.temName" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="父母姓名">
          <el-input v-model="formInline.name" placeholder="请输入父母姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column align="center" label="模板名称">
          <template slot-scope="scope">
            <el-button type="text" @click="temclick(scope.row)">{{scope.row.TemplateName}}</el-button>
          </template>
        </el-table-column>
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

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
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

      <!--查看弹窗-->
      <el-dialog :title="titletop" :visible.sync="seeVisible" width="700px">
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

      <!--模板内容-->
      <el-dialog :title="titletop" :visible.sync="contentVisible" width="600px" class="text1">
        <p>模板名称：{{templateName}}</p>
        <p>模板内容：{{templateText}}</p>
        <p style="margin-left:27px">URL：{{templateUrl}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="contentVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { smsTaskSendRecord } from "api/userdata.js";
export default {
  data() {
    return {
      List: [],
      pageCount: 0,
      pagesize: 30,
      currentPage: 1,
      detailList:[],
      loading: false,
      seeVisible:false,
      tableVisible:false,
      contentVisible:false,
      formInline: {
        name: "",
        temName:''
      },
      templateUrl:'',
      templateText:'',
      templateName:'',
      titletop:'',
    };
  },
  mounted() {
    this._smsTaskSendRecord();
  },
  filters:{
    Status(params){
      switch(params){
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
  mounted() {
    this._smsTaskSendRecord(0).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
  },
  methods: {
    _smsTaskSendRecord(SourceId) {
      const params = {
        Parent : this.formInline.name,
        OrderId : 0,
        TemplateName : this.formInline.temName,
        SourceId:SourceId,
        pageindex:this.currentPage,
        pagecount:this.pagesize
      }
      return smsTaskSendRecord(params)
    },
    seeStatus(item) {
      this.seeVisible = true;
      this.Id = item.Id;
      this._smsTaskSendRecord(item.SourceId).then(res => {
        this.detailList = res.Data.List;
      });
      this.titletop = "详细数据-"+item.Id;
    },
    temclick(item) {
      this.contentVisible = true;
      this.templateUrl = item.TemplateUrl;
      this.templateText = item.TemplateText;
      this.templateName = item.TemplateName;
      this.titletop = '模板详情-'+item.Id;
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
        this.pagesize = val;
        this._smsTaskSendRecord(0).then( res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    // 分页导航
    handleCurrentChange(val) {
        this.currentPage = val;
        this._smsTaskSendRecord(0).then( res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    search() {
      this.currentPage = 1;
      this._smsTaskSendRecord(0).then( res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.text1{
  font-size: 14px;
  line-height: 24px;
}
</style>
