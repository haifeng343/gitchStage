<template>
  <div class="table">
    <div class="container">
      <div class="title-box flex">
        <h3>
          <i></i>发送选项
        </h3>
        <el-button type="primary" style="width:120px;" @click="showaddAddress()">增加发送选项</el-button>
      </div>
      <div class="content-Box">
        <el-table :data="addressData" border class="table" ref="multipleTable">
          <el-table-column prop="ContentId" align="center" label="ID"></el-table-column>
          <el-table-column prop="ContentTypeDes" align="center" label="类型"></el-table-column>
          <el-table-column prop="Context" align="center" label="值"></el-table-column>
          <el-table-column prop="PriceAmount" align="center" label="价格"></el-table-column>
          <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
          <!-- <el-table-column prop="UpdateTime" align="center" label="更新时间"></el-table-column> -->
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="editAddress(scope.row)">编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="_deleteAddress(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="container">
      <div class="title-box flex">
        <h3>
          <i></i>反馈选项
        </h3>
        <el-button type="primary" style="width:120px;" @click="showaddChildren">增加反馈选项</el-button>
      </div>
      <div class="content-Box">
        <el-table :data="childrenData" border class="table" ref="multipleTable">
         <el-table-column prop="ContentId" align="center" label="ID"></el-table-column>
          <el-table-column prop="ContentTypeDes" align="center" label="类型"></el-table-column>
          <el-table-column prop="Context" align="center" label="值"></el-table-column>
          <el-table-column prop="PriceAmount" align="center" label="价格"></el-table-column>
          <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
          <!-- <el-table-column prop="UpdateTime" align="center" label="更新时间"></el-table-column> -->
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="editChildren(scope.row)">编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="_deleteAddress(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 增加发送选项 -->
    <el-dialog title="增加发送选项" :visible.sync="addAddressVisible" width="660px">
      <el-form
        ref="addAddressForm"
        :model="addAddressForm"
        :rules="addAddressrules"
        label-width="120px"
      >
        <el-form-item label="类型:" prop="type">
          <el-select
            v-model="addAddressForm.type"
            style="width:100%;"
            placeholder="请选择类型"
            @change="changeTypeList"
          >
            <el-option
              v-for="item in TypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值:" prop="value">
          <el-input v-model="addAddressForm.value" placeholder="请输入值"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input v-model="addAddressForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="orderIndex">
          <el-input v-model="addAddressForm.orderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="_addAddress('addAddressForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑发送选项弹出框 -->
    <el-dialog title="编辑发送选项" :visible.sync="editAddressVisible" width="660px">
      <el-form
        ref="editAddressForm"
        :model="editAddressForm"
        :rules="editAddressrules"
        label-width="120px"
      >
        <el-form-item label="类型:" prop="type">
          <el-select
            v-model="editAddressForm.type"
            style="width:100%;"
            placeholder="请选择类型"
            @change="changeTypeList"
            disabled
          >
            <el-option
              v-for="item in TypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值:" prop="value">
          <el-input v-model="editAddressForm.value" placeholder="请输入值"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input v-model="editAddressForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="orderIndex">
          <el-input v-model="editAddressForm.orderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-time-box">
          <span v-if="editAddress.createTime != ''">创建时间:{{editAddress.createTime}}</span><span v-if="editAddress.updateTime != ''">最后更新时间:{{editAddress.updateTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="_editAddress('editAddressForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增孩子 -->
    <el-dialog title="新增反馈选项" :visible.sync="addChildrenVisible" width="660px">
      <el-form
         ref="addAddressForm"
        :model="addAddressForm"
        :rules="addAddressrules"
        label-width="120px"
      >
        <el-form-item label="类型:" prop="type">
          <el-select
            v-model="addAddressForm.type"
            style="width:100%;"
            placeholder="请选择类型"
            @change="changeTypeList1"
          >
            <el-option
              v-for="item in TypeList1"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input v-model="addAddressForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="orderIndex">
          <el-input v-model="addAddressForm.orderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildrenVisible = false">取 消</el-button>
        <el-button type="primary" @click="_addAddress('addAddressForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑反馈选项" :visible.sync="editChildrenVisible" width="660px">
        <el-form
        ref="editAddressForm"
        :model="editAddressForm"
        :rules="editAddressrules"
        label-width="120px"
      >
        <el-form-item label="类型:" prop="type">
          <el-select
            v-model="editAddressForm.typeDes"
            style="width:100%;"
            placeholder="请选择类型"
            disabled
            @change="changeTypeList"
          >
            <el-option
              v-for="item in TypeList"
              :key="item.ContentType"
              :label="item.ContentTypeDes"
              :value="item.ContentType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input v-model="editAddressForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="orderIndex">
          <el-input v-model="editAddressForm.orderIndex" placeholder="请输入排序顺序值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="_editAddress('editAddressForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  getPriceModuleInfo,
  addPriceModuleOption,
  getSysPriceTem,
  editPriceModuleOption,
  disPriceModuleOption
} from "api/seller.js";
import {
  deleteAddressInfo,
  deleteChildInfo,
} from "api/userdata.js";
export default {
  name: "SellerAddPTDetail",
  data() {
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("类型不能为空"));
      } else {
        if (this.existTypes.indexOf(value) > -1) {
          callback(new Error("此项已存在，请重新选择"));
        } else {
          callback();
        }
      }
    };
    return {
      mapJson: "/static/json/map.json",
      addressData: [],
      childrenData: [],
      cur_page: 1,
      childId: "",
      addressId: "",
      phone: "",
      father: "",
      mother: "",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      Id: "",
      levelList: [
        { id: 1, name: "土豪" },
        { id: 2, name: "较好" },
        { id: 3, name: "富裕" },
        { id: 4, name: "正常" }
      ],
      sexList: [
        { id: 0, name: "未知" },
        { id: 1, name: "男" },
        { id: 2, name: "女" }
      ],
      pageCount: 0,
      existTypes:[],
      pagesize: 30,
      TypeList: [],
      TypeList1: [],
      addressTypeArr: [],
      addAddressVisible: false,
      editAddressVisible: false,
      addChildrenVisible: false,
      editChildrenVisible: false,
      addVisible: false,
      editVisible: false,
      AddressList: [],
      InfoForm: {
        father: "",
        mother: "",
        phone: "",
        level: "",
        other: ""
      },
      addAddressForm: {
        type: "",
        value: "",
        price: "",
        orderIndex: ""
      },
      editAddressForm: {
        typeDes:'',
        type: "",
        value: "",
        price: "",
        orderIndex: "",
        name:'',
        createTime:'',
        updateTime:''
      },
      addChildrenForm: {
        childName: "",
        sex: "",
        birthday: "",
        codeId: "",
        barCode: ""
      },
      editChildrenForm: {
        childName: "",
        sex: "",
        birthday: "",
        codeId: "",
        barCode: "",
        createTime:'',
        updateTime:''
      },
      InfoFormrules: {
        father: [{ required: true, message: "填写父亲姓名", trigger: "blur" }],
        mother: [{ required: true, message: "填写母亲姓名", trigger: "blur" }],
        phone: [{ required: true, message: "填写手机号", trigger: "blur" }],
        level: [{ required: true, message: "请选择等级", trigger: "change" }]
      },
      editAddressrules: {
        type: [{ required: true, message: "选择类型", trigger: "change" }],
        value: [{  message: "输入值", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        orderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },
      addAddressrules: {
        type: [{ validator: validateAddress, trigger: "change" }],
        value: [{  message: "输入值", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        orderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },
      addChildrenrules: {
        codeId: [{ required: true, message: "输入编码", trigger: "blur" }],
        barCode: [{ required: true, message: "输入条形编码", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "change" }],
        birthday: [{ required: true, message: "选择生日", trigger: "blur" }],
        childName: [
          { required: true, message: "输入孩子姓名", trigger: "blur" }
        ]
      },
      editChildrenrules: {
        codeId: [{ required: true, message: "输入编码", trigger: "blur" }],
        barCode: [{ required: true, message: "输入条形编码", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "change" }],
        birthday: [{ required: true, message: "选择生日", trigger: "blur" }],
        childName: [
          { required: true, message: "输入孩子姓名", trigger: "blur" }
        ]
      },
      addrules: {
        Ip: [
          { required: true, message: "请输入Ip地址", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        token: [
          { required: true, message: "请输入安全码", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        des: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ]
      },
      editrules: {
        Ip: [
          { required: true, message: "请输入Ip地址", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        token: [
          { required: true, message: "请输入安全码", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        des: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData(this.$route.params.id);
    this.getTypeList();
  },
  computed: {},
  watch: {
    $route(route) {
      if (route.params.id) {
        this.getData(route.params.id);
      }
    }
  },
  methods: {
    getTypeList() {
      const params = {};
      getSysPriceTem(params).then(res => {
        if (res.Success && res.Data.List.length > 0) {
          var sendArr = [];
          var feedArr = [];
          var length = res.Data.List.length;

          for (let i = 0; i < length; i++) {
            if (res.Data.List[i].Category == 1) {
              sendArr.push(res.Data.List[i]);
            }
            if (res.Data.List[i].Category == 2) {
              feedArr.push(res.Data.List[i]);
            }
          }
          this.TypeList = sendArr;
          this.TypeList1 = feedArr;
        }
      });
    },
    changeTypeList(value) {
      let i = this.searchType(this.TypeList, value);
      this.addAddressForm.value = this.TypeList[i].ContentValue;
      this.addAddressForm.price = this.TypeList[i].Price;
      this.addAddressForm.orderIndex = this.TypeList[i].OrderIndex;
    },
    changeTypeList1(value) {
      let i = this.searchType(this.TypeList1, value);
      this.addAddressForm.value = this.TypeList[i].ContentValue;
      this.addAddressForm.price = this.TypeList[i].Price;
      this.addAddressForm.orderIndex = this.TypeList[i].OrderIndex;
    },
    searchType(arr, dst) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].ContentType == dst) {
          return j;
        }
      }
    },
    showaddAddress() {
      this.addAddressForm.type = ''
      this.addAddressForm.value = ''
      this.addAddressForm.price = ''
      this.addAddressForm.orderIndex = ''
      this.addAddressVisible = true;
    },
    // 增加发送选项
    _addAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            'PtId': this.$route.params.id,
            'ContentType': this.addAddressForm.type,
            'DefaultValue': this.addAddressForm.value,
            'Context': this.addAddressForm.value,
            'PriceAmount': this.addAddressForm.price,
            'OrderIndex': this.addAddressForm.orderIndex
          };
          addPriceModuleOption(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "新增成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.addChildrenVisible = false;
              this.addAddressVisible = false;
            } else {
              this.$message(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 编辑发送
    editAddress(item) {
      this.editAddressVisible = true;
      this.editAddressForm.createTime = item.CreateTime;
      this.editAddressForm.updateTime = item.UpdateTime;
      this.editAddressForm.contentId = item.ContentId;
      this.editAddressForm.type = item.ContentType
      this.editAddressForm.value = item.Context
      this.editAddressForm.price = item.PriceAmount
      this.editAddressForm.orderIndex = item.OrderIndex
    },
    // 编辑反馈
    editChildren(item) {
      this.editChildrenVisible = true;
      this.editAddressForm.createTime = item.CreateTime;
      this.editAddressForm.updateTime = item.UpdateTime;
      this.editAddressForm.contentId = item.ContentId;
      this.editAddressForm.type = item.ContentType
      this.editAddressForm.typeDes = item.ContentTypeDes
      this.editAddressForm.value = item.Context
      this.editAddressForm.price = item.PriceAmount
      this.editAddressForm.orderIndex = item.OrderIndex
    },
    editChildInfo(item) {
      this.editAddressVisible = true;
      this.addressId = item.AddressId;
      this.sheng = item.Province;
      this.shi = item.City;
      this.qu = item.County;
      this.editAddressForm.addressType = item.AddressType;
      this.editAddressForm.postCode = item.PostCode;
      this.editAddressForm.detailAddress = item.DetailAddress;
    },
    _editAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            'ContentId': this.editAddressForm.contentId,
            'PtId': this.$route.params.id,
            'ContentType': this.editAddressForm.type,
            'DefaultValue': this.editAddressForm.value,
            'Context': this.editAddressForm.value,
            'PriceAmount': this.editAddressForm.price,
            'OrderIndex': this.editAddressForm.orderIndex
          };
          editPriceModuleOption(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.editAddressVisible = false;
              this.editChildrenVisible = false;
            } else {
              this.$message("发生错误");
            }
          });
        } else {
          return false;
        }
      });
    },
    showaddChildren() {
      this.addAddressForm.type = ''
      this.addAddressForm.value = ''
      this.addAddressForm.price = ''
      this.addAddressForm.orderIndex = ''
      this.addChildrenVisible = true;
    },
    // 删除孩子信息
    _deleteChild(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            ChildId: id,
            state: 0
          };
          deleteChildInfo(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData(this.$route.params.id);
              } else {
                this.$message.error(res.Message);
              }
            })
            .catch(error => {
              console.log("error");
            });
        })
        .catch(() => {
          
        });
    },
    // 保存基本信息
    saveData() {},
    // 显示编辑孩子
    showEditChildren(item) {
      this.editChildrenVisible = true;
      this.childId = item.ChildId;
      this.editChildrenForm.childName = item.ChildName;
      this.editChildrenForm.sex = item.Sex;
      this.editChildrenForm.birthday = item.Birthday;
      this.editChildrenForm.codeId = item.CodeId;
      this.editChildrenForm.barCode = item.BarCode;
    },
    // 保存编辑
    showAddForm() {
      this.addVisible = true;
    },
    // 删除选项
    _deleteAddress(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            'contentid': item.ContentId,
            'status':2
          };
          disPriceModuleOption(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData(this.$route.params.id);
              } else {
                this.$message.error(res.Message);
              }
            })
            .catch(error => {
              console.log("error");
            });
        })
        .catch(() => {
          
        });
    },
    // 获取表格数据
    async getData(ptid) {
      const params = {
        ptid: ptid
      };
      await getPriceModuleInfo(params).then(res => {
        if (res && res.Success) {
          var sendArr = [];
          var feedArr = [];
          var length = res.Data.length;
          var existArr = []
          for (let i = 0; i < length; i++) {
            existArr.push(res.Data[i].ContentType)
            if (res.Data[i].Category == 1) {
              sendArr.push(res.Data[i]);
            }
            if (res.Data[i].Category == 2) {
              feedArr.push(res.Data[i]);
            }
          }
          this.existTypes = existArr
          console.log(this.existTypes)
          this.addressData = sendArr
          this.childrenData = feedArr
        } else {
          this.$message({
            message: "发生错误",
            center: true
          });
        }
      });
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