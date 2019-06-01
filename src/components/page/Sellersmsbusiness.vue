<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <label for>商家名称:</label>
        <el-input v-model="username" placeholder="请输入商户名称" class="handle-input mr10"></el-input>
        <label for>手机号:</label>
        <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
        <label for>状态:</label>
        <el-select v-model="status" placeholder="请选择状态">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="SignId" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountNickName" align="center" label="商家名称"></el-table-column>
        <el-table-column prop="AccountPhone" align="center" label="手机号"></el-table-column>
        <el-table-column prop="SignName" align="center" label="短信签名"></el-table-column>
        <el-table-column prop="TemplateName" align="center" label="营业执照">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpUrl(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="Status" align="center" label="状态">
          <template slot-scope="scope">
            <el-button type="text" @click="changeStatus(scope.row)">{{ getStatus(scope.row.Status)}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="StatusDes" align="center" label="状态描述"></el-table-column>
        <el-table-column prop="ThirdStatus" align="center" label="第三方状态">
          <template slot-scope="scope">{{ getThirdStatus(scope.row.ThirdStatus)}}</template>
        </el-table-column>
        <el-table-column prop="ProviderCode" align="center" label="第三方短信渠道">
          <template slot-scope="scope">
            {{ scope.row.ProviderCode}}
          </template>
        </el-table-column>
        <el-table-column prop="ThirdSignId" align="center" label="第三方签名ID"></el-table-column>
        <el-table-column prop="CallbackInfo" align="center" label="第三方回调数据">
          <template slot-scope="scope">
            <el-button
              style="width:100%;"
              class="nowrap"
              type="text"
              @click="lookData(scope.row)"
            >{{scope.row.CallbackInfo}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="Time" align="center" label="申请时间">
          <template slot-scope="scope">{{ scope.row.Time | normalTime(scope.row.Time)}}</template>
        </el-table-column>
        <el-table-column prop="UpdateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <el-button v-if="scope.row.Status == 1" type="text" @click="showChannel(scope.row)">提交审核</el-button>
            <span v-else type="text" style="color:#eeeeee;">提交审核</span>
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
      <!--审核状态修改弹出框 -->
      <el-dialog
        :title="`状态修改-${changeForm.accountName}`"
        :visible.sync="changeVisible"
        width="663px"
      >
        <el-form ref="changeForm" :model="changeForm" :rules="changerules" label-width="100px">
          <el-form-item label="状态:" prop="status">
            <el-select v-model="changeForm.status" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in statusList1"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态描述" prop="statusDes">
            <el-input type="textarea" v-model="changeForm.statusDes" placeholder="请输入状态描述"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="_changeStatus('changeForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog :title="`设置应用-${editForm.accountName}`" :visible.sync="editVisible" width="633px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
          <el-form-item label="第三方平台:" prop="providerCode">
            <el-input v-model="editForm.providerCode"></el-input>
          </el-form-item>
          <el-form-item label="应用标识:" prop="appId">
            <el-input v-model="editForm.appId"></el-input>
          </el-form-item>
          <el-form-item label="应用秘匙:" prop="appId">
            <el-input v-model="editForm.appSecret"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="saveEdit('editForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 第三方模板弹出窗 -->
      <el-dialog title="第三方模板ID" :visible.sync="lookVisible" width="633px">
        <el-form ref="lookForm" :model="lookForm" label-width="120px">
          <el-form-item label="第三方平台:">
            <span>{{lookForm.providerCode}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="第三方回调数据" :visible.sync="dataVisible" width="633px">
        <el-form ref="dataForm" :model="dataForm" label-width="150px">
          <el-form-item label="第三方回调数据:">
            <el-input
              :rows="8"
              type="textarea"
              v-model="dataForm.data"
              disabled
              placeholder="请输入状态描述"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="营业执照" :visible.sync="imgVisible" width="633px">
        <img :src="imgURL" class="license">
      </el-dialog>
      <!-- 提交审核 -->
      <el-dialog
        :title="`提交审核-${channelForm.AccountNickName}`"
        :visible.sync="channelVisible"
        width="663px"
        autocomplete="off"
      >
        <el-form ref="channelForm" :model="channelForm" :rules="channelrules" label-width="100px">
          <el-form-item label="渠道名称:" prop="ChannelType">
            <el-select
              v-model="channelForm.ChannelType"
              @change="changeChannel"
              placeholder="请选择渠道"
              style="width:100%;"
            >
              <el-option
                v-for="item in channelTypeList"
                :key="item.ChannelId"
                :label="item.ChannelName"
                :value="item.ChannelId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="addVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="_submitSCAudit('channelForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getSmsList,
  choiceSmsChannel,
  setSmsChannelS,
  submitSmsChannel,
  getChannelPull
} from "api/seller.js";
export default {
  name: "Sellersmsbusiness",
  data() {
    var refundMaxmoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("退款金额不能为空"));
      } else {
        if (value > this.addForm.goodsBasicMoney) {
          callback(new Error("退款金额不能大于充值金额"));
        } else {
          if (!parseFloat(value)) {
            callback(new Error("请输入正确的金额"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      tableData: [],
      cur_page: 1,
      Id: "",
      phone: "",
      username: "",
      status: 0,
      statusList: [
        { id: 0, name: "全部" },
        { id: 1, name: "等待审核" },
        { id: 2, name: "审核中" },
        { id: 3, name: "认证成功" },
        { id: 4, name: "认证失败" },
        { id: 5, name: "无效" }
      ],
      statusList1: [{ id: 4, name: "审核拒绝" }, { id: 5, name: "管理员作废" }],
      channelTypeList: [],
      ordersn: "",
      pageCount: 0,
      pagesize: 30,
      imgURL: "",
      aayAccountName: "商家",
      addVisible: false,
      editVisible: false,
      changeVisible: false,
      channelVisible: false,
      imgVisible: false,
      lookVisible: false,
      dataVisible: false,
      addForm: {
        refundReason: "",
        refundmoney: "",
        goodsBasicMoney: "",
        ordersn: ""
      },
      channelForm: {
        ChannelType: "",
        SignId:'',
        AccountNickName: ""
      },
      changeForm: {
        accountName: "商家",
        statusDes: "",
        status: ""
      },
      lookForm: {
        accountName: "",
        appId: "",
        providerCode: "",
        appSecret: "",
        sign: ""
      },
      dataForm: {
        data: ""
      },
      editForm: {
        accountName: "",
        appId: "",
        providerCode: "",
        appSecret: "",
        channelId: ""
      },
      addrules: {
        refundmoney: [
          { validator: refundMaxmoney, required: true, trigger: "blur" }
        ],
        refundReason: [
          { required: true, message: "请输入退款原因", trigger: "blur" }
        ]
      },
      channelrules: {
        ChannelType: [
          { required: true, message: "请选择渠道", trigger: "change" }
        ]
      },
      changerules: {
        status: [{ required: true, message: "请选择", trigger: "change" }],
        statusDes: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      editrules: {
        appId: [{ required: true, message: "请输入appId", trigger: "blur" }],
        providerCode: [
          { required: true, message: "请输入第三方平台", trigger: "blur" }
        ],
        appSecret: [{ required: true, message: "请输入秘匙", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.$route.query.accountname != undefined) {
      this.username = this.$route.query.accountname;
      this.phone = this.$route.query.accountphone;
    }
    this.getData();
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.accountname != undefined) {
        this.username = this.$route.query.accountname;
        this.phone = this.$route.query.accountphone;
      }
    },
    username() {
      this.getData();
    }
  },
  computed: {},
  methods: {
    lookData(item) {
      this.dataVisible = true;
      this.dataForm.data = item.CallbackInfo;
    },
    // 查看营业执照
    jumpUrl(item) {
      this.imgVisible = true;
      this.imgURL = `${item.License}?usertoken=gudi20181212001`;
    },
    // 查看第三方平台
    look(item) {
      this.lookVisible = true;
      (this.lookForm.appId = item.AppId),
        (this.lookForm.providerCode = item.ProviderCode),
        (this.lookForm.appSecret = item.AppSecret),
        (this.lookForm.sign = item.Sign);
    },
    // 显示编辑窗口
    handleEdit(item) {
      this.editVisible = true;
      this.ctId = item.ChannelId;
      this.editForm.accountName = item.AccountNickName;
      this.editForm.appId = item.AppId;
      this.editForm.appSecret = item.AppSecret;
      this.editForm.providerCode = item.ProviderCode;
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            id: this.ctId,
            providercode: this.editForm.providerCode,
            appid: this.editForm.appId,
            appsecret: this.editForm.appSecret
          };
          choiceSmsChannel(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editVisible = false;
            } else {
              this.$message(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    changeChannel(value){
        this.changeForm.SignId = value
    },
    // 显示提交审核
    showChannel(item) {
      this.channelVisible = true;
      this.channelForm.AccountNickName = item.AccountNickName;
      this.changeForm.ChannelType = item.SignId
      this._getChannelPull(item.AccountId);
    },
    // 提交审核
    _submitSCAudit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("您确定要提交审核吗?", "提交审核", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const params = {
                ChannelId: this.changeForm.SignId,
                SignId: this.changeForm.ChannelType
              };
              submitSmsChannel(params).then(res => {
                if (res.Success) {
                  this.$message({
                    showClose: true,
                    message: "提交成功",
                    type: "success"
                  });
                  this.getData(this.cur_page);
                  this.channelVisible = false;
                } else {
                  this.$message.error(res.Message);
                }
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    // 显示退款详情
    openDetail(item) {
      this.editVisible = true;
      this.aayAccountName = item.PayAccountName;
      const params = {
        ordersn: item.OrderSN
      };
      getRefundDetail(params).then(res => {
        this.editForm.refundReason = res.Data.Reason;
        this.editForm.refundmoney = res.Data.RefundMoney / 100;
        this.editForm.time = res.Data.FinishTime;
      });
    },
    // 显示修改状态
    changeStatus(item) {
      this.changeVisible = true;
      this.ctId = item.SignId;
      this.changeForm.statusDes = item.StatusDes;
      this.changeForm.accountName = item.AccountNickName;
    },
    // 修改状态
    _changeStatus(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("您确定要修改状态吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const params = {
                ChannelId: this.ctId,
                Status: this.changeForm.status,
                ErrorRemark: this.changeForm.statusDes
              };
              setSmsChannelS(params).then(res => {
                if (res.Success) {
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success"
                  });
                  this.getData(this.cur_page);
                  this.changeVisible = false;
                } else {
                  this.$message.error(res.Message);
                }
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    //获取状态
    getStatus(Status) {
      switch (Status) {
        case 1:
          return "等待审核";
          break;
        case 2:
          return "审核中";
          break;
        case 3:
          return "认证成功";
          break;
        case 4:
          return "认证失败";
          break;
        case 5:
          return "无效";
          break;
        default:
          break;
      }
    },
    //获取第三方状态
    getThirdStatus(Status) {
      switch (Status) {
        case 0:
          return "待审核";
          break;
        case 1:
          return "审核中";
          break;
        case 2:
          return "审核成功";
          break;
        case 3:
          return "审核失败";
          break;
        default:
          break;
      }
    },
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
    async getData() {
      const params = {
        Status: this.status,
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        accountname: this.username,
        accountphone: this.phone
      };
      await getSmsList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    // 获取渠道数据
    async _getChannelPull(id) {
      const params = {
        AccountId: id
      };
      await getChannelPull(params).then(res => {
        this.channelTypeList = res.Data;
      });
    },
    search() {
      this.cur_page = 1;
      this.getData();
    },
    getTime() {
      if (this.time != null && this.time.length > 0) {
        this.starttime = this.time[0];
        this.endtime = this.time[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
    }
  }
};
</script>

<style scoped>
.license {
  width: 100%;
  height: auto;
}
.callbackInfo {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.handle-box {
  margin-bottom: 20px;
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