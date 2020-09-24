<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button class="filter-item" type="danger" icon="el-icon-edit" @click="handleBatchDelete">删除</el-button>
    </div>
    <el-table
      :data="tableData.list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="categoryId"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column prop="name" label="经纪机构名称"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDelete([row.id],$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.currPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalCount"
      ></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="经纪机构名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item label="网站" prop="webSite">
          <el-input v-model="temp.webSite" />
        </el-form-item>
        <el-form-item label="描述" prop="aboutUs">
          <el-input type="textarea" v-model="temp.aboutUs" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDataList, save, deleteData } from "@/api/agency";
import _ from "lodash";

export default {
  name: "agency",
  data() {
    return {
      tableData: {},
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增"
      },
      temp: {
        id: undefined,
        name: "",
        address: "",
        phone: "",
        email: "",
        aboutUs: "",
        mobile: "",
        webSite: ""
      },
      rules: {
        name: [
          { required: true, message: "经纪机构名称必填", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址必填", trigger: "blur" }],
        phone: [{ required: true, message: "手机必填", trigger: "blur" }],
        mobile: [{ required: true, message: "电话必填", trigger: "blur" }]
      },
      searchObj: {},
      searchObjTemp: {
        limit: 10,
        page: 1
      },
      multipleSelection:[]
    };
  },
  created() {},
  mounted() {
    this.getDataListFun();
  },
  methods: {
    getDataListFun() {
      this.searchObj = Object.assign({}, this.searchObjTemp);
      getDataList(this.searchObj).then(response => {
        this.tableData = response.page;
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleSizeChange(num) {
      this.searchObjTemp.limit = num;
      this.getDataListFun();
    },
    handleCurrentChange(num) {
      this.searchObjTemp.page = num;
      this.getDataListFun();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: "",
        address: "",
        phone: "",
        email: "",
        aboutUs: "",
        mobile: "",
        webSite: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    saveData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let msg = this.temp !== undefined ? "修改成功" : "创建成功";
          save(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: msg,
              type: "success",
              duration: 2000
            });
            this.getDataListFun();
          });
        }
      });
    },
    handleBatchDelete(){
      this.handleDelete(this.multipleSelection.map(item=>item.id));
    },
    handleDelete(ids) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteData(ids).then(() => {
          this.$notify({
            title: "Success",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getDataListFun();
        });
      });
    }
  }
};
</script>
