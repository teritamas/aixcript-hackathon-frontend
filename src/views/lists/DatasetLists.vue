<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style="max-width: 1200px; margin: 0 auto;">
    <div
      v-for="dataset in datasetLists"
      :key="dataset.index"
      class="p-3 item"
    >
      <DatasetCards
        :datasetId="dataset.datasetId"
        :title="dataset.title"
        :description="dataset.description"
        :filePath="dataset.filePath"
        :targetAmount="dataset.targetAmount"
        :isRecruitingTeammates="dataset.isRecruitingTeammates"
        :createdAt="dataset.createdAt"
        :tags="dataset.tags"
        :datasetOwnType="dataset.datasetOwnType"
        :datasetStatus="dataset.datasetStatus"
        :nftTokenId="dataset.nft_token_id"
        :fundraisingCondition="dataset.datasetFundraisingCondition"
        :voteList="dataset.votes"
      />
    </div>
  </div>
</template>

<script>
import DatasetCards from "../../components/DatasetCards.vue";

export default {
  name: "proposa-list",
  components: {
    DatasetCards,
  },
  data() {
    return {};
  },
  computed: {
    datasetLists() {
      return this.$store.getters["datasetStore/datasetLists"];
    },
  },
  created() {
    // メソッドを実行する
    this.getDatasetLists();
  },
  methods: {
    getDatasetLists() {
      this.$store.dispatch("datasetStore/getDatasetList").then(() => {});
    },
  },
};
</script>

<style>
.item {
  display: inline-block;
}
</style>
