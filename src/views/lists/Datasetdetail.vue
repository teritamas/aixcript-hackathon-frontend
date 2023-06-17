<template>
  <div class="content-center">
    <div class="card card-one">
      <div class="dataset-status-badge-area">
        <DatasetStatusBadge
          :datasetOwnType="dataset.datasetOwnType"
          :datasetStatus="dataset.datasetStatus"
        />
      </div>
      <div class="form mb-10">
        <DatasetInfo
          :dataset="dataset"
          :datasetAttachmentFile="datasetAttachmentFile"
        />
      </div>
      <!--DatasetVote コンポーネントに分けたい-->
      <!-- 投票コンポーネント：自分が提案者じゃないかつ提案していないかつ投票受付中-->
      <div class="form mb-10 bg-light-gray" v-if="showVoteArea">
        <div class="form-item">
          <p class="form-item-label mb-2">
            <span class="form-item-label-required">必須</span>賛否
          </p>
          <div class="radio-button-group mts w-full" style="margin-left: 0px">
            <div class="item">
              <div class="item">
                <input
                  type="radio"
                  v-model="judgement"
                  class="radio-button"
                  value="true"
                  id="button1"
                />
                <label for="button1">賛成</label>
              </div>
              <input
                type="radio"
                v-model="judgement"
                class="radio-button"
                value="false"
                id="button2"
              />
              <label for="button2">反対</label>
            </div>
          </div>
        </div>
        <div class="form-item">
          <p class="form-item-label is-msg">
            <span class="form-item-label-option">任意</span>賛否の理由
          </p>
          <textarea
            v-model="judgementReason"
            class="form-item-textarea"
            @input="onDelayAction"
          ></textarea>
        </div>
        <div class="form-item">
          <p class="form-item-label is-msg">獲得できるトークン量 (1~10)</p>
          <span class="form-item-label-option">{{ rewordToken }}</span>
          {{ judgementReasonScore }}
        </div>

        <!--≪TODO≫すぐvoteじゃなくて、確認画面＋ログイン確認してから投票-->
        <button
          class="form-btn"
          @click="vote()"
          :disabled="v$.$invalid"
          :class="v$.$invalid ? 'form-btn-disabled' : ''"
        >
          投票する
        </button>
      </div>
      <!--DatasetVote コンポーネントに分けたい-->

      <!--pytestの実行サンプルがaccept-->
      <div class="bg-light-gray p-5" v-if="!showVoteArea">
        <DatasetVoteStatus :dataset="dataset" :voteStatus="voteStatus" />
        <div class="form mb-10">
          <h2>投票者のコメント</h2>
          <voters-comment-list :voteList="voteList"></voters-comment-list>
        </div>
      </div>
      <div class="">
        <button class="form-return-btn mb-10" @click="returnDatasetLists()">
          戻る
        </button>
      </div>
    </div>
  </div>
  <Loading v-show="loading" :loadingText="loadingText" />
  <PageTransition
    v-show="PageTransition"
    :datasetId="datasetId"
    :reward="reward"
    :balance="balance"
  />
  <Congratulation
    :reward="proposerReword"
    :balance="proposerBalance"
    @popClose="popClose"
    v-show="showCongratulation"
  />
</template>

<script>
import DatasetInfo from "../../components/datasetDetails/DatasetInfo.vue";
import VotersCommentList from "../../components/parts/VotersCommentList.vue";
import DatasetVoteStatus from "../../components/datasetDetails/DatasetVoteStatus.vue";
import { debounce } from "lodash";
import Loading from "../../components/parts/Loading.vue";
import PageTransition from "../../components/parts/PageTransitionVote.vue";
import Congratulation from "../../components/parts/Congratulation.vue";
import { useVuelidate } from "@vuelidate/core";
import DatasetStatusBadge from "@@/components/parts/DatasetStatusBadge.vue

const validJudgement = (value) => (value === "" ? false : true);

