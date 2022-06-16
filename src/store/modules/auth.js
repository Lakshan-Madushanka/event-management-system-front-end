import {
  signUpRequest,
  signInRequest,
  signOutRequest,
  getAuthenticatedUserRequest,
} from "../../api/requests/auth";
import { hadnleValidationErrors } from "./../helpers";
import router from "../../router/index";

const initialState = {
  isAuthenticated: false,
  user: { name: "", email: "" },
  errors: {},
  isLoading: false,
};

export default {
  namespaced: true,
  state: { ...initialState },

  getters: {
    getAuth(state) {
      return state;
    },
  },
  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },
    setIsLoading(state, isLoaded) {
      state.isLoading = isLoaded;
    },

    setAuthUser(state, payload) {
      state = Object.assign(state, {
        ...state,
        isAuthenticated: true,
        user: { name: payload.name, email: payload.email },
      });
    },
  },

  actions: {
    async signUp({ commit }, payload) {
      commit("setIsLoading", true);
      try {
        const response1 = await signUpRequest(payload);

        if (response1.status === 201) {
          const response2 = await getAuthenticatedUserRequest();

          setAuthUser(commit, response2);
          redirectRoute(router);
        }
      } catch (err) {
        hadnleValidationErrors(err, commit);
      } finally {
        commit("setIsLoading", false);
      }
    },
    async signIn({ commit }, payload) {
      commit("setIsLoading", true);
      try {
        const response = await signInRequest(payload);
        if (response.status == 200) {
          const response2 = await getAuthenticatedUserRequest();

          setAuthUser(commit, response2);
          redirectRoute(router);
        }
      } catch (err) {
        hadnleValidationErrors(err, commit);
      } finally {
        commit("setIsLoading", false);
      }
    },
    async authUser({ commit }, payload) {
      commit("setIsLoading", true);
      commit("setAppLoadingState", true, { root: true });
      try {
        const response = await getAuthenticatedUserRequest(payload);
        if (response.status == 200) {
          setAuthUser(commit, response);
          redirectRoute(router);
        }
      } catch (err) {
        hadnleValidationErrors(err, commit);
      } finally {
        commit("setIsLoading", false);
        commit("setAppLoadingState", false, { root: true });
      }
    },
    async signOut({ commit }) {
      commit("setAppLoadingState", true, { root: true });

      await signOutRequest();
      window.location.reload();
    },
  },
};

const setAuthUser = (commit, response) => {
  if (response.status === 200) {
    commit("setAuthUser", response.data);
  }
};

const redirectRoute = (router) => {
  if (router.currentRoute.value.name) {
    router.replace({ name: "Home" });
  }
};
