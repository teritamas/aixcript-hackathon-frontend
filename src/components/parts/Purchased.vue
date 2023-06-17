<template>
  <div class="full-view">
    <div class="card glass bg-dark-blue">
      <div class="bg-dark-blue">
        <h3 class="text-white font-bold text-center py-10">購入しました</h3>
      </div>
      <div class="bg-dark-blue pb-10">
        <router-link
          class="mb-1 form-return-btn btn-font text-center text-gray-600"
          to="/mypage"
        >
          マイページでデータセットを確認
        </router-link>
        <div
          class="mt-1 form-return-btn btn-font text-center text-gray-600"
          v-on:click="$emit('popClose')"
        >
          閉じる
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading-",
  data() {
    return {
      copy: "",
    };
  },
  props: {},
  components: {},
  computed: {},
  mounted() {},
  updated() {},
  methods: {
    reset: function () {
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  position: relative;
  text-align: center;
  font-size: larger;
  &::after {
    content: "";
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -15px;
    width: 30px;
    height: 1px;
    background: white;
  }
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 3px;
  z-index: 200;
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
