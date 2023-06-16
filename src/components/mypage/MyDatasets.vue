<template>
  <div class="bg-glass">
    <h2 class="title-underline text-center text-white text-xl mt-2.5">提案履歴</h2>
    <div class="dataset-contents horizontal-list">
      <div 
        v-if="userDatasets.length === 0"
        class="text-white p-5 text-center">
        <p>
            提案の履歴がありません。<br>
            ぜひ提案をしてみてください！
        </p>
        <img class="w-full img-to-display-if-not" src="@/assets/img/noDatasetImage.png" alt="提案がないときの画像">
      </div>
      <div
        v-for="dataset in userDatasets"
        :key="dataset.index"
        class="p-3 item"
      >
        <DatasetCards
          :datasetId="dataset.datasetId"
          :title="dataset.title"
          :description="dataset.description"
          :targetAmount="dataset.targetAmount"
          :datasetStatus="dataset.datasetStatus"
          :fundraisingCondition="dataset.datasetFundraisingCondition"
          :createdAt="dataset.createdAt"
          :voteList="dataset.votes"
        />
      </div>
    </div>
  </div>
</template>


<script>
import DatasetCards from "@/components/mypage/MyDatasetHistoryCard.vue";

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
      if (!this.detail.datasets) {
        return 0;
      }
      return this.detail.datasets.length;
    },
    datasetVoteCount() {
      if (!this.detail.datasetVotes) {
        return 0;
      }
      return this.detail.datasetVotes.length;
    },
    userDatasets() {
      if (this.detail.datasets === undefined) return [];
      return this.detail.datasets;
    },
  },
  created() {
    // メソッドを実行する
    this.getUserDetail();
  },
  methods: {
    // storeのactionsをたたきにいく
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