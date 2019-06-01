<template>
  <div class>
    <div class="container">
      <ul class="item-box flex">
        <li class="item-list" v-for="(item,index) in itemList" :key="index">
          <el-tree
            :data="item.all"
            show-checkbox
            default-expand-all
            :props="defaultProps"
            ref="tree"
            node-key="AuthorityId"
            :default-checked-keys="item.default"
          ></el-tree>
        </li>
      </ul>
      <div class="buttons flex">
        <el-button type="primary" @click="saveAuth()">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleAuth, setRoleAuth } from "api/user.js";
export default {
  name:"RoleAuthList",
  data() {
    return {
      itemList: [],
      defaultChecked: [],
      allArr: [],

      defaultProps: {
        children: "Children",
        label: "AuthorityName"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getCheckedKeys() {
      this.allArr=[];
      this.$refs.tree.forEach(item=>{
        this.allArr=this.allArr.concat(item.getCheckedKeys(true));
      })
    },
    saveAuth() {
      this.getCheckedKeys() ;
      console.log(this.allArr)
      const params = {
        RoleId: this.$route.params.id,
        AuthorityIdList: this.allArr.join(",")
      };
      setRoleAuth(params).then(res => {
        if (res.Success) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.getData();
          this.editVisible = false;
        } else {
          this.$message.error(res.Message);
        }
      });
    },
    getData() {
      const params = {
        RoleId: this.$route.params.id
      };
      getRoleAuth(params).then(res => {
        var tempArr=[];
        res.Data.forEach(item1 => {
          var arr = { all: [], default: [] };
          arr.all.push(item1);
          item1.Children.forEach(item2 => {
            item2.Children.forEach(item3 => {
              item3.Children.forEach(item4 => {
                if (item4.IsChoice) {
                  arr.default.push(item4.AuthorityId);
                }
              });
            });
          });
          tempArr.push(arr);
        });
        this.itemList=tempArr;
      });
    }
  },
  computed: {}
};
</script>

<style scope>
.buttons {
  padding-top: 20px;
  justify-content: center;
  align-items: center;
}
.handle-box {
  margin-bottom: 20px;
}
.item-box {
  width: 100%;
  height: auto;
}
.item-list {
  flex: 1;
  float: left;
  width: 25%;
}
.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
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