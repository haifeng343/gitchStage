<template>
  <div class="table">
    <div class="container">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="从下属得到提点">
            <el-input v-model="formInline.user" placeholder="0" disabled></el-input>
          </el-form-item>
          <el-form-item label="从下下属得到提点">
            <el-input v-model="formInline.region" placeholder="0" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setPoit">设置</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline mt20">
          <el-form-item label="我的主管">
            <el-input v-model="formInline.user" placeholder="0" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setPoitSup">设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="handle-box" style="float:right;">
        <el-button type="primary" @click="openAddForm()">添加下属</el-button>
        <el-button type="primary" @click="openSetDirectorForm()">变更主管</el-button>
      </div>
      <el-table :data="tableData" fixed border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="Name" align="center" label="销售姓名"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="IDCardNo" align="center" label="身份证号"></el-table-column>
        <el-table-column prop="IDCardNo" align="center" label="部门"></el-table-column>
        <el-table-column prop="IDCardNo" align="center" label="职位"></el-table-column>
        <el-table-column align="center" label="在职状态">
          <template
            slot-scope="scope"
          >{{scope.row.PositionStatus == 1?'在职':(scope.row.PositionStatus == 2? '离职':'休假')}}</template>
        </el-table-column>
        <el-table-column prop="IDCardNo" align="center" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button type="text" class="red" @click="deleteData(scope.row)">删除</el-button>
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
    <!-- 设置提点数框 -->
    <el-dialog :title="`设置提点-${accountName}`" :visible.sync="setPonintVisible" width="500px">
      <el-form
        :label-position="labelPosition"
        style="padding-left:0"
        label-width="160px"
        :model="formLabelAlign"
      >
        <el-form-item label="分享下属提点：">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="分享下下属提点：">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
      </el-form>
      <div class="setPoint-tip">
        <span>创建时间：2018-05-12 15:32:26</span>
        <span>最后更新时间：2018-05-13 14:12:35</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setPonintVisible = false">确 定</el-button>
        <el-button @click="setPonintVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 添加下属弹出框 -->
    <el-dialog :title="`添加下属-${accountName}`" :visible.sync="addFormVisible" width="663px">
      <div class="handle-box">
        <label for>姓名:</label>
        <el-input v-model="addFormAccountName" placeholder="请输入销售姓名" class="handle-input mr10"></el-input>
        <label for>手机号:</label>
        <el-input v-model="addFormAccountMobile" placeholder="请输入手机号" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="addFormSearch()">搜索</el-button>
      </div>
      <el-table :data="addFormTableData" fixed border class="table" ref="multipleTable">
        <el-table-column align="left" label="姓名">
          <template slot-scope="scope">
            <el-radio v-model="addFormRadio" :label="scope.row.AccountId">{{scope.row.AccountName}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="电话"></el-table-column>
        <el-table-column prop="EntryTime" align="center" label="入职时间"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="addFormOk()">确 定</el-button>
        <el-button @click="addFormVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 设置主管弹出框 -->
    <el-dialog :title="titleSup+`-${accountName}`" :visible.sync="setDirectorVisible" width="663px">
      <div style="margin-bottom:10px;">
        <el-radio v-model="setDirectorFormRadio" label="1">暂无主管</el-radio>
      </div>
      <div style="margin-bottom:10px;">
        <el-radio v-model="setDirectorFormRadio" label="2">变更主管</el-radio>
      </div>
      <div class="handle-box">
        <label for>销售姓名:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountName"
          placeholder="请输入销售姓名"
          class="handle-input mr10"
        ></el-input>
        <label for>手机号:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountMobile"
          placeholder="请输入手机号"
          class="handle-input mr10"
        ></el-input>
        <el-button
          :disabled="setDirectorFormRadio=='1'"
          type="primary"
          icon="search"
          @click="setDirectorFormTableSearch()"
        >搜索</el-button>
      </div>
      <el-table :data="setDirectorFormTableData" fixed border ref="multipleTable">
        <el-table-column align="left" label="姓名">
          <template slot-scope="scope">
            <el-radio
              :disabled="setDirectorFormRadio=='1'"
              v-model="setDirectorFormTableRadio"
              :label="scope.row.AccountId"
            >{{scope.row.AccountName}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="电话"></el-table-column>
        <el-table-column prop="SubordinateCount" align="center" label="下属人数"></el-table-column>
        <el-table-column prop="EntryTime" align="center" label="入职时间"></el-table-column>
      </el-table>
      <div v-show="isShow">
        <label for>变更原因：</label>
        <el-input style="width:400px;margin:20px 0" placeholder="请输入变更原因"></el-input>
      </div>
      <div style="margin-top:10px;" v-if="isShow">
        <label for>原主管:</label>
        <span>{{accountName}}</span>
      </div>
      <div class="setPoint-tip" v-if="isShow">
        <span>创建时间：2018-05-12 15:32:26</span>
        <span>最后更新时间：2018-05-13 14:12:35</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="setDirectorOk()">确 定</el-button>
        <el-button @click="setDirectorVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!--删除弹窗-->
    <el-dialog title="删除下属信息" center :visible.sync="deleteVisible" width="400px">
      <p class="text-center delete-textlog">您确定要将 {{ this.Name }} 从下属列表中删除吗?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletesure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCallCenterAccountBranchList,
  deleteCallCenterAccountBranch,
  getCallCenterAccountList,
  addCallCenterAccountBranch,
  batchModifyCallCenterAccountDirector
} from "api/entrust.js";
export default {
  name: "DelegateSubordinate",
  data() {
    return {
      accountId: 0,
      Name:'',
      accountName: "",
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数

      addFormVisible: false,
      setPonintVisible: false,
      deleteVisible:false,
      isShow: false,
      titleSup: "设置主管",
      addFormBranchId: 0,
      addFormAccountName: "",
      addFormAccountMobile: "",
      addFormRadio: "",
      addFormTableData: [],
      formInline: {
        user: "",
        region: ""
      },
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: ""
      },
      setDirectorVisible: false, //设置主管弹窗是否显示
      setDirectorFormRadio: "2",
      setDirectorFormTableRadio: "",
      setDirectorFormTableAccountMobile: "",
      setDirectorFormTableAccountName: "",
      setDirectorFormTableData: []
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatesubordinate") != -1) {
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
      this._getCallCenterAccountBranchList();
    },
    //弹出设置提点数框
    setPoit() {
      this.setPonintVisible = true;
    },
    handleClose() {
      this.setPonintVisible = false;
    },
    //设置主管
    setPoitSup() {
      this.setDirectorVisible = true;
      this.isShow = true;
      this.titleSup = "设置主管";
    },
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getCallCenterAccountBranchList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getCallCenterAccountBranchList();
    },
    //删除数据
    deleteData(item) {
      this.deleteVisible = true;
      // this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      //   this._deleteCallCenterAccountBranch(item.Id).then(val => {
      //     this._getCallCenterAccountBranchList();
      //     this.$message({
      //       showClose: true,
      //       message: "删除成功",
      //       type: "success"
      //     });
      //   });
      // });
    },
    deletesure(item) {
      this.deleteVisible = false;
    },
    //打开添加下属弹出框
    openAddForm() {
      this.addFormVisible = true;
      this.addFormRadio = "";
      this.addFormAccountName = "";
      this.addFormAccountMobile = "";
      this._getCallCenterAccountList();
    },
    //添加下属弹窗搜索
    addFormSearch() {
      this._getCallCenterAccountList();
    },
    //添加下属确认
    addFormOk() {
      if (this.addFormRadio == "") {
        this.$message.error("请选择一个下属人员");
        return;
      }
      this._addCallCenterAccountBranch().then(val => {
        this.addFormVisible = false;
        this._getCallCenterAccountBranchList();
      });
    },
    //打开批量变更主管弹窗
    openSetDirectorForm() {
      this.setDirectorFormRadio = "2";
      this.setDirectorFormTableRadio = "";
      this.setDirectorVisible = true;
      this.isShow = false;
      this.titleSup = "变更主管";
      this._getCallCenterAccountDirectorList();
    },
    //设置主管弹窗主管查询
    setDirectorFormTableSearch() {
      this._getCallCenterAccountDirectorList();
    },
    //设置主管确定
    setDirectorOk() {
      if (this.setDirectorFormRadio == "2") {
        if (this.setDirectorFormTableRadio == "") {
          this.$message.error("请选择一个主管");
          return;
        }
      } else {
        this.setDirectorFormTableRadio = 0;
      }
      this._batchModifyCallCenterAccountDirector().then(val => {
        this.setDirectorVisible = false;
        this._getCallCenterAccountBranchList();
        this.$message({
          showClose: true,
          message: "变更主管成功",
          type: "success"
        });
      });
    },
    //查询销售人员下属列表
    _getCallCenterAccountBranchList() {
      const params = {
        Id: this.accountId,
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getCallCenterAccountBranchList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
        this.Name = res.Data.List[0].Name;
      });
    },
    //删除销售人员下属
    _deleteCallCenterAccountBranch(Id) {
      const params = {
        Id: Id
      };
      return deleteCallCenterAccountBranch(params);
    },
    //查询销售人员列表
    _getCallCenterAccountList() {
      const params = {
        AccountName: this.addFormAccountName,
        AccountMobile: this.addFormAccountMobile,
        Level: 1,
        SeatBinding: 0,
        pageindex: 1,
        pagecount: 100
      };
      return getCallCenterAccountList(params).then(res => {
        this.addFormTableData = res.Data.List;
      });
    },
    //添加销售人员下属
    _addCallCenterAccountBranch() {
      const params = {
        AccountId: this.accountId,
        BranchId: this.addFormRadio
      };
      return addCallCenterAccountBranch(params);
    },
    //查询销售人员主管列表
    _getCallCenterAccountDirectorList() {
      const params = {
        AccountName: this.setDirectorFormTableAccountName,
        AccountMobile: this.setDirectorFormTableAccountMobile,
        Level: 2,
        SeatBinding: 0,
        pageindex: 1,
        pagecount: 100
      };
      return getCallCenterAccountList(params).then(res => {
        this.setDirectorFormTableData = res.Data.List.filter(val => {
          return val.AccountId != this.accountId;
        });
      });
    },
    //批量变更销售人员主管
    _batchModifyCallCenterAccountDirector() {
      const params = {
        DirectorId: this.accountId,
        NewDirectorId: this.setDirectorFormTableRadio
      };
      return batchModifyCallCenterAccountDirector(params);
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

.handle-box {
  margin-bottom: 20px;
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
.mt20 {
  margin-top: 20px;
}
.text-center{
  text-align: center;
}
.delete-textlog{
  margin: 20px 0;
}
</style>