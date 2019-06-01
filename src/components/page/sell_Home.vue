<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="销售姓名:">
          <el-input v-model="accountName" placeholder="请输入销售姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="accountMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      <el-button
        type="primary"
        style="float:right;float:right;margin-bottom:10px;"
        @click="showAddForm"
      >创建销售</el-button>
      </el-form>

      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="AccountId" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="AccountName" align="center" label="电销姓名"></el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="手机号"></el-table-column>
        <el-table-column align="center" width="100" label="性别">
          <template slot-scope="scope">{{scope.row.AccountSex == 1?'男':'女'}}</template>
        </el-table-column>
        <el-table-column prop="IDCardNo" align="center" label="身份证号"></el-table-column>
        <el-table-column align="center" label="职位">
          <template slot-scope="scope">{{scope.row.Level == 1?'电销人员':'主管'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="IDCardNo" label="部门"></el-table-column>
        <el-table-column align="center" label="在职状态">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="OpenPositionForm(scope.row)"
            >{{scope.row.PositionStatus == 1?'在职':(scope.row.PositionStatus == 2? '离职':'休假')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="账户状态" width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-text="有效"
              inactive-text="无效"
              :active-value="1"
              :inactive-value="2"
              @change="_modifyCallCenterAccountStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="openEditForm(scope.row)">编辑</el-button>
            <el-button type="text" @click="jumpToRoyaltyRule(scope.row)">提成规则</el-button>
            <el-button
              v-if="scope.row.Level===1"
              type="text"
              @click="openSetDirectorForm(scope.row)"
            >设置主管</el-button>
            <el-button v-else type="text" @click="jumpToSubordinate(scope.row)">上下属设置</el-button>
            <el-button type="text" @click="openChangePasswordForm(scope.row)">修改密码</el-button>
            <el-button type="text" @click="openRemarkForm(scope.row)">备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增弹出框 -->
    <el-dialog title="创建销售" :visible.sync="addVisible" width="663px">
      <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
        <el-form-item label="销售姓名:" prop="AccountName">
          <el-input v-model="addForm.AccountName" placeholder="请输入销售人员姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="AccountMobile">
          <el-input v-model="addForm.AccountMobile" placeholder="请输入销售人员手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="AccountSex">
          <el-select v-model="addForm.AccountSex" placeholder="请选择">
            <el-option v-for="item in SexList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="IDCardNo">
          <el-input v-model="addForm.IDCardNo" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input
            type="password"
            v-model="addForm.Password"
            placeholder="请输入初始化登录密码"
            auto-complete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="RePassword">
          <el-input
            type="password"
            v-model="addForm.RePassword"
            placeholder="请再次输入密码"
            auto-complete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="Level">
          <el-select v-model="addForm.Level" placeholder="请选择部门">
            <el-option v-for="item in SexList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-select v-model="addForm.position" placeholder="请选择职位">
            <el-option v-for="item in SexList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAccountOk()" size="medium">确 定</el-button>
        <el-button @click="addVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 设置余额 -->
    <el-dialog
      :title="`设置余额-${balanceForm.AccountName}`"
      :visible.sync="balanceVisible"
      width="663px"
    >
      <el-form ref="balanceForm" :model="balanceForm" :rules="balancerules" label-width="100px">
        <el-form-item label="当前余额:">
          <span>{{balanceForm.AdvanceBalance | normalMoney(balanceForm.AdvanceBalance)}}(元)</span>
        </el-form-item>
        <el-form-item label="变更金额(元):" prop="Amount">
          <el-input v-model.number="balanceForm.Amount" placeholder="请输入变更金额"></el-input>
        </el-form-item>
        <el-form-item label="变更原因:" prop="Remark">
          <el-input type="textarea" v-model="balanceForm.Remark" placeholder="请输入变更原因"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setBalanceOk()" size="medium">确 定</el-button>
        <el-button @click="balanceVisible = false" size="medium">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改在职状态 -->
    <el-dialog
      :title="`在职状态-${positionForm.AccountName}`"
      :visible.sync="positionVisible"
      width="663px"
    >
      <el-form ref="positionForm" :model="positionForm" label-width="100px">
        <el-form-item label="在职状态:">
          <el-select v-model="positionForm.PositionStatus" placeholder="请选择">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setPositionStatusOk()" size="medium">确 定</el-button>
        <el-button @click="positionVisible = false" size="medium">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog :title="`编辑销售-${editForm.AccountName}`" :visible.sync="editVisible" width="663px">
      <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
        <el-form-item label="销售姓名:" prop="AccountName">
          <el-input v-model="editForm.AccountName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="AccountMobile">
          <el-input v-model.number="editForm.AccountMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="AccountSex">
          <el-select v-model="editForm.AccountSex" placeholder="请选择">
            <el-option v-for="item in SexList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号:" prop="IDCardNo">
          <el-input v-model="editForm.IDCardNo" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="部门:" prop="Level">
          <el-select v-model="editForm.Level" placeholder="请选择">
            <el-option v-for="item in SexList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" prop="Level">
          <el-select v-model="editForm.Level" placeholder="请选择">
            <el-option v-for="item in SexList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editAccountOk()" size="medium">确 定</el-button>
        <el-button @click="editVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码弹出框 -->
    <el-dialog
      :title="`修改密码-${changePasswordForm.AccountName}`"
      :visible.sync="changePasswordVisible"
      width="663px"
    >
      <el-form
        ref="changePasswordForm"
        :model="changePasswordForm"
        :rules="changePasswordrules"
        label-width="100px"
      >
        <el-form-item label="新密码:" prop="Password">
          <el-input
            type="password"
            v-model="changePasswordForm.Password"
            placeholder="请输入新密码"
            auto-complete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="RePassword">
          <el-input
            type="password"
            v-model="changePasswordForm.RePassword"
            placeholder="请确认密码"
            auto-complete="new-password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="changePasswordOk()">确 定</el-button>
        <el-button @click="changePasswordVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 备注弹出框 -->
    <el-dialog :title="`备注-${remarkForm.AccountName}`" :visible.sync="remarkVisible" width="600px">
      <el-form ref="remarkForm" :model="remarkForm">
        <el-form-item>
          <el-input type="textarea" placeholder="点击此处添加备注" v-model="remarkForm.Remark" rows="8"></el-input>
        </el-form-item>
      </el-form>
      <div class="setPoint-tip mt20" v-if="isShow">
        <span>创建时间：2018-05-12 15:32:26</span>
        <span>最后更新时间：2018-05-13 14:12:35</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="ModifyRemarkOk()">确 定</el-button>
        <el-button @click="remarkVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 设置主管弹出框 -->
    <el-dialog
      :title="`设置主管-${setDirectorForm.AccountName}`"
      :visible.sync="setDirectorVisible"
      width="663px"
    >
      <el-radio v-model="setDirectorFormRadio" label="1" style="margin-bottom: 20px;">暂无主管</el-radio>
      <div>
        <el-radio v-model="setDirectorFormRadio" label="2" style="margin-bottom: 20px;">变更主管</el-radio>
      </div>
      <div style="margin-bottom: 20px;">
        <label for>电销姓名:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountName"
          placeholder="请输入电销姓名"
          style="width: 180px;margin-right: 20px;"
        ></el-input>
        <label for>手机号:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountMobile"
          placeholder="请输入手机号"
          style="width: 180px;margin-right: 10px;"
        ></el-input>
        <el-button
          :disabled="setDirectorFormRadio=='1'"
          type="primary"
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
      <div style="margin-top: 20px;">
        <label for>原主管:</label>
        <span>{{setDirectorForm.SuperiorAccountName}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="setDirectorOk()">确 定</el-button>
        <el-button @click="setDirectorVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCallCenterAccountList,
  addCallCenterAccount,
  modifyCallCenterAccountBalance,
  modifyCallCenterAccountStatus,
  modifyCallCenterAccountPositionStatus,
  modifyCallCenterAccount,
  modifyCallCenterAccountPassword,
  modifyCallCenterAccountRemark,
  modifyCallCenterAccountDirector,
  getCallCenterAccountDetails
} from "api/entrust.js";
export default {
  name: "Delegateaccount",
  data() {
    var NRaddmobile = (rule, value, callback) => {
      if ((value + "").length != 11) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var NRaddrepassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addForm.Password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var NRchangepasswordrepassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePasswordForm.Password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var NRsetBalanceAmount = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error("变更金额不能为0!"));
      } else {
        callback();
      }
    };

    return {
      isShow: true,
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数
      accountName: "", //电销人员姓名搜索条件
      accountMobile: "", //电销人员电话搜索条件
      SexList: [{ Id: 1, Name: "男" }, { Id: 2, Name: "女" }],

      addVisible: false, //新增框是否显示
      addForm: {
        //创建电销人员信息
        AccountName: "",
        AccountMobile: "",
        AccountSex: "",
        IDCardNo: "",
        Password: "",
        RePassword: "",
        Level: ""
      },
      addrules: {
        AccountName: [
          { required: true, message: "请输入电销人员姓名", trigger: "blur" }
        ],
        AccountMobile: [
          { validator: NRaddmobile, required: true, trigger: "blur" }
        ],
        AccountSex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        IDCardNo: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "长度在18个字符", trigger: "blur" }
        ],
        Password: [
          { required: true, message: "请输入登录初始密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6-20个字符", trigger: "blur" }
        ],
        RePassword: [
          { validator: NRaddrepassword, required: true, trigger: "blur" },
          { min: 6, max: 20, message: "长度在6-20个字符", trigger: "blur" }
        ],
        Level: [{ required: true, message: "请选择部门", trigger: "change" }],
        position: [{ required: true, message: "请选择职位", trigger: "change" }]
      },

      balanceVisible: false, //设置余额弹窗是否显示
      balanceForm: {
        //设置余额弹窗信息
        AccountId: 0,
        AccountName: "",
        AdvanceBalance: "",
        Amount: "",
        Remark: ""
      },
      balancerules: {
        Amount: [
          {
            validator: NRsetBalanceAmount,
            required: true,
            type: "number",
            message: "请输入金额",
            trigger: "blur"
          }
        ]
      },

      positionVisible: false, //在职状态弹窗是否显示
      positionForm: {
        //在职状态弹窗信息
        AccountId: 0,
        AccountName: "",
        PositionStatus: 0
      },
      positionOptions: [
        {
          value: 1,
          label: "在职"
        },
        {
          value: 2,
          label: "离职"
        },
        {
          value: 3,
          label: "休假中"
        }
      ],

      editVisible: false, //编辑弹窗是否显示
      editForm: {
        AccountId: 0,
        AccountName: "",
        AccountMobile: "",
        AccountSex: "",
        IDCardNo: "",
        Level: "",
        position: ""
      },
      editrules: {
        AccountName: [
          { required: true, message: "请输入销售人员姓名", trigger: "blur" }
        ],
        AccountMobile: [
          { validator: NRaddmobile, required: true, trigger: "blur" }
        ],
        AccountSex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        IDCardNo: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        Level: [{ required: true, message: "请选择部门", trigger: "change" }],
        position: [{ required: true, message: "请选择职位", trigger: "change" }]
      },

      changePasswordVisible: false, //修改密码弹窗是否显示
      changePasswordForm: {
        AccountId: 0,
        AccountName: "",
        Password: "",
        RePassword: ""
      },
      changePasswordrules: {
        Password: [
          { required: true, message: "请输入登录初始密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6-20个字符", trigger: "blur" }
        ],
        RePassword: [
          {
            validator: NRchangepasswordrepassword,
            required: true,
            trigger: "blur"
          },
          { min: 6, max: 20, message: "长度在6-20个字符", trigger: "blur" }
        ]
      },

      remarkVisible: false, //备注弹窗是否显示
      remarkForm: {
        AccountId: 0,
        AccountName: "",
        Remark: ""
      },

      setDirectorVisible: false, //设置主管弹窗是否显示
      setDirectorForm: {
        AccountId: 0,
        AccountName: "",
        SuperiorAccountName: "",
        SuperiorAccountId: 0
      },
      setDirectorFormRadio: "2",
      setDirectorFormTableRadio: "",
      setDirectorFormTableAccountMobile: "",
      setDirectorFormTableAccountName: "",
      setDirectorFormTableData: []
    };
  },
  created() {
    this._getCallCenterAccountList();
  },
  methods: {
    //跳转到提成规则页面
    jumpToRoyaltyRule(item) {
      this.$router.push({
        path: `/sell_CommissRule/${item.AccountId}`,
        query: {
          name: item.AccountName,
          RoyaltyStartTime: item.RoyaltyStartTime,
          RoyaltyEndTime: item.RoyaltyEndTime
        }
      });
    },
    //跳转到下属列表页面
    jumpToSubordinate(item) {
      this.$router.push({
        path: `/sell_Subordinate/${item.AccountId}`,
        query: {
          name: item.AccountName
        }
      });
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getCallCenterAccountList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getCallCenterAccountList();
    },
    search() {
      this.cur_page = 1;
      this._getCallCenterAccountList();
    },
    //创建电销人员
    showAddForm() {
      this.resetForm("addForm");
      this.addVisible = true;
    },
    //确认添加电销人员
    addAccountOk() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this._addCallCenterAccount().then(val => {
            this.addVisible = false;
            this._getCallCenterAccountList();
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
    // 打开设置余额窗口
    setBalance(item) {
      this._getCallCenterAccountDetails(item.AccountId).then(res => {
        this.balanceVisible = true;
        this.balanceForm.AccountName = item.AccountName;
        this.balanceForm.AdvanceBalance = res.Data.AdvanceBalance;
        this.balanceForm.AccountId = item.AccountId;
        this.resetForm("balanceForm");
      });
    },
    //设置用户余额确认
    setBalanceOk() {
      this.$refs["balanceForm"].validate(valid => {
        if (valid) {
          this._modifyCallCenterAccountBalance().then(val => {
            this.balanceVisible = false;
            this._getCallCenterAccountList();

            this.$message({
              showClose: true,
              message: "用户余额设置成功",
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },
    //打开在职状态弹窗
    OpenPositionForm(item) {
      this.positionVisible = true;
      this.positionForm.AccountId = item.AccountId;
      this.positionForm.AccountName = item.AccountName;
      this.positionForm.PositionStatus = item.PositionStatus;
    },
    //修改在职状态确认
    setPositionStatusOk() {
      this._modifyCallCenterAccountPositionStatus().then(val => {
        this.positionVisible = false;
        this._getCallCenterAccountList();
        this.$message({
          showClose: true,
          message: "在职状态修改成功",
          type: "success"
        });
      });
    },
    //打开编辑弹出框
    openEditForm(item) {
      this._getCallCenterAccountDetails(item.AccountId).then(res => {
        this.editForm = res.Data;
        this.editForm.Level = item.Level + "";
        this.editVisible = true;
      });
    },
    //编辑确认
    editAccountOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this._modifyCallCenterAccount().then(val => {
            this.editVisible = false;
            this._getCallCenterAccountList();
            this.$message({
              showClose: true,
              message: "编辑成功",
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },
    //打开修改密码弹窗
    openChangePasswordForm(item) {
      this.changePasswordVisible = true;
      this.changePasswordForm.AccountId = item.AccountId;
      this.changePasswordForm.AccountName = item.AccountName;
      this.resetForm("changePasswordForm");
    },
    //修改密码确认
    changePasswordOk() {
      this.$refs["changePasswordForm"].validate(valid => {
        if (valid) {
          this._modifyCallCenterAccountPassword().then(val => {
            this.changePasswordVisible = false;
            this.$message({
              showClose: true,
              message: "密码修改成功",
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },
    //打开备注弹窗
    openRemarkForm(item) {
      this.remarkVisible = true;
      this.remarkForm.AccountId = item.AccountId;
      this.remarkForm.AccountName = item.AccountName;
      this.remarkForm.Remark = item.Remark;
    },
    //修改备注确认
    ModifyRemarkOk() {
      this._modifyCallCenterAccountRemark().then(val => {
        this.remarkVisible = false;
        this._getCallCenterAccountList();
        this.$message({
          showClose: true,
          message: "备注修改成功",
          type: "success"
        });
      });
    },
    //打开设置主管弹窗
    openSetDirectorForm(item) {
      this._getCallCenterAccountDetails(item.AccountId).then(res => {
        this.setDirectorFormRadio = "2";
        this.setDirectorFormTableRadio = "";
        this.setDirectorVisible = true;
        this.setDirectorForm.AccountId = item.AccountId;
        this.setDirectorForm.AccountName = item.AccountName;
        this.setDirectorForm.SuperiorAccountName = res.Data.SuperiorAccountName;
        this.setDirectorForm.SuperiorAccountId = res.Data.SuperiorAccountId;
        this._getCallCenterAccountDirectorList();
      });
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
      this._modifyCallCenterAccountDirector().then(val => {
        this.setDirectorVisible = false;
        this._getCallCenterAccountList();
        this.$message({
          showClose: true,
          message: "变更主管成功",
          type: "success"
        });
      });
    },
    //查询电销人员列表
    _getCallCenterAccountList() {
      const params = {
        AccountName: this.accountName,
        AccountMobile: this.accountMobile,
        Level: 0,
        SeatBinding: 0,
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getCallCenterAccountList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //查询电销人员主管列表
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
          return val.AccountId != this.setDirectorForm.SuperiorAccountId;
        });
      });
    },
    //创建电销人员
    _addCallCenterAccount() {
      const params = {
        AccountName: this.addForm.AccountName,
        AccountMobile: this.addForm.AccountMobile,
        AccountSex: this.addForm.AccountSex,
        IDCardNo: this.addForm.IDCardNo,
        Password: this.$md5(this.addForm.Password),
        Level: this.addForm.Level
      };
      return addCallCenterAccount(params);
    },
    // 设置电销人员余额
    _modifyCallCenterAccountBalance() {
      const params = {
        AccountId: this.balanceForm.AccountId,
        Amount: this.balanceForm.Amount * 100,
        Remark: this.balanceForm.Remark
      };
      return modifyCallCenterAccountBalance(params);
    },
    // 修改电销人员账户状态
    _modifyCallCenterAccountStatus(item) {
      const params = {
        AccountId: item.AccountId,
        Status: item.Status
      };
      return modifyCallCenterAccountStatus(params).catch(ex => {
        this._getCallCenterAccountList();
      });
    },
    //修改电销人员在职状态
    _modifyCallCenterAccountPositionStatus() {
      const params = {
        AccountId: this.positionForm.AccountId,
        PositionStatus: this.positionForm.PositionStatus
      };
      return modifyCallCenterAccountPositionStatus(params);
    },
    //编辑电销人员
    _modifyCallCenterAccount() {
      const params = {
        AccountId: this.editForm.AccountId,
        AccountName: this.editForm.AccountName,
        AccountMobile: this.editForm.AccountMobile,
        AccountSex: this.editForm.AccountSex,
        IDCardNo: this.editForm.IDCardNo,
        Level: this.editForm.Level
      };
      return modifyCallCenterAccount(params);
    },
    //修改电销人员密码
    _modifyCallCenterAccountPassword() {
      const params = {
        AccountId: this.changePasswordForm.AccountId,
        Password: this.$md5(this.changePasswordForm.Password)
      };
      return modifyCallCenterAccountPassword(params);
    },
    //修改电销人员备注
    _modifyCallCenterAccountRemark() {
      const params = {
        AccountId: this.remarkForm.AccountId,
        Remark: this.remarkForm.Remark
      };
      return modifyCallCenterAccountRemark(params);
    },
    //变更电销人员主管
    _modifyCallCenterAccountDirector() {
      const params = {
        AccountId: this.setDirectorForm.AccountId,
        DirectorId: this.setDirectorFormTableRadio
      };
      return modifyCallCenterAccountDirector(params);
    },
    //查询电销人员详情
    _getCallCenterAccountDetails(id) {
      const params = {
        Id: id
      };
      return getCallCenterAccountDetails(params);
    }
  }
};
</script>

<style>
.el-dialog__header {
  padding-left: 5%;
}
.el-dialog__body form {
  padding-left: 0;
  padding-right: 0;
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
</style>