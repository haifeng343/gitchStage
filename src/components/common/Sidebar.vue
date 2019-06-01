<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="defaultActive"
      :collapse="collapse"
      :default-openeds="defaultOpen"
      background-color="#F0F0F0"
      text-color="#676767"
      active-text-color="#ffffff"
      unique-opened
    >
      <template v-for="item in items">
        <template v-if="item.Children">
          <el-submenu :index="item.MenuUrl" :key="item.Id" @click="jump(item.MenuUrl)">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="font-size:18px;">{{ item.Name }}</span>
            </template>
            <template v-for="subItem in item.Children">
              <el-submenu
                v-if="subItem.Children"
                :index="subItem.MenuUrl"
                :key="subItem.Id"
                @click="jump(subItem.MenuUrl)"
              >
                <template slot="title">{{ subItem.Name}}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.Children"
                  :key="i"
                  :index="threeItem.MenuUrl"
                  @click="jump(threeItem.MenuUrl)"
                >{{ threeItem.Name }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.MenuUrl"
                :key="subItem.Id"
                @click="jump(subItem.MenuUrl)"
              >{{ subItem.Name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.MenuUrl" :key="item.Id" @click="jump(item.MenuUrl)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.Name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
import { getSlider } from "api/home.js";
export default {
  data() {
    return {
      module: 1,
      collapse: false,
      items: [],
      defaultOpen: ["", ""],
      defaultActive:""
    };
  },
  watch: {
    $route(newValue, oldValue) {
      this.defaultActive=newValue.meta.father_path;
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    this.module = localStorage.getItem("module");
    this._getSlider(this.module).then(val => {
        if (localStorage.getItem("activePath") == null) {
          this.$router.push(`/${this.items[0].Children[0].MenuUrl}`);
        } else {
          this.$router.push(localStorage.getItem("activePath"));
        }
    });
  },
  methods: {
    jump(Url) {
      this.$router.push(`/${Url}`);
    },
    _getSlider(id) {
      const params = {
        moduleid: id
      };
      return getSlider(params).then(res => {
        if (res.Data && res.Data.length > 0) {
          var itemArr = res.Data;
          var indexArr = [];
          for (let i = 0; i < itemArr.length; i++) {
            if (itemArr[i].MenuUrl == null) {
              itemArr[i].MenuUrl = `${i + 1}`;
            }
            if (itemArr[i].Children != null && itemArr[i].Children.length > 0) {
              for (let j = 0; j < itemArr[i].Children.length; j++) {
                if (itemArr[i].Children[j].MenuUrl == null) {
                  itemArr[i].Children[j].MenuUrl = `${i + 1}-${j + 1}`;
                }
              }
            }
          }
          this.items = itemArr;
        } else {
          // this.$message.error('暂时没有数据,即将返回!')
          // var self = this
          // setTimeout(()=>{
          //     self.$router.push('/homeMenu')
          // },2000)
        }
      });
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 45px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
