<template>
  <div>
    <div class="commitssSettle-title">
      <el-checkbox :checked="checked">显示全部结算类型（如未勾选只显示有效、下期结算类型）</el-checkbox>
      <span>结算周期：2018-11-29至2019-0211</span>
    </div>
    <el-table :data="tableData" border class="table" ref="multipleTable">
      <el-table-column prop="date" align="center" label="订单号"></el-table-column>
      <el-table-column prop="name" align="center" label="充值商家"></el-table-column>
      <el-table-column prop="address" align="center" label="商家数"></el-table-column>
      <el-table-column prop="name" align="center" label="充值金额(元)"></el-table-column>
      <el-table-column prop="address" align="center" label="确认业绩"></el-table-column>
      <el-table-column align="center" label="提点数">
        <template slot-scope="scope">
          <el-button type="text" @click="commiNumber(scope.row)">5%</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" align="center" label="提成金额"></el-table-column>
      <el-table-column prop="address" align="center" label="充值日期"></el-table-column>
      <el-table-column align="center" label="结算类型">
        <template slot-scope="scope">
          <span class="el-dropdown-link">
            {{scope.row.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!--设置提点-->
    <el-dialog title="设置提点-" :visible.sync="dispickupVisiable" width="500px">
      <span>提点数:</span>
        <el-input placeholder="请输入提点数" style="width:300px;" v-model="input"></el-input>
        <div class="setPoint-tip" style="margin-top:20px" v-if="isShow"><span>创建时间：2018-05-12 15:32:26</span><span>最后更新时间：2018-05-13 14:12:35</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pickup()">确认</el-button>
        <el-button @click="dispickupVisiable = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>

    <!--详情弹窗-->
    <el-dialog title="提成结算确认" :visible.sync="disCommissVisiable" width="500px">
      <ul class="commitssSettleUl">
        <li>提成金额：2700</li>
        <li>其他金额：800</li>
        <li>
          实际结算金额：
          <span class="red">3500</span>
        </li>
        <li>
          <span>结算人：</span>
          <el-input style="width:300px" value="张海燕"></el-input>
        </li>
        <li>
          <span class="textarea-title">备注：</span>
          <textarea name class="commitssSettleUl-textarea" id cols="30" rows="10"></textarea>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sure()">确认</el-button>
        <el-button @click="disCommissVisiable = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>

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
    <div class="lumpSum">
      <p class="ml30">提成金额：2700元</p>
      <div class="ml30">
        其他金额：
        <el-input class="lumpSum-input" value="800"></el-input>
      </div>
      <p class="ml30">实际结算金额：3500元</p>
      <el-button class="ml30" @click="SettlementDialog" type="primary">结算</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      accountName: "",
      accountMobile: "",
      checked: true,
      input:'',
      isShow:true,
      pageCount: 0,
      dispickupVisiable: false,
      disCommissVisiable: false,
      pagesize: 30,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    getTime() {
      if (this.time != null && this.time.length > 0) {
        this.starttime = this.time[0];
        this.endtime = this.time[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
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
    Settlement(item) {
      this.$router.push("/sell_CommissSettlment");
    },
    SettlementDialog(item) {
      this.disCommissVisiable = true;
    },
    sure() {
      this.disCommissVisiable = false;
    },
    commiNumber(item) {
      this.dispickupVisiable = true;
    },
    pickup() {
      this.dispickupVisiable = false;
    }
  }
};
</script>

<style scoped>
.commitssSettle-title {
  font-size: 14px;
  color: #606266;
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
}
.commitssSettle-title span {
  margin-left: 30px;
}
.lumpSum {
  display: flex;
  color: #505050;
  justify-content: flex-start;
  width: 100%;
  flex-direction: row;
  height: 40px;
  line-height: 40px;
}
.lumpSum .lumpSum-input {
  width: 120px;
}
.ml30 {
  margin-left: 30px;
}
.commitssSettleUl {
  width: 100%;
  height: 420px;
}
.commitssSettleUl li {
  height: 60px;
  line-height: 60px;
}
.commitssSettleUl-textarea {
  resize: none;
  width: 300px;
  height: 150px;
  position: relative;
  box-sizing: border-box;
  padding: 15px;
  left: 10px;
  top: 10px;
  border: 1px solid #dcdfe6;
}
.commitssSettleUl .textarea-title {
  position: relative;
  top: -120px;
}
.red {
  color: #ff0000;
}
.setPoint-tip{
  font-size: 12px;
  color: #ccc;
  display: flex;
  justify-content: flex-end;
}
.setPoint-tip span:last-child{
  margin-left: 20px;
}
</style>
