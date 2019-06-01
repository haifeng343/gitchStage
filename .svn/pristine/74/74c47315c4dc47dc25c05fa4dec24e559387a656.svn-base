 <template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>商家管理</el-breadcrumb-item>
      <el-breadcrumb-item>商家列表</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <label for>商家名称:</label>
        <el-input v-model="name" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
        <label for>手机号:</label>
        <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
        <label for>销售姓名:</label>
        <el-input v-model="name" placeholder="请输入销售姓名" class="handle-input mr10"></el-input>
        <label for>销售类型:</label>
        <el-select v-model="phone">
            <el-option value="1" label="全部"></el-option>
        </el-select>
        <el-button icon="search" size="medium" type="primary" @click="search" style="color:018AD8">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="AccountId" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountNickName" align="center" label="商户名称"></el-table-column>
        <el-table-column prop="AccountPhone" align="center" label="手机号"></el-table-column>
        <el-table-column align="center" label="销售">
            <template slot-scope="scope">
                <el-button @click="editSell(scope.row)" type="text">王大宝</el-button>
            </template>
        </el-table-column>
        <el-table-column align="center" label="运营售后">
            <template slot-scope="scope">
                <el-button @click="editafter(scope.row)" type="text">王小宝</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="RegistTime" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.RegistTime | normalTime(scope.row.RegistTime)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button type="text" @click="businessCount(scope.row)">商家统计</el-button>
            <el-button type="text" @click="sellChangeLog(scope.row)">销售/运营变更记录</el-button>
             <el-button type="text" @click="openRemarkForm(scope.row)">备注</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 备注弹出框 -->
    <el-dialog :title="`备注-${remarkForm.AccountId}`" :visible.sync="remarkVisible" width="600px">
      <el-form ref="remarkForm" :model="remarkForm">
        <el-form-item>
          <el-input type="textarea" placeholder="点击此处添加备注" v-model="remarkForm.Remark" rows="8"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="ModifyRemarkOk()">确 定</el-button>
        <el-button @click="remarkVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 设置销售弹出框 -->
    <el-dialog
      :title="titleSep+`-${setDirectorForm.AccountName}`"
      :visible.sync="setSellVisible"
      width="700px"
    >
      <div style="margin-bottom: 20px;">
        <label for>销售姓名:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountName"
          placeholder="请输入销售姓名"
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
      <div v-show="isShow">
        <label for>变更原因：</label>
        <el-input style="width:400px;margin:20px 0" placeholder="请输入变更原因"></el-input>
      </div>
      <p class="last-person">原销售：暂无</p>
      <div class="setPoint-tip" style="margin-top:-20px" v-if="isShow"><span>创建时间：2018-05-12 15:32:26</span><span>最后更新时间：2018-05-13 14:12:35</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="setSellOk()">确 定</el-button>
        <el-button @click="setSellVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 设置运营售后弹出框 -->
    <el-dialog
      :title="titleSup+`-${setDirectorForm.AccountName}`"
      :visible.sync="setDirectorVisible"
      width="700px"
    >
      <div style="margin-bottom: 20px;">
        <label for>运营售后姓名:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountName"
          placeholder="请输入运营售后姓名"
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
      <div v-show="isShow">
        <label for>变更原因：</label>
        <el-input style="width:400px;margin:20px 0" placeholder="请输入变更原因"></el-input>
      </div>
      <p class="last-person">原运营售后：暂无</p>
      <div class="setPoint-tip" style="margin-top:-20px" v-if="isShow"><span>创建时间：2018-05-12 15:32:26</span><span>最后更新时间：2018-05-13 14:12:35</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="setDirectorOk()">确 定</el-button>
        <el-button @click="setDirectorVisible = false" size="medium">关 闭</el-button>
      </span>
    </el-dialog>

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
  </div>
</template>

