import store from "../store/index.js";

export const guest = (to, from, next) => {
  if (store.state.auth.isAuthenticated) {
    next({ name: "home" });
  }
  console.log("inside guard", store.state.auth.isAuthenticated);

  next();
};
