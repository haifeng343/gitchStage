 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家列表</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">订单号:</label>
                <el-input v-model="ordersn" placeholder="请输入订单号" class="handle-input mr10"></el-input>
                <label for="">订单名称:</label>
                <el-input v-model="ordername" placeholder="请输入订单名称" class="handle-input mr10"></el-input>
                <label for="">商家名称:</label>
                <el-input v-model="name" placeholder="请输入订单名称" class="handle-input mr10"></el-input>
                <label for="">从:</label>
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="getTime"
                    >
                </el-date-picker>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID">
                </el-table-column>
                <el-table-column prop="OrderSn" align="center" label="订单号">
                </el-table-column>
                <el-table-column prop="OrderName" align="center" label="订单名称">
                </el-table-column>
                <el-table-column prop="AccountName" align="center" label="商家名称">
                </el-table-column>
                <el-table-column label="状态" width="150" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.Status"
                          active-text="有效"
                          inactive-text="无效"
                          :active-value="1"
                          :inactive-value="0"
                          @change="changeStatus($event, scope.row.Id)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="CreateTime" align="center" label="创建时间">
                    <template slot-scope="scope">
                        {{ scope.row.CreateTime | normalTime(scope.row.CreateTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LastCallTime" align="center" label="最新拨打时间">
                    <template slot-scope="scope">
                        {{ scope.row.LastCallTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="CallCount" align="center" label="已拨数量">
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button type="text" @click="jumpDetail(scope.row)">订单详情</el-button>
                      <el-button type="text" @click="jumpCallRecord(scope.row)">拨打记录</el-button>
                      
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
            <!-- 修改密码弹出框 -->
            <el-dialog :title='`角色列表-${modifyForm.name}`' :visible.sync="changeVisible" width="663px">
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
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑商家" :visible.sync="editVisible" width="700px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="120px">
                    <el-form-item label="商户名称:" prop="AccountNickName">
                        <el-input v-model="editForm.AccountNickName" placeholder="请输入商户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="AccountPhone">
                        <el-input v-model="editForm.AccountPhone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="地址:" prop="address">
                        <el-select
                            style="width:100%;"
                            v-model="editForm.address"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            @change="handleselect"
                            :loading="loading">
                            <el-option
                            v-for="item in placeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="门牌号:" prop="DetailsAddress">
                        <el-input v-model="editForm.DetailsAddress" placeholder="请输入门牌号"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" prop="imageUrl">
                        <el-upload
                          class="avatar-uploader"
                          action="api/common/img/upload/1"
                          :headers="myHeaders"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="editForm.imageUrl" :src="editForm.imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit('editForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getPhoneSellList, setPhoneSellerStatus, modifySellerPassword, searchPlace,editSellerList} from 'api/seller.js'
    export default {
        name: 'Sellercallorderlist',
        data() {
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
            return {
                mapJson: '/static/json/map.json',
                province:'',
                sheng: '',
                shi: '',
                shi1: [],
                placeList:[],
                myHeaders:{
                    application:`manager`
                },
                qu: '',
                qu1: [],
                city:'',
                block:'',
                time:[],
                tableData: [],
                cur_page: 1,
                ordersn:'',
                ordername:'',
                name:'',
                imageUrl:'',
                phone:'',
                starttime:'',
                endtime:'',
                List:[],
                loading:false,
                editVisible: false,
                changeVisible:false,
                Id:'',
                pageCount:0,
                pagesize:30,
                Path:'',
                modifyForm: {
                    name:'',
                    password:'',
                    repassword:''
                },
                modifyrules:{
                    password: [
                        { validator:NRpassword, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
                    ],
                    repassword: [
                        { validator:NRrepassword, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
                    ],
                },
                editForm: {
                  AccountNickName:'',
                  AccountPhone:'',
                  HeadImg:'',
                  DetailsAddress:'',
                  Province:'',
                  City:'',
                  County:'',
                  LocalAddress:'',
                  Latitude:'',
                  Logitude:'',
                  imageUrl:'',
                  address:''
                },
                editrules: {
                    AccountNickName: [
                        { required: true, message: '请输入商家名称', trigger: 'blur' },
                    ],
                    AccountPhone: [
                        { required: true, message: '请输入正确的手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getData();
            this.getCityData()
        },
        mounted(){

        },
        computed: {
        },
        methods: {
        handleselect(value){
            let s = value.split(',')
            if(s.length>0){
               for(let i = 0;i<i.length;i++){
                   if(s[i] == null){
                       s[i] == ''
                   }
               }
               
             this.editForm.Latitude = s[5]
             this.editForm.Longitude = s[4]
             this.editForm.Province = s[0]
             this.editForm.City = s[1]
             this.editForm.County = s[2]
             this.editForm.LocalAddress = s[3]
            }
        },
        jumpDetail(item){
              this.$router.push(`/sellercallorderlist/${item.Id}`)
        },
        remoteMethod(query) {
            if (query !== '') {
            const params = query
            searchPlace(params).then(res =>{
                if(res.Success){
                    var arr = []
                       arr = res.Data.map(item => {
                            return { value: `${item.Province},${item.City},${item.Area},${item.Address},${item.Latitude},${item.Longitude}`, label: item.Address};
                        });
                    this.placeList = arr
                }
            })
            } else {
            this.editForm.address = [];
            }
        },
            // 打开短信渠道
            jumpChannel(item){
                this.$router.push({path:`/sellerChannel/${item.AccountId}`,query:{
                    'accountname':item.AccountNickName}
                    })
            },
            // 打开余额详情
            jumpCallRecord(item){
                this.$router.push({path:`/sellerCallRecord/${item.Id}`})
            },
            // 打开短信业务
            openSmsBusiness(item){
                this.$router.push({path:'/sellersmsbusiness',query:{
                    'accountname':item.AccountNickName,
                    'accountphone':item.AccountPhone}
                    })
            },
            // 打开价格模板
            openPriceModule(accountid){
                this.$router.push(`/priceModule/${accountid}`)
            },
            // 图片上传成功
            handleAvatarSuccess(res, file){
              this.editForm.imageUrl = res.Data.ImgUrl
              this.Path = res.Data.ImgPath
            },
            beforeAvatarUpload(file){
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isLt2M;
            },
            // 加载china地点数据，三级
            getCityData:function(){
                var that = this
                axios.get(this.mapJson).then(function(response){
                    var data = response
                    that.province = []
                    that.city = []
                    that.block = []
                    // 省市区数据分类
                    for (var item in data) {
                    if (item.match(/0000$/)) {//省
                        that.province.push({id: item, value: data[item], children: []})
                    } else if (item.match(/00$/)) {//市
                        that.city.push({id: item, value: data[item], children: []})
                    } else {//区
                        that.block.push({id: item, value: data[item]})
                    }
                    }
                    // 分类市级
                    for (var index in that.province) {
                    for (var index1 in that.city) {
                        if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                        that.province[index].children.push(that.city[index1])
                        }
                    }
                    }
                    // 分类区级
                    for(var item1 in that.city) {
                    for(var item2 in that.block) {
                        if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                        that.city[item1].children.push(that.block[item2])
                        }
                    }
                    }
                }).catch(function(error){console.log(typeof+ error)})
            },
            // 选省
            choseProvince:function(e) {
                for (var index2 in this.province) {
                if (e === this.province[index2].id) {
                    this.shi1 = this.province[index2].children
                    this.shi = this.province[index2].children[0].value
                    this.qu1 =this.province[index2].children[0].children
                    this.qu = this.province[index2].children[0].children[0].value
                    this.E = this.qu1[0].id
                }
                }
            },
            // 选市
            choseCity:function(e) {
                for (var index3 in this.city) {
                if (e === this.city[index3].id) {
                    this.qu1 = this.city[index3].children
                    this.qu = this.city[index3].children[0].value
                    this.E = this.qu1[0].id
                    // console.log(this.E)
                }
                }
            },
            // 选区
            choseBlock:function(e) {
                this.E=e;
                // console.log(this.E)
            },
            _savemodifyList(formName){
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'AccountId':this.Id,
                        'NewPassword': this.$md5(this.modifyForm.password)
                    }
                    modifySellerPassword(params).then(res =>{
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
                this.Id = item.AccountId
            },
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                      'AccountId': this.Id,
                      'AccountNickName': this.editForm.AccountNickName,
                      'AccountPhone': this.editForm.AccountPhone,
                      'DetailsAddress': this.editForm.DetailsAddress,
                      'Province': this.editForm.Province,
                      'City': this.editForm.City,
                      'County': this.editForm.County,
                      'HeadImg':this.Path,
                      'LocalAddress': this.editForm.LocalAddress,
                      'Latitude': this.editForm.Latitude,
                      'Logitude': this.editForm.Longitude,
                    }
                    editSellerList(params).then(res =>{
                        if(res.Success){
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getData(this.cur_page)
                        this.editVisible = false;
                        }else{
                            this.$message.error(res.Message);
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
              this.Id = item.AccountId
              this.editForm.address = item.LocalAddress
              this.editForm.AccountNickName = item.AccountNickName
              this.editForm.AccountPhone = item.AccountPhone
              this.editForm.DetailsAddress = item.DetailsAddress
              this.editForm.imageUrl = item.HeadImgUrl
            },
            // 修改switch的状态
            changeStatus(status,id){
              const params = {
                'Id': id,
                "Status": status,
              }
              setPhoneSellerStatus(params).then(res =>{
                if(res.Success){
                  this.$message({
                    showClose: true,
                    message: '状态更新成功',
                    type: 'success'
                  });
                  this.getData(this.cur_page)
                }
              })
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
            // 获取表格数据
            async getData() {
              var params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'AccountName': this.name,
                'OrderSn': this.ordersn,
                'OrderName':this.ordername,
                'StartTime': this.starttime,
                'EndTime': this.endtime
              }
              await getPhoneSellList(params).then(res =>{
                this.tableData = res.Data.List
                this.pageCount = res.Data.TotalCount
              })
            },
            search() {
                this.cur_page = 1
                this.getData();
            },
            getTime(){
                if(this.time != null && this.time.length > 0){
                    this.starttime = this.time[0]
                    this.endtime = this.time[1]
                }else{
                    this.starttime = ''
                    this.endtime = ''
                }
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
        width: 230px;
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
    .el-icon-plus{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
    }
</style>