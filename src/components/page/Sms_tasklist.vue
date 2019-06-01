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
        <el-table-column prop="FamilyId" align="center" label="ID"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="任务名称"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="模板名称"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="状态"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="第三方状态"></el-table-column>
        <el-table-column prop="FamilyId" align="center" label="完成时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary">取消发送</el-button>
            <el-button type="primary">暂停发送</el-button>
            <el-button type="primary">恢复发送</el-button>
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="access(scope.row)">访问详情</el-button>
            <el-button type="text" @click="send(scope.row)">发送详情</el-button>
            <el-button class="red" type="text">删除</el-button>
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

      <!--创建任务-->
      <el-dialog title="创建任务" :visible.sync="addVisible" width="700px">
        <el-form
          :model="addForm"
          :rules="addrules"
          ref="addForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择短信模板：" prop="smsTemplate">
            <el-select v-model="addForm.smsTemplate" style="width:360px">
              <el-option
                v-for="item in selectList"
                :key="item.Id"
                :label="item.label"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="liner"></div>
          <p class="sendTitle">发送选项</p>
          <el-form-item label="年龄：" prop="age">
            <label class="ageLabel">从</label>
            <el-select v-model="addForm.age" style="width:150px">
              <el-option
                v-for="item in ageList"
                :key="item.Id"
                :label="item.label+'岁'"
                :value="item.Id"
              ></el-option>
            </el-select>
            <label class="ageLabel">到</label>
            <el-select v-model="addForm.age" style="width:150px">
              <el-option
                v-for="item in ageList"
                :key="item.Id"
                :label="item.label+'岁'"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="addForm.sex" style="width:360px">
              <el-option
                v-for="item in sexList"
                :key="item.Id"
                :label="item.label"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送地区：" prop="area">
            <div class="address">
              <el-tree
                :data="area.value1"
                show-checkbox
                node-key="Code"
                ref="tree"
                :default-expand-all="true"
                :props="defaultProps"
                @check="conditionChange"
                style="width:330px;float:left;"
              ></el-tree>
            </div>
          </el-form-item>
          <el-checkbox v-model="addr" class="addrPotion"></el-checkbox>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="addForm.address" :disabled="addr==false" style="width:276px"></el-input>
            <el-button plain :disabled="addr==false" @click="slectAddress">选择地址</el-button>
          </el-form-item>
          <el-form-item label="半径范围：" prop="radius">
            <el-select v-model="radiusId" :disabled="addr==false" style="width:360px">
              <el-option
                v-for="item in radiusList"
                :key="item.Id"
                :label="item.label+'公里'"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="liner"></div>
          <p class="sendTitle">发送标签</p>
          <div>
            <el-checkbox-group v-model="addForm.checked" class="checkList">
              <el-checkbox v-for="city in checkList" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="liner"></div>
          <p class="sendTitle">其他选项</p>
          <el-radio v-model="radio0" label="0">单次发送</el-radio>
          <br>
          <el-radio
            v-model="radio"
            :disabled="radio0 ==1"
            label="1"
            style="margin:20px 0;margin-left:20px;"
          >即刻发送</el-radio>
          <el-radio v-model="radio" :disabled="radio0 ==1" label="2">定时发送</el-radio>
          <el-date-picker
            v-model="value2"
            :disabled="radio0 ==1"
            v-if="radio==2"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
          <br>
          <el-radio v-model="radio0" label="1" style="margin:10px 0 20px 0">
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
          <el-dialog
            title="请在地图选点"
            :visible.sync="dialogVisible"
            width="50%"
          >
            <template>
              <div id="allmap" ref="allmap"></div>
              <div id="r-result">快速定位地址：<input type="text" id="suggestId" size="20" value="杭州" style="width: 808px;height: 25px;margin-top: 20px;"/></div>
	            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
            </template>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submit">确 定</el-button>
            </span>
          </el-dialog>

    </div>
  </div>
</template>

