 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="ContentType" align="center" label="编码" >
                </el-table-column>
                <el-table-column prop="ContentTypeDes" align="center" label="名称" >
                </el-table-column>
                <el-table-column prop="ContentValue" align="center" label="值">
                </el-table-column>
                <el-table-column prop="Price" align="center" label="价格" >
                </el-table-column>
                <el-table-column prop="ContentDes" align="center" label="描述" >
                </el-table-column>
                <el-table-column prop="Category" align="center" label="所属类型">
                    <template slot-scope="scope">
                        {{getStatus(scope.row.Category)}}
                    </template>
                </el-table-column>
                <el-table-column prop="OrderIndex" align="center" label="排序">
                </el-table-column>
                <el-table-column prop="UpdateTime" align="center" label="更新时间">
                    <template slot-scope="scope">
                        {{ scope.row.UpdateTime | normalTime(scope.row.UpdateTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 编辑弹出框 -->
            <el-dialog :title="`编辑价格模板-${editForm.contentType}`" :visible.sync="editVisible" width="633px">
                <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="100px">
                    <el-form-item label="所属类型:" prop="contentTypeDes" >
                        <span >{{getStatus(editForm.category)}}</span>
                    </el-form-item>
                    <el-form-item label="名称:" prop="contentTypeDes" >
                        <el-input v-model="editForm.contentTypeDes" placeholder="请输入内容名称" ></el-input>
                    </el-form-item>
                    <el-form-item label="价格:" prop="price">
                        <el-input v-model.number="editForm.price" placeholder="请输入价格"></el-input>
                    </el-form-item>
                    <el-form-item label="值:" prop="contentValue" >
                        <el-input v-model="editForm.contentValue" placeholder="请输入值" ></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="contentDes">
                        <el-input type="textarea" v-model="editForm.contentDes" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <el-form-item label="排序:" prop="orderIndex" >
                        <el-input v-model.number="editForm.orderIndex" placeholder="请输入排序"></el-input>
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
    import {getSysPriceTem,  editSysPriceTem} from 'api/seller.js'
    export default {
        name: 'Sellerpritem',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                Id:'',
                editVisible:false,
                editForm: {
                  contentType:'',
                  contentTypeDes:'',
                  contentValue:'',
                  price:'',
                  contentDes:'',
                  orderIndex:'',
                  category:'',
                  createTime:'',
                  updateTime:''
                },
                editrules: {
                    contentTypeDes: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    
                    price: [
                        { required: true, message: '价格', trigger: 'blur' },
                        { type:'number',message: '请输入数字', trigger: 'blur' }
                    ],
                   
                    orderIndex: [
                        { required: true, message: '请输入排序', trigger: 'blur' },
                        {  type:'number', message: '请输入数字', trigger: 'blur' }
                    ]
                }

            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            // 保存编辑
            saveEdit(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        'ContentType': this.editForm.contentType,
                        'ContentTypeDes': this.editForm.contentTypeDes,
                        'ContentValue': this.editForm.contentValue,
                        'Price': this.editForm.price,
                        'ContentDes': this.editForm.contentDes,
                        'OrderIndex': this.editForm.orderIndex,
                    }
                    editSysPriceTem(params).then(res =>{
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
              this.editForm.contentType = item.ContentType
              this.editForm.contentTypeDes = item.ContentTypeDes
              this.editForm.contentValue = item.ContentValue
              this.editForm.price = item.Price
              this.editForm.contentDes = item.ContentDes
              this.editForm.orderIndex = item.OrderIndex
              this.editForm.category = item.Category
              this.editForm.createTime = item.CreateTime
              this.editForm.updateTime = item.UpdateTime
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
              }
              getSysPriceTem(params).then(res =>{
                if (res && res.Success){
                        this.tableData = res.Data.List
                        this.pageCount = res.Data.TotalCount
                    }else{
                        this.$message({
                            message: res.Message,
                            center: true
                        })
                    }
              })
            },
            search() {
                this.cur_page = 1
                this.getData();
            },
            // 获取类型
            getStatus(Status){
              switch (Status) {
                case 1:
                  return '发送选项'
                  break;
                case 2:
                  return '反馈选项'
                  break;
                default:
                  break;
              }
            },
        }
    }

</script>

<style scoped>
    .category-box{
        display: inline-block;
        margin-bottom: 15px;
    }
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
</style>