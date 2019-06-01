<template>
  <div class="business-count">
    <div class="business-countTitle">商家统计</div>
    <ul class="business-MoneyList">
      <li>
        <p class="MoneyListTitle">商家总充值金额</p>
        <p class="MoneyListNumber">
          <span>6666</span>
          <span>元</span>
        </p>
      </li>
      <li>
        <p class="MoneyListTitle">商家总消费金额</p>
        <p class="MoneyListNumber">
          <span>6666</span>
          <span>元</span>
        </p>
      </li>
      <li class="colorPink">
        <p class="MoneyListTitle">已获提成总数</p>
        <p class="MoneyListNumber">
          <span>6666</span>
          <span>元</span>
        </p>
      </li>
      <li class="colorPink">
        <p class="MoneyListTitle">已确认提成数</p>
        <p class="MoneyListNumber">
          <span>6666</span>
          <span>元</span>
        </p>
      </li>
      <li class="colorPink">
        <p class="MoneyListTitle">未确认提成数</p>
        <p class="MoneyListNumber">
          <span>6666</span>
          <span>元</span>
        </p>
      </li>
    </ul>
    <div class="business-countTitle">充值明细</div>
    <el-table :data="tableData" style="margin-top:40px;" border class="table" ref="multipleTable">
      <el-table-column prop="date" align="center" label="ID"></el-table-column>
      <el-table-column prop="name" align="center" label="订单号"></el-table-column>
      <el-table-column prop="address" align="center" label="充值金额"></el-table-column>
      <el-table-column prop="address" align="center" label="变更时间"></el-table-column>
      <el-table-column prop="name" align="center" label="业绩所属">
        <template slot-scope="scope">
          <el-button type="text" @click="own(scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>

     <!-- 更改业绩所属弹出框 -->
    <el-dialog :title="titleSup+`-${accountName}`" :visible.sync="setDirectorVisible" width="663px">
      <div style="margin-bottom:10px;">
        <el-radio v-model="setDirectorFormRadio" label="1">暂无所属</el-radio>
      </div>
      <div style="margin-bottom:10px;">
        <el-radio v-model="setDirectorFormRadio" label="2">变更所属</el-radio>
      </div>
      <div class="handle-box">
        <label for>姓名:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountName"
          placeholder="请输入姓名"
          class="handle-input mr10"
        ></el-input>
        <label for>电话:</label>
        <el-input
          :disabled="setDirectorFormRadio=='1'"
          v-model="setDirectorFormTableAccountMobile"
          placeholder="请输入电话"
          class="handle-input mr10"
        ></el-input>
        <el-button
          :disabled="setDirectorFormRadio=='1'"
          type="primary"
          icon="search"
          @click="setDirectorFormTableSearch()"
        >搜索</el-button>
      </div>
      <el-table :data="setDirectorFormTableData" style="margin-top:10px" fixed border ref="multipleTable">
        <el-table-column align="left" label="姓名">
          <template slot-scope="scope">
            <el-radio
              :disabled="setDirectorFormRadio=='1'"
              v-model="setDirectorFormTableRadio"
              :label="scope.row.AccountId"
            >{{scope.row.AccountName}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="AccountMobile" align="center" label="电话"></el-table-column>
        <el-table-column prop="SubordinateCount" align="center" label="下属人数"></el-table-column>
        <el-table-column prop="EntryTime" align="center" label="入职时间"></el-table-column>
      </el-table>
      <div v-show="isShow">
        <label for>变更原因：</label>
        <el-input style="width:400px;margin:20px 0" placeholder="请输入变更原因"></el-input>
      </div>
      <div style="margin-top:10px;" v-if="isShow">
        <label for>原业绩所属:</label>
        <span>{{accountName}}</span>
      </div>
      <div class="setPoint-tip" v-if="isShow"><span>创建时间：2018-05-12 15:32:26</span><span>最后更新时间：2018-05-13 14:12:35</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="setDirectorOk()">确 定</el-button>
        <el-button @click="setDirectorVisible = false" size="medium">关 闭</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageCount: 0,
      pagesize: 30,
      accountName:'',
      isShow:true,
      setDirectorFormTableAccountName:'',
      setDirectorFormTableAccountMobile:'',
      setDirectorFormTableData:[],
      titleSup:'更改业绩所属',
      setDirectorVisible:false,
      setDirectorFormRadio :'2',
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
    own(item){
        this.setDirectorVisible = true;
    },
    setDirectorOk(item){
        this.setDirectorVisible = false;
    },
  }
};
</script>

<style scoped>
.business-countTitle {
  font-size: 17px;
  color: #505050;
  border-bottom: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
}
.business-MoneyList {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  margin: 30px 0;
}
.business-MoneyList li {
  width: 160px;
  height: 90px;
  background: #47c6bd;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 5px;
}
.colorPink {
  background-color: #ef8587 !important;
}
.MoneyListTitle {
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: center;
}
.MoneyListNumber {
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  height: 55px;
  line-height: 55px;
}
.MoneyListNumber span:first-child {
  font-size: 25px;
  margin-right: 3px;
}
.business-MoneyList li .MoneyListNumbe > .textSmall {
  font-size: 15px;
}
.setPoint-tip{
  font-size: 12px;
  color: #ccc;
  display: flex;
  justify-content: flex-end;
  margin-top: -15px;
}
.setPoint-tip span:last-child{
  margin-left: 20px;
}
</style>
