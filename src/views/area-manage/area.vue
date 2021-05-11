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
          <img
            :src="
              !scope.row.fileId ? defaultPhoto : imageStUrl(scope.row.fileId)
            "
            class="avatar"
          />
        </template>
      </el-table-column>
      <el-table-column prop="mainTitle" label="标题"></el-table-column>
      <el-table-column prop="subtitle" label="子标题"></el-table-column>
      <el-table-column prop="areaCategoryStringArrConvert" label="区域分类">
      </el-table-column>
      <el-table-column prop="buildingYear" label="建筑年份"></el-table-column>
      <el-table-column
        prop="buildingTypeString"
        label="建筑类型"
      ></el-table-column>
      <el-table-column prop="developer" label="开发商"></el-table-column>
      <el-table-column prop="buildingTotal" label="楼栋总数"></el-table-column>
      <el-table-column prop="houseTotal" label="房屋总数"></el-table-column>
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
        style="margin-left:50px;margin-right:50px;"
      >
        <el-form-item label="主标题" prop="mainTitle">
          <el-input v-model="temp.mainTitle" />
        </el-form-item>
        <el-form-item label="副标题" prop="subtitle">
          <el-input v-model="temp.subtitle" />
        </el-form-item>
        <el-form-item label="小区类别" prop="areaCategory">
          <a-cascader
            :options="areaCategoryOptions"
            placeholder="请选择"
            :fieldNames="areaCategoryFieldNames"
            :value="temp.areaCategoryIdArr"
            @change="onAreaCategoryChange"
          />
        </el-form-item>
        <el-form-item label="建筑年代" prop="buildingYear">
          <el-date-picker
            v-model="temp.buildingYear"
            type="year"
            value-format="yyyy"
            placeholder="选择年代"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建筑类型" prop="buildingType">
          <el-select
            v-model="temp.buildingType"
            clearable
            filterable
            placeholder="请选建筑类型"
          >
            <el-option
              v-for="item in buildingType"
              :key="item.value"
              :label="item.code"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物业费" prop="propertyCost">
          <el-input v-model="temp.propertyCost" />
        </el-form-item>
        <el-form-item label="物业公司" prop="propertyCompany">
          <el-input v-model="temp.propertyCompany" />
        </el-form-item>
        <el-form-item label="开发商" prop="developer">
          <el-input v-model="temp.developer" />
        </el-form-item>
        <el-form-item label="楼栋数量" prop="buildingTotal">
          <el-input v-model="temp.buildingTotal" />
        </el-form-item>
        <el-form-item label="房屋数量" prop="houseTotal">
          <el-input v-model="temp.houseTotal" />
        </el-form-item>
        <el-form-item label="小区介绍" prop="introduction">
          <el-input type="textarea" v-model="temp.introduction" />
        </el-form-item>
        <el-form-item label="小区配套" prop="supporting">
          <el-input type="textarea" v-model="temp.supporting" />
        </el-form-item>
        <el-form-item label="交通出行" prop="traffic">
          <el-input type="textarea" v-model="temp.traffic" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            :action="uploadFileUrl"
            list-type="picture-card"
            :with-credentials="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="true"
            :file-list="fileList"
            :on-remove="handleRemove"
            ref="uploadFile"
            name="uploadFile"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemoveFun(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img
              v-if="imageUrl || !!temp.fileId"
              :src="imageUrl ? imageUrl : imageStUrl(temp.fileId)"
              class="avatar"
            />
          </el-dialog> -->

          <!-- <el-upload
            class="avatar-uploader"
            :with-credentials="true"
            :action="uploadFileUrl"
            list-type="picture-card"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="uploadFile"
          >
            <img v-if="imageUrl||!!temp.fileId" :src="imageUrl?imageUrl:imageStUrl(temp.fileId)" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
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
import { getDictByType } from "@/api/dict";
import { getDataList, save, getInfoById, deleteData } from "@/api/area";
import { getDataTree } from "@/api/areaCategory";
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
      areaCategoryOptions: [],
      areaCategoryFieldNames: {
        label: "name",
        value: "categoryId",
        children: "children"
      },
      buildingType: [],
      fileList: [],
      // dialogImageUrl: '',
      // dialogVisible: false,
      temp: {
        id: undefined,
        mainTitle: "",
        subtitle: "",
        areaCategory: null,
        areaCategoryIdArr: [],
        buildingYear: "",
        buildingType: null,
        lng: null,
        lat: null,
        propertyCost: "",
        propertyCompany: "",
        developer: "",
        buildingTotal: null,
        houseTotal: null,
        introduction: "",
        supporting: "",
        traffic: "",
        fileIds: []
      },
      rules: {
        // name: [{ required: true, message: "姓名必填", trigger: "blur" }],
        // phone: [{ required: true, message: "手机必填", trigger: "blur" }]
      },
      searchObj: {},
      searchObjTemp: {
        pageSize: 10,
        pageNum: 1
      },
      multipleSelection: [],
      imageUrl: "",
      defaultPhoto: require("@/assets/defaultPhoto.png")
    };
  },
  computed: {},
  created() {
    this.getBuildingType();
    this.getAreaCategoryOptions();
  },
  mounted() {
    this.getDataListFun();
  },
  methods: {
    handleRemoveFun(file) {
      this.$refs.uploadFile.handleRemove(file);
      // debugger;
      // console.log(file);
    },
    handleRemove(file, fileList) {
      this.temp.fileIds = fileList.map(item => {
        return item.fileId;
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onAreaCategoryChange(value) {
      this.temp.areaCategoryIdArr = value;
      this.temp.areaCategory = value[value.length - 1];
      console.log(value);
    },
    areaCategoryString: function(data) {
      if (!Array.isArray(data)) {
        return [];
      }
      return data.reverse().join(`/`);
    },
    imageStUrl(id) {
      return `${window.globalVar.fileViewUrl}?fileId=${id}&isView=1`;
    },
    async getBuildingType() {
      let buildingTypeData = await getDictByType("buildingType");
      this.buildingType = buildingTypeData.data.dictDetailList;
    },
    async getAreaCategoryOptions() {
      let dataTree = await getDataTree();
      this.areaCategoryOptions = dataTree.categoryList;
    },
    getDataListFun() {
      this.searchObj = Object.assign({}, this.searchObjTemp);
      getDataList(this.searchObj).then(response => {
        this.tableData = response.data;
        this.tableData.list = this.tableData.list.map(item => {
          item.areaCategoryStringArrConvert = this.areaCategoryString(
            item.areaCategoryStringArr
          );
          return item;
        });
      });
    },
    handleAvatarSuccess(res, file) {
      this.temp.fileIds.push(res.data.fileId);
      file.fileId = res.data.fileId;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let reg = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/;
      const isPass = reg.test(file.name);
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isPass) {
        this.$message.error("格式不正确!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件不能超过 20MB!");
      }
      return isPass && isLt2M;
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
        mainTitle: "",
        subtitle: "",
        areaCategory: null,
        areaCategoryIdArr: [],
        buildingYear: "",
        buildingType: null,
        lng: null,
        lat: null,
        propertyCost: "",
        propertyCompany: "",
        developer: "",
        buildingTotal: null,
        houseTotal: null,
        introduction: "",
        supporting: "",
        traffic: "",
        fileIds: []
      };
      this.$refs.uploadFile && this.$refs.uploadFile.clearFiles();
      // this.imageUrl=""
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
      info.areaCategoryIdArr = info.data.areaCategoryIdArr.reverse();
      this.fileList = info.data.fileIds.map(item => {
        return {
          fileId: item,
          name: item,
          url: this.imageStUrl(item)
        };
      });
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
.ant-cascader-menus {
  z-index: 3000;
}
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
