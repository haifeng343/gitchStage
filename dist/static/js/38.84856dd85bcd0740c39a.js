webpackJsonp([38],{"2vK5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),l=a("J0Oq"),i=a.n(l),s=a("mFSD"),o={name:"basetable",data:function(){return{tableData:[],cur_page:1,phone:"",name:"",time:[],starttime:"",endtime:"",pageCount:0,pagesize:10}},created:function(){this.getData()},computed:{},methods:{handleSizeChange:function(e){this.pagesize=e,this.getData()},handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={pageindex:e.cur_page,pagecount:e.pagesize,OperationName:e.name,ChangeStartTime:e.starttime,ChangeEndTime:e.endtime},t.next=3,Object(s.g)(a).then(function(t){e.tableData=t.Data.List,e.pageCount=t.Data.TotalCount});case 3:case"end":return t.stop()}},t,e)}))()},search:function(){this.getData()},getTime:function(){null!=this.time&&this.time.length>0?(this.starttime=this.time[0],this.endtime=this.time[1]):(this.starttime="",this.endtime="")}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}}),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("label",{attrs:{for:""}},[e._v("变更者:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入变更者"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("label",{attrs:{for:""}},[e._v("从:")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.getTime},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}}),e._v(" "),a("el-button",{staticStyle:{color:"018AD8"},attrs:{icon:"search"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"LogId",align:"center",label:"ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"AccountId",align:"center",label:"库存账号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"PreMoney",align:"center",label:"变更前数量(分)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CurrMoney",align:"center",label:"变更后数量(分)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ChangeMoney",align:"center",label:"变更数量(分)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.ChangeMoney>0?"+"+t.row.ChangeMoney:t.row.ChangeMoney)+"\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"Reason",align:"center",label:"变更原因"}}),e._v(" "),a("el-table-column",{attrs:{prop:"OperationName",align:"center",label:"变更者"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CreateTime",align:"center",label:"变更时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(e._f("normalTime")(t.row.CreateTime,t.row.CreateTime))+"\n                ")]}}])})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,30,40,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.pageCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var u=a("C7Lr")(o,c,!1,function(e){a("hFvP")},"data-v-5c084b78",null);t.default=u.exports},hFvP:function(e,t){}});