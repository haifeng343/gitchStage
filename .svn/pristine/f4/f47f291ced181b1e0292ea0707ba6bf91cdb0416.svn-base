<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商家名称:">
          <el-input v-model="sellerName" placeholder="请输入商家名称"></el-input>
        </el-form-item>
        <el-form-item label="委托名称:">
          <el-input v-model="delegateName" placeholder="请输入委托名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="status" placeholder="请选择状态">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="openAddForm()"
        size="medium"
        style="float:right;margin-bottom:10px;"
      >添加委托</el-button>
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="SellerName" align="center" label="商家名称"></el-table-column>
        <el-table-column prop="Name" align="center" label="委托名称">
          <template slot-scope="scope">
            <el-button type="text" @click="openDelegateForm(scope.row)">{{scope.row.Name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="DistributionStatus" align="center" label="分配状态"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="openDelegateStatusForm(scope.row)"
            >{{getStatus(scope.row.Status)}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="委托详情">
          <template
            slot-scope="scope"
            v-if="scope.row.DistributionStatus.indexOf('部分分配')!=-1 || scope.row.DistributionStatus.indexOf('全部分配')!=-1"
          >
            <div>已预约数量：{{scope.row.ExportCountToday}}/{{scope.row.ExportCount}}</div>
            <div>跟进名单数量：{{scope.row.TraceCountToday}}/{{scope.row.TraceCount}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请时间">
          <template slot-scope="scope">{{ scope.row.ApplyTime | normalTime(scope.row.ApplyTime)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpToDelegateDetails(scope.row)">委托详情</el-button>
            <el-button type="text" @click="openDelegateTemplateForm(scope.row)">委托模板</el-button>
            <el-button type="text" @click="jumpToDelegateTalkingskill(scope.row)">话术列表</el-button>
            <el-button type="text" @click="jumpToDelegateDistribution(scope.row)">委托分配</el-button>
            <el-button type="text" @click="jumpToDelegateStatistic(scope.row)">统计详情</el-button>
            <el-button type="text" @click="jumpToDelegateExportList(scope.row)">导出名单</el-button>
            <el-button type="text" @click="jumpToDelegateCallDetails(scope.row)">拨打详情</el-button>
            <el-button type="text" @click="openDelegateRemarkForm(scope.row)">备注</el-button>
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
    <el-dialog title="活动内容" :visible.sync="editVisible" width="660px">
      <el-form ref="editForm" :model="editForm" :rules="editrules">
        <el-form-item label="委托名称:" prop="delegateName">
          <el-input v-model="editForm.delegateName" style="width:345px;" placeholder="请输入委托名称"></el-input>
        </el-form-item>
        <el-form-item label="委托时间:" prop="time">
          <el-date-picker
            v-model="editForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:345px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="委托人数:" prop="delegateCount">
          <el-input v-model="editForm.delegateCount" placeholder="请输入委托人数" style="width:345px;"></el-input>
        </el-form-item>
        <el-form-item label="委托内容:" prop="delegateContent">
          <el-input
            type="textarea"
            :rows="5"
            v-model="editForm.delegateContent"
            placeholder="请输入委托内容,不超过128个字符"
            style="width:345px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormOk()" type="primary" size="medium">确 定</el-button>
        <el-button @click="editVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 状态修改弹出框 -->
    <el-dialog
      :title="`状态修改-${delegateStatusForm.delegateName}`"
      :visible.sync="delegateStatusVisible"
      width="633px"
    >
      <el-form ref="delegateStatusForm" :model="delegateStatusForm" label-width="100px;">
        <el-form-item label="状态:">
          <el-select v-model="delegateStatusForm.delegateStatus" placeholder="请选择状态">
            <el-option
              v-for="item in modifystatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态描述:">
          <el-input type="textarea" :rows="6" v-model="delegateStatusForm.delegateStatusDes"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delegateStatusVisible = false" size="medium">取 消</el-button>
        <el-button @click="modifyDelegateStatusOk()" type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 备注弹出框 -->
    <el-dialog
      :title="`备注-${delegateRemarkForm.delegateName}`"
      :visible.sync="delegateRemarkVisible"
      width="633px"
    >
      <el-form ref="delegateRemarkForm" :model="delegateRemarkForm">
        <el-form-item label="商家备注:">
          <el-input type="textarea" :rows="6" v-model="delegateRemarkForm.sellerRemark" disabled></el-input>
        </el-form-item>
        <el-form-item label="主管备注:">
          <el-input type="textarea" :rows="6" v-model="delegateRemarkForm.accountRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delegateRemarkVisible = false" size="medium">取 消</el-button>
        <el-button @click="modifyDelegateRemarkOk()" type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 委托模板弹出框 -->
    <el-dialog
      :title="`委托模板-${delegateTemplateForm.DelegateName}`"
      :visible.sync="delegateTemplateVisible"
      width="633px"
    >
      <h3>委托模板</h3>
      <h5 style="margin:25px 0 10px 0">数据源</h5>
      <el-checkbox-group v-model="SourceCheckList" class="checkList">
        <el-checkbox v-for="(item,index) in SourceList" v-model="item.IsSelect" :label="item" :value="item.Type" :key="item.Type" >{{item.Name}}
          <el-button type="primary" @click="active(item, index)" :class="{'grow':item.IsDefault==true}" style="margin:0 30px 0 10px">默认选中</el-button>
        </el-checkbox>
      </el-checkbox-group>
        
      <h3 style="margin-top:10px">委托标签</h3>
      <el-checkbox-group v-model="TagCheckList" class="checkList">
        <el-checkbox v-model="item.IsSelect" v-for="item in TagList" :label="item" :value="item.DelegateTagId" :key="item.DelegateTagId">{{item.DelegateTagName}}</el-checkbox>
      </el-checkbox-group>
      <h3>委托内容</h3>
      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">任务人数：</label>
          <el-input v-model="delegateTemplateForm.RealPersonCount" style="width:200px;">人</el-input>
          <label>（委托数量{{delegateTemplateForm.DelegateCount}}人）</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">总价(元)：</label>
          <el-input v-model="delegateTemplateForm.TotalPrice" style="width:350px;"></el-input>
        </div>
      </div>
      <h3>筛选条件</h3>
      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">价格模板：</label>
          <el-select
            v-model="delegateTemplateForm.PtId"
            placeholder="请选择"
            @change="changePriceTemplate()"
            style="width:350px;"
          >
            <el-option
              v-for="item in delegateTemplateForm.PriceTemplateList"
              :key="item.PtId"
              :label="item.PtName"
              :value="item.PtId"
            ></el-option>
          </el-select>
        </div>
        <div class="delegateTemplate-module-item" v-if="delegateTemplateAge.visible">
          <label for class="delegateTemplate-module-item-lable">年龄：</label>
          <el-select
            v-model="delegateTemplateAge.value1"
            placeholder="请选择"
            style="width:150px;5px;margin-right:5px;"
          >
            <el-option
              v-for="item in delegateTemplateAge.context"
              :key="item"
              :label="item+'岁'"
              :value="item"
            ></el-option>
          </el-select>到
          <el-select
            v-model="delegateTemplateAge.value2"
            placeholder="请选择"
            style="width:150px;margin-left:5px;"
          >
            <el-option
              v-for="item in delegateTemplateAge.context"
              :key="item"
              :label="item+'岁'"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="delegateTemplate-module-item" v-if="delegateTemplateSex.visible">
          <label for class="delegateTemplate-module-item-lable">性别：</label>
          <el-select v-model="delegateTemplateSex.value" placeholder="请选择" style="width:150px;">
            <el-option
              v-for="item in delegateTemplateSex.context"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </div>
        <div class="delegateTemplate-module-item" v-if="delegateTemplateArea.visible">
          <label for class="delegateTemplate-module-item-lable">发送地区：</label>
          <div class="sendPlace_box">
            <el-tree
              :data="delegateTemplateArea.value1"
              show-checkbox
              node-key="Code"
              ref="tree"
              :default-expanded-keys="delegateTemplateExpanded"
              :default-checked-keys="delegateTemplateChecked"
              :props="delegateTemplateDefaultProps"
              style="width:330px;float:left;"
              @check-change="ChangeData()"
            ></el-tree>
          </div>
        </div>
        <div class="delegateTemplate-module-item" v-if="delegateTemplateRange.visible">
          <el-checkbox v-model="sellerAddressChecked">商家地址</el-checkbox>
        </div>
        <div class="delegateTemplate-module-item" v-if="delegateTemplateRange.visible">
          <label for class="delegateTemplate-module-item-lable">半径范围：</label>
          <el-select
            v-model="delegateTemplateRange.value1"
            placeholder="请选择"
            style="width:150px;margin-left:5px;"
            :disabled="!sellerAddressChecked"
          >
            <el-option
              v-for="item in delegateTemplateRange.context"
              :key="item"
              :label="item+'公里'"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </div>
      <h3>反馈选项</h3>
      <div class="delegateTemplate-module">
        <el-checkbox-group v-model="delegateTemplateResCheckedList">
          <el-checkbox style="margin-right:20px;" v-for="item in delegateTemplateResList" :label="item.ContentTypeDes" :key="item.ContentType">{{item.ContentTypeDes}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <h3>责任销售</h3>
      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">姓名：</label>
          <el-input v-model="delegateTemplateForm.ContactsName" style="width:350px;"></el-input>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">电话：</label>
          <el-input v-model="delegateTemplateForm.ContactsMobile" style="width:350px;"></el-input>
        </div>
      </div>
      <h3>其他</h3>

      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">备注：</label>
          <el-input
            type="textarea"
            rows="6"
            v-model="delegateTemplateForm.DirectorRemark"
            style="width:350px;"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delegateTemplateVisible = false" size="medium">取 消</el-button>
        <el-button @click="modifyDelegateTemplateOk()" type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加委托弹出框 -->
    <el-dialog title="添加委托" :visible.sync="addVisible" width="660px">
      <el-form ref="addForm" :model="addForm" :rules="addrules">
        <el-form-item label="选择商家:" prop="sellerId">
          <el-select v-model="addForm.sellerId" filterable placeholder="请选择" style="width:345px;">
            <el-option
              v-for="item in sellerList"
              :key="item.AccountId"
              :label="item.AccountNickName"
              :value="item.AccountId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="委托名称:" prop="delegateName">
          <el-input v-model="addForm.delegateName" style="width:345px;" placeholder="请输入委托名称"></el-input>
        </el-form-item>
        <el-form-item label="委托时间:" prop="time">
          <el-date-picker
            v-model="addForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:345px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="委托人数:" prop="delegateCount">
          <el-input v-model="addForm.delegateCount" placeholder="请输入委托人数" style="width:345px;"></el-input>
        </el-form-item>
        <el-form-item label="委托内容:" prop="delegateContent">
          <el-input
            type="textarea"
            :rows="5"
            v-model="addForm.delegateContent"
            placeholder="请输入委托内容,不超过128个字符"
            style="width:345px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormOk()" type="primary" size="medium">确 定</el-button>
        <el-button @click="addVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getManagerCallCenterDelegateList,
  modifyManagerCallCenterDelegateStatus,
  modifyManagerCallCenterDelegateRemark,
  getManagerCallCenterDelegateTemplate,
  modifyManagerCallCenterDelegateTemplate,
  getManagerCallCenterDelegateCondition,
  addManagerCallCenterDelegate,
  getManagerCallCenterSellerList,
  modifyManagerCallCenterDelegate
} from "api/entrust.js";
export default {
  name: "DelegateList",
  data() {
    var delegateCount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入委托人数"));
      }
      if (value > 0) {
        callback();
      } else {
        callback(new Error("委托人数必须为正整数"));
      }
    };
    return {
      radio:1,//数据源
      SourceList:[],//委托标签
      SourceCheckList:[],//委托选中标签
      TagList:[],//数据标签
      TagCheckList:[],//选中数据标签
      sellerName: "",
      delegateName: "",
      status: 0,
      statusList: [
        {
          id: 0,
          name: "全部"
        },
        {
          id: 1,
          name: "申请委托"
        },
        {
          id: 2,
          name: "委托中"
        },
        {
          id: 3,
          name: "暂停委托"
        },
        {
          id: 4,
          name: "停止委托"
        },
        {
          id: 5,
          name: "委托完成"
        },
        {
          id: 6,
          name: "委托失败"
        },
        {
          id: 7,
          name: "管理员作废"
        },
        {
          id: 8,
          name: "委托取消"
        }
      ],
      modifystatusList: [
        {
          id: 1,
          name: "申请委托"
        },
        {
          id: 2,
          name: "委托中"
        },
        {
          id: 3,
          name: "暂停委托"
        },
        {
          id: 4,
          name: "停止委托"
        },
        {
          id: 5,
          name: "委托完成"
        },
        {
          id: 6,
          name: "委托失败"
        },
        {
          id: 7,
          name: "管理员作废"
        },
        {
          id: 8,
          name: "委托取消"
        }
      ],

      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数

      editVisible: false,
      editForm: {
        delegateId: "",
        delegateName: "",
        delegateContent: "",
        time: [],
        delegateCount: ""
      },
      editrules: {
        delegateName: [
          { required: true, message: "请填写委托名称", trigger: "blur" }
        ],
        delegateContent: [
          { required: true, message: "请填写委托内容", trigger: "blur" }
        ],
        time: [{ required: true, message: "请填写委托时间", trigger: "blur" }],
        delegateCount: [
          { required: true, trigger: "blur", validator: delegateCount }
        ]
      },

      delegateStatusVisible: false,
      delegateStatusForm: {
        delegateId: 0,
        delegateName: "",
        delegateStatus: "",
        delegateStatusDes: ""
      },

      delegateRemarkVisible: false,
      delegateRemarkForm: {
        delegateId: 0,
        delegateName: "",
        sellerRemark: "",
        accountRemark: ""
      },

      delegateTemplateVisible: false,
      delegateTemplateTime: ["", ""],
      delegateTemplateAge: {},
      delegateTemplateSex: {},
      delegateTemplateArea: {},
      delegateTemplateRange: {},
      delegateTemplateResList: [],
      delegateTemplateResCheckedList: [],
      delegateTemplateDefaultProps: {
        children: "List",
        label: "Name"
      },
      delegateTemplateExpanded: [],
      delegateTemplateChecked: [],
      delegateTemplateForm: {
        DelegateId: 0,
        DelegateName: "",
        DelegateStartTime: "",
        DelegateEndTime: "",
        DelegateCount: "",
        RealPersonCount: "",
        UnitPrice: "",
        TotalPrice: "",
        PriceTemplateList: [],
        PtId: "",
        ConditionList: [],
        DirectorRemark: "",
        ContactsName: "",
        ContactsMobile: ""
      },

      sellerAddressChecked: true,

      sellerList: [],
      addVisible: false,
      addForm: {
        sellerId: "",
        delegateName: "",
        delegateContent: "",
        time: [],
        delegateCount: ""
      },
      addrules: {
        sellerId: [{ required: true, message: "请选择商家", trigger: "blur" }],
        delegateName: [
          { required: true, message: "请填写委托名称", trigger: "blur" }
        ],
        delegateContent: [
          { required: true, message: "请填写委托内容", trigger: "blur" }
        ],
        time: [{ required: true, message: "请填写委托时间", trigger: "blur" }],
        delegateCount: [
          { required: true, trigger: "blur", validator: delegateCount }
        ]
      }
    };
  },
  created() {
    this._getManagerCallCenterDelegateList();
  },
  methods: {
    active(item, index) {
      for (let k of this.SourceCheckList) {
        if (item.Type == k.Type && item.IsSelect) {
          this.SourceList[index].IsDefault = !this.SourceList[index].IsDefault;
          break;
        }
      }
      this.SourceList = [...this.SourceList];
    },
    ChangeData() {
      console.log("ssssss");
    },
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    openAddForm() {
      this.resetForm("addForm");
      this._getManagerCallCenterSellerList();
      this.addVisible = true;
    },
    addFormOk() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this._addManagerCallCenterDelegate().then(val => {
            this.addVisible = false;
            this._getManagerCallCenterDelegateList();
          });
        } else {
          return false;
        }
      });
    },
    jumpToDelegateStatistic(item) {
      this.$router.push({
        path: `/delegatestatistic/${item.Id}`,
        query: {
          name: item.Name
        }
      });
    },
    jumpToDelegateDetails(item) {
      this.$router.push({
        path: `/delegatedetails/${item.Id}`,
        query: {
          name: item.Name
        }
      });
    },
    jumpToDelegateCallDetails(item) {
      this.$router.push({
        path: `/delegatecalldetails/${item.Id}`,
        query: {
          name: item.Name
        }
      });
    },
    jumpToDelegateTalkingskill(item) {
      this.$router.push({
        path: `/delegatetalkingskill/${item.Id}`,
        query: {
          name: item.Name
        }
      });
    },
    jumpToDelegateExportList(item) {
      this.$router.push({
        path: `/delegateexportlist/${item.Id}`,
        query: {
          name: item.Name
        }
      });
    },
    jumpToDelegateDistribution(item) {
      this.$router.push({
        path: `/delegatedistribution/${item.Id}`,
        query: {
          name: item.Name,
          SellerName: item.SellerName
        }
      });
    },
    //解析价格模板年龄
    parsePriceTemplateAge() {
      var obj = this.delegateTemplateForm.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_AGE";
      });
      if (obj == null) {
        return { visible: false };
      }
      var value = obj.ContentValue.split("-");
      var context = obj.Context.split("-");
      const contextList = [];
      for (var i = context[0]; i <= context[1]; i++) {
        contextList.push(i);
      }
      return {
        visible: true,
        value1:
          parseInt(value[0]) < parseInt(context[0]) ? context[0] : value[0],
        value2:
          parseInt(value[1]) > parseInt(context[1]) ? context[1] : value[1],
        context: contextList
      };
    },
    //解析价格模板性别
    parsePriceTemplateSex() {
      var obj = this.delegateTemplateForm.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_SEX";
      });
      if (obj == null) {
        return { visible: false };
      }
      const contextList = [];
      if (obj.Context == "0") {
        contextList.push({ Id: "0", Name: "全部" });
        contextList.push({ Id: "1", Name: "男" });
        contextList.push({ Id: "2", Name: "女" });
      } else if (obj.Context == "1") {
        contextList.push({ Id: "1", Name: "男" });
      } else if (obj.Context == "2") {
        contextList.push({ Id: "2", Name: "女" });
      }
      return {
        visible: true,
        value: obj.ContentValue,
        context: contextList
      };
    },
    //解析价格模板半径范围
    parsePriceTemplateRange() {
      var obj = this.delegateTemplateForm.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_RANGE";
      });
      if (obj == null) {
        return { visible: false };
      }
      var value = obj.ContentValue.split("-");
      var context = obj.Context.split("-");
      const contextList = [];
      for (var i = context[0]; i <= context[1]; i++) {
        contextList.push(i + "");
      }
      return {
        visible: true,
        value1:
          parseInt(value[1]) > parseInt(context[1]) ? context[1] : value[1],
        context: contextList
      };
    },
    //解析价格模板地区
    parsePriceTemplateArea() {
      var obj = this.delegateTemplateForm.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_REGION";
      });
      if (obj == null) {
        return { visible: false };
      }
      const contextList = JSON.parse(obj.ContentValue);
      return {
        visible: true,
        value1: contextList
      };
    },
    //解析反馈选项
    parsePriceTemplateRes() {
      let arr=[];
      let arrCheck=[];
      this.delegateTemplateForm.ConditionList.forEach(item=>{
        if(item.ContentType==="MSG_PRICE_TYPE_REPLY_PARENT"){
          arr.push({ContentType:item.ContentType,ContentTypeDes:item.ContentTypeDes});
          if(item.ContentValue=="1"){
            arrCheck.push(item.ContentTypeDes);
          }
        }
        if(item.ContentType==="MSG_PRICE_TYPE_REPLY_FULL_NAME"){
          arr.push({ContentType:item.ContentType,ContentTypeDes:item.ContentTypeDes});
          if(item.ContentValue=="1"){
            arrCheck.push(item.ContentTypeDes);
          }
        }
        if(item.ContentType==="MSG_PRICE_TYPE_REPLY_SEX"){
          arr.push({ContentType:item.ContentType,ContentTypeDes:item.ContentTypeDes});
          if(item.ContentValue=="1"){
            arrCheck.push(item.ContentTypeDes);
          }
        }
        if(item.ContentType==="MSG_PRICE_TYPE_REPLY_AGE"){
          arr.push({ContentType:item.ContentType,ContentTypeDes:item.ContentTypeDes});
          if(item.ContentValue=="1"){
            arrCheck.push(item.ContentTypeDes);
          }
        }
      })
      this.delegateTemplateResCheckedList=arrCheck;
      return arr;
    },
    //拼接价格模板条件选项
    getConditionList() {
      const list = [];
      if (this.delegateTemplateAge.visible) {
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_AGE",
          ContentValue:
            this.delegateTemplateAge.value1 +
            "-" +
            this.delegateTemplateAge.value2
        });
      }
      if (this.delegateTemplateSex.visible) {
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_SEX",
          ContentValue: this.delegateTemplateSex.value
        });
      }
      if (this.delegateTemplateRange.visible && this.sellerAddressChecked) {
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_RANGE",
          ContentValue: "0-" + this.delegateTemplateRange.value1
        });
      }
      if (this.delegateTemplateArea.visible) {
        var arr = this.$refs.tree.getCheckedKeys(true);
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_REGION",
          ContentValue: arr.join(",")
        });
      }
      if (this.delegateTemplateResCheckedList.length > 0) {
        this.delegateTemplateResCheckedList.forEach(item => {
          if (item == "父母姓名") {
            list.push({
              ContentType: "MSG_PRICE_TYPE_REPLY_PARENT",
              ContentValue: "1"
            });
          }
          if (item == "全名") {
            list.push({
              ContentType: "MSG_PRICE_TYPE_REPLY_FULL_NAME",
              ContentValue: "1"
            });
          }
          if (item == "性别") {
            list.push({
              ContentType: "MSG_PRICE_TYPE_REPLY_SEX",
              ContentValue: "1"
            });
          }
          if (item == "年龄") {
            list.push({
              ContentType: "MSG_PRICE_TYPE_REPLY_AGE",
              ContentValue: "1"
            });
          }
        });
      }
      return list;
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return "委托申请";
        case 2:
          return "委托中";
        case 3:
          return "委托暂停";
        case 4:
          return "委托停止";
        case 5:
          return "委托完成";
        case 6:
          return "委托失败";
        case 7:
          return "作废";
        case 8:
          return "委托取消";
        default:
          return "未知";
      }
    },
    search() {
      this.cur_page = 1;
      this._getManagerCallCenterDelegateList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateList();
    },
    //打开活动详情弹出框
    openDelegateForm(item) {
      this.editVisible = true;
      this.editForm.delegateId = item.Id;
      this.editForm.delegateName = item.Name;
      this.editForm.delegateContent = item.Content;
      this.editForm.time = [item.StartTime, item.EndTime];
      this.editForm.delegateCount = item.DelegateCount;
    },
    editFormOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this._modifyManagerCallCenterDelegate().then(val => {
            this.editVisible = false;
            this._getManagerCallCenterDelegateList();
            this.$message({
              type: "success",
              message: "修改成功",
              showClose: true
            });
          });
        } else {
          return false;
        }
      });
    },
    //打开状态弹出框
    openDelegateStatusForm(item) {
      this.delegateStatusVisible = true;
      this.delegateStatusForm.delegateId = item.Id;
      this.delegateStatusForm.delegateName = item.Name;
      this.delegateStatusForm.delegateStatus = item.Status;
      this.delegateStatusForm.delegateStatusDes = item.StatusDes;
    },
    //修改活动状态确认
    modifyDelegateStatusOk() {
      this._modifyManagerCallCenterDelegateStatus().then(val => {
        this.delegateStatusVisible = false;
        this._getManagerCallCenterDelegateList();
        this.$message({
          showClose: true,
          message: "状态修改成功",
          type: "success"
        });
      });
    },
    //打开备注弹窗
    openDelegateRemarkForm(item) {
      this.delegateRemarkVisible = true;
      this.delegateRemarkForm.delegateId = item.Id;
      this.delegateRemarkForm.delegateName = item.Name;
      this.delegateRemarkForm.sellerRemark = item.SellerRemark;
      this.delegateRemarkForm.accountRemark = item.DirectorRemark;
    },
    //修改备注确认
    modifyDelegateRemarkOk() {
      this._modifyManagerCallCenterDelegateRemark().then(val => {
        this.delegateRemarkVisible = false;
        this._getManagerCallCenterDelegateList();
        this.$message({
          showClose: true,
          message: "备注修改成功",
          type: "success"
        });
      });
    },
    //打开委托模板弹窗
    openDelegateTemplateForm(item) {
      this.delegateTemplateChecked = [];
      this.delegateTemplateExpanded = [];
      this._getManagerCallCenterDelegateTemplate(item.Id).then(val => {
        this.TagCheckList = this.TagList.filter(e=>{
          return e.IsSelect==true;
        });
        this.SourceCheckList = this.SourceList.filter(e=>{
          return e.IsSelect==true;
        });;
        console.log(this.TagList);
        this.delegateTemplateForm.DelegateName = item.Name;
        this.delegateTemplateVisible = true;
        this.delegateTemplateTime = [
          this.delegateTemplateForm.DelegateStartTime,
          this.delegateTemplateForm.DelegateEndTime
        ];
        this.delegateTemplateForm.UnitPrice =
          (this.delegateTemplateForm.UnitPrice * 1.0) / 100;
        this.delegateTemplateForm.TotalPrice =
          (this.delegateTemplateForm.TotalPrice * 1.0) / 100;
        this.delegateTemplateAge = this.parsePriceTemplateAge();
        this.delegateTemplateSex = this.parsePriceTemplateSex();
        this.delegateTemplateRange = this.parsePriceTemplateRange();
        this.delegateTemplateArea = this.parsePriceTemplateArea();
        this.delegateTemplateResList=this.parsePriceTemplateRes();
        if (this.delegateTemplateArea.visible) {
          this.delegateTemplateArea.value1.forEach(v1 => {
            if (v1.choiced) {
              this.delegateTemplateChecked.push(v1.Code);
            }
            var expanded1 = false;
            v1.List.forEach(v2 => {
              if (v2.choiced) {
                this.delegateTemplateChecked.push(v2.Code);
              }
              if (v2.choiced && !expanded1) {
                expanded1 = true;
                this.delegateTemplateExpanded.push(v1.Code);
              }
              var expanded2 = false;
              v2.List.forEach(v3 => {
                if (v3.choiced) {
                  this.delegateTemplateChecked.push(v3.Code);
                }
                if (v3.choiced && !expanded2) {
                  expanded2 = true;
                  this.delegateTemplateExpanded.push(v2.Code);
                }
              });
            });
          });
        }
        this.delegateTemplateForm.DelegateId = item.Id;
      });
    },
    modifyDelegateTemplateOk() {
      this._modifyManagerCallCenterDelegateTemplate().then(val => {
        this.delegateTemplateVisible = false;
        this._getManagerCallCenterDelegateList();
        this.$message({
          showClose: true,
          message: "委托模板修改成功",
          type: "success"
        });
      });
    },
    //变更价格模板Id
    changePriceTemplate() {
      this._getManagerCallCenterDelegateCondition().then(val => {
        this.delegateTemplateAge = this.parsePriceTemplateAge();
        this.delegateTemplateSex = this.parsePriceTemplateSex();
        this.delegateTemplateRange = this.parsePriceTemplateRange();
        this.delegateTemplateArea = this.parsePriceTemplateArea();
        this.delegateTemplateResList = this.parsePriceTemplateRes();
        this.delegateTemplateChecked = [];
        this.delegateTemplateExpanded = [];
      });
    },
    //查询委托活动列表
    _getManagerCallCenterDelegateList() {
      const params = {
        SellerName: this.sellerName,
        DelegateName: this.delegateName,
        Status: this.status,
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getManagerCallCenterDelegateList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //编辑委托活动状态
    _modifyManagerCallCenterDelegateStatus() {
      const params = {
        DelegateId: this.delegateStatusForm.delegateId,
        Status: this.delegateStatusForm.delegateStatus,
        StatusDes: this.delegateStatusForm.delegateStatusDes
      };
      return modifyManagerCallCenterDelegateStatus(params);
    },
    //编辑委托活动主管备注
    _modifyManagerCallCenterDelegateRemark() {
      const params = {
        DelegateId: this.delegateRemarkForm.delegateId,
        Remark: this.delegateRemarkForm.accountRemark
      };
      return modifyManagerCallCenterDelegateRemark(params);
    },
    //查询委托活动委托模板信息
    _getManagerCallCenterDelegateTemplate(Id) {
      const params = {
        Id: Id
      };
      return getManagerCallCenterDelegateTemplate(params).then(res => {
        this.delegateTemplateForm = res.Data;
        this.TagList = res.Data.TagList;
        this.SourceList = res.Data.SourceList;
      });
    },
    //编辑委托活动委托模板信息
    _modifyManagerCallCenterDelegateTemplate() {
      const params = {
        DelegateId: this.delegateTemplateForm.DelegateId,
        // DelegateStartTime: this.delegateTemplateTime[0],
        // DelegateEndTime: this.delegateTemplateTime[1],
        RealPersonCount: this.delegateTemplateForm.RealPersonCount,
        UnitPrice: this.delegateTemplateForm.UnitPrice * 100,
        TotalPrice: this.delegateTemplateForm.TotalPrice * 100,
        PtId: this.delegateTemplateForm.PtId,
        ConditionList: this.getConditionList(),
        DirectorRemark: this.delegateTemplateForm.DirectorRemark,
        ContactsName: this.delegateTemplateForm.ContactsName,
        SourceList:this.SourceCheckList,
        TagList:this.TagCheckList,
        ContactsMobile: this.delegateTemplateForm.ContactsMobile
      };
      return modifyManagerCallCenterDelegateTemplate(params);
    },
    //查询委托活动委托模板筛选条件
    _getManagerCallCenterDelegateCondition() {
      const params = {
        Id: this.delegateTemplateForm.PtId
      };
      return getManagerCallCenterDelegateCondition(params).then(res => {
        this.delegateTemplateForm.ConditionList = res.Data;
      });
    },
    _addManagerCallCenterDelegate() {
      const params = {
        SellerId: this.addForm.sellerId,
        Name: this.addForm.delegateName,
        Description: this.addForm.delegateContent,
        DelegateCount: this.addForm.delegateCount,
        StartTime: this.addForm.time[0],
        EndTime: this.addForm.time[1]
      };
      return addManagerCallCenterDelegate(params);
    },
    _getManagerCallCenterSellerList() {
      const params = {
        accountname: this.addForm.sellerName,
        accountphone: "",
        starttime: "",
        endtime: "",
        pageindex: 1,
        pagecount: 1000
      };
      return getManagerCallCenterSellerList(params).then(res => {
        this.sellerList = res.Data.List;
      });
    },
    //编辑委托活动
    _modifyManagerCallCenterDelegate() {
      const params = {
        Id: this.editForm.delegateId,
        Name: this.editForm.delegateName,
        Description: this.editForm.delegateContent,
        DelegateCount: this.editForm.delegateCount,
        StartTime: this.editForm.time[0],
        EndTime: this.editForm.time[1]
      };
      return modifyManagerCallCenterDelegate(params);
    }
  }
};
</script>
<style>
.el-dialog__header {
  padding-left: 5%;
}
.dialog-delegateDetails-box {
  margin-bottom: 20px;
}
.dialog-delegateDetails-box-item {
  margin-bottom: 10px;
}
.delegateTemplate-module {
  margin-top: 20px;
  margin-left: 40px;
  margin-bottom: 20px;
}
.delegateTemplate-module-item {
  margin-bottom: 10px;
}
.delegateTemplate-module-item-lable {
  width: 100px;
  float: left;
  text-align: right;
}
.sendPlace_box {
  width: 330px;
  height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #eeeeee;
}
.checkList{
  width: 100%;
  display: flex;
  margin: 15px 0;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  line-height: 40px;
}
.grow{
  background-color: #ccc;
  border: none;
  color: #fff;
}
.grow:focus {
  background: #ccc;
}
.grow:hover {
  background: #66b1ff;
}
.checkList .el-checkbox__label{
  margin-right: 15px;
}
</style>
<style>
</style>
