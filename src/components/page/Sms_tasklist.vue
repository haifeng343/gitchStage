<template>
  <div class="table">
    <div class="content-Box" style="margin-top:10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="sendStatus" placeholder="请输入状态">
            <el-option
              v-for="item in  sendStatusList"
              :label="item.label"
              :value="item.Id"
              :key="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-form-item>
        <el-button type="primary" @click="add" style="float:right">创建任务</el-button>
      </el-form>

      <el-table :data="List" border class="table" ref="multipleTable">
        <el-table-column prop="OrderId" width="120px" align="center" label="ID"></el-table-column>
        <el-table-column prop="OrderName" width="180px" align="center" label="任务名称"></el-table-column>
        <el-table-column align="center" width="150px" label="短信模板">
          <template slot-scope="scope">
            <el-button type="text" @click="templateSee(scope.row)">{{scope.row.TemlateName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120px" label="状态">
          <template slot-scope="scope">{{scope.row.SendStatus | SendStatus}}</template>
        </el-table-column>
        <el-table-column prop="CreateTime" width="180px" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="FinishTime" width="180px" align="center" label="完成时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.SendStatus==1 || scope.row.SendStatus==2 || scope.row.SendStatus==5"
              type="primary"
              @click="_smsTaskStatusModify(scope.row,3)"
            >取消发送</el-button>
            <el-button
              v-if="scope.row.SendStatus==2"
              type="primary"
              @click="_smsTaskStatusModify(scope.row,5)"
            >暂停发送</el-button>
            <el-button
              v-if="scope.row.SendStatus==5"
              type="primary"
              @click="_smsTaskStatusModify(scope.row,2)"
            >恢复发送</el-button>
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="access(scope.row)">访问详情</el-button>
            <el-button type="text" @click="send(scope.row)">发送详情</el-button>
            <el-button class="red" v-if="scope.row.SendStatus==1" type="text" @click="deleteData(scope.row.OrderId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>

      <!--查看模板内容-->
      <el-dialog title="模板内容" :visible.sync="temVisible" width="30%">
        <table class="tem">
          <tr>
            <td>模板名称：</td>
            <td>{{temlateName}}</td>
          </tr>
          <tr>
            <td>短信签名：</td>
            <td>{{signName}}</td>
          </tr>
          <tr>
            <td>模板内容：</td>
            <td>{{temlateText}}</td>
          </tr>
          <tr>
            <td>URL：</td>
            <td>{{templateUrl}}</td>
          </tr>
        </table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="temVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

      <!--创建任务-->
      <el-dialog :title="titleName" :visible.sync="addVisible" width="700px">
        <el-form
          :model="addForm"
          :rules="addrules"
          ref="addForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称：" prop="OrderName">
            <el-input v-model="addForm.OrderName"></el-input>
          </el-form-item>
          <el-form-item label="选择短信模板：" prop="TemplateId">
            <el-select v-model="addForm.TemplateId" style="width:360px">
              <el-option
                v-for="item in selectList"
                :key="item.TemplateSysId"
                :label="item.TemplateName"
                :value="item.TemplateSysId"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="liner"></div>
          <p class="sendTitle">发送选项</p>
          <el-form-item label="年龄：" v-if="age.visible==true">
            <label class="ageLabel">从</label>
            <el-select v-model="age.value1" style="width:150px">
              <el-option v-for="item in age.context" :key="item" :label="item+'岁'" :value="item"></el-option>
            </el-select>
            <label class="ageLabel">到</label>
            <el-select v-model="age.value2" style="width:150px">
              <el-option v-for="item in age.context" :key="item" :label="item+'岁'" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：" prop="sex" v-if="sex.visible">
            <el-select v-model="sex.value" style="width:360px">
              <el-option
                v-for="item in sex.context"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送地区：" prop="area" v-if="area.visible">
            <div class="address">
              <el-tree
                :data="area.ContentValue"
                show-checkbox
                node-key="Code"
                ref="tree"
                :default-expand-all="true"
                :default-checked-keys="defaultSelect"
                :props="defaultProps"
                style="width:330px;float:left;"
              ></el-tree>
            </div>
          </el-form-item>
          <el-checkbox v-model="addr" class="addrPotion"></el-checkbox>
          <el-form-item label="地址：" prop="Address">
            <el-input v-model="addForm.Address" disabled style="width:276px"></el-input>
            <el-button plain :disabled="addr==false" @click="slectAddress">选择地址</el-button>
          </el-form-item>
          <el-form-item label="半径范围：" prop="radius">
            <el-select v-model="range.value1" :disabled="addr==false" style="width:360px">
              <el-option
                v-for="item in range.context"
                :key="item"
                :label="item + '公里'"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="liner"></div>
          <p class="sendTitle">发送标签</p>
          <div>
            <el-checkbox-group v-model="addForm.checked" class="checkList" @change="changeCheck">
              <el-checkbox
                v-for="city in checkList"
                :label="city"
                :key="city.DelegateTagId"
              >{{city.DelegateTagName}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="liner"></div>
          <p class="sendTitle">其他选项</p>
          <el-radio v-model="radio0" label="0">单次发送</el-radio>
          <br>
          <el-radio
            v-model="SendType"
            :disabled="radio0 ==3"
            label="1"
            style="margin:20px 0;margin-left:20px;"
          >即刻发送</el-radio>
          <el-radio v-model="SendType" :disabled="radio0 ==3" label="2">定时发送</el-radio>
          <el-date-picker
            v-model="value2"
            :disabled="SendType !=2"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
          <br>
          <el-radio v-model="radio0" label="3" style="margin:10px 0 20px 0">
            每
            <el-input :disabled="radio0==0" v-model="day" style="width:60px"></el-input>日,总共发送
            <el-input :disabled="radio0==0" v-model="count" style="width:60px"></el-input>次
          </el-radio>
          <br>定时发送：
          <el-time-picker
            :disabled="radio0==0"
            v-model="value3"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
          <el-form-item label="单次发送数量：" prop="number" style="margin-top:20px;margin-left:-50px">
            <el-input v-model="addForm.number"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked">是否循环</el-checkbox>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noAdd">取 消</el-button>
          <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!--百度地图弹窗-->
      <el-dialog title="请在地图选点" :visible.sync="dialogVisible" width="50%">
        <template>
          <div id="allmap" ref="allmap" style="height: 500px;"></div>
          <div id="r-result">
            快速定位地址：
            <input
              type="text"
              id="suggestId"
              size="20"
              value="杭州"
              style="width: 808px;height: 25px;margin-top: 20px;"
            >
          </div>
          <div
            id="searchResultPanel"
            style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"
          ></div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSContentTem } from "api/seller.js";
import {
  smsTaskList,
  ask,
  smsTaskAdd,
  smsTaskDetails,
  smsTaskStatusModify,
  smsTaskModify,
  smsTaskDelete,
} from "api/userdata.js";
import BMap from "BMap";
import BMapSymbolSHAPEPOINT from "BMap_Symbol_SHAPE_POINT";
import { normalTime } from "../../common/js/filter";
export default {
  data() {
    return {
      List: [],
      dialogVisible: false,
      pageCount: 0,
      pageSize: 30,
      titleName:'',//弹窗名字
      currentPage: 1,
      addVisible: false,
      formInline: {
        name: ""
      },
      addr: false, //控制是否输入地址
      sendStatus: "", //发送状态
      temVisible:false,//查看短信模板内容
      sendStatusList: [
        { Id: 0, label: "全部" },
        { Id: 1, label: "待发送" },
        { Id: 2, label: "正在发送" },
        { Id: 3, label: "取消发送" },
        { Id: 4, label: "发送已完成" },
        { Id: 5, label: "暂停发送" }
      ],
      optionId: "",
      value1: "",
      defaultSelect: [],
      defaultProps: {
        children: "List",
        label: "Name"
      },
      templateUrl:'',//短信链接
      temlateName:'',//	模板名称
      temlateText:'',//模板内容
      signName:'',//签名名称
      checked: "", //是否循环
      radio0: "0", //单次/每日
      SendType: "1", //发送状态
      value2: "", //单次定时时间
      day: "", //每几天发送
      count: "", //发送数量
      value3: "", //每日发送定时时间
      selectList: [], //短信模板列表
      area: {}, //区域
      age: {}, //年龄
      sex: {}, //性别
      selectArea: [], //是否选中地址
      range: {}, //半径范围
      contentTemplate: "", //内容模板拼接字符串
      checkList: [],
      addForm: {
        OrderName: "",
        TemplateId: "",
        signature: "",
        smsLink: "",
        smsContent: "",
        area: "",
        age: [0, 0],
        sex: "",
        Address: "",
        radius: "",
        checked: [],
        number: ""
      },
      addrules: {
        OrderName: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        TemplateId: [
          { required: true, message: "请选择短信模板", trigger: "change" }
        ]
        // sex:[
        //   { required: true, message: "请选择性别", trigger: "blur" }
        // ],
        // area:[{ required: true, message: "请选择发送地区", trigger: "blur" }],
      },
      ruleForm: {}
    };
  },
  mounted() {
    this._getSContentTem();
    this._smsTaskList();
  },
  filters: {
    SendStatus(parmas) {
      switch (parmas) {
        case 1:
          return "待发送";
        case 2:
          return "正在发送 ";
        case 3:
          return "取消发送";
        case 4:
          return "发送已完成";
        case 5:
          return "暂停发送";
      }
    }
  },
  methods: {
    //获取短信详情
    _smsTaskDetails(orderId) {
      const parmas = {
        Id: orderId
      };
      smsTaskDetails(parmas).then(res => {
        this.checkList = res.Data.TagList;
        this.addForm.Address = res.Data.Address;
        this.addForm.number = res.Data.SendCount;
        this.checked = res.Data.IsLoop;
        if (this.addForm.Address) {
          this.addr = true;
        }else {
          this.addr = false;
        }
        this.addForm = Object.assign({}, this.addForm);
        this.addForm.checked = res.Data.TagList.filter(item => {
          return item.IsSelect == true;
        });
        this.parseTemplateContent(res.Data.ContentList);
      });
    },
    //修改短信发送状态
    _smsTaskStatusModify(item, status) {
      const params = {
        OrderId: item.OrderId,
        SendStatus: status
      };
      return smsTaskStatusModify(params).then(res => {
        this._smsTaskList();
        this.$message({
          message: "修改成功",
          showClose: true,
          type: "success"
        });
      });
    },
    //获取短信模板列表
    _getSContentTem() {
      const parmas = {
        SellerName: "",
        SellerPhone: "",
        Content: this.formInline.name,
        Status: 4,
        Type: 2,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      getSContentTem(parmas).then(res => {
        this.selectList = res.Data.List;
      });
    },
    //获取任务列表
    _smsTaskList() {
      const parmas = {
        OrderName: this.formInline.name,
        SendStatus: this.sendStatus,
        pageindex: this.currentPage,
        pagecount: this.pageSize
      };
      smsTaskList(parmas).then(res => {
        this.List = res.Data.List;
        this.pageCount = res.Data.TotalCount;
      });
    },

    //删除短信任务
    deleteData(Id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._smsTaskDelete(Id).then(val => {
          this._smsTaskList();
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        });
      }).catch(() =>{
          
      })
    },
    _smsTaskDelete(Id) {
      const params = {
        Id:Id
      }
      return smsTaskDelete(params);
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pageSize = val;
      this._smsTaskList();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this._smsTaskList();
    },
    send(item) {
      this.$router.push(`/SendLog/${item.OrderId}`);
    },
    access(item) {
      this.$router.push(`/AccessDetails/${item.OrderId}`);
    },
    //查看短信模板内容
    templateSee(item) {
      this.temVisible = true;
      this.templateUrl = item.TemplateUrl;
      this.temlateName = item.TemlateName;
      this.temlateText = item.TemlateText;
      this.signName = item.SignName;
    },
    //创建
    _smsTaskAdd() {
      let st = "";
      let time1 = "";
      let obj = {};
      if (this.radio0 == 0) {
        st = this.SendType;
        if (this.SendType == 1) {
          time1 = normalTime(Date.now());
        }
        if (this.SendType == 2) {
          time1 = this.value2;
        }
        obj = {
          SendRate: "",
          SendRounds: 0
        };
      } else {
        st = 3;
        time1 = this.value3;
        obj = {
          SendRate: this.day,
          SendRounds: this.count
        };
      }

      var content = this.getConditionList();
      let parmas = {
        OrderName: this.addForm.OrderName,
        TemplateId: this.addForm.TemplateId,
        Logitude: this.ruleForm.Longitude,
        Latitude: this.ruleForm.Latitude,
        Address: this.addForm.Address,
        SendCount: this.addForm.number,
        SendType: st,
        SendTime: time1,
        IsLoop: this.checked,
        ContentList: content,
        TagList: this.addForm.checked,
        OrderId: this.editId,
      };
      let req = this.editId ? smsTaskModify : smsTaskAdd;
      parmas = Object.assign({}, parmas, obj);
      req(parmas).then(res => {
        this.addVisible = false;
        this._smsTaskList();
        this.$message({
          message: this.editId ? "修改成功" : "添加成功",
          showClose: true,
          type: "success"
        });
      });
    },
    mapInit() {
      this.map = new BMap.Map(this.$refs.allmap); // 创建Map实例
      this.map.centerAndZoom(new BMap.Point(120.21937541999992, 30.25924451802077), 11); // 初始化地图,设置中心点坐标（经纬度/城市的名称）和地图级别
      this.map.addControl(
        new BMap.MapTypeControl({
          //添加地图类型控件
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      this.map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      //           map.setMapStyle({style:'midnight'});//地图风格
      this.mapInput();
    },
    mapInput() {
      const _this = this;
      var ac = new BMap.Autocomplete({ //建立一个自动完成的对象
        input: "suggestId",
        location: _this.map
      });

      ac.addEventListener("onhighlight", function(e) {
        //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str =
          "FromItem<br />index = " +
          e.fromitem.index +
          "<br />value = " +
          value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str +=
          "<br />ToItem<br />index = " +
          e.toitem.index +
          "<br />value = " +
          value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        G("searchResultPanel").innerHTML =
          "onconfirm<br />index = " +
          e.item.index +
          "<br />myValue = " +
          myValue;

        setPlace();
      });

      function setPlace() {
        _this.map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          _this.map.centerAndZoom(pp, 11);
          _this.addPoint(pp);
        }
        var local = new BMap.LocalSearch(_this.map, {
          //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }

      function G(id) {
        return document.getElementById(id);
      }
    },
    changeCheck() {
      this.addForm = Object.assign({}, this.addForm);
    },
    upload() {},
    slectAddress() {
      this.dialogVisible = true;

      setTimeout(() => {
        this.mapInit();
        if (this.ruleForm.City) {
          let address = this.ruleForm.Address;

          this.map.centerAndZoom(this.ruleForm.City, 11);
          if (this.ruleForm.Latitude) {
            const point = new BMap.Point(
              this.ruleForm.Longitude,
              this.ruleForm.Latitude
            );
            this.addPoint(point);
          } else {
            this.getAddressLoc(
              address || this.ruleForm.City,
              this.ruleForm.City
            )
              .then(point => {
                this.addPoint(point);
              })
              .catch(() => {
                this.getAddressLoc(this.ruleForm.City, this.ruleForm.City).then(
                  point => {
                    this.addPoint(point);
                  }
                );
              });
          }
        } else {
          const point = new BMap.Point(120.21937541999992, 30.25924451802077);
          this.addPoint(point);
          this.map.centerAndZoom('杭州', 11);
          // this.getLocationByIp().then(result => {
          //   this.addPoint(result.point);
          //   this.map.centerAndZoom(result.city, 11);
          // });
        }
      }, 10);
    },
    addPoint(point) {
      const _this = this;
      if (this.marker) {
        this.map.removeOverlay(this.marker); // 将标注添加到地图中
      }
      this.marker = new BMap.Marker(point); // 创建标注
      this.marker.enableDragging();
      this.map.addOverlay(this.marker); // 将标注添加到地图中
      this.marker.addEventListener("dragend", function(e) {
        _this.getAddressName();
      });
    },
    getAddressLoc(address, city) {
      return new Promise((resolve, reject) => {
        // 创建地址解析器实例
        const myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(
          address,
          function(point) {
            if (point) {
              resolve(point);
            } else {
              reject();
            }
          },
          city
        );
      });
    },
    getLocationByIp() {
      return new Promise((resolve, reject) => {
        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              
              // 根据浏览器IP获取位置 成功
              resolve({
                city: r.address.city,
                point: r.point
              });
            } else {
              // 根据浏览器IP获取位置 失败时定位到杭州市中心
              resolve({
                city: "杭州",
                point: new BMap.Point(120.175266, 30.274044)
              });
            }
          },
          { enableHighAccuracy: true }
        );
      });
    },
    getAddressName(a) {
      return new Promise((resolve, reject) => {
        const point = this.marker.point;
        const pars = {
          location: point.lat + "," + point.lng
        };
        ask(pars).then(res => {
          res = res.Data;
          resolve({
            Longitude: res.Longitude,
            Latitude: res.Latitude,
            Address: res.Address,
            AddressDetails: res.AddressDetails,
            Province: res.Province,
            City: res.City,
            Area: res.Area
          });
          if (!a) {
            document.getElementById("suggestId").value = res.AddressDetails;
          }
        });
      });
    },
    //地图确定
    submit() {
      this.getAddressName(1).then(result => {
        this.dialogVisible = false;
        this.ruleForm = Object.assign({}, this.ruleForm, result);
        this.addForm.Address = result.AddressDetails;
        this.addForm = Object.assign({}, this.addForm);
      });
    },
    search() {
      this._smsTaskList();
      this.currentPage = 1;
    },
    add() {
      this.titleName = "创建任务";
      this.addVisible = true;
      this.addForm = {
        OrderName: "",
        TemplateId: "",
        signature: "",
        smsLink: "",
        smsContent: "",
        area: "",
        age: [0, 0],
        sex: "",
        Address: "",
        radius: "",
        checked: [],
        number: "",
      };
      setTimeout(() => {
        this.$refs["addForm"].resetFields();
      }, 100);
      this.ruleForm = {
        Logitude: "",
        Latitude: "",
      }
      this._smsTaskDetails(0);
    },
    //编辑任务
    edit(item){
      this.editId = item.OrderId;
      this.titleName = "编辑任务"+item.OrderId;
      this.addVisible = true;
      this._smsTaskDetails(item.OrderId);
      this.addForm = Object.assign({}, item);
    },
    //解析价格模板年龄
    parsePriceTemplateAge(obj) {
      if (obj == null) {
        return { visible: false };
      }
      var value = obj.ContentValue.split("-");
      var context = obj.Context.split("-");
      const contextList = [];
      for (var i = parseInt(context[0]); i <= parseInt(context[1]); i++) {
        contextList.push(i);
      }
      return {
        ContentType: obj.ContentType,
        ContentTypeDes: obj.ContentTypeDes,
        visible: true,
        value1:
          parseInt(value[0]) < parseInt(context[0])
            ? parseInt(context[0])
            : parseInt(value[0]),
        value2:
          parseInt(value[1]) > parseInt(context[1])
            ? parseInt(context[1])
            : parseInt(value[1]),
        context: contextList
      };
    },
    //解析价格模板性别
    parsePriceTemplateSex(obj) {
      if (obj == null) {
        return { visible: false };
      }
      const contextList = [];
      if (obj.Context == "0") {
        contextList.push({ Id: "0", Name: "全部" });
        contextList.push({ Id: "1", Name: "男" });
        contextList.push({ Id: "2", Name: "女" });
      } else if (obj.Context == "1") {
        contextList.push({ Id: "1", Name: "男" });
      } else if (obj.Context == "2") {
        contextList.push({ Id: "2", Name: "女" });
      }
      return {
        ContentType: obj.ContentType,
        ContentTypeDes: obj.ContentTypeDes,
        visible: true,
        value: obj.ContentValue,
        context: contextList
      };
    },
    //解析价格模板地区
    parsePriceTemplateArea(obj) {
      if (obj == null) {
        return { visible: false };
      }
      this.defaultSelect = [];
      const contextList = JSON.parse(obj.ContentValue);
      contextList.forEach(item => {
        if (item.choiced == true) {
          this.defaultSelect.push(item.Code);
        }
        if (item.List.length > 0) {
          item.List.forEach(item1 => {
            if (item1.choiced == true) {
              this.defaultSelect.push(item1.Code);
            }
            if (item1.List.length > 0) {
              item1.List.forEach(item2 => {
                if (item2.choiced == true) {
                  this.defaultSelect.push(item2.Code);
                }
              })
            }
          })
        }
      });
      return {
        ContentType: obj.ContentType,
        ContentTypeDes: obj.ContentTypeDes,
        ContentValue: contextList,
        visible: true,
        Context: contextList
      };
    },
    //解析价格模板半径范围
    parsePriceTemplateRange(obj) {
      if (obj == null) {
        return { visible: false };
      }
      var value = obj.ContentValue.split("-");
      var context = obj.Context.split("-");
      const contextList = [];
      for (var i = context[0]; i <= context[1]; i++) {
        contextList.push(i + "");
      }
      return {
        ContentType: obj.ContentType,
        ContentTypeDes: obj.ContentTypeDes,
        visible: true,
        value1:
          parseInt(value[1]) > parseInt(context[1]) ? context[1] : value[1],
        context: contextList
      };
    },
    //解析模板内容
    parseTemplateContent(res) {
      let arr = [];
      this.age = {};
      this.sex = {};
      this.area = {};
      this.range={};
      res.forEach(item => {
        if (item.ContentType == "MSG_PRICE_TYPE_SEARCH_AGE") {
          this.age = this.parsePriceTemplateAge(item);
        } else if (item.ContentType == "MSG_PRICE_TYPE_SEARCH_SEX") {
          this.sex = this.parsePriceTemplateSex(item);
        } else if (item.ContentType == "MSG_PRICE_TYPE_SEARCH_REGION") {
          this.area = this.parsePriceTemplateArea(item);
        } else if (item.ContentType == "MSG_PRICE_TYPE_SEARCH_RANGE") {
          this.range = this.parsePriceTemplateRange(item);
        }
      });
      this.resArr = arr;
    },
    //拼接价格模板条件选项
    getConditionList() {
      const list = [];
      if (this.age.visible) {
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_AGE",
          ContentTypeDes: this.age.ContentTypeDes,
          ContentValue: this.age.value1 + "-" + this.age.value2
        });
      }
      if (this.sex.visible) {
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_SEX",
          ContentTypeDes: this.sex.ContentTypeDes,
          ContentValue: this.sex.value
        });
      }
      if (this.range.visible && this.addr) {
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_RANGE",
          ContentTypeDes: this.range.ContentTypeDes,
          ContentValue: "0-" + this.range.value1
        });
      }
      if (this.area.visible) {
        var arr = this.$refs.tree.getCheckedKeys(true);
        list.push({
          ContentType: "MSG_PRICE_TYPE_SEARCH_REGION",
          ContentTypeDes: this.area.ContentTypeDes,
          ContentValue: arr.join(",")
        });
        this.selectArea = arr;
      }
      return list;
    },
    //确定创建
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.addr == false) {
            this.addForm.Address = "";
            this.range.value1 = "";
            this.ruleForm.Longitude = "";
            this.ruleForm.Latitude = "";
          }
          if (this.radio0 == 0) {
            if (this.SendType == "") {
              this.$message({
                message: "请选择发送时间",
                type: "error",
                showClose: true
              });
            }
          }
          if (this.radio0 == 3) {
            if (this.day == "") {
              this.$message({
                message: "请输入发送时间",
                type: "error",
                showClose: true
              });
            }
            if (this.count == "") {
              this.$message({
                message: "请输入正确条数",
                type: "error",
                showClose: true
              });
            }
          }
          if (this.addForm.number <= 0) {
            this.$message({
              message: "请输入正确条数",
              type: "error",
              showClose: true
            });
          }
          this._smsTaskAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    noAdd() {
      this.addVisible = false;
      this.editVisible = false;
      this.$refs["addForm"].resetFields();
      this.radio0 = "";
      this.SendType = "";
      this.day = "";
      this.count = "";
      this.value3 = "";
      this.value2 = "";
    }
  }
};
</script>

<style lang="less" scoped>
.grow {
  background-color: #d4d4d4;
  color: #ffffff;
}
.text2 {
  font-size: 12px;
  color: #ccc;
  text-align: right;
}
.three tr {
  height: 30px;
  line-height: 30px;
}
.liner {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  background-color: #f6f6f6;
}
.sendTitle {
  text-align: left;
  font-size: 18px;
  margin: 40px 0 10px 0;
  position: relative;
  left: -50px;
}
.ageLabel {
  width: 23px;
  text-align: center;
  display: inline-block;
}
.address {
  width: 358px !important;
  height: 370px;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid #ccc;
  position: relative;
}
.checkList .el-checkbox {
  margin-left: 15px !important;
  margin-bottom: 15px;
}
.checkList .el-form-item__content {
  margin-left: 0 !important;
}
.addrPotion {
  position: relative;
  right: -60px;
  bottom: -24px;
}
.tem tr td:first-child{
  width:120px;
  text-align: right;
}
.tem tr td:last-child{
  text-align: left;
}
</style>
<style>
.tangram-suggestion-main {
  z-index: 999999;
}
</style>