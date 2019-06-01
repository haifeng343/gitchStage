<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <el-button @click="addBind" type="primary" style="float:right;">添加绑定</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="AccountId" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="电销姓名"></el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="AccountSex" align="center" label="性别">
          <template slot-scope="scope">{{scope.row.AccountSex == 1?'男':'女'}}</template>
        </el-table-column>
        <el-table-column prop="EntryTime" align="center" label="入职时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleCancel(scope.row)">取消绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加绑定" :visible.sync="editVisible" width="663px" autocomplete="off">
        <div class="handle-box">
          <label for>电销姓名:</label>
          <el-input v-model="AccountName" placeholder="请输入电销姓名" class="handle-input mr10"></el-input>
          <label for>手机号:</label>
          <el-input v-model="AccountMobile" placeholder="请输入手机号" class="handle-input mr10"></el-input>
          <el-button @click="search" type="primary" style="float:right;">搜索</el-button>
        </div>
        <el-table :data="BindAccountData" border class="table" ref="multipleTable">
          <el-table-column prop="AccountName" align="left" label="电销姓名">
            <template slot-scope="scope">
              <el-radio v-model="AccountId" :label="scope.row.AccountId">{{scope.row.AccountName}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="AccountMobile" align="center" label="手机号"></el-table-column>
          <el-table-column prop="AccountSex" align="center" label="性别">
            <template slot-scope="scope">{{scope.row.AccountSex == 1?'男':'女'}}</template>
          </el-table-column>
          <el-table-column prop="EntryTime" align="center" label="入职时间"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addBindSeat" size="medium">确 定</el-button>
          <el-button @click="editVisible = false" type="primary" size="medium">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getSeatBindAccountList,
  getCallCenterAccountList,
  Bindaccount,
  CancelBindaccount
} from "api/entrust.js";
export default {
  name: "DelegateseatAccountList",
  data() {
    return {
      tableData: [],
      BindAccountData: [],
      AccountName: "",
      AccountMobile: "",
      Name: "",
      Remark: "",
      editVisible: false,
      AccountId: ""
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegateseataccountlist") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  computed: {},
  methods: {
    init(){
      this.getData();
    },
    // 取消绑定
    handleCancel(item) {
      this.$confirm("您确定要取消绑定吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            Id: item.AccountId
          };
          CancelBindaccount(params).then(res => {
            if (res.Success) {
              this.$message.success("成功取消绑定");
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    // 保存绑定
    addBindSeat() {
      const params = {
        SeatBindingId: this.$route.params.id,
        AccountId: this.AccountId
      };
      Bindaccount(params).then(res => {
        if (res.Success) {
          this.$message.success("绑定成功");
          this.editVisible = false;
          this.getData();
        }
      });
    },
    //打开绑定
    addBind() {
      this.AccountId = "";
      this.editVisible = true;
      this.getAccountData();
    },
    // 查询
    getAccountData() {
      const params = {
        AccountName: this.AccountName,
        AccountMobile: this.AccountMobile,
        Level: 0,
        SeatBinding: 1,
        pageindex: 1,
        pagecount: 100
      };
      getCallCenterAccountList(params).then(res => {
        this.BindAccountData = res.Data.List;
      });
    },
    // 选择人员
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
        Id: this.$route.params.id
      };
      getSeatBindAccountList(params).then(res => {
        this.tableData = res.Data;
      });
    },
    search() {
      this.getAccountData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
  min-height: 20px;
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