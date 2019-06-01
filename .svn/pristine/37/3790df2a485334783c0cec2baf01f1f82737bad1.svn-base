<template>
  <div class="table">
    <div class="container">
      <div class="title-box">
        <p>
          <i></i>有效期规则
        </p>
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
        <el-button @click="save()" type="primary" size="medium">搜 索</el-button>
      </div>
      <div class="container">
        <div class="title-box">
          <p>
            <i></i>次数号规则：
            <el-button type="primary" style="width:80px;float:right;" @click="openAddForm()">添加次数</el-button>
          </p>
        </div>
        <div class="content-Box">
          <el-table :data="tableData" fixed border class="table" ref="multipleTable">
            <el-table-column prop="FinishCount" align="center" label="次数号">
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
    <el-dialog :title="`添加提点规则-${accountName}`" :visible.sync="addVisible" width="500px">
      <el-form ref="addForm" :model="addForm" :rules="addFormrules" label-width="100px;">
        <el-form-item prop="FinishCount">
          <el-radio v-model="addFormRadio" label="1">次数号</el-radio>
          <el-input
            class="handle-input"
            v-model="addForm.FinishCount"
            placeholder="请填写次数号"
            :disabled="addFormRadio==2"
          ></el-input>
          <el-radio v-model="addFormRadio" style="margin-left:80px" label="2">其他次数</el-radio>
        </el-form-item>
        <el-form-item label="提点数(%):" prop="RoyaltyPoint">
          <el-input v-model="addForm.RoyaltyPoint" style="width:160px" placeholder="请填写提点数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFormOk()" size="medium">确 定</el-button>
        <el-button @click="addVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 编辑提成规则弹出框 -->
    <el-dialog :title="`编辑次数号规则-${accountName}`" :visible.sync="editVisible" width="600px">
      <el-form ref="editForm" :model="editForm" :rules="editFormrules" label-width="100px;">
        <el-form-item prop="FinishCount">
          <el-radio v-model="editFormRadio" label="1">次数号</el-radio>
          <el-input
            class="handle-input"
            v-model="editForm.FinishCount"
            placeholder="请填写次数号"
            :disabled="editFormRadio==2"
          ></el-input>
          <el-radio v-model="editFormRadio" style="margin-left:60px" label="2">其他次数</el-radio>
        </el-form-item>
        <el-form-item label="提点数(%):" prop="RoyaltyPoint">
          <el-input v-model="editForm.RoyaltyPoint" style="width:160px" placeholder="请填写提点数"></el-input>
        </el-form-item>
      </el-form>
      <div class="setPoint-tip" style="margin-top:20px" v-if="isShow">
        <span>创建时间：2018-05-12 15:32:26</span>
        <span>最后更新时间：2018-05-13 14:12:35</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editFormOk()" size="medium">确 定</el-button>
        <el-button @click="editVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!--删除弹窗-->
    <el-dialog title="删除提成次数" center :visible.sync="deleteVisible" width="400px">
      <p class="text-center delete-textlog">您确定要删除该次数吗?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletesure">确 定</el-button>
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
          callback(new Error("请填写次数号"));
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
      isShow: true,
      deleteVisible:false,
      addVisible: false, //添加弹窗是否显示
      addForm: {
        Month: "",
        FinishCount: "",
        RoyaltyPoint: ""
      },
      addFormrules: {
        Month: [
          {
            required: true,
            message: "请选择正确的月份",
            trigger: "change",
            type: Number
          }
        ],
        FinishCount: [
          {
            validator: NRaddFormFinishCount,
            required: true,
            trigger: "blur",
            type: Number
          }
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
        FinishCount: [
          { validator: NReditFormFinishCount, required: true, trigger: "blur" }
        ],
        RoyaltyPoint: [
          { required: true, message: "请输入提点数", trigger: "blur" }
        ]
      },
      editFormRadio: ""
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
      this._getCallCenterAccountDetails(this.accountId).then(res => {
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
      this.init();
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
      this._getCallCenterAccountRoyaltyRoleDetails(item.Id).then(res => {
        this.editVisible = true;
        this.editForm.Id = res.Data.Id;
        this.editForm.Month = res.Data.Month;
        this.editForm.FinishCount =
          res.Data.FinishCount > 0 ? res.Data.FinishCount : "";
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
      // this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      //   this._deleteCallCenterAccountRoyaltyRole(item.Id).then(val => {
      //     this._getCallCenterAccountRoyaltyRoleList();
      //     this.$message({
      //       showClose: true,
      //       message: "删除成功",
      //       type: "success"
      //     });
      //   });
      // });
      this.deleteVisible = true;
    },
    deletesure() {
      this.deleteVisible = false;
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
.setPoint-tip {
  font-size: 12px;
  color: #ccc;
  display: flex;
  justify-content: flex-end;
}
.setPoint-tip span:last-child {
  margin-left: 20px;
}
.text-center{
  text-align: center;
}
</style>