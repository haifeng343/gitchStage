<template>
  <div class="table">
    <div class="container">
      <div class="title-box flex">
        <h3>
          <i></i>发送选项
        </h3>
        <el-button type="primary" style="width:120px;" @click="openAddSendForm()">增加发送选项</el-button>
      </div>
      <div class="content-Box">
        <el-table :data="sendTableData" border class="table" ref="multipleTable">
          <el-table-column prop="Id" align="center" label="ID"></el-table-column>
          <el-table-column prop="ContentTypeDes" align="center" label="类型"></el-table-column>
          <el-table-column prop="Context" align="center" label="值"></el-table-column>
          <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="openEditSendForm(scope.row)">编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="deletedata(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="title-box flex">
        <h3>
          <i></i>反馈选项
        </h3>
        <el-button type="primary" style="width:120px;" @click="openAddResForm()">增加反馈选项</el-button>
      </div>
      <div class="content-Box">
        <el-table :data="resTableData" border class="table" ref="multipleTable">
          <el-table-column prop="Id" align="center" label="ID"></el-table-column>
          <el-table-column prop="ContentTypeDes" align="center" label="类型"></el-table-column>
          <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="openEditResForm(scope.row)">编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="deletedata(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 发送选项 -->
    <el-dialog title="增加发送选项" :visible.sync="addSendVisible" width="660px">
      <el-form ref="addSendForm" :model="dataForm" :rules="addSendrules" label-width="120px">
        <el-form-item label="类型:" prop="ContentType">
          <el-select
            v-model="dataForm.ContentType"
            style="width:100%;"
            placeholder="请选择类型"
            @change="typeChange(1)"
          >
            <el-option
              v-for="item in sendTypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值:" prop="Context">
          <el-input v-model="dataForm.Context" placeholder="请输入值"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="OrderIndex">
          <el-input v-model="dataForm.OrderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSendVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('addSendForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑发送选项弹出框 -->
    <el-dialog title="编辑发送选项" :visible.sync="editSendVisible" width="660px">
      <el-form ref="editSendForm" :model="dataForm" :rules="editSendrules" label-width="120px">
        <el-form-item label="类型:" prop="ContentType">
          <el-select
            v-model="dataForm.ContentType"
            style="width:100%;"
            placeholder="请选择类型"
            disabled
          >
            <el-option
              v-for="item in sendTypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值:" prop="Context">
          <el-input v-model="dataForm.Context" placeholder="请输入值"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="OrderIndex">
          <el-input v-model="dataForm.OrderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-time-box">
        <span v-if="dataForm.createTime != ''">创建时间:{{dataForm.createTime}}</span>
        <span v-if="dataForm.updateTime != ''">最后更新时间:{{dataForm.updateTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSendVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData('editSendForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增反馈选项 -->
    <el-dialog title="新增反馈选项" :visible.sync="addResVisible" width="660px">
      <el-form ref="addResForm" :model="dataForm" :rules="addResrules" label-width="120px">
        <el-form-item label="类型:" prop="ContentType">
          <el-select
            v-model="dataForm.ContentType"
            style="width:100%;"
            placeholder="请选择类型"
            @change="typeChange(2)"
          >
            <el-option
              v-for="item in resTypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序值:" prop="OrderIndex">
          <el-input v-model="dataForm.OrderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addResVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('addResForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑反馈选项弹出框 -->
    <el-dialog title="编辑反馈选项" :visible.sync="editResVisible" width="660px">
      <el-form ref="editResForm" :model="dataForm" :rules="editResrules" label-width="120px">
        <el-form-item label="类型:" prop="ContentType">
          <el-select
            v-model="dataForm.ContentType"
            style="width:100%;"
            placeholder="请选择类型"
            disabled
          >
            <el-option
              v-for="item in resTypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序值:" prop="OrderIndex">
          <el-input v-model="dataForm.OrderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editResVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData('editResForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  getCallPriceModuleInfo,
  addCallPriceModuleOption,
  getSysPriceTem,
  editCallPriceModuleOption,
  deleteCallPriceModuleOption
} from "api/seller.js";
export default {
  name: "SellerPriceCallModuleDetail",
  data() {
    return {
      ptId: "",
      sendTableData: [],
      resTableData: [],
      addSendVisible: false,
      editSendVisible: false,
      addResVisible: false,
      editResVisible: false,
      dataForm: {
        Id: "",
        ContentType: "",
        Context: "",
        OrderIndex: ""
      },
      sendTypeList: [],
      resTypeList: [],
      addSendrules: {
        ContentType: [
          { required: true, message: "请输入选项类型", trigger: "blur" }
        ],
        Context: [{ required: true, message: "请输入值", trigger: "blur" }],
        OrderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },
      editSendrules: {
        ContentType: [
          { required: true, message: "请输入选项类型", trigger: "blur" }
        ],
        Context: [{ required: true, message: "请输入值", trigger: "blur" }],
        OrderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },
      addResrules: {
        ContentType: [
          { required: true, message: "请输入选项类型", trigger: "blur" }
        ],
        OrderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },
      editResrules: {
        ContentType: [
          { required: true, message: "请输入选项类型", trigger: "blur" }
        ],
        OrderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.ptId = this.$route.params.id;
    this.getdata();
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/priceCallModuleDetail") != -1) {
        this.getdata();
      }
    }
  },

  methods: {
    typeChange(type) {
      if (type == 1) {
        let arr = this.sendTypeList.filter(item => {
          return item.ContentType === this.dataForm.ContentType;
        });
        if (arr.length > 0) {
          this.dataForm.Context = arr[0].ContentValue;
          this.dataForm.OrderIndex = arr[0].OrderIndex;
        }
      } else {
        let arr = this.resTypeList.filter(item => {
          return item.ContentType === this.dataForm.ContentType;
        });
        if (arr.length > 0) {
          this.dataForm.OrderIndex = arr[0].OrderIndex;
        }
      }
    },
    openAddSendForm() {
      this.addSendVisible = true;
      this.dataForm.Id = "";
      this.dataForm.ContentType = "";
      this.dataForm.Context = "";
      this.dataForm.OrderIndex = "";
      this.getTypeList();
    },
    openEditSendForm(item) {
      this.editSendVisible = true;
      this.getTypeList();
      this.dataForm.Id = item.Id;
      this.dataForm.ContentType = item.ContentType;
      this.dataForm.Context = item.Context;
      this.dataForm.OrderIndex = item.OrderIndex;
    },
    openAddResForm() {
      this.addResVisible = true;
      this.dataForm.Id = "";
      this.dataForm.ContentType = "";
      this.dataForm.Context = "";
      this.dataForm.OrderIndex = "";
      this.getTypeList();
    },
    openEditResForm(item) {
      this.editResVisible = true;
      this.getTypeList();
      this.dataForm.Id = item.Id;
      this.dataForm.ContentType = item.ContentType;
      this.dataForm.Context = "";
      this.dataForm.OrderIndex = item.OrderIndex;
    },
    //获取数据
    getdata() {
      this._getCallPriceModuleInfo().then(res => {
        this.sendTableData = res.Data.filter(item => {
          return item.Category === 1;
        });
        this.resTableData = res.Data.filter(item => {
          return item.Category === 2;
        });
      });
    },
    //删除数据
    deletedata(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._deleteCallPriceModuleOption(item.Id).then(val => {
          this.getdata();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    // 增加数据
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._addCallPriceModuleOption().then(val => {
            this.addSendVisible = false;
            this.addResVisible = false;
            this.getdata();
          });
        } else {
          return false;
        }
      });
    },
    //编辑数据
    editData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._editCallPriceModuleOption().then(val => {
            this.editSendVisible = false;
            this.editResVisible = false;
            this.getdata();
          });
        } else {
          return false;
        }
      });
    },
    //获取类型列表数据
    getTypeList() {
      this._getSysPriceTem().then(res => {
        this.sendTypeList = res.Data.List.filter(item => {
          return item.Category === 1;
        });
        this.resTypeList = res.Data.List.filter(item => {
          return item.Category === 2;
        });
      });
    },

    //获取价格模板类型
    _getSysPriceTem() {
      return getSysPriceTem();
    },

    //新增选项
    _addCallPriceModuleOption(id) {
      const params = {
        PtId: this.ptId,
        ContentType: this.dataForm.ContentType,
        Context: this.dataForm.Context,
        OrderIndex: this.dataForm.OrderIndex
      };
      return addCallPriceModuleOption(params);
    },

    //编辑选项
    _editCallPriceModuleOption() {
      const params = {
        Id: this.dataForm.Id,
        ContentType: this.dataForm.ContentType,
        Context: this.dataForm.Context,
        OrderIndex: this.dataForm.OrderIndex
      };
      return editCallPriceModuleOption(params);
    },
    // 删除选项
    _deleteCallPriceModuleOption(id) {
      const params = {
        Id: id
      };
      return deleteCallPriceModuleOption(params);
    },

    // 获取表格数据
    _getCallPriceModuleInfo() {
      const params = {
        ptid: this.ptId
      };
      return getCallPriceModuleInfo(params);
    }
  }
};
</script>

<style scoped lang="less">
.content-Box {
  width: auto;
  height: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  margin: 0 20px;
}
.title-box {
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  i {
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-right: 10px;
    background-color: #018adb;
  }
}
.btn-box {
  margin-top: 20px;
  justify-content: center;
  align-items: center;
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