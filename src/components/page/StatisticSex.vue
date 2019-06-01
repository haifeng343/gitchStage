<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
               <label for>地区:</label>
                <el-cascader
                    size="large"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
                <label for="">年龄范围:</label>
                <el-input v-model="startAge" class="handle-input mr10"></el-input>
                <label for="">-</label>
                <el-input v-model="endAge" class="handle-input mr10"></el-input>
                <el-button icon="search" @click="search" style="color:018AD8">搜索</el-button>
            </div>
            <div class="echart-container">
                 <div id='myChart' :style="{width: '600px', height: '450px',marginLeft:'150px',marginTop:'200px'}"></div>
                <div class="schart"  style="display:none">{{data2}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSexStatistic} from 'api/userdata.js'
    import { regionDataPlus,CodeToText} from 'element-china-area-data'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: 'StatisticSex',
        data() {
            return {
                options: regionDataPlus,
                selectedOptions: [],
                tableData: [],
                cur_page: 1,
                endAge:'',
                startAge:'',
                province:'',
                city:'',
                county:'',
                pageCount:0,
                pagesize:10,
                data2 : [
                ],
                nameArr:[],
                options3: {
                  title: '短信发送统计',
                  bgColor: '#ffffff',
                  titleColor: '#333333',
                  legendColor: '#333333',
                  radius: 120
                },
            }
        },
        created() {
            this.getData();
        },
        updated(){
            this.drawLine()
        },
        computed: {
        },
        methods: {
            handleChange (value) {
                this.province = CodeToText[value[0]]
                this.city = CodeToText[value[1]] != undefined ? CodeToText[value[1]] : ''
                this.county = CodeToText[value[2]] != undefined ? CodeToText[value[2]] : ''
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '短信发送性别统计',x:'center' },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.nameArr
                    },
                    tooltip: {},
                    series: [{
                        name: '性别',
                        type: 'pie',
                        data: this.data2
                    }]
                });
            },
            // 获取表格数据
            async getData() {
              const params = {
                'Province': this.province,
                'City': this.city,
                'County': this.county,
                'StartAge': this.startAge,
                'EndAge': this.endAge
              }
              await getSexStatistic(params).then(res =>{
                if(res.Success){
                  let ageStatistic = res.Data.SexStatistic_Sms
                  let arr = [] 
                  for(let i =0;i<ageStatistic.length;i++){
                    arr.push({name:ageStatistic[i].Name,value:ageStatistic[i].Count})
                    this.nameArr.push(ageStatistic[i].Name)
                  }
                  this.data2 = arr
                }
              })
            },
            search() {
                this.getData();
            },
        }
    }

</script>

<style scoped>
    .schart-box{
        display: inline-block;
        margin: 20px;
    }
    .schart{
        width: 500px;
        height: 400px;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
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