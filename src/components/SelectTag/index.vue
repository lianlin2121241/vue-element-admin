<template>
  <div class="select-container">
    <a-select
      v-model="value"
      mode="multiple"
      style="width: 100%"
      placeholder="请选择标签"
      @change="onChange"
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
            <ul class="tag-container">
              <li
                v-for="itemOption in item.children"
                :key="itemOption.tagId"
                class="tag-item"
                :class="{ active: value.includes(itemOption.tagId) }"
                @click="clickOption(itemOption)"
              >
                <span>
                  {{ itemOption.name }}
                </span>
              </li>
            </ul>
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
          :value="itemOption.tagId"
        >
          {{ itemOption.name }}
        </a-select-option>
      </a-select-opt-group>
    </a-select>
  </div>
</template>

<script>
import { getDataTree } from "@/api/tag";
import deepcopy from "deepcopy";
export default {
  name: "SelectTag",
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
  computed: {
    convertSelectOption() {
      return this.selectOption.reduce(function(res, item) {
        return [...res, ...item.children];
      }, []);
    }
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
    onChange(item) {},
    onClear() {
      this.areaOptions = [];
    },
    callback(val) {
      console.log(val);
    },
    console(info) {
      console.log("info", info);
    },
    clickOption(item) {
      let index = this.value.indexOf(item.tagId);
      if (index > -1) {
        let copeArr = deepcopy(this.value);
        copeArr.splice(index, 1);
        this.$emit("change", copeArr);
        return;
      }
      if (this.value.length >= 3) {
        this.$message.warning("选择标签不能超过三个！");
        return;
      }
      this.$emit("change", [...this.value, item.tagId]);
    }
  }
};
</script>
<style lang="scss">
.active {
  color: #1890ff;
}
.tag-container {
  padding: 0px 20px;
  margin-bottom: 0px;
  .tag-item {
    list-style: none;
    display: inline-block;
    margin: 0px 10px 4px;
  }
}
</style>
