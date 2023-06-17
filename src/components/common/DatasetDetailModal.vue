<template>
  <div class="full-view pt-5">
    <div v-if="dataset" class="content-center pt-5">
      <div class="card card-one glass">
        <div class="dataset-status-badge-area">
          <DatasetStatusBadge :datasetOwnType="dataset.datasetOwnType" />
        </div>
        <div class="form mb-10">
          <DatasetInfo
            :dataset="dataset"
            :datasetAttachmentFile="datasetAttachmentFile"
          />
        </div>

        <div class="bg-light-gray p-3">
          <div class="form mb-5">
            <PurchasedCommentList
              v-if="dataset.purchasedUsers"
              :purchasedUsers="dataset.purchasedUsers"
            >
            </PurchasedCommentList>
          </div>
        </div>
        <div>
          <button
            v-if="purchasedButtonEnabled()"
            class="form-btn"
            @click="purchaseDataset()"
          >
            購入する
          </button>
          <button
            class="form-return-btn mb-10"
            @click="$emit('modalOn', dataset)"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
    <Loading v-show="loading" :loadingText="loadingText" />
    <Congratulation
      :reward="proposerReword"
      :balance="proposerBalance"
      @popClose="popClose"
      v-show="showCongratulation"
    />
  </div>
</template>

<script>
import DatasetInfo from "../../components/datasetDetails/DatasetInfo.vue";
import { debounce } from "lodash";
import Loading from "../../components/parts/Loading.vue";
import Congratulation from "../../components/parts/Congratulation.vue";
import { useVuelidate } from "@vuelidate/core";
import DatasetStatusBadge from "@/components/parts/DatasetStatusBadge.vue";
import PurchasedCommentList from "../parts/PurchasedCommentList.vue";

const validJudgement = (value) => (value === "" ? false : true);

export default {
  name: "DatasetDetail",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    DatasetInfo,
    Loading,
    Congratulation,
    DatasetStatusBadge,
    PurchasedCommentList,
  },
  data() {
    return {
      loading: false,
      openCongratulationPop: true,
      loadingText: [
        {
          checkTarget: "voted-check",
          label: "購入完了",
        },
        {
          checkTarget: "token-check",
          label: "トークン作成完了",
        },
      ],
    };
  },
  props: {
    dataset: Array,
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
  },
  mounted() {
    this.openCongratulationPop = true;
  },
  methods: {
    onDelayAction: debounce(function () {
      this.voteJudgementEnrichment();
    }, 1500),
    purchasedButtonEnabled() {
      // 購入済みまたは所有者の場合は無効化する
      return this.dataset.datasetOwnType === "un_purchased";
    },
    setLoading(bool) {
      this.loading = bool;
    },
    inCheck(checkTarget) {
      let checkbox = document.getElementById(checkTarget);
      checkbox.checked = true;
    },
    popClose() {
      this.openCongratulationPop = false;
    },
    purchaseDataset() {
      if (this.purchasedButtonDisabled) {
        // 無効化されている時は何もしない
        console.warn("購入できるユーザでないので購入できません");
        return;
      }
      this.$store
        .dispatch("datasetStore/purchaseDataset", {
          datasetId: this.dataset.datasetId,
        })
        .then(() => {
          this.$emit("getDatasets");
        });
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
