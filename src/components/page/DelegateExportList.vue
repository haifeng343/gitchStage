<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="小孩姓名:">
          <el-input v-model="searchChildName" placeholder="请输入小孩姓名"></el-input>
        </el-form-item>
        <el-form-item label="业务员姓名:">
          <el-input v-model="searchAccountName" placeholder="请输入业务员姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:">
          <el-input v-model="searchMobile" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="从">
          <el-date-picker
            v-model="searchTime"
            type="datetimerange"
            :default-time="['00:00:00', '23:59:59']"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="预约状态:">
          <el-select v-model="searchStatus" placeholder="请选择">
            <el-option
              v-for="item in searchStatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送状态:">
          <el-select v-model="searchPushStatus" placeholder="请选择">
            <el-option
              v-for="item in searchPushStatusList"
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
      <label
        for
        style="float:left;color: #606266;"
      >预约中：{{appointmentCount}}人,确认到店：{{arriveCount}}人,无效：{{invalidCount}}人</label>
      <el-button type="primary" @click="openExportForm()" style="float:right;margin-bottom:5px;">导出</el-button>
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID" fixed></el-table-column>
        <el-table-column align="center" label="父/母姓名">
          <template slot-scope="scope">{{scope.row.FatherName}}/{{scope.row.MotherName}}</template>
        </el-table-column>
        <el-table-column prop="ChildName" align="center" label="孩子姓名"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="联系方式"></el-table-column>
        <el-table-column prop="Sex" align="center" label="性别">
          <template slot-scope="scope">{{scope.row.Sex==1?"男":scope.row.Sex==2?"女":"未知"}}</template>
        </el-table-column>
        <el-table-column prop="Age" align="center" label="年龄"></el-table-column>
        <el-table-column align="center" label="预约状态">
          <template slot-scope="scope">{{getStatus(scope.row.Status)}}</template>
        </el-table-column>
        <el-table-column prop="AppointmentTime" align="center" label="预约时间" width="139px;"></el-table-column>
        <el-table-column prop="ArriveTime" align="center" label="到店时间" width="139px;"></el-table-column>
        <el-table-column align="center" label="电销人员">
          <template slot-scope="scope">
            <el-button type="text" @click="openAccountForm(scope.row)">{{scope.row.AccountName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="Pushstatus" align="center" label="推送状态">
          <template slot-scope="scope">
            <el-button
              type="text"
              :class="{red:scope.row.PushStatus!=1}"
              @click="openPushStatusForm(scope.row)"
            >{{getPushStatus(scope.row.PushStatus)}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="推送时间"></el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template slot-scope="scope">
            <span v-if="scope.row.RecordFile!=null&&scope.row.RecordFile.length>0">
              <el-button type="text" @click="RecordListen(scope.row)">录音听取</el-button>
            </span>
            <el-button type="text" icon="el-icon-document-copy" @click="opencopyForm(scope.row)">复制</el-button>
            <el-button type="text" icon="el-icon-edit" @click="openRemarkForm(scope.row)">备注</el-button>
            <el-button type="text" icon="el-icon-edit" @click="openBackForm(scope.row)">回退记录</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="openDeleteForm(scope.row)"
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

      <span>公共池</span>
      <span style="float:right;">
        <el-button type="text" icon="el-icon-refresh" size="medium" @click="retry">刷新</el-button>
      </span>
      <el-table :data="tableData2" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID" fixed></el-table-column>
        <el-table-column align="center" label="父/母姓名">
          <template slot-scope="scope">{{scope.row.FatherName}}/{{scope.row.MotherName}}</template>
        </el-table-column>
        <el-table-column prop="ChildName" align="center" label="孩子姓名"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="联系方式"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="拨打人员"></el-table-column>
        <el-table-column prop="CallTime" align="center" label="拨打时间"></el-table-column>
        <el-table-column prop="CreateTime" align="center" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template slot-scope="scope">
            <span v-if="scope.row.RecordFile!=null&&scope.row.RecordFile.length>0">
              <el-button type="text" @click="RecordListen(scope.row)">录音听取</el-button>
            </span>
            <el-button type="text" @click="openRepushStatusForm(scope.row)">转出</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deletePushCommon(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount2"
        ></el-pagination>
      </div>
    </div>
    <!--复制-->
    <el-dialog :title="titletup" class="cascader" :visible.sync="copyVisible" width="600px">
      <label>目标：</label>
      <el-select v-model="selected" placeholder="请选择">
        <el-option v-for="item in selectList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
      </el-select>
      <el-checkbox-group v-model="tagCheckList2" v-if="selected==1" style="margin-top:20px">
        <el-checkbox
          v-for="item in tagList2"
          v-model="item.IsSelect"
          :label="item"
          :key="item.DelegateTagId"
          style="margin-right:10px"
        >{{item.DelegateTagName}}</el-checkbox>
      </el-checkbox-group>
      <div v-if="selected==2" style="margin-top:15px">
        <el-input
          v-model="exportName"
          placeholder="搜索商家内容"
          style="width:476px;text-align:center;margin-right:20px"
          icon="el-icon-search"
        ></el-input>
        <el-button @click="exportSearch" type="primary">搜 索</el-button>
        <el-checkbox v-model="type" style="margin-top:15px">按委托标签搜索（）</el-checkbox>
        <div class="cascaderDiv" style="margin-top:15px">
          <el-cascader-panel
            :options="options"
            v-model="optionValue"
            :props="props"
            @change="changeData"
          ></el-cascader-panel>
        </div>
      </div>
      <p style="margin-top: 20px;">复制到：{{selected==1?'系统公共池':exportValue}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="copyVisible = false">取 消</el-button>
        <el-button type="primary" @click="copySure">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 业务员弹出框 -->
    <el-dialog
      :title="`业务员-${accountForm.AccountName}`"
      :visible.sync="accountVisible"
      width="550px"
    >
      <div class="dialog-box">
        <label for class="dialog-box-lable">业务员姓名：</label>
        <el-input style="width:350px;" v-model="accountForm.AccountName" disabled></el-input>
      </div>
      <div class="dialog-box">
        <label for class="dialog-box-lable">性别：</label>
        <el-input style="width:350px;" v-model="accountForm.AccountSex" disabled></el-input>
      </div>
      <div class="dialog-box">
        <label for class="dialog-box-lable">身份证号：</label>
        <el-input style="width:350px;" v-model="accountForm.IDCardNo" disabled></el-input>
      </div>
      <div class="dialog-box">
        <label for class="dialog-box-lable">联系方式：</label>
        <el-input style="width:350px;" v-model="accountForm.Mobile" disabled></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="accountVisible = false" size="medium">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 备注弹出框 -->
    <el-dialog :title="`备注-${remarkForm.AccountName}`" :visible.sync="remarkVisible" width="550px">
      <div class="dialog-box">
        <label for class="dialog-box-lable">商家备注：</label>
        <el-input
          type="textarea"
          rows="6"
          style="width:350px;"
          v-model="remarkForm.SellerRemark"
          disabled
        ></el-input>
      </div>
      <div class="dialog-box">
        <label for class="dialog-box-lable">电销备注：</label>
        <el-input type="textarea" rows="6" style="width:350px;" v-model="remarkForm.AccountRemark"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remarkVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="remarkFormOk()" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 导出弹出框 -->
    <el-dialog title="导出到文件" :visible.sync="exportVisible" width="580px">
      <span class="exporttitle">导出选项</span>
      <el-checkbox-group v-model="exportValue">
        <el-checkbox label="1" style="width:125px;height:50px;">父/母姓名</el-checkbox>
        <el-checkbox label="2" style="width:125px;height:50px;">孩子姓名</el-checkbox>
        <el-checkbox label="3" style="width:125px;height:50px;">性别</el-checkbox>
        <el-checkbox label="4" style="width:125px;height:50px;">年龄</el-checkbox>
        <el-checkbox label="5" style="width:125px;height:50px;">联系方式</el-checkbox>
        <el-checkbox label="6" style="width:125px;height:50px;">预约状态</el-checkbox>
        <el-checkbox label="7" style="width:125px;height:50px;">预约时间</el-checkbox>
        <el-checkbox label="8" style="width:125px;height:50px;">到店时间</el-checkbox>
        <el-checkbox label="9" style="width:125px;height:50px;">推送时间</el-checkbox>
        <el-checkbox label="10" style="width:125px;height:50px;">录音文件</el-checkbox>
      </el-checkbox-group>

      <span class="exporttitle">其他选项</span>
      <div style="margin-left:0px;">
        <el-checkbox v-model="passwordChecked">压缩文件</el-checkbox>
        <label for style="margin-left:20px;">解压密码：</label>
        <el-input style="width:280px;" v-model="exportPassword" :disabled="!passwordChecked"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="exportVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="exportFormOk" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 听取录音弹出框 -->
    <el-dialog title="听取录音" :visible.sync="iframeVisible" width="630px" @close="closeDialog">
      <audio
        :src="iframeUrl"
        style="width:500px;display:block; margin:10px auto"
        autoplay="autoplay"
        controls="controls"
        class="outline"
        preload
        id="music1"
      ></audio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iframeVisible = false" type="primary" size="medium">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 回退记录弹出框 -->
    <el-dialog title="回退记录" :visible.sync="backVisible" width="630px">
      <el-table :data="backForm" fixed border ref="multipleTable">
        <el-table-column prop="Reason" align="center" label="原因" fixed></el-table-column>
        <el-table-column prop="Description" align="center" label="描述"></el-table-column>
        <el-table-column prop="CreateTime" align="center" label="回退时间"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="back_handleSizeChange"
          @current-change="back_handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, prev, pager, next"
          :total="back_pageCount"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backVisible = false" size="medium" type="primary">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹出框 -->
    <el-dialog :title="`删除名单-${deleteForm.ChildName}`" :visible.sync="deleteVisible" width="630px">
      <div class="delete_dialog_div">
        <span>确定删除[{{deleteForm.ChildName}}]的意向名单吗？</span>
      </div>
      <div class="delete_dialog_div">
        <el-radio v-model="deleteForm.IsTrace" label="1">退回到跟进名单</el-radio>
        <el-radio v-model="deleteForm.IsTrace" label="2">退回到未预约名单</el-radio>
      </div>
      <div class="delete_dialog_div">
        <span>原因：</span>
        <el-select v-model="deleteForm.SelectedReason" placeholder="请选择">
          <el-option v-for="item in deleteFormReason" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div style="position:relative">
        <span class="text1">描述：</span>
        <el-input
          class="textarea1"
          type="textarea"
          rows="6"
          v-model="deleteForm.Description"
          placeholder="请输入内容"
          style="width:500px;"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="deleteFormOk()" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 谁送状态弹出框 -->
    <el-dialog
      :title="`推送状态-${pushStatusForm.childName}`"
      :visible.sync="pushStatusVisible"
      width="700px"
    >
      <el-form :inline="true" class="demo-form-inline" ref="pushStatusForm" :model="pushStatusForm">
        <el-form-item label="导出人员：" label-width="120px" prop="pushAccount">
          <div style="width:300px;">{{pushStatusForm.pushAccount}}</div>
        </el-form-item>
        <el-form-item label="建议推送至：" label-width="120px" prop="pushStore">
          <div style="width:300px;">{{pushStatusForm.pushStore}}</div>
        </el-form-item>
        <el-form-item label="推送状态：" label-width="120px" prop="pushStatus">
          <el-select v-model="pushStatusForm.pushStatus" placeholder="请选择" style="width:300px;">
            <el-option
              v-for="item in pushStatusForm.pushStatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="委托标签:"
          label-width="120px"
          v-if="pushStatusForm.pushStatus==4 || pushStatusForm.pushStatus==5"
        >
          <el-checkbox-group v-model="tagCheckList" style="width:300px">
            <el-checkbox
              v-for="item in tagList"
              v-model="item.IsSelect"
              :label="item"
              :key="item.DelegateTagId"
              style="margin-right:10px"
            >{{item.DelegateTagName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="推送至："
          label-width="120px"
          prop="storeId"
          v-if="pushStatusForm.pushStatus==3 || pushStatusForm.pushStatus==4"
        >
          <el-input v-model="storeValue" style="width:300px;margin-bottom:10px" disabled></el-input>
          <i
            style="position:absolute;right:10px;top:12px;cursor: pointer;"
            class="el-icon-arrow-down"
            @click="dropDown"
          ></i>
          <div class="capos" v-if="onShow">
            <el-input
              v-model="exportName"
              placeholder="搜索商家内容"
              style="width:214px;margin-right:20px"
              icon="el-icon-search"
            ></el-input>
            <el-button @click="exportSearchName" type="primary">搜 索</el-button>
            <el-checkbox v-model="typeId">按建议推送至门店</el-checkbox>
            <el-cascader-panel
              :options="optionsAll"
              v-model="pushStatusForm.storeId"
              :props="pushStatusForm.props"
              @change="changeName"
            ></el-cascader-panel>
          </div>
          <!-- <el-cascader
            :options="pushStatusForm.storeIdList"
            v-model="pushStatusForm.storeId"
            :props="pushStatusForm.props"
            style="width:300px;"
            :disabled="pushStatusForm.pushStatus!=3"
          ></el-cascader>-->
        </el-form-item>
        <el-form-item label="备注：" label-width="120px">
          <el-input type="textarea" rows="6" style="width:300px;" v-model="pushStatusForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pushStatusVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="pushStatusFormOk()" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 公共池重新转出弹出框 -->
    <el-dialog
      :title="`转出-${repushStatusForm.childName}`"
      :visible.sync="repushStatusVisible"
      width="630px"
    >
      <el-form
        :inline="true"
        class="demo-form-inline"
        ref="repushStatusForm"
        :model="repushStatusForm"
      >
        <el-form-item label="推送状态：" label-width="120px" prop="pushStatus">
          <el-input style="width:300px;" v-model="repushStatusForm.pushStatus" disabled></el-input>
        </el-form-item>
        <el-form-item label="推送至：" label-width="120px" prop="storeId">
          <el-cascader
            :options="repushStatusForm.storeIdList"
            v-model="repushStatusForm.storeId"
            :props="repushStatusForm.props"
            style="width:300px;"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="备注：" label-width="120px">
          <el-input type="textarea" rows="6" style="width:300px;" v-model="repushStatusForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="repushStatusVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="repushStatusFormOk()" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getManagerCallCenterDelegateExportList,
  deleteManagerCallCenterDelegateExport,
  modifyManagerCallCenterDelegateExportRemark,
  getManagerCallCenterDelegateExportList2,
  getManagerCallCenterDelegateExportBackRecordList,
  getManagerCallCenterDelegateExportDeleteReasonList,
  getManagerCallCenterDelegateRelList,
  modifyManagerCallCenterDelegateExportStatus,
  getManagerCallCenterDelegateCommonList,
  deleteManagerCallCenterDelegateCommon,
  modifyManagerCallCenterDelegateExportCommon
} from "api/entrust.js";
export default {
  name: "DelegateExportList",
  data() {
    return {
      delegateId: 0,
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数
      appointmentCount: 0,
      arriveCount: 0,
      invalidCount: 0,
      copyVisible: false,
      titletup: "",
      exportName: "", //搜索导出名单商家
      options: [], //级联数据
      optionValue: ["", "", ""], //选中的值
      Id: "",
      props: {
        value: "Id",
        label: "Name",
        children: "Children"
      },
      storeValue: "", //推送 选中的值
      typeId: true, //按建议推送至门店
      searchChildName: "",
      searchAccountName: "",
      searchMobile: "",
      searchTime: [],
      searchStatus: 0,
      searchStatusList: [
        { id: 0, name: "全部" },
        { id: 1, name: "潜在客户" },
        { id: 2, name: "预约中" },
        { id: 3, name: "确认到店" },
        { id: 4, name: "确认成交" },
        { id: 5, name: "无效" }
      ],
      searchPushStatus: 0,
      searchPushStatusList: [
        { id: 0, name: "全部" },
        { id: 1, name: "直接推送" },
        { id: 2, name: "需主管确认" },
        { id: 3, name: "推送至其他门店" }
      ],
      accountVisible: false,
      accountForm: {
        AccountName: "",
        AccountSex: "",
        IDCardNo: "",
        Mobile: ""
      },
      remarkVisible: false,
      remarkForm: {
        AccountName: "",
        Id: 0,
        sellerRemark: "",
        AccountRemark: ""
      },
      exportVisible: false,
      passwordChecked: true,
      exportPassword: "",
      exportValue: [],
      exportFilePath: "",
      exportFileName: "",
      iframeVisible: false,
      iframeUrl: "",
      backVisible: false,
      back_cur_page: 1, //页码
      back_pagesize: 30, //每页数量
      back_pageCount: 0, //总条数
      backForm: [],
      back_detailsId: 0,
      deleteVisible: false,
      deleteForm: {
        Id: 0,
        ChildName: "",
        IsTrace: false,
        Description: "",
        SelectedReason: ""
      },
      deleteFormReason: [],
      pushStatusVisible: false,
      pushStatusForm: {
        exportId: "",
        childName: "",
        pushStatus: "",
        pushStatusList: [
          { id: 1, name: "直接推送" },
          { id: 2, name: "需主管确认" },
          { id: 3, name: "推送至门店" },
          { id: 4, name: "意向委托" },
          { id: 5, name: "系统公共池" }
        ],
        props: {
          value: "Id",
          children: "Children",
          label: "Name"
        },
        storeId: ["", "", ""],
        storeIdList: [],
        remark: "",
        pushAccount: "",
        pushStore: ""
      },
      repushStatusVisible: false,
      repushStatusForm: {
        commonId: "",
        childName: "",
        pushStatus: "推送至门店",
        props: {
          value: "Id",
          children: "Children",
          label: "Name"
        },
        storeId: ["", "", ""],
        storeIdList: [],
        remark: ""
      },
      tableData2: [], //列表数据
      cur_page2: 1, //页码
      pagesize2: 30, //每页数量
      pageCount2: 0, //总条数
      exportValue: "", //复制到
      type: true, //默认选中
      typeCheck: 0, //Type 2
      tagCheckList: [],
      tagList: [],
      tagCheckList2: [],
      tagList2: [],
      onShow: false,
      typeRelCheck: 1, //推送默认选中
      optionsAll: [],
      selectList: [{ Id: 1, Name: "系统公共池" }, { Id: 2, Name: "其他门店" }],
      selected: 2
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegateexportlist") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    dropDown() {
      this.onShow = !this.onShow;
    },
    changeName(value) {
      console.log(this.pushStatusForm.storeId);
      // this.storeId = this.pushStatusForm.storeId
      // if (this.pushStatusForm.storeId.length < 3) {
      //   this.$message.error('');
      //   return;
      // }
      // let arr = [];
      // let a = this.options.filter(x => {
      //   return x.Id == this.pushStatusForm.storeId[0];
      // });
      // a = a[0];
      // arr.push(a.Name);
      // if (a.Children.length > 0) {
      //   let b = a.Children.filter(y => {
      //     return y.Id == this.pushStatusForm.storeId[1];
      //   });
      //   b = b[0];
      //   arr.push(b.Name);
      //   if (b.Children.length > 0) {
      //     let c = b.Children.filter(z => {
      //       return z.Id == this.pushStatusForm.storeId[2];
      //     });
      //     c = c[0];
      //     arr.push(c.Name);
      //   }
      // }
      // this.storeValue = arr.join('/');
    },
    changeData(value) {
      if (this.optionValue.length < 3) {
        this.$message.error("");
        return;
      }
      let arr = [];
      let a = this.options.filter(x => {
        return x.Id == this.optionValue[0];
      });
      a = a[0];
      arr.push(a.Name);
      if (a.Children.length > 0) {
        let b = a.Children.filter(y => {
          return y.Id == this.optionValue[1];
        });
        b = b[0];
        arr.push(b.Name);
        if (b.Children.length > 0) {
          let c = b.Children.filter(z => {
            return z.Id == this.optionValue[2];
          });
          c = c[0];
          arr.push(c.Name);
        }
      }
      this.exportValue = arr.join("/");
    },
    //复制
    opencopyForm(item) {
      this.Id = item.Id;
      this.tagList2 = item.TagList;
      if(item.TagList!=null){
        this.tagCheckList2 = item.TagList.filter(e => {
          return e.IsSelect == true;
        });
      }else{
        this.tagCheckList2 =[];
      }
      this.titletup = "复制-" + item.FatherName + "/" + item.MotherName;
      this.copyVisible = true;
      if (this.type == true) {
        this.typeCheck = 2;
      } else {
        this.typeCheck = 0;
      }
      this._DelegateRelList(this.Id, this.typeCheck, this.exportName).then(
        res => {
          this.options = res.Data;
        }
      );
    },
    //推送状态搜索
    exportSearchName() {
      if (this.typeId == true) {
        this.typeRelCheck = 1;
      } else {
        this.typeRelCheck = 0;
      }
      this._DelegateRelList(this.Id,this.typeRelCheck,this.exportName).then(res=>{
        this.optionsAll = res.Data;
      });
    },
    //复制搜索
    exportSearch() {
      if (this.type == true) {
        this.typeCheck = 2;
      } else {
        this.typeCheck = 0;
      }
      this._DelegateRelList(this.Id, this.typeCheck, this.exportName).then(
        res => {
          this.options = res.Data;
        }
      );
    },
    //级联
    _DelegateRelList(Id, type, exportName) {
      const params = {
        Id: Id,
        Type: type,
        SellerName: exportName
      };
      return getManagerCallCenterDelegateRelList(params);
    },
    copySure() {
      const params = {
        Id: this.Id,
        PushStatus: 5,
        PushDelegateId: this.selected == 1 ? 0 : this.optionValue[1],
        PushAccountId: this.selected == 1 ? 0 : this.optionValue[2],
        Remark: "",
        TagList: this.selected == 2 ? [] : this.tagCheckList2
      };
      this._modifyManagerCallCenterDelegateExportStatus(params).then( res => {
        this.$message({
          message:"复制成功",
          type:"success",
          showClose:true
        })
        this.copyVisible = false;
      })
    },
    init() {
      this.delegateId = this.$route.params.id;
      this._getManagerCallCenterDelegateExportList();
      this._getManagerCallCenterDelegateCommonList();
    },
    RecordListen(item) {
      this.iframeVisible = true;
      this.iframeUrl = item.RecordFile;
    },
    closeDialog() {
      var myAuto = document.getElementById("music1");
      myAuto.pause();
    },
    openExportForm() {
      this.exportVisible = true;
      this.passwordChecked = true;
      this.exportPassword = "";
      this.exportValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
      this.exportFilePath = "";
      this.exportFileName = "";
    },
    exportFormOk() {
      this._getManagerCallCenterDelegateExportList2().then(val => {
        this.exportVisible = false;
        window.location.href = this.exportFilePath;
      });
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return "潜在客户";
        case 2:
          return "预约中";
        case 3:
          return "确认到店";
        case 4:
          return "确认成交";
        case 5:
          return "无效";
        default:
          return "未知";
      }
    },
    getPushStatus(status) {
      switch (status) {
        case 1:
          return "直接推送";
        case 2:
          return "需主管确认";
        case 3:
          return "推送到门店";
        default:
          return "未知";
      }
    },
    //直接推送
    openPushStatusForm(item) {
      console.log(item);
      this.tagList = item.TagList;
      this.tagCheckList = item.TagList.filter(e => {
        return e.IsSelect == true;
      });
      this.pushStatusVisible = true;
      this._getManagerCallCenterDelegateRelList(item.SellerId).then(res => {
        res.Data.forEach(item => {
          item.Children.forEach(item2 => {
            item2.Children.unshift({ Id: 0, Name: "公共池" });
          });
        });
        this.optionsAll = res.Data;
      });
      this.pushStatusForm.childName = item.ChildName;
      this.pushStatusForm.pushStatus = item.PushStatus;
      this.pushStatusForm.remark = item.AccountRemark;
      this.pushStatusForm.exportId = item.Id;
      this.pushStatusForm.pushAccount = item.AccountName;
      this.pushStatusForm.pushStore = item.PushStore;
    },
    pushStatusFormOk() {
      this.$refs["pushStatusForm"].validate(valid => {
        if (valid) {
          const params = {
            Id: this.pushStatusForm.exportId,
            PushStatus:
              this.pushStatusForm.pushStatus == 5
                ? 4
                : this.pushStatusForm.pushStatus,
            PushDelegateId:
              this.pushStatusForm.pushStatus == 5
                ? 0
                : this.pushStatusForm.storeId[1],
            PushAccountId:
              this.pushStatusForm.pushStatus == 5
                ? 0
                : this.pushStatusForm.storeId[2],
            Remark: this.pushStatusForm.remark,
            TagList: this.tagCheckList
          };
          this._modifyManagerCallCenterDelegateExportStatus(params).then(
            val => {
              this.pushStatusVisible = false;
              this._getManagerCallCenterDelegateExportList();
            }
          );
        } else {
          return false;
        }
      });
    },
    openRepushStatusForm(item) {
      this.repushStatusVisible = true;
      this._getManagerCallCenterDelegateRelList(item.SellerId).then(res => {
        res.Data.forEach(item => {
          item.Children.forEach(item2 => {
            item2.Children.unshift({ Id: 0, Name: "公共池" });
          });
        });
        this.repushStatusForm.storeIdList = res.Data;
      });
      this.repushStatusForm.childName = item.ChildName;
      this.repushStatusForm.remark = item.Remark;
      this.repushStatusForm.commonId = item.Id;
    },
    repushStatusFormOk() {
      this.$refs["repushStatusForm"].validate(valid => {
        if (valid) {
          this._modifyManagerCallCenterDelegateExportCommon().then(val => {
            this.repushStatusVisible = false;
            this._getManagerCallCenterDelegateCommonList();
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
      this._getManagerCallCenterDelegateExportList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateExportList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateExportList();
    },
    openAccountForm(item) {
      this.accountVisible = true;
      this.accountForm.AccountName = item.AccountName;
      this.accountForm.AccountSex = item.AccountSex == 1 ? "男" : "女";
      this.accountForm.IDCardNo = item.AccountIDCardNo;
      this.accountForm.Mobile = item.AccountMobile;
    },
    openRemarkForm(item) {
      this.remarkVisible = true;
      this.remarkForm.Id = item.Id;
      this.remarkForm.AccountName = item.ChildName;
      this.remarkForm.SellerRemark = item.SellerRemark;
      this.remarkForm.AccountRemark = item.AccountRemark;
    },
    remarkFormOk() {
      this._modifyManagerCallCenterDelegateExportRemark().then(val => {
        this.remarkVisible = false;
        this._getManagerCallCenterDelegateExportList();
        this.$message({
          showClose: true,
          message: "备注修改成功",
          type: "success"
        });
      });
    },
    openBackForm(item) {
      this.back_detailsId = item.DetailsId;
      this._getManagerCallCenterDelegateExportBackRecordList().then(val => {
        this.backVisible = true;
      });
    },
    //分页导航尺寸更改
    back_handleSizeChange(val) {
      this.back_pagesize = val;
      this._getManagerCallCenterDelegateExportBackRecordList();
    },
    // 分页导航
    back_handleCurrentChange(val) {
      this.back_cur_page = val;
      this._getManagerCallCenterDelegateExportBackRecordList();
    },
    openDeleteForm(item) {
      this._getManagerCallCenterDelegateExportDeleteReasonList().then(val => {
        this.deleteVisible = true;
        this.deleteForm.Id = item.Id;
        this.deleteForm.ChildName = item.ChildName;
        this.deleteForm.IsTrace = "1";
        this.deleteForm.SelectedReason = "";
        this.deleteForm.Description = "";
      });
    },
    deleteFormOk() {
      this._deleteManagerCallCenterDelegateExport().then(val => {
        this.deleteVisible = false;
        this._getManagerCallCenterDelegateExportList();
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success"
        });
      });
    },
    retry() {
      this.cur_page2 = 1;
      this._getManagerCallCenterDelegateCommonList();
    },
    //分页导航尺寸更改
    handleSizeChange2(val) {
      this.pagesize2 = val;
      this._getManagerCallCenterDelegateCommonList();
    },
    // 分页导航
    handleCurrentChange2(val) {
      this.cur_page2 = val;
      this._getManagerCallCenterDelegateCommonList();
    },
    deletePushCommon(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._deleteManagerCallCenterDelegateCommon(item.Id).then(val => {
          this._getManagerCallCenterDelegateCommonList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    //获取委托活动导出列表
    _getManagerCallCenterDelegateExportList() {
      const params = {
        DelegateId: this.delegateId,
        ChildName: this.searchChildName,
        AccountName: this.searchAccountName,
        Mobile: this.searchMobile,
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        StartTime: this.searchTime == null ? "" : this.searchTime[0],
        EndTime: this.searchTime == null ? "" : this.searchTime[1],
        Status: this.searchStatus,
        PushStatus: this.searchPushStatus
      };
      return getManagerCallCenterDelegateExportList(params).then(res => {
        this.tableData = res.Data.List;
        this.appointmentCount = res.Data.AppointmentCount;
        this.arriveCount = res.Data.ArriveCount;
        this.invalidCount = res.Data.InvalidCount;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //获取委托活动导出列表(导出用)
    _getManagerCallCenterDelegateExportList2() {
      const params = {
        DelegateId: this.delegateId,
        ChildName: this.searchChildName,
        AccountName: this.searchAccountName,
        Mobile: this.searchMobile,
        ColumnList: this.exportValue,
        Password: this.exportPassword,
        SavePath: this.exportFileName,
        Zip: this.passwordChecked,
        StartTime: this.searchTime == null ? "" : this.searchTime[0],
        EndTime: this.searchTime == null ? "" : this.searchTime[1]
      };
      return getManagerCallCenterDelegateExportList2(params).then(res => {
        this.exportFilePath = res.Data;
      });
    },
    //删除委托活动导出列表
    _deleteManagerCallCenterDelegateExport() {
      const params = {
        Id: this.deleteForm.Id,
        IsTrace: this.deleteForm.IsTrace == "1" ? true : false,
        Reason: this.deleteForm.SelectedReason,
        Description: this.deleteForm.Description
      };
      return deleteManagerCallCenterDelegateExport(params);
    },
    //修改委托活动导出列表电销人员备注
    _modifyManagerCallCenterDelegateExportRemark() {
      const params = {
        Id: this.remarkForm.Id,
        Remark: this.remarkForm.AccountRemark
      };
      return modifyManagerCallCenterDelegateExportRemark(params);
    },
    //获取委托导出名单回退记录列表
    _getManagerCallCenterDelegateExportBackRecordList() {
      const params = {
        Id: this.back_detailsId,
        pageindex: this.back_cur_page,
        pagecount: this.back_pagesize
      };
      return getManagerCallCenterDelegateExportBackRecordList(params).then(
        res => {
          this.backForm = res.Data.List;
          this.back_pageCount = res.Data.TotalCount;
        }
      );
    },
    _getManagerCallCenterDelegateExportDeleteReasonList() {
      return getManagerCallCenterDelegateExportDeleteReasonList().then(res => {
        this.deleteFormReason = res.Data;
      });
    },
    //查询商家关联商家列表
    _getManagerCallCenterDelegateRelList(id) {
      const params = {
        Id: id
      };
      return getManagerCallCenterDelegateRelList(params);
    },
    //修改委托活动导出列表推送状态
    _modifyManagerCallCenterDelegateExportStatus(params) {
      return modifyManagerCallCenterDelegateExportStatus(params);
    },
    //查询委托公共池数据列表
    _getManagerCallCenterDelegateCommonList() {
      const params = {
        Id: this.delegateId,
        pageindex: this.cur_page2,
        pagecount: this.pagesize2
      };
      return getManagerCallCenterDelegateCommonList(params).then(res => {
        this.tableData2 = res.Data.List;
        this.pageCount2 = res.Data.TotalCount;
      });
    },
    //删除委托公共池数据
    _deleteManagerCallCenterDelegateCommon(id) {
      const params = {
        Id: id
      };
      return deleteManagerCallCenterDelegateCommon(params);
    },
    //公共池转出
    _modifyManagerCallCenterDelegateExportCommon() {
      const params = {
        CommonId: this.repushStatusForm.commonId,
        PushDelegateId: this.repushStatusForm.storeId[1],
        PushAccountId: this.repushStatusForm.storeId[2],
        Remark: this.repushStatusForm.remark
      };
      return modifyManagerCallCenterDelegateExportCommon(params);
    }
  }
};
</script>
<style scoped lang="less">
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
.el-checkbox {
  margin-right: 0 !important;
}
.text1 {
  position: absolute;
  top: 50%;
}
.textarea1 {
  position: relative;
  left: 46px;
}
.delete_dialog_div {
  margin-bottom: 30px;
}
.exporttitle {
  position: relative;
  left: -17px;
  top: -13px;
  font-weight: 700;
  font-size: 110%;
}
.exporttitle::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 15px;
  background-color: #3a8ee6;
  top: 1px;
  left: -8px;
}
.capos {
  width: 300px;
}
.el-cascader-panel.is-bordered {
  border: none;
}
</style>
<style>
.el-checkbox__label {
  margin-right: 10px;
}
</style>
