import { mapGetters } from "vuex";
import { dictTypes } from "@/settings";

export default {
  computed: {
    ...mapGetters(dictTypes)
  },
  methods: {
    /**
     * 获取字典值
     */
    $getDict(type) {
      return this.$store.state.dict[type]
    },
  }
};