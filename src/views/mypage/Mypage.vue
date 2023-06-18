<template>
  <LoginStep v-if="!token" />
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-5"
    style="max-width: 1200px; margin: 0 auto"
  >
    <div class="text-white text-center md:col-span-3">
      <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="download()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          class="inline-block mx-1"
          fill="white"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
          />
        </svg>
        購入したデータセットの一括ダウンロード
      </button>
    </div>
    <MyProfile :detail="detail" />
    <MyPurchasedDatasets :detail="detail" class="md:col-span-2" />
    <MyDatasets :detail="detail" class="md:col-span-3" />
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
    download() {
      this.$store.dispatch("userStore/downloadDataset").then(() => {});
    },
  },
};
</script>
