<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <!--<router-link
      :to="{ name: 'datasetDetail', params: { datasetId: datasetId } }"
    >-->
    <div class="dataset-status-badge-area dataset-card-img h-50 w-auto">
      <img
        class="rounded-t-sm"
        alt="product image"
        :src="thumbnailImageUrl"
        @error="imageError = true"
      />
      <DatasetStatusBadge
        :datasetOwnType="datasetOwnType"
        :datasetStatus="datasetStatus"
      />
    </div>
    <h4
      class="text-xl py-2 font-bold tracking-tight text-gray-700 dark:text-white p-5"
    >
      {{ title }}
    </h4>
    <div class="pt-1 px-5">タグ: {{ tags }}</div>
    <div class="pt-1 px-5">
      <div class="flex justify-between">
        <div class="text-gray-700 text-bold mb-2">
          金額
          <span class="text-lg font-bold">{{ price }}</span>
          円
        </div>
      </div>
    </div>
    <!--</router-link>-->
    <purchased-comment-list
      v-if="purchasedUsers"
      :purchasedUsers="purchasedUsers"
    >
    </purchased-comment-list>
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
      console.log(fileName);
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
</style>
