<template>
  <div class>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>权限与用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div class="handle-box">
          <label for="" style="font-size:16px;">角色名称:</label>
          <el-input v-model="username" placeholder="请输入角色名" class="handle-input mr10"></el-input>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
          <el-button type="primary" style="float:right" @click="showAddForm">添加角色</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="Name" align="center" label="角色名称"></el-table-column>
        <el-table-column
          align="center"
          prop="Description"
          show-overflow-tooltip
          label="角色描述"
        ></el-table-column>
        <el-table-column label="更新时间"  align="center">
          <template slot-scope="scope">{{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}</template>
        </el-table-column>
        <el-table-column label="操作"  align="center" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="jumpUrl(scope.row)">权限列表</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row.Id)"
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
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑角色" :visible.sync="editVisible" width="663px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
          <el-form-item label="角色名称:" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述:" prop="des">
            <el-input type="textarea" v-model="editForm.des"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-time-box">
            <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span><span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="_editRole('editForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加弹出框 -->
      <el-dialog title="添加角色" :visible.sync="addVisible" width="663px;">
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="addrules"
          label-width="100px"
          autocomplete="off"
        >
          <el-form-item label="角色名称:" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述:" prop="des">
            <el-input type="textarea" v-model="addForm.des"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="addRole('addForm')"
          >提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleData, deleteRoleData, addRoleData, editRoleData} from "api/user.js";
import {mapMutations} from 'vuex'
export default {
  name:"RoleManage",
  data() {
    return {
      message: "first",
      showHeader: false,
      cur_page: 1,
      Id:'',
      pageCount: 0,
      pagesize: 30,
      username: "",
      tableData: [],
      addVisible: false,
      editVisible: false,
      editForm: {
        name: "",
        des: "",
        createTime:'',
        updateTime:''
      },
      addForm: {
        name: "",
        des: ""
      },
      addrules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
      },
      editrules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 跳转链接
    jumpUrl(item){
      this.$router.push(`roleAuth/${item.Id}`)
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
    // 显示编辑弹窗
    handleEdit(item){
      this.editVisible = true
      this.Id = item.Id
      this.editForm.name = item.Name
      this.editForm.des = item.Description
      this.editForm.createTime = item.CreateTime
      this.editForm.updateTime = item.UpdateTime
    },
    showAddForm(){
      this.addVisible = true;
      this.addForm.name = '';
      this.addForm.des = ''

    },
    addRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
              'Name': this.addForm.name,
              "Description": this.addForm.des,
          }
          addRoleData(params).then(res =>{
              if(res.Success){
              this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
              });
              this.getData(this.cur_page)
              this.addVisible = false;
              this.$store.commit('ISCHANGEROLE',true)
              }else{
                  this.$message.error('res.Message');
              }
          })
        } else {
          return false;
        }
      });
    },
    _editRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
              'Id':this.Id,
              'Name': this.editForm.name,
              "Description": this.editForm.des,
          }
          editRoleData(params).then(res =>{
              if(res.Success){
              this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
              });
              this.getData(this.cur_page)
              this.editVisible = false;
              this.$store.commit('ISCHANGEROLE',true)
              }else{
                  this.$message.error('res.Message');
              }
          })
        } else {
          return false;
        }
      });
    },
    // 获取角色列表
    getData() {
      const params = {
        'PageIndex': this.cur_page,
        'PageSize': this.pagesize,
        'Name': this.username
      };
      getRoleData(params).then(res => {
        this.tableData = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },
    search() {
      this.cur_page = 1
      this.getData();
    },
    // 删除角色
    deleteData(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            'id': id
          };
          deleteRoleData(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
                // this.IsChangeRole(this.IsChangeRole = true)
                this.$store.commit('ISCHANGEROLE',true)
              } else {
                this.$message.error(res.Message);
              }
            })
        })
        .catch(() => {
          
        });
    },
    ...mapMutations({
        IsChangeRole: 'ISCHANGEROLE'
    }),
  },
  computed: {
  }
};
</script>

<style scope>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
.add-container {
  width: 600px;
  padding-top: 15px;
  margin: 0 auto;
}
.quantity-box {
  width: 500px;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #cccccc;
}
  .handle-box {
      margin-bottom: 20px;
  }
  .handle-select {
      width: 120px;
  }

  .handle-input {
      width: 300px;
      display: inline-block;
  }
  .del-dialog-cnt{
      font-size: 16px;
      text-align: center
  }
  .table{
      width: 100%;
      font-size: 14px;
  }
  .red{
      color: #ff0000;
  }
</style>
