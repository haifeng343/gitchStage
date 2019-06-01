<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" style="margin:10px 0">
      <el-form-item label="标签名称:">
        <el-input v-model="Name" placeholder="请输入标签名称"></el-input>
      </el-form-item>
      <el-form-item label="标签分类:">
        <el-select v-model="optionallId" placeholder="请选择">
          <el-option v-for="item in optionall" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" style="margin-left:10px" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" style="float:right;" @click="add">添加分类</el-button>
    </el-form>

    <el-table :data="List" border class="table" ref="multipleTable">
      <el-table-column prop="Id" align="center" label="ID" width="200px"></el-table-column>
      <el-table-column prop="Name" align="center" label="标签名称"></el-table-column>
      <el-table-column prop="TypeName" align="center" label="标签分类"></el-table-column>
      <el-table-column prop="OrderIndex" align="center" label="排序" width="200px"></el-table-column>
      <el-table-column align="center" label="是否有效" width="250px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.Status"
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="2"
            @change="_delegateTrackTagStatusModify(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="UpdateTime" align="center" label="更新时间" width="250px"></el-table-column>
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="delate(scope.row.Id)" class="red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加分类-->
    <el-dialog :title="titlepSub" :visible.sync="dispickupVisiable" width="500px">
      <label>添加标签：</label>
      <el-input v-model="List.Name" style="width:200px"></el-input>
      <br>
      <div class style="margin:10px 0">
        <label>排序：</label>
        <el-input v-model="List.OrderIndex" style="width:200px;margin-left:28px;"></el-input>
      </div>
      <div class style="margin:10px 0">
        <label>分类</label>
        <el-select v-model="optionsId" style="width:200px;margin-left:42px;" placeholder="请选择">
          <el-option v-for="item in options" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pickup()">添加</el-button>
        <el-button @click="dispickupVisiable = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>

    <!--编辑分类-->
    <el-dialog :title="titlepSub" :visible.sync="diseditVisiable" width="500px">
      <label>编辑标签：</label>
      <el-input v-model="form.Name" style="width:200px"></el-input>
      <br>
      <div class style="margin:10px 0">
        <label>排序：</label>
        <el-input v-model="form.OrderIndex" style="width:200px;margin-left:28px;"></el-input>
      </div>
      <div class style="margin:10px 0">
        <label>分类</label>
        <el-select v-model="form.TypeId" style="width:200px;margin-left:42px;" placeholder="请选择">
          <el-option v-for="item in options" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
        </el-select>
      </div>
      <div class="setPoint-tip" style="margin-top:20px" v-if="isShow">
        <span>创建时间：{{form.CreateTime}}</span>
        <span>最后更新时间：{{form.UpdateTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog()">保存</el-button>
        <el-button @click="diseditVisiable = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        background
        @size-change="HandleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="TotalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  delegateTrackTagStatusModify, //状态修改
  callcenterDelegateTrackTag, //列表
  delegateTrackTagModify, //编辑信息
  callcenterDelegateTrackTagAdd, //添加
  delegateTrackTagDelete, //删除
  delegateTrackTagtypePulldown //下拉列表
} from "api/entrust.js";
export default {
  data() {
    return {
      Name: "",
      TotalCount: 0,
      currentPage4: 1,
      pageSize: 10,
      titlepSub: "添加分类",
      isShow: false,
      input: "",
      List: [],
      form: {},
      dispickupVisiable: false,
      diseditVisiable: false,
      pagesize: 30,
      TypeId: "",
      options: [],
      optionsId: "",
      optionall: [],
      optionallId: 0
    };
  },
  mounted() {
    this._callcenterDelegateTrackTag();
    this._delegateTrackTagtypePulldown();
  },
  methods: {
    //分页导航尺寸更改
    HandleSizeChange(val) {
      this.pageSize = val;
      this.currentPage4 = 1;
      this._callcenterDelegateTrackTag();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this._callcenterDelegateTrackTag();
    },
    search() {
      this.currentPage4 = 1;
      this._callcenterDelegateTrackTag();
    },
    add() {
      this.dispickupVisiable = true;
      this.isShow = false;
      this.titlepSub = "添加标签";
    },
    pickup() {
      this._callcenterDelegateTrackTagAdd().then(res => {
        this.dispickupVisiable = false;
        this.optionsId ='';
        this._callcenterDelegateTrackTag();
      });
    },
    //添加
    _callcenterDelegateTrackTagAdd(item) {
      const params = {
        Name: this.List.Name,
        TypeId: this.optionsId,
        OrderIndex: this.List.OrderIndex
      };

      return callcenterDelegateTrackTagAdd(params);
    },
    //编辑
    edit(row) {
      this.form = Object.assign({}, row);
      this.diseditVisiable = true;
      this.isShow = true;
      this.titlepSub = "编辑标签";
    },
    editDialog(item) {
      this._callcenterDelegateTrackTagtypeModify().then(res => {
        this.diseditVisiable = false;
        this._callcenterDelegateTrackTag();
        this.$message({
          type: "success",
          message: "编辑成功",
          showClose: true
        });
      });
    },
    _callcenterDelegateTrackTagtypeModify(item) {
      const params = {
        Id: this.form.Id,
        TypeId: this.form.TypeId,
        Name: this.form.Name,
        OrderIndex: this.form.OrderIndex
      };
      return delegateTrackTagModify(params);
    },
    //下拉列表
    _delegateTrackTagtypePulldown() {
      return delegateTrackTagtypePulldown().then(res => {
        this.options = res.Data;

        let arr = [];
        arr.push({ Id: 0, Name: "全部" });
        this.optionall = arr.concat(res.Data);
      });
    },
    // 修改状态
    _delegateTrackTagStatusModify(item) {
      const params = {
        Id: item.Id,
        Status: item.Status
      };
      return delegateTrackTagStatusModify(params).catch(ex => {
        this._callcenterDelegateTrackTag();
      });
    },
    //获取分类信息列表
    _callcenterDelegateTrackTag() {
      let params = {
        Name: this.Name,
        TypeId: this.optionallId,
        pageindex: this.currentPage4,
        pagecount: this.pageSize
      };
      callcenterDelegateTrackTag(params).then(res => {
        this.List = res.Data.List;
        this.TotalCount = res.Data.TotalCount;
        this.OrderIndex = res.Data.List.OrderIndex;
        // console.log(res);
      });
    },
    //删除
    delate(id) {
      this.$confirm("确认删除?", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delegateTrackTagDelete({ Id: id }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功",
            showClose: true
          });
          this._callcenterDelegateTrackTag();
        });
      });
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
}
.setPoint-tip {
  font-size: 12px;
  color: #ccc;
  display: flex;
  justify-content: flex-end;
}
.setPoint-tip span:last-child {
  margin-left: 20px;
}
.trace-textarea {
  outline: none;
  resize: none;
  width: 343px;
  height: 60px;
  max-height: 60px;
}
.trace-title {
  position: relative;
  top: -40px;
}
</style>