export default {
  name: "DatasetDetail",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    DatasetInfo,
    DatasetVoteStatus,
    Loading,
    VotersCommentList,
    PageTransition,
    Congratulation,
    DatasetStatusBadge,
  },
  data() {
    return {
      judgement: "",
      judgementReason: "",
      loading: false,
      PageTransition: false,
      openCongratulationPop: true,
      loadingText: [
        {
          checkTarget: "voted-check",
          label: "投票完了",
        },
        {
          checkTarget: "token-check",
          label: "トークン作成完了",
        },
      ],
    };
  },
  validations() {
    return {
      judgement: {
        validJudgement,
      },
    };
  },
  computed: {
    showCongratulation() {
      return this.openCongratulationPop && this.congratulation;
    },
    congratulation() {
      return (
        this.dataset.datasetStatus == "accept" && this.voteDetail.isProposer
      );
    },
    showCongratulationArea() {
      // 投票エリアを表示する条件
      return (
        this.dataset.datasetStatus == "voting" &&
        !this.voteDetail.isProposer &&
        !this.voteDetail.voted
      );
    },
    showVoteArea() {
      // 投票エリアを表示する条件
      return (
        this.dataset.datasetStatus == "voting" &&
        !this.voteDetail.isProposer &&
        !this.voteDetail.voted
      );
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
    datasetId() {
      return this.$route.params["datasetId"];
    },
    dataset() {
      return this.$store.getters["datasetStore/dataset"];
    },
    detail() {
      return this.$store.getters["userStore/detail"];
    },
    datasetAttachmentFile() {
      return this.$store.getters["datasetStore/file"];
    },
    voteDetail() {
      // 提案詳細
      return this.$store.getters["datasetVoteStore/getVoteDetail"];
    },
    voteStatus() {
      // vote_action：投票を受け付けているか
      // positive_dataset_votes：肯定派意見
      // negative_dataset_votes：反対派意見
      return this.$store.getters["datasetVoteStore/getVoteStatus"];
    },
    voteList() {
      return this.dataset.votes;
    },
    reward() {
      // 投票後に獲得する報酬
      return this.$store.getters["datasetVoteStore/getReward"];
    },
    balance() {
      // 投票後の残高
      return this.$store.getters["datasetVoteStore/getBalance"];
    },
    proposerBalance(){
      return this.$store.getters["userStore/detail"].totalTokenAmount
    },
    proposerReword(){
      if (this.dataset.datasetFundraisingCondition === undefined){
        return 0
      }
      return this.dataset.datasetFundraisingCondition.procurementTokenAmount
    },
    rewordToken(){
      return this.verifyResult.expectedRewordTokenAmount ? this.verifyResult.expectedRewordTokenAmount : 0
    },
    sentenceKeywords(){
      return this.verifyResult.sentenceKeywords
    },
    verifyResult(){
      return this.$store.getters["datasetVoteStore/getJudgementReason"]
    },
    score(){
      return this.verifyResult.highLevelAnalytics ? this.verifyResult.objectiveScore : this.verifyResult.ruleScore
    },
    judgementReasonScore() {
      const score = this.score;
      if (score == 1) {
        return `内容が充実しており良いメッセージです！`;
      } else if (score >= 0.6) {
        return `もうひといき！提案者のためにもう少し詳細に書きましょう！`;
      } else if (score >= 0.1) {
        return `内容に具体性がなく、獲得できるトークンが少ないです。`;
      }
      return "";
    },
  },
  mounted() {
    this.openCongratulationPop = true;
  },
  created() {
    // メソッドを実行する
    this.getDataset();
    this.getVoteDetail();
    this.getVoteStatus();
    this.getFile();
    this.clearJudgementReason();
  },
  methods: {
    onDelayAction: debounce(function () {
      this.voteJudgementEnrichment();
    }, 1500),
    clearJudgementReason(){
      this.$store.commit("datasetVoteStore/clearJudgementReason");
    },
    getDataset() {
      const datasetId = this.datasetId;
      return this.$store
        .dispatch("datasetStore/getDataset", datasetId)
        .then(() => {});
    },
    getVoteDetail() {
      const datasetId = this.datasetId;
      return this.$store
        .dispatch("datasetVoteStore/getVoteDetail", datasetId)
        .then(() => {});
    },
    getVoteStatus() {
      const datasetId = this.datasetId;
      return this.$store
        .dispatch("datasetVoteStore/getVoteStatus", datasetId)
        .then(() => {});
    },
    returnDatasetLists: function () {
      this.$router.push("/lists");
    },
    vote() {
      this.setLoading(true);
      setTimeout(() => {
        this.inCheck("voted-check");
      }, 2000);
      const vote = {
        judgement: this.judgement,
        judgementReason: this.judgementReason,
      };
      const datasetId = this.$route.params["datasetId"];
      this.$store
        .dispatch("datasetVoteStore/vote", { datasetId, vote })
        .then(() => {
          this.inCheck("token-check");
          setTimeout(() => {
            this.setLoading(false);
            this.outCheck("voted-check");
            this.outCheck("token-check");
            this.PageTransition = true;
          }, 5000);
        });
    },
    voteJudgementEnrichment() {
      this.$store.commit(
        "datasetVoteStore/setVoteJudgementEnrichmentRequest",
        { judgementReason: this.judgementReason }
      );
      this.$store
        .dispatch("datasetVoteStore/verifyVoteEnrichment")
        .then(() => {});
    },
    getFile() {
      const datasetId = this.datasetId;
      return this.$store
        .dispatch("datasetStore/getDatasetFile", datasetId)
        .then(() => {});
    },
    setLoading(bool) {
      this.loading = bool;
    },
    loadCheck(checkTarget, time) {
      setTimeout(() => {
        this.inCheck(checkTarget);
      }, time);
    },
    inCheck(checkTarget) {
      let checkbox = document.getElementById(checkTarget);
      checkbox.checked = true;
    },
    outCheck(checkTarget) {
      let checkbox = document.getElementById(checkTarget);
      checkbox.checked = false;
    },
    popClose() {
      this.openCongratulationPop = false;
    },
  },
};
</script>

