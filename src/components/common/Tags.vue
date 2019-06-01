<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index,item)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="text">
          所有页面
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: [],
      activePath: ""
    };
  },
  methods: {
    isActive(path) {
      return path === this.activePath;
    },
    // 关闭单个标签
    closeTags(index, data) {
      if (index >= 0) {
        this.tagsList.splice(index, 1)[0];
        //数组中仍有数据取最后一个激活，没有数据调到首页
        if (this.tagsList.length <= 0) {
          this.$router.push("/homeMenu");
        } else {
          const item = this.tagsList[this.tagsList.length - 1];
          this.activePath = item.path;
          this.$router.push(item.path);
          this.$router.push({
            path: item.path,
            query: item.query
          });
        }
        bus.$emit("tags", this.tagsList);
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      bus.$emit("tags", this.tagsList);
      this.$router.push("/homeMenu");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.path;
      });
      this.tagsList = curItem;
      bus.$emit("tags", this.tagsList);
    },
    // 设置标签
    setTags(route) {
      if (route.path == "/dashboard") {
        return;
      }
      this.activePath = route.path;
      localStorage.setItem("activePath", this.activePath);
      const isExist = this.tagsList.filter(item => {
        return item.path === route.path;
      });
      if (isExist.length <= 0) {
        var title = "";
        if (route.query.name != undefined) {
          title = `${route.meta.title}-${route.query.name}`;
        } else {
          title = route.meta.title;
        }
        this.tagsList.push({
          title: title,
          path: route.path,
          query: route.query,
          name: route.matched[1].components.default.name
        });
      } else {
        this.$router.push({
          path: route.path,
          query: isExist[0].query
        });
      }
      if (route.params.id == null) {
        bus.$emit("tags", this.tagsList);
      }
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    if (this.$route.path != "/dashboard") {
      this.tagsList =
        localStorage.getItem("tagsList") == null
          ? []
          : JSON.parse(localStorage.getItem("tagsList"));
      this.activePath =
        localStorage.getItem("activePath") == null
          ? ""
          : localStorage.getItem("activePath");
      const tagItem = this.tagsList.filter(item => {
        return item.path === this.$route.path;
      });
      if (tagItem.length > 0) {
        var index = this.tagsList.indexOf(tagItem[0]);
        this.tagsList.splice(index, 1);
      }
      this.setTags(this.$route);
    }
  },
  destroyed() {
    localStorage.removeItem("activePath");
    localStorage.removeItem("tagsList");
  }
};
</script>


<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  width: auto;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>

