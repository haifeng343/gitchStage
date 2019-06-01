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
                <el-table-column prop="PtId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="PtName" align="center" label="模板名称">
                </el-table-column>
                <el-table-column prop="BasePrice" align="center" label="基础价格(分)">
                </el-table-column>
                <el-table-column prop="MinSendCount" align="center" label="最少发送条数">
                </el-table-column>
                <el-table-column prop="PriceOnsale" align="center" label="折扣规则">
                </el-table-column>
                <el-table-column prop="ReliabilityCheckCount" align="center" label="可靠性验证规则">
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
                        <el-button type="text"  @click="jumUrl(scope.row)">查看内容</el-button>
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
                    <el-form-item label="模板名称:" prop="name">
                        <el-input v-model="addForm.name" placeholder="请输入模板名称"></el-input>
                    </el-form-item>
                    <el-form-item label="基础价格:" prop="basePrice">
                        <el-input v-model="addForm.basePrice" placeholder="请输入基础价格"></el-input>
                    </el-form-item>
                    <el-form-item label="最低条数:" prop="minCount">
                        <el-input v-model="addForm.minCount" placeholder="请输入最低条数"></el-input>
                    </el-form-item>
                    <el-form-item label="折扣规则:" prop="sale">
                        <el-input v-model="addForm.sale" placeholder="请输入折扣规则"></el-input>{例如:10000,90|20000,80为10000条以上9折，大于20000条8折}
                    </el-form-item>
                    <el-form-item label="短信验证规则:" prop="reliability">
                        <el-input v-model="addForm.reliability" placeholder="请输入短信验证规则"></el-input>{例如:0,0,0|10000,50,100为最多验证100条免费验证50条}
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
                        <el-switch v-model="addForm.isReadonly"></el-switch>
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
                    <el-form-item label="模板名称:" prop="name">
                        <el-input v-model="editForm.name" placeholder="请输入模板名称"></el-input>
                    </el-form-item>
                    <el-form-item label="基础价格:" prop="basePrice">
                        <el-input v-model="editForm.basePrice" placeholder="请输入基础价格"></el-input>
                    </el-form-item>
                    <el-form-item label="最低条数:" prop="minCount">
                        <el-input v-model="editForm.minCount" placeholder="请输入最低条数"></el-input>
                    </el-form-item>
                    <el-form-item label="折扣规则:" prop="sale">
                        <el-input v-model="editForm.sale" placeholder="请输入折扣规则"></el-input>{例如:10000,90|20000,80为10000条以上9折，大于20000条8折}
                    </el-form-item>
                    <el-form-item label="短信验证规则:" prop="reliability">
                        <el-input v-model="editForm.reliability" placeholder="请输入短信验证规则"></el-input>{例如:0,0,0|10000,50,100为最多验证100条免费验证50条}
                    </el-form-item>
                    <el-form-item label="有效时间">
                         <el-date-picker
                            v-model="time"
                            type="daterange"
                            :default-value="defaultTime"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="getTime"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发送选项是否只读">
                        <el-switch v-model="editForm.isReadonly"></el-switch>
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
    import {getPriceModuleList, getPriceModuleInfo, addPriceModuleTem, editPriceModuleTem, deletePriceModuleTem} from 'api/seller.js'
    export default {
        name: 'AddPriceModule',
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
                  name: '',
                  basePrice:'',
                  minCount:0,
                  sale:'',
                  saleDes:'',
                  reliability:'',
                  reliabilityDes:'',
                  isReadonly:false
                },
                editForm: {
                  PtId:'',
                  name: '',
                  basePrice:'',
                  minCount:0,
                  sale:'',
                  saleDes:'',
                  reliability:'',
                  reliabilityDes:'',
                  isReadonly:false,
                  createTime:'',
                  updateTime:''
                },
                addrules: {
                    name: [
                        { required: true, message: '请输入模块名称', trigger: 'blur' },
                    ],
                    basePrice: [
                        { required: true, message: '请输入基础价格', trigger: 'blur' },
                    ],
                    minCount:[
                        { required: true, message: '请输入最小数量', trigger: 'blur' },
                    ],
                    sale: [
                        {  message: '请输入折扣规则', trigger: 'blur' },
                    ],
                    saleDes: [
                        {  message: '请输入折扣规则描述', trigger: 'blur' },
                    ],
                    reliability:[
                        {  message: '请输入可靠性验证规则', trigger: 'blur' },
                    ],
                    reliabilityDes:[
                        { message: '请输入可靠性验证规则描述', trigger: 'blur' },
                    ],
                },
                editrules: {
                    name: [
                        { required: true, message: '请输入模块名称', trigger: 'blur' },
                    ],
                    basePrice: [
                        { required: true, message: '请输入基础价格', trigger: 'blur' },
                    ],
                    minCount:[
                        { required: true, message: '请输入最小数量', trigger: 'blur' },
                    ],
                    sale: [
                        {  message: '请输入折扣规则', trigger: 'blur' },
                    ],
                    saleDes: [
                        {  message: '请输入折扣规则描述', trigger: 'blur' },
                    ],
                    reliability:[
                        {  message: '请输入可靠性验证规则', trigger: 'blur' },
                    ],
                    reliabilityDes:[
                        { message: '请输入可靠性验证规则描述', trigger: 'blur' },
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
                        'AccountId':this.$route.params.id,
                        'PtId': this.editForm.PtId,
                        'PtName': this.editForm.name,
                        'BasePrice': this.editForm.basePrice,
                        'MinSendCount': this.editForm.minCount,
                        'PriceOnsale': this.editForm.sale,
                        'ReliabilityCheckCount': this.editForm.reliability,
                        'IsReadonly':this.editForm.isReadonly,
                        'StartTime':this.starttime,
                        'EndTime':this.endtime
                    }
                    editPriceModuleTem(params).then(res =>{
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
                this.time = (item.StartTime != '' && item.EndTime != '') ? [item.StartTime,item.EndTime] : []
                this.starttime = item.StartTime
                this.endtime = item.EndTime
                this.editVisible = true
                this.editForm.PtId = item.PtId
                this.editForm.name = item.PtName
                this.editForm.basePrice = item.BasePrice
                this.editForm.minCount = item.MinSendCount
                this.editForm.sale = item.PriceOnsale
                this.editForm.saleDes = item.PriceOnsaleDes
                this.editForm.reliability = item.ReliabilityCheckCount
                this.editForm.reliabilityDes = item.ReliabilityCheckCountDes
                this.editForm.isReadonly = item.IsReadonly
                this.editForm.createTime = item.CreateTime
                this.editForm.updateTime = item.UpdateTime
            },
            // 新增确定
            addTemplate(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                      'AccountId': this.$route.params.id,
                      'PtName': this.addForm.name,
                      'BasePrice': this.addForm.basePrice,
                      'MinSendCount':this.addForm.minCount,
                      'PriceOnsale':this.addForm.sale,
                      'PriceOnsaleDes':this.addForm.saleDes,
                      'ReliabilityCheckCount':this.addForm.reliability,
                      'ReliabilityCheckCountDes':this.addForm.reliabilityDes,
                      'IsReadonly':this.addForm.isReadonly,
                      'StartTime':this.starttime,
                      'EndTime':this.endtime
                    }
                    addPriceModuleTem(params).then(res =>{
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
                this.$router.push(`/priceModuleDetail/${item.PtId}`)
            },
            showAddForm(){
                this.time=''
                this.starttime = ''
                this.endtime = ''
                this.addVisible = true;
                this.addForm.PtId = ''
                this.addForm.name = ''
                this.addForm.basePrice = ''
                this.addForm.minCount = ''
                this.addForm.sale = ''
                this.addForm.saleDes = ''
                this.addForm.reliability = ''
                this.addForm.reliabilityDes = ''
                this.addForm.isReadonly = false
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
                  'ptId':item.PtId
                }
                deletePriceModuleTem(params).then(res=> {
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
                'accountid': this.$route.params.id
              }
              getPriceModuleList(params).then(res =>{
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