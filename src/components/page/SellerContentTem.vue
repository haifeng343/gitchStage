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
        <label for>消息内容:</label>
        <el-input v-model="content" placeholder="请输入消息内容" class="handle-input mr10"></el-input>
        <label for>审核状态:</label>
        <el-select v-model="status" placeholder="请选择">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="TemplateSysId" align="center" label="ID"></el-table-column>
        <el-table-column prop="SellerName" align="center" label="商家名称"></el-table-column>
        <el-table-column prop="SellerMobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="TemplateName" align="center" label="模板名称">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">{{ scope.row.TemplateName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="Sign" align="center" label="签名">
          <template slot-scope="scope">
            <el-button type="text" @click="showChannel(scope.row)">{{ scope.row.Sign}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="SmsContent" align="center" label="短信内容">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.ExamineState === 1 ||scope.row.ExamineState === 3 "
              type="text"
              class="nowrap"
              style="width:100%;"
              @click="handleEditContent(scope.row,1)"
            >{{ scope.row.SmsContent}}</el-button>
            <el-button
              v-else
              type="text"
              class="nowrap"
              style="width:100%;"
              @click="handleEditContent(scope.row,2)"
            >{{ scope.row.SmsContent}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ExamineState" align="center" label="状态">
          <template slot-scope="scope">
            <el-button
              type="text"
              :class="scope.row.ExamineState == 3 || scope.row.ExamineState ==5 ?'red':''"
              @click="changeStatus(scope.row)"
            >{{ getStatus(scope.row.ExamineState)}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ExamineFailReason" align="center" label="状态描述">
          <template slot-scope="scope">
            <span
              type="text"
              :class="scope.row.ExamineState == 3 || scope.row.ExamineState ==5 ?'red':''"
            >{{ getStatus(scope.row.ExamineFailReason)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ThirdStatus" align="center" label="第三方状态">
          <template slot-scope="scope">
            <span
              type="text"
              :class="scope.row.ThirdStatus == 3 ?'red':''"
            >{{ getThirdStatus(scope.row.ThirdStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ThirdTemplateId" align="center" label="第三方模板ID">
          <template slot-scope="scope">
            <el-button type="text" @click="look(scope.row)">{{ scope.row.ThirdTemplateId}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="申请时间">
          <template slot-scope="scope">{{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}</template>
        </el-table-column>
        <el-table-column prop="ExaminedTime" align="center" label="完成时间">
          <template
            slot-scope="scope"
          >{{ scope.row.ExaminedTime | normalTime(scope.row.ExaminedTime)}}</template>
        </el-table-column>
        <el-table-column prop="AccountIsDeleted" align="center" label="是否已删除">
          <template slot-scope="scope">{{ scope.row.AccountIsDeleted ? '是':'否' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.ExamineState == 1"
              type="primary"
              @click="_submitSCAudit(scope.row)"
            >提交审核</el-button>
            <el-button
              v-if="scope.row.ExamineState == 4"
              type="primary"
              @click="jumpToTestSend(scope.row)"
            >测试发送</el-button>
            <el-button
              v-if="scope.row.ExamineState == 4"
              type="primary"
              @click="jumpToTestSendRecord(scope.row)"
            >发送详情</el-button>
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
      <!-- 编辑名称弹出框 -->
      <el-dialog :title="`编辑短信模板-${editForm.SellerName}`" :visible.sync="editVisible" width="633px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
          <el-form-item label="模板名称:" prop="templatename">
            <el-input v-model="editForm.templatename" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-time-box">
          <span v-if="editForm.CreateTime != ''">创建时间:{{editForm.CreateTime}}</span>
          <span v-if="editForm.UpdateTime != ''">最后更新时间:{{editForm.UpdateTime}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="saveNameEdit('editForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 第三方模板弹出窗 -->
      <el-dialog title="第三方模板ID" :visible.sync="lookVisible" width="633px">
        <el-form ref="lookForm" :model="lookForm" label-width="120px">
          <el-form-item label="第三方平台:">
            <span>{{lookForm.providerCode}}</span>
          </el-form-item>
          <!-- <el-form-item label="签名">
                        <span>{{lookForm.sign}}</span>
          </el-form-item>-->
          <!-- <el-form-item label="应用标识:">
                        <span>{{lookForm.appId}}</span>
                    </el-form-item>
                    <el-form-item label="应用秘匙">
                        <span>{{lookForm.appSecret}}</span>
          </el-form-item>-->
        </el-form>
      </el-dialog>
      <!-- 提交审核 -->
      <el-dialog
        :title="`短信签名-${channelForm.SellerName}`"
        :visible.sync="channelVisible"
        width="663px"
        autocomplete="off"
      >
        <el-form ref="channelForm" :model="channelForm" :rules="channelrules" label-width="100px">
          <el-form-item label="签名名称:" prop="ChannelType">
            <el-select
              v-model="channelForm.ChannelType"
              @change="changeChannel"
              placeholder="请选择签名"
              style="width:100%;"
            >
              <el-option
                v-for="item in channelTypeList"
                :key="item.SignId"
                :label="item.SignName"
                :value="item.SignId"
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
            @click="_submitSign('channelForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改内容模板 -->
      <el-dialog
        :title="`编辑短信内容-${editcForm.SellerName}`"
        :visible.sync="editcVisible"
        width="633px"
      >
        <el-form ref="editcForm" :model="editcForm" :rules="editcrules" label-width="120px">
          <el-form-item label="模板名称:">
            <el-input v-model="editcForm.templatename" disabled></el-input>
          </el-form-item>
          <el-form-item label="消息内容" prop="templatecontent">
            <el-input type="textarea" :disabled="editVisibleType!=1" v-model="editcForm.templatecontent"></el-input>
          </el-form-item>
          <el-form-item label="URL:" prop="templatecontent">
            <el-input :disabled="editVisibleType!=1" v-model="editcForm.templatelink"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-time-box">
          <span v-if="editcForm.CreateTime != ''">创建时间:{{editcForm.CreateTime}}</span>
          <span v-if="editcForm.UpdateTime != ''">最后更新时间:{{editcForm.UpdateTime}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            v-if="editVisibleType == 1"
            size="medium"
            class="dialog-certain"
            @click="saveEdit('editcForm')"
          >确 定</el-button>
          <el-button v-else type="primary"
            size="medium"
            class="dialog-certain" 
            @click="editcVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getSContentTem,
  editSCStatus,
  changeSCStatus,
  submitSCAudit,
  getSignPull,
  submitSign,
  editSCName
} from "api/seller.js";
export default {
  name: "SellerContentTem",
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
      ctId: "", // 模板Id
      phone: "",
      username: "",
      content: "",
      status: 0,
      channelTypeList: [],
      statusList: [
        { id: 0, name: "全部" },
        { id: 1, name: "等待审核" },
        { id: 2, name: "正在审核" },
        { id: 3, name: "审核拒绝" },
        { id: 4, name: "审核通过" },
        { id: 5, name: "管理员作废" }
      ],
      statusList1: [{ id: 3, name: "审核拒绝" }, { id: 5, name: "管理员作废" }],
      ordersn: "",
      pageCount: 0,
      pagesize: 30,
      aayAccountName: "商家",
      addVisible: false,
      editVisible: false,
      editVisibleType:1,
      editcVisible: false,
      changeVisible: false,
      channelVisible: false,
      lookVisible: false,
      addForm: {
        refundReason: "",
        refundmoney: "",
        goodsBasicMoney: "",
        ordersn: ""
      },
      changeForm: {
        accountName: "商家",
        statusDes: "",
        status: ""
      },
      channelForm: {
        ChannelType: "",
        SignId: "",
        channelCode: "",
        SellerName: ""
      },
      lookForm: {
        accountName: "",
        appId: "",
        providerCode: "",
        appSecret: "",
        sign: ""
      },
      editcForm: {
        templatename: "",
        templateid: "",
        templatecontent: "",
        SellerName: "",
        templatelink: "",
        channelId: "",
        CreateTime: "",
        UpdateTime: ""
      },
      editForm: {
        templatename: "",
        templateid: "",
        SellerName: "",
        CreateTime: "",
        UpdateTime: ""
      },
      addrules: {
        refundmoney: [
          { validator: refundMaxmoney, required: true, trigger: "blur" }
        ],
        refundReason: [
          { required: true, message: "请输入退款原因", trigger: "blur" }
        ]
      },
      changerules: {
        status: [{ required: true, message: "请选择", trigger: "change" }],
        statusDes: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      channelrules: {
        ChannelType: [
          { required: true, message: "请选择平台", trigger: "change" }
        ]
      },
      editcrules: {
        templatelink: [
          { required: true, message: "请输入URL", trigger: "blur" }
        ],
        templatecontent: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
      },
      editrules: {
        templatename: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    jumpToTestSend(item) {
      this.$router.push({
        path: `/smsTemplateTestSend/${item.TemplateSysId}`,
        query: {
          name: item.TemplateName
        }
      });
    },
    jumpToTestSendRecord(item) {
        this.$router.push({
        path: `/smsTemplateTestSendRecord/${item.TemplateSysId}`,
        query: {
          name: item.TemplateName
        }
      });
    },
    changeChannel(value) {
      this.channelForm.ChannelType = value;
    },
    // 显示选择签名
    showChannel(item) {
      this.channelVisible = true;
      this.ctId = item.TemplateSysId;
      this.channelForm.SellerName = item.SellerName;
      this._getSignPull(item.AccountId, item.providerCode);
      this.channelForm.ChannelType = item.SignId;
    },
    // 选择签名
    _submitSign(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            templateid: this.ctId,
            signid: this.channelForm.ChannelType
          };
          submitSign(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "提交成功",
                type: "success"
              });
              this.channelVisible = false;
              this.getData(this.cur_page);
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 获取签名数据
    async _getSignPull(id, channelcode) {
      const params = {
        AccountId: id,
        ChannelCode: channelcode
      };
      await getSignPull(params).then(res => {
        this.channelTypeList = res.Data;
      });
    },
    // 查看第三方平台
    look(item) {
      this.lookVisible = true;
      (this.lookForm.appId = item.AppId),
        (this.lookForm.providerCode = item.ProviderCode),
        (this.lookForm.appSecret = item.AppSecret),
        (this.lookForm.sign = item.Sign);
    },
    // 显示内容编辑窗口
    handleEditContent(item,type) {
      this.editVisibleType = type;
      this.editcVisible = true;
      this.ctId = item.TemplateSysId;
      this.editcForm.SellerName = item.SellerName;
      this.editcForm.templatename = item.TemplateName;
      this.editcForm.templatelink = item.SmsLink;
      this.editcForm.templatecontent = item.SmsContent;
      this.editcForm.channelId = item.SignId;
      this.editcForm.CreateTime = item.CreateTime;
      this.editcForm.UpdateTime = item.ExaminedTime;
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            templateid: this.ctId,
            templatename: this.editcForm.templatename,
            templatcontent: this.editcForm.templatecontent,
            templatlink: this.editcForm.templatelink,
            channelId: this.editcForm.channelId
          };
          editSCStatus(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editcVisible = false;
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    handleEdit(item) {
      this.editVisible = true;
      this.ctId = item.TemplateSysId;
      this.editForm.SellerName = item.SellerName;
      this.editForm.templatename = item.TemplateName;
      this.editForm.CreateTime = item.CreateTime;
      this.editForm.UpdateTime = item.ExaminedTime;
    },
    // 保存编辑
    saveNameEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            templateid: this.ctId,
            templatename: this.editForm.templatename
          };
          editSCName(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editcVisible = false;
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 提交审核
    _submitSCAudit(item) {
      if (item.ExamineState != 2) {
        this.$confirm("您确定要提交审核吗?", "提交审核", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            const params = {
              TemplateId: item.TemplateSysId
            };
            submitSCAudit(params).then(res => {
              if (res.Success) {
                this.$message({
                  showClose: true,
                  message: "提交成功",
                  type: "success"
                });
                this.getData(this.cur_page);
              } else {
                this.$message.error(res.Message);
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message.error("正在审核中,请等待");
      }
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
      this.ctId = item.TemplateSysId;
      this.changeForm.statusDes = item.ExamineFailReason;
      this.changeForm.accountName = item.TemplateName;
      // this.changeForm.status = item.Status
    },
    // 修改状态
    _changeStatus(formName) {
      this.$confirm("您确定要修改状态吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              const params = {
                CtId: this.ctId,
                Status: this.changeForm.status,
                Des: this.changeForm.statusDes
              };
              changeSCStatus(params).then(res => {
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
            } else {
              return false;
            }
          });
        })
        .catch(() => {});
    },
    //获取状态
    getStatus(Status) {
      switch (Status) {
        case 1:
          return "等待审核";
          break;
        case 2:
          return "正在审核";
          break;
        case 3:
          return "审核拒绝";
          break;
        case 4:
          return "审核通过";
          break;
        case 5:
          return "管理员作废";
          break;
        default:
          break;
      }
    },
    //获取第三方状态
    getThirdStatus(Status) {
      switch (Status) {
        case 0:
          return "审核中";
          break;
        case 1:
          return "审核成功";
          break;
        case 2:
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
        Content: this.content,
        Status: this.status,
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        SellerName: this.username,
        SellerPhone: this.phone
      };
      await getSContentTem(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
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