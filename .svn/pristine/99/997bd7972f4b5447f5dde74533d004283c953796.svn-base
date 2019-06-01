<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="container">
            <div style="display:none;">
              <schart class="schart" canvasId="bar" :data="data3" type="bar" :options="options1"></schart>
            </div>
            <div class="title-box">
              <h3><i></i>人数统计</h3>
              <div class="menu_box">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item><span class="breadC" @click="checkAll1()">全国地区</span></el-breadcrumb-item>
                  <el-breadcrumb-item v-show="province1 != ''"><span class="breadC" @click="checkProvince1()">{{province1}}</span></el-breadcrumb-item>
                  <el-breadcrumb-item v-show="city1 != ''">{{city1}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
            <div class="content-Box">
              <div id='youChart' :style="{width: '600px', height: '450px'}"></div>
            </div>
        </div>
        <div class="container">
            <div class="title-box">
              <h3><i></i>短信发送统计(条数)</h3>
              <div class="menu_box">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item><span class="breadC" @click="checkAll()">全国地区</span></el-breadcrumb-item>
                  <el-breadcrumb-item v-show="province != ''"><span class="breadC" @click="checkProvince()">{{province}}</span></el-breadcrumb-item>
                  <el-breadcrumb-item v-show="city != ''">{{city}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
            <div class="content-Box">
              <div id='myChart' :style="{width: '600px', height: '450px'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAreaStatistic} from 'api/userdata.js'
    import Schart from 'vue-schart';
    import axios from 'axios'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: 'StatisticArea',
        components: {
            Schart
        },
        data() {
            return {
                mapJson: '/static/json/map.json',
                province:'',
                city:'',
                step:0,
                province1:'',
                city1:'',
                step1:0,
                data3:[],
                data1:{
                  name:[],
                  value:[]
                },
                options1: {
                  autoWidth: true,   // 设置宽高自适应
                  showValue: true,
                  bgColor: '#ffffff',
                  fillColor: '#49D2FE',
                  contentColor: 'rgba(221,221,221)',
                  yEqual: 5
                },
                data2:{
                  name:[],
                  value:[]
                },
            }
        },
        created() {
            localStorage.setItem('step1',0)
            localStorage.setItem('step',0)
            localStorage.setItem('city1','')
            localStorage.setItem('city','')
            localStorage.setItem('province','')
            localStorage.setItem('province1','')
            this.getData();
            this.getData1();
        },
        mounted(){
        },
        updated(){
          this.drawLine()
          // this.drawLine1()
          let myChart = echarts.init(document.getElementById('myChart'))
          let youChart = echarts.init(document.getElementById('youChart'))
          let self = this
          youChart.on('click', function (params) {
            // echarts.init(document.getElementById('youChart')).dispose();
            let youChart = echarts.init(document.getElementById('youChart'))
                if(localStorage.step1 == 1 && params.name != ''){
                  self.city1 = params.name
                  self.province1 = localStorage.province1
                  localStorage.setItem('city1',params.name)
                  localStorage.setItem('step1',2)
                  self.getData1();
                }else if (localStorage.step1 == 0 && params.name != ''){
                  self.province1 = params.name
                  self.city1 = ''
                  localStorage.setItem('step1',1)
                  localStorage.setItem('province1',params.name)
                  self.getData1();
                }else if(params.name != ''){
                  self.province1 = localStorage.province1
                  self.city1 = localStorage.city1
                  localStorage.setItem('step1',0)
                  self.getData1();
                }
                
          });
          myChart.on('click', function (params) {
            // echarts.init(document.getElementById('myChart')).dispose();
            let myChart = echarts.init(document.getElementById('myChart'))
                if(localStorage.step == 0 && params.name != ''){
                  self.province = params.name
                  self.city = ''
                  localStorage.setItem('province',params.name)
                  localStorage.setItem('step',1)
                  self.getData();
                }else if (localStorage.step == 1 && params.name != ''){
                  self.province = localStorage.province
                  self.city = params.name
                  localStorage.setItem('city',params.name)
                  localStorage.setItem('step',2)
                  self.getData();
                }else{
                  self.getData();
                }
          });
          
        },
        computed: {
        },
        methods: {
            checkAll1(){
              this.province1 = ''
              this.city1 = ''
              this.getData1();
              localStorage.setItem('province1','')
              localStorage.setItem('city1','')
              localStorage.setItem('step1',0)
            },
            checkProvince1(){
              this.province1 = localStorage.province1
              this.city1 = ''
              this.getData1();
              localStorage.setItem('city1','')
              localStorage.setItem('step1',1)
            },
            checkAll(){
              this.province = ''
              this.city = ''
              this.getData();
              localStorage.setItem('province','')
              localStorage.setItem('city','')
              localStorage.setItem('step',0)
            },
            checkProvince(){
              this.province = localStorage.province
              this.city = ''
              this.getData();
              localStorage.setItem('city','')
              localStorage.setItem('step',1)
            },
            drawLine() {
              // 基于准备好的dom，初始化echarts实例
              let myChart = echarts.init(document.getElementById('myChart'))
              let youChart = echarts.init(document.getElementById('youChart'))
              myChart.off('click') // 这里很重要！！
              youChart.off('click') // 这里很重要！！
              // 绘制图表
              myChart.setOption({
                tooltip: {},
                xAxis: {
                  data: this.data2.name,
                },
                yAxis: {
                  name:'条数'
                },
                series: [{
                  name: '数量',
                  type: 'bar',
                  barWidth : 40,
                  data: this.data2.value,
                  itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						},
                }]
              });
              youChart.setOption({
                tooltip: {},
                xAxis: {
                  data: this.data1.name,
                },
                yAxis: {name:'人'},
                series: [{
                  name: '数量',
                  type: 'bar',
                  barWidth : 40,
                  data: this.data1.value,
                  itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						},
                }]
              });
            },
            // 获取表格数据
            getData() {
              const params = {
                'Province': this.province,
                'City': this.city,
              }
              getAreaStatistic(params).then(res =>{
                if(res.Success){
                  let areaStatisticSms = res.Data.AreaStatistic_Sms
                  let arrSms = {
                    name:[],
                    value:[]
                  }
                  for(let i =0;i<areaStatisticSms.length;i++){
                    arrSms.name.push(areaStatisticSms[i].Name)
                    arrSms.value.push(areaStatisticSms[i].Count)
                  }
                  this.data2 = arrSms
                  this.data3 = areaStatisticSms
                }
              })
            },
            // 获取表格数据1
            getData1() {
              const params = {
                'Province': this.province1,
                'City': this.city1,
              }
              getAreaStatistic(params).then(res =>{
                if(res.Success){
                  let areaStatistic = res.Data.AreaStatistic_Person
                  let arr = {
                    name:[],
                    value:[]
                  }
                  for(let i =0;i<areaStatistic.length;i++){
                    arr.name.push(areaStatistic[i].Name)
                    arr.value.push(areaStatistic[i].Count)
                  }
                  this.data1 = arr
                  this.data3 = areaStatistic
                }
              })
            },
        }
    }

</script>

<style scoped lang="less">
    .menu_box{
      margin: 15px 0 15px 15px;
    }
    .breadC{
      color: #018adb;
      cursor: pointer;
    }
    
    .content-Box{
    width: auto;
    height: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
    margin:0 20px;
    }
    .title-box{
      padding:0 15px; 
      i{
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 10px;
        background-color: #018adb;
      }
    }
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