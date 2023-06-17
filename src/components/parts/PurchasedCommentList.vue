<template>
  <div class="horizontal-list">
    <h5>購入者数: {{ purchasedUsers.length }}人</h5>
    <div
      v-for="(purchased, index) in purchasedUsers"
      :key="purchased.index"
      @click="showJudgementReason(index, purchased)"
      class="text-center inline-block p-1"
    >
      <img
        class="avatar"
        :src="
          require(`@/assets/img/2754579_avatar_man_business man_avatar_face_user_business_people.png`)
        "
        alt=""
      />
      <small>{{ convertedMaskAddress(purchased.wallet_address) }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchasedCommentList",
  props: {
    purchasedUsers: Object,
  },
  computed: {
    convertedMaskAddress() {
      return (address) => {
        return address;
      };
    },
  },
};
</script>
