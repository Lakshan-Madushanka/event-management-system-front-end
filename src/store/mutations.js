import { initStates } from "./state";

export default {
  setAlert(state, payload) {
    state.alert = {
      ...initStates.alertInitialState,
      type: payload.type,
      message: payload.message,
    };
  },

  clearAlert(state) {
    Object.assign(state, { ...state, type: "", message: "" });
  },

  setAppLoadingState(state, isLoaded) {
    state.isLoading = isLoaded;
  },
};
