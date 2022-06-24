export const initStates = {
  alertInitialState: {
    type: "",
    message: "",
  },
  appInitialState: {
    isLoading: false,
  },
};

export default {
  alert: initStates.alertInitialState,
  ...initStates.appInitialState,
};