<script>
import axios from "axios";
import {
  getSellerList,
  setSellerStatus,
  modifySellerPassword,
  searchPlace,
  editSellerList,
  addManagerSeller,
} from "api/seller.js";
export default {
  name: "Sellerlist",
  data() {
    var NRpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.modifyForm.repassword !== "") {
          this.$refs.modifyForm.validateField("repassword");
          callback();
        }
        callback();
      }
    };
    var NRrepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.modifyForm.password) {
        callback(new Error("两次输入密码不一致!"));
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
    return {
      province: "",
      sheng: "",
      name:'',
      phone:'',
      setDirectorFormTableAccountName:'',
      setDirectorFormTableAccountMobile:'',
      setDirectorFormTableData:[],
      setDirectorFormRadio:'2',
      setDirectorVisible:false,
      titleSup:'设置运营售后',
      titleSep:'设置销售',
      tableData:[],
      isShow:true,
      setSellVisible:false,
      setDirectorForm:{
          AccountName:'',
      },
      remarkForm: {
        AccountId: 0,
        AccountName: "",
        Remark: ""
      },
      remarkVisible:false,
      shi: "",
      shi1: [],
      placeList: [],
      myHeaders: {
        application: `manager`
      },
      List: [],
      loading: false,
      editVisible: false,
      changeVisible: false,
      Id: "",
      pageCount: 0,
      pagesize: 30,
      Path: "",
      addVisible: false,
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  computed: {},
  methods: {
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    openAddForm() {
      this.resetForm("addForm");
      this.addVisible = true;
    },
    addFormOk(){
        this.$refs["addForm"].validate(valid => {
        if (valid) {
            this._addManagerSeller().then(val=>{
                this.getData();
                this.addVisible=false;
            })
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
    //   this._modifyCallCenterAccountRemark().then(val => {
    //     this.remarkVisible = false;
    //     this._getCallCenterAccountList();
    //     this.$message({
    //       showClose: true,
    //       message: "备注修改成功",
    //       type: "success"
    //     });
    //   });
    this.remarkVisible = false;
    },
    //设置销售
    editSell(item) {
        this.setDirectorVisible = true;
    },
    setDirectorOk() {
        this.setDirectorVisible = false;
    },
    setSellOk() {
      this.setSellVisible = false;
    },
    editSell() {
      this.setSellVisible = true;
    },
    editafter() {
        this.setDirectorVisible = true;
    },
    //销售运营变更记录
    sellChangeLog() {
        this.$router.push('/sell_ChangeLog');
    },
    businessCount(){
        this.$router.push('/sell_BusinessCount');
    },
    handleselect(value) {
      let s = value.split(",");
      if (s.length > 0) {
        for (let i = 0; i < i.length; i++) {
          if (s[i] == null) {
            s[i] == "";
          }
        }
        this.editForm.Latitude = s[4];
        this.editForm.Longitude = s[5];
        this.editForm.Province = s[0];
        this.editForm.City = s[1];
        this.editForm.County = s[2];
        this.editForm.LocalAddress = s[3];
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        const params = query;
        searchPlace(params).then(res => {
          if (res.Success) {
            var arr = [];
            arr = res.Data.map(item => {
              return {
                value: `${item.Province},${item.City},${item.Area},${
                  item.Address
                },${item.Latitude},${item.Longitude}`,
                label: item.Address
              };
            });
            this.placeList = arr;
          }
        });
      } else {
        this.editForm.address = [];
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
    getData() {
      var params = {
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        accountname: this.name,
        accountphone: this.phone,
        starttime: this.starttime,
        endtime: this.endtime
      };
      getSellerList(params).then(res => {
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
    },
    _addManagerSeller() {
      const params = {
        UserName: this.addForm.AccountPhone,
        Password: this.$md5(this.addForm.Password)
      };
      return addManagerSeller(params);
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-box label{
    margin-left: 10px;
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
.el-icon-plus {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.setPoint-tip{
  font-size: 12px;
  color: #ccc;
  display: flex;
  justify-content: flex-end;
}
.setPoint-tip span:last-child{
  margin-left: 20px;
}
.last-person{
  height: 30px;
  line-height: 30px;
}
</style>