webpackJsonp([12],{"8+FI":function(t,a,e){"use strict";var s=new(e("rudh").default);a.a=s},FvQ9:function(t,a){},a52u:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("rG6y"),i=e("8+FI"),r={name:"dashboard",data:function(){return{name:localStorage.getItem("ms_username"),todoList:[{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要写100行代码加几个bug吧",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!0},{title:"今天要写100行代码加几个bug吧",status:!0}],data:[{name:"2018/09/04",value:1083},{name:"2018/09/05",value:941},{name:"2018/09/06",value:1139},{name:"2018/09/07",value:816},{name:"2018/09/08",value:327},{name:"2018/09/09",value:228},{name:"2018/09/10",value:1065}],options:{title:"最近七天每天的用户访问量",showValue:!1,fillColor:"rgb(45, 140, 240)",bottomPadding:30,topPadding:30},options2:{title:"最近七天用户访问趋势",fillColor:"#FC6FA1",axisColor:"#008ACD",contentColor:"#EEEEEE",bgColor:"#F5F8FD",bottomPadding:30,topPadding:30}}},components:{Schart:s.a},computed:{role:function(){return"admin"===this.name?"超级管理员":"普通用户"}},created:function(){this.handleListener(),this.changeDate()},activated:function(){this.handleListener()},deactivated:function(){window.removeEventListener("resize",this.renderChart),i.a.$off("collapse",this.handleBus)},methods:{changeDate:function(){var t=(new Date).getTime();this.data.forEach(function(a,e){var s=new Date(t-864e5*(6-e));a.name=s.getFullYear()+"/"+(s.getMonth()+1)+"/"+s.getDate()})},handleListener:function(){i.a.$on("collapse",this.handleBus),window.addEventListener("resize",this.renderChart)},handleBus:function(t){var a=this;setTimeout(function(){a.renderChart()},300)},renderChart:function(){this.$refs.bar.renderChart(),this.$refs.line.renderChart()}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:8}},[e("el-card",{staticClass:"mgb20",staticStyle:{height:"252px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"user-info"},[e("img",{staticClass:"user-avator",attrs:{src:"static/img/img.jpg",alt:""}}),t._v(" "),e("div",{staticClass:"user-info-cont"},[e("div",{staticClass:"user-info-name"},[t._v(t._s(t.name))]),t._v(" "),e("div",[t._v(t._s(t.role))])])]),t._v(" "),e("div",{staticClass:"user-info-list"},[t._v("上次登录时间："),e("span",[t._v("2018-01-01")])]),t._v(" "),e("div",{staticClass:"user-info-list"},[t._v("上次登录地点："),e("span",[t._v("东莞")])])]),t._v(" "),e("el-card",{staticStyle:{height:"252px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("语言详情")])]),t._v("\n                Vue\n                "),e("el-progress",{attrs:{percentage:71.3,color:"#42b983"}}),t._v("\n                JavaScript\n                "),e("el-progress",{attrs:{percentage:24.1,color:"#f1e05a"}}),t._v("\n                CSS\n                "),e("el-progress",{attrs:{percentage:3.7}}),t._v("\n                HTML\n                "),e("el-progress",{attrs:{percentage:.9,color:"#f56c6c"}})],1)],1),t._v(" "),e("el-col",{attrs:{span:16}},[e("el-row",{staticClass:"mgb20",attrs:{gutter:20}},[e("el-col",{attrs:{span:8}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-1"},[e("i",{staticClass:"el-icon-lx-people grid-con-icon"}),t._v(" "),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("1234")]),t._v(" "),e("div",[t._v("用户访问量")])])])])],1),t._v(" "),e("el-col",{attrs:{span:8}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-2"},[e("i",{staticClass:"el-icon-lx-notice grid-con-icon"}),t._v(" "),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("321")]),t._v(" "),e("div",[t._v("系统消息")])])])])],1),t._v(" "),e("el-col",{attrs:{span:8}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("div",{staticClass:"grid-content grid-con-3"},[e("i",{staticClass:"el-icon-lx-goods grid-con-icon"}),t._v(" "),e("div",{staticClass:"grid-cont-right"},[e("div",{staticClass:"grid-num"},[t._v("5000")]),t._v(" "),e("div",[t._v("数量")])])])])],1)],1),t._v(" "),e("el-card",{staticStyle:{height:"403px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("待办事项")]),t._v(" "),e("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[t._v("添加")])],1),t._v(" "),e("el-table",{staticStyle:{width:"100%","font-size":"14px"},attrs:{data:t.todoList,"show-header":!1,height:"304"}},[e("el-table-column",{attrs:{width:"40"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-checkbox",{model:{value:a.row.status,callback:function(e){t.$set(a.row,"status",e)},expression:"scope.row.status"}})]}}])}),t._v(" "),e("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"todo-item",class:{"todo-item-del":a.row.status}},[t._v(t._s(a.row.title))])]}}])}),t._v(" "),e("el-table-column",{attrs:{width:"60"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("i",{staticClass:"el-icon-edit"}),t._v(" "),e("i",{staticClass:"el-icon-delete"})]}}])})],1)],1)],1)],1),t._v(" "),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover"}},[e("schart",{ref:"bar",staticClass:"schart",attrs:{canvasId:"bar",data:t.data,type:"bar",options:t.options}})],1)],1),t._v(" "),e("el-col",{attrs:{span:12}},[e("el-card",{attrs:{shadow:"hover"}},[e("schart",{ref:"line",staticClass:"schart",attrs:{canvasId:"line",data:t.data,type:"line",options:t.options2}})],1)],1)],1)],1)},staticRenderFns:[]};var o=e("C7Lr")(r,n,!1,function(t){e("FvQ9")},"data-v-2b96d5c8",null);a.default=o.exports}});