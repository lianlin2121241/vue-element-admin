<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="categoryId"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="name" label="小区分类名称" width="180"></el-table-column>
      <el-table-column prop="parentName" label="上级分类" width="180"></el-table-column>
      <el-table-column prop="orderNum" label="序号"></el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row,$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="上级类别" prop="parentName">
          <el-popover ref="popover" placement="bottom-start" width="310" trigger="focus">
            <el-tree :data="selectTableData" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"></el-tree>
          </el-popover>
          <el-input v-popover:popover v-model="temp.parentName" readonly />
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input v-model="temp.orderNum" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDataTree, save, update, deleteData } from "@/api/areaCategory";
import _ from "lodash";

export default {
  name: "areaCategory",
  data() {
    return {
      tableData: [],
      selectTableData: [],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增"
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      temp: {
        categoryId: undefined,
        name: '',
        parentId: 0,
        parentName: '根目录',
        orderName: 0
      },
      rules: {
        name: [
          { required: true, message: "分类名称必填", trigger: "blur" }
        ],
        parentName: [
          {
            required: true,
            message: "上级分类必填",
            trigger: "change"
          }
        ],
        orderNum: [
          { required: true, message: "排序必填", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.getDataListFun();
  },
  methods: {
    getDataListFun() {
      getDataTree().then(response => {
        this.tableData = response.categoryList;

        let tempTableData = _.cloneDeep(this.tableData);
        this.selectTableData = [
          {
            categoryId: 0,
            parentId: -1,
            name: "根目录",
            parentName: null,
            orderNum: 0,
            delFlag: 0,
            open: null,
            children: tempTableData
          }
        ];
      });
    },
    resetTemp() {
      this.temp = {
        categoryId: undefined,
        name: '',
        parentId: 0,
        parentName: '根目录',
        orderName: 0
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
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          save(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
            this.getDataListFun();
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      if (this.temp.parentId === 0) {
        this.temp.parentName = '根目录'
      }
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          update(tempData).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
            this.getDataListFun();
          });
        }
      });
    },
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteData(data.categoryId).then(() => {
          this.$notify({
            title: "Success",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getDataListFun();
        });
      });
    },
    handleNodeClick(data) {
      this.temp.parentId = data.categoryId
      this.temp.parentName = data.name
    }
  }
};
</script>
