<template>
  <div class="form">
    <div class="form-item">
      <p class="form-item-label is-msg">
        <span class="form-item-label-required">必須</span>説明（300字以内）
      </p>
      <textarea
        v-model="newDataset.description"
        class="form-item-textarea-on-dataset"
      ></textarea>
    </div>
    <div class="form-item">
      <p class="form-item-label">
        <span class="form-item-label-required">必須</span>添付資料（PDF）
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
        alt="添付資料"
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
    </div>
    <div class="form-item">
      <p class="form-item-label mb-2">
        <span class="form-item-label-option">任意</span>仲間募集
      </p>
      <div class="radio-button-group w-full">
        <div class="item">
          <input
            type="radio"
            v-model="newDataset.isRecruitingTeammates"
            class="radio-button"
            value="false"
            id="not-recruiting"
            checked
          />
          <label for="not-recruiting">募集しない</label>
        </div>
        <div class="item">
          <input
            type="radio"
            v-model="newDataset.isRecruitingTeammates"
            class="radio-button"
            value="true"
            id="recruiting"
          />
          <label for="recruiting">募集する</label>
        </div>
      </div>
    </div>
    <button
      class="form-btn mb-10"
      :class="v$.$invalid ? 'form-btn-disabled' : ''"
    >
      保存する
    </button>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { phaseStatus } from "../../plugins/datasetPhase";

export default {
  name: "dataset-form",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      showContentsType: this.$store.state.showContentsType,
      datasetPhase: String,
    };
  },
  components: {
  },
  computed: {
    phaseDetail: function () {
      return function (selectPhase) {
        return phaseStatus(selectPhase);
      };
    },
    newDataset() {
      return this.$store.getters["datasetStore/newDataset"];
    },
    file() {
      return this.$store.getters["datasetStore/file"];
    },
  },
  validations() {
    return {
      newDataset: {
        title: { required, maxLength: maxLength(30) },
        description: { required, maxLength: maxLength(500) },
        datasetPhase: { required },
        filePath: { required },
      },
    };
  },
  created() {
    this.newDataset.datasetPhase = "seed";
  },
  methods: {
    showConfirmView: function () {
      const newDataset = this.newDataset;
      const file = this.file;
      this.$store
        .dispatch("datasetStore/storeNewDataset", { newDataset, file })
        .then(() => {});
      this.$router.push("/datasetConfirm");
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.setDatasetAttachmentFile(files[0]);
      this.createImage(files[0]);
      this.newDataset.file = files[0]; // いらないかも
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
