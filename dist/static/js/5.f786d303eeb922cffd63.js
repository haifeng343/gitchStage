webpackJsonp([5],{"1EI0":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("lC5x"),i=a.n(r),l=a("J0Oq"),o=a.n(l),s=a("hRKE"),n=a.n(s),c=a("6sKG"),d=a.n(c),u=a("1w1M"),h={name:"basetable",data:function(){return{mapJson:"/static/json/map.json",tableData:[],cur_page:1,phone:"",father:"",mother:"",province:"",sheng:"",shi:"",shi1:[],qu:"",qu1:[],city:"",block:"",Id:"",pageCount:0,pagesize:10,addVisible:!1,editVisible:!1,departmentList:[],levelList:[{id:1,name:"土豪"},{id:2,name:"较好"},{id:3,name:"富裕"},{id:4,name:"正常"}],addForm:{father:"",mother:"",phone:"",ohter:"无",level:""},editForm:{Ip:"",token:"",des:"",createTime:"",updateTime:""},addrules:{father:[{required:!0,message:"填写父亲姓名",trigger:"blur"}],mother:[{required:!0,message:"填写母亲姓名",trigger:"blur"}],phone:[{required:!0,message:"填写手机号",trigger:"blur"}],level:[{required:!0,message:"请选择等级",trigger:"change"}]},editrules:{Ip:[{required:!0,message:"请输入Ip地址",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],token:[{required:!0,message:"请输入安全码",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],des:[{required:!0,message:"请输入描述",trigger:"blur"},{min:1,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}]}}},created:function(){this.getData(),this.getCityData()},computed:{},methods:{jumpUrl:function(e){null==e.Father||""==e.Father?localStorage.setItem("father","空"):localStorage.setItem("father",e.Father),null==e.Mother||""==e.Mother?localStorage.setItem("mother","空"):localStorage.setItem("mother",e.Mother),null==e.Mobile||""==e.Mobile?localStorage.setItem("phone",""):localStorage.setItem("phone",e.Mobile),this.$router.push("/familyDetail/"+e.FamilyId)},getCityData:function(){var e=this;d.a.get(this.mapJson).then(function(t){var a=t;for(var r in e.province=[],e.city=[],e.block=[],a)r.match(/0000$/)?e.province.push({id:r,value:a[r],children:[]}):r.match(/00$/)?e.city.push({id:r,value:a[r],children:[]}):e.block.push({id:r,value:a[r]});for(var i in e.province)for(var l in e.city)e.province[i].id.slice(0,2)===e.city[l].id.slice(0,2)&&e.province[i].children.push(e.city[l]);for(var o in e.city)for(var s in e.block)e.block[s].id.slice(0,4)===e.city[o].id.slice(0,4)&&e.city[o].children.push(e.block[s])}).catch(function(e){console.log(n()(+e))})},choseProvince:function(e){for(var t in this.province)e===this.province[t].value&&(this.shi1=this.province[t].children,this.shi=this.province[t].children[0].value,this.qu1=this.province[t].children[0].children,this.qu=this.province[t].children[0].children[0].value,this.E=this.qu1[0].value)},choseCity:function(e){for(var t in this.city)e===this.city[t].value&&(this.qu1=this.city[t].children,this.qu=this.city[t].children[0].value,this.E=this.qu1[0].value)},choseBlock:function(e){this.E=e},changeStatus:function(e,t){var a=this,r={FamilyId:t,Status:e};Object(u.o)(r).then(function(e){e.Success?(a.$message({showClose:!0,message:"更新成功",type:"success"}),a.getData(a.cur_page)):(a.$message.error(e.Message),a.getData(a.cur_page))})},saveEdit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var a={Ip:t.editForm.Ip,Token:t.editForm.token,Description:t.editForm.des};editAPI(a).then(function(e){e.Success?(t.$message({showClose:!0,message:"修改成功",type:"success"}),t.getData(t.cur_page),t.editVisible=!1):t.$message("发生错误")})})},handleEdit:function(e){this.editVisible=!0,this.editForm.Ip=e.Ip,this.editForm.token=e.Token,this.editForm.des=e.Description,this.editForm.createTime=e.CreateTime,this.editForm.updateTime=e.UpdateTime},showAddForm:function(){this.addVisible=!0},_addFamily:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var a=void 0==t.addForm.other?"":t.addForm.other,r={Father:t.addForm.father,Mother:t.addForm.mother,Mobile:t.addForm.phone,FamilyLevel:t.addForm.level,OtherContacts:a};Object(u.c)(r).then(function(e){e.Success?(t.$message({showClose:!0,message:"添加成功",type:"success"}),t.getData(t.cur_page),t.addVisible=!1):t.$message.error(e.Message)})})},deleteData:function(e){var t=this;this.$confirm("此操作将永久删除该部门, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){deleteAPI({Ip:e}).then(function(e){e.Success?(t.$message({type:"success",message:"删除成功!"}),t.getData()):t.$message.error(e.Message)}).catch(function(e){console.log("error")})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(e){this.pagesize=e,this.getData()},handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this;return o()(i.a.mark(function t(){var a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={phone:e.phone,father:e.father,mother:e.mother,province:e.sheng,city:e.shi,county:e.qu,pageindex:e.cur_page,pagecount:e.pagesize},t.next=3,Object(u.m)(a).then(function(t){t&&t.Success?(e.tableData=t.Data.List,e.pageCount=t.Data.TotalCount):e.$message({message:"发生错误",center:!0})});case 3:case"end":return t.stop()}},t,e)}))()},search:function(){this.getData()}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}}),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("label",{attrs:{for:""}},[e._v("电话:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入电话"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),e._v(" "),a("label",{attrs:{for:""}},[e._v("父亲:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入父亲姓名"},model:{value:e.father,callback:function(t){e.father=t},expression:"father"}}),e._v(" "),a("label",{attrs:{for:""}},[e._v("母亲:")]),e._v(" "),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入母亲姓名"},model:{value:e.mother,callback:function(t){e.mother=t},expression:"mother"}}),e._v(" "),a("label",{attrs:{for:""}},[e._v("地区:")]),e._v(" "),a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"省级地区"},on:{change:e.choseProvince},model:{value:e.sheng,callback:function(t){e.sheng=t},expression:"sheng"}},e._l(e.province,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.value}})}),1),e._v(" "),a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"市级地区"},on:{change:e.choseCity},model:{value:e.shi,callback:function(t){e.shi=t},expression:"shi"}},e._l(e.shi1,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.value}})}),1),e._v(" "),a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"区级地区"},on:{change:e.choseBlock},model:{value:e.qu,callback:function(t){e.qu=t},expression:"qu"}},e._l(e.qu1,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.value}})}),1),e._v(" "),a("el-button",{staticStyle:{color:"018AD8"},attrs:{icon:"search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.showAddForm}},[e._v("添加")])],1),e._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"FamilyId",align:"center",label:"家庭ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Father",align:"center",label:"父亲"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Mother",align:"center",label:"母亲"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ChildrenCount",align:"center",label:"孩子个数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FamilyLevel",align:"center",label:"家庭等级"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Mobile",align:"center",label:"手机"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Address",align:"center",label:"地址"}}),e._v(" "),a("el-table-column",{attrs:{prop:"OtherContacts",align:"center",label:"其他联系方式"}}),e._v(" "),a("el-table-column",{attrs:{label:"账户状态",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-text":"有效","inactive-text":"无效","active-value":1,"inactive-value":0},on:{change:function(a){e.changeStatus(a,t.row.FamilyId)}},model:{value:t.row.Status,callback:function(a){e.$set(t.row,"Status",a)},expression:"scope.row.Status"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary"},on:{click:function(a){e.jumpUrl(t.row)}}},[e._v("家庭详情")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","page-sizes":[10,20,30,40,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.pageCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"添加家庭",visible:e.addVisible,width:"663px",autocomplete:"off"},on:{"update:visible":function(t){e.addVisible=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,rules:e.addrules,"label-width":"130px"}},[a("el-form-item",{attrs:{label:"父亲:",prop:"father"}},[a("el-input",{attrs:{placeholder:"请输入父亲姓名"},model:{value:e.addForm.father,callback:function(t){e.$set(e.addForm,"father",t)},expression:"addForm.father"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"母亲:",prop:"mother"}},[a("el-input",{attrs:{placeholder:"请输入母亲姓名"},model:{value:e.addForm.mother,callback:function(t){e.$set(e.addForm,"mother",t)},expression:"addForm.mother"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号:",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.addForm.phone,callback:function(t){e.$set(e.addForm,"phone",t)},expression:"addForm.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"其它联系方式:",prop:"other"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入其它联系方式"},model:{value:e.addForm.other,callback:function(t){e.$set(e.addForm,"other",t)},expression:"addForm.other"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"家庭情况级别:",prop:"level"}},[a("el-select",{attrs:{placeholder:"选择级别"},model:{value:e.addForm.level,callback:function(t){e.$set(e.addForm,"level",t)},expression:"addForm.level"}},e._l(e.levelList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})}),1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"dialog-certain",attrs:{type:"primary",size:"medium"},on:{click:function(t){e._addFamily("addForm")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑安全码",visible:e.editVisible,width:"633px"},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"editForm",attrs:{model:e.editForm,rules:e.editrules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"Ip地址:",prop:"Ip"}},[a("el-input",{attrs:{disabled:""},model:{value:e.editForm.Ip,callback:function(t){e.$set(e.editForm,"Ip",t)},expression:"editForm.Ip"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"安全码:",prop:"token"}},[a("el-input",{model:{value:e.editForm.token,callback:function(t){e.$set(e.editForm,"token",t)},expression:"editForm.token"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述:",prop:"des"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.editForm.des,callback:function(t){e.$set(e.editForm,"des",t)},expression:"editForm.des"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-time-box"},[""!=e.editForm.createTime?a("span",[e._v("创建时间:"+e._s(e.editForm.createTime))]):e._e(),e._v(" "),""!=e.editForm.updateTime?a("span",[e._v("最后更新时间:"+e._s(e.editForm.updateTime))]):e._e()]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"dialog-certain",attrs:{type:"primary",size:"medium"},on:{click:function(t){e.saveEdit("editForm")}}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(h,m,!1,function(e){a("ATgv")},"data-v-0de68240",null);t.default=p.exports},ATgv:function(e,t){}});