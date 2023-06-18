<template>
  <h3 class="font-bold text-center p-2">{{ dataset.title }}</h3>
  <div>
    <img
      class="rounded-t-sm m-auto"
      alt="product image"
      :src="thumbnailImageUrl"
      @error="imageError = true"
    />
  </div>
  <div class="p-3">
    <span
      v-for="tag in dataset.tags"
      :key="tag"
      class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
      >{{ tag }}</span
    >
  </div>
  <div class="form-item">
    <p class="form-item-label is-msg">
      <span class="form-item-list"></span>説明
    </p>
    <p style="max-width: 430px">{{ dataset.description }}</p>
  </div>
  <div class="form-item">
    <p class="form-item-label"><span class="form-item-list"></span>金額</p>
    <p>{{ dataset.price }}pts</p>
  </div>
</template>

<script>
export default {
  name: "dataset-info",
  components: {},
  props: {
    dataset: {},
  },
  computed: {
    thumbnailImageUrl() {
      let fileName = this.dataset.fileName.substr(
        0,
        this.dataset.fileName.indexOf(".")
      );
      return this.imageError
        ? this.defaultImage
        : `${process.env.VUE_APP_API_ENDPOINT}dataset/${fileName}/thumbnail`;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  text-align: center;
  &::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 50%;
    margin-left: -15px;
    width: 30px;
    height: 1px;
    background: rgb(47, 40, 94);
  }
}

@media screen and (max-width: 480px) {
  h3 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
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

.block-explorer-badge {
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
}
</style>
