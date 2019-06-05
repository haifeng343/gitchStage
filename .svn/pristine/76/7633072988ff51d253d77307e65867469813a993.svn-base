 <template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>职位管理</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <label for>电话:</label>
        <el-input v-model="phone" placeholder="请输入电话" class="handle-input mr10"></el-input>
        <label for>父/母姓名:</label>
        <el-input v-model="father" placeholder="请输入父/母姓名" class="handle-input mr10"></el-input>
        <label for>地区:</label>
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
        <label for>来源:</label>
        <el-select v-model="source">
          <el-option v-for="item in sourceList" :value="item.Id" :label="item.label" :key="item.Id"></el-option>
        </el-select>
        <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
        <!-- <el-button type="primary" style="float:right" @click="showAddForm">添加家庭</el-button> -->
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="FamilyId" align="center" label="家庭ID"></el-table-column>
        <el-table-column prop="Father" align="center" label="父/母">
          <template slot-scope="scope">{{scope.row.Father}}/{{scope.row.Mother}}</template>
        </el-table-column>
        <el-table-column prop="ChildrenCount" align="center" label="孩子个数"></el-table-column>
        <el-table-column prop="FamilyLevel" align="center" label="家庭等级"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="联系方式"></el-table-column>
        <el-table-column prop="OtherContacts" align="center" label="其他联系方式"></el-table-column>
        <el-table-column prop="Address" align="center" label="地址"></el-table-column>
        <el-table-column label="账户状态" width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-text="有效"
              inactive-text="无效"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus($event, scope.row.FamilyId)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="jumpUrl(scope.row)">家庭详情</el-button>
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
      <!-- 新增弹出框 -->
      <el-dialog title="添加家庭" :visible.sync="addVisible" width="663px" autocomplete="off">
        <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="130px">
          <el-form-item label="父亲:" prop="father">
            <el-input v-model="addForm.father" placeholder="请输入父亲姓名"></el-input>
          </el-form-item>
          <el-form-item label="母亲:" prop="mother">
            <el-input v-model="addForm.mother" placeholder="请输入母亲姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="其它联系方式:" prop="other">
            <el-input v-model="addForm.other" type="textarea" placeholder="请输入其它联系方式"></el-input>
          </el-form-item>
          <el-form-item label="家庭情况级别:" prop="level">
            <el-select v-model="addForm.level" placeholder="选择级别">
              <el-option
                v-for="item in levelList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="addVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="_addFamily('addForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑安全码" :visible.sync="editVisible" width="633px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
          <el-form-item label="Ip地址:" prop="Ip">
            <el-input v-model="editForm.Ip" disabled></el-input>
          </el-form-item>
          <el-form-item label="安全码:" prop="token">
            <el-input v-model="editForm.token"></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="des">
            <el-input type="textarea" v-model="editForm.des"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-time-box">
          <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span>
          <span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
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
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import { regionDataPlus,CodeToText} from 'element-china-area-data'
import { getFamilyList, setFamilyStatusSet, addFamilybase } from "api/userdata.js";
export default {
  name: "Familylist",
  data() {
    return {
      options: regionDataPlus,
      selectedOptions: [],
      mapJson: "/static/json/map.json",
      tableData: [],
      cur_page: 1,
      phone: "",
      father: "",
      mother: "",
      province: "",
      city:'',
      county:'',
      Id: "",
      pageCount: 0,
      pagesize: 30,
      addVisible: false,
      editVisible: false,
      departmentList: [],
      source:0,
      sourceList:[
        {Id:0,label:'全部'},
        {Id:1,label:'自动导入'},
        {Id:2,label:'手动导入'},
      ],
      levelList: [
        { id: 0, name: "未知" },
        { id: 1, name: "土豪" },
        { id: 2, name: "小康" },
        { id: 3, name: "富裕" },
        { id: 4, name: "正常" }
      ],
      addForm: {
        father: "",
        mother: "",
        phone: "",
        ohter: "无",
        level: ""
      },
      editForm: {
        Ip: "",
        token: "",
        des: "",
        createTime: "",
        updateTime: ""
      },
      addrules: {
        father: [{ required: true, message: "填写父亲姓名", trigger: "blur" }],
        mother: [{ required: true, message: "填写母亲姓名", trigger: "blur" }],
        phone: [{ required: true, message: "填写手机号", trigger: "blur" }],
        level: [{ required: true, message: "请选择等级", trigger: "blur" }]
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
    this.getData();
  },
  computed: {
    isModifyFamily() {
      return this.$store.state.IsModifyFamily;
    }
  },
  watch: {
    isModifyFamily(value) {
      this.getData();
    }
  },
  methods: {
    ...mapMutations({
      IsModifyFamily: "ISMODIFYFAMILY"
    }),
    handleChange (value) {
      this.province = CodeToText[value[0]]
      this.city = CodeToText[value[1]] != undefined ? CodeToText[value[1]] : ''
      this.county = CodeToText[value[2]] != undefined ? CodeToText[value[2]] : ''
    },
    // 跳转详情
    jumpUrl(item) {
      // 父亲
      if (item.Father == null || item.Father == "") {
        localStorage.setItem("father", "空");
      } else {
        localStorage.setItem("father", item.Father);
      }
      // 母亲
      if (item.Mother == null || item.Mother == "") {
        localStorage.setItem("mother", "空");
      } else {
        localStorage.setItem("mother", item.Mother);
      }
      // 电话
      if (item.Mobile == null || item.Mobile == "") {
        localStorage.setItem("phone", "");
      } else {
        localStorage.setItem("phone", item.Mobile);
      }
      this.$router.push(`/familyDetail_ai/${item.FamilyId}`);
    },
    // 修改switch的状态
    changeStatus(status, id) {
      const params = {
        FamilyId: id,
        Status: status,
        Type:1,
      };
      setFamilyStatusSet(params).then(res => {
        if (res.Success) {
          this.$message({
            showClose: true,
            message: "更新成功",
            type: "success"
          });
          // this.getData(this.cur_page)
        } else {
          this.$message.error(res.Message);
          // this.getData(this.cur_page)
        }
      });
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Ip: this.editForm.Ip,
            Token: this.editForm.token,
            Description: this.editForm.des
          };
          editAPI(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editVisible = false;
            } else {
              this.$message("发生错误");
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
      this.editForm.Ip = item.Ip;
      this.editForm.token = item.Token;
      this.editForm.des = item.Description;
      this.editForm.createTime = item.CreateTime;
      this.editForm.updateTime = item.UpdateTime;
    },
    showAddForm() {
      this.addVisible = true;
      this.addForm = {
        father: "",
        mother: "",
        phone: "",
        ohter: "无",
        level: ""
      }
    },
    // 添加
    _addFamily(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var other = this.addForm.other == undefined ? "" : this.addForm.other;
          const params = {
            Father: this.addForm.father,
            Mother: this.addForm.mother,
            Mobile: this.addForm.phone,
            FamilyLevel: this.addForm.level,
            OtherContacts: other,
            Type:1,
          };
          addFamilybase(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.getData(this.cur_page);
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
    // 删除角色
    deleteData(ip) {
      this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            Ip: ip
          };
          deleteAPI(params)
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
    async getData() {
      const params = {
        phone: this.phone,
        father: this.father,
        mother: this.mother,
        province: this.province,
        city: this.city,
        county: this.county,
        Type:1,
        Source:this.source,
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      await getFamilyList(params).then(res => {
        if (res && res.Success) {
          this.tableData = res.Data.List;
          this.pageCount = res.Data.TotalCount;
        } else {
          this.$message({
            message: "发生错误",
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
.handle-box label{
  margin-left: 10px;
}
</style>