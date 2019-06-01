<template>
  <div>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="180">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-circle-plus-outline"/>
          <i v-else class="el-icon-remove-outline"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <div :class="scope.row._level == 2?'isLevel2':''" v-if="column.value != 'function' && column.value != 'Status' && column.value != 'PayMoney'">
          <span v-if="index === 0"><span v-for="space in scope.row._level"  :key="space" class="ms-tree-space"/></span>
          <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-circle-plus-outline"/>
            <i v-else class="el-icon-remove-outline"/>
          </span>
          {{ scope.row[column.value] }}<span v-if="scope.row._level == 2 && scope.row.TargetType == 1 && index === 0">(老)</span><span v-if="scope.row._level == 2 && scope.row.TargetType == 0 && index === 0">(新)</span>
        </div>
        <div :class="scope.row._level == 2?'isLevel2':''" v-if="column.value == 'Status'">
          {{getStatus(scope.row[column.value])}}
        </div>
        <div :class="scope.row._level == 2?'isLevel2':''" v-if="column.value == 'PayMoney'">
          {{scope.row[column.value] | normalMoney(scope.row[column.value])}}
        </div>
        <div :class="scope.row._level == 2?'isLevel2':''" v-if="column.value == 'function'">
            <el-button type="primary" v-if="scope.row.Status === 1 || scope.row.Status === 2 " @click="cancelSend(scope.row.OrderId)">取消发送</el-button>
            <el-button type="primary" v-if="scope.row.Status === 4 && scope.row._level != 2" @click="openSend(scope.row)">发 送</el-button>
            <el-button type="text"  @click="jumpDetail(scope.row)">订单详情</el-button>
            <el-button type="text"  @click="jumpAccess(scope.row)">访问详情</el-button>
            <el-button type="text"  @click="jumpSend(scope.row)">发送详情</el-button>
        </div>
      </template>
      <!-- <template slot-scope="scope" v-if="scope.row[column.value] == 'Status'">
        {{getStatus(scope.row[column.value])}}
      </template> -->
    </el-table-column>
    <slot/>
  </el-table>
  <!-- 发送弹出框 -->
  <el-dialog :title="`发送-ID${addForm.OrderId}`" :visible.sync="addVisible" width="663px" autocomplete="off">
    <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
        <el-form-item label="" prop="">
            <el-radio v-model="addForm.TargetType" label="1">发送给老用户</el-radio>
            <el-radio v-model="addForm.TargetType" label="0">发送给新用户</el-radio>
        </el-form-item>
        <el-form-item label="发送费用:" prop="Price">
            <el-input v-model.number="addForm.Price"></el-input>
        </el-form-item>
        <el-form-item label="发送方式:" >
            <el-radio-group v-model="addForm.SendType" @change="changeType">
              <el-radio  label="1">立即发送</el-radio>
              <el-radio  label="2">定时发送</el-radio>
            </el-radio-group>
            <el-date-picker
              v-if="addForm.SendType == 2"
              v-model="addForm.SendTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="send('addForm')">确 定</el-button>
    </span>
  </el-dialog>
  </div>       
</template>
 
<script>

import treeToArray from "./eval";
import {sendSms,cancelSendSms} from 'api/seller.js'
export default {
  name: "TreeTable",
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      addVisible: false,
      addForm:{
        OrderId:'',
        SendType:'',
        SendTime:'',
        Price:'',
        TargetType:''
      },
      addrules: {
          Price: [
              { required: true,type:'number', message: '请输入正确的价格', trigger: 'blur' },
          ],
      },
    }
  },
  updated(){
    this.formatData
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp;
      if (!Array.isArray(this.data)) {
        tmp = [this.data];
      } else {
        tmp = this.data;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      return func.apply(null, args);
    }
  },
  methods: {
    changeType(value){
      if(value == 1){
        this.addForm.SendTime = ''
      }
    },
    // 取消发送
    cancelSend(id){
      this.$confirm("此操作将取消发送, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            Id: id
          };
          cancelSendSms(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "成功取消!"
                });
                this.$emit('listenChild')
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
    send(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
            const params = {
              'OrderId':this.addForm.OrderId,
              'SendType':this.addForm.SendType,
              'SendTime':this.addForm.SendTime,
              'Price':this.addForm.Price*100,
              'TargetType':this.addForm.TargetType
            }
            sendSms(params).then(res =>{
                if(res.Success){
                this.$message({
                    showClose: true,
                    message: '发送成功',
                    type: 'success'
                });
                this.addVisible = false;
                this.$emit('listenChild')
                }else{
                    this.$message.error(res.Message);
                }
            })
        } else {
            return false;
        }
      });
    },
    openSend(item){
      this.addVisible = true
      this.addForm.OrderId = item.OrderId
    },
    // 跳转到订单详情
    jumpDetail(item){
      this.$router.push({path:`/sellersmsorderDetail/${item.OrderId}`,query:{
      'orderSn':item.OrderSn}
      })
    },
    // 跳转到访问详情
    jumpAccess(item){
      this.$router.push({path:`/accessDetail/${item.OrderId}`,query:{
      'orderSn':item.OrderSn}
      })
    },
    // 跳转到发送详情
    jumpSend(item){
      this.$router.push({path:`/sendDetail/${item.OrderId}`,query:{
      'orderSn':item.OrderSn}
      })
    },
     //获取状态
    getStatus(Status){
      switch (Status) {
        case 1:
          return '待发送'
          break;
        case 2:
          return '正在发送'
          break;
        case 3:
          return '商家取消发送'
          break;
        case 4:
          return '发送已完成'
          break;
        case 5:
          return '订单被无效'
          break;
        default:
          break;
      }
    },
    showRow: function(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.List && record.List.length > 0;
    }
  }
};
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
 
<style scoped>
.isLevel2{
  color:#ccc;
}
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
  color:#cccccc;
}
.ms-tree-space::before {
  content: "";
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #2196f3;
  margin-left: -18px;
}
</style>