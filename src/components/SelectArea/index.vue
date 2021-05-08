<template>
  <div class="select-container">
    <el-select
      filterable
      remote
      reserve-keyword
      :remote-method="remoteMethod"
      :loading="loading"
      :clearable="true"
      v-model="value"
      @change="onChange"
      @clear="onClear"
      style="width:100%"
    >
      <el-option
        v-for="item in areaOptions"
        :key="item.id"
        :value="item.id"
        :label="item.mainTitle"
        class="area-custom-option"
      >
        <p class="main">{{ item.mainTitle }}</p>
        <p class="sub">{{ item.areaCategoryStringArr | areaCategoryFilter }}</p>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getDataList } from "@/api/area";
import deepcopy from "deepcopy";
export default {
  name: "SelectArea",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      areaOptions: [],
      loading: false
    };
  },
  filters: {
    areaCategoryFilter(arr) {
      let copyArr = deepcopy(arr);
      console.log("areaCategoryFilter", arr);
      return copyArr.reverse().join(">");
    }
  },
  mounted() {},
  activated() {},
  destroyed() {},
  methods: {
    /**
     * 远程匹配小区
     */
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        let { data } = await getDataList({
          mainTitle: query,
          pageNum: 1,
          pageSize: 30
        });
        this.loading = false;
        this.areaOptions = data.list;
      } else {
        this.areaOptions = [];
      }
    },
    onChange(value) {
      this.$emit("change", value);
    },
    onClear() {
      this.areaOptions = [];
    }
  }
};
</script>
<style lang="scss">
.area-custom-option {
  padding-top: 8px;
  padding-bottom: 8px;
  height: initial;
  line-height: initial;
  p {
    margin: 0;
    padding: 0;
    &.sub {
      margin-top: 4px;
      opacity: 0.6;
    }
  }
}
</style>