<style scoped>
.card {
  float: left;
  margin-top: 1rem;
  max-width: 900px;
}

.card-one {
  position: relative;
  overflow-y: scroll;
  overflow-x: none;
  height: 80vh;
  width: 90vw;
  background: white;
  box-shadow: 0 10px 7px -5px rgba(#000, 0.4);
}

.preview-item {
  width: 100%;
}
.preview-item-file {
  width: 100%;
  min-height: 300px;
}

.form {
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
}
.form-item {
  padding-bottom: 24px;
  width: 100%;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 480px) {
  .form-item {
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    flex-wrap: wrap;
  }
}
.form-item-label {
  width: 100%;
  max-width: 248px;
  letter-spacing: 0.05em;
  font-weight: bold;
  font-size: 18px;
}
@media screen and (max-width: 480px) {
  .form-item-label {
    max-width: inherit;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
}
.form-item-label.is-msg {
  margin-top: 8px;
  margin-bottom: auto;
}
@media screen and (max-width: 480px) {
  .form-item-label.is-msg {
    margin-top: 0;
  }
}

.form-item-label-required {
  border-radius: 6px;
  margin-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 48px;
  display: inline-block;
  text-align: center;
  background: rgb(47, 40, 94);
  color: #fff;
  font-size: 14px;
}

.form-item-label-option {
  border-radius: 6px;
  margin-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 48px;
  display: inline-block;
  text-align: center;
  background: #545454;
  color: #fff;
  font-size: 14px;
}

.form-item-list {
  border-radius: 6px;
  margin-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 4px;
  display: inline-block;
  text-align: center;
  background: rgb(47, 40, 94);
  color: #fff;
  font-size: 14px;
}
@media screen and (max-width: 480px) {
  .form-item-label-required {
    border-radius: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
    width: 32px;
    font-size: 10px;
  }

  .form-item-label-option {
    border-radius: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
    width: 32px;
    font-size: 10px;
  }
}

.form-return-btn {
  border-radius: 6px;
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 280px;
  display: block;
  letter-spacing: 0.05em;
  background: #555;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
</style>
