 <template>
  <div class="table">
    <div class="container">
      <div class="title-box">
        <h3>
          <i></i>基本信息
        </h3>
      </div>
      <div class="content-Box">
        <el-form ref="InfoForm" :model="InfoForm" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="父亲:">
                <el-input v-model="InfoForm.father"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="母亲:">
                <el-input v-model="InfoForm.mother"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="手机号:">
                <el-input v-model="InfoForm.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="等级:">
                <el-select v-model="InfoForm.level" placeholder="选择等级">
                  <el-option
                    v-for="item in levelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="其他联系方式:">
                <el-input v-model="InfoForm.other"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="更新时间:">
                <span>{{InfoForm.UpdateTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn-box flex">
          <el-button type="primary" style="width:120px;" @click="saveData('InfoForm')">保存</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="title-box">
        <h3>
          <i></i>地址信息
          <el-button type="primary" style="width:120px;float:right;" @click="showaddAddress()">添加地址</el-button>
        </h3>
      </div>
      <div class="content-Box">
        <el-table :data="addressData" border class="table" ref="multipleTable">
          <el-table-column prop="AddressId" align="center" label="家庭ID"></el-table-column>
          <el-table-column prop="AddressType" align="center" label="地址类型">
            <template slot-scope="scope">
              <span v-if="scope.row.AddressType === 1">联系地址</span>
              <span v-else-if="scope.row.AddressType === 2">家庭地址</span>
              <span v-else-if="scope.row.AddressType === 3">户籍地址</span>
            </template>
          </el-table-column>
          <el-table-column prop="TotalDetails" align="center" label="地址详情"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="editAddress(scope.row)">编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="_deleteAddress(scope.row.AddressId)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btn-box flex"></div>
      </div>
    </div>
    <div class="container">
      <div class="title-box">
        <h3>
          <i></i>孩子信息
          <el-button type="primary" style="width:120px;float:right" @click="showaddChildren">添加孩子</el-button>
        </h3>
      </div>
      <div class="content-Box">
        <el-table :data="childrenData" border class="table" ref="multipleTable">
          <el-table-column prop="ChildId" align="center" label="孩子ID"></el-table-column>
          <el-table-column prop="FamilyId" align="center" label="所属家庭"></el-table-column>
          <el-table-column prop="ChildName" align="center" label="姓名"></el-table-column>
          <el-table-column prop="Sex" align="center" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.Sex === 1">男</span>
              <span v-else-if="scope.row.Sex === 2">女</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column prop="Birthday" align="center" label="生日"></el-table-column>
          <el-table-column prop="CodeId" align="center" label="编码"></el-table-column>
          <el-table-column prop="BarCode" align="center" label="条码"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="showEditChildren(scope.row)">编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="_deleteChild(scope.row.ChildId)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btn-box flex"></div>
      </div>
    </div>
    <!-- 新增地址弹出框 -->
    <el-dialog title="添加地址" :visible.sync="addAddressVisible" width="660px">
      <el-form
        ref="addAddressForm"
        :model="addAddressForm"
        :rules="addAddressrules"
        label-width="120px"
      >
        <el-form-item label="地址类型:" prop="addressType">
          <el-select v-model="addAddressForm.addressType" placeholder="请选择类型">
            <el-option
              v-for="item in addressTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住省:" prop="sheng">
          <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住市:" prop="shi">
          <el-select v-model="shi" @change="choseCity" placeholder="市级地区">
            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住区/县:" prop="qu">
          <el-select v-model="qu" @change="choseBlock" placeholder="地区">
            <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮政编码:" prop="postCode">
          <el-input v-model="addAddressForm.postCode" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
        <el-form-item label="详细地址:" prop="detailAddress">
          <el-input v-model="addAddressForm.detailAddress" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="_addAddress('addAddressForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑地址弹出框 -->
    <el-dialog title="编辑地址" :visible.sync="editAddressVisible" width="660px">
      <el-form
        ref="editAddressForm"
        :model="editAddressForm"
        :rules="editAddressrules"
        label-width="120px"
      >
        <el-form-item label="地址类型:" prop="addressType">
          <el-select v-model="editAddressForm.addressType" placeholder="请选择类型">
            <el-option
              v-for="item in addressTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住省:" prop="sheng">
          <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住市:" prop="shi">
          <el-select v-model="shi" @change="choseCity" placeholder="市级地区">
            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住区/县:" prop="qu">
          <el-select v-model="qu" @change="choseBlock" placeholder="地区">
            <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址:" prop="detailAddress">
          <el-input v-model="editAddressForm.detailAddress" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码:" prop="postCode">
          <el-input v-model="editAddressForm.postCode" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-time-box">
        <span v-if="editAddressForm.createTime != ''">创建时间:{{editAddressForm.createTime}}</span>
        <span v-if="editAddressForm.updateTime != ''">最后更新时间:{{editAddressForm.updateTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="editAddressVisible = false">取 消</el-button> -->
        <el-button
          type="primary"
          class="dialog-certain"
          @click="_editAddress('editAddressForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增孩子 -->
    <el-dialog title="新增孩子" :visible.sync="addChildrenVisible" width="660px">
      <el-form
        ref="addChildrenForm"
        :model="addChildrenForm"
        :rules="addChildrenrules"
        label-width="120px"
      >
        <el-form-item label="编码:" prop="codeId">
          <el-input v-model="addChildrenForm.codeId" placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="条形编码:" prop="barCode">
          <el-input v-model="addChildrenForm.barCode" placeholder="请输入条形编码"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="childName">
          <el-input v-model="addChildrenForm.childName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="addChildrenForm.sex" placeholder="选择性别">
            <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" prop="birthday">
          <el-date-picker
            v-model="addChildrenForm.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildrenVisible = false">取 消</el-button>
        <el-button type="primary" @click="_addChildren('addChildrenForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑孩子" :visible.sync="editChildrenVisible" width="660px">
      <el-form
        ref="editChildrenForm"
        :model="editChildrenForm"
        :rules="editChildrenrules"
        label-width="120px"
      >
        <el-form-item label="姓名:" prop="childName">
          <el-input v-model="editChildrenForm.childName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="editChildrenForm.sex" placeholder="选择性别">
            <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" prop="birthday">
          <el-date-picker
            v-model="editChildrenForm.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="编码:" prop="codeId">
          <el-input v-model="editChildrenForm.codeId" placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="条形编码:" prop="barCode">
          <el-input v-model="editChildrenForm.barCode" placeholder="请输入条形编码"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-time-box">
        <span v-if="editChildrenForm.createTime != ''">创建时间:{{editChildrenForm.createTime}}</span>
        <span v-if="editChildrenForm.updateTime != ''">最后更新时间:{{editChildrenForm.updateTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="editChildrenVisible = false">取 消</el-button> -->
        <el-button
          type="primary"
          class="dialog-certain"
          @click="_editChildren('editChildrenForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import {
  getFamilyBaseSourceList,
  setFamilyStatusSourceSet,
  setFamilySourceModify,
  getFamilyDetail,
  addAddressInfo,
  editAddressInfo,
  deleteAddressInfo,
  addChildrenInfo,
  setChildStatusInfo,
  editChildSourceInfo,
} from "api/userdata.js";
export default {
  name: "FamilyDetail",
  data() {
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("类型不能为空"));
      } else {
        if (this.addressTypeArr.indexOf(value) > -1) {
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
      pagesize: 30,
      addressTypeList: [
        { id: 1, name: "联系地址" },
        { id: 2, name: "家庭地址" },
        { id: 3, name: "户籍地址" }
      ],
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
        other: "",
        UpdateTime: ""
      },
      addAddressForm: {
        addressType: "",
        province: "",
        city: "",
        county: "",
        town: "",
        detailAddress: "",
        postCode: ""
      },
      editAddressForm: {
        addressType: "",
        province: "",
        city: "",
        county: "",
        town: "",
        detailAddress: "",
        postCode: "",
        creteTime: "",
        updateTime: ""
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
        creteTime: "",
        updateTime: ""
      },
      InfoFormrules: {
        father: [{ required: true, message: "填写父亲姓名", trigger: "blur" }],
        mother: [{ required: true, message: "填写母亲姓名", trigger: "blur" }],
        phone: [{ required: true, message: "填写手机号", trigger: "blur" }],
        level: [{ required: true, message: "请选择等级", trigger: "change" }]
      },
      editAddressrules: {
        addressType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        // sheng: [
        //   { required: true, message: "选择省份", trigger: "change" },
        // ],
        // shi:[
        //   { required: true, message: "选择市", trigger: "change" },
        // ],
        // qu:[
        //   { required: true, message: "选择区/县", trigger: "change" },
        // ],
        detailAddress: [{ message: "填写详细地址", trigger: "blur" }],
        postCode: [{ message: "填写邮政编码", trigger: "blur" }]
      },
      addAddressrules: {
        addressType: [
          { validator: validateAddress, required: true, trigger: "blur" }
        ],
        // sheng: [
        //   { required: true, message: "选择省份", trigger: "change" },
        // ],
        // shi:[
        //   { required: true, message: "选择市", trigger: "change" },
        // ],
        // qu:[
        //   { required: true, message: "选择区/县", trigger: "change" },
        // ],
        detailAddress: [{ message: "填写详细地址", trigger: "blur" }],
        postCode: [{ message: "填写邮政编码", trigger: "blur" }]
      },
      addChildrenrules: {
        codeId: [{ required: true, message: "输入编码", trigger: "blur" }],
        barCode: [{ required: true, message: "输入条形编码", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "blur" }],
        birthday: [{ required: true, message: "选择生日", trigger: "blur" }],
        childName: [
          { required: true, message: "输入孩子姓名", trigger: "blur" }
        ]
      },
      editChildrenrules: {
        sex: [{ required: true, message: "选择性别", trigger: "blur" }],
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
    this.getCityData();
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
    ...mapMutations({
      IsModifyFamily: "ISMODIFYFAMILY"
    }),
    showaddAddress() {
      this.addAddressVisible = true;
      this.addAddressForm = {
        addressType: "",
        province: "",
        city: "",
        county: "",
        town: "",
        detailAddress: "",
        postCode: ""
      };
    },
    // 新增地址
    _addAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            FamilyId: this.$route.params.id,
            Province: this.sheng,
            City: this.shi,
            County: this.qu,
            Town: "",
            AddressType: this.addAddressForm.addressType,
            DetailAddress: this.addAddressForm.detailAddress,
            PostCode: this.addAddressForm.postCode,
            Type:0,
          };
          addAddressInfo(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "新增成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.addAddressVisible = false;
              this.$store.commit("ISMODIFYFAMILY", true);
            } else {
              this.$message("发生错误");
            }
          });
        } else {
          return false;
        }
      });
    },
    // 编辑地址
    editAddress(item) {
      this.editAddressVisible = true;
      this.addressId = item.AddressId;
      this.sheng = item.Province;
      this.shi = item.City;
      this.qu = item.County;
      this.editAddressForm.addressType = item.AddressType;
      this.editAddressForm.postCode = item.PostCode;
      this.editAddressForm.detailAddress = item.DetailAddress;
      this.editAddressForm.creteTime = item.CreateTime;
      this.editAddressForm.updateTime = item.UpdateTime;
    },
    _editAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Id: this.addressId,
            Province: this.sheng,
            City: this.shi,
            County: this.qu,
            Town: "",
            AddressType: this.editAddressForm.addressType,
            DetailAddress: this.editAddressForm.detailAddress,
            PostCode: this.editAddressForm.postCode,
            Type:0,
          };
          editAddressInfo(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.$store.commit("ISMODIFYFAMILY", true);
              this.editAddressVisible = false;
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
      this.addChildrenVisible = true;
      this.addChildrenForm = {
        childName: "",
        sex: "",
        birthday: "",
        codeId: "",
        barCode: ""
      };
    },
    // 新增孩子
    _addChildren(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            FamilyId: this.$route.params.id,
            ChildName: this.addChildrenForm.childName,
            Sex: this.addChildrenForm.sex,
            Birthday: this.addChildrenForm.birthday,
            CodeId: this.addChildrenForm.codeId,
            BarCode: this.addChildrenForm.barCode,
            Type:0,
          };
          addChildrenInfo(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "新增成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.addChildrenVisible = false;
              this.$store.commit("ISMODIFYFAMILY", true);
            } else {
              this.$message("发生错误");
            }
          });
        } else {
          return false;
        }
      });
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
            state: 0,
            Type:0,
          };
          setChildStatusInfo(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData(this.$route.params.id);
                this.$store.commit("ISMODIFYFAMILY", true);
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
      this.editChildrenForm.createTime = item.CreateTime;
      this.editChildrenForm.updateTime = item.UpdateTime;
    },
    // 保存编辑
    _editChildren(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            ChildId: this.childId,
            FamilyId: this.$route.params.id,
            ChildName: this.editChildrenForm.childName,
            Sex: this.editChildrenForm.sex,
            Birthday: this.editChildrenForm.birthday,
            CodeId: this.editChildrenForm.codeId,
            BarCode: this.editChildrenForm.barCode,
            Type:0,
          };
          editChildSourceInfo(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "编辑成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.$store.commit("ISMODIFYFAMILY", true);
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
    // 加载china地点数据，三级
    getCityData: function() {
      var that = this;
      axios
        .get(this.mapJson)
        .then(function(response) {
          var data = response;
          that.province = [];
          that.city = [];
          that.block = [];
          // 省市区数据分类
          for (var item in data) {
            if (item.match(/0000$/)) {
              //省
              that.province.push({ id: item, value: data[item], children: [] });
            } else if (item.match(/00$/)) {
              //市
              that.city.push({ id: item, value: data[item], children: [] });
            } else {
              //区
              that.block.push({ id: item, value: data[item] });
            }
          }
          // 分类市级
          for (var index in that.province) {
            for (var index1 in that.city) {
              if (
                that.province[index].id.slice(0, 2) ===
                that.city[index1].id.slice(0, 2)
              ) {
                that.province[index].children.push(that.city[index1]);
              }
            }
          }
          // 分类区级
          for (var item1 in that.city) {
            for (var item2 in that.block) {
              if (
                that.block[item2].id.slice(0, 4) ===
                that.city[item1].id.slice(0, 4)
              ) {
                that.city[item1].children.push(that.block[item2]);
              }
            }
          }
        })
        .catch(function(error) {
          console.log(typeof +error);
        });
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].value) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].value;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].value) {
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].value;
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.E = e;
    },
    showAddForm() {
      this.addVisible = true;
    },
    // 修改家庭基础信息保存
    saveData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            FamilyId: this.$route.params.id,
            Father: this.InfoForm.father,
            Mother: this.InfoForm.mother,
            Mobile: this.InfoForm.phone,
            FamilyLevel: this.InfoForm.level,
            OtherContacts: this.InfoForm.other,
            Type:0,
          };
          setFamilySourceModify(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              this.getData(this.$route.params.id);
              this.addVisible = false;
              this.$store.commit("ISMODIFYFAMILY", true);
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 删除地址
    _deleteAddress(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            AddressId: id,
            Type:0,
          };
          deleteAddressInfo(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData(this.$route.params.id);
                this.$store.commit("ISMODIFYFAMILY", true);
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
    async getData(familyid) {
      const params = {
        familyid: familyid,
        Type:0,
      };
      await getFamilyDetail(params).then(res => {
        if (res && res.Success) {
          this.InfoForm.father = res.Data.Father;
          this.InfoForm.mother = res.Data.Mother;
          this.InfoForm.phone = res.Data.Mobile;
          this.InfoForm.level = res.Data.FamilyLevel;
          this.InfoForm.other = res.Data.OtherContacts;
          this.InfoForm.UpdateTime = res.Data.UpdateTime;
          this.addressData = res.Data.AddressList;
          this.childrenData = res.Data.ChildrenList;
          if (res.Data.AddressList.length > 0) {
            let arr = [];
            for (let i = 0; i < res.Data.AddressList.length; i++) {
              arr.push(res.Data.AddressList[i].AddressType);
            }
            this.addressTypeArr = arr;
          }
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
  border-bottom: 1px solid #cccccc;
  margin: 0 20px;
}
.title-box {
  padding: 0 15px;
  i {
    width: 10px;
    height: 10px;
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