<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="sendStatus" placeholder="请输入审核状态">
            <el-option
              v-for="item in  sendStatusList"
              :label="item.label"
              :value="item.Id"
              :key="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
        <el-button type="primary" @click="add" style="float:right">创建任务</el-button>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="FamilyId" align="center" label="ID"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="任务名称"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="模板名称"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="状态"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="第三方状态"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="完成时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary">取消发送</el-button>
            <el-button type="primary">暂停发送</el-button>
            <el-button type="primary">恢复发送</el-button>
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="access(scope.row)">访问详情</el-button>
            <el-button type="text" @click="send(scope.row)">发送详情</el-button>
            <el-button class="red" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>

      <!--创建任务-->
      <el-dialog title="创建任务" :visible.sync="addVisible" width="700px">
        <el-form
          :model="addForm"
          :rules="addrules"
          ref="addForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择短信模板：" prop="smsTemplate">
            <el-select v-model="addForm.smsTemplate" style="width:360px">
              <el-option
                v-for="item in selectList"
                :key="item.Id"
                :label="item.label"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="liner"></div>
          <p class="sendTitle">发送选项</p>
          <el-form-item label="年龄：" prop="age">
            <label class="ageLabel">从</label>
            <el-select v-model="age1" style="width:150px">
              <el-option
                v-for="item in ageList"
                :key="item.Id"
                :label="item.label+'岁'"
                :value="item.Id"
              ></el-option>
            </el-select>
            <label class="ageLabel">到</label>
            <el-select v-model="age2" style="width:150px">
              <el-option
                v-for="item in ageList"
                :key="item.Id"
                :label="item.label+'岁'"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="sexId" style="width:360px">
              <el-option
                v-for="item in sexList"
                :key="item.Id"
                :label="item.label"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送地区：" prop="area">
            <div class="address">
              <el-tree
                :data="area.value1"
                show-checkbox
                node-key="Code"
                ref="tree"
                :default-expand-all="true"
                :props="defaultProps"
                @check="conditionChange"
                style="width:330px;float:left;"
              ></el-tree>
            </div>
          </el-form-item>
          <el-checkbox v-model="addr" class="addrPotion"></el-checkbox>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="addForm.address" :disabled="addr==false" style="width:276px"></el-input>
            <el-button plain :disabled="addr==false">选择地址</el-button>
          </el-form-item>
          <el-form-item label="半径范围：" prop="radius">
            <el-select v-model="sexId" :disabled="addr==false" style="width:360px">
              <el-option
                v-for="item in radiusList"
                :key="item.Id"
                :label="item.label+'公里'"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="liner"></div>
          <p class="sendTitle">发送标签</p>
          <div>
            <el-checkbox-group v-model="addForm.checked" class="checkList">
              <el-checkbox v-for="city in checkList" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="liner"></div>
          <p class="sendTitle">其他选项</p>
          <el-radio v-model="radio0" label="0">单次发送</el-radio>
          <br>
          <el-radio
            v-model="radio"
            :disabled="radio0 ==1"
            label="1"
            style="margin:20px 0;margin-left:20px;"
          >即刻发送</el-radio>
          <el-radio v-model="radio" :disabled="radio0 ==1" label="2">定时发送</el-radio>
          <el-date-picker
            v-model="value2"
            :disabled="radio0 ==1"
            v-if="radio==2"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
          <br>
          <el-radio v-model="radio0" label="1" style="margin:10px 0 20px 0">
            每
            <el-input :disabled="radio0==0" v-model="day" style="width:60px"></el-input>日,总共发送
            <el-input :disabled="radio0==0" v-model="count" style="width:60px"></el-input>次
          </el-radio>
          <br>定时发送：
          <el-time-picker
            :disabled="radio0==0"
            v-model="value3"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
          <el-form-item label="单次发送数量：" prop="number" style="margin-top:20px;margin-left:-50px">
            <el-input v-model="addForm.number"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked">是否循环</el-checkbox>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noAdd">取 消</el-button>
          <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { smsTaskList } from "api/userdata.js";
