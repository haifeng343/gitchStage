webpackJsonp([2],{STiw:function(e,t){},WguV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("vMJZ"),n={name:"basetable",data:function(){return{tableData:[],cur_page:1,name:"",Id:"",pageCount:0,pagesize:10,addVisible:!1,editVisible:!1,departmentList:[],addForm:{name:"",departmentId:""},editForm:{name:"",departmentId:"",createTime:"",updateTime:""},addrules:{name:[{required:!0,message:"请输入职位名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],departmentId:[{required:!0,type:"number",message:"请选择部门",trigger:"change"}]},editrules:{name:[{required:!0,message:"请输入职位名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],departmentId:[{required:!0,type:"number",message:"请选择部门",trigger:"change"}]}}},created:function(){this._getDepartment(),this.getData()},computed:{},methods:{_getDepartment:function(){var e=this;Object(i.m)({pageSize:100,pageIndex:1,Name:""}).then(function(t){e.departmentList=t.Data.List})},saveEdit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var a={name:t.editForm.name,DepartmentId:t.editForm.departmentId,id:t.Id};Object(i.j)(a).then(function(e){e.Success?(t.$message({showClose:!0,message:"修改成功",type:"success"}),t.getData(t.cur_page),t.editVisible=!1):t.$message("发生错误")})})},handleEdit:function(e){this.editVisible=!0,this.Id=e.Id,this.editForm.name=e.Name,this.editForm.departmentId=e.DepartmentId,this.editForm.createTime=e.CreateTime,this.editForm.updateTime=e.UpdateTime},showAddForm:function(){this.addVisible=!0},_addPosition:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var a={name:t.addForm.name,DepartmentId:t.addForm.departmentId};Object(i.d)(a).then(function(e){e.Success?(t.$message({showClose:!0,message:"添加成功",type:"success"}),t.getData(t.cur_page),t.addVisible=!1):t.$message.error(e.Message)})})},deleteData:function(e){var t=this;this.$confirm("此操作将永久删除该职位, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={id:e};Object(i.g)(a).then(function(e){e.Success?(t.$message({type:"success",message:"删除成功!"}),t.getData()):t.$message.error(e.Message)}).catch(function(e){console.log("error")})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(e){this.pagesize=e,this.getData()},handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this,t={pageindex:this.cur_page,pagesize:this.pagesize,name:this.name};Object(i.n)(t).then(function(t){t&&t.Success?(e.tableData=t.Data.List,e.pageCount=t.Data.TotalCount):e.$message({message:"发生错误",center:!0})})},search:function(){this.getData()}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}}),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("label",{attrs:{for:""}},[e._v("用户名:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入职位名称"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("el-button",{staticStyle:{color:"018AD8"},attrs:{icon:"search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.showAddForm}},[e._v("添加职位")])],1),e._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"Id",align:"center",label:"ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Name",align:"center",label:"职务"}}),e._v(" "),a("el-table-column",{attrs:{prop:"DepartmentName",align:"center",label:"部门"}}),e._v(" "),a("el-table-column",{attrs:{prop:"UpdateTime",align:"center",label:"最后更新时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(e._f("normalTime")(t.row.UpdateTime,t.row.UpdateTime))+"\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){e.deleteData(t.row.Id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,30,40,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.pageCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"添加部门",visible:e.addVisible,width:"663px",autocomplete:"off"},on:{"update:visible":function(t){e.addVisible=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,rules:e.addrules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"职位名称:",prop:"name"}},[a("el-input",{model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"部门名称:",prop:"departmentId"}},[a("el-select",{staticStyle:{width:"340px"},attrs:{placeholder:"请选择"},model:{value:e.addForm.departmentId,callback:function(t){e.$set(e.addForm,"departmentId",t)},expression:"addForm.departmentId"}},e._l(e.departmentList,function(e){return a("el-option",{key:e.Id,attrs:{label:e.Name,value:e.Id}})}),1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"dialog-certain",attrs:{type:"primary",size:"medium"},on:{click:function(t){e._addPosition("addForm")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑部门",visible:e.editVisible,width:"633px"},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"editForm",attrs:{model:e.editForm,rules:e.editrules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"职位:",prop:"name"}},[a("el-input",{model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属部门:",prop:"departmentId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editForm.departmentId,callback:function(t){e.$set(e.editForm,"departmentId",t)},expression:"editForm.departmentId"}},e._l(e.departmentList,function(e){return a("el-option",{key:e.Id,attrs:{label:e.Name,value:e.Id}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-time-box"},[""!=e.editForm.createTime?a("span",[e._v("创建时间:"+e._s(e.editForm.createTime))]):e._e(),""!=e.editForm.updateTime?a("span",[e._v("最后更新时间:"+e._s(e.editForm.updateTime))]):e._e()]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"dialog-certain",attrs:{type:"primary",size:"medium"},on:{click:function(t){e.saveEdit("editForm")}}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(n,r,!1,function(e){a("STiw")},"data-v-4cacc752",null);t.default=s.exports}});