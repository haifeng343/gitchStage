 <template>
  <div class="table">
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" style="float:right;margin-bottom:10px;" @click="showAddForm">添加席位</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="Id" align="center" label="ID"></el-table-column>
        <el-table-column prop="SeatNumber" align="center" label="席位编号"></el-table-column>
        <el-table-column prop="ShowMobile" align="center" label="电话号码"></el-table-column>
        <el-table-column prop="Type" align="center" label="电话类型">
          <template slot-scope="scope">{{getType(scope.row.Type)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="deleteData(scope.row.Id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
      <!-- 新增弹出框 -->
      <el-dialog title="添加席位" :visible.sync="addVisible" width="700px" autocomplete="off">
        <el-form ref="addForm" :model="addForm" :rules="addrules" label-width="130px">
          <el-form-item label="席位列表:" prop="SeatId">
            <el-select
              v-model="addForm.SeatId"
              placeholder="请选择席位"
              style="width:100%;"
            >
              <el-option
                v-for="item in SeatList"
                :key="item.SeatId"
                :label="item.SeatNumber"
                :value="item.SeatId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话列表:" prop="MobileId">
            <el-select
              v-model="addForm.MobileId"
              placeholder="请选择电话"
              style="width:250px;"
            >
              <el-option
                v-for="item in SeatPhoneList"
                :key="item.Id"
                :label="item.Mobile"
                :value="item.Id"
                style="width:250px;"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-checkbox @change="changePhoneType" style="margin-left:403px;position:relative;top:-45px;">未使用号码</el-checkbox>
          <el-form-item label="选择电话类型:" prop="Type" >
            <el-radio-group v-model="addForm.Type">
            <el-radio label="网络电话">网络电话</el-radio>
            <el-radio label="座机">座机</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="clear:both;">
          <!-- <el-button @click="addVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="_addAPI('addForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑席位" :visible.sync="editVisible" width="633px">
        <el-form ref="editForm" :model="editForm" :rules="editrules" label-width="130px">
          <el-form-item label="席位编号:">
            {{editForm.SeatNumber}}
          </el-form-item>
          <el-form-item label="电话列表:">
            <el-select
              v-model="editForm.MobileId"
              placeholder="请选择电话"
              style="width:248px;"
            >
              <el-option
                v-for="item in SeatPhoneList"
                :key="item.Id"
                :label="item.Mobile"
                :value="item.Id"
                style="width:248px;"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-checkbox @change="changePhoneType" style="margin-left:392px;position:relative;top:-45px;">未使用号码</el-checkbox>
          <el-form-item label="选择电话类型:" prop="Type" >
            <el-radio-group v-model="editForm.Type">
            <el-radio label='网络电话'>网络电话</el-radio>
            <el-radio label='座机'>座机</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="editVisible = false">取 消</el-button> -->
          <el-button
            type="primary"
            size="medium"
            class="dialog-certain"
            @click="saveEdit('editForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getApplySeatList,
  getUsableSeatPulldow,
  getUsableSeatCallPulldown,
  addApplySeatList,
  deleteApplySeatList,
  modifyApplySeatList
} from "api/seller.js";
export default {
  name: "SellerCallSeatList",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      Ip: "",
      Id: "",
      MobileType:'',
      pageCount: 0,
      pagesize: 30,
      addVisible: false,
      editVisible: false,
      SeatList: [],
      SeatPhoneList: [],
      addForm: {
        SeatId: "",
        MobileId: "",
        Type: "",
      },
      editForm: {
        SeatNumber: "",
        MobileId: "",
        Type: '',
      },
      addrules: {
        SeatId: [{ required: true, message: "请选择席位", trigger: "change" }],
        MobileId: [
          { required: true, message: "请选择电话号码", trigger: "change" }
        ],
        Type: [
          { required: true, message: "请选择电话类型", trigger: "change" }
        ]
      },
      editrules: {
        MobileId: [
          { required: true, message: "请选择电话号码", trigger: "change" }
        ],
        Type: [
          { required: true, message: "请选择电话类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getData();
    this._getUsableSeatPulldow();
    this._getUsableSeatCallPulldown(0)
  },
  computed: {},
  methods: {
    // 获取可用席位列表
    async _getUsableSeatPulldow() {
      const params = {};
      await getUsableSeatPulldow(params).then(res => {
        this.SeatList = res.Data;
      });
    },
    async _getUsableSeatCallPulldown(type) {
      const params = {
          'Type':type
      };
      await getUsableSeatCallPulldown(params).then(res => {
        this.SeatPhoneList = res.Data;
      });
    },
    changePhoneType(value){
        value?this.MobileType = 1:this.MobileType = 0
        this.MobileId = ''
        this._getUsableSeatCallPulldown(this.MobileType)
    },
    // changeSeat(value) {
    //   this.addForm.SeatId = value;
    // },
    // changeSeatPhone(value) {
    //   this.addForm.MobileId = value;
    // },
    // 保存编辑
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let type=this.editForm.Type =='网络电话'?2:1;
          const params = {
            Id: this.Id,
            MobileId: this.editForm.MobileId,
            Type: type
          };
          modifyApplySeatList(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.editVisible = false;
            } else {
              this.$message(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 显示编辑弹窗
    handleEdit(item) {

      this.Id = item.Id;
      this.editVisible = true;
      let arr=this.SeatPhoneList.filter(x=>{
        return x.Mobile===item.ShowMobile;
      })
      if(arr.length>0){
        this.editForm.MobileId = arr[0].Id;
      }
      item.Type =='2'?this.editForm.Type ='网络电话':this.editForm.Type='座机'
      this.editForm.SeatNumber= item.SeatNumber;
    },
    showAddForm() {
      this.addForm.SeatId = ''
      this.addForm.MobileId = ''
      this.addForm.Type = ''
      this.addForm.MobileType = ''
      this.addVisible = true;
    },
    // 添加
    _addAPI(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addForm.Type =='网络电话'?this.addForm.Type=2:this.addForm.Type=1
          const params = {
            ApplyId: this.$route.params.id,
            SeatId: this.addForm.SeatId,
            MobileId: this.addForm.MobileId,
            Type: this.addForm.Type,
          };
          addApplySeatList(params).then(res => {
            if (res.Success) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.getData(this.cur_page);
              this.addVisible = false;
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    getType(type) {
      switch (type) {
        case 1:
          return "座机";
          break;
        case 2:
          return "电话条";
          break;
        default:
          break;
      }
    },
    // 删除角色
    deleteData(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            'Id': id
          };
          deleteApplySeatList(params)
            .then(res => {
              if (res.Success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
              } else {
                this.$message.error(res.Message);
              }
            })
            .catch(error => {
              console.log("error");
            });
        })
        .catch(() => {});
    },
    //分页导航尺寸更改
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取表格数据
    async getData() {
      const params = {
        pageindex: this.cur_page,
        pagecount: this.pagesize,
        ApplyId: this.$route.params.id
      };
      await getApplySeatList(params).then(res => {
        if (res && res.Success) {
          this.tableData = res.Data.List;
          this.pageCount = res.Data.TotalCount;
        } else {
          this.$message({
            message: res.Message,
            center: true
          });
        }
      });
    },
    search() {
      this.cur_page = 1;
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.el-form-item__content{
    width: 100% !important;
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