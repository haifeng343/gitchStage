<template>
  <div class="table">
    <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="父/母名称">
        <el-input v-model="formInline.name" placeholder="父母名称"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="formInline.mobile" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="拨打状态">
        <el-select v-model="selectOption" placeholder="请选择拨打状态">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务名称">
        <el-select v-model="selectType" placeholder="请选择拨打状态">
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="selectLevel" placeholder="请选择级别">
          <el-option v-for="item in Level" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
      <el-table :data="tableData" border class="table">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column align="center" label="父母名称">
          <template slot-scope="scope">
            <span>{{scope.row.Father}}/{{scope.row.Mother}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Mobile" align="center" label="拨打电话"></el-table-column>
        <el-table-column align="center" label="拨打状态">
          <template slot-scope="scope">
            <span>{{scope.row.Status | Status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="StartTime" align="center" label="拨打时间"></el-table-column>
        <el-table-column align="center" label="拨打时长">
          <template slot-scope="scope">
            <span>{{ scope.row.CallSecond | formatSeconds }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Type" align="center" label="业务名称"></el-table-column>
        <el-table-column prop="Level" align="center" label="级别"></el-table-column>
        <el-table-column prop="CreateTime" align="center" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="lookDialog(scope.row)">查看对话</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="查看对话" :visible.sync="dialogVisible" width="800px">
        <div class="wrap">
          <div v-for="item in List" :key="item.index">
            <p v-if="item.VoiceType!=2" class="phtml">AI机器人：{{item.VoiceText}}</p>
            <p v-if="item.VoiceType==2" class="parents phtml">家长：{{item.VoiceText}}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
        </span>
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
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { setFamilyAiRecord, setFamilyAiRecordDialog } from "api/userdata.js";
export default {
  data() {
    return {
      id: "",
      tableData: [],
      pageCount: 0,
      pageSize: 30,
      currentPage: 1,
      dialogVisible: false,
      selectOption:0,
      options:[
        { id: 0, name: "全部" },
        { id: 2, name: "已取消" },
        { id: 3, name: "通话成功" },
        { id: 4, name: "通话失败" }
      ],
      List: [],
      selectLevel:"",
      Level: [{id:"",name:"全部"},{id:"A",name:"A"},{id:"B",name:"B"},{id:"C",name:"C"},{id:"D",name:"D"},{id:"E",name:"E"},{id:"F",name:"F"}],
      selectType:0,
      typeList:[
        {id:0,name:'全部'},
        {id:1,name:"TMK"}
      ],
      formInline:{
        name:'',
        mobile:'',
        callState:'',
        type:'',
        level:'',
      },
    };
  },
  filters: {
    Status(params) {
      switch (params) {
        case 2:
          return "已取消";
        case 3:
          return "通话成功";
        case 4:
          return "通话失败";
      }
    },
    Type(params) {
      switch (params) {
        case 0:
          return "全部";
        case 1:
          return "TMK";
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this._setFamilyAiRecord();
  },
  methods: {
    search() {
      this.currentPage = 1;
      this._setFamilyAiRecord();
    },
    _setFamilyAiRecord() {
      const params = {
        parent:this.formInline.name,
        pageindex: this.currentPage,
        pagecount: this.pageSize,
        Mobile:this.formInline.mobile,
        CallState:this.selectOption,
        Type:this.selectType,
        Level:this.selectLevel,
      };
      setFamilyAiRecord(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pageSize = val;
      this._setFamilyAiRecord();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this._setFamilyAiRecord();
    },
    //弹窗
    lookDialog(item) {
      this.id = item.Id;
      this.dialogVisible = true;
      this._setFamilyAiRecordDialog();
    },
    _setFamilyAiRecordDialog() {
      const Id = this.id;
      setFamilyAiRecordDialog({ Id: Id }).then(res => {
        this.List = res.Data;
      });
    }
  }
};
</script>

<style scoped>
.parents {
  margin-left: 27px;
}
.phtml {
  height: 25px;
  line-height: 25px;
  word-wrap: break-word;
}
.wrap {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  white-space: wrap;
  word-break: break-all;
}
</style>
