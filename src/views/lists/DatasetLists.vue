<template>
  <div class="w-9/12 m-auto text-center">
    <SearchBar />
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto"
    style="max-width: 1200px"
  >
    <div
      v-for="dataset in datasets"
      :key="dataset.index"
      class="p-3 item m-auto"
    >
      <DatasetCards
        :datasetId="dataset.datasetId"
        :description="dataset.description"
        :fileName="dataset.fileName"
        :price="dataset.price"
        :tags="dataset.tags"
        :purchasedUsers="dataset.purchasedUsers"
        :datasetOwnType="dataset.datasetOwnType"
        :createdAt="dataset.createdAt"
        :updatedAt="dataset.updatedAt"
        :title="dataset.title"
        @click="modalOn(dataset)"
      />
    </div>
    <DatasetDetailModal
      v-if="isOpenDetailModal"
      :dataset="targetModal"
      @modalOn="modalOn"
      @getDatasets="getDatasets"
      @showLoading="showLoading"
      @hiddenLoading="hiddenLoading"
      @showPurchasedPop="showPurchasedPop"
    />
    <Loading v-show="loading" />
    <Purchased @popClose="popClose" v-show="openPurchasedPop" />
  </div>
</template>

<script>
import DatasetCards from "../../components/common/DatasetCards.vue";
import DatasetDetailModal from "../../components/common/DatasetDetailModal.vue";
import Loading from "../../components/parts/Loading.vue";
import Purchased from "../../components/parts/Purchased.vue";
import SearchBar from "@/components/lists/SearchBar.vue";

export default {
  name: "proposa-list",
  components: {
    DatasetCards,
    DatasetDetailModal,
    Loading,
    Purchased,
    SearchBar,
  },
  data() {
    return {
      isOpenDetailModal: false,
      targetModal: {},
      loading: false,
      openPurchasedPop: false,
    };
  },
  computed: {
    datasets() {
      return this.$store.getters["datasetStore/datasets"];
    },
    isPurchasedOrOwn() {
      // 購入済みまたは所有者の場合True
      return (
        this.datasetOwnType === "un_purchased" || this.datasetOwnType == "owner"
      );
    },
  },
  created() {
    // メソッドを実行する
    this.getDatasets();
  },
  methods: {
    getDatasets() {
      this.$store.dispatch("datasetStore/getDatasets").then(() => {});
    },
    modalOn(dataset) {
      this.isOpenDetailModal = !this.isOpenDetailModal;
      this.targetModal = dataset;
    },
    showLoading() {
      this.loading = true;
    },
    hiddenLoading() {
      this.loading = false;
    },
    showPurchasedPop() {
      this.openPurchasedPop = true;
    },
    popClose() {
      this.openPurchasedPop = false;
      this.loading = false;
      this.isOpenDetailModal = false;
      this.getDatasets();
    },
  },
};
</script>

<style>
.item {
  display: inline-block;
}
</style>
