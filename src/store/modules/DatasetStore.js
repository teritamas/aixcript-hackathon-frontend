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
    datasets: {},
    validateResult: {
      bestGuessLabels: "",
      fullMathUrl: [],
      isRegisterable: false,
      partialMathUrls: [],
      similarUrls: [],
      tags: [],
    },
  },
  getters: {
    validateResult(state) {
      return state.validateResult;
    },
    registeredDatasetId(state) {
      return state.registeredDatasetId;
    },
    newDataset(state) {
      return state.newDataset;
    },
    file(state) {
      return state.datasetAttachmentFile;
    },
    datasets(state) {
      return state.datasets;
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
    setDatasets(state, datasets) {
      state.datasets = datasets.datasets;
    },
    setDatasetAttachmentFile(state, commit) {
      state.datasetAttachmentFile = commit;
    },
    setValidateResult(state, commit) {
      state.validateResult = commit;
    },
  },
  actions: {
    getDatasets(state) {
      const client = applyCaseMiddleware(axios.create());
      let termRequestUri = process.env.VUE_APP_API_ENDPOINT + "dataset";
      if (state.getters.token !== "") {
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
          state.commit("setDatasets", response.data);
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
    storeFile(state, commit) {
      state.commit("setDatasetAttachmentFile", commit);
    },
    validateDataset(state, commit) {
      const client = applyCaseMiddleware(axios.create());
      const termRequestUri = process.env.VUE_APP_API_ENDPOINT + "validate";
      const form = new FormData();
      form.append("file", commit.file);
      return client
        .post(termRequestUri, form, {
          headers: {
            Authorization: state.getters.token,
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        })
        .then((response) => {
          state.commit("setValidateResult", response.data);
        })
        .catch((err) => {
          (this.errored = true), (this.error = err);
        });
    },
    registerDataset(state, commit) {
      console.log(commit);
      const termRequestUri = process.env.VUE_APP_API_ENDPOINT + "dataset";
      const client = applyCaseMiddleware(axios.create());
      const form = new FormData();
      // jsonにしたためapplyCaseMiddlewareで変換されなかったのでべた書き
      const request = {
        description: commit.description,
        user_id: state.getters.token,
      };
      form.append("request", JSON.stringify(request));
      form.append("file", commit.file);
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
    purchaseDataset(state, commit) {
      console.log(commit);
      const client = applyCaseMiddleware(axios.create());
      const termRequestUri =
        process.env.VUE_APP_API_ENDPOINT +
        "dataset/" +
        commit.datasetId +
        "/purchased";
      return client
        .post(
          termRequestUri,
          {
            user_id: state.getters.token,
          },
          {
            headers: {
              Authorization: state.getters.token,
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          (this.errored = true), (this.error = err);
        });
    },
  },
};
