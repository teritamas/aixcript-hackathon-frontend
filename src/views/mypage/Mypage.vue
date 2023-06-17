<template>
  <LoginStep v-if="!token" />
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-5"
    style="max-width: 1200px; margin: 0 auto"
  >
    <MyProfile :detail="detail" />
    <MyDatasets :detail="detail" class="md:col-span-2" />
    <MyPurchasedDatasets :detail="detail" class="md:col-span-2" />
  </div>
</template>

<script>
import LoginStep from "../../components/login/LoginStep.vue";
import MyProfile from "../../components/mypage/MyProfile.vue";
import MyDatasets from "../../components/mypage/MyDatasets.vue";
import MyPurchasedDatasets from "../../components/mypage/MyPurchasedDatasets.vue";

export default {
  name: "MyPage",
  components: {
    MyProfile,
    MyDatasets,
    LoginStep,
    MyPurchasedDatasets,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("userStore/getDetail", this.token).then(() => {});
  },
  computed: {
    token() {
      return this.$store.getters["userStore/token"];
    },
    detail() {
      return this.$store.getters["userStore/detail"];
    },
  },
  methods: {
    async registerMetamask(contract) {
      const type = contract.type;
      const tokenAddress = contract.address;
      const tokenSymbol = contract.symbol;
      const tokenDecimals = contract.decimals;
      const tokenImage = contract.image;

      try {
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: type, // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        });

        if (wasAdded) {
          console.log("Thanks for your interest!");
        } else {
          console.log("Your loss!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
