<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>权限与用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">用户名:</label>
                <el-input v-model="username" placeholder="请输入用户名" class="handle-input mr10"></el-input>
                <label for="">手机号:</label>
                <el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" style="float:right;float:right;" @click="showAddForm">添加用户</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="UserName" align="center" label="用户名" width="120">
                </el-table-column>
                <el-table-column prop="Mobile" align="center" label="手机号">
                </el-table-column>
                <el-table-column prop="Email" align="center" label="邮箱">
                </el-table-column>
                <el-table-column prop="PositionName" align="center" label="职位">
                </el-table-column>
                <el-table-column prop="DepartmentName" align="center" label="部门">
                </el-table-column>
                <el-table-column label="账户状态" width="150" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.Status"
                          active-text="有效"
                          inactive-text="无效"
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="scope.row.UserName === ms_username"
                          @change="changeStatus($event, scope.row.Id)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="超级管理" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.IsSuperAdmin"
                          active-text="是"
                          inactive-text="否"
                          :disabled="scope.row.UserName === ms_username"
                          @change="changeSuper($event, scope.row.Id)"
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
                        <el-button type="text" @click="showrole(scope.row)">角色列表</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="changePass(scope.row)">修改密码</el-button>
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
        <el-dialog title="添加用户" :visible.sync="addVisible" width="663px">
            <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">          
                <el-form-item label="用户名" prop="addusername">
                    <el-input v-model="addForm.addusername" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="addmobile">
                    <el-input v-model="addForm.addmobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="addemail">
                    <el-input v-model="addForm.addemail" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="addpassword">
                    <el-input type="password" v-model="addForm.addpassword" placeholder="请输入密码(默认:123456)"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="addrepassword">
                    <el-input type="password" v-model="addForm.addrepassword"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="departmentId">
                    <el-select v-model="addForm.departmentId" placeholder="请选择">
                        <el-option
                        v-for="item in departmentList"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位:" prop="positionId">
                    <el-select v-model="addForm.positionId" placeholder="请选择">
                        <el-option
                        v-for="item in positionList"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="_addAccount('addForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑用户" :visible.sync="editVisible" width="663px">
            <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                <el-form-item label="用户名" prop="editusername">
                    <el-input v-model="editForm.editusername" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="editmobile">
                    <el-input v-model.number="editForm.editmobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="editemail">
                    <el-input v-model="editForm.editemail" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="部门:" prop="departmentId">
                    <el-select v-model="editForm.departmentId" placeholder="请选择">
                        <el-option
                        v-for="item in departmentList"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位:" prop="positionId">
                    <el-select v-model="editForm.positionId" placeholder="请选择">
                        <el-option
                        v-for="item in positionList"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="save('editForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 角色列表弹出框 -->
        <el-dialog :title='`角色列表-${roleForm.name}`' :visible.sync="roleVisible" width="663px">
            <el-form ref="roleForm" v-model="roleForm.type" label-width="100px">
                <el-form-item label="角色列表:">
                    <el-checkbox-group v-model="checkedList" @selection-change="changeFun">
                        <el-checkbox v-for="item in roleList" :key="item.Id" :label="item.Id" name="type">{{item.Name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="medium" class="dialog-certain" @click="_saveRoleList()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改密码弹出框 -->
        <el-dialog title='修改密码' :visible.sync="changeVisible" width="663px">
             <el-form ref="modifyForm" :model="modifyForm" :rules="modifyrules" label-width="100px">
                <el-form-item label="新密码:" prop="password">
                    <el-input type="password" v-model="modifyForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="repassword">
                    <el-input type="password" v-model="modifyForm.repassword" placeholder="请确认密码"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="medium" class="dialog-certain" @click="_savemodifyList('modifyForm')">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getUserData, accountEnable, editUserData, setSuperAdmin, addAccount,getDepartment,modifyRoleAuth,getPosition, modifyPassword} from 'api/user.js'
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        name: 'UserManage',
        data() {
            var NRaddusername = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('账号不能为空'));
                }else{
                    callback()
                }  
            };
            var NRaddpassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                    } else {
                    if (this.addForm.addrepassword !== '') {
                        this.$refs.addForm.validateField('addrepassword');
                        callback();
                    }
                    callback();
                    }
                };
            var NRaddrepassword = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.addForm.addpassword) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            var NRpassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                    } else {
                    if (this.modifyForm.repassword !== '') {
                        this.$refs.modifyForm.validateField('repassword');
                        callback();
                    }
                    callback();
                    }
                };
            var NRrepassword = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.modifyForm.password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            var NRaddmobile = (rule, value, callback) => {
                if (value.length != 11) {
                callback(new Error('请输入正确的手机号'));
                } else {
                callback();
                }
            };
            var NRaddemail = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入邮箱'));
                } else {
                callback();
                }
            };
            return {
                url: './static/vuetable.json',
                tableData: [],
                Id:'',
                cur_page: 1,
                pageCount:0,
                ms_username:'',
                pagesize:30,
                multipleSelection: [],
                departmentList:[],
                username:'',
                positionList:'',
                value3:true,
                phone:'',
                checkedList:[],
                del_list: [],
                is_search: false,
                editVisible: false,
                changeVisible: false,
                delVisible: false,
                roleVisible:false,
                addVisible:false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                addForm: {
                    addusername: '',
                    addpassword: '',
                    addrepassword: '',
                    addmobile:'',
                    addemail:'',
                    departmentId:'',
                    positionId:''
                },
                editForm: {
                    editusername: '',
                    editmobile:'',
                    editemail:'',
                    departmentId:'',
                    positionId:''
                },
                modifyForm: {
                    name:'',
                    password:'',
                    repassword:''
                },
                modifyrules:{
                    password: [
                        { validator:NRpassword, trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在6个字符', trigger: 'blur' }
                    ],
                    repassword: [
                        { validator:NRrepassword, trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在6个字符', trigger: 'blur' }
                    ],
                },
                roleList:[
                ],
                roleForm:{
                    name:''
                },
                addrules:{
                    addusername: [
                        { validator:NRaddusername,required: true, trigger: 'blur' },
                        // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    addpassword: [
                        { validator:NRaddpassword,required: true, trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在6-20个字符', trigger: 'blur' }
                    ],
                    addrepassword: [
                        { validator:NRaddrepassword,required: true, trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在6-20个字符', trigger: 'blur' }
                    ],
                    addmobile: [
                        { validator:NRaddmobile,required: true, trigger: 'blur' },   
                        // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    addemail: [
                        // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    departmentId:[
                        
                    ],
                    positionId:[
                        
                    ]
                },
                editrules:{
                    editusername: [
                         { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    editmobile: [
                         { required: true,message: '请输入用户手机号', trigger: 'blur' },
                    ],
                    editemail: [
                        
                    ],
                    departmentId:[
                        
                    ],
                    positionId:[
                        
                    ]
                },
                idx: -1
            }
        },
        created() {
            this.ms_username = localStorage.ms_username
            this.getData();
            this._getDepartment()
            this._getPosition()
        },
        computed: {
            isChangeRole(){
                return this.$store.state.IsChangeRole
            }
        },
        watch:{
            isChangeRole(value){
                this.getData();
                if(value){
                    this.$store.commit('ISCHANGEROLE',false)
                }
            }
        },
        methods: {
            ...mapGetters([
                'IsChangeRole'
            ]),
            _savemodifyList(formName){
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'Id':this.Id,
                        'Password': this.$md5(this.modifyForm.password)
                    }
                    modifyPassword(params).then(res =>{
                        if(res.Success){
                        this.$message({
                            showClose: true,
                            message: '密码修改成功',
                            type: 'success'
                        });
                        this.changeVisible = false;
                        }else{
                            this.$message(res.Message);
                        }
                    })
                } else {
                    return false;
                }
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
                        'Id':this.Id,
                        'UserName': this.editForm.editusername,
                        "Mobile": this.editForm.editmobile,
                        "Email": this.editForm.editemail,
                        'DepartmentId': this.editForm.departmentId,
                        'PositionId': this.editForm.positionId,
                    }
                    editUserData(params).then(res =>{
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
                this.Id = item.Id
                this.editForm.editusername = item.UserName
                this.editForm.editmobile = item.Mobile
                this.editForm.editemail = item.Email
                this.editForm.departmentId = item.DepartmentId
                this.editForm.positionId = item.PositionId
            },
            // 获取部门列表
            _getDepartment(){
              const params = {
                  'pageSize':100,
                  'pageIndex':1,
                  'Name':''
              }
              getDepartment(params).then(res =>{
                this.departmentList = res.Data.List
              })
            },
            _getPosition() {
              const params = {
                'pageindex': 1,
                'pagesize': 100,
                'name': '',
              }
              getPosition(params).then(res =>{
                if (res && res.Success){
                        this.positionList = res.Data.List
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
              })
            },
            // 角色权限选择
            changeFun(value){
                this.checkedList.push(val)
            },
            // 角色权限保存
            _saveRoleList(){
                const params = {
                    'AccountId': this.Id,
                    'RoleIdList': this.checkedList
                }
                modifyRoleAuth(params).then(res =>{
                    if(res.Success){
                    this.$message({
                        showClose: true,
                        message: '保存成功',
                        type: 'success'
                    });
                    this.getData(this.cur_page)
                    this.roleVisible = false
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
            },
            // 添加用户
            _addAccount(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            'UserName': this.addForm.addusername,
                            "Password": this.$md5(this.addForm.addpassword),
                            "Mobile": this.addForm.addmobile,
                            "Email": this.addForm.addemail,
                            'DepartmentId': this.addForm.departmentId,
                            'PositionId': this.addForm.positionId,
                        }
                        addAccount(params).then(res =>{
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
            // 设置超级管理员
            changeSuper(status,id){
              const params = {
                'Id': id,
                "IsSuperAdmin": status,
              }
              setSuperAdmin(params).then(res =>{
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
            // 修改switch的状态
            changeStatus(status,id){
              const params = {
                'Id': id,
                "Status": status,
              }
              accountEnable(params).then(res =>{
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
            // 获取表格数据
            getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagesize': this.pagesize,
                'username': this.username,
                'mobile': this.phone
              }
              getUserData(params).then(res =>{
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
