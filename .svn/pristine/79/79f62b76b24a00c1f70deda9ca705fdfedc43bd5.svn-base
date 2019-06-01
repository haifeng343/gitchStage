 <template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>职位管理</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" style="width:120px;float:right;" @click="showAddForm">添加渠道</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="ChannelId" align="center" width="120" label="ID"></el-table-column>
        <el-table-column prop="ChannelName" align="center" label="渠道名称"></el-table-column>
        <el-table-column prop="AppSecret" align="center" label="应用标识"></el-table-column>
        <el-table-column prop="Appkey" align="center" label="应用秘匙"></el-table-column>
        <el-table-column prop="UpdateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row.ChannelId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹出框 -->
      <el-dialog title="添加短信渠道" :visible.sync="addVisible" width="663px" autocomplete="off">
        <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
          <el-form-item label="渠道名称:" prop="ChannelCode">
            <el-select v-model="addForm.ChannelCode" placeholder="请选择渠道" style="width:100%;">
              <el-option
                v-for="item in channelCodeType"
                :key="item.ChannelCode"
                :label="item.ChannelName"
                :value="item.ChannelCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用标识:" prop="Appkey">
            <el-input v-model="addForm.Appkey"></el-input>
          </el-form-item>
          <el-form-item label="应用秘匙:" prop="AppSecret">
            <el-input v-model="addForm.AppSecret"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="addVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="_addAccount('addForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog
        :title="`编辑短信渠道-${editForm.ChannelName}`"
        :visible.sync="editVisible"
        width="633px"
      >
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
          <el-form-item label="渠道名称:" prop="ChannelCode">
            <el-select v-model="editForm.ChannelCode" placeholder="请选择渠道" style="width:100%;">
              <el-option
                v-for="item in channelCodeType"
                :key="item.ChannelCode"
                :label="item.ChannelName"
                :value="item.ChannelCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用标识:" prop="Appkey">
            <el-input v-model="editForm.Appkey"></el-input>
          </el-form-item>
          <el-form-item label="应用秘匙:" prop="AppSecret">
            <el-input v-model="editForm.AppSecret"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-time-box">
          <span v-if="editForm.CreateTime != ''">创建时间:{{editForm.CreateTime}}</span>
          <span v-if="editForm.UpdateTime != ''">最后更新时间:{{editForm.UpdateTime}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="editVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="saveEdit('editForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getSellerChannel,
  deleteSellerChannel,
  addSellerChannel,
  editSellerChannel,
  getSellerChannelType
} from "api/seller.js";
export default {
  name: "SellerChannel",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      order: "",
      orderId: "",
      phone: "",
      parentName: "",
      Id: "",
      pageCount: 0,
      pagesize: 30,
      addVisible: false,
      editVisible: false,
      channelCodeType: [],
      departmentList: [],
      addForm: {
        ChannelCode: "",
        Appkey: "",
        AppSecret: ""
      },
      editForm: {
        ChannelName: "",
        ChannelCode: "",
        Appkey: "",
        AppSecret: "",
        CreateTime: "",
        UpdateTime: ""
      },
      addrules: {
        ChannelCode: [
          { required: true, message: "请选择渠道", trigger: "change" }
        ],
        Appkey: [{ required: true, message: "请输入", trigger: "blur" }],
        AppSecret: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      editrules: {
        Ip: [{ required: true, message: "请选择渠道", trigger: "change" }],
        token: [{ required: true, message: "请输入", trigger: "blur" }],
        des: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
    this.getChannelType();
  },
  computed: {},
  watch: {
    $route(route) {
      this.getData();
      this.getChannelType();
    }
  },
  methods: {
    // Onchange(value){
    //   var i = this.searchType(this.channelCodeType,value)
    //   this.addForm.Appkey = this.channelCodeType[i].Appkey
    //   this.addForm.AppSecret = this.channelCodeType[i].AppSecret
    // },
    // searchType(arr, dst){
    // for (let j = 0; j < arr.length; j++) {
    //   if (arr[j].ChannelId == dst) {
    //     return j;
    //   }
    // }
    // },
    showAddForm() {
      this.addVisible = true;
      this.addForm.Appkey = "";
      this.addForm.ChannelCode = "";
      this.addForm.AppSecret = "";
    },
    // 添加用户
    _addAccount(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            AccountId: this.$route.params.id,
            ChannelCode: this.addForm.ChannelCode,
            Appkey: this.addForm.Appkey,
            AppSecret: this.addForm.AppSecret
          };
          addSellerChannel(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.addVisible = false;
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 显示编辑弹窗
    handleEdit(item) {
      this.editVisible = true;
      this.Id = item.ChannelId;
      this.editForm.ChannelName = item.ChannelName;
      this.editForm.Appkey = item.Appkey;
      this.editForm.ChannelCode = item.ChannelCode;
      this.editForm.AppSecret = item.AppSecret;
      this.editForm.CreateTime = item.CreateTime;
      this.editForm.UpdateTime = item.UpdateTime;
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            'ChannelId': this.Id,
            'ChannelCode':this.editForm.ChannelCode,
            'Appkey':this.editForm.Appkey,
            'AppSecret':this.editForm.AppSecret
          };
          editSellerChannel(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editVisible = false;
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 删除
    deleteData(id) {
      this.$confirm("此操作将永久删除该职位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            Id: id
          };
          deleteSellerChannel(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
              } else {
                this.$message.error(res.Message);
              }
            })
            .catch(error => {
              console.log("error");
            });
        })
        .catch(() => {});
    },
    // 获取表格数据
    async getData() {
      const params = {
        AccountId: this.$route.params.id
      };
      await getSellerChannel(params).then(res => {
        if (res && res.Success) {
          this.tableData = res.Data;
        } else {
          this.$message.error({
            message: res.Message,
            center: true
          });
        }
      });
    },
    async getChannelType() {
      const params = {};
      await getSellerChannelType(params).then(res => {
        if (res && res.Success) {
          this.channelCodeType = res.Data;
        } else {
          this.$message.error({
            message: res.Message,
            center: true
          });
        }
      });
    },
    search() {
      this.cur_page = 1;
      this.getData();
    }
  }
};
</script>

<style scoped>
.export-excel-wrapper {
  float: right;
}
.handle-box {
  width: 100%;
  height: auto;
  margin-bottom: 50px;
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