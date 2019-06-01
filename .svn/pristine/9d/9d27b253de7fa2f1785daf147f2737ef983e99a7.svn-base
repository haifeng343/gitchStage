 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <!-- <label for="">Ip:</label>
                <el-input v-model="ip" placeholder="请输入Ip" class="handle-input mr10"></el-input>
                <label for="">UA:</label>
                <el-input v-model="ua" placeholder="请输入UA" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button> -->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="Id" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="UA" align="center" label="UA" >
                </el-table-column>
                <el-table-column prop="Ip" align="center" label="IP">
                </el-table-column>
                <el-table-column prop="CreateTime" align="center" label="创建时间">
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageCount">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
    import {getVisitInfoList} from 'api/seller.js'
    export default {
        name: 'AccessList',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                ip:'',
                ua:'',
                Id:'',
                pageCount:0,
                pagesize:30,
                addVisible:false,
                editVisible:false,
                departmentList:[],
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        watch:{
          $route(route){
            this.getData()
          }
        },
        methods: {
            // 跳转到访问详情
            jumpAccess(item){
              this.$router.push(`/accessList/${item.JumpId}`)
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
              const params = {
                'pageindex': this.cur_page,
                'pagecount': this.pagesize,
                'Id': this.$route.params.id,
                'Ip': this.ip,
                'Ua': this.ua
              }
            await getVisitInfoList(params).then(res =>{
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
</style>