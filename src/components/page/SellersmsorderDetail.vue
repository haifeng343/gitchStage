<template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <div class="container">
      <div class="title-box flex">
        <h3>订单信息</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form label-width="160px">
          <el-form-item label="订单号:">
            <span>{{info.OrderSn}}</span>
          </el-form-item>
          <el-form-item label="商家名称:">
            <span>{{info.SellerName}}</span>
          </el-form-item>
          <el-form-item label="短信模板名称:">
            <span>{{info.TemplateName}}</span>
          </el-form-item>
          <el-form-item label="短信模板内容:">
            <span>{{info.TemplateContent}}</span>
          </el-form-item>
          <el-form-item label="模板内容链接:">
            <span>{{info.TemplateUrl}}</span>
          </el-form-item>
          <el-form-item label="发送时间:">
            <span>{{info.SendTime}}</span>
          </el-form-item>
          <el-form-item label="第三方发送平台code:">
            <span>{{info.ProviderCode}}</span>
          </el-form-item>
          <el-form-item label="第三方发送模板ID:">
            <span>{{info.ThirdTemplateId}}</span>
          </el-form-item>
          <el-form-item label="短信发送渠道id:">
            <span>{{info.SignId}}</span>
          </el-form-item>
          <el-form-item label="创建时间:">
            <span>
              <span>{{info.CreateTime}}</span>
            </span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="title-box flex">
        <h3>验证信息</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form label-width="160px">
          <el-form-item label="最大验证数量:">
            <span>
              <span>{{info.MaxCheckCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="赠送验证数量:">
            <span>
              <span>{{info.FreeCheckCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="已验证数量:">
            <span>
              <span>{{info.CheckedCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="购买验证数量:">
            <span>
              <span>{{info.BuyCheckCount}}</span>
            </span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="title-box flex">
        <h3>价格模板信息</h3>
        <div class="line"></div>
      </div>
      <div class="content_box">
        <el-form label-width="160px">
          <el-form-item label="价格模板名称:">
            <span>
              <span>{{info.PriceTemplateName}}</span>
            </span>
          </el-form-item>
          <el-form-item label="内容选项价格:">
            <span>
              <span>{{info.ContentPrice |normalMoney(info.ContentPrice)}}元&nbsp;&nbsp;</span>
            </span>
            <el-button type="text" @click="lookDetail">详情</el-button>
          </el-form-item>
          <el-form-item label="价格模板基础价格:">
            <span>
              <span>{{info.BasePrice |normalMoney(info.BasePrice)}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="购买验证花费金额:">
            <span>
              <span>{{info.BuyCheckPrice |normalMoney(info.BuyCheckPrice)}}元</span>
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
        <el-form label-width="160px">
          <el-form-item label="最少发送数量:">
            <span>
              <span>{{info.BaseMinSendCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="折扣(99表示9.9折):">
            <span>
              <span>{{info.Discount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="总数量:">
            <span>
              <span>{{info.OrderSmsCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="成功数量:">
            <span>
              <span>{{info.SuccessSmsCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="失败数量:">
            <span>
              <span>{{info.FailSmsCount}}</span>
            </span>
          </el-form-item>
          <el-form-item label="总价格:">
            <span>
              <span>{{info.OrderTotalPrice |normalMoney(info.OrderTotalPrice)}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="已优惠:">
            <span>
              <span>{{info.FreePrice |normalMoney(info.FreePrice)}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="实际付款金额:">
            <span>
              <span>{{info.PayMoney |normalMoney(info.PayMoney)}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="需退回金额:">
            <span>
              <span>{{info.NeedRefundMoney |normalMoney(info.NeedRefundMoney)}}元</span>
            </span>
          </el-form-item>
          <el-form-item label="实际退回金额:">
            <span>
              <span>{{info.RefundedMoney |normalMoney(info.RefundedMoney)}}元</span>
            </span>
          </el-form-item>
          <h3>结算价:&nbsp;&nbsp;{{info.RealPayMoney |normalMoney(info.RealPayMoney)}}元</h3>
        </el-form>
      </div>
    </div>
    <el-dialog title="短信发送选项详情" :visible.sync="lookVisible" width="633px">
      <h3>发送条件</h3>
      <el-form label-width="100px">
        <el-form-item label="年龄:" v-if="detail.age != ''">{{detail.age}}岁</el-form-item>
        <el-form-item label="性别:" v-if="detail.sex != ''">{{detail.sex}}</el-form-item>
        <el-form-item label="发送地区:" v-if="detail.sex != ''">
          <div class="sendPlace_box">
            <el-tree 
            :data="detail.place"
            :props="defaultProps" 
            >
            </el-tree>
          </div>
        </el-form-item>
        <el-form-item label="离家地址:" v-if="detail.radius != ''">半径范围:{{detail.radius}}公里</el-form-item>
        <el-form-item label="优先用户:" v-if="detail.priority != ''">{{detail.priority}}</el-form-item>
      </el-form>
      <h3>反馈信息</h3>
      <el-form>
        <el-form-item>
            <el-checkbox-group v-model="typeList">
                <el-checkbox v-for="item in detail.type" :key="item.id" :label="item.name" name="type" disabled></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderInfo } from "api/seller.js";
export default {
  name: "SellersmsorderDetail",
  data() {
    return {
      info: {},
      lookVisible: false,
      defaultProps:{
          children: 'Children',
          label: 'Name'
      },
      typeList:[],
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
  mounted(){

  },
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
    // 获取数据
    getData() {
      const params = {
        OrderId: this.$route.params.id
      };
      getOrderInfo(params).then(res => {
        if (res && res.Success) {
          this.info = res.Data;
          var arr = res.Data.OrderPriceTemlateContent;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_AGE") {
              this.detail.age = arr[i].ContentValue;
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_SEX") {
              this.detail.sex = this.getSex(parseInt(arr[i].ContentValue));
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_REGION") {
              this.detail.place = JSON.parse(arr[i].ContentValue);
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_PRIORITY") {
              this.detail.priority = this.getType(arr[i].ContentValue);
              console.log(this.getType(arr[i].ContentValue))
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_SEARCH_RANGE") {
              this.detail.radius = arr[i].ContentValue;
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_REPLY_AGE") {
              this.detail.type.push({id:1,name:'年龄'});
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_REPLY_BIRTHDAY") {
              this.detail.type.push({id:2,name:'生日'});
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_REPLY_FAMILY_LEVEL") {
              this.detail.type.push({id:3,name:'经济'});
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_REPLY_FULL_NAME") {
              this.detail.type.push({id:4,name:'全名'});
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_REPLY_REGION") {
              this.detail.type.push({id:5,name:'地区'});
            }
            if (arr[i].ContentType == "MSG_PRICE_TYPE_REPLY_SEX") {
              this.detail.type.push({id:6,name:'性别'});
            }
          }
          for(let i = 0; i<this.detail.type.length;i++){
              this.typeList.push(this.detail.type[i].name)
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
        case '0':
          return "不限";
          break;
        case '1':
          return "新用户优先";
          break;
        case '2':
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
</style>