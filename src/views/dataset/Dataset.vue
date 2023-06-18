<template>
  <div class="content-center">
    <div class="card card-one glass mt-10">
      <div class="bg-dark-blue">
        <h2 class="text-center pt-5 pb-5 text-white">画像登録</h2>
      </div>
      <DatasetRegister
        @showLoading="showLoading"
        @hiddenLoading="hiddenLoading"
        @showSavedPop="showSavedPop"
      />
    </div>
    <PageTransitionRequiredLogin
      v-show="token == ''"
      :headerMessage="'画像を登録する場合はログインをしてください'"
    ></PageTransitionRequiredLogin>
  </div>
  <Loading v-show="loading" />
  <Saved @popClose="popClose" v-show="openSavedPop" />
</template>

<script>
import DatasetRegister from "../../components/dataset/DatasetRegister.vue";
import PageTransitionRequiredLogin from "../../components/parts/PageTransitionRequiredLogin.vue";
import Loading from "../../components/parts/Loading.vue";
import Saved from "../../components/dataset/Saved.vue";

export default {
  name: "dataset-form",
  components: {
    DatasetRegister,
    PageTransitionRequiredLogin,
    Saved,
    Loading,
  },
  data() {
    return {
      loading: false,
      openSavedPop: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters["userStore/token"];
    },
  },
  methods: {
    setNewDataset: function () {
      this.$store.commit("setNewDataset", this.newDataset);
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      this.newDataset.fileName = files[0].name;
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newDataset.filePath = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.newDataset.filePath = false;
    },
    showLoading() {
      this.loading = true;
    },
    hiddenLoading() {
      this.loading = false;
    },
    showSavedPop() {
      this.openSavedPop = true;
    },
    popClose() {
      this.openSavedPop = false;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.card {
  float: left;
  margin-top: 1rem;
  max-width: 900px;
}

.card-one {
  position: relative;
  overflow-y: scroll;
  overflow-x: none;
  height: 80vh;
  width: 90vw;
  background: white;
  box-shadow: 0 10px 7px -5px rgba(#000, 0.4);
}
</style>
