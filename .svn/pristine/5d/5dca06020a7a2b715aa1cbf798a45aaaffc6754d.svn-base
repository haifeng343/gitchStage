<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <label for="">姓名:</label>
                <el-input v-model="username" placeholder="请输入用户名" class="handle-input mr10"></el-input>
                <label for="">性别:</label>
                <el-select
                  v-model="sex"
                  placeholder="性别">
                  <el-option
                      v-for="item in sexList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
                <label for="">出生日期:</label>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    unlink-panels
                    value-format="yyyyMMdd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="getTime"
                    >
                </el-date-picker>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="ChildId" align="center" label="ID" >
                </el-table-column>
                <el-table-column prop="FamilyId" align="center" label="家庭ID">
                </el-table-column>
                <el-table-column prop="ChildName" align="center" label="姓名">
                </el-table-column>
                <el-table-column prop="Sex" align="center" label="性别">
                  <template slot-scope="scope">
                    <span v-if="scope.row.Sex === 1">男</span>
                    <span v-else-if="scope.row.Sex === 2">女</span>
                    <span v-else>未知</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Birthday" align="center" label="生日">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="jumpUrl(scope.row)">家庭详情</el-button>
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
    </div>
</template>

<script>
    import {getChildrenList} from 'api/userdata.js'
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        name: 'Childlist',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                loginlogid:'',
                username:'',
                sex:'',
                sexList:[
                  {id:0,name:'全部'},
                  {id:1,name:'男'},
                  {id:2,name:'女'}
                ],
                time:[],
                starttime:'',
                endtime:'',
                pageCount:0,
                pagesize:30
            }
        },
        created() {
            this.getData();
        },
        computed: {
            isModifyFamily(){
                return this.$store.state.IsModifyFamily
            }
        },
        watch:{
            isModifyFamily(value){
                this.getData();
                if(value){
                    this.$store.commit('ISMODIFYFAMILY',false)
                }
            }
        },
        methods: {
            mapGetters(){
                [
                    'IsModifyFamily'
                ]
            },
            // 跳转详情
            jumpUrl(item){
                // 父亲
            if(item.Father == null || item.Father == ''){
                localStorage.setItem('father','空')
            }else{
                localStorage.setItem('father',item.Father)
            }
            // 母亲
            if(item.Mother == null || item.Mother == ''){
                localStorage.setItem('mother','空')
            }else{
                localStorage.setItem('mother',item.Mother)
            }
            // 电话
            if(item.Mobile == null || item.Mobile == ''){
                localStorage.setItem('phone','')
            }else{
                localStorage.setItem('phone',item.Mobile) 
            }
              this.$router.push(`/familyDetail_sms/${item.FamilyId}`)
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
                'name': this.username,
                'sex': this.sex,
                'birthdaystart': this.starttime,
                'birthdayend': this.endtime
              }
              await getChildrenList(params).then(res =>{
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
</style>