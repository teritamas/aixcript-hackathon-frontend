<template>
  <div
    class="w-full max-w-sm glass bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="dataset-status-badge-area dataset-card-img h-50 w-auto">
      <img
        class="rounded-t-lg"
        alt="product image"
        :src="thumbnailImageUrl"
        @error="imageError = true"
      />
      <DatasetStatusBadge
        v-if="datasetOwnType"
        :datasetOwnType="datasetOwnType"
      />
    </div>
    <h4
      class="text-xl py-2 font-bold tracking-tight text-gray-700 dark:text-white p-5"
    >
      {{ title }}
    </h4>
    <div class="pt-1 px-5">
      <span
        v-for="tag in tags"
        :key="tag"
        class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
        >{{ tag }}</span
      >
    </div>
    <div class="pt-1 px-5">
      <div class="flex justify-between">
        <div class="text-gray-700 text-bold mb-1">
          金額
          <span class="text-lg font-bold">{{ price }}</span>
          pts
        </div>
      </div>
    </div>
    <div class="px-5 mb-3">
      <PurchasedCommentList
        v-if="purchasedUsers"
        :purchasedUsers="purchasedUsers"
      >
      </PurchasedCommentList>
    </div>
  </div>
</template>

<script>
import PurchasedCommentList from "../parts/PurchasedCommentList.vue";
import DatasetStatusBadge from "@/components/parts/DatasetStatusBadge.vue";

export default {
  name: "datasetCards",
  components: {
    PurchasedCommentList,
    DatasetStatusBadge,
  },
  data() {
    return {
      imageError: false,
      defaultImage: require("@/assets/img/datasetList/no_images.webp"),
    };
  },
  props: {
    datasetId: String,
    title: String,
    description: String,
    fileName: String,
    price: Number,
    datasetOwnType: String,
    tags: Array,
    purchasedUsers: Array,
  },
  computed: {
    thumbnailImageUrl() {
      let fileName = this.fileName.substr(0, this.fileName.indexOf("."));
      return this.imageError
        ? this.defaultImage
        : `${process.env.VUE_APP_API_ENDPOINT}dataset/${fileName}/thumbnail`;
    },
  },
};
</script>

<style lang="scss" scoped>
.dataset-card-img {
  box-shadow: 0px 0px 5px 0px gray;
  margin-bottom: 1rem;
}
.dataset-status-badge-area {
  position: relative;
}

.glass {
  background: white;
}
</style>
