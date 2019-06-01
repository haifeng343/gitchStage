<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>权限与用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" style="float:right" @click="showAddForm">开通权限</el-button>
            </div>
            <tree-table :data="data" :columns="columns" border></tree-table>
        </div>
        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="100px">
                
                <el-form-item label="用户名" prop="addusername">
                    <el-input v-model="addForm.addusername"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="addpassword">
                    <el-input type="password" v-model="addForm.addpassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="addrepassword">
                    <el-input type="password" v-model="addForm.addrepassword"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="addmobile">
                    <el-input v-model="addForm.addmobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="addemail">
                    <el-input v-model="addForm.addemail"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="_addAccount('addForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getUserData, accountEnable, setSuperAdmin, addAccount} from 'api/user.js'
    import treeTable from 'base/treeTable'
    export default {
        name: 'AuthManage',
        components:{
            treeTable
        },
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
                cur_page: 1,
                multipleSelection: [],
                username:'',
                value3:true,
                phone:'',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
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
                    addemail:''
                },
                addrules:{
                    addusername: [
                        { validator:NRaddusername, trigger: 'blur' },
                        // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    addpassword: [
                        { validator:NRaddpassword, trigger: 'blur' },
                        // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    addrepassword: [
                        { validator:NRaddrepassword, trigger: 'blur' },
                        // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    addmobile: [
                        { validator:NRaddmobile, trigger: 'blur' },   
                        // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    addemail: [
                        { validator:NRaddemail, trigger: 'blur' },
                        // { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                },
                idx: -1,
                columns: [
                    {
                    text: "权限名称",
                    value: "event",
                    },
                    {
                    text: "权限分类",
                    value: "id"
                    },
                    {
                    text: "权限路径",
                    value: "timeLine"
                    },
                    {
                    text: "权限code",
                    value: "comment"
                    },
                    {
                    text: "优先级",
                    value: "timeLine"
                    },
                    {
                    text: "操作",
                    value: "comment"
                    }
                ],
                data: [
                    {
                    id: 0,
                    event: "事件1",
                    timeLine: 50,
                    comment: "无"
                    },
                    {
                    id: 1,
                    event: "事件1",
                    timeLine: 100,
                    comment: "无",
                    children: [
                        {
                        id: 2,
                        event: "事件2",
                        timeLine: 10,
                        comment: "无"
                        },
                        {
                        id: 3,
                        event: "事件3",
                        timeLine: 90,
                        comment: "无",
                        children: [
                            {
                            id: 4,
                            event: "事件4",
                            timeLine: 5,
                            comment: "无"
                            },
                            {
                            id: 5,
                            event: "事件5",
                            timeLine: 10,
                            comment: "无"
                            }
                        ]
                        }
                    ]
                    }
                ]
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            saveEdit(){

            },
            showAddForm(){
              this.addVisible = true;
            },
            // 添加用户
            _addAccount(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            'username': this.addForm.addusername,
                            "password": this.addForm.addpassword,
                            "mobile": this.addForm.addmobile,
                            "email": this.addForm.addemail
                        }
                        addAccount(params).then(res =>{
                            if(res.Code == 0){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getData(this.cur_page)
                            this.addVisible = false;
                            }else{
                                this.$message.error('res.Message');
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
                if(res.Code == 0){
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
                if(res.Code == 0){
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
                'pagesize': 30,
                'username': this.username,
                'mobile': this.phone
              }
              getAuthList(params).then(res =>{
                this.tableData = res.Data.List
              })
            },
            search() {
                this.getData();
            }
        }
    }

</script>

<style scoped lang="less">
    .handle-box{
        margin-bottom: 20px;
        height: 25px;
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