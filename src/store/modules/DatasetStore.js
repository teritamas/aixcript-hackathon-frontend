import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    newDataset: {},
    registeredDatasetId: "",
    datasetAttachmentFile: {
      filePath: "",
      fileName: "",
    },
    datasetLists: "",
    dataset: {},
  },
  getters: {
    registeredDatasetId(state) {
      return state.registeredDatasetId;
    },
    newDataset(state) {
      return state.newDataset;
    },
    dataset(state) {
      return state.dataset;
    },
    file(state) {
      return state.datasetAttachmentFile;
    },
    datasetLists(state) {
      return state.datasetLists;
    },
    token(state, getters, rootState, rootGetters) {
      return rootGetters["token"];
    },
  },
  mutations: {
    initialize(state) {
      state.newDataset = {};
    },
    setRegisteredDatasetId(state, registeredDatasetId) {
      state.registeredDatasetId = registeredDatasetId;
    },
    setNewDataset(state, newDataset) {
      state.newDataset = newDataset;
    },
    setDataset(state, dataset) {
      state.dataset = dataset.dataset;
    },
    setDatasetLists(state, datasetLists) {
      state.datasetLists = datasetLists.datasets;
    },
    setDatasetAttachmentFile(state, commit) {
      state.datasetAttachmentFile = commit;
    },
  },
  actions: {
    getDatasetList(state) {
      const client = applyCaseMiddleware(axios.create());
      let termRequestUri = process.env.VUE_APP_API_ENDPOINT + "dataset";
      if( state.getters.token !== ""){
        termRequestUri += `?user_id=${state.getters.token}`;
      }
      return client
        .get(termRequestUri, {
          withCredentials: false,
          headers: {
            Authorization: state.getters.token,
          },
        })
        .then((response) => {
          state.commit("setDatasetLists", response.data);
        })
        .catch((err) => {
          (this.errored = true), (this.error = err);
        });
    },
    getDataset(state, commit) {
      const client = applyCaseMiddleware(axios.create());
      const termRequestUri =
        process.env.VUE_APP_API_ENDPOINT + "dataset/" + commit;
      return client
        .get(termRequestUri, {
          withCredentials: false,
          headers: {
            Authorization: state.getters.token,
          },
        })
        .then((response) => {
          state.commit("setDataset", response.data);
        })
        .catch((err) => {
          (this.errored = true), (this.error = err);
        });
    },
    getDatasetFile(state, commit) {
      const client = applyCaseMiddleware(axios.create());
      const termRequestUri =
        process.env.VUE_APP_API_ENDPOINT + "dataset/" + commit + "/attachment";
      return client
        .get(termRequestUri, {
          withCredentials: false,
          headers: {
            Authorization: state.getters.token,
          },
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = (window.URL || window.webkitURL).createObjectURL(blob);
          state.commit("setDatasetAttachmentFile", {
            filePath: url,
            fileName: "提案ファイル",
          });
        })
        .catch((err) => {
          (this.errored = true), (this.error = err);
        });
    },
    storeNewDataset(state, commit) {
      state.commit("setNewDataset", commit.newDataset);
    },
    storeFile(state, commit) {
      state.commit("setDatasetAttachmentFile", commit);
    },
    registerDataset(state, commit) {
      const termRequestUri = process.env.VUE_APP_API_ENDPOINT + "dataset";
      const client = applyCaseMiddleware(axios.create());
      const form = new FormData();
      const newDataset = commit.newDataset;
      // jsonにしたためapplyCaseMiddlewareで変換されなかったのでべた書き
      const request = {
        title: newDataset.title,
        description: newDataset.description,
        dataset_phase: newDataset.datasetPhase,
        is_recruiting_teammates: newDataset.isRecruitingTeammates,
        other_contents: newDataset.otherContents,
        tags: [],
        user_id: newDataset.userId,
        slack_notification_channels: ["string"],
      };
      form.append("request", JSON.stringify(request));
      form.append("file", commit.file);
      state.commit("setRegisteredDatasetId", "");
      return client
        .post(termRequestUri, form, {
          headers: {
            Authorization: state.getters.token,
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        })
        .then((response) => {
          state.commit("setRegisteredDatasetId", response.data.datasetId);
        })
        .catch((err) => {
          (this.errored = true), (this.error = err);
        });
    },
  },
};