export default {
  data() {
    return {
      List: [],
      pageCount: 0,
      pageSize: 30,
      currentPage: 1,
      loading: false,
      addVisible: false,
      formInline: {
        name: ""
      },
      addr: false, //控制是否输入地址
      sendStatus: "", //发送状态
      sendStatusList: [
        { Id: 0, label: "全部" },
        { Id: 1, label: "待发送" },
        { Id: 2, label: "正在发送" },
        { Id: 3, label: "取消发送" },
        { Id: 4, label: "发送已完成" },
        { Id: 5, label: "暂停发送" }
      ],
      optionId: "",
      age1: "",
      age2: "",
      sexId: "",
      value1: "",
      defaultProps: {
        children: "Children",
        label: "Name"
      },
      checked: "",
      radio0: "",
      radio: "",
      value2: "",
      day: "",
      count: "",
      value3: "",
      selectList: [
        { Id: 1, label: "全部" },
        { Id: 2, label: "一部分" },
        { Id: 3, label: "小部分" }
      ],
      sexList: [
        { Id: 1, label: "全部" },
        { Id: 2, label: "男" },
        { Id: 3, label: "女" }
      ],
      ageList: [
        { Id: 1, label: "0" },
        { Id: 2, label: "1" },
        { Id: 3, label: "2" },
        { Id: 4, label: "3" },
        { Id: 5, label: "4" },
        { Id: 6, label: "5" }
      ],
      radiusList: [
        { Id: 1, label: "0" },
        { Id: 2, label: "1" },
        { Id: 3, label: "2" },
        { Id: 4, label: "3" },
        { Id: 5, label: "4" },
        { Id: 6, label: "5" }
      ],
      area: {}, //区域
      checkList: ["上海", "北京", "广州", "深圳"],
      addForm: {
        name: "",
        smsTemplate: "",
        signature: "",
        smsLink: "",
        smsContent: "",
        area: "",
        address: "",
        radius: "",
        checked: ["上海"],
        number: ""
      },
      addrules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        smsTemplate: [
          { required: true, message: "请选择短信模板", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this._smsTaskList();
  },
  methods: {
    //获取任务列表
    _smsTaskList() {
      const parmas = {
        OrderName: this.formInline.name,
        SendStatus: this.sendStatus,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      smsTaskList(parmas).then(res => {
        this.List = res.Data.List;
        console.log(res);
        this.pageCount = res.Data.TotalCount;
      });
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pageSize = val;
      this.loading = true;
      this._smsTaskList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this._smsTaskList();
    },
    search() {
      this._smsTaskList();
      this.currentPage = 1;
    },
    add() {
      this.addVisible = true;
    },
    //条件变化
    conditionChange() {},
    //
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    noAdd() {
      this.addVisible = false;
      this.editVisible = false;
      this.$refs["addForm"].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.grow {
  background-color: #d4d4d4;
  color: #ffffff;
}
.text2 {
  font-size: 12px;
  color: #ccc;
  text-align: right;
}
.three tr {
  height: 30px;
  line-height: 30px;
}
.liner {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  background-color: #f6f6f6;
}
.sendTitle {
  text-align: left;
  font-size: 18px;
  margin: 40px 0 10px 0;
  position: relative;
  left: -50px;
}
.ageLabel {
  width: 23px;
  text-align: center;
  display: inline-block;
}
.address {
  width: 358px !important;
  height: 370px;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid #ccc;
  position: relative;
}
.checkList .el-checkbox {
  margin-left: 15px !important;
  margin-bottom: 15px;
}
.checkList .el-form-item__content {
  margin-left: 0 !important;
}
.addrPotion {
  position: relative;
  right: -60px;
  bottom: -24px;
}
</style>
