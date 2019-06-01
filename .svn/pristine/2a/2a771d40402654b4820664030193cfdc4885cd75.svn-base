<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="模板名称:">
          <el-input v-model="accountName" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
        <el-button
          type="primary"
          style="float:right;float:right;margin-bottom:10px;"
          @click="AddTemplate"
        >添加模板</el-button>
      </el-form>

      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="name" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="name" align="center" label="模板名称"></el-table-column>
        <el-table-column label="是否有效" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-text="有效"
              inactive-text="无效"
              :active-value="1"
              :inactive-value="2"
              @change="_modifyCallCenterAccountStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="最后更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="jumplate(scope.row)">模板规则</el-button>
            <el-button type="text" @click="delate(scope.row)" class="red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加模板-->
      <el-dialog title="添加模板" :visible.sync="addVisible" width="500px">
        <span>模板名称：</span>
        <el-input style="width:300px" value></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="submit()">确认</el-button>
          <el-button @click="addVisible = false" type="primary">关闭</el-button>
        </span>
      </el-dialog>

      <!--编辑模板-->
      <el-dialog title="编辑模板" :visible.sync="editVisiable" width="500px">
        <span>模板名称：</span>
        <el-input style="width:300px" v-model="tableData[0].name"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sure()">确认</el-button>
          <el-button @click="editVisiable = false" type="primary">关闭</el-button>
        </span>
      </el-dialog>
      
       <!--删除弹窗-->
    <el-dialog title="删除提成次数" center :visible.sync="deleteVisible" width="400px">
      <p class="text-center delete-textlog">您确定要删除该次数吗?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletesure">确 定</el-button>
      </span>
    </el-dialog>

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  modifyCallCenterAccountStatus,
} from "api/entrust.js";

export default {
  data() {
    return {
      accountName: "",
      accountMobile: "",
      deleteVisible:false,
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
      ], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数
      addVisible: false,
      editVisiable: false
    };
  },
  methods: {
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getCallCenterAccountList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getCallCenterAccountList();
    },
    AddTemplate() {
      this.addVisible = true;
    },
    // 修改状态
    _modifyCallCenterAccountStatus(item) {
      const params = {
        AccountId: item.AccountId,
        Status: item.Status
      };
      return modifyCallCenterAccountStatus(params).catch(ex => {
        this._getCallCenterAccountList();
      });
    },
    submit() {},
    search() {},
    edit(item) {
      this.editVisiable = true;
    },
    delate(id) {
      this.deleteVisible = true;
    },
    deletesure() {
      this.deleteVisible = false;
    },
    jumplate(item) {
      this.$router.push({
        path: `/sell_TemplateRule/${item.AccountId}`,
        query: {
          name: item.AccountName,
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
