<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="委托标签：" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
        <el-button type="primary" @click="add" style="float:right">添加委托标签</el-button>
      </el-form>
      <el-table :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="Name" align="center" label="委托标签"></el-table-column>
        <el-table-column align="center" label="是否有效">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-text="有效"
              inactive-text="无效"
              :active-value="1"
              :inactive-value="2"
              @change="_delegaTeTagStatusModify(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="UpdateTime" align="center" label="最后更新时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" class="red" @click="deleteData(scope.row.Id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--创建标签-->
      <el-dialog title="创建标签" :visible.sync="addVisible" width="700px">
        <el-form
          :model="addForm"
          :rules="addrules"
          ref="addForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="标签名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noAdd">取 消</el-button>
          <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑标签-->
      <el-dialog title="编辑标签" :visible.sync="editVisible" width="700px">
        <el-form
          :model="editForm"
          :rules="editrules"
          ref="editForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="标签名称：" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSure('editForm')">确 定</el-button>
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
import {
  delegaTetagList,
  delegaTeTagStatusModify,
  delegaTeTagAdd,
  delegaTeTagModify,
  delegaTeTagDelete
} from "api/entrust.js";
export default {
  data() {
    return {
      addVisible: false,
      editVisible: false,
      currentPage: 1,
      pageSize: 30,
      pageCount: 0,
      Id: "",
      formInline: {
        name: ""
      },
      List: [],
      addForm: {
        name: ""
      },
      addrules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      },
      editForm: {
        name: ""
      },
      editrules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this._delegaTetagList();
  },
  methods: {
    //获取标签列表
    _delegaTetagList() {
      const parmas = {
        TagName: this.formInline.name,
        Status: 0,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      delegaTetagList(parmas).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pageSize = val;
      this._delegaTetagList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this._delegaTetagList();
    },
    //修改状态
    _delegaTeTagStatusModify(item) {
      const params = {
        TagId: item.Id,
        Status: item.Status
      };
      return delegaTeTagStatusModify(params).catch(ex => {
        this.$message({
          message: "修改成功",
          showClose: true,
          type: "success"
        });
      });
    },
    //增加
    _delegaTeTagAdd() {
      const params = {
        TagName: this.addForm.name
      };
      delegaTeTagAdd(params).then(res => {
        this.addVisible = false;
        this._delegaTetagList();
        this.$message({
          message: "添加成功",
          showClose: true,
          type: "success"
        });
      });
    },
    //编辑
    _delegaTeTagModify() {
      const params = {
        TagId: this.Id,
        TagName: this.editForm.name
      };
      delegaTeTagModify(params).then(res => {
        this.editVisible = false;
        this._delegaTetagList();
        this.$message({
          message: "编辑成功",
          showClose: true,
          type: "success"
        });
      });
    },
    add() {
      this.addVisible = true;
    },
    edit(item) {
      this.editVisible = true;
      this.editForm = Object.assign({}, item);
      this.Id = item.Id;
      this.editForm.name = item.Name;
    },
    deleteData(Id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._delegaTeTagDelete(Id).then(val => {
          this._delegaTetagList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      }).catch(() =>{
          
      })
    },
    //删除
    _delegaTeTagDelete(Id) {
      const params = {
        Id: Id
      };
      return delegaTeTagDelete(params);
    },
    search() {
      this.currentPage = 1;
      this._delegaTetagList();
    },
    noAdd() {
      this.addVisible = false;
      this.$refs["addForm"].resetFields();
    },
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._delegaTeTagAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._delegaTeTagModify();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
