<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
            </div>
            <!--库存管理 -->
              <div class="box">
                <el-form ref="addForm" :model="addForm" label-width="150px">
                  <el-form-item class="form-item" label="剩余库存数量(分):" >
                      <el-input v-model="addForm.remainStock" disabled></el-input>
                  </el-form-item>
                  <el-form-item class="form-item" label="已用库存数量(分):" >
                      <el-input v-model="addForm.useStock" disabled></el-input>
                  </el-form-item>
                  <el-form-item class="form-item" label="累计库存数量(分):" >
                      <el-input v-model="addForm.totalStock" disabled></el-input>
                  </el-form-item>
                </el-form>
                <span>
                    <el-button type="primary" @click="openSet('addForm')" class="btn">库存设定</el-button>
                </span>
              </div>
              <!-- 详情弹出框 -->
                <el-dialog title="库存设定" :visible.sync="editVisible" width="633px">
                    <el-form ref="editForm" :model="editForm" :rules="editrules"  label-width="120px">
                        <el-form-item label="当前库存数量:" >
                            <span>{{addForm.remainStock}}</span>
                        </el-form-item>
                        <el-form-item label="变更金额(分):" prop="changeMoney">
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
    import {getStockInfo, setStock} from 'api/finance.js'
    export default {
        name: 'Financestock',
        data() {
            var changeMoneyR = (rule,value,callback) => {
                if(!value){
                    return callback(new Error('变更金额不能为空'))
                }else{
                    if(value == 0){
                        callback(new Error('变更金额不能为0'))
                    }else{
                         if (!parseFloat(value)){
                            callback(new Error('请输入正确的金额'))
                        }else{
                            callback();
                        }
                    }
                }
            }
            return {
                addVisible:false,
                editVisible: false,
                addForm: {
                  remainStock:'',
                  useStock:'',
                  totalStock:''
                },
                editForm: {
                  changeMoney:'',
                  Reason:'',
                },
                editrules: {
                    changeMoney: [
                        { validator:changeMoneyR,required: true, trigger: 'blur' }
                    ],
                    Reason:[
                        { required: true, message: '请输入原因', trigger: 'blur' },
                    ],
                },
            }
        },
        created() {
            this._getStockInfo();
        },
        computed: {
        },
        methods: {
            // 显示退款弹窗
            openSet(item){
                this.editVisible = true 
            },
            // 退款
            save(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                    const params = {
                        'ChangeMoney': parseFloat(this.editForm.changeMoney),
                        'Reason': this.editForm.Reason
                      }
                       setStock(params).then(res =>{
                          if(res.Success){
                          this.$message({
                              showClose: true,
                              message: '修改成功',
                              type: 'success'
                          });
                          this._getStockInfo()
                          this.editVisible = false;
                          }else{
                              this.$message.error(res.Message);
                          }
                      })
                  } else {
                      return false;
                  }
              });
            },
            // 获取数据
            async _getStockInfo() {
              const params = {

              }
              await getStockInfo(params).then(res =>{
                this.addForm.remainStock = res.Data.RemainStock
                this.addForm.useStock = res.Data.UseStock
                this.addForm.totalStock = res.Data.TotalStock
              })
            }
        }
    }

</script>

<style scoped>
    .form-item{
      margin-bottom: 50px;
    }
    .btn1{
      width: 40%;
      margin-right: 20%;
    }
    .btn{
      width: 40%;
      margin-left: 40%;
    }
    .box{
      width: 550px;
      height: 400px;
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>