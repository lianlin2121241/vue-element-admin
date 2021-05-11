<template>
  <div class="select-container">
    <a-select
      v-model="value"
      mode="multiple"
      style="width: 100%"
      placeholder="请选择标签"
      option-label-prop="label"
    >
      <div slot="dropdownRender" slot-scope="menu">
        <a-tabs
          default-active-key="1"
          :tab-position="mode"
          :style="{ height: '200px' }"
          @prevClick="callback"
          @nextClick="callback"
        >
          <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">
            Content of tab {{ i }}
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-select>
  </div>
</template>

<script>
import { getDataTree } from "@/api/tag";
import deepcopy from "deepcopy";
export default {
  name: "SelectTab",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tagsData: [],
    };
  },
  filters: {
    areaCategoryFilter(arr) {
      let copyArr = deepcopy(arr);
      console.log("areaCategoryFilter", arr);
      return copyArr.reverse().join(">");
    },
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
        let { data } = await getDataTree();
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
    },
  },
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
