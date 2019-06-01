<template>
  <div class="table">
    <div class="container">
      <h3>委托内容</h3>
      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">委托时间：</label>
          <label for v-if="detailsData.StartTime=='' || detailsData.EndTime==''">暂未设置</label>
          <label for v-else>{{detailsData.StartTime}} 至 {{detailsData.EndTime}}</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">委托名称：</label>
          <label for>{{detailsData.Name}}</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">委托内容：</label>
          <label for>{{detailsData.Content}}</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">委托数量：</label>
          <label for>{{detailsData.DelegateCount}}人</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">任务数量：</label>
          <label for>{{detailsData.RealPersonCount}}人</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">总价：</label>
          <label for>{{detailsData.TotalPrice*1.0/100}}元</label>
        </div>
      </div>
      <div class="cell_dashed"></div>
      <h3>筛选条件</h3>
      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item" v-if="Age.visible">
          <label for class="delegateTemplate-module-item-lable">年龄：</label>
          <label for>从{{Age.value1}}岁到{{Age.value2}}岁</label>
        </div>
        <div class="delegateTemplate-module-item" v-if="Sex.visible">
          <label for class="delegateTemplate-module-item-lable">性别：</label>
          <label for>{{Sex.value}}</label>
        </div>
        <div class="delegateTemplate-module-item" v-if="Area.visible">
          <label for class="delegateTemplate-module-item-lable">地区：</label>
          <div class="sendPlace_box">
            <el-tree
              :data="Area.value"
              show-checkbox
              node-key="Code"
              ref="tree"
              :default-expanded-keys="expanded"
              :default-checked-keys="checked"
              :props="DefaultProps"
              style="width:330px;float:left;"
            ></el-tree>
          </div>
        </div>
        <div class="delegateTemplate-module-item" v-if="Range.visible">
          <label for class="delegateTemplate-module-item-lable">半径范围：</label>
          <label for>{{Range.value}}公里</label>
        </div>
      </div>
      <div class="cell_dashed"></div>
      <h3>执行情况</h3>
      <div class="delegateTemplate-module">
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">总导出人数：</label>
          <label for>{{detailsData.ExportCount}}人</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">未预约人数：</label>
          <label for>{{detailsData.Unbooked}}人</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">已预约人数：</label>
          <label for>{{detailsData.Reservations}}人</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">到店人数：</label>
          <label for>{{detailsData.Arrival}}人</label>
        </div>
        <div class="delegateTemplate-module-item">
          <label for class="delegateTemplate-module-item-lable">目前到店率：</label>
          <label for>{{detailsData.ArrivalRate}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getManagerCallCenterDelegateDetails } from "api/entrust.js";
export default {
  name: "DelegateDetails",
  data() {
    return {
      delegateId: 0,

      Age: {},
      Sex: {},
      Area: {},
      Range: {},
      detailsData: {},
      expanded: [],
      checked: [],
      DefaultProps: {
        children: "List",
        label: "Name"
      }
    };
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/delegatedetails") != -1) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.expanded = [];
      this.checked = [];
      this.delegateId = this.$route.params.id;
      this._getManagerCallCenterDelegateDetails().then(val => {
        this.Age = this.parsePriceTemplateAge();
        this.Sex = this.parsePriceTemplateSex();
        this.Area = this.parsePriceTemplateArea();
        this.Range = this.parsePriceTemplateRange();
        if (this.Area.visible) {
          this.Area.value.forEach(v1 => {
            if (v1.choiced) {
              this.checked.push(v1.Code);
            }
            var expanded1 = false;
            v1.List.forEach(v2 => {
              if (v2.choiced) {
                this.checked.push(v2.Code);
              }
              if (v2.choiced && !expanded1) {
                expanded1 = true;
                this.expanded.push(v1.Code);
              }
              var expanded2 = false;
              v2.List.forEach(v3 => {
                if (v3.choiced) {
                  this.checked.push(v3.Code);
                }
                if (v3.choiced && !expanded2) {
                  expanded2 = true;
                  this.expanded.push(v2.Code);
                }
              });
            });
          });
        }
      });
    },
    //解析价格模板年龄
    parsePriceTemplateAge() {
      var obj = this.detailsData.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_AGE";
      });
      if (obj == null) {
        return { visible: false };
      }
      var value = obj.ContentValue.split("-");
      var context = obj.Context.split("-");
      return {
        visible: true,
        value1: value[0] < context[0] ? context[0] : value[0],
        value2: value[1] > context[1] ? context[1] : value[1]
      };
    },
    //解析价格模板性别
    parsePriceTemplateSex() {
      var obj = this.detailsData.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_SEX";
      });
      if (obj == null) {
        return { visible: false };
      }
      return {
        visible: true,
        value:
          obj.ContentValue == "0"
            ? "全部"
            : obj.ContentValue == "1"
            ? "男"
            : "女"
      };
    },
    //解析价格模板半径范围
    parsePriceTemplateRange() {
      var obj = this.detailsData.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_RANGE";
      });
      if (obj == null) {
        return { visible: false };
      }
      var value = obj.ContentValue.split("-");
      var context = obj.Context.split("-");
      return {
        visible: true,
        value: value[1] > context[1] ? context[1] : value[1]
      };
    },
    //解析价格模板地区
    parsePriceTemplateArea() {
      var obj = this.detailsData.ConditionList.find(x => {
        return x.ContentType === "MSG_PRICE_TYPE_SEARCH_REGION";
      });
      if (obj == null) {
        return { visible: false };
      }
      const contextList = JSON.parse(obj.ContentValue);
      return {
        visible: true,
        value: contextList
      };
    },
    //查询委托活动详情
    _getManagerCallCenterDelegateDetails() {
      const params = {
        Id: this.delegateId
      };
      return getManagerCallCenterDelegateDetails(params).then(res => {
        this.detailsData = res.Data;
      });
    }
  }
};
</script>
<style>
.delegateTemplate-module {
  margin-top: 20px;
  margin-left: 1px;
  font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, sans-serif;
  font-size: 14px;
  color: #606266;
}
.delegateTemplate-module-item {
  margin-bottom: 20px;
}
.delegateTemplate-module-item-lable {
  width: 150px;
  float: left;
  text-align: right;
}
.cell_dashed {
  height: 10px;
  border-bottom: 8px solid #ccc;
  overflow: hidden;
  opacity: 0.2;
  margin-bottom: 10px;
}
.sendPlace_box {
  width: 330px;
  height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #eeeeee;
}
</style>
