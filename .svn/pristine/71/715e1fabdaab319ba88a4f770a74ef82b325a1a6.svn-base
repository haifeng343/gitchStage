<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>权限与用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">问题名称:</label>
                <el-input v-model="QuestionName" placeholder="请输入问题名称" class="handle-input mr10"></el-input>
                <label for="">分类名称:</label>
                <el-select v-model="TypeId" placeholder="请选择分类名称">
                    <el-option
                      v-for="item in TypeList"
                      :key="item.TypeId"
                      :label="item.TypeName"
                      :value="item.TypeId">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" style="float:right;float:right;" @click="showAddForm">添加问题</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="QuestionId" align="center" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="QuestName" align="center" label="问题名称" >
                </el-table-column>
                <el-table-column prop="Answer" align="center" label="答案链接" width="300">
                    <template slot-scope="scope">
                        <span class="answer">{{scope.row.Answer}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="TypeList" align="center" label="所属分类">
                    <template slot-scope="scope">
                        <el-button type="text" @click="openType(scope.row)">{{scope.row.TypeList.length > 0 ? showType(scope.row.TypeList) : '/'}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="OrderIndex" align="center" label="排序值">
                </el-table-column>
                <el-table-column label="是否常见问题" width="150" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.IsCommon"
                          active-text="是"
                          inactive-text="否"
                          :active-value="true"
                          :inactive-value="false"
                          @change="changeCommon($event, scope.row.QuestionId)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否置顶" width="150" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.IsTop"
                          active-text="是"
                          inactive-text="否"
                          :active-value="true"
                          :inactive-value="false"
                          @change="changeStatus($event, scope.row.QuestionId)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否有效" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.Status"
                          active-text="是"
                          inactive-text="否"
                          :active-value="1"
                          :inactive-value="0"
                          @change="changeSuper($event, scope.row.QuestionId)"
                          >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="deleteData(scope.row.QuestionId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="30"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageCount">
                </el-pagination>
            </div>
        </div>
        <!-- 新增弹出框 -->
        <el-dialog title="添加问题" :visible.sync="addVisible" width="800px">
            <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">          
                <el-form-item label="问题名称" prop="QuestName">
                    <el-input v-model="addForm.QuestName" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <el-form-item label="问题排序" prop="OrderIndex">
                    <el-input v-model.number="addForm.OrderIndex" placeholder="请输入问题排序"></el-input>
                </el-form-item>
                <el-form-item label="问题答案" prop="Answer">
                   <div class="quill-wrap">
                        <quill-editor
                        v-model="addForm.Answer"
                        ref="myQuillEditor"
                        :options="editorOption"
                        >
                        </quill-editor>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="_addAccount('addForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑用户" :visible.sync="editVisible" width="800px">
            <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                <el-form-item label="问题名称" prop="QuestName">
                    <el-input v-model="editForm.QuestName" placeholder="请输入问题名称"></el-input>
                </el-form-item>
                <el-form-item label="问题排序" prop="OrderIndex">
                    <el-input v-model.number="editForm.OrderIndex" placeholder="请输入问题排序"></el-input>
                </el-form-item>
                <el-form-item label="问题答案" prop="Answer">
                     <div class="quill-wrap">
                        <quill-editor
                        v-model="editForm.Answer"
                        ref="myQuillEditor"
                        :options="editorOption"
                        >
                        </quill-editor>
                    </div>
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
        <el-dialog title='所属分类' :visible.sync="typeVisible" width="663px">
            <el-form ref="typeForm" v-model="typeForm" label-width="100px">
                <el-form-item label="问题名称:" prop="password">
                    <span>{{typeForm.name}}</span>
                </el-form-item>
                <el-form-item label="请选择分类:">
                    <div class="checkBox">
                        <el-checkbox-group v-model="checkedList" @selection-change="changeFun">
                            <el-checkbox v-for="item in questionType" :key="item.Id" :label="item.TypeId" name="type">{{item.TypeName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="_saveRoleList()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getQuestionList,editQuestionType, getQuestionType, modifyQuestionStatus, editQuestionList, modifyQuestionTop, addQuestionList,modifyQuestionCommon,deleteQuestionList} from 'api/system.js'
    import {mapMutations,mapGetters} from 'vuex'
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor, Quill } from 'vue-quill-editor';
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: 'QuestionList',
        components:{
            quillEditor
        },
        data() {
            return {
                url: './static/vuetable.json',
                config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
                },
                tableData: [],
                Id:'',
                cur_page: 1,
                pageCount:0,
                ms_username:'',
                pagesize:30,
                TypeId:0,
                TypeList:[
                  {
                    TypeId: 0,
                    TypeName: '全部',
                    TypeIconUrl: '',
                    OrderIndex: '',
                    CreateTime: '',
                    UpdateTime: ''
                  },
                ],
                multipleSelection: [],
                departmentList:[],
                QuestionName:'',
                positionList:'',
                value3:true,
                phone:'',
                checkedList:[],
                del_list: [],
                is_search: false,
                editVisible: false,
                changeVisible: false,
                delVisible: false,
                typeVisible:false,
                addVisible:false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                addForm: {
                    QuestName:'',
                    OrderIndex:0,
                    Answer:''
                },
                editForm: {
                    QuestName:'',
                    OrderIndex:0,
                    Answer:'',
                    CreateTime:'',
                    UpdateTime:''
                },
                modifyForm: {
                    name:'',
                    password:'',
                    repassword:''
                },
                modifyrules:{
                },
                questionType:[
                ],
                typeForm:{
                    name:''
                },
                addrules:{
                    QuestName: [
                        { required: true, message: '请输入问题名称', trigger: 'blur' },
                        // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    OrderIndex: [
                        { required: true, message: '请输入问题排序', trigger: 'blur' },
                        { type:'number', message: '排序值为数字', trigger: 'blur' }
                    ],
                    Answer: [
                         { required: true, message: '请输入问题答案', trigger: 'blur' },
                    ]
                },
                editrules:{
                    QuestName: [
                        { required: true, message: '请输入问题名称', trigger: 'blur' },
                        // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    OrderIndex: [
                        { required: true, message: '请输入问题排序', trigger: 'blur' },
                        { type:'number', message: '排序值为数字', trigger: 'blur' }
                    ],
                    Answer: [
                         { required: true, message: '请输入问题答案', trigger: 'blur' },
                    ]
                },
                idx: -1,
                editorOption: {
                    modules: {
                    ImageExtend: {
                        loading: true,
                        name: "img",
                        action: "api/common/img/upload/99",
                        headers: xhr => {
                        xhr.setRequestHeader("application", "manager");
                        }, // 可选参数 设置请求头部
                        response: res => {
                        return res.Data.ImgUrl;
                        }
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                        image: function() {
                            QuillWatch.emit(this.quill.id);
                        }
                        }
                    }
                    }
                }
            }
        },
        created() {
            this.ms_username = localStorage.ms_username
            this.getData();
            this._getQuestionType()
        },
        mounted(){
        },
        destroyed(){
        },
        computed: {
        },
        watch:{
        },
        methods: {
            openType(item){
                this.Id = item.QuestionId
                this.typeVisible = true
                this.typeForm.name = item.QuestName
                var arr =[]
                for(let i = 0;i<item.TypeList.length;i++){
                    arr.push(item.TypeList[i].TypeId)
                }
                this.checkedList = arr
            },
            showType(arr){
                if(arr && arr.length > 0){
                    var newArr =[]
                    for(let i = 0;i<arr.length;i++){
                        newArr.push(arr[i].TypeName)
                    }
                    return newArr.toString()
                }
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
                deleteQuestionList(params).then(res=> {
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
                        'QuestionId':this.Id,
                        'QuestName': this.editForm.QuestName,
                        "OrderIndex": this.editForm.OrderIndex,
                        "Answer": this.editForm.Answer,
                    }
                    editQuestionList(params).then(res =>{
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
                this.Id = item.QuestionId
                this.editForm.QuestName = item.QuestName
                this.editForm.OrderIndex = item.OrderIndex
                this.editForm.Answer = item.Answer
                this.editForm.CreateTime = item.CreateTime
                this.editForm.UpdateTime = item.UpdateTime
            },
            // 角色权限选择
            changeFun(value){
                this.checkedList.push(val)
            },
            // 角色权限保存
            _saveRoleList(){
                const params = {
                    'QuestionId': this.Id,
                    'TypeId': this.checkedList
                }
                editQuestionType(params).then(res =>{
                    if(res.Success){
                    this.$message({
                        showClose: true,
                        message: '保存成功',
                        type: 'success'
                    });
                    this.getData(this.cur_page)
                    this.typeVisible = false
                    }else{
                        this.$message.error(res.Message);
                    }
                })  
            },
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
            //分页导航尺寸更改
            handleSizeChange(val){
                this.pagesize = val;
                this.getData();
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            showAddForm(){
              this.addVisible = true;
              this.addForm.QuestName = ''
              this.addForm.OrderIndex = ''
              this.addForm.Answer = ''
            },
            // 添加用户
            _addAccount(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            'QuestName': this.addForm.QuestName,
                            "OrderIndex": this.addForm.OrderIndex,
                            "Answer": this.addForm.Answer,
                            "IsTop": false,
                            "IsCommon": false,
                        }
                        addQuestionList(params).then(res =>{
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
            // 设置是否常见
            changeCommon(status,id){
              const params = {
                'QuestionId': id,
                "IsCommon": status,
              }
              modifyQuestionCommon(params).then(res =>{
                if(res.Success){
                  this.$message({
                    showClose: true,
                    message: '设置成功',
                    type: 'success'
                  });
                  this.getData(this.cur_page)
                }
              })
            },
            // 设置是否有效
            changeSuper(status,id){
              const params = {
                'QuestionId': id,
                "Status": status,
              }
              modifyQuestionStatus(params).then(res =>{
                if(res.Success){
                  this.$message({
                    showClose: true,
                    message: '设置成功',
                    type: 'success'
                  });
                  this.getData(this.cur_page)
                }
              })
            },
            // 设置是否置顶
            changeStatus(status,id){
              const params = {
                'QuestionId': id,
                "IsTop": status,
              }
              modifyQuestionTop(params).then(res =>{
                if(res.Success){
                  this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success'
                  });
                  this.getData(this.cur_page)
                }
              })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取所有问题分类
            _getQuestionType(){
                const params = {
                }
              getQuestionType(params).then(res =>{
                var arr =[]
                for(let i = 0;i<res.Data.length;i++){
                        arr.push({'TypeId':res.Data[i].TypeId,'TypeName':res.Data[i].TypeName})
                }
                this.questionType = arr
                this.TypeList = this.TypeList.concat(res.Data)
              })
            },
            // 获取表格数据
            getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'TypeId': this.TypeId,
                'QuestionName': this.QuestionName
              }
              getQuestionList(params).then(res =>{
                this.tableData = res.Data.List
                this.pageCount = res.Data.TotalCount
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
    .answer{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #editor{
        width: 600px;
        height: 350px;
    }
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