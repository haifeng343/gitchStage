<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <div class="container">
      <div class="title-box flex">
        <h3>订单信息</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form>
          <el-form-item label="订单号:">
            <span>{{info.OrderSn}}</span>
          </el-form-item>
          <el-form-item label="订单名称:">
            <span>{{info.OrderName}}</span>
          </el-form-item>
          <el-form-item label="创建时间:">
            <span>{{info.CreateTime}}</span>
          </el-form-item>
          <el-form-item label="最新拨打时间:">
            <span>{{info.LastCallTime}}</span>
          </el-form-item>
          <el-form-item label="已拨次数:">
            <span>{{info.CallCount}}次</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="title-box flex">
        <h3>搜索条件</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form>
          <el-form label-width="100px">
            <el-form-item label="年龄:" v-if="detail.age != ''">{{detail.age}}岁</el-form-item>
            <el-form-item label="性别:" v-if="detail.sex != ''">{{detail.sex}}</el-form-item>
            <el-form-item label="发送地区:">
              <div class="sendPlace_box">
                <el-tree :data="detail.place" default-expand-all :props="defaultProps"></el-tree>
              </div>
            </el-form-item>
            <el-form-item label="离家地址:" v-if="detail.radius != ''">半径范围:{{detail.radius}}公里</el-form-item>
            <el-form-item label="优先用户:" v-if="detail.priority != ''">{{detail.priority}}</el-form-item>
          </el-form>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="title-box flex">
        <h3>价格模板信息</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form>
          <el-form-item label="价格模板名称:">
            <span>
              <span>{{info.PriceTemplateName}}</span>
            </span>
          </el-form-item>
          <el-form-item label="每条服务费:">
            <span>
              <span>{{info.BasePriceFirst}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="免服务费时长:">
            <span>
              <span>{{info.FreeBasePriceSecond}}s</span>
            </span>
          </el-form-item>
          <el-form-item label="每分钟价格:">
            <span>
              <span>{{info.PriceEveryMinute}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="描述:">
            <span>
              <span>{{info.OrderDes}}</span>
            </span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="title-box flex">
        <h3>付款信息</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form>
          <el-form-item label="通话总时长:">
            <span>
              <span>{{info.CallTotalSecond | formatSeconds(info.CallTotalSecond)}}</span>
            </span>
          </el-form-item>
          <el-form-item label="通话费用:">
            <span>
              <span>{{info.CallTotalCost}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="短信总条数:">
            <span>
              <span>{{info.SmsCount}}条</span>
            </span>
          </el-form-item>
          <el-form-item label="短信费用:">
            <span>
              <span>{{info.SmsCost}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="话费优惠:">
            <span>
              <span>{{info.Free}}元</span>
            </span>
          </el-form-item>
          <h3>实际支付:&nbsp;&nbsp;{{info.PayCost |normalMoney(info.PayCost)}}元</h3>
        </el-form>
      </div>
    </div>
    <!-- <el-dialog title="短信发送选项详情" :visible.sync="lookVisible" width="633px">
      <h3>发送条件</h3>
      <el-form label-width="100px">
        <el-form-item label="年龄:" v-if="detail.age != ''">{{detail.age}}岁</el-form-item>
        <el-form-item label="性别:" v-if="detail.sex != ''">{{detail.sex}}</el-form-item>
        <el-form-item label="发送地区:" v-if="detail.sex != ''">
          <div class="sendPlace_box">
            <el-tree :data="detail.place" default-expand-all :props="defaultProps"></el-tree>
          </div>
        </el-form-item>
        <el-form-item label="离家地址:" v-if="detail.radius != ''">半径范围:{{detail.radius}}公里</el-form-item>
        <el-form-item label="优先用户:" v-if="detail.priority != ''">{{detail.priority}}</el-form-item>
      </el-form>
      <h3>反馈信息</h3>
      <el-form>
        <el-form-item>
          <el-checkbox-group v-model="typeList">
            <el-checkbox
              v-for="item in detail.type"
              :key="item.id"
              :label="item.name"
              name="type"
              disabled
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
import { getCallOrderInfo } from "api/seller.js";
export default {
  name: "SellercallorderDetail",
  data() {
    return {
      info: {},
      lookVisible: false,
      defaultProps: {
        children: "children",
        label: "label"
      },
      typeList: [],
      detail: {
        age: "",
        type: [],
        sex: "",
        place: [],
        priority: "",
        radius: ""
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  watch: {
    $route(route) {
      if (route.matched[1].path == "/sellersmsorderDetail/:id") {
        this.getData();
      }
    }
  },
  methods: {
    // 查看详情
    lookDetail() {
      this.lookVisible = true;
    },
    toRegionTree (json){
    const tree = [];
    json.map(province => {
      let p= {
        label: province.ProvinceName,
        id: province.ProvinceCode,
      };
  
      if (province.CityList) {
        p.children = [];
        province.CityList.map(city => {
          const c = {
            label: city.CityName,
            id: city.CityCode,
          };
          p.children.push(c);
  
          if (city.CountyList) {
            c.children = [];
            city.CountyList.map(area => {
              const a = {
                label: area.CountyName,
                id: area.CountyCode,
              };
              c.children.push(a);
            });
          }
        });
      }
      tree.push(p);
    });
    return tree;
  },
    // 获取数据
    getData() {
      const params = {
        OrderId: this.$route.params.id
      };
      getCallOrderInfo(params).then(res => {
        if (res && res.Success) {
          this.info = res.Data;
          var arr = res.Data.ContentList;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_AGE") {
              this.detail.age = arr[i].ContentValue;
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_SEX") {
              this.detail.sex = this.getSex(parseInt(arr[i].ContentValue));
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_REGION") {
              this.detail.place = this.toRegionTree(JSON.parse(arr[i].ContentValue));
              console.log(this.detail.place)
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_PRIORITY") {
              this.detail.priority = this.getType(arr[i].ContentValue);
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_RANGE") {
              this.detail.radius = arr[i].ContentValue;
            }
          }
          for (let i = 0; i < this.detail.type.length; i++) {
            this.typeList.push(this.detail.type[i].name);
          }
        } else {
          this.$message({
            message: res.Message,
            center: true
          });
        }
      });
    },
    // 性别转换
    getSex(sex) {
      switch (sex) {
        case 0:
          return "全部";
          break;
        case 1:
          return "男性";
          break;
        case 2:
          return "女性";
          break;
        default:
          break;
      }
    },
    // 用户转换
    getType(type) {
      switch (type) {
        case "0":
          return "不限";
          break;
        case "1":
          return "新用户优先";
          break;
        case "2":
          return "老用户优先";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.sendPlace_box {
  width: 330px;
  height: 360px;
  overflow-y: auto;
  border: 1px solid #eeeeee;
}
.title-box {
  justify-content: space-between;
  align-items: center;
}
.line {
  height: 21px;
  border-bottom: 1px solid #eeeeee;
  flex: 1;
}
.table {
  width: 100%;
  background-color: #f9f9f9;
}
.content_box {
  padding: 20px;
}
.container {
  width: 45%;
  height: auto;
  margin-left: 20%;
  margin-top: 20px;
  padding: 20px 25px;
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.el-form-item__label {
  text-align: right;
  float: left;
}
</style>