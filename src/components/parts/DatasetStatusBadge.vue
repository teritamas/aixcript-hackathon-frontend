<template>
    <div
        class="dataset-status-badge-object font-bold"
        :class="
        isVoting
            ? 'dataset-status-badge-voting'
            : 'dataset-status-badge-vote-end'
        "
    >
        {{ statusBadge }}
    </div>
</template>


<script>
export default {
  name: "statusBadge",
    props: {
    datasetOwnType: String,
    datasetStatus: String,
  },
  computed: {
    isVoting() {
      // 提案が投票中の場合True
      return this.datasetStatus === "voting";
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
          badge = "投票受付中です！";
        }
      } else {
        badge = "投票終了";
      }
      return badge;
    },
  },
};
</script>

<style lang=scss scoped>

.dataset-status-badge-area {
  position: relative;
}
.not-show-vote-result {
  height: 90px;
  padding: 15px;
}
.dataset-status-badge-object {
  position: absolute;
  top: 0px;
  left: 0;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 0 0 10px 0;
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
