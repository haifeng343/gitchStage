<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="孩子姓名:">
          <el-input v-model="childrenName" placeholder="请输入孩子姓名"></el-input>
        </el-form-item>
        <el-form-item label="拨打人员:">
          <el-input v-model="callName" placeholder="请输入拨打人员"></el-input>
        </el-form-item>
        <el-form-item label="委托意向标签:">
          <el-input v-model="sub" placeholder="请输入委托意向标签"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
        <!-- <el-button type="primary" style="float:right">自动匹配</el-button> -->
      </el-form>

      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="SellerName" align="center" label="父/母名称">
          <template slot-scope="scope">{{scope.row.FatherName}}/{{scope.row.MotherName}}</template>
        </el-table-column>
        <el-table-column prop="ChildName" align="center" label="孩子姓名"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="拨打人员"></el-table-column>
        <el-table-column align="center" label="委托标签">
          <template slot-scope="scope">
            <el-button type="text" @click="changeTag(scope.row)">{{ scope.row.DelegateTag }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="转入来源">
          <template slot-scope="scope">
            <span>{{ scope.row.Source ==0 ? "推送转入":"复制转入"}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="Id" align="center" label="转入委托"></el-table-column>
        <el-table-column prop="SellerName" align="center" label="转入人"></el-table-column>-->
        <el-table-column align="center" label="操作" width="230px">
          <template slot-scope="scope">
            <el-button type="text" @click="exportTo(scope.row)">导出到名单</el-button>
            <el-button type="text" class="red" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--委托意向标签-->
      <el-dialog :title="titletup" :visible.sync="tagVisible" width="600px">
        <el-checkbox-group v-model="tagCheckList">
          <el-checkbox
            v-for="item in tagList"
            v-model="item.IsSelect"
            :label="item"
            :key="item.DelegateTagId"
          >{{item.DelegateTagName}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tagVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyTag">确 定</el-button>
        </span>
      </el-dialog>

      <!--导出-->
      <el-dialog :title="titletup" class="cascader" :visible.sync="exportVisible" width="600px">
        <el-input
          v-model="exportName"
          placeholder="搜索商家内容"
          style="width:476px;text-align:center;margin-right:20px"
          icon="el-icon-search"
        ></el-input>
        <el-button @click="exportSearch" type="primary">搜 索</el-button>
        <div class="cascaderDiv">
          <el-cascader-panel
            ref="cascaderAddr"
            :options="options"
            v-model="optionValue"
            :props="props"
            @change="changeData"
          ></el-cascader-panel>
        </div>
        <p style="margin-top: 20px;">导出到：{{exportValue}}</p>
        <el-checkbox v-model="IsDeleteSource" style="margin:20px 0">不删除公共池名单</el-checkbox>
        <span slot="footer" class="dialog-footer">
          <el-button @click="exportVisible = false">取 消</el-button>
          <el-button type="primary" @click="exportSure">确 定</el-button>
        </span>
      </el-dialog>

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getManagerCallCenterDelegateCommonList,
  delegateExportTag,
  delegateExportTagModify,
  deleteManagerCallCenterDelegateCommon,
  getManagerCallCenterDelegateRelList,
  modifyManagerCallCenterDelegateExportCommon
} from "api/entrust.js";
export default {
  data() {
    return {
      childrenName: "",
      callName: "",
      sub: "",
      tableData: [],
      currentPage: 1,
      pageSize: 30,
      pageCount: 0,
      tagVisible: false,
      exportVisible: false,
      titletup: "",
      Id: "",
      tagCheckList: [],
      tagList: [],
      exportName: "", //搜索导出名单商家
      IsDeleteSource: true, //不删除公共池名单
      options: [], //级联数据
      optionValue: ["", "", ""], //选中的值
      valueArray:[], //选择值数组
      props: {
        value: "Id",
        label: "Name",
        children: "Children"
      },
      exportValue: '',
    };
  },
  mounted() {
    this.getData(0);
    this._delegateExportTag();
  },
  methods: {
    changeData(value) {
      if (this.optionValue.length < 3) {
        this.$message.error('');
        return;
      }
      let arr = [];
      let a = this.options.filter(x => {
        return x.Id == this.optionValue[0];
      });
      a = a[0];
      arr.push(a.Name);

      if (a.Children.length > 0) {
        let b = a.Children.filter(y => {
          return y.Id == this.optionValue[1];
        });
        b = b[0];
        arr.push(b.Name);
        if (b.Children.length > 0) {
          let c = b.Children.filter(z => {
            return z.Id == this.optionValue[2];
          });
          c = c[0];
          arr.push(c.Name);
        }
      }
      this.exportValue = arr.join('/');
    },
    getData() {
      const parmas = {
        Id: 0,
        DelegateTagId: 0,
        AccountName: this.callName,
        ChildName: this.childrenName,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      getManagerCallCenterDelegateCommonList(parmas).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    search() {
      this.currentPage = 1;
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    //打开委托标签列表
    changeTag(item) {
      this.Id = item.Id;
      this.titletup = "委托意向标签-" + item.AccountName;
      this.tagVisible = true;
      this.tagCheckList = this.tagList.filter(e => {
        return e.IsSelect == true;
      });
    },
    exportSearch() {
      this._getManagerCallCenterDelegateRelList();
    },
    //级联
    _getManagerCallCenterDelegateRelList() {
      const params = {
        Id: 0,
        Type: 0,
        SellerName: this.exportName
      };
      getManagerCallCenterDelegateRelList(params).then(res => {
        this.options = res.Data;
      });
    },
    //公共池转出
    _modifyManagerCallCenterDelegateExportCommon() {
      const params = {
        CommonId: this.Id,
        PushDelegateId: this.optionValue[1],
        PushAccountId: this.optionValue[2],
        Remark: "",
        IsDeleteSource:this.IsDeleteSource
      };
      modifyManagerCallCenterDelegateExportCommon(params).then(res => {
        this.exportVisible = false;
        this.getData();
        this.$message({
          message: "转出成功",
          showClose: true,
          type: "success"
        });
      });
    },
    //委托标签列表
    _delegateExportTag() {
      const parmas = {
        Id: this.Id
      };
      delegateExportTag(parmas).then(res => {
        this.tagList = res.Data;
      });
    },
    _delegateExportTagModify() {
      const parmas = {
        CommonId: this.Id,
        List: this.tagCheckList
      };
      delegateExportTagModify(parmas).then(res => {
        this.$message({
          message: "修改成功",
          showClose: true,
          type: "success"
        });
      });
    },
    modifyTag() {
      this.tagVisible = false;
      this._delegateExportTagModify();
    },
    deleteData(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._deleteManagerCallCenterDelegateCommon(item.Id).then(val => {
          this.getData();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    //导出
    exportTo(item) {
      this.Id = item.Id;
      this._getManagerCallCenterDelegateRelList();
      this.titletup = "导出-" + item.FatherName + "/" + item.MotherName;
      this.exportVisible = true;
    },
    exportSure(item) {
      this.exportVisible = false;
      this._modifyManagerCallCenterDelegateExportCommon();
    },
    _deleteManagerCallCenterDelegateCommon(Id) {
      const params = {
        Id: Id
      };
      return deleteManagerCallCenterDelegateCommon(params);
    }
  }
};
</script>

<style lang="less" scoped>
.el-checkbox__label {
  margin-right: 15px;
}
</style>

