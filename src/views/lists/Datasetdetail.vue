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
import DatasetVoteStatus from "../../components/datasetDetails/DatasetVoteStatus.vue";
import { debounce } from "lodash";
import Loading from "../../components/parts/Loading.vue";
import PageTransition from "../../components/parts/PageTransitionVote.vue";
import Congratulation from "../../components/parts/Congratulation.vue";
import { useVuelidate } from "@vuelidate/core";
import DatasetStatusBadge from "@/components/parts/DatasetStatusBadge.vue";

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
    clearJudgementReason() {
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
