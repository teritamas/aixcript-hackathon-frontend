<template>
  <div
    class="dataset-status-badge-object font-bold"
    :class="
      isPurchasedOrOwn
        ? 'dataset-status-badge-active'
        : 'dataset-status-badge-de-active'
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
  },
  computed: {
    isPurchasedOrOwn() {
      // 購入済みまたは所有者の場合True
      return (
        this.datasetOwnType === "un_purchased" || this.datasetOwnType == "owner"
      );
    },
    statusBadge() {
      // カードの右上のステータスバッジに掲載する内容
      let badge = "";
      if (this.datasetOwnType == "purchased") {
        badge = "購入済み";
      } else if (this.datasetOwnType == "un_purchased") {
        badge = "購入できます";
      } else if (this.datasetOwnType == "owner") {
        badge = "あなたのアートが販売中です！";
      } else {
        badge = "購入できます";
      }
      return badge;
    },
  },
};
</script>

<style lang="scss" scoped>
.dataset-status-badge-object {
  position: absolute;
  top: 0px;
  left: 0;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 0.5rem 0 10px 0;
}

.dataset-status-badge-active {
  background: #ffca28;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}

.dataset-status-badge-de-active {
  background: #939087;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
</style>
