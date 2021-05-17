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
        {{ console(menu) }}
        <a-tabs
          :tab-position="mode"
          :style="{ height: '200px' }"
          @prevClick="callback"
          @nextClick="callback"
          @mousedown="e => e.preventDefault()"
        >
          <a-tab-pane
            v-for="item in selectOption"
            :key="item.tagId"
            :tab="item.name"
          >
            <a-space>
              <span v-for="itemOption in item.children" :key="itemOption.tagId">
                {{ itemOption.name }}
              </span>
            </a-space>
          </a-tab-pane>
        </a-tabs>
      </div>
      <a-select-opt-group v-for="item in selectOption" :key="item.tagId">
        <span slot="label">
          {{ item.name }}
        </span>
        <a-select-option
          v-for="itemOption in item.children"
          :key="itemOption.tagId"
        >
          {{ itemOption.name }}
        </a-select-option>
      </a-select-opt-group>
    </a-select>
  </div>
</template>

<script>
import { getDataTree } from "@/api/tag";
export default {
  name: "SelectTab",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      selectOption: []
    };
  },
  filters: {},
  async created() {
    let res = await getDataTree();
    this.selectOption = res.tagList;
  },
  mounted() {},
  activated() {},
  destroyed() {},
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    onClear() {
      this.areaOptions = [];
    },
    callback(val) {
      console.log(val);
    },
    console(info) {
      console.log("info", info);
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
