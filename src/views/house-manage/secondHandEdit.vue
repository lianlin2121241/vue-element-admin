<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>住宅信息</span>
      </div>
      <el-form
        ref="dataFormHouse"
        :rules="rulesHouse"
        :model="formData"
        label-position="right"
        label-width="160px"
        style="margin-left:50px;margin-right:50px;"
      >
        <el-form-item label="小区名称" prop="communityId">
          <el-select
            v-model="formData.communityId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入小区名称"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户室号" prop="houseNumberBuilding">
          <el-input
            v-model="formData.houseNumberBuilding"
            placeholder="栋/幢/弄/胡同"
          />
          <el-input v-model="formData.houseNumberUnit" placeholder="单元/号" />
          <el-input v-model="formData.houseNumberRoom" placeholder="门牌" />
        </el-form-item>
        <el-form-item label="所在楼层" prop="currentFloor">
          <el-input v-model="formData.currentFloor">
            <template slot="append">层</template>
          </el-input>
          ,共
          <el-input v-model="formData.totalFloor">
            <template slot="append">层</template>
          </el-input>
        </el-form-item>
        <el-form-item label="户型" prop="room">
          <el-input v-model="formData.room">
            <template slot="append">室</template>
          </el-input>
          <el-input v-model="formData.hall">
            <template slot="append">厅</template>
          </el-input>
          <el-input v-model="formData.bathroom">
            <template slot="append">卫</template>
          </el-input>
        </el-form-item>
        <el-form-item label="建筑面积" prop="constructionArea">
          <el-input v-model="formData.constructionArea">
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
        <el-form-item label="套内面积" prop="innerBuildingArea">
          <el-input v-model="formData.innerBuildingArea">
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
        <el-form-item label="建造年代" prop="constructionAge">
          <el-input v-model="formData.constructionAge">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="产权年限" prop="propertyYears">
          <el-radio-group v-model="formData.propertyYears">
            <el-radio
              v-for="{ item, index } in propertyYearsOptions"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产权类型" prop="propertyTypes">
          <el-radio-group v-model="formData.propertyTypes">
            <el-radio
              v-for="{ item, index } in propertyTypesOptions"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主卧朝向" prop="bedroomOriented">
          <span v-for="{ item, index } in buildingTypes" :key="index">{{item}}</span>
          <el-radio-group v-model="formData.bedroomOriented">
            <el-radio
              v-for="{ item, index } in bedroomOriented"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="房屋类型" prop="houseTypes">
          <el-radio-group v-model="formData.houseTypes">
            <el-radio
              v-for="{ item, index } in houseTypesOptions"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="建筑形式" prop="buildingTypes">
          <span v-for="{ item, index } in buildingTypes" :key="index">{{item}}</span>
          <el-radio-group v-model="formData.buildingTypes">
            <el-radio
              v-for="{ item, index } in buildingTypes"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="装修情况" prop="decorationStatus">
          <el-radio-group v-model="formData.decorationStatus">
            <el-radio
              v-for="{ item, index } in decorationStatusOptions"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否配有电梯" prop="elevator">
          <el-radio-group v-model="formData.elevator">
            <el-radio :label="0">没有</el-radio>
            <el-radio :label="1">有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="供暖" prop="heating">
          <el-radio-group v-model="formData.heating">
            <el-radio
              v-for="{ item, index } in heatingOptions"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>价格信息</span>
      </div>
      <el-form
        ref="dataFormPrice"
        :rules="rulesPrice"
        :model="formData"
        label-position="right"
        label-width="160px"
        style="margin-left:50px;margin-right:50px;"
      >
        <el-form-item label="房屋年限" prop="houseYearLimit">
          <el-radio-group v-model="formData.houseYearLimit">
            <el-radio
              v-for="{ item, index } in houseYearLimitOptions"
              :key="index"
              :label="item.value"
              >{{ item.code }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否为房主唯一住房" prop="uniqueHouse">
          <el-radio-group v-model="formData.uniqueHouse">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input v-model="formData.price">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="首付" prop="payinAdvance">
          <el-input v-model="formData.payinAdvance">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="佣金比例≤" prop="commission">
          <el-input v-model="formData.commission">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>房屋相册</span>
      </div>
      <el-form
        ref="dataFormPicture"
        :rules="rulesPicture"
        :model="formData"
        label-position="right"
        label-width="160px"
        style="margin-left:50px;margin-right:50px;"
      >
        <el-form-item label="室内图">
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
        </el-form-item>
        <el-form-item label="户型图">
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
        </el-form-item>
        <el-form-item label="室外图">
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
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>房源描述</span>
      </div>
      <el-form
        ref="dataFormDescription"
        :rules="rulesDescription"
        :model="formData"
        label-position="right"
        label-width="160px"
        style="margin-left:50px;margin-right:50px;"
      >
        <el-form-item label="房屋标题" prop="smartTitle">
          <el-input
            type="formData.smartTitle"
            placeholder="请输入房屋标题"
            v-model="text"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="房源标签">
          <el-select
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋详情" prop="houseDetail">
          <el-input
            type="textarea"
            placeholder="请输入房屋详情"
            v-model="formData.houseDetail"
            maxlength="2000"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="业主心态" prop="ownerFeel">
          <el-input
            type="textarea"
            placeholder="请输入业主心态"
            v-model="formData.ownerFeel"
            maxlength="2000"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="服务介绍" prop="serviceIntro">
          <el-input
            type="textarea"
            placeholder="请输入服务介绍"
            v-model="formData.serviceIntro"
            maxlength="2000"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="saveData()">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getDictByType } from "@/api/dict";
import { getDataList, save, getInfoById, deleteData } from "@/api/area";
import { getDataTree } from "@/api/areaCategory";
import { uploadFile, downloadFile, findFileUpload } from "@/api/fileUpload";
import { mapGetters } from "vuex";
import { dictTypes } from "@/settings";

import _ from "lodash";

export default {
  name: "agency",
  data() {
    return {
      areaOptions: [],
      formData: {
        id: "",
        type: 1,
        communityId: "",
        houseNumberBuilding: "",
        houseNumberUnit: "",
        houseNumberRoom: "",
        currentFloor: "",
        totalFloor: "",
        actualFloor: "",
        room: "",
        hall: "",
        bathroom: "",
        constructionArea: "",
        innerBuildingArea: "",
        smartTitle: "",
        bedroomOriented: "",
        houseTypes: "",
        decorationStatus: "",
        elevator: "",
        heating: "",
        houseDetail: "",
        price: "",
        floorRoomCount: "",
        homeowner: "",
        homeownerPhone: "",
        homeownerPhone1: "",
        homeownerWx: "",
        serviceIntro: "",
        ownerFeel: "",
        constructionAge: "",
        buildingTypes: "",
        saleType: "",
        propertyYears: "",
        uniqueHouse: "",
        houseYearLimit: "",
        payinAdvance: "",
        commission: "",
        recordNumber: "",
        propertyTypes: "",
        panshiHouseId: "",
        businessFileSaveDTOs: ""
      },
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
  computed: {
    ...mapGetters(dictTypes)
  },
  created() {
    this.getBuildingType();
    this.getAreaCategoryOptions();
  },
  mounted() {
    this.getDataListFun();
  },
  methods: {
    /**
     * 远程匹配小区
     */
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
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
