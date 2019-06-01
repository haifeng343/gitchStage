 <template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>职位管理</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <label for>广告名称:</label>
        <el-input v-model="name" placeholder="请输入广告名称" class="handle-input mr10"></el-input>
        <label for>广告类型:</label>
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in bannerTypeList1"
            :key="item.Type"
            :label="item.TypeDes"
            :value="item.Type"
          ></el-option>
        </el-select>
        <el-button icon="search" @click="search" style="color:018AD8;">搜索</el-button>
        <el-button type="primary" style="float:right" @click="showAddForm">添加广告</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="Name" align="center" label="广告名称"></el-table-column>
        <el-table-column prop="TypeDes" align="center" label="所属分类"></el-table-column>
        <el-table-column prop="Description" align="center" label="描述"></el-table-column>
        <el-table-column prop="JumpUrl" align="center" label="广告图片链接"></el-table-column>
        <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
        <el-table-column prop="LastModified" align="center" label="更新时间">
          <template
            slot-scope="scope"
          >{{ scope.row.LastModified | normalTime(scope.row.LastModified)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row.Id)"
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
      <!-- 新增弹出框 -->
      <el-dialog title="添加广告" :visible.sync="addVisible" width="663px" autocomplete="off">
        <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
          <el-form-item label="广告名称:" prop="name">
            <el-input v-model="addForm.name" placeholder="广告名称"></el-input>
          </el-form-item>
          <el-form-item label="所属分类:" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择" style="width:340px;">
              <el-option
                v-for="item in bannerTypeList"
                :key="item.Type"
                :label="item.TypeDes"
                :value="item.Type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序值:" prop="orderIndex">
            <el-input v-model.number="addForm.orderIndex" placeholder="排序值"></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="des">
            <el-input type="textarea" v-model="addForm.des" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item label="背景色值:" prop="bgColor">
            <el-input v-model="addForm.bgColor" placeholder="例如:#018ad8"></el-input>
          </el-form-item>
          <el-form-item label="广告图片" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="api/common/img/upload/10"
              :headers="myHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="addForm.imageUrl"
                :src="addForm.imageUrl"
                class="avatar"
                @mousemove="showDelete"
                @mouseout="hideDelete"
              >
              <i
                v-if="addForm.imageUrl"
                class="el-icon-delete"
                @click.stop="handleRemove"
                @mousemove="showDelete"
                :class="isShowDelete?'upload-delete': ''"
              ></i>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="点击链接:" prop="jumpUrl">
            <el-input type="textarea" v-model="addForm.jumpUrl"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="addVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="_addBanner('addForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog :title="`编辑广告-${editForm.name}`" :visible.sync="editVisible" width="633px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
          <el-form-item label="广告名称:" prop="name">
            <el-input v-model="editForm.name" placeholder="广告名称"></el-input>
          </el-form-item>
          <el-form-item label="所属分类:" prop="type">
            <el-select v-model="editForm.type" placeholder="请选择" style="width:340px;">
              <el-option
                v-for="item in bannerTypeList"
                :key="item.Type"
                :label="item.TypeDes"
                :value="item.Type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序值:" prop="orderIndex">
            <el-input v-model.number="editForm.orderIndex" placeholder="排序值"></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="des">
            <el-input type="textarea" v-model="editForm.des" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item label="背景色值:" prop="bgColor">
            <el-input v-model="editForm.bgColor" placeholder="例如:#018ad8"></el-input>
          </el-form-item>
          <el-form-item label="广告图片" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="api/common/img/upload/10"
              :headers="myHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editForm.imageUrl"
                :src="editForm.imageUrl"
                class="avatar"
                @mousemove="showDelete"
                @mouseout="hideDelete"
              >
              <i
                v-if="editForm.imageUrl"
                class="el-icon-delete"
                @click.stop="handleRemove"
                @mousemove="showDelete"
                :class="isShowDelete?'upload-delete': ''"
              ></i>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="点击链接:" prop="jumpUrl">
            <el-input type="textarea" v-model="editForm.jumpUrl"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-time-box">
          <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span>
          <span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
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
  getBannerTypeList,
  getBannerList,
  addBanner,
  editBanner,
  deleteBanner
} from "api/system.js";
export default {
  name: "Banner",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      name: "",
      isShowDelete: false,
      imageUrl: "",
      type: 0,
      Id: "",
      Path: "",
      myHeaders: {
        application: `manager`
      },
      pageCount: 0,
      pagesize: 30,
      addVisible: false,
      editVisible: false,
      bannerTypeList: [],
      bannerTypeList1: [
        {
          Type: 0,
          TypeDes: "全部类型"
        }
      ],
      addForm: {
        imageUrl: "",
        type: "",
        name: "",
        des: "",
        bgColor: "",
        orderIndex: "",
        jumpUrl: ""
      },
      editForm: {
        imageUrl: "",
        type: "",
        name: "",
        des: "",
        bgColor: "",
        orderIndex: "",
        jumpUrl: "",
        createTime: "",
        updateTime: ""
      },
      addrules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        des: [{ message: "请输入描述", trigger: "blur" }],
        type: [
          {
            required: true,
            type: "number",
            message: "请选择类型",
            trigger: "change"
          }
        ],
        imageUrl: [{ required: true, message: "请选择图片", trigger: "blur" }],
        bgColor: [
          { message: "请输入背景色值", trigger: "blur" },
          { min: 4, max: 7, message: "长度在 4 到 7 个字符", trigger: "blur" }
        ],
        orderIndex: [
          {
            required: true,
            type: "number",
            message: "请输入排序值",
            trigger: "blur"
          }
        ],
        jumpUrl: [{ message: "请输入点击链接", trigger: "blur" }]
      },
      editrules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [
          {
            required: true,
            type: "number",
            message: "请选择类型",
            trigger: "change"
          }
        ],
        imageUrl: [{ required: true, message: "请选择图片", trigger: "blur" }],
        bgColor: [
          { message: "请输入背景色值", trigger: "blur" },
          { min: 4, max: 7, message: "长度在 4 到 7 个字符", trigger: "blur" }
        ],
        des: [{ message: "请输入描述", trigger: "blur" }],
        orderIndex: [
          {
            required: true,
            type: "number",
            message: "请输入排序值",
            trigger: "blur"
          }
        ],
        jumpUrl: [{ message: "请输入点击链接", trigger: "blur" }]
      }
    };
  },
  created() {
    this._getBannerTypeList();
    this.getData();
  },
  computed: {},
  methods: {
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    showDelete() {
      this.isShowDelete = true;
    },
    hideDelete() {
      this.isShowDelete = false;
    },
    handleRemove() {
      this.addForm.imageUrl = "";
      this.editForm.imageUrl = "";
      this.Path = "";
    },
    handleAvatarSuccess(res, file) {
      this.addForm.imageUrl = res.Data.ImgUrl;
      this.editForm.imageUrl = res.Data.ImgUrl;
      this.Path = res.Data.ImgPath;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        this.$message.success("图片上传成功");
      }
      return isLt2M;
    },
    // 获取广告类型
    _getBannerTypeList() {
      const params = {};
      getBannerTypeList(params).then(res => {
        this.bannerTypeList = res.Data;
        this.bannerTypeList1 = this.bannerTypeList1.concat(res.Data);
      });
    },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Id: this.Id,
            Type: this.editForm.type,
            Name: this.editForm.name,
            Url: this.Path,
            Description: this.editForm.des,
            JumpUrl: this.editForm.jumpUrl,
            BgColor: this.editForm.bgColor,
            OrderIndex: this.editForm.orderIndex
          };
          editBanner(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editVisible = false;
            } else {
              this.$message(res.Message);
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
      this.Id = item.Id;
      this.editForm.name = item.Name;
      this.editForm.type = item.Type;
      this.editForm.orderIndex = item.OrderIndex;
      this.editForm.des = item.Description;
      this.editForm.bgColor = item.BgColor;
      this.editForm.imageUrl = item.ImgUrl;
      this.editForm.jumpUrl = item.JumpUrl;
      this.editForm.createTime = item.CreateTime;
      this.editForm.updateTime = item.LastModified;
    },
    showAddForm() {
      this.addVisible = true;
      this.resetForm("addForm");
    },
    // 添加广告
    _addBanner(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Type: this.addForm.type,
            Name: this.addForm.name,
            Url: this.Path,
            Description: this.addForm.des,
            JumpUrl: this.addForm.jumpUrl,
            BgColor: this.addForm.bgColor,
            OrderIndex: this.addForm.orderIndex
          };
          addBanner(params).then(res => {
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
    // 删除角色
    deleteData(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            id: id
          };
          deleteBanner(params)
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
    getData() {
      const params = {
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        Name: this.name,
        Type: this.type
      };
      getBannerList(params).then(res => {
        if (res && res.Success) {
          this.tableData = res.Data.List;
          this.pageCount = res.Data.TotalCount;
        } else {
          this.$message({
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
.el-icon-plus {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.upload-delete {
  color: #fff !important;
  position: absolute;
  top: 45%;
  left: 45%;
  font-size: 24px;
}
</style>