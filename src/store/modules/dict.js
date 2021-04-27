import { getDictByTypes } from "@/api/dict";
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
  async getAllDict({ commit }) {
    const { data } = await getDictByTypes(dictTypes);
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        commit('SET_DICT',{
          type:key,
          value:data[key]
        })
      }
    }
  }
};

export default {
  state,
  mutations,
  actions
};
