<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">古迪效果通后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="80px" class="ms-content">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" auto-complete="new-password">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码">
                    <el-input placeholder="请输入验证码" style="width:125px;" v-model="ruleForm.code" @keyup.enter.native="submitForm('ruleForm')">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                    </el-input>
                    <div class="codeImg_box">
                        <img :src="codeImgUrl" class="codeImg" @click.stop="changeCode" alt="">
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login, beforeAuthCode, getAuthCode} from 'api/home.js'
    export default {
        name:"Login",
        data: function(){
            var checkAccount = (rule,value,callback) =>{
                if(!value){
                   this.$message('账号不能为空'); 
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    this.$message('请输入密码');
                }else{
                    // if (this.ruleForm.password !== '') {
                    //     this.$refs.ruleForm.validateField('password');
                    // }
                }
            };

            return {
                codeidentity: '',
                codeImgUrl: '',
                ruleForm: {
                    username: '',
                    password: '',
                    code: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, max: 4, message: '长度在4个字符', trigger: 'blur' } 
                    ]
                }
            }
        },
        created(){
           this._beforeAuthCode() 
        },
        mounted(){
        },
        methods: {
            // 切换验证码
            changeCode(){
                this._beforeAuthCode()
            },
            _beforeAuthCode(){
                const params = {
                    'BusinessType': 'login'
                }
                beforeAuthCode(params).then(res => {
                    this.codeImgUrl = res.Data.CodeImageUrl
                    this.codeidentity = res.Data.CodeIdentity
                })
            },
            _login(){
                const params = {
                    'username':this.ruleForm.username,
                    'password':this.$md5(this.ruleForm.password),
                    'codeidentity' : this.codeidentity,
                    'codetext': this.ruleForm.code
                }
                login(params).then(res=>{
                    if (res && res.Success){
                        localStorage.setItem('ms_username',res.Data.UserName);
                        localStorage.setItem('userToken',res.Data.Token);
                        this.$router.push('/homeMenu');
                    }else{
                        this.$message.error(res.Message)
                        this.changeCode()
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this._login()
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    label{
        color: #fff !important;
    }
    .codeImg_box{
        width: 80px;
        height: 32px;
        float: right;
        text-align: center;
        .codeImg{
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: right;
    }
    .login-btn button{
        width:73%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>