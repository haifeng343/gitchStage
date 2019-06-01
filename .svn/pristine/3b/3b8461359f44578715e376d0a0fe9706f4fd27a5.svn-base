<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box"></div>
      <!--库存管理 -->
      <div class="box">
        <el-form ref="addForm" :model="addForm" label-width="150px">
          <el-form-item class="form-item" label="商家名称:">
            <el-input v-model="addForm.AccountName" disabled></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="余额(元):">
            <el-input v-model="addForm.Money" disabled></el-input>
          </el-form-item>
        </el-form>
        <span>
          <el-button type="primary" @click="openSet('addForm')" class="btn">设置余额</el-button>
        </span>
      </div>
      <!-- 详情弹出框 -->
      <el-dialog title="设置余额" :visible.sync="editVisible" width="633px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
          <el-form-item label="当前余额(元):">
            <span>{{addForm.Money}}</span>
          </el-form-item>
          <el-form-item label="变更金额(元):" prop="changeMoney">
            <el-input v-model="editForm.changeMoney" placeholder="请输入变更金额"></el-input>
          </el-form-item>
          <el-form-item label="变更原因:" prop="Reason">
            <el-input type="textarea" v-model="editForm.Reason" placeholder="请输入变更原因"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save('editForm')" class="btn1">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSellerBalance, setSellerBalance } from "api/seller.js";
export default {
  name: "SellerBalance",
  data() {
    var changeMoneyR = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("变更金额不能为空"));
      } else {
        if (value == 0) {
          callback(new Error("变更金额不能为0"));
        } else {
          if (!parseFloat(value)) {
            callback(new Error("请输入正确的金额"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      addVisible: false,
      editVisible: false,
      addForm: {
        AccountName: "",
        Money: ""
      },
      editForm: {
        changeMoney: "",
        Reason: ""
      },
      editrules: {
        changeMoney: [
          { validator: changeMoneyR, required: true, trigger: "blur" }
        ],
        Reason: [{ required: true, message: "请输入原因", trigger: "blur" }]
      }
    };
  },
  created() {
    this._getSellerBalance();
  },
  computed: {},
  methods: {
    normalMoney(money) {
      if (money) {
        return (money / 100).toFixed(2);
      } else {
        return 0;
      }
    },
    // 显示退款弹窗
    openSet(item) {
      this.editVisible = true;
    },
    // 保存设置
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm(`您确定要将余额变更${this.editForm.changeMoney}元?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const params = {
                AccountId: this.$route.params.id,
                Money: parseFloat(this.editForm.changeMoney) * 100,
                Reason: this.editForm.Reason
              };
              setSellerBalance(params).then(res => {
                if (res.Success) {
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success"
                  });
                  this._getSellerBalance();
                  this.editVisible = false;
                } else {
                  this.$message.error(res.Message);
                }
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    // 获取数据
    async _getSellerBalance() {
      const params = {
        AccountId: this.$route.params.id
      };
      await getSellerBalance(params).then(res => {
        this.addForm.AccountName = res.Data.AccountName;
        this.addForm.Money = this.normalMoney(res.Data.Money);
      });
    }
  }
};
</script>

<style scoped>
.form-item {
  margin-bottom: 50px;
}
.btn1 {
  width: 40%;
  margin-right: 20%;
}
.btn {
  width: 40%;
  margin-left: 40%;
}
.box {
  width: 550px;
  height: 300px;
  border: 1px solid #cccccc;
  padding: 20px 40px;
  box-sizing: border-box;
  margin-left: 20px;
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