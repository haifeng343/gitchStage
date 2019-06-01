 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加价格模板</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" style="float:right" @click="showAddForm">新增价格模板</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="TemplateName" align="center" label="模板名称">
                </el-table-column>
                <el-table-column prop="BasePriceFirst" align="center" label="首次服务费">
                  <template slot-scope="scope">
                      {{scope.row.BasePriceFirst|normalMoney(scope.row.BasePriceFirst)}}元
                  </template>
                </el-table-column>
                <el-table-column prop="BasePriceAgain" align="center" label="后续服务费">
                  <template slot-scope="scope">
                      {{scope.row.BasePriceAgain|normalMoney(scope.row.BasePriceAgain)}}元
                  </template>
                </el-table-column>
                <el-table-column prop="PriceEveryMinute" align="center" label="每分钟价格">
                  <template slot-scope="scope">
                        {{scope.row.PriceEveryMinute|normalMoney(scope.row.PriceEveryMinute)}}元
                  </template>
                </el-table-column>
                <el-table-column prop="FreeBasePriceSecond" align="center" label="免服务费时长">
                  <template slot-scope="scope">
                        {{scope.row.FreeBasePriceSecond}}秒
                    </template>
                </el-table-column>
                <el-table-column prop="SmsPrice" align="center" label="短信单条价格">
                    <template slot-scope="scope">
                        {{scope.row.SmsPrice|normalMoney(scope.row.SmsPrice)}}元
                  </template>
                </el-table-column>
                <el-table-column label="有效时间"  width="250" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.StartTime != ''">{{scope.row.StartTime}}至{{scope.row.EndTime}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="deleteData(scope.row)">删除</el-button>
                        <el-button type="text"  @click="jumUrl(scope.row)">模板详情</el-button>
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
            <!-- 新增价格模板 -->
            <el-dialog title="添加价格模板" :visible.sync="addVisible" width="663px;">
                <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="180px" autocomplete="off">
                    <el-form-item label="模板名称:" prop="TemplateName">
                        <el-input v-model="addForm.TemplateName" placeholder="请输入模板名称"></el-input>
                    </el-form-item>
                    <el-form-item label="首次服务费(分):" prop="BasePriceFirst">
                        <el-input v-model="addForm.BasePriceFirst" placeholder="请输入首次服务费"></el-input>
                    </el-form-item>
                    <el-form-item label="后续服务费(分):" prop="BasePriceAgain">
                        <el-input v-model="addForm.BasePriceAgain" placeholder="请输入后续服务费"></el-input>
                    </el-form-item>
                    <el-form-item label="每分钟价格(分):" prop="PriceEveryMinute">
                        <el-input v-model="addForm.PriceEveryMinute" placeholder="请输入每分钟价格"></el-input>
                    </el-form-item>
                    <el-form-item label="免服务费时长(秒):" prop="FreeBasePriceSecond">
                        <el-input v-model="addForm.FreeBasePriceSecond" placeholder="请输入免服务费时长"></el-input>
                    </el-form-item>
                    <el-form-item label="单条短信价格(分):" prop="SmsPrice">
                        <el-input v-model="addForm.SmsPrice" placeholder="请输入单条短信价格"></el-input>
                    </el-form-item>
                    <el-form-item label="最大发送条数:" prop="MaxSmsCount">
                        <el-input v-model="addForm.MaxSmsCount" placeholder="请输入最大发送条数"></el-input>
                    </el-form-item>
                    <el-form-item label="有效时间">
                         <el-date-picker
                            v-model="time"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="getTime"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发送选项是否只读">
                        <el-switch v-model="addForm.IsReadonly"></el-switch>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addTemplate('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑价格模板" :visible.sync="editVisible" width="700px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="180px" autocomplete="off">
                    <el-form-item label="模板名称:" prop="TemplateName">
                        <el-input v-model="editForm.TemplateName" placeholder="请输入模板名称"></el-input>
                    </el-form-item>
                    <el-form-item label="首次服务费(分):" prop="BasePriceFirst">
                        <el-input v-model="editForm.BasePriceFirst" placeholder="请输入首次服务费"></el-input>
                    </el-form-item>
                    <el-form-item label="后续服务费(分):" prop="BasePriceAgain">
                        <el-input v-model="editForm.BasePriceAgain" placeholder="请输入后续服务费"></el-input>
                    </el-form-item>
                    <el-form-item label="每分钟价格(分):" prop="PriceEveryMinute">
                        <el-input v-model="editForm.PriceEveryMinute" placeholder="请输入每分钟价格"></el-input>
                    </el-form-item>
                    <el-form-item label="免服务费时长(秒):" prop="FreeBasePriceSecond">
                        <el-input v-model="editForm.FreeBasePriceSecond" placeholder="请输入免服务费时长"></el-input>
                    </el-form-item>
                    <el-form-item label="单条短信价格(分):" prop="SmsPrice">
                        <el-input v-model="editForm.SmsPrice" placeholder="请输入单条短信价格"></el-input>
                    </el-form-item>
                    <el-form-item label="最大发送条数:" prop="MaxSmsCount">
                        <el-input v-model="editForm.MaxSmsCount" placeholder="请输入最大发送条数"></el-input>
                    </el-form-item>
                    <el-form-item label="有效时间">
                         <el-date-picker
                            v-model="time"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="getTime"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发送选项是否只读">
                        <el-switch v-model="editForm.IsReadonly"></el-switch>
                    </el-form-item>
                </el-form>
                <div class="dialog-time-box">
                    <span v-if="editForm.createTime != ''">创建时间:{{editForm.createTime}}</span><span v-if="editForm.updateTime != ''">最后更新时间:{{editForm.updateTime}}</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="editVisible = false">取 消</el-button> -->
                    <el-button type="primary" size="medium" class="dialog-certain" @click="saveEdit('editForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getCallPriceModuleList, getPriceModuleInfo, addCallPriceModuleList, editCallPriceModuleList, deleteCallPriceModuleList} from 'api/seller.js'
    export default {
        name: 'SellerPriceCallModule',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                name:'',
                Id:'',
                time:'',
                starttime:'',
                endtime:'',
                defaultTime:'',
                templateList:[],
                template:'',
                accountid:'',
                pageCount:0,
                pagesize:30,
                editVisible:false,
                addVisible:false,
                Path:'',
                Form: {
                  name: '',
                  price: ''
                },
                addForm: {
                  TemplateName: '',
                  BasePriceFirst:'',
                  BasePriceAgain:'',
                  FreeBasePriceSecond:'',
                  PriceEveryMinute:'',
                  SmsPrice:'',
                  MaxSmsCount:'',
                  IsReadonly:false
                },
                editForm: {
                  TemplateName: '',
                  BasePriceFirst:'',
                  BasePriceAgain:'',
                  FreeBasePriceSecond:'',
                  PriceEveryMinute:'',
                  SmsPrice:'',
                  MaxSmsCount:'',
                  IsReadonly:false,
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                  TemplateName: [
                        { required: true, message: '请输入模块名称', trigger: 'blur' },
                    ],
                  BasePriceFirst:[
                        { required: true, message: '请输入首次拨打服务费', trigger: 'blur' },
                    ],
                  BasePriceAgain:[
                        { required: true, message: '请输入再次拨打服务费', trigger: 'blur' },
                    ],
                  FreeBasePriceSecond:[
                        { required: true, message: '请输入免费服务时长', trigger: 'blur' },
                    ],
                  PriceEveryMinute:[
                        { required: true, message: '请输入每分钟价格', trigger: 'blur' },
                    ],
                  SmsPrice:[
                        { required: true, message: '请输入短信单条价格', trigger: 'blur' },
                    ],
                },
                editrules: {
                    TemplateName: [
                        { required: true, message: '请输入模块名称', trigger: 'blur' },
                    ],
                    BasePriceFirst:[
                            { required: true, message: '请输入首次拨打服务费', trigger: 'blur' },
                        ],
                    BasePriceAgain:[
                            { required: true, message: '请输入再次拨打服务费', trigger: 'blur' },
                        ],
                    FreeBasePriceSecond:[
                            { required: true, message: '请输入免费服务时长', trigger: 'blur' },
                        ],
                    PriceEveryMinute:[
                            { required: true, message: '请输入每分钟价格', trigger: 'blur' },
                        ],
                    SmsPrice:[
                            { required: true, message: '请输入短信单条价格', trigger: 'blur' },
                        ],
                }

            }
        },
        created() {
          this.getData();
        },
        watch:{
            $route(route){
                if (route.matched[1].path === "/priceModule/:id") {
                        this.getData();  
                    }
            }
        },
        computed: {
        },
        methods: {
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'Id': this.Id,
                        'TemplateName': this.editForm.TemplateName,
                        'BasePriceFirst':this.editForm.BasePriceFirst,
                        'BasePriceAgain':this.editForm.BasePriceAgain,
                        'FreeBasePriceSecond':this.editForm.FreeBasePriceSecond,
                        'PriceEveryMinute':this.editForm.PriceEveryMinute,
                        'SmsPrice':this.editForm.SmsPrice,
                        'MaxSmsCount':this.editForm.MaxSmsCount,
                        'IsReadonly':this.editForm.IsReadonly,
                        'StartTime':this.starttime,
                        'EndTime':this.endtime
                    }
                    editCallPriceModuleList(params).then(res =>{
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
                this.time = (item.StartTime != '' && item.EndTime != '') ? [item.StartTime,item.EndTime] : []
                this.starttime = item.StartTime
                this.endtime = item.EndTime
                this.Id = item.Id
                this.editForm.TemplateName = item.TemplateName
                this.editForm.BasePriceFirst = item.BasePriceFirst
                this.editForm.BasePriceAgain = item.BasePriceAgain
                this.editForm.FreeBasePriceSecond = item.FreeBasePriceSecond
                this.editForm.PriceEveryMinute = item.PriceEveryMinute
                this.editForm.SmsPrice = item.SmsPrice
                this.editForm.MaxSmsCount = item.MaxSmsCount
                this.editForm.IsReadonly = item.IsReadonly
                this.editForm.createTime = item.CreateTime
                this.editForm.updateTime = item.UpdateTime
            },
            // 新增确定
            addTemplate(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                      'AccountId': this.$route.params.id,
                      'TemplateName': this.addForm.TemplateName,
                      'BasePriceFirst':this.addForm.BasePriceFirst,
                      'BasePriceAgain':this.addForm.BasePriceAgain,
                      'FreeBasePriceSecond':this.addForm.FreeBasePriceSecond,
                      'PriceEveryMinute':this.addForm.PriceEveryMinute,
                      'SmsPrice':this.addForm.SmsPrice,
                      'MaxSmsCount':this.addForm.MaxSmsCount,
                      'IsReadonly':this.addForm.IsReadonly,
                      'StartTime':this.starttime,
                      'EndTime':this.endtime
                    }
                    addCallPriceModuleList(params).then(res =>{
                        if(res.Success){
                        this.$message({
                            showClose: true,
                            message: '新增成功',
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
            // 显示编辑弹窗
            jumUrl(item){
                this.$router.push(`/priceCallModuleDetail/${item.Id}`)
            },
            showAddForm(){
                this.time=''
                this.starttime = ''
                this.endtime = ''
                this.addVisible = true;
                this.addForm.TemplateName = '',
                this.addForm.BasePriceFirst = '',
                this.addForm.BasePriceAgain = '',
                this.addForm.FreeBasePriceSecond = '',
                this.addForm.PriceEveryMinute = '',
                this.addForm.SmsPrice = '',
                this.addForm.MaxSmsCount = '',
                this.addForm.IsReadonly = false
            },
            // 获取模板内容
            getTemplateInfo(ptid) {
              const params = {
                'ptid': ptid
              }
              getPriceModuleInfo(params).then(res =>{
                // this.tableData = res.Data.List
                // this.pageCount = res.Data.TotalCount
              })
            },
            getTime(){
                console.log(this.time)
                if(this.time != null && this.time.length > 0){
                    console.log(1)
                    this.starttime = this.time[0]
                    this.endtime = this.time[1]
                }else{
                    this.starttime = ''
                    this.endtime = ''
                }
                console.log(this.starttime)
            },
            // 添加模块
            _addParam(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            'ParamsName': this.addForm.name,
                            'ParamsValue': this.addForm.value,
                            'Description': this.addForm.desc
                        }
                        addSystemP(params).then(res =>{
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
            // 删除角色
            deleteData(item){
              this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const params = {
                  'Id':item.Id
                }
                deleteCallPriceModuleList(params).then(res=> {
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
            getData() {
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'AccountId': this.$route.params.id
              }
              getCallPriceModuleList(params).then(res =>{
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
        margin-bottom: 10px;
        height: 36px;
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
</style>