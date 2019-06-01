<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin:10px 0">
      <el-form-item label="摘要内容:">
        <el-input v-model="formInline.Name" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-button type="primary" style="margin-left:10px" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" style="float:right;" @click="add">添加摘要文本</el-button>
    </el-form>

    <el-table :data="List" border class="table" ref="multipleTable">
      <el-table-column prop="Id" align="center" label="ID" width="200px"></el-table-column>
      <el-table-column prop="Name" align="center" label="摘要文本"></el-table-column>
      <el-table-column prop="OrderIndex" align="center" label="排序" width="200px"></el-table-column>
      <el-table-column align="center" label="是否有效" width="250px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.Status"
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="2"
            @change="_delegateTrackAbstractStatusModify(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="UpdateTime" align="center" label="最后更新时间" width="250px"></el-table-column>
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="delate(scope.row.Id)" class="red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加分类-->
    <el-dialog :title="titlepSub" :visible.sync="dispickupVisiable" width="500px">
      <span class="trace-title">{{titlepSub}}:</span>
      <el-input type="textarea" class="trace-textarea" v-model="List.Name"></el-input>
      <label>排序：</label>
      <el-input v-model="List.OrderIndex" style="width:360px"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pickup()">添加</el-button>
        <el-button @click="dispickupVisiable = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>

    <!--编辑分类-->
    <el-dialog :title="titlepSub" :visible.sync="diseditVisiable" width="500px">
      <span class="trace-title">{{titlepSub}}:</span>
      <el-input type="textarea" class="trace-textarea" v-model="form.Name"></el-input>
      <label>排序：</label>
      <el-input v-model="form.OrderIndex" style="width:360px"></el-input>
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
  delegateTrackAbstractStatusModify, //状态修改
  callcenterDelegateTrackAbstract, //列表
  delegateTrackAbstractModify, //编辑信息
  delegateTrackAbstractStatusAdd, //添加
  delegateTrackAbstractDelete //删除
} from "api/entrust.js";
export default {
  data() {
    return {
      formInline: {
        Name: ""
      },
      currentPage4: 1,
      TotalCount: 0,
      pageSize: 10,
      titlepSub: "添加摘要文本",
      isShow: false,
      input: "",
      dispickupVisiable: false,
      diseditVisiable: false,
      List: [],
      OrderIndex: "",
      form: {}
    };
  },
  mounted() {
    this._callcenterDelegateTrackAbstract();
  },
  methods: {
    //分页导航尺寸更改
    HandleSizeChange(val) {
      this.pageSize = val;
      this.currentPage4 = 1;
      this._callcenterDelegateTrackAbstract();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this._callcenterDelegateTrackAbstract();
    },
    search() {
      this.currentPage4 = 1;
      this._callcenterDelegateTrackAbstract();
    },
    add() {
      this.dispickupVisiable = true;
      this.isShow = false;
      this.titlepSub = "添加摘要文本";
    },
    pickup() {
      this._delegateTrackAbstractStatusAdd().then(res => {
        this.dispickupVisiable = false;

        this._callcenterDelegateTrackAbstract();
      });
    },
    //添加
    _delegateTrackAbstractStatusAdd(item) {
      const params = {
        Name: this.List.Name,
        OrderIndex: this.List.OrderIndex
      };

      return delegateTrackAbstractStatusAdd(params);
    },
    //编辑
    edit(row) {
      this.form = Object.assign({}, row);
      this.diseditVisiable = true;
      this.isShow = true;
      this.titlepSub = "编辑摘要文本";
    },
    editDialog(item) {
      this._delegateTrackAbstractModify().then(res => {
        this.diseditVisiable = false;
        this._callcenterDelegateTrackAbstract();
        this.$message({
          type: "success",
          message: "编辑成功",
          showClose: true
        });
      });
    },
    _delegateTrackAbstractModify(item) {
      const params = {
        Id: this.form.Id,
        Name: this.form.Name,
        OrderIndex: this.form.OrderIndex
      };
      return delegateTrackAbstractModify(params);
    },
    // 修改状态
    _delegateTrackAbstractStatusModify(item) {
      const params = {
        Id: item.Id,
        Status: item.Status
      };
      return delegateTrackAbstractStatusModify(params).catch(ex => {
        this._callcenterDelegateTrackAbstract();
      });
    },
    //获取跟踪信息列表
    _callcenterDelegateTrackAbstract() {
      let params = {
        Name: this.formInline.Name,
        pageindex: this.currentPage4,
        pagecount: this.pageSize
      };
      callcenterDelegateTrackAbstract(params).then(res => {
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
        delegateTrackAbstractDelete({ Id: id }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功",
            showClose: true
          });
          this._callcenterDelegateTrackAbstract();
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
  width: 315px;
  height: 60px;
  max-height: 60px;
}
.trace-title {
  position: relative;
  top: -40px;
}
</style>
