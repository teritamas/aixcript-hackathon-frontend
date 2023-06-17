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
  </div>
</template>

<script>
import DatasetCards from "../../components/common/DatasetCards.vue";
import DatasetDetailModal from "../../components/common/DatasetDetailModal.vue";

export default {
  name: "proposa-list",
  components: {
    DatasetCards,
    DatasetDetailModal,
  },
  data() {
    return {
      isOpenDetailModal: false,
      targetModal: {},
    };
  },
  computed: {
    datasets() {
      return this.$store.getters["datasetStore/datasets"];
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
