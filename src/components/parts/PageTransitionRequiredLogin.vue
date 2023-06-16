<template>
  <div class="full-view">
    <div class="card glass">
      <div class="">
        <h3 class="font-bold text-center px-3 py-10">
          {{ headerMessage }}
        </h3>
      </div>
      <div class="pb-10">
        <router-link
          class="mt-1 form-return-btn btn-font text-center text-gray-600"
          to="/mypage"
        >
          ログイン画面へ進む
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTransitionRequiredLogin",
  data() {
    return {
      copy: "",
    };
  },
  props: {
    headerMessage: String,
  },
  components: {},
  mounted() {},
  updated() {},
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      this.copy = "コピーしました！";
      setTimeout(() => {
        this.copy = "";
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
/*** VARS ***/
$main-col: #fbde60;
$sec-col: lighten(#303f9f, 20%);
$back-col: rgb(47, 40, 94);


h3 {
  position: relative;
  text-align: center;
  font-size: larger;
  color: #f5f5f5;
  &::after {
    content: "";
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -15px;
    width: 30px;
    height: 1px;
    background: #f5f5f5;
  }
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 15px;
  border: white solid;
  z-index: 200;
  background: rgb(47, 40, 94);
}

.form-return-btn {
  border-radius: 6px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 280px;
  display: block;
  background: white;
  color: gray;
}

.btn-font {
  letter-spacing: 0.05em;
  font-size: 20px;
  font-weight: bold;
}
@media screen and (max-width: 480px) {

  .btn-font {
    font-size: 16px;
  }
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
  }
}
</style>
