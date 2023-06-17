<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <!--<router-link
      :to="{ name: 'datasetDetail', params: { datasetId: datasetId } }"
    >-->
    <div class="dataset-status-badge-area dataset-card-img">
      <!--<img
          class="rounded-t-sm"
          alt="product image"
          :src="thumbnailImageUrl"
          @error="imageError = true"
        />-->
      <!--<DatasetStatusBadge
          :datasetOwnType="datasetOwnType"
          :datasetStatus="datasetStatus"
        />-->
    </div>
    <h4
      class="text-xl py-2 font-bold tracking-tight text-gray-700 dark:text-white p-5"
    >
      {{ title }}
    </h4>
    <div class="pt-1 px-5">
      <div class="flex justify-between">
        <!--<span class="text-rose-700 text-bold mb-2 text-lg">{{
          limitDateMessage
        }}</span>-->
        <div class="text-gray-700 text-bold mb-2">
          金額
          <span class="text-lg font-bold">{{ price }}</span>
          円
        </div>
      </div>
      <div class="prog-bar">
        <p class="bar" :style="{ width: prog - barSize }"></p>
      </div>
      <small>{{ progressBarFooterMessage }}</small>
    </div>
    <!--</router-link>-->
    <voters-comment-list v-if="showVoteResult" :voteList="voteMessageList">
    </voters-comment-list>
    <div
      v-if="!showVoteResult"
      class="not-show-vote-result mt-1 form-return-btn btn-font text-center text-gray-900"
    >
      {{ showVoteResultFalseMessage }}
    </div>
  </div>
</template>

<script>
import VotersCommentList from "../parts/VotersCommentList.vue";
//import moment from "moment";
//import DatasetStatusBadge from "@/components/parts/DatasetStatusBadge.vue";

export default {
  name: "datasetCards",
  components: {
    VotersCommentList,
    //DatasetStatusBadge,
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
    createdAt: String,
    updatedAt: String,
    tags: Array,
    purchasedUsers: Array,
  },
  computed: {
    //hasVotes() {
    //  // 投票されている場合true
    //  return this.voteList.length > 0;
    //},
    //isVoting() {
    //  // 提案が投票中の場合True
    //  return this.datasetStatus === "voting";
    //},
    //showVoteResult() {
    //  // 投票ステータスの表示可否を判断する
    //  const role =
    //    this.datasetOwnType === "voted" || this.datasetOwnType === "owner";

    //  // 投票が終了している、または、投票結果が１件以上ありかつ自身が投票済みか提案者の場合、表示
    //  return !this.isVoting || (role && this.hasVotes);
    //},
    //showVoteResultFalseMessage() {
    //  if (this.datasetOwnType === "owner" && !this.hasVotes) {
    //    return "まだ投票されていません！周りの人に共有して投票を募りましょう！";
    //  } else if (!this.showVoteResult) {
    //    return "投票後、他の人の投票内容を確認できます。";
    //  } else {
    //    return "";
    //  }
    //},
    progressBarFooterMessage() {
      if (this.isVoting) {
        return `資金調達の判断まであと ${this.requiredVotesCount}票 !`;
      } else {
        return "投票期間は終了しました";
      }
    },
    statusBadge() {
      // カードの右上のステータスバッジに掲載する内容
      let badge = "";
      if (this.isVoting) {
        if (this.datasetOwnType == "voted") {
          badge = "投票済み";
        } else if (this.datasetOwnType == "unvoted") {
          badge = "投票できます！";
        } else if (this.datasetOwnType == "owner") {
          badge = "あなたの提案が投票中です！";
        } else {
          badge = "投票受付中です！ログインして投票に参加しよう！";
        }
      } else {
        badge = "投票終了";
      }
      return badge;
    },
    thumbnailImageUrl() {
      let fileName = this.fileName.substr(0, this.fileName.indexOf("."));
      console.log(fileName);
      return this.imageError
        ? this.defaultImage
        : `${process.env.VUE_APP_API_ENDPOINT}dataset/${fileName}/thumbnail`;
    },
    procurementTokenAmount() {
      return this.fundraisingCondition
        ? this.fundraisingCondition.procurementTokenAmount
        : "None";
    },
    minVoterCount() {
      if (this.fundraisingCondition === null) {
        return 10;
      }
      return this.fundraisingCondition.minVoterCount;
    },
    //limitDate() {
    //  let limitDate = 7;
    //  if (this.fundraisingCondition !== null) {
    //    limitDate = this.fundraisingCondition.limitDate;
    //  }

    //  var startDate = moment.utc(this.createdAt);
    //  startDate.add(limitDate, "days");
    //  const duration = startDate.diff(moment(), "days");
    //  return duration > -1 ? duration : 0;
    //},
    //limitDateMessage() {
    //  if (this.limitDate === 0) {
    //    return this.datasetStatus === "accept" ? "可決" : "否認";
    //  } else {
    //    return `あと ${this.limitDate} 日`;
    //  }
    //},
    requiredVotesCount() {
      const remainingVotesCount = this.minVoterCount - this.voteList.length;
      return remainingVotesCount < 0 ? 0 : remainingVotesCount;
    },
    progBarSize() {
      const voteRate = this.voteList.length / this.minVoterCount;
      return (voteRate > 1 ? 1 : voteRate) * 100 + "%";
    },
    //voteMessageList() {
    //  var list = this.voteList;
    //  var rlist = list.reverse();
    //  return rlist.slice(0, 5);
    //},
  },
};
</script>

<style lang="scss" scoped>
.dataset-card-img {
  box-shadow: 0px 0px 5px 0px gray;
  margin-bottom: 1rem;
}
.prog-bar {
  height: 40px;
  background-color: #ececec;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}
.prog-bar .bar {
  position: absolute;
  height: 100%;
  background-color: #ffca28;
}
.dataset-status-badge-area {
  position: relative;
}
.not-show-vote-result {
  height: 90px;
  padding: 15px;
}

.dataset-status-badge-voting {
  background: #ffca28;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}

.dataset-status-badge-vote-end {
  background: #939087;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
</style>
