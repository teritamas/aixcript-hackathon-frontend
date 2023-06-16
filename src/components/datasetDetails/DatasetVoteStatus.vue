<template>
  <div class="text-center">
    <h2 class="p-2">投票状況</h2>
    <h4 class="font-bold p-3">投票者の合計 / 最低投票数</h4>
    <h4 class="font-bold p-3">{{ votersCount }} / {{ minVoterCount }}</h4>
    <div class="font-bold mt-2">
      残り{{ remainingVoteCount }}人の投票が必要です
    </div>
    <PieChart
      :labels="chartLabels"
      :data="chartData"
      :backgroundColors="chartColors"
    />
  </div>
</template>

<script>
import PieChart from "../parts/PieChart.vue";
export default {
  name: "DatasetVoteStatus",
  components: {
    PieChart,
  },
  data() {
    return {};
  },
  props: {
    dataset: {},
    voteStatus: {},
  },
  computed: {
    chartLabels() {
      return ["賛成", "反対", "必要な投票数"];
    },
    chartData() {
      const positiveCount = this.voteStatus.positiveDatasetVotes.length;
      const negativeCount = this.voteStatus.negativeDatasetVotes.length;
      return [positiveCount, negativeCount, this.remainingVoteCount];
    },
    chartColors() {
      return ["rgb(47, 40, 94)", "#a9a9a9", "#ececec"];
    },
    minVoterCount() {
      if (this.dataset.datasetFundraisingCondition === undefined) {
        return 10;
      }
      return this.dataset.datasetFundraisingCondition.minVoterCount;
    },
    requiredVotesCount() {
      // 最低投票人数
      return this.minVoterCount; // TODO: 提案に紐づけた値から取得する
    },
    remainingVoteCount() {
      // 残り必要な投票数
      const remaining = this.requiredVotesCount - this.votersCount;
      return remaining > 0 ? remaining : 0;
    },
    votersCount() {
      // 全投票者数
      return (
        this.voteStatus.positiveDatasetVotes.length +
        this.voteStatus.negativeDatasetVotes.length
      );
    },
  },
};
</script>

