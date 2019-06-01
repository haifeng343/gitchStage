<template>
  <div class="table">
    <div class="container">
      <div class="handle-box1">
        <div class="nav">
          <el-button
            style="width:90px;height:30px;"
            class="dateBtn"
            :type="type == 1?'primary':''"
            @click="getData(1)"
          >当天</el-button>
          <el-button
            :type="type == 2?'primary':''"
            style="width:90px;height:30px;"
            class="dateBtn"
            @click="getData(2)"
          >昨天</el-button>
          <el-button
            :type="type == 3?'primary':''"
            style="width:90px;height:30px;"
            class="dateBtn"
            @click="getData(3)"
          >一周</el-button>
          <el-button
            :type="type == 4?'primary':''"
            style="width:90px;height:30px;"
            class="dateBtn"
            @click="showTime"
          >自定义</el-button>
        </div>
        <el-date-picker
          v-if="isShowTime"
          v-model="time"
          type="datetimerange"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getData(4)"
        ></el-date-picker>
      </div>
      <el-table :data="tableData" fixed border ref="multipleTable" v-loading="loading">
        <el-table-column prop="AccountName" align="center" label="电销人员" fixed></el-table-column>
        <el-table-column prop="CallCount" align="center" label="拨打数量"></el-table-column>
        <el-table-column prop="CallAnswerCount" align="center" label="已接听数量"></el-table-column>
        <el-table-column prop="CallEffectiveCount" align="center" label="有效接听数量"></el-table-column>
        <el-table-column prop="CallUnconnectedCount" align="center" label="未接通数量"></el-table-column>
        <el-table-column prop="ListenUnconnectedCount" align="center" label="未接听数量"></el-table-column>
        <el-table-column prop="CallTotalSecond" align="center" label="总通话时长">
           <template slot-scope="scope">
            {{scope.row.CallTotalSecond | formatSeconds(scope.row.CallTotalSecond)}}
          </template>
        </el-table-column>
        <el-table-column prop="CallEffectiveSecond" align="center" label="有效通话时长">
          <template slot-scope="scope">
            {{scope.row.CallEffectiveSecond | formatSeconds(scope.row.CallEffectiveSecond)}}
          </template></el-table-column>
        <el-table-column prop="CallFollowCount" align="center" label="跟进名单人数"></el-table-column>
        <el-table-column prop="CallExportCount" align="center" label="已预约人数"></el-table-column>
        <el-table-column prop="LastCallTime" align="center" label="最后拨打时间"></el-table-column>
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
  </div>
</template>

<script>
import { getManagerCallCenterDelegateStatisticList } from "api/entrust.js";
export default {
  name: "DelegateStatistic",
  data() {
    return {
      delegateId: 0,

      tableData: [],
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数

      type: 1,
      isShowTime: false,
      time: [],

      loading:false
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatestatistic") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.delegateId = this.$route.params.id;
      this.getData(1);
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateStatisticList(this.type);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateStatisticList(this.type);
    },
    showTime() {
      this.type = 4;
      this.isShowTime = true;
    },
    getData(type) {
      this.cur_page = 1;
      if (type != 4) {
        this.isShowTime = false;
      }
      this.type = type;
      this._getManagerCallCenterDelegateStatisticList(type);
    },
    _getManagerCallCenterDelegateStatisticList(type) {
      this.loading = true;
      const params = {
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        DelegateId: this.delegateId,
        Type: type,
        StartTime: this.time == null ? "" : this.time[0],
        EndTime: this.time == null ? "" : this.time[1]
      };
      return getManagerCallCenterDelegateStatisticList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
        this.loading = false;
      });
    }
  }
};
</script>
<style>
.handle-box1 {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.nav {
  height: 50px;
  margin-top: 4px;
  margin-right: 15px;
}
</style>
