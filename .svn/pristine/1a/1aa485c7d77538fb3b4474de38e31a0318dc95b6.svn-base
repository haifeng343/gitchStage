<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="电销姓名:">
          <el-input v-model="searchAccountName" placeholder="请输入电销姓名"></el-input>
        </el-form-item>
        <el-form-item label="从">
          <el-date-picker
            v-model="searchTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
        <el-button type="primary" @click="openAddForm()" style="float:right;">添加</el-button>
      </el-form>
      <div class="handle-box">
        <label for style="float:left;">商家名称：{{sellerName}}，委托名称：{{delegateName}}</label>
        <label
          for
          style="float:right;"
        >委托数量：{{delegateCount}}人，任务数量：{{realCount}}人，已分配{{allocatedCount}}人，未分配{{realCount-allocatedCount}}人</label>
      </div>
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="AccountName" align="center" label="电销姓名"></el-table-column>
        <el-table-column align="center" label="任务时间" width="252px;">
          <template slot-scope="scope">{{scope.row.StartTime}}~{{scope.row.EndTime}}</template>
        </el-table-column>
        <el-table-column prop="DistributionCount" align="center" label="分配人数"></el-table-column>
        <el-table-column prop="WXCount" align="center" label="每日可加微信数量"></el-table-column>
        <el-table-column prop="ExportedCount" align="center" label="已预约人数"></el-table-column>
        <el-table-column prop="MaxCallCount" align="center" label="最大可拨打人数"></el-table-column>
        <el-table-column prop="CalledCount" align="center" label="已拨打人数"></el-table-column>
        <el-table-column align="center" label="分配状态" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="openStatusEditForm(scope.row)"
            >{{getStatus(scope.row.DistributionStatus)}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="分配时间"></el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row)"
            >删除</el-button>
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
      <!-- 添加弹窗 -->
      <el-dialog title="添加" :visible.sync="addVisible" width="680px" autocomplete="off">
        <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="150px">
          <el-form-item label="电销人员：" prop="AccountId">
            <el-select v-model="addForm.AccountId" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in AccountList"
                :key="item.AccountId"
                :label="item.AccountName"
                :disabled="item.AccountId == 0?true:false"
                :value="item.AccountId"
              >
                <span class="marR10">{{ item.AccountName }}</span>
                <span class="marR10">{{ item.TotalDistributionCount }}</span>
                <span class="marR10">{{ item.ExportedCount }}</span>
                <span class="marR10">{{ item.ExportRate }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务有效期：" prop="time">
            <el-date-picker
              v-model="addForm.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:345px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="分配数量：" prop="DistributionCount">
            <el-input v-model="addForm.DistributionCount" placeholder="分配数量"></el-input>
          </el-form-item>
          <el-form-item label="最多可拨打数量：" prop="MaxCallCount">
            <el-input v-model="addForm.MaxCallCount" placeholder="最多可拨打数量"></el-input>
          </el-form-item>
          <el-form-item label="每日可加微信数量：" prop="WXCount">
            <el-input v-model="addForm.WXCount" placeholder="每日可加微信数量："></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <span
            class="handle-box"
            style="float:left;margin-top:5px;"
          >可分配{{realCount-allocatedCount}}人，实际已分配{{allocatedCount}}人</span>
          <el-button size="medium" @click="saveAdd('addForm')" type="primary">确 定</el-button>
          <el-button @click="addVisible = false" size="medium">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹窗 -->
      <el-dialog
        :title="`编辑-${editForm.AccountName}`"
        :visible.sync="editVisible"
        width="680px"
        autocomplete="off"
      >
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="150px">
          <el-form-item label="电销人员：" prop="AccountId">
            <el-select v-model="AccountId" placeholder="请选择" disabled style="width:100%;">
              <el-option
                v-for="item in AccountList"
                :key="item.AccountName"
                :label="item.AccountName"
                :value="item.AccountName"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="任务有效期：" prop="time">
            <el-date-picker
              v-model="editForm.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:345px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="分配数量：" prop="DistributionCount">
            <el-input v-model="editForm.DistributionCount" placeholder="分配数量"></el-input>
          </el-form-item>
          <el-form-item label="最多可拨打数量：" prop="MaxCallCount">
            <el-input v-model="editForm.MaxCallCount" placeholder="最多可拨打数量"></el-input>
          </el-form-item>
          <el-form-item label="每日可加微信数量" prop="WXCount">
            <el-input v-model="editForm.WXCount" placeholder="每日可加微信数量"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <span
            class="handle-box"
            style="float:left;margin-top:5px;"
          >最少分配{{editForm.exportCount}}人，最多分配{{editForm.maxDistributionCount}}人</span>
          <el-button size="medium" type="primary" @click="saveEdit('editForm')">确 定</el-button>
          <el-button @click="editVisible = false" size="medium">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- 状态分配弹窗 -->
      <el-dialog
        :title="`状态-${statusEditForm.AccountName}`"
        :visible.sync="statusEditVisible"
        width="530px"
        autocomplete="off"
      >
        <span>状态：</span>
        <el-select v-model="statusEditForm.status" placeholder="请选择" style="width:387px;">
          <el-option
            v-for="item in statusEditForm.statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div style="margin-top:20px;" v-if="statusEditForm.status==2">
          <span style="float:left;">备注：</span>
          <el-input
            type="textarea"
            rows="6"
            v-model="statusEditForm.statusDes"
            placeholder="备注"
            style="width:387px;margin-left:5px;"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="saveStatusEdit()">确 定</el-button>
          <el-button @click="statusEditVisible = false" size="medium">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getManagerCallCenterDelegateDistributionList,
  modifyManagerCallCenterDelegateDistributionStatus,
  deleteManagerCallCenterDelegateDistribution,
  getDisAcountList,
  addDisAcountList,
  editDisAcountList
} from "api/entrust.js";
export default {
  name: "DelegateDistribution",
  data() {
    return {
      delegateId: 0,
      sellerName: "",
      delegateName: "",
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数
      allocatedCount: 0,
      delegateCount: 0,
      realCount: 0,
      AccountId: "",
      Id: "",
      searchAccountName: "",
      searchTime: [],
      addVisible: false,
      editVisible: false,
      AccountList: [],
      addForm: {
        AccountId: "",
        DistributionCount: "",
        MaxCallCount: "",
        time:[],
        WXCount:''
      },
      addrules: {
        AccountId: [{ required: true, message: "选择人员", trigger: "change" }],
        DistributionCount: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        MaxCallCount: [{ required: true, message: "请输入", trigger: "blur" }],
        time: [{ required: true, message: "请输入任务有效期", trigger: "blur" }],
        WXCount:[{required: true, message: "请输入", trigger: "blur"}]
      },
      editForm: {
        AccountName: "",
        DistributionCount: "",
        MaxCallCount: "",
        time:[],
        exportCount:"",
        maxDistributionCount:"",
        WXCount:""
      },
      editrules: {
        DistributionCount: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        MaxCallCount: [{ required: true, message: "请输入", trigger: "blur" }],
        time: [{ required: true, message: "请输入任务有效期", trigger: "blur" }],
        WXCount:[{ required: true, message: "请输入", trigger: "blur" }],
      },

      statusEditVisible: false,
      statusEditForm: {
        AccountName: "",
        status: "",
        statusList: [
          { id: 1, name: "委托中" },
          { id: 2, name: "无效" },
          { id: 3, name: "任务确认" }
        ],
        statusDes: ""
      }
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatedistribution") != -1) {
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
      this.sellerName = this.$route.query.SellerName;
      this.delegateName = this.$route.query.name;
      this._getManagerCallCenterDelegateDistributionList();
    },
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return "委托中";
        case 2:
          return "无效";
        case 3:
          return "任务确认";
        default:
          return "未知";
      }
    },
    //打开状态分配弹窗
    openStatusEditForm(item) {
      this.Id = item.Id;
      this.statusEditForm.AccountName = item.AccountName;
      this.statusEditForm.status = item.DistributionStatus;
      this.statusEditForm.statusDes = item.StatusDes;
      this.statusEditVisible = true;
    },
    //状态修改确定
    saveStatusEdit() {
      this._modifyManagerCallCenterDelegateDistributionStatus().then(val => {
        this.statusEditVisible = false;
        this._getManagerCallCenterDelegateDistributionList();
        this.$message({
          showClose: true,
          message: "状态修改成功",
          type: "success"
        });
      });
    },
    // 打开编辑窗口
    handleEdit(item) {
      this._getDisAcountList();
      this.editVisible = true;
      this.editForm.AccountName = item.AccountName;
      this.AccountId = item.AccountName;
      this.editForm.DistributionCount = item.DistributionCount;
      this.editForm.MaxCallCount = item.MaxCallCount;
      this.editForm.time=[item.StartTime,item.EndTime];
      this.editForm.exportCount=item.ExportedCount;
      this.editForm.WXCount=item.WXCount;
      this.editForm.maxDistributionCount=this.realCount-this.allocatedCount+item.DistributionCount;
      this.Id = item.Id;
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            DistributionCount: this.editForm.DistributionCount,
            DistributionId: this.Id,
            MaxCallCount: this.editForm.MaxCallCount,
            StartTime:this.editForm.time[0],
            EndTime:this.editForm.time[1],
            WXCount : this.editForm.WXCount
          };
          editDisAcountList(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this._getManagerCallCenterDelegateDistributionList();
              this.editVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 打开添加弹窗
    openAddForm() {
      this.resetForm('addForm');
      this.addVisible = true;
      this.addForm.AccountId = "";
      this.addForm.DistributionCount = "";
      this.addForm.MaxCallCount = "";
      this._getDisAcountList();
    },
    // 添加
    saveAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            DelegateId: this.$route.params.id,
            AccountId: this.addForm.AccountId,
            DistributionCount: this.addForm.DistributionCount,
            MaxCallCount: this.addForm.MaxCallCount,
            StartTime:this.addForm.time[0],
            EndTime:this.addForm.time[1],
            WXCount:this.addForm.WXCount
          };
          addDisAcountList(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this._getManagerCallCenterDelegateDistributionList();
              this.addVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    search() {
      this.cur_page = 1;
      this._getManagerCallCenterDelegateDistributionList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateDistributionList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateDistributionList();
    },
    deleteData(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._deleteManagerCallCenterDelegateDistribution(item.Id).then(val => {
          this._getManagerCallCenterDelegateDistributionList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    // 获取电销人员列表
    _getDisAcountList() {
      const params = {
        Id: this.$route.params.id
      };
      return getDisAcountList(params).then(res => {
        if (res.Success) {
          this.AccountList = res.Data;
          this.AccountList.unshift({
            AccountId: 0,
            AccountName: "姓名",
            TotalDistributionCount: "分配总数",
            ExportedCount: "已预约数量",
            ExportRate: "预约率"
          });
        }
      });
    },
    //获取委托活动分配列表
    _getManagerCallCenterDelegateDistributionList() {
      const params = {
        DelegateId: this.delegateId,
        AccountName: this.searchAccountName,
        StartTime: this.searchTime == null ? "" : this.searchTime[0],
        EndTime: this.searchTime == null ? "" : this.searchTime[1],
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getManagerCallCenterDelegateDistributionList(params).then(res => {
        this.tableData = res.Data.List;
        this.allocatedCount = res.Data.AllocatedCount;
        this.delegateCount = res.Data.DelegateCount;
        this.realCount = res.Data.RealCount;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //修改委托活动分配状态
    _modifyManagerCallCenterDelegateDistributionStatus() {
      const params = {
        DistributionId: this.Id,
        Status: this.statusEditForm.status,
        StatusDes: this.statusEditForm.statusDes
      };
      return modifyManagerCallCenterDelegateDistributionStatus(params);
    },
    //删除委托活动分配
    _deleteManagerCallCenterDelegateDistribution(Id) {
      const params = {
        Id: Id
      };
      return deleteManagerCallCenterDelegateDistribution(params);
    }
  }
};
</script>
<style scoped lang="less">
.marR10 {
  margin-right: 10px;
  width: 60px;
  display: inline-block;
}
.handle-box {
  margin-bottom: 10px;
  color: #606266;
  min-height: 20px;
}
.red {
  color: #ff0000;
}
.dialog-box {
  margin-bottom: 20px;
}
.dialog-box-lable {
  width: 100px;
  float: left;
  text-align: right;
  margin: auto;
}
</style>
