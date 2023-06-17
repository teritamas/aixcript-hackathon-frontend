<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    style="max-width: 1200px; margin: 0 auto"
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
    />
    <Loading v-show="loading" />
    <Purchased @popClose="popClose" v-show="showPurchased" />
  </div>
</template>

<script>
import DatasetCards from "../../components/common/DatasetCards.vue";
import DatasetDetailModal from "../../components/common/DatasetDetailModal.vue";
import Loading from "../../components/parts/Loading.vue";
import Purchased from "../../components/parts/Purchased.vue";

export default {
  name: "proposa-list",
  components: {
    DatasetCards,
    DatasetDetailModal,
    Loading,
    Purchased,
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
    showPurchased() {
      return this.openPurchasedPop && this.isPurchasedOrOwn;
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
      console.log(dataset);
      this.isOpenDetailModal = !this.isOpenDetailModal;
      this.targetModal = dataset;
    },
  },
};
</script>

<style>
.item {
  display: inline-block;
}
</style>
