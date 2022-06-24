import { createStore } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import auth from "./modules/auth";
import calender from "./modules/calendar";

export default createStore({
  state,
  mutations,
  getters,
  actions: {},
  modules: {
    auth,
    calender,
  },
});
