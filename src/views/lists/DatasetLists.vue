<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    style="max-width: 1200px; margin: 0 auto"
  >
    <div v-for="dataset in datasets" :key="dataset.index" class="p-3 item">
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
      />
    </div>
  </div>
</template>

<script>
import DatasetCards from "../../components/common/DatasetCards.vue";

export default {
  name: "proposa-list",
  components: {
    DatasetCards,
  },
  data() {
    return {};
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
  },
};
</script>

<style>
.item {
  display: inline-block;
}
</style>
