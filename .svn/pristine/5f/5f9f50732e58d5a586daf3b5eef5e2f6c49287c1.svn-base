 <template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            <el-breadcrumb-item>职位管理</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="ChannelName" align="center" label="支付类型">
                </el-table-column>
                <el-table-column prop="BusinessName" align="center" label="所属分类" >
                </el-table-column>
                <el-table-column prop="Description" align="center" label="描述" >
                </el-table-column>
                <el-table-column label="是否有效" width="150" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.Status"
                          active-text="是"
                          inactive-text="否"
                          :active-value="1"
                          :inactive-value="0"
                          @change="changeStatus($event, scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="LastModified" align="center" label="更新时间">
                    <template slot-scope="scope">
                        {{ scope.row.LastModified | normalTime(scope.row.LastModified)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="180" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="jump(scope.row)">支付参数</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {getPayTypeList, setPay} from 'api/system.js'
    export default {
        name: 'Payment',
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            // 修改switch的状态
            changeStatus(status,item){
              const params = {
                'ChannelCode': item.ChannelCode,
                "Status": status,
                'BusinessCode': item.BusinessCode
              }
              setPay(params).then(res =>{
                if(res.Success){
                  this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success'
                  });
                  this.getData()
                }
              })
            },
            // 跳转链接
            jump(item){
                localStorage.setItem('ChannelCode',item.ChannelCode)
                localStorage.setItem('BusinessCode',item.BusinessCode)
                this.$router.push(`/payParam/${item.ChannelCode}`)
            },
            // 获取表格数据
            getData() {
              const params = {
              }
              getPayTypeList(params).then(res =>{
                if (res && res.Success){
                        this.tableData = res.Data
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
</style>