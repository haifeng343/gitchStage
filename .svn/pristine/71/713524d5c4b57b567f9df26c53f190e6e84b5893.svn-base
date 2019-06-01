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
      <div style="float:right;margin-bottom:10px;">
        <el-button type="primary" @click="showExportForm">从模板导入</el-button>
        <el-button type="primary" @click="showAddForm">添加话术</el-button>
      </div>
      <el-table :data="tableData" fixed border ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID" fixed></el-table-column>
        <el-table-column prop="Question" align="center" label="问题"></el-table-column>
        <el-table-column prop="Answer" align="center" label="答案"></el-table-column>
        <el-table-column prop="OrderIndex" align="center" label="排序值"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-text="有效"
              inactive-text="无效"
              :active-value="1"
              :inactive-value="2"
              @change="_modifyManagerCallCenterDelegateTalkingskillStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="UpdateTime" align="center" label="编辑时间"></el-table-column>
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
          <el-input type="textarea" rows="6" v-model="addForm.Answer"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="OrderIndex">
          <el-input v-model="addForm.OrderIndex"></el-input>
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
        <el-form-item label="排序值:" prop="OrderIndex">
          <el-input v-model="editForm.OrderIndex"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editFormOk()" size="medium">保 存</el-button>
        <el-button @click="editVisible = false" size="medium">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 从模板导出弹出框 -->
    <el-dialog title="从模板导出" :visible.sync="exportVisible" width="663px">
      <el-table :data="exportSeller" fixed border ref="multipleTable">
        <el-table-column prop="Question" align="left" label="问题">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.Checked"
              @change="exportCheckedChange(scope.row)"
            >{{scope.row.Question}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="Answer" align="center" label="答案"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="exportHandleSizeChange"
          @current-change="exportHandleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, prev, pager, next, jumper"
          :total="export_pageCount"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportFormOk()" size="medium">确 定</el-button>
        <el-button @click="exportVisible = false" size="medium">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getManagerCallCenterDelegateTalkingskillList,
  modifyManagerCallCenterDelegateTalkingskillStatus,
  addManagerCallCenterDelegateTalkingskill,
  modifyManagerCallCenterDelegateTalkingskill,
  deleteManagerCallCenterDelegateTalkingskill,
  getManagerCallCenterDelegateTalkingskillTemplateList,
  exportManagerCallCenterDelegateTalkingskillFromTemplate,
  getManagerCallCenterDelegateTalkingskillDetails
} from "api/entrust.js";
export default {
  name: "DelegateTalkingskill",
  data() {
    return {
      delegateId: 0,
      tableData: [], //列表数据
      cur_page: 1, //页码
      pagesize: 30, //每页数量
      pageCount: 0, //总条数

      searchKey: "",
      searchTime: [],

      addVisible: false,
      addForm: {
        Question: "",
        Answer: "",
        OrderIndex: ""
      },
      addFormrules: {
        Question: [{ required: true, message: "请输入问题", trigger: "blur" }],
        Answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
        OrderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },

      editVisible: false,
      editForm: {
        Id: 0,
        Question: "",
        Answer: "",
        OrderIndex: ""
      },
      editFormrules: {
        Question: [{ required: true, message: "请输入问题", trigger: "blur" }],
        Answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
        OrderIndex: [
          { required: true, message: "请输入排序值", trigger: "blur" }
        ]
      },

      exportVisible: false,
      exportSeller: [],
      export_pageCount: 0,
      export_cur_page: 1,
      export_pagesize: 10,
      exportCheckedArr: []
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatetalkingskill") != -1) {
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
      this._getManagerCallCenterDelegateTalkingskillList();
    },
    //重置弹出窗口
    resetForm(formName) {
      if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
      }
    },
    search() {
      this.cur_page = 1;
      this._getManagerCallCenterDelegateTalkingskillList();
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this._getManagerCallCenterDelegateTalkingskillList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this._getManagerCallCenterDelegateTalkingskillList();
    },
    //分页导航尺寸更改
    exportHandleSizeChange(val) {
      this.export_pagesize = val;
      this._getManagerCallCenterDelegateTalkingskillTemplateList();
    },
    // 分页导航
    exportHandleCurrentChange(val) {
      this.export_cur_page = val;
      this._getManagerCallCenterDelegateTalkingskillTemplateList();
    },
    showAddForm() {
      this.resetForm("addForm");
      this.addVisible = true;
    },
    addFormOk() {
      this._addManagerCallCenterDelegateTalkingskill().then(val => {
        this.addVisible = false;
        this._getManagerCallCenterDelegateTalkingskillList();
      });
    },
    openEditForm(item) {
      this._getManagerCallCenterDelegateTalkingskillDetails(item.Id).then(
        res => {
          this.editVisible = true;
          this.editForm.Id = item.Id;
          this.editForm.Question = res.Data.Question;
          this.editForm.Answer = res.Data.Answer;
          this.editForm.OrderIndex = res.Data.OrderIndex;
        }
      );
    },
    editFormOk() {
      this._modifyManagerCallCenterDelegateTalkingskill().then(val => {
        this.editVisible = false;
        this._getManagerCallCenterDelegateTalkingskillList();
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
        this._deleteManagerCallCenterDelegateTalkingskill(item.Id).then(val => {
          this._getManagerCallCenterDelegateTalkingskillList().then(() => {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          });
        });
      });
    },
    showExportForm() {
      this.exportCheckedArr = [];
      this.export_cur_page = 1;
      this._getManagerCallCenterDelegateTalkingskillTemplateList().then(val => {
        this.exportVisible = true;
      });
    },
    exportFormOk() {
      this._exportManagerCallCenterDelegateTalkingskillFromTemplate().then(
        val => {
          this.exportVisible = false;
          this.cur_page = 1;
          this._getManagerCallCenterDelegateTalkingskillList();
        }
      );
    },
    exportCheckedChange(item) {
      if (item.Checked) {
        this.exportCheckedArr.push(item.TemplateId);
      } else {
        this.exportCheckedArr.pop(item.TemplateId);
      }
    },
    //获取委托活动话术列表
    _getManagerCallCenterDelegateTalkingskillList() {
      const params = {
        DelegateId: this.delegateId,
        Keyword: this.searchKey,
        StartTime: this.searchTime == null ? "" : this.searchTime[0],
        EndTime: this.searchTime == null ? "" : this.searchTime[1],
        pageindex: this.cur_page,
        pagecount: this.pagesize
      };
      return getManagerCallCenterDelegateTalkingskillList(params).then(res => {
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
    _addManagerCallCenterDelegateTalkingskill() {
      const params = {
        DelegateId: this.delegateId,
        Question: this.addForm.Question,
        Answer: this.addForm.Answer,
        Keyword: "",
        OrderIndex: this.addForm.OrderIndex
      };
      return addManagerCallCenterDelegateTalkingskill(params);
    },
    //编辑委托活动话术
    _modifyManagerCallCenterDelegateTalkingskill() {
      const params = {
        Id: this.editForm.Id,
        Question: this.editForm.Question,
        Answer: this.editForm.Answer,
        Keyword: "",
        OrderIndex: this.editForm.OrderIndex
      };
      return modifyManagerCallCenterDelegateTalkingskill(params);
    },
    //删除委托活动话术
    _deleteManagerCallCenterDelegateTalkingskill(Id) {
      const params = {
        Id: Id
      };
      return deleteManagerCallCenterDelegateTalkingskill(params);
    },
    //获取委托活动话术模板列表
    _getManagerCallCenterDelegateTalkingskillTemplateList() {
      const params = {
        DelegateId: this.delegateId,
        pageindex: this.export_cur_page,
        pagecount: this.export_pagesize
      };
      return getManagerCallCenterDelegateTalkingskillTemplateList(params).then(
        res => {
          this.exportSeller = res.Data.List;
          this.export_pageCount = res.Data.TotalCount;
          this.exportSeller.forEach(item => {
            if (this.exportCheckedArr.indexOf(item.TemplateId) != -1) {
              item.Checked = true;
            } else {
              item.Checked = false;
            }
          });
        }
      );
    },
    _exportManagerCallCenterDelegateTalkingskillFromTemplate() {
      const params = {
        DelegateId: this.delegateId,
        TemplateIdArr: this.exportCheckedArr.join(",")
      };
      return exportManagerCallCenterDelegateTalkingskillFromTemplate(params);
    },
    _getManagerCallCenterDelegateTalkingskillDetails(id) {
      const params = {
        Id: id
      };
      return getManagerCallCenterDelegateTalkingskillDetails(params);
    }
  }
};
</script>
<style scoped lang="less">
.red {
  color: #ff0000;
}
</style>
