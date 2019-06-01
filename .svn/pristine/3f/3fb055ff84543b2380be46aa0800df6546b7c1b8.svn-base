<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>权限与用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" style="float:right;margin-bottom:10px;" @click="showAddForm">添加分类</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="TypeId" align="center" label="ID">
                </el-table-column>
                <el-table-column prop="TypeName" align="center" label="分类名称">
                </el-table-column>
                <el-table-column prop="TypeIconUrl" align="center" label="分类图标">
                  <template slot-scope="scope">
                    <img class="iconImg" :src="scope.row.TypeIconUrl" alt="">
                  </template>
                </el-table-column>
                <el-table-column prop="OrderIndex" align="center" label="排序值">
                </el-table-column>
                <el-table-column label="更新时间" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="deleteData(scope.row.TypeId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增弹出框 -->
        <el-dialog title="添加分类" :visible.sync="addVisible" width="663px">
            <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">          
                <el-form-item label="分类名称" prop="TypeName">
                    <el-input v-model="addForm.TypeName" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <el-form-item label="问题排序" prop="OrderIndex">
                    <el-input v-model.number="addForm.OrderIndex" placeholder="请输入问题排序"></el-input>
                </el-form-item>
                <el-form-item label="分类图标" prop="TypeIcon">
                    <el-upload
                      class="avatar-uploader"
                      action="api/common/img/upload/12"
                      :headers="myHeaders"
                      :show-file-list="false"
                      list-type="picture-card"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="addForm.TypeIcon" :src="addForm.TypeIcon" class="avatar" @mousemove="showDelete" @mouseout="hideDelete">
                      <i v-if="addForm.TypeIcon" class="el-icon-delete" @click.stop="handleRemove" @mousemove="showDelete" :class="isShowDelete?'upload-delete': ''"></i>
                      <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="_addAccount('addForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑分类" :visible.sync="editVisible" width="663px">
            <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                <el-form-item label="分类名称" prop="TypeName">
                    <el-input v-model="editForm.TypeName" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="分类排序" prop="OrderIndex">
                    <el-input v-model.number="editForm.OrderIndex" placeholder="请输入分类排序"></el-input>
                </el-form-item>
                <el-form-item label="分类图标" prop="TypeIcon">
                    <el-upload
                      class="avatar-uploader"
                      action="api/common/img/upload/12"
                      :headers="myHeaders"
                      :show-file-list="false"
                      list-type="picture-card"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="editForm.TypeIcon" :src="editForm.TypeIcon" class="avatar" @mousemove="showDelete" @mouseout="hideDelete">
                      <i v-if="editForm.TypeIcon" class="el-icon-delete" @click.stop="handleRemove" @mousemove="showDelete" :class="isShowDelete?'upload-delete': ''"></i>
                      <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="dialog-time-box">
                <span v-if="editForm.CreateTime != ''">创建时间:{{editForm.CreateTime}}</span><span v-if="editForm.UpdateTime != ''">最后更新时间:{{editForm.UpdateTime}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="save('editForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 角色列表弹出框 -->
    </div>
</template>

<script>
    import {getQuestClassifyList, editQuestClassifyList, addQuestClassifyList,deleteQuestClassifyList} from 'api/system.js'
    export default {
        name: 'QuestionClassify',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                myHeaders:{
                    application:`manager`
                },
                isShowDelete:false,
                Id:'',
                Path:'',
                editVisible: false,
                addVisible:false,
                addForm: {
                    TypeName:'',
                    OrderIndex:0,
                    TypeIcon:''
                },
                editForm: {
                    TypeName:'',
                    OrderIndex:0,
                    TypeIcon:'',
                    CreateTime:'',
                    UpdateTime:''
                },
                addrules:{
                    TypeName: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                        // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    OrderIndex: [
                        { required: true, message: '请输入排序值', trigger: 'blur' },
                        { type:'number', message: '排序值为数字', trigger: 'blur' }
                    ],
                    TypeIcon: [
                         { required: true, message: '请选择分类图标', trigger: 'blur' },
                    ]
                },
                editrules:{
                   TypeName: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                        // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    OrderIndex: [
                        { required: true, message: '请输入排序值', trigger: 'blur' },
                        { type:'number', message: '排序值为数字', trigger: 'blur' }
                    ],
                    TypeIcon: [
                         { required: true, message: '请选择分类图标', trigger: 'blur' },
                    ]
                },
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        watch:{
        },
        methods: {
            showDelete(){
                this.isShowDelete = true
            },
            hideDelete(){
                this.isShowDelete = false
            },
            handleRemove(){
                this.addForm.TypeIcon = ''
                this.editForm.TypeIcon = ''
                this.Path = ''
            },
            // 图片上传成功
            handleAvatarSuccess(res, file){
              this.addForm.TypeIcon = res.Data.ImgUrl
              this.editForm.TypeIcon = res.Data.ImgUrl
              this.Path = res.Data.ImgPath
            },
            beforeAvatarUpload(file){
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isLt2M;
            },
            // 删除
            deleteData(id){
              this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const params = {
                  'Id':id
                }
                deleteQuestClassifyList(params).then(res=> {
                  if(res.Success){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    this.getData()
                  }else{
                    this.$message.error(res.Message)
                  }
                }).catch(error => {
                  console.log('error')
                })
                
              }).catch(() => {       
              });
            },
            // 显示修改密码
            changePass(item){
                this.changeVisible = true
                this.Id = item.Id
            },
            // 保存编辑
            save(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'TypeId':this.Id,
                        'TypeName': this.editForm.TypeName,
                        "OrderIndex": this.editForm.OrderIndex,
                        "TypeIcon": this.Path,
                    }
                    editQuestClassifyList(params).then(res =>{
                        if(res.Success){
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getData(this.cur_page)
                        this.editVisible = false;
                        }else{
                            this.$message(res.Message);
                        }
                    })
                } else {
                    return false;
                }
              });
            },
            // 显示编辑弹窗
            handleEdit(item){
                this.editVisible = true
                this.Id = item.TypeId
                this.editForm.TypeName = item.TypeName
                this.editForm.OrderIndex = item.OrderIndex
                this.Path = ''
                this.editForm.TypeIcon = item.TypeIconUrl
                this.editForm.CreateTime = item.CreateTime
                this.editForm.UpdateTime = item.UpdateTime
            },
            // 角色权限选择
            changeFun(value){
                this.checkedList.push(val)
            },
            // 角色权限保存
            // 显示角色列表
            showrole(item){
              this.Id = item.Id
              this.roleVisible = true;
              this.roleForm.name = item.UserName
              this.roleList = item.RoleList
              var arr =[]
              for(let i = 0;i<this.roleList.length;i++){
                  if(this.roleList[i].IsChoice){
                      arr.push(this.roleList[i].Id)
                  }
              }
              this.checkedList = arr
            },
            showAddForm(){
              this.addVisible = true;
              this.addForm.TypeName = ''
              this.addForm.OrderIndex = ''
              this.addForm.TypeIcon = ''
              this.Path = ''
            },
            // 添加用户
            _addAccount(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            'TypeName': this.addForm.TypeName,
                            "OrderIndex": this.addForm.OrderIndex,
                            "TypeIcon": this.Path,
                        }
                        addQuestClassifyList(params).then(res =>{
                            if(res.Success){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getData(this.cur_page)
                            this.addVisible = false;
                            }else{
                                this.$message.error(res.Message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取表格数据
            getData() {
              const params = {
              }
              getQuestClassifyList(params).then(res =>{
                this.tableData = res.Data
              })
            },
            search() {
                this.cur_page = 1
                this.getData();
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 220px;
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
<style>
    .upload-delete{
        color: #fff !important;
        position: absolute;
        top: 45%;
        left: 45%;
        font-size:24px;
    }
</style>