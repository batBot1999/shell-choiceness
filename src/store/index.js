import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const actions = {
  CHANGE_ISAUDITING(context, value) {
    // console.log("actions中的change",context,value);
    context.commit("CHANGE_ISAUDITING", value);
  }
}

const mutations = {
  CHANGE_ISAUDITING(state,value) {
    console.log("mutations中的change",state,value);
    state.isAuditing = value;
  }
}

const state = {
  // 企业认证处于什么状态
  isAuditing: 1,
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
})