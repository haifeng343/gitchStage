 <template>
  <div class="table">
    <div class="container">
      <div class="sellerRel-title">已关联商户</div>

      <el-table :data="reltableData" border class="table mt20" ref="multipleTable">
        <el-table-column prop="AccountId" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="商户名称"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="RegistTime" align="center" label="注册时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="openDeleteForm(scope.row)" type="text" class="red">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="relhandleSizeChange"
          @current-change="relhandleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="relpageCount"
        ></el-pagination>
      </div>

      <hr>

      <div class="sellerRel-title mt30">未关联商户</div>
      <el-form :inline="true" class="demo-form-inline mt20">
        <el-form-item label="商户名称:">
          <el-input v-model="accountName" placeholder="请输入商户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="accountMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:10px">
          <el-button type="primary" style="margin-left:10px" size="medium" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="unreltableData" border class="table mt20" ref="multipleTable">
        <el-table-column prop="AccountId" align="center" label="ID"></el-table-column>
        <el-table-column prop="AccountName" align="center" label="商户名称"></el-table-column>
        <el-table-column prop="Mobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="RegistTime" align="center" label="注册时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="binding(scope.row)" type="text">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="unrelhandleSizeChange"
          @current-change="unrelhandleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="unrelpageCount"
        ></el-pagination>
      </div>

      <!--删除弹窗-->
      <el-dialog title="解绑商户" :visible.sync="deleteVisible" width="500px" center>
        <div class="sellerRel-text">您确定解绑【{{deleteForm.AccountName}}】吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
    getManagerRelSellerInfo,
    getManagerUnrelSellerInfo,
    bindrelSeller,
    unBindrelSeller
} from "api/seller.js";
export default {
  name: "SellerRel",
  data() {
    return {
      AccountId:"",
      reltableData:[],
      relcur_page: 1, //页码
      relpagesize: 30, //每页数量
      relpageCount: 0, //总条数

      accountName:"",
      accountMobile:"",
      unreltableData:[],
      unrelcur_page: 1, //页码
      unrelpagesize: 30, //每页数量
      unrelpageCount: 0, //总条数

      deleteVisible: false,
      deleteForm:{
          AccountName:"",
          AccountId:""
      }
    };
  },

  watch: {
    $route(newValue, oldValue) {
      if (newValue.path.indexOf("/sellerRel") != -1) {
        this.init();
      }
    }
  },

  created() {
    this.init();
  },
  methods: {
    init(){
        this.AccountId=this.$route.params.id;
        this._getManagerRelSellerInfo();
        this._getManagerUnrelSellerInfo();
    },

    //分页导航尺寸更改
    relhandleSizeChange(val) {
      this.relpagesize = val;
      this._getManagerRelSellerInfo();
    },
    // 分页导航
    relhandleCurrentChange(val) {
      this.relcur_page = val;
      this._getManagerRelSellerInfo();
    },
    
    //分页导航尺寸更改
    unrelhandleSizeChange(val) {
      this.unrelpagesize = val;
      this._getManagerUnrelSellerInfo();
    },
    // 分页导航
    unrelhandleCurrentChange(val) {
      this.unrelcur_page = val;
      this._getManagerUnrelSellerInfo();
    },
    search() {
      this.unrelcur_page = 1;
      this._getManagerUnrelSellerInfo();
    },
    //绑定商家
    binding(item) {
      this._bindrelSeller(item.AccountId).then(val=>{
        this._getManagerRelSellerInfo();
        this._getManagerUnrelSellerInfo();
          this.$message({
              type: "success",
              message: "绑定成功",
              showClose: true
            });
      });
    },
    openDeleteForm(item) {
      this.deleteVisible = true;
      this.deleteForm.AccountName=item.AccountName;
      this.deleteForm.AccountId=item.AccountId;
    },
    deleteOk() {
        this._unBindrelSeller(this.deleteForm.AccountId).then(val=>{
            this.$message({
                showClose: true,
                message: "解绑成功",
                type: "success"
            });
            this.deleteVisible = false;
            this._getManagerRelSellerInfo();
            this._getManagerUnrelSellerInfo();
        })
    },

    //查询已关联商家信息列表
    _getManagerRelSellerInfo() {
      const params = {
        Id: this.AccountId,
        pageindex: this.relcur_page,
        pagecount: this.relpagesize
      };
      return getManagerRelSellerInfo(params).then(res => {
        this.reltableData = res.Data.List;
        this.relpageCount=res.Data.TotalCount;
      });
    },
    //查询已关联商家信息列表
    _getManagerUnrelSellerInfo() {
      const params = {
        Id: this.AccountId,
        pageindex: this.unrelcur_page,
        pagecount: this.unrelpagesize,
        Mobile:this.accountMobile,
        Name:this.accountName
      };
      return getManagerUnrelSellerInfo(params).then(res => {
        this.unreltableData = res.Data.List;
        this.unrelpageCount=res.Data.TotalCount;
      });
    },
    //绑定关联商家
    _bindrelSeller(id){
      const params = {
        AccountId: this.AccountId,
        BindAccountId: id
      };
      return bindrelSeller(params);
    },
    //解绑关联商家
    _unBindrelSeller(id){
      const params = {
        AccountId: this.AccountId,
        BindAccountId: id
      };
      return unBindrelSeller(params);
    }
  }
};
</script>

<style scoped>
.mt30 {
  margin-top: 30px;
}
.mt20 {
  margin-top: 20px;
}
.sellerRel-text {
  width: 100%;
  text-align: center;
}
.red {
  color: red;
}
</style>