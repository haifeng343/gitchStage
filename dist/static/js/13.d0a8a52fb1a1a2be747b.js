webpackJsonp([13],{"W+ih":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("zCbX"),i={name:"basetable",data:function(){return{tableData:[],cur_page:1,loginlogid:"",username:"",functionname:"",time:[],starttime:"",endtime:"",pageCount:0,pagesize:10}},created:function(){this.getData()},computed:{},methods:{handleSizeChange:function(e){this.pagesize=e,this.getData()},handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this,t={pageindex:this.cur_page,pagesize:this.pagesize,username:this.username,loginlogid:this.loginlogid,starttime:this.starttime,endtime:this.endtime};Object(n.b)(t).then(function(t){e.tableData=t.Data.List,e.pageCount=t.Data.TotalCount})},search:function(){this.getData()},getTime:function(){null!=this.time&&this.time.length>0?(this.starttime=this.time[0],this.endtime=this.time[1]):(this.starttime="",this.endtime="")}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}}),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("label",{attrs:{for:""}},[e._v("用户名:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入用户名"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),a("label",{attrs:{for:""}},[e._v("登录ID:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入所属登录ID"},model:{value:e.loginlogid,callback:function(t){e.loginlogid=t},expression:"loginlogid"}}),e._v(" "),a("label",{attrs:{for:""}},[e._v("从:")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.getTime},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}}),e._v(" "),a("el-button",{staticStyle:{color:"018AD8"},attrs:{icon:"search"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"Id",align:"center",label:"ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"LoginLogId",align:"center",label:"所属登录ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"UserName",align:"center",label:"用户名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FunctionName",align:"center",label:"描述"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CreateTime",align:"center",label:"操作时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(e._f("normalTime")(t.row.CreateTime,t.row.CreateTime))+"\n                ")]}}])})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,30,40,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.pageCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var r=a("C7Lr")(i,l,!1,function(e){a("mlsI")},"data-v-68cea6bf",null);t.default=r.exports},mlsI:function(e,t){},zCbX:function(e,t,a){"use strict";t.a=function(e){return Object(l.a)("/api/admin/loginlog/list","post",e).then(function(e){return i.a.resolve(e)})},t.b=function(e){return Object(l.a)("/api/admin/operationlog/list","post",e).then(function(e){return i.a.resolve(e)})};var n=a("rVsN"),i=a.n(n),l=a("wf1y")}});