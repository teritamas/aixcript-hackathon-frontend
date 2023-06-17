<template>
  <div class="form">
    <div class="form-item">
      <p class="form-item-label">
        <span class="form-item-label-required">必須</span>画像（JPG or PNG）
      </p>
      <div v-show="!newDataset.filePath" class="form-item-input-file">
        <label class="border file mt-2 input-item__label"
          >ファイルを選択
          <input type="file" @change="onFileChange" />
        </label>
      </div>
    </div>
    <div class="w-full mt-2">
      <embed
        v-show="newDataset.filePath"
        class="preview-item-file block"
        :src="newDataset.filePath"
        alt="データセット"
      />
      <div
        v-show="newDataset.filePath"
        class="preview-item-btn"
        @click="remove"
      >
        <div
          class="flex preview-item-icon is-msg border mt-1 mb-3 p-2 text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-2 w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clip-rule="evenodd"
            />
          </svg>
          ファイルを選びなおす
        </div>
      </div>
      <div class="validation-result-area">
        <div class="p-3">
          <h3>検出されたタグ</h3>
          <div>{{ validateResult.bestGuessLabels }}</div>
        </div>

        <div class="bg-red-100 rounded-lg shadow-lg p-6">
          <h3>完全一致した画像</h3>
          <div v-if="validateResult.fullMathUrl.length === 0">なし: OK</div>
          <div v-else class="grid grid-cols-3 justify-items-center">
            <div
              class="justify-items-center"
              v-for="(url, index) in validateResult.fullMathUrl"
              :key="url"
            >
              <img
                :src="url"
                alt="image"
                class="rounded-lg shadow-lg h-auto w-24"
              />
              <a :href="url">一致した画像.{{ index }}</a>
            </div>
          </div>
        </div>

        <div class="bg-yellow-100 rounded-lg shadow-lg p-6">
          <h3>部分一致</h3>
          <div v-if="validateResult.partialMathUrls.length === 0">なし: OK</div>
          <div class="grid grid-cols-3 justify-items-center">
            <div
              class="justify-items-center"
              v-for="(url, index) in validateResult.partialMathUrls"
              :key="url"
            >
              <img
                :src="url"
                alt="image"
                class="rounded-lg shadow-lg h-auto w-24"
              />
              <a :href="url">部分一致した画像.{{ index }}</a>
            </div>
          </div>
        </div>

        <div class="bg-blue-100 rounded-lg shadow-lg p-6">
          <h3>似ている画像</h3>
          <div v-if="validateResult.similarUrls.length === 0">なし: OK</div>
          <div v-else class="grid grid-cols-3 justify-items-center">
            <div
              class="justify-items-center"
              v-for="(url, index) in validateResult.similarUrls"
              :key="url"
            >
              <img
                :src="url"
                alt="image"
                class="rounded-lg shadow-lg h-auto w-24"
              />
              <a :href="url">類似した画像.{{ index }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-item mt-5">
      <p class="form-item-label is-msg">
        <span class="form-item-label-required">必須</span>説明（300字以内）
      </p>
      <textarea
        v-model="newDataset.description"
        class="form-item-textarea-on-dataset"
      ></textarea>
    </div>

    <button class="form-btn mb-10" @click="registerDataset()">保存する</button>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";

export default {
  name: "dataset-form",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      showContentsType: this.$store.state.showContentsType,
    };
  },
  components: {},
  computed: {
    newDataset() {
      return this.$store.getters["datasetStore/newDataset"];
    },
    file() {
      return this.$store.getters["datasetStore/file"];
    },
    validateResult() {
      return this.$store.getters["datasetStore/validateResult"];
    },
  },
  validations() {
    return {
      newDataset: {
        description: { required, maxLength: maxLength(500) },
        filePath: { required },
      },
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.setDatasetAttachmentFile(files[0]);
      this.createImage(files[0]);
      this.newDataset.file = files[0]; // いらないかも

      // アップロード後画像を検証する
      this.validateDataset();
    },
    setDatasetAttachmentFile(file) {
      this.$store.dispatch("datasetStore/storeFile", file).then(() => {});
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newDataset.filePath = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.newDataset.filePath = false;
    },
    validateDataset() {
      // validationAPIをリクエストし画像を検証する
      this.$store
        .dispatch("datasetStore/validateDataset", this.newDataset)
        .then(() => {});
    },
    registerDataset() {
      this.$store
        .dispatch("datasetStore/registerDataset", this.newDataset)
        .then(() => {});
    },
  },
};
</script>

<style scoped>
.file {
  width: 100%;
  background: #fbfdff;
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #dadada;
}

label {
  color: #555; /* ラベルテキストの色を指定する */
  padding: 10px; /* ラベルとテキスト間の余白を指定する */
}
</style>
