import { fetchHolidaysRequest } from "../../api/requests/calender";

const initialState = {
  isLoading: false,
  holidays: null,
};
export default {
  namespaced: true,
  state: { ...initialState },
  getters: {
    getHolidays(state) {
      return state.holidays;
    },
  },
  mutations: {
    setLoader(state, isLoading) {
      state.isLoading = isLoading;
    },
    setHolidays(state, payload) {
      state.holidays = payload;
    },
  },
  actions: {
    async fetchHolidays({ commit }) {
      commit("setLoader", true);
      try {
        const response = await fetchHolidaysRequest();
        commit("setHolidays", response.data.data);
      } finally {
        commit("setLoader", false);
      }
    },
  },
};
