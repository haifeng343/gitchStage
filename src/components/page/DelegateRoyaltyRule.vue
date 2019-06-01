<template>
  <div class="table">
    <div class="container">
      <div class="title-box">
        <h3>
          <i></i>有效期规则
        </h3>
      </div>
      <div class="content-Box">
        <label for>从</label>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button @click="save()" type="primary" size="medium">保 存</el-button>
      </div>
      <div class="container">
        <div class="title-box">
          <h3>
            <i></i>提成规则：
            <el-button type="primary" style="width:80px;float:right;" @click="openAddForm()">添加</el-button>
          </h3>
        </div>
        <div class="content-Box">
          <el-table :data="tableData" fixed border class="table" ref="multipleTable">
            <el-table-column align="center" label="月份">
              <template slot-scope="scope">{{scope.row.Month==0?"其他":(scope.row.Month+"月")}}</template>
            </el-table-column>
            <el-table-column prop="FinishCount" align="center" label="约单数">
              <template slot-scope="scope">{{scope.row.FinishCount==0?"其他":scope.row.FinishCount}}</template>
            </el-table-column>
            <el-table-column align="center" label="提点数">
              <template slot-scope="scope">{{scope.row.RoyaltyPoint/100}}%</template>
            </el-table-column>
            <el-table-column prop="UpdateTime" align="center" label="更新时间"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="openEditForm(scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="red"
                  @click="deleteData(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 添加提成规则弹出框 -->
    <el-dialog :title="`添加提成规则-${accountName}`" :visible.sync="addVisible" width="663px">
      <el-form ref="addForm" :model="addForm" :rules="addFormrules" label-width="100px;">
        <el-form-item label="月份:" prop="Month">
          <el-select v-model="addForm.Month" placeholder="请选择">
            <el-option v-for="item in monthList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="约单数:" prop="FinishCount">
          <el-radio v-model="addFormRadio" label="1">指定数量</el-radio>
          <el-input
            class="handle-input"
            v-model="addForm.FinishCount"
            placeholder="请输入约单指标数量"
            :disabled="addFormRadio==2"
          ></el-input>
          <el-radio v-model="addFormRadio" label="2">其他</el-radio>
        </el-form-item>
        <el-form-item label="提点数(%):" prop="RoyaltyPoint">
          <el-input v-model="addForm.RoyaltyPoint" placeholder="请填写提点数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFormOk()" size="medium">确 定</el-button>
        <el-button @click="addVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 编辑提成规则弹出框 -->
    <el-dialog :title="`编辑提成规则-${accountName}`" :visible.sync="editVisible" width="663px">
      <el-form ref="editForm" :model="editForm" :rules="editFormrules" label-width="100px">
        <el-form-item label="月份" prop="Month">
          <el-select v-model="editForm.Month" placeholder="请选择">
            <el-option v-for="item in monthList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="约单数" prop="FinishCount">
          <el-radio v-model="editFormRadio" label="1">指定数量</el-radio>
          <el-input
            class="handle-input"
            v-model="editForm.FinishCount"
            placeholder="请输入约单指标数量"
            :disabled="editFormRadio==2"
          ></el-input>
          <el-radio v-model="editFormRadio" label="2">其他</el-radio>
        </el-form-item>
        <el-form-item label="提点数(%)" prop="RoyaltyPoint">
          <el-input v-model="editForm.RoyaltyPoint" placeholder="请填写提点数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editFormOk()" size="medium">确 定</el-button>
        <el-button @click="editVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCallCenterAccountRoyaltyRoleList,
  addCallCenterAccountRoyaltyRole,
  modifyCallCenterAccountRoyaltyRole,
  deleteCallCenterAccountRoyaltyRole,
  modifyCallCenterAccountRoyaltyTime,
  getCallCenterAccountDetails,
  getCallCenterAccountRoyaltyRoleDetails
} from "api/entrust.js";
export default {
  name: "DelegateRoyaltyRule",
  data() {
    var NRaddFormFinishCount = (rule, value, callback) => {
      if (this.addFormRadio == "1") {
        if (this.addForm.FinishCount > 0) {
          callback();
        } else {
          callback(new Error("请输入约单指标数量"));
        }
      } else {
        callback();
      }
    };
    var NReditFormFinishCount = (rule, value, callback) => {
      if (this.editFormRadio == "1") {
        if (this.editForm.FinishCount > 0) {
          callback();
        } else {
          callback(new Error("请输入约单指标数量"));
        }
      } else {
        callback();
      }
    };
    return {
      accountId: 0,
      accountName: "",
      time: [],
      tableData: [],

      addVisible: false, //添加弹窗是否显示
      addForm: {
        Month: "",
        FinishCount: "",
        RoyaltyPoint: ""
      },
      addFormrules: {
        Month: [
          { required: true, message: "请选择正确的月份", trigger: "change" }
        ],
        FinishCount: [
          { validator: NRaddFormFinishCount, required: true, trigger: "blur" }
        ],
        RoyaltyPoint: [
          { required: true, message: "请输入提点数", trigger: "blur" }
        ]
      },
      addFormRadio: "1",

      editVisible: false, //添加弹窗是否显示
      editForm: {
        Id: 0,
        Month: "",
        FinishCount: "",
        RoyaltyPoint: ""
      },
      editFormrules: {
        Month: [
          { required: true, message: "请选择正确的月份", trigger: "change" }
        ],
        FinishCount: [
          { validator: NReditFormFinishCount, required: true, trigger: "blur" }
        ],
        RoyaltyPoint: [
          { required: true, message: "请输入提点数", trigger: "blur" }
        ]
      },
      editFormRadio: "",
      monthList: [
        { Id: 1, Name: "1月" },
        { Id: 2, Name: "2月" },
        { Id: 3, Name: "3月" },
        { Id: 4, Name: "4月" },
        { Id: 5, Name: "5月" },
        { Id: 6, Name: "6月" },
        { Id: 7, Name: "7月" },
        { Id: 8, Name: "8月" },
        { Id: 9, Name: "9月" },
        { Id: 10, Name: "10月" },
        { Id: 11, Name: "11月" },
        { Id: 12, Name: "12月" },
        { Id: 0, Name: "其他" }
      ]
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegateroyaltyrule") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.accountId = this.$route.params.id;
      this.accountName = this.$route.query.name;
      this._getCallCenterAccountDetails(this.accountId).then(res=>{
        if (
          res.Data.RoyaltyStartTime != undefined &&
          res.Data.RoyaltyEndTime != undefined
        ) {
          this.time = [res.Data.RoyaltyStartTime, res.Data.RoyaltyEndTime];
        } else {
          this.time = [];
        }
      });
      this._getCallCenterAccountRoyaltyRoleList();
    },
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    save() {
      this._modifyCallCenterAccountRoyaltyTime().then(val => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success"
        });
      });
    },
    //打开添加弹出框
    openAddForm() {
      this.resetForm("addForm");
      this.addForm.FinishiCount = "";
      this.addVisible = true;
    },
    //添加弹出框确定
    addFormOk() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this._addCallCenterAccountRoyaltyRole().then(val => {
            this.addVisible = false;
            this._getCallCenterAccountRoyaltyRoleList();
          });
        } else {
          return false;
        }
      });
    },
    //打开编辑弹窗
    openEditForm(item) {
      this._getCallCenterAccountRoyaltyRoleDetails(item.Id).then(res=>{
        this.editVisible = true;
        this.editForm.Id = res.Data.Id;
        this.editForm.Month = res.Data.Month;
        this.editForm.FinishCount = res.Data.FinishCount > 0 ? res.Data.FinishCount : "";
        this.editForm.RoyaltyPoint = (res.Data.RoyaltyPoint * 1.0) / 100;
        this.editFormRadio = res.Data.FinishCount > 0 ? "1" : "2";
      });
    },
    //编辑弹出框确定
    editFormOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this._modifyCallCenterAccountRoyaltyRole().then(val => {
            this.editVisible = false;
            this._getCallCenterAccountRoyaltyRoleList();
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },
    deleteData(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._deleteCallCenterAccountRoyaltyRole(item.Id).then(val => {
          this._getCallCenterAccountRoyaltyRoleList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    //查询电销人员提成规则列表
    _getCallCenterAccountRoyaltyRoleList() {
      const params = {
        Id: this.accountId
      };
      return getCallCenterAccountRoyaltyRoleList(params).then(res => {
        this.tableData = res.Data;
      });
    },
    //添加电销人员提成规则
    _addCallCenterAccountRoyaltyRole() {
      const params = {
        AccountId: this.accountId,
        Month: this.addForm.Month,
        FinishCount: this.addFormRadio == "1" ? this.addForm.FinishCount : 0,
        RoyaltyPoint: this.addForm.RoyaltyPoint * 100
      };
      return addCallCenterAccountRoyaltyRole(params);
    },
    //编辑电销人员提成规则
    _modifyCallCenterAccountRoyaltyRole() {
      const params = {
        Id: this.editForm.Id,
        Month: this.editForm.Month,
        FinishCount: this.editFormRadio == "1" ? this.editForm.FinishCount : 0,
        RoyaltyPoint: this.editForm.RoyaltyPoint * 100
      };
      return modifyCallCenterAccountRoyaltyRole(params);
    },
    //删除电销人员提成规则
    _deleteCallCenterAccountRoyaltyRole(Id) {
      const params = {
        Id: Id
      };
      return deleteCallCenterAccountRoyaltyRole(params);
    },
    //修改电销人员提成有效期
    _modifyCallCenterAccountRoyaltyTime() {
      const params = {
        AccountId: this.accountId,
        RoyaltyStartTime: this.time == null ? "" : this.time[0],
        RoyaltyEndTime: this.time == null ? "" : this.time[1]
      };
      return modifyCallCenterAccountRoyaltyTime(params);
    },
    //查询电销人员详情
    _getCallCenterAccountDetails(id) {
      const params = {
        Id: id
      };
      return getCallCenterAccountDetails(params);
    },
    _getCallCenterAccountRoyaltyRoleDetails(id) {
      const params = {
        Id: id
      };
      return getCallCenterAccountRoyaltyRoleDetails(params);
    }
  }
};
</script>

<style scoped lang="less">
.content-Box {
  width: auto;
  height: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  margin: 0 20px;
}
.title-box {
  padding: 0 15px;
  i {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 10px;
    background-color: #018adb;
  }
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.handle-input {
  width: 220px;
  display: inline-block;
}
</style>