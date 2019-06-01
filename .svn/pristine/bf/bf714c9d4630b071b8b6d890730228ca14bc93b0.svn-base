<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo" @click="goHomeMenu">古迪效果通管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="static/img/img.jpg">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="changePass">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="changeVisible" width="30%">
      <el-form ref="changeForm" :model="changeForm" :rules="rules" label-width="100px">
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="password" v-model="changeForm.oldpass" auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input type="password" v-model="changeForm.newpass" auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="repass">
          <el-input type="password" v-model="changeForm.repass" auto-complete="new-password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePass('changeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../common/bus";
import { removeToken } from "common/js/auth.js";
import { logout, changePassword } from "api/home.js";
export default {
  data() {
    var NRoldpass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("原密码不能为空"));
      } else {
        callback();
      }
    };
    var NRnewpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.changeForm.repass !== "") {
          this.$refs.changeForm.validateField("repass");
          callback();
        }
        callback();
      }
    };
    var NRrepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changeForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2,
      changeVisible: false,
      changeForm: {
        oldpass: "",
        newpass: "",
        repass: ""
      },
      rules: {
        oldpass: [
          { validator: NRoldpass,required: true, trigger: "blur" }
          // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        newpass: [
          { validator: NRnewpass, required: true,trigger: "blur" }
          // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        repass: [
          { validator: NRrepass,required: true, trigger: "blur" }
          // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  methods: {
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    goHomeMenu() {
      this.$router.push(`/homeMenu`);
    },
    // 修改密码
    changePass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            oldpassword: this.$md5(this.changeForm.oldpass),
            password: this.$md5(this.changeForm.newpass)
          };
          changePassword(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "密码修改成功",
                type: "success"
              });
              this.changeVisible = false;
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        const params = {};
        logout(params).then(res => {
          if (res.Success) {
            localStorage.removeItem("ms_username");
            removeToken();
            this.$router.push("/login");
          }
        });
      } else if (command == "changePass") {
        this.changeVisible = true;
        this.resetForm("changeForm");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 45px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 45px;
  cursor: pointer;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 45px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
  border-top: none;
}
</style>
