<template>
  <div class="bg-glass">
    <h2 class="title-underline text-center text-white text-xl mt-2.5">
      購入履歴
    </h2>
    <div class="dataset-contents horizontal-list">
      <div
        v-if="userPurchaseDatasets.length === 0"
        class="text-white p-5 text-center"
      >
        <p>
          データセットを購入した履歴がありません<br />
          早速データセットを購入してみましょう！
        </p>
        <img
          class="w-full img-to-display-if-not"
          src="@/assets/img/noDatasetImage.png"
          alt="購入がないときの画像"
        />
      </div>
      <div
        v-for="dataset in userPurchaseDatasets"
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
  name: "MyPuchsedDatasets",
  components: {
    DatasetCards,
  },
  props: {
    detail: Object,
  },
  computed: {
    datasetCount() {
      if (!this.detail.purchaseDatasets) {
        return 0;
      }
      return this.detail.purchaseDatasets.length;
    },
    userPurchaseDatasets() {
      if (this.datasetCount === 0) return [];
      return this.detail.purchaseDatasets;
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
