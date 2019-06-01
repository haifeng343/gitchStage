<template>
  <div class="menuPage">
    <div class="m_header flex">
      <div class="header-left flex">
        <img src="../../assets/logo.png">古迪效果通后台管理系统
      </div>
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
    <div class="m_menu_box flex">
      <ul class="menu_list flex">
        <li
          class="menu-item flex"
          @click="changeRoute(item.Id)"
          v-for="item in moduleList"
          :key="item.Id"
        >
          <img :src="item.IconUrl" :alt="item.Name" :title="item.Name">
          <p class="title-name">{{item.Name}}</p>
        </li>
      </ul>
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
        <el-form-item label="确认新密码" prop="repass" auto-complete="new-password">
          <el-input type="password" v-model="changeForm.repass"></el-input>
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
import { getToken, removeToken } from "common/js/auth";
import { getHomeMenu, logout, changePassword } from "api/home.js";
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
      moduleList: [],
      changeVisible: false,
      changeForm: {
        oldpass: "",
        newpass: "",
        repass: ""
      },
      rules: {
        oldpass: [
          { validator: NRoldpass, required: true,trigger: "blur" }
          // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        newpass: [
          { validator: NRnewpass,required: true, trigger: "blur" }
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
      return localStorage.getItem("ms_username");
    }
  },
  created() {
    if (localStorage.getItem("userToken") == undefined) {
      this.$router.push("/login");
    }
    this._getHomeMenu();
  },
  methods: {
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
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
          localStorage.removeItem("ms_username");
          localStorage.removeItem("userToken");
          this.$router.push("/login");
        });
      } else if (command == "changePass") {
        this.changeVisible = true;
        this.resetForm("changeForm");
      }
    },
    // 获取模块
    _getHomeMenu() {
      getHomeMenu().then(res => {
        this.moduleList = res.Data;
      });
    },
    changeRoute(type) {
      localStorage.setItem("module", type);
      this.$router.push('/dashboard');
    },
  }
};
</script>

<style scoped lang="less">
.user-name {
  color: #ffffff;
}
.menuPage {
  width: 100%;
  height: 100%;
  background: url(../../assets/login-bg.jpg) no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  .m_header {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 60px;
    background-color: rgba(3, 54, 138, 0.5);
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    .header-left {
      justify-content: center;
      align-items: center;
      img {
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }
    }
  }
  .m_menu_box {
    box-sizing: border-box;
    width: 100%;
    height: 85%;
    align-items: center;
    justify-content: center;
    .menu_list {
      width: 94%;
      height: 232px;
      box-sizing: border-box;
      margin: 0 auto;
      .menu-item {
        width: 238px;
        height: 249px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // margin-right: 15px;
        margin: 0 auto;
        box-sizing: border-box;
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.4);
        font-size: 20px;
        cursor: pointer;
        border-radius: 6px;
        > img {
          display: block;
          width: 102px;
          height: 102px;
        }
        .title-name {
          margin-top: 48px;
          width: 100%;
          text-align: center;
          height: 26px;
          font-family: MicrosoftYaHei;
          font-size: 26px;
          line-height: 26px;
          letter-spacing: 1px;
          color: #ffffff;
        }
      }
    }
  }
}

.el-dropdown-menu__item {
  text-align: center;
  border-top: none;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>