import { getDictByType } from "@/api/dict";
import { dictTypes } from "@/settings";

const state = {};

dictTypes.forEach(item => {
  state[item] = [];
});

const mutations = {
  SET_DICT: (state, { type, value }) => {
    state[type] = value;
  }
};

const actions = {
  async getDict({ commit }, dicCodes) {
    if (typeof decCodes === "string") {
      dicCodes = [dicCodes];
    }
    //找出state中没有的字典
    let loadDics = dicCodes.reduce((accumulator, currentValue) => {
      if (state[currentValue].length === 0) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    if (loadDics.length === 0) {
      return;
    }
    const { data } = await getDictByType(loadDics.join(","));
    for (const key in data) {
      commit("SET_DICT", {
        type: key,
        value: data[key].dictDetailList
      });
    }
  }
};

export default {
  state,
  mutations,
  actions
};
