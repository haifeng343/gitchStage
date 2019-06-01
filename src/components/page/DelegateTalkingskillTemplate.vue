<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键字:">
          <el-input v-model="searchKey" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="更新时间:">
          <el-date-picker
            v-model="searchTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="float:right;float:right;margin-bottom:10px;" @click="showAddForm">添加话术</el-button>
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="TemplateId" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="Question" align="center" label="问题"></el-table-column>
        <el-table-column prop="Answer" align="center" label="答案"></el-table-column>
        <el-table-column prop="UpdateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="openEditForm(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
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
    <!-- 添加弹出框 -->
    <el-dialog title="添加话术" :visible.sync="addVisible" width="663px">
      <el-form ref="addForm" :model="addForm" :rules="addFormrules" label-width="100px;">
        <el-form-item label="问题:" prop="Question">
          <el-input type="textarea" rows="4" v-model="addForm.Question"></el-input>
        </el-form-item>
        <el-form-item label="答案:" prop="Answer">
          <el-input type="textarea" rows="8"  v-model="addForm.Answer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="addFormOk()" size="medium">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog :title="`编辑话术-${editForm.Question}`" :visible.sync="editVisible" width="663px">
      <el-form ref="editForm" :model="editForm" :rules="editFormrules" label-width="100px">
        <el-form-item label="问题:" prop="Question">
          <el-input type="textarea" rows="4" v-model="editForm.Question"></el-input>
        </el-form-item>
        <el-form-item label="答案:" prop="Answer">
          <el-input type="textarea" rows="6" v-model="editForm.Answer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editFormOk()" size="medium">保 存</el-button>
        <el-button @click="editVisible = false" size="medium">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getManagerCallCenterDelegateTalkingskillTemplateList,
  modifyManagerCallCenterDelegateTalkingskillTemplate,
  addManagerCallCenterDelegateTalkingskillTemplate,
  deleteManagerCallCenterDelegateTalkingskillTemplate
} from "api/entrust.js";
export default {
  name: "DelegateTalkingskillTemplate",
  data() {
    return {
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数

      searchKey: "",
      searchTime: [],

      addVisible: false,
      addForm: {
        Question: "",
        Answer: ""
      },
      addFormrules: {
        Question: [{ required: true, message: "请输入问题", trigger: "blur" }],
        Answer: [{ required: true, message: "请输入答案", trigger: "blur" }]
      },

      editVisible: false,
      editForm: {
        Id: 0,
        Question: "",
        Answer: ""
      },
      editFormrules: {
        Question: [{ required: true, message: "请输入问题", trigger: "blur" }],
        Answer: [{ required: true, message: "请输入答案", trigger: "blur" }]
      }
    };
  },
  created() {
    this._getManagerCallCenterDelegateTalkingskillTemplateList();
  },
  methods: {
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    search() {
      this.cur_page = 1;
      this._getManagerCallCenterDelegateTalkingskillTemplateList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateTalkingskillTemplateList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateTalkingskillTemplateList();
    },
    showAddForm() {
      this.resetForm("addForm");
      this.addVisible = true;
    },
    addFormOk() {
      this._addManagerCallCenterDelegateTalkingskillTemplate().then(val => {
        this.addVisible = false;
        this._getManagerCallCenterDelegateTalkingskillTemplateList();
      });
    },
    openEditForm(item) {
      this.editVisible = true;
      this.editForm.Id = item.TemplateId;
      this.editForm.Question = item.Question;
      this.editForm.Answer = item.Answer;
    },
    editFormOk() {
      this._modifyManagerCallCenterDelegateTalkingskillTemplate().then(val => {
        this.editVisible = false;
        this._getManagerCallCenterDelegateTalkingskillTemplateList();
        this.$message({
          showClose: true,
          message: "编辑成功",
          type: "success"
        });
      });
    },
    deleteData(item) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._deleteManagerCallCenterDelegateTalkingskillTemplate(item.TemplateId).then(val => {
          this._getManagerCallCenterDelegateTalkingskillTemplateList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    //获取委托活动话术列表
    _getManagerCallCenterDelegateTalkingskillTemplateList() {
      const params = {
        Keyword: this.searchKey,
        StartTime: this.searchTime == null ? "" : this.searchTime[0],
        EndTime: this.searchTime == null ? "" : this.searchTime[1],
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getManagerCallCenterDelegateTalkingskillTemplateList(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //修改委托活动话术状态
    _modifyManagerCallCenterDelegateTalkingskillStatus(item) {
      const params = {
        Id: item.Id,
        Status: item.Status
      };
      return modifyManagerCallCenterDelegateTalkingskillStatus(params);
    },
    //添加委托活动话术
    _addManagerCallCenterDelegateTalkingskillTemplate() {
      const params = {
        Question: this.addForm.Question,
        Answer: this.addForm.Answer,
        Keyword: ""
      };
      return addManagerCallCenterDelegateTalkingskillTemplate(params);
    },
    //编辑委托活动话术
    _modifyManagerCallCenterDelegateTalkingskillTemplate() {
      const params = {
        TemplateId: this.editForm.Id,
        Question: this.editForm.Question,
        Answer: this.editForm.Answer,
        Keyword: ""
      };
      return modifyManagerCallCenterDelegateTalkingskillTemplate(params);
    },
    //删除委托活动话术
    _deleteManagerCallCenterDelegateTalkingskillTemplate(Id) {
      const params = {
        Id: Id
      };
      return deleteManagerCallCenterDelegateTalkingskillTemplate(params);
    }
  }
};
</script>
<style scoped lang="less">
.red {
  color: #ff0000;
}
</style>
