<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <!-- <label for="">用户名:</label>
                <el-input v-model="username" placeholder="请输入用户名" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>-->
        <el-button type="primary" style="float:right;margin-bottom:5px;" @click="showAddForm">添加商品</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="GoodsId" align="center" label="ID" width="150"></el-table-column>
        <el-table-column prop="GoodsName" align="center" label="充值标题" width="120"></el-table-column>
        <el-table-column prop="FreeDes" align="center" label="赠送说明"></el-table-column>
        <el-table-column prop="RechargeImgUrl" align="center" label="活动图片">
          <template slot-scope="scope">
            <img class="iconImg" :src="scope.row.RechargeImgUrl" alt>
          </template>
        </el-table-column>
        <el-table-column prop="BasicMoney" align="center" label="金额">
          <template slot-scope="scope">{{scope.row.BasicMoney}}</template>
        </el-table-column>
        <el-table-column prop="FreeBasicMoney" align="center" label="赠送金额">
          <template slot-scope="scope">{{scope.row.FreeBasicMoney }}</template>
        </el-table-column>
        <el-table-column prop="GoodsPrice" align="center" label="价格">
          <template slot-scope="scope">{{scope.row.GoodsPrice}}</template>
        </el-table-column>
        <el-table-column prop="GoodsDiscountPrice" align="center" label="折扣价格">
          <template slot-scope="scope">{{scope.row.GoodsDiscountPrice}}</template>
        </el-table-column>
        <el-table-column label="是否有效" width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-text="正常"
              inactive-text="下架"
              :active-value="1"
              :inactive-value="2"
              @change="changeStatus($event, scope.row.GoodsId)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
        <el-table-column label="更新时间" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编 辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row.GoodsId)"
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
    </div>
    <!-- 新增弹出框 -->
    <el-dialog title="添加商品" :visible.sync="addVisible" width="663px">
      <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="150px">
        <el-form-item label="商品名称:" prop="GoodsName">
          <el-input v-model="addForm.GoodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="赠送说明:" prop="FreeDes">
          <el-input v-model="addForm.FreeDes" placeholder="请输入赠送说明"></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="OrderIndex">
          <el-input v-model.number="addForm.OrderIndex" placeholder="请输入排序值"></el-input>
        </el-form-item>
        <el-form-item label="售价(分):" prop="GoodsPrice">
          <el-input v-model.number="addForm.GoodsPrice" placeholder="请输入售价"></el-input>
        </el-form-item>
        <el-form-item label="折后售价(分):" prop="GoodsDiscountPrice">
          <el-input v-model.number="addForm.GoodsDiscountPrice" placeholder="请输入折后售价"></el-input>
        </el-form-item>
        <el-form-item label="显示金额:" prop="ShowPrice">
          <el-input v-model.number="addForm.ShowPrice" placeholder="请输入显示金额"></el-input>
        </el-form-item>
        <el-form-item label="面额(分):" prop="BasicMoney">
          <el-input v-model.number="addForm.BasicMoney" placeholder="请输入面额"></el-input>
        </el-form-item>
        <el-form-item label="赠送面额(分):" prop="FreeBasicMoney">
          <el-input v-model.number="addForm.FreeBasicMoney" placeholder="请输入赠送面额"></el-input>
        </el-form-item>
        <el-form-item label="活动图片" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="api/common/img/upload/11"
            :headers="myHeaders"
            :show-file-list="false"
            list-type="picture-card"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="medium"
          class="dialog-certain"
          @click="_addAccount('addForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑商品" :visible.sync="editVisible" width="663px">
      <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="150px">
        <el-form-item label="商品名称:" prop="GoodsName">
          <el-input v-model="editForm.GoodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="赠送说明:" prop="FreeDes">
          <el-input v-model="editForm.FreeDes" placeholder="请输入赠送说明"></el-input>
        </el-form-item>
        <el-form-item label="售价(分):" prop="GoodsPrice">
          <el-input v-model.number="editForm.GoodsPrice" placeholder="请输入售价"></el-input>
        </el-form-item>
        <el-form-item label="折后售价(分):" prop="GoodsDiscountPrice">
          <el-input v-model.number="editForm.GoodsDiscountPrice" placeholder="请输入折后售价"></el-input>
        </el-form-item>
        <el-form-item label="显示金额:" prop="ShowPrice">
          <el-input v-model.number="editForm.ShowPrice" placeholder="请输入显示金额"></el-input>
        </el-form-item>
        <el-form-item label="面额(分):" prop="BasicMoney">
          <el-input v-model.number="editForm.BasicMoney" placeholder="请输入面额"></el-input>
        </el-form-item>
        <el-form-item label="赠送面额(分):" prop="FreeBasicMoney">
          <el-input v-model.number="editForm.FreeBasicMoney" placeholder="请输入到赠送面额"></el-input>
        </el-form-item>

        <el-form-item label="活动图片" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="api/common/img/upload/11"
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
        <el-form-item label="排序值" prop="OrderIndex">
          <el-input v-model.number="editForm.OrderIndex" placeholder="请输入排序值"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-time-box">
        <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span>
        <span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" class="dialog-certain" @click="save('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import {
  getGoodsRList,
  addGoodsRList,
  editGoodsRList,
  deleteGoodsRList,
  modifyGoodsRStatus
} from "api/system.js";
export default {
  name: "Rechargegoods",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      myHeaders: {
        application: `manager`
      },
      isShowDelete: false,
      Id: "",
      cur_page: 1,
      pageCount: 0,
      pagesize: 30,
      multipleSelection: [],
      Path: "",
      value3: true,
      phone: "",
      checkedList: [],
      del_list: [],
      is_search: false,
      editVisible: false,
      changeVisible: false,
      delVisible: false,
      roleVisible: false,
      addVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      addForm: {
        GoodsName: "",
        FreeDes: "",
        RechargeImg: "",
        BasicMoney: "",
        FreeBasicMoney: "",
        GoodsPrice: "",
        GoodsDiscountPrice: "",
        OrderIndex: "",
        imageUrl: "",
        ShowPrice: ""
      },
      editForm: {
        imageUrl: "",
        GoodsName: "",
        FreeDes: "",
        RechargeImg: "",
        BasicMoney: "",
        FreeBasicMoney: "",
        GoodsPrice: "",
        GoodsDiscountPrice: "",
        OrderIndex: "",
        ShowPrice: "",
        createTime: "",
        updateTime: ""
      },
      addrules: {
        GoodsName: [
          { required: true, message: "请输入商品名", trigger: "blur" }
        ],
        FreeDes: [{ message: "请输入赠送说明", trigger: "blur" }],
        imageUrl: [{ message: "请上传图片", trigger: "blur" }],
        BasicMoney: [
          { required: true, type: "number", message: "请输入", trigger: "blur" }
        ],
        FreeBasicMoney: [
          { required: true, type: "number", message: "请输入", trigger: "blur" }
        ],
        GoodsPrice: [
          { required: true, type: "number", message: "请输入", trigger: "blur" }
        ],
        GoodsDiscountPrice: [
          { required: true, type: "number", message: "请输入", trigger: "blur" }
        ],
        ShowPrice: [
          {
            required: true,
            message: "请输入显示金额",
            trigger: "blur"
          }
        ],
        OrderIndex: [
          {
            required: true,
            type: "number",
            message: "请输入排序值",
            trigger: "blur"
          }
        ]
      },
      editrules: {
        GoodsName: [
          { required: true, message: "请输入商品名", trigger: "blur" }
        ],
        FreeDes: [{ message: "请输入赠送说明", trigger: "blur" }],
        imageUrl: [{ message: "请上传图片", trigger: "blur" }],
        BasicMoney: [
          {
            required: true,
            type: "number",
            message: "请输入充值金额",
            trigger: "blur"
          }
        ],
        ShowPrice: [
          {
            required: true,
            message: "请输入显示金额",
            trigger: "blur"
          }
        ],
        FreeBasicMoney: [
          {
            required: true,
            type: "number",
            message: "请输入金额",
            trigger: "blur"
          }
        ],
        GoodsPrice: [
          {
            required: true,
            type: "number",
            message: "请输入售价",
            trigger: "blur"
          }
        ],
        GoodsDiscountPrice: [
          {
            required: true,
            type: "number",
            message: "请输入折后售价",
            trigger: "blur"
          }
        ],
        OrderIndex: [
          {
            required: true,
            type: "number",
            message: "请输入排序值",
            trigger: "blur"
          }
        ]
      },
      idx: -1,
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  watch: {},
  methods: {
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
    // 保存编辑
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            GoodsId: this.Id,
            GoodsName: this.editForm.GoodsName,
            FreeDes: this.editForm.FreeDes,
            RechargeImg: this.Path,
            ShowPrice: this.editForm.ShowPrice,
            BasicMoney: this.editForm.BasicMoney,
            FreeBasicMoney: this.editForm.FreeBasicMoney,
            GoodsPrice: this.editForm.GoodsPrice,
            GoodsDiscountPrice: this.editForm.GoodsDiscountPrice,
            OrderIndex: this.editForm.OrderIndex
          };
          editGoodsRList(params).then(res => {
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
      this.Id = item.GoodsId;
      this.editVisible = true;
      this.editForm.GoodsName = item.GoodsName;
      this.editForm.FreeDes = item.FreeDes;
      this.editForm.BasicMoney = item.BasicMoney;
      this.editForm.FreeBasicMoney = item.FreeBasicMoney;
      this.editForm.GoodsPrice = item.GoodsPrice;
      this.editForm.ShowPrice = item.ShowPrice;
      this.editForm.GoodsDiscountPrice = item.GoodsDiscountPrice;
      this.editForm.OrderIndex = item.OrderIndex;
      this.editForm.imageUrl = item.RechargeImgUrl;
      this.editForm.createTime = item.CreateTime;
      this.editForm.updateTime = item.UpdateTime;
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
    showAddForm() {
      this.addVisible = true;
      (this.addForm.GoodsName = ""),
        (this.addForm.FreeDes = ""),
        (this.addForm.BasicMoney = ""),
        (this.addForm.FreeBasicMoney = ""),
        (this.addForm.GoodsPrice = ""),
        (this.addForm.GoodsDiscountPrice = ""),
        (this.addForm.OrderIndex = ""),
        (this.addForm.imageUrl = "");
    },
    // 添加用户
    _addAccount(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            GoodsName: this.addForm.GoodsName,
            FreeDes: this.addForm.FreeDes,
            RechargeImg: this.Path,
            ShowPrice: this.addForm.ShowPrice,
            BasicMoney: this.addForm.BasicMoney,
            FreeBasicMoney: this.addForm.FreeBasicMoney,
            GoodsPrice: this.addForm.GoodsPrice,
            GoodsDiscountPrice: this.addForm.GoodsDiscountPrice,
            OrderIndex: this.addForm.OrderIndex
          };
          addGoodsRList(params).then(res => {
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
    // 修改switch的状态
    changeStatus(status, id) {
      const params = {
        GoodsId: id,
        Status: status
      };
      modifyGoodsRStatus(params).then(res => {
        if (res.Success) {
          this.$message({
            showClose: true,
            message: "更新成功",
            type: "success"
          });
          this.getData(this.cur_page);
        }
      });
    },
    // 删除
    deleteData(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            GoodsId: id
          };
          deleteGoodsRList(params)
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
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.addForm.imageUrl = res.Data.ImgUrl;
      this.editForm.imageUrl = res.Data.ImgUrl;
      this.Path = res.Data.ImgPath;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 获取表格数据
    getData() {
      const params = {
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      getGoodsRList(params).then(res => {
        this.tableData = res.Data.List
        this.pageCount = res.Data.TotalCount
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
.iconImg {
  width: 56px;
  height: 56px;
  display: inline-block;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}

.handle-input {
  width: 220px;
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
