<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >添加</el-button
      >
      <el-button
        class="filter-item"
        type="danger"
        icon="el-icon-edit"
        @click="handleBatchDelete"
        >删除</el-button
      >
    </div>
    <el-table
      :data="tableData.list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="头像图片">
        <template slot-scope="scope">
          <img :src="!scope.row.fileId?defaultPhoto:imageStUrl(scope.row.fileId)" class="avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="agencyName" label="所属经纪机构"></el-table-column>
      <el-table-column prop="email" label="电子邮件"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)"
            >修改</el-button
          >
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete([row.id], $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="经纪机构">
          <el-select
            v-model="temp.agencyId"
            clearable
            filterable
            placeholder="请选择经纪机构"
          >
            <el-option
              v-for="item in agencys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
            v-model="temp.enable"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="自我介绍" prop="aboutme">
          <el-input type="textarea" v-model="temp.aboutme" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :with-credentials="true"
            :action="uploadFileUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="uploadFile"
          >
            <img v-if="imageUrl||!!temp.fileId" :src="imageUrl?imageUrl:imageStUrl(temp.fileId)" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { getDataList, save, getInfoById, deleteData } from "@/api/agent";
import { getDataListAll } from "@/api/agency";
import { uploadFile, downloadFile, findFileUpload } from "@/api/fileUpload";
import _ from "lodash";

export default {
  name: "agency",
  data() {
    return {
      uploadFileUrl: `${window.globalVar.fileUploadUrl}`,
      tableData: {},
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增"
      },
      agencys: [],
      temp: {
        id: undefined,
        name: "",
        phone: "",
        agencyId: "",
        email: "",
        enable: 0,
        aboutme: "",
        fileId:""
      },
      rules: {
        name: [{ required: true, message: "姓名必填", trigger: "blur" }],
        phone: [{ required: true, message: "手机必填", trigger: "blur" }]
      },
      searchObj: {},
      searchObjTemp: {
        pageSize: 10,
        pageNum: 1
      },
      multipleSelection: [],
      imageUrl:"",
      defaultPhoto: require("@/assets/defaultPhoto.png")
    };
  },
  computed:{
  },
  created() {
    this.getAgencyAll();
  },
  mounted() {
    this.getDataListFun();
  },
  methods: {
    imageStUrl(id){
      return `${window.globalVar.fileViewUrl}?fileId=${id}&isView=1`
    },
    async getAgencyAll() {
      let agencysData = await getDataListAll();
      this.agencys = agencysData.data;
    },
    getDataListFun() {
      this.searchObj = Object.assign({}, this.searchObjTemp);
      getDataList(this.searchObj).then(response => {
        this.tableData = response.data;
      });
    },
    handleAvatarSuccess(res, file) {
      this.temp.fileId = res.data.fileId;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(num) {
      this.searchObjTemp.pageSize = num;
      this.getDataListFun();
    },
    handleCurrentChange(num) {
      this.searchObjTemp.pageNum = num;
      this.getDataListFun();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: "",
        phone: "",
        agencyId: "",
        email: "",
        enable: 0,
        aboutme: "",
        avatar: "",
        fileId:""
      };
      this.imageUrl=""
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    async handleUpdate({ id }) {
      this.resetTemp();
      let info = await getInfoById(id);
      this.temp = Object.assign({}, info.data); // copy obj
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
    handleBatchDelete() {
      this.handleDelete(this.multipleSelection.map(item => item.id));
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
