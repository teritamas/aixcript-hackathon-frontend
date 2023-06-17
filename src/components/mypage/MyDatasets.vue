<template>
  <div class="bg-glass">
    <h2 class="title-underline text-center text-white text-xl mt-2.5">
      販売履歴
    </h2>
    <div class="dataset-contents horizontal-list">
      <div
        v-if="userSellDatasets.length === 0"
        class="text-white p-5 text-center"
      >
        <p>
          データセットを販売した履歴がありません<br />
          ぜひデータセットを販売してみましょう！
        </p>
        <img
          class="w-full img-to-display-if-not"
          src="@/assets/img/noDatasetImage.png"
          alt="提案がないときの画像"
        />
      </div>
      <div
        v-for="dataset in userSellDatasets"
        :key="dataset.index"
        class="p-3 item"
      >
        <DatasetCards
          :datasetId="dataset.datasetId"
          :title="dataset.title"
          :description="dataset.description"
          :fileName="dataset.fileName"
          :price="dataset.price"
          :datasetOwnType="dataset.datasetOwnType"
          :tags="dataset.tags"
          :createdAt="dataset.createdAt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatasetCards from "@/components/common/DatasetCards.vue";

export default {
  name: "MyDataset",
  components: {
    DatasetCards,
  },
  data() {
    return {};
  },
  props: {
    token: String,
  },
  computed: {
    detail() {
      return this.$store.getters["userStore/detail"];
    },
    datasetCount() {
      if (!this.detail.sellDatasets) {
        return 0;
      }
      return this.detail.sellDatasets.length;
    },
    userSellDatasets() {
      if (this.datasetCount === 0) return [];
      return this.detail.sellDatasets;
    },
  },
  created() {
    this.getUserDetail();
  },
  methods: {
    getUserDetail() {
      this.$store.dispatch("userStore/getDetail", this.token).then(() => {});
    },
  },
};
</script>

<style>
.dataset-contents {
  overflow-y: scroll;
}

@media only screen and (max-width: 100%) {
  .dataset-contents {
    max-width: 100%;
  }
}
</style>