<script>
import { smsTaskList, ask, smsTaskAdd } from "api/userdata.js";
import BMap from "BMap";
import BMapSymbolSHAPEPOINT from "BMap_Symbol_SHAPE_POINT";
export default {
  data() {
    return {
      List: [],
      dialogVisible:false,
      pageCount: 0,
      pageSize: 30,
      currentPage: 1,
      addVisible: false,
      formInline: {
        name: ""
      },
      addr: false, //控制是否输入地址
      sendStatus: "", //发送状态
      sendStatusList: [
        { Id: 0, label: "全部" },
        { Id: 1, label: "待发送" },
        { Id: 2, label: "正在发送" },
        { Id: 3, label: "取消发送" },
        { Id: 4, label: "发送已完成" },
        { Id: 5, label: "暂停发送" }
      ],
      optionId: "",
      age1: "",
      age2: "",
      value1: "",
      defaultProps: {
        children: "Children",
        label: "Name"
      },
      radiusId:'',
      checked: "",
      radio0: "",
      radio: "",
      value2: "",
      day: "",
      count: "",
      value3: "",
      selectList: [
        { Id: 1, label: "全部" },
        { Id: 2, label: "一部分" },
        { Id: 3, label: "小部分" }
      ],
      sexList: [
        { Id: 1, label: "全部" },
        { Id: 2, label: "男" },
        { Id: 3, label: "女" }
      ],
      ageList: [
        { Id: 1, label: "0" },
        { Id: 2, label: "1" },
        { Id: 3, label: "2" },
        { Id: 4, label: "3" },
        { Id: 5, label: "4" },
        { Id: 6, label: "5" }
      ],
      radiusList: [
        { Id: 1, label: "0" },
        { Id: 2, label: "1" },
        { Id: 3, label: "2" },
        { Id: 4, label: "3" },
        { Id: 5, label: "4" },
        { Id: 6, label: "5" }
      ],
      area: {}, //区域
      checkList: ["上海", "北京", "广州", "深圳"],
      addForm: {
        name: "",
        smsTemplate: "",
        signature: "",
        smsLink: "",
        smsContent: "",
        area: "",
        age:[],
        sex:'',
        address: "",
        radius: "",
        checked: ["上海"],
        number: ""
      },
      addrules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        smsTemplate: [
          { required: true, message: "请选择短信模板", trigger: "change" }
        ],
        // age:[
        //   { required: true, message: "请选择年龄", trigger: "change" }
        // ],
        sex:[
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        area:[{ required: true, message: "请选择发送地区", trigger: "blur" }],
      }
    };
  },
  mounted() {
    this._smsTaskList();
  },
  methods: {
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
        console.log(res);
        this.pageCount = res.Data.TotalCount;
      });
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
      this.$router.push(`/SendLog/${item.FamilyId}`)
    },
    access(item) {
      this.$router.push(`/AccessDetails/${item.FamilyId}`)
    },
    //创建
    // _smsTaskAdd() {
    //   const parmas = {
    //     OrderName : this.addForm.name,

    //   }
    // },
    mapInit() {
      this.map = new BMap.Map(this.$refs.allmap); // 创建Map实例
      this.map.centerAndZoom(new BMap.Point(114.3, 30.6), 11); // 初始化地图,设置中心点坐标（经纬度/城市的名称）和地图级别
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
      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"
        ,"location" : _this.map
      });

      ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        
        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
      var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        
        setPlace();
      });

      function setPlace(){
        _this.map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          _this.map.centerAndZoom(pp, 11);
          _this.addPoint(pp);
        }
        var local = new BMap.LocalSearch(_this.map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }

      function G(id) {
        return document.getElementById(id);
      }
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
          this.getLocationByIp().then(result => {
            this.map.centerAndZoom(result.city, 11);
            this.addPoint(result.point);
          });
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
          console.log(res)
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
            document.getElementById('suggestId').value = res.AddressDetails;
          }
        });
      });
    },
    //地图确定
    submit() {
      this.getAddressName(1).then(result => {
        this.dialogVisible = false;
        this.ruleForm = Object.assign({},this.ruleForm, result);
      })
    },
    search() {
      this._smsTaskList();
      this.currentPage = 1;
    },
    add() {
      this.addVisible = true;
    },
    //条件变化
    conditionChange() {},
    //
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
</style>
<style>
.tangram-suggestion-main {
  z-index: 999999;
}
</style>