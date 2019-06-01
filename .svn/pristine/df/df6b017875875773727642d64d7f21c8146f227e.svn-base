<template>
  <div class="table">
    <div class="container">
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column fixed align="center" label="父母姓名">
          <template slot-scope="scope">{{scope.row.FatherName}}/{{scope.row.MotherName}}</template>
        </el-table-column>
        <el-table-column prop="ChildName" align="center" label="孩子姓名"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="联系方式"></el-table-column>
        <el-table-column align="center" label="拨打状态">
          <template slot-scope="scope">{{getCallStatus(scope.row.Status)}}</template>
        </el-table-column>
        <el-table-column prop="CallTime" align="center" label="拨打时间"></el-table-column>
        <el-table-column align="center" label="通话时长">
          <template slot-scope="scope">
            <span
              v-if="scope.row.Status==3"
            >{{scope.row.CallSecond | formatSeconds(scope.row.CallSecond)}}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电销人员">
          <template slot-scope="scope">
            <el-button type="text" @click="openAccountForm(scope.row)">{{scope.row.AccountName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="openDetail(scope.row)">跟踪信息</el-button>
            <el-button type="text" @click="openTape(scope.row)" v-if="scope.row.Status==3">听取录音</el-button>
          </template>
        </el-table-column>
      </el-table>
     <!-- 跟踪信息弹出框 -->
      <el-dialog :title="`跟踪记录-${ChildName}`" :visible.sync="editVisible" width="730px">
        <el-form ref="editForm" :model="editForm" label-width="100px">
          <div class="edittitle">电话摘要</div>
          <el-checkbox-group v-model="editForm.AbstractTagsList">
            <el-checkbox style="margin-left:30px;margin-right:30px;" disabled v-for="item in editForm.AbstractTagsList" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
          <div class="edittitle">数据摘要</div>
          <el-form-item label="家庭角色:" prop="position">
            <el-radio v-model="editForm.FamilyRole" label="0" disabled>未知</el-radio>
            <el-radio v-model="editForm.FamilyRole" label="1" disabled>爸爸</el-radio>
            <el-radio v-model="editForm.FamilyRole" label="2" disabled>妈妈</el-radio>
            <el-radio v-model="editForm.FamilyRole" label="3" disabled>其它</el-radio>
          </el-form-item>
          <el-form-item label="孩子姓名:">
            <el-input v-model="editForm.ChildName" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系地址:">
            <el-select
              v-model="editForm.Province"
              disabled
              style="float:left;width:130px;margin-right:20px;"
            ></el-select>
            <el-select
              v-model="editForm.City"
              disabled
              style="float:left;width:130px;margin-right:20px;"
            ></el-select>
            <el-select v-model="editForm.County" disabled style="float:left;width:130px;"></el-select>
          </el-form-item>
          <el-form-item label="详细地址:">
            <el-input v-model="editForm.AddressDetails" disabled></el-input>
          </el-form-item>
          <div class="edittitle">其他</div>
          <el-form-item :label="item.TypeName" v-for="item in editForm.TagList" :key="item.TypeId">
            <el-input v-model="item.TagList" disabled suffix-icon="el-icon-arrow-down"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" rows="4" v-model="editForm.Remark" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false" type="primary">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- 听取录音弹出框 -->
      <el-dialog
        :title="`听取录音-${ChildName}`"
        :visible.sync="iframeVisible"
        width="630px"
        @close="closeDialog"
      >
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
    </div>
  </div>
</template>

<script>
import {
  getManagerCallCenterDelegateCallDetailsRecordList,
  getManagerCallCenterDelegateCallDetailsRecordTrack
} from "api/entrust.js";
export default {
  name: "DelegateCallRecord",
  data() {
    return {
      Id: 0, //拨打详情Id
      tableData: [],

      editVisible: false, //跟踪信息弹出框是否显示
      editForm: {
        RecordId: 0,
        FamilyRole: "",
        ChildName: "",
        Province: "",
        City: "",
        County: "",
        AddressDetails: "",
        Remark: ""
      },
      ChildName: "",

      iframeVisible: false,
      iframeUrl: "",

      accountVisible: false,
      accountForm: {
        AccountName: "",
        AccountSex: "",
        IDCardNo: "",
        Mobile: ""
      }
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatecallrecord") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.Id = this.$route.params.id;
      this._getManagerCallCenterDelegateCallDetailsRecordList();
    },
    closeDialog() {
      var myAuto = document.getElementById("music1");
      myAuto.pause();
    },
    getCallStatus(status) {
      switch (status) {
        case 1:
          return "未接通";
          break;
        case 2:
          return "意外中断";
          break;
        case 3:
          return "完成通话";
          break;
        default:
          return "未知";
          break;
      }
    },
    // 跟踪信息
    openDetail(item) {
      this._getManagerCallCenterDelegateCallDetailsRecordTrack(item).then(
        val => {
          this.ChildName = item.ChildName;
          this.editVisible = true;
        }
      );
    },
    openTape(item) {
      this.ChildName = item.ChildName;
      this.iframeVisible = true;
      this.iframeUrl = item.RecordFile;
    },
    openAccountForm(item) {
      this.accountVisible = true;
      this.accountForm.AccountName = item.AccountName;
      this.accountForm.AccountSex = item.AccountSex == 1 ? "男" : "女";
      this.accountForm.IDCardNo = item.AccountIDCardNo;
      this.accountForm.Mobile = item.AccountMobile;
    },
    //获取用户分配到的委托名单拨打记录
    _getManagerCallCenterDelegateCallDetailsRecordList() {
      const params = {
        Id: this.Id
      };
      return getManagerCallCenterDelegateCallDetailsRecordList(params).then(
        res => {
          this.tableData = res.Data;
        }
      );
    },
    //获取委托活动拨打详情记录跟踪信息
    _getManagerCallCenterDelegateCallDetailsRecordTrack(item) {
      const params = {
        Id: item.RecordId
      };
      return getManagerCallCenterDelegateCallDetailsRecordTrack(params).then(
        res => {
          if (res.Data != null) {
            this.editForm = res.Data;
            this.editForm.FamilyRole = res.Data.FamilyRole + "";
          } else {
            this.editForm = {
              RecordId: 0,
              FamilyRole: "",
              ChildName: "",
              Province: "",
              City: "",
              County: "",
              AddressDetails: "",
              Remark: ""
            };
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.handle-box {
  width: auto;
  height: 20px;
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
.outline {
  outline: none;
  appearance: none;
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
.edittitle {
  font-weight: 900;
  margin-bottom: 10px;
  margin-top: 20px;
}
.edittitle:first-child {
  margin-top: 0;
}
</style>