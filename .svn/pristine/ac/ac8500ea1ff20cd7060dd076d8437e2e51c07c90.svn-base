<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="手机号:">
          <el-input v-model="searchMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="searchStatus" placeholder="请选择状态">
            <el-option
              v-for="item in searchStatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拨打时间:">
          <el-date-picker
            v-model="searchTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
      <label
        for
        style="float:right;color: #606266;"
      >已预约：{{this.appointedCount}},预约中：{{this.appointingCount}}</label>
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="SellerName" align="center" label="商家名称"></el-table-column>
        <el-table-column align="center" label="委托名称">
          <template slot-scope="scope">
            <el-button type="text" @click="openDelegateForm(scope.row)">{{scope.row.DelegateName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="父/母姓名">
          <template slot-scope="scope">{{scope.row.FatherName}}/{{scope.row.MotherName}}</template>
        </el-table-column>
        <el-table-column prop="ChildName" align="center" label="孩子姓名"></el-table-column>
        <el-table-column prop="CallCount" align="center" label="拨打次数"></el-table-column>
        <el-table-column prop="LasCallTime" align="center" label="最新拨打时间"></el-table-column>
        <el-table-column align="center" label="拨打状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.CallStatus!=null"
              type="text"
              @click="openCallStatusForm(scope.row)"
            >{{getCallStatus(scope.row.CallStatus.Status)}}</el-button>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="预约状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.AppointmentStatus!=null"
              type="text"
              @click="openAppointmentStatusForm(scope.row)"
            >{{getAppointmentStatus(scope.row.AppointmentStatus.Status)}}</el-button>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpToDelegateRecord(scope.row)">拨打记录</el-button>
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
    <!-- 活动详情弹出框 -->
    <el-dialog
      :title="`活动内容-${delegateDetailsForm.delegateName}`"
      :visible.sync="delegateDetailsVisible"
      width="633px"
    >
      <el-form ref="delegateDetailsForm" :model="delegateDetailsForm">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="6"
            v-model="delegateDetailsForm.delegateContent"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delegateDetailsVisible = false" type="primary" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 拨打状态弹出框 -->
    <el-dialog
      :title="`拨打状态-${callStatusForm.ChildName}`"
      :visible.sync="callStatusVisible"
      width="633px"
    >
      <el-form ref="callStatusForm" :model="callStatusForm" label-width="100px">
        <el-form-item label="状态：">
          <el-input v-model="callStatusForm.Status" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态描述：">
          <el-input type="textarea" :rows="2" v-model="callStatusForm.StatusDes" disabled></el-input>
        </el-form-item>
        <el-form-item label="商家备注：">
          <el-input type="textarea" :rows="6" v-model="callStatusForm.SellerRemark" disabled></el-input>
        </el-form-item>
        <el-form-item label="我的备注：">
          <el-input type="textarea" :rows="6" v-model="callStatusForm.AccountRemark" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="callStatusVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 预约状态弹出框 -->
    <el-dialog
      :title="`预约状态-${appointmentStatusForm.ChildName}`"
      :visible.sync="appointmentStatusVisible"
      width="633px"
    >
      <el-form ref="appointmentStatusForm" :model="appointmentStatusForm" label-width="100px">
        <el-form-item label="状态：">
          <el-input v-model="appointmentStatusForm.Status" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态描述">
          <el-input type="textarea" :rows="2" v-model="appointmentStatusForm.StatusDes" disabled></el-input>
        </el-form-item>
        <el-form-item label="商家备注：">
          <el-input type="textarea" :rows="6" v-model="appointmentStatusForm.SellerRemark" disabled></el-input>
        </el-form-item>
        <el-form-item label="我的备注：">
          <el-input
            type="textarea"
            :rows="6"
            v-model="appointmentStatusForm.AccountRemark"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appointmentStatusVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getManagerCallCenterDelegateCallDetailsList } from "api/entrust.js";
export default {
  name: "DelegateCallDetails",
  data() {
    return {
      delegateId: 0,
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数
      appointedCount: 0,
      appointingCount: 0,

      searchMobile: "",
      searchStatus: 0,
      searchTime: [],
      searchStatusList: [
        { id: 0, name: "全部" },
        { id: 1, name: "潜在客户" },
        { id: 2, name: "预约中" },
        { id: 3, name: "确认到店" },
        { id: 4, name: "确认成交" },
        { id: 5, name: "无效" }
      ],

      delegateDetailsVisible: false,
      delegateDetailsForm: {
        delegateName: "",
        delegateContent: ""
      },

      callStatusVisible: false,
      callStatusForm: {
        Id: 0,
        ChildName: "",
        Status: "",
        StatusDes: "",
        SellerRemark: "",
        AccountRemark: ""
      },

      appointmentStatusVisible: false,
      appointmentStatusForm: {
        Id: 0,
        ChildName: "",
        Status: "",
        StatusDes: "",
        SellerRemark: "",
        AccountRemark: ""
      }
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatecalldetails") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.delegateId = this.$route.params.id;
      this._getManagerCallCenterDelegateCallDetailsList();
    },
    jumpToDelegateRecord(item) {
      this.$router.push({
        path: `/delegatecallrecord/${item.Id}`,
        query: {
          name: item.DelegateName + "-" + item.ChildName
        }
      });
    },
    search() {
      this.cur_page = 1;
      this._getManagerCallCenterDelegateCallDetailsList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateCallDetailsList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateCallDetailsList();
    },
    getCallStatus(status) {
      switch (status) {
        case 1:
          return "未接通";
          break;
        case 2:
          return "意外中断";
          break;
        case 3:
          return "完成通话";
          break;
        default:
          return "未知";
          break;
      }
    },
    getAppointmentStatus(status) {
      switch (status) {
        case 1:
          return "潜在客户";
          break;
        case 2:
          return "预约中";
          break;
        case 3:
          return "确认到店";
          break;
        case 4:
          return "确认成交";
          break;
        case 5:
          return "无效";
          break;
        default:
          return "未知";
          break;
      }
    },
    //打开活动详情弹窗
    openDelegateForm(item) {
      this.delegateDetailsForm.delegateName = item.DelegateName;
      this.delegateDetailsForm.delegateContent = item.DelegateContent;
      this.delegateDetailsVisible = true;
    },
    //打开拨打状态弹窗
    openCallStatusForm(item) {
      this.callStatusForm.Id = item.Id;
      this.callStatusForm.ChildName = item.ChildName;
      this.callStatusForm.Status = this.getCallStatus(item.CallStatus.Status);
      this.callStatusForm.StatusDes = item.CallStatus.StatusDes;
      this.callStatusForm.SellerRemark = item.CallStatus.SellerRemark;
      this.callStatusForm.AccountRemark = item.CallStatus.AccountRemark;
      this.callStatusVisible = true;
    },
    openAppointmentStatusForm(item) {
      this.appointmentStatusForm.Id = item.Id;
      this.appointmentStatusForm.ChildName = item.ChildName;
      this.appointmentStatusForm.Status = this.getAppointmentStatus(
        item.AppointmentStatus.Status
      );
      this.appointmentStatusForm.StatusDes = item.AppointmentStatus.StatusDes;
      this.appointmentStatusForm.SellerRemark =
        item.AppointmentStatus.SellerRemark;
      this.appointmentStatusForm.AccountRemark =
        item.AppointmentStatus.AccountRemark;
      this.appointmentStatusVisible = true;
    },
    //获取委托活动拨打详情列表
    _getManagerCallCenterDelegateCallDetailsList() {
      const params = {
        DelegateId: this.delegateId,
        Mobile: this.searchMobile,
        AppointmentStatus: this.searchStatus,
        StartTime: this.time == null ? "" : this.time[0],
        EndTime: this.time == null ? "" : this.time[1],
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getManagerCallCenterDelegateCallDetailsList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
        this.appointedCount = res.Data.AppointedCount;
        this.appointingCount = res.Data.AppointingCount;
      });
    },
    //修改用户分配到的委托预约名单备注
    _modifyAccountDelegateHangCustomerRemark(Id, Type, Remark) {
      const params = {
        Id: Id,
        Type: Type,
        Remark: Remark
      };
      return modifyAccountDelegateHangCustomerRemark(params);
    }
  }
};
</script>
