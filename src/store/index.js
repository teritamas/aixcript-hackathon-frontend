import { createStore } from "vuex";
import DatasetStore from "./modules/DatasetStore";
import UserStore from "./modules/UserStore";
import DisplayStore from "./modules/DisplayStore";
import createPersistedState from "vuex-persistedstate";
import DatasetVoteStore from "./modules/DatasetVoteStore";

export default createStore({
  plugins: [
    createPersistedState({
      key: "inno",
      paths: ["permission.token"],
      storage: window.sessionStorage,
    }),
  ],
  state: {
    showContentsType: "dataset",
    showContentsGiftType: "study",
    permission: {
      token: "",
    },
  },
  getters: {
    token(state) {
      return state.permission.token;
    },
  },
  mutations: {
    setShowContentsType(state, showContentsType) {
      state.showContentsType = showContentsType;
    },
    setShowContentsGiftType(state, showContentsGiftType) {
      state.showContentsGiftType = showContentsGiftType;
    },
    setToken(state, token) {
      state.permission.token = token;
    },
  },
  actions: {},
  modules: {
    datasetStore: DatasetStore,
    userStore: UserStore,
    displayStore: DisplayStore,
    datasetVoteStore: DatasetVoteStore,
  },
});
