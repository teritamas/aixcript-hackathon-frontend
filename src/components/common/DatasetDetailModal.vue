<template>
  <div class="full-view pt-5">
    <div v-if="dataset" class="content-center pt-5">
      <div class="card card-one glass">
        <div class="dataset-status-badge-area">
          <!--<DatasetStatusBadge
          :datasetOwnType="dataset.datasetOwnType"
          :datasetStatus="dataset.datasetStatus"
        />-->
        </div>
        <div class="form mb-10">
          <DatasetInfo
            :dataset="dataset"
            :datasetAttachmentFile="datasetAttachmentFile"
          />
        </div>

        <!--pytestの実行サンプルがaccept-->
        <div class="bg-light-gray p-3" v-if="!showVoteArea">
          <!--<DatasetVoteStatus :dataset="dataset" :voteStatus="voteStatus" />-->
          <div class="form mb-5">
            <PurchasedCommentList
              v-if="dataset.purchasedUsers"
              :purchasedUsers="dataset.purchasedUsers"
            >
            </PurchasedCommentList>
          </div>
        </div>
        <div class="">
          <button class="form-btn" @click="registerDataset()">購入する</button>
          <button
            class="form-return-btn mb-10"
            @click="$emit('modalOn', dataset)"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatasetInfo from "../../components/datasetDetails/DatasetInfo.vue";
//import DatasetVoteStatus from "../../components/datasetDetails/DatasetVoteStatus.vue";
import { debounce } from "lodash";
import { useVuelidate } from "@vuelidate/core";
//import DatasetStatusBadge from "@/components/parts/DatasetStatusBadge.vue";
import PurchasedCommentList from "../parts/PurchasedCommentList.vue";

const validJudgement = (value) => (value === "" ? false : true);

export default {
  name: "DatasetDetail",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    DatasetInfo,
    //DatasetVoteStatus,
    //DatasetStatusBadge,
    PurchasedCommentList,
  },
  data() {
    return {
      judgement: "",
      judgementReason: "",
      PageTransition: false,
    };
  },
  props: {
    dataset: Array,
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
    isPurchasedOrOwn() {
      // 購入済みまたは所有者の場合True
      return (
        this.datasetOwnType === "un_purchased" || this.datasetOwnType == "owner"
      );
    },
  },
  mounted() {
    this.openCongratulationPop = true;
  },
  created() {
    // メソッドを実行する
    this.clearJudgementReason();
  },
  methods: {
    onDelayAction: debounce(function () {
      this.voteJudgementEnrichment();
    }, 1500),
    clearJudgementReason() {
      this.$store.commit("datasetVoteStore/clearJudgementReason");
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

.form {
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
}

.form-return-btn {
  border-radius: 6px;
  margin-top: 16px;
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
