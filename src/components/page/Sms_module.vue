<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="模板名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.Status" placeholder="请输入审核状态">
            <el-option v-for="item in statusList" :key="item.Id" :label="item.name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
        <el-button type="primary" @click="add" style="float:right">添加模板</el-button>
      </el-form>

      <el-table v-loading="loading" :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="TemplateSysId" align="center" label="ID"></el-table-column>
        <el-table-column prop="TemplateName" align="center" label="模板名称"></el-table-column>
        <el-table-column prop="SignId" align="center" label="签名"></el-table-column>
        <el-table-column prop="SmsContent" align="center" label="短信内容"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{scope.row.ExamineState | ExamineState}}
          </template>
        </el-table-column>
        <el-table-column prop="ExamineFailReason" align="center" label="状态描述"></el-table-column>
        <el-table-column align="center" label="第三方状态">
          <template slot-scope="scope">
            {{scope.row.ThirdStatus | ThirdStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="ThirdTemplateId" align="center" label="第三方模板ID"></el-table-column>
        <el-table-column prop="CreateTime" align="center" label="申请时间"></el-table-column>
        <el-table-column prop="UpdateTime" align="center" label="完成时间"></el-table-column>
        <el-table-column prop="AccountIsDeleted" align="center" label="是否有效">
          <template slot-scope="scope">
            {{scope.row.AccountIsDeleted == false ?"有效":"无效"}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :class="{'grow':grow}">提交审核</el-button>
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

      <!--添加模板-->
      <el-dialog title="添加模板" :visible.sync="addVisible" width="600px">
        <el-form
          :model="addForm"
          :rules="addrules"
          ref="addForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="模板名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="短信签名：" prop="signature">
            <el-input v-model="addForm.signature"></el-input>
          </el-form-item>
          <el-form-item label="短信链接：" prop="smsLink">
            <el-input v-model="addForm.smsLink"></el-input>
          </el-form-item>
          <el-form-item label="短信内容：" prop="smsContent">
            <el-input v-model="addForm.smsContent"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noAdd">取 消</el-button>
          <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!--查看内容-->
      <el-dialog title="查看内容" :visible.sync="seeVisible" width="600px">
        <el-form :model="seeForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="短信内容：" prop="smsContent">
            <el-input type="textarea" :rows="2" v-model="seeForm.smsContent" disabled></el-input>
          </el-form-item>
          <el-form-item label="短信链接：" prop="smsLink">
            <el-input v-model="addForm.smsLink" disabled></el-input>
          </el-form-item>
        </el-form>
        <p class="text2">创建时间：2019-10-21 12：32:12 最后更新时间：2019-10-21 12：32:12 </p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="seeVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

      <!--第三方模板ID-->
      <el-dialog title="第三方模板ID" :visible.sync="threeVisible" width="300px">
        <table class="three">
          <tr>
            <td align="right">第三方平台：</td>
            <td>激光</td>
          </tr>
          <tr>
            <td align="right">签名：</td>
            <td>gudi</td>
          </tr>
          <tr>
            <td align="right">应用标识：</td>
            <td>appid</td>
          </tr>
          <tr>
            <td align="right">应用秘钥：</td>
            <td>appsre</td>
          </tr>
        </table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="threeVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

      <!--修改模板名称-->
      <el-dialog title="修改模板名称" :visible.sync="editVisible" width="600px">
        <el-form :model="editForm" :rules="editrules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="短信内容：" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
        </el-form>
        <p class="text2">创建时间：2019-10-21 12：32:12 最后更新时间：2019-10-21 12：32:12 </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editName('editForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改内容-->
      <el-dialog title="修改模板名称" :visible.sync="editContVisible" width="600px">
        <el-form :model="editForm" :rules="editrules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="短信内容：" prop="smsContent">
            <el-input type="textarea" :rows="2" v-model="editForm.smsContent"></el-input>
          </el-form-item>
          <el-form-item label="短信链接：" prop="smsLink">
            <el-input v-model="editForm.smsLink"></el-input>
          </el-form-item>
        </el-form>
        <p class="text2">创建时间：2019-10-21 12：32:12 最后更新时间：2019-10-21 12：32:12 </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editContVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCont('editForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改签名-->
      <el-dialog title="修改签名" :visible.sync="editNatureVisible" width="600px">
        <el-form :model="editForm" :rules="editrules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="短信签名：" prop="signature">
            <el-input v-model="editForm.signature"></el-input>
          </el-form-item>
        </el-form>
        <p class="text2">创建时间：2019-10-21 12：32:12 最后更新时间：2019-10-21 12：32:12 </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editNatureVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNature('editForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!--修改状态-->
      <el-dialog title="修改状态" :visible.sync="editStatusVisible" width="600px">
        <el-form :model="editForm" :rules="editrules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="模板内容：" prop="status">
            <el-input v-model="editForm.status"></el-input>
          </el-form-item>
          <el-form-item label="状态描述：" prop="text">
            <el-input v-model="editForm.text"></el-input>
          </el-form-item>
        </el-form>
        <p class="text2">创建时间：2019-10-21 12：32:12 最后更新时间：2019-10-21 12：32:12 </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editStatusVisible = false">取 消</el-button>
          <el-button type="primary" @click="editStatus('editForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { getFamilyBaseSourceList, setFamilyStatusSourceSet, addFamilySourceList, setExportTmk, } from "api/userdata.js";
import { getSContentTem } from 'api/seller.js';
export default {
  data() {
    return {
      List: [],
      pageCount: 0,
      pageSize: 30,
      currentPage: 1,
      loading: false,
      addVisible: false,
      grow: false,
      formInline: {
        name: "",
        region: ""
      },
      addForm: {
        name: "",
        signature: "",
        smsLink: "",
        smsContent: ""
      },
      statusList:[
        {Id:0,name:"全部"},
        {Id:1,name:"等待审核"},
        {Id:2,name:"正在审核"},
        {Id:3,name:"审核拒绝"},
        {Id:4,name:"审核通过"},
        {Id:5,name:"管理员作废"},
      ],
      addrules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        signature: [
          { required: true, message: "请输入短信签名", trigger: "change" }
        ],
        smsLink: [
          { required: true, message: "请输入短信链接", trigger: "blur" }
        ],
        smsContent: [
          { required: true, message: "请输入短信内容", trigger: "blur" }
        ]
      },
      seeVisible: false,
      seeForm: {
        smsContent: "",
        smsLink: ""
      },
      threeVisible:false,
      editVisible:false,
      editContVisible:false,
      editNatureVisible:false,
      editStatusVisible:false,
      editForm:{
        name:'',
        smsContent:'',
        smsLink:'',
        signature:'',
        status:'',
        text:'',
      },
      editrules:{
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        smsContent: [{ required: true, message: "请输入短信内容", trigger: "blur" }],
        smsLink: [{ required: true, message: "请输入短信链接", trigger: "blur" }],
        signature:[{ required: true, message: "请输入短信签名", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        text:[{ required: false, message: "请输入状态描述内容", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this._getSContentTem();
  },
  filters: {
    ExamineState(parmas){
      switch(parmas){
        case 1:
          return "待审核"
        case 2:
          return "审核中"
        case 3:
          return "审核拒绝"
        case 4:
          return "审核通过"
        case 5:
          return "管理员作废"
      }
    },
    ThirdStatus(parmas){
      switch(parmas){
        case 0:
          return "审核中"
        case 1:
          return "审核成功"
        case 2:
          return "审核失败"
      }
    },
  },
  methods: {
    //获取列表
    _getSContentTem() {
      const parmas = {
        SellerName : '',
        SellerPhone : '',
        Content:this.formInline.name,
        Status:this.formInline.Status,
        Type : 2,
        pageindex:this.currentPage,
        pagecount:this.pageSize
      }
      getSContentTem(parmas).then( res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount
        console.log(res);
      })
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
        this.pageSize = val;
        this._getSContentTem();
    },
    // 分页导航
    handleCurrentChange(val) {
        this.currentPage = val;
        this._getSContentTem();
    },
    search() {
      this.currentPage = 1;
      this._getSContentTem();
    },
    add() {
      this.addVisible = true;
    },
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
    //
    editName(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //
    editCont(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //
    editNature(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //
    editStatus() {
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
.text2{
  font-size: 12px;
  color: #ccc;
  text-align: right;
}
.three tr{
  height:30px;
  line-height: 30px;
}
</style>
