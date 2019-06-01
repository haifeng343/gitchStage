<template>
  <div>
    <div class="customer-title">
      <label>微信号</label>
      <el-input v-model="wechatName" style="width:200px;margin:0 15px"></el-input>
      <el-button plain @click="search">搜索</el-button>
      <el-button class="add" @click="add" type="primary">增加</el-button>
    </div>
    <el-table :data="List" border style="width: 100%;margin-top:20px" max-height="650px">
      <el-table-column align="center" prop="WechatNumber" label="微信号"></el-table-column>
      <el-table-column align="center" prop="WechatImg" label="微信二维码">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="see(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否当前使用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.IsCurrent"
            active-text="是"
            inactive-text="否"
            :active-value="true"
            :inactive-value="false"
            @change="_wechatCurrentModify(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="CreateTime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="UpdateTime" label="更新时间"></el-table-column>
      <el-table-column align="center" prop="name" label="状态修改">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.Status"
            active-text="有效"
            inactive-text="无效"
            :active-value="1"
            :inactive-value="2"
            @change="_wechatStatusModify(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <span class="shu">|</span>
          <el-button size="mini" type="text" class="red" @click="delate(scope.row.Id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--增加微信弹窗-->
    <el-dialog title="增加微信号" center :visible.sync="addVisible" width="500px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item style="text-align:left" label="微信号：" prop="wechatNumber">
          <el-input v-model="ruleForm.wechatNumber" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" label="微信二维码：" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="api/common/img/upload/14"
            :headers="myHeaders"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:200px"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--编辑微信弹窗-->
    <el-dialog title="编辑微信号" center :visible.sync="editVisible" width="500px">
      <el-form
        :model="editForm"
        status-icon
        :rules="editrules"
        ref="editForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item style="text-align:left" label="微信号：" prop="wechatNumber">
          <el-input v-model="editForm.wechatNumber" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" label="微信二维码：" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="api/common/img/upload/14"
            :headers="myHeaders"
            :show-file-list="false"
            :on-success="editSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="editForm.imageUrl" :src="editForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editBtn('editForm')">保存</el-button>
          <el-button @click="editVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--查看弹窗-->
    <el-dialog title="查看微信二维码" :visible.sync="look" width="400px">
      <div class="lecence">
        <img class :src="imgUrl" alt>
      </div>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="TotalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { uploadServerUrl } from "api/baseUrl";
import { wechatList, wechatAdd, wechatDelete, wechatModify, wechatStatusModify, wechatCurrentModify } from "api/userdata.js";
export default {
  data() {
    return {
      List: [{ name: "王小虎" }],
      imgUrl: "", //微信二维码
      imgPath: "",
      Id:'',
      wechatName: "", //微信号
      uploadServerUrl: uploadServerUrl, //微信二维码上传地址
      addVisible: false, //增加微信号弹窗
      editVisible:false,//修改微信号弹窗
      currentPage: 1, //页码
      pageSize: 10, //每页数量
      TotalCount: 0, //总数
      look: false,
      myHeaders: {
        application: `manager`
      },
      ruleForm: {
        wechatNumber: "",
        imageUrl: "",
        imgPath: ""
      },
      rules: {
        wechatNumber: [{ required: true, message: "微信号", trigger: "blur" }],
        imageUrl: [{ required: true, trigger: "blur", message: "图片不能为空" }]
      },
      editForm: {
        wechatNumber: "",
        imageUrl: "",
        imgPath: ""
      },
      editrules: {
        wechatNumber: [{ required: true, message: "微信号", trigger: "blur" }],
        imageUrl: [{ required: true, trigger: "blur", message: "图片不能为空" }]
      },
    };
  },
  mounted() {
    this._wechatList();
  },
  methods: {
    //获取列表
    _wechatList() {
      const params = {
        WechatNumber: this.wechatName,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      wechatList(params).then(res => {
        this.List = res.Data.List;
        this.TotalCount = res.Data.TotalCount;
        console.log(res);
      });
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pageSize = val;
      this._wechatList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this._wechatList();
    },
    //状态修改
    _wechatStatusModify(item){
        const params = {
            Id : item.Id,
            Status : item.Status
        }
        return wechatStatusModify(params);
    },
    //是否当前使用修改
    _wechatCurrentModify(item){
        const params = {
            Id : item.Id,
            IsCurrent : item.IsCurrent
        }
        wechatCurrentModify(params).then( res => {
            this._wechatList();
        });
    },
    search() {
      this.currentPage = 1;
      this._wechatList();
    },
    ShowErrorReason(item) {
      this.ErrorReason = item.ErrorReason;
    },
    see(row) {
      this.imgUrl = "";
      this.look = true;
      this.form = Object.assign({}, row);
      this.imgUrl = row.WechatImgUrl;
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res.Data.ImgUrl;
      this.ruleForm.imgPath = res.Data.ImgPath;
    },
    editSuccess(res,file) {
        this.editForm.imageUrl = res.Data.ImgUrl;
        this.editForm.imgPath = res.Data.ImgPath;
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPEG && !isJPG && !isPNG) {
        this.$message.error("上传图片类型只能是jpeg,jpg和png!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    delate(id) {
      this.$confirm("确认删除?", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          wechatDelete({ Id: id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功",
              showClose: true
            });
            this._wechatList();
          });
        })
        .catch(error => {
          console.log("error");
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(111);
          const params = {
            WechatNumber: this.ruleForm.wechatNumber,
            WechatImg: this.ruleForm.imgPath
          };
          wechatAdd(params).then(res => {
            this.addVisible = false;
            this.$message({
              type: "success",
              message: "添加成功",
              showClose: true
            });
            this._wechatList();
            this.currentPage = 1;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addVisible = false;
    },
    add() {
      this.addVisible = true;
    },
    edit(item) {
        this.editVisible = true;
        this.Id = item.Id;
        this.editForm.wechatNumber = item.WechatNumber;
        this.editForm.imageUrl = item.WechatImgUrl;
        this.editForm.imgPath = item.WechatImg;
    },
    editBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Id : this.Id,
            WechatNumber : this.editForm.wechatNumber,
            WechatImg : this.editForm.imgPath
        }
        console.log(params)
        wechatModify(params).then( res => {
            this.editVisible = false;
            this.$message({
              type: "success",
              message: "修改成功",
              showClose: true
            });
            this._wechatList();
        })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    
    }
  }
};
</script>

<style scoped>
.customer-title {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  position: relative;
}
.customer-title label {
  line-height: 40px;
}
.customer-title .add {
  position: absolute;
  right: 20px;
  top: 0px;
}
.erwei {
  position: relative;
  right: -2px;
  top: 15px;
}
.imgBor {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  position: relative;
  left: 100px;
  top: 0px;
  margin-bottom: 30px;
}
.lecence img {
  width: 100%;
  height: auto;
}
</style>
