<template>
  <v-dialog
    v-model="favPartnerStore.favPartnerCreateDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="border-radius-16 pa-6">
      <div class="font-weight-semibold text-lg text-center">
        Thêm Đối tác mới
      </div>
      <div class="mt-6">
        <div class="neutral70--text text-md font-weight-bold">Tên đối tác</div>
        <v-text-field
          v-model="favPartnerStore.favPartner.name"
          class="border-radius-6 mt-2"
          placeholder="Ex: Capylabs....."
          :rules="[$rules.required]"
          flat
          solo
          outlined
          dense
        ></v-text-field>
      </div>
      <div class="mt-2">
        <div class="neutral70--text text-md font-weight-bold">
          Đường dẫn trang web đối tác
        </div>
        <v-text-field
          v-model="favPartnerStore.favPartner.webUrl"
          class="border-radius-6 mt-2"
          placeholder="Ex: https://truyxuatnguongoc.capylabs.io/..."
          :rules="[$rules.required]"
          flat
          solo
          outlined
          dense
        ></v-text-field>
      </div>
      <div class="neutral70--text text-md font-weight-bold">
        Upload logo đối tác
      </div>
      <div class="upload-container mt-2">
        <picture-input
          ref="pictureInput"
          width="432"
          height="144"
          accept="image/jpeg,image/png,image/jpg"
          size="10"
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: '',
          }"
          @change="onIconSelect($event)"
          hideChangeButton
          :crop="false"
        >
        </picture-input>
        <div class="upload-text text-center" v-if="!isIconSelected">
          <v-img
            class="mx-auto"
            width="40px"
            height="40px"
            :src="require('@/assets/upload-icon.webp')"
          ></v-img>
          <div class="mt-1">
            <span class="font-weight-bold primary--text">Click to upload</span>
            or drag and drop
          </div>
          <div>PNG, JPG or JPEG file (recommended 400x400px)</div>
        </div>
      </div>

      <div class="d-flex justify-space-between align-center mt-6">
        <div></div>
        <div class="d-flex align-center">
          <v-btn
            class="text-none border-radius-8 px-2 mr-2 white-bg neutral20-border"
            elevation="0"
            @click="onCancelClicked"
            dense
          >
            Hủy
          </v-btn>
          <v-btn
            class="text-none border-radius-8 px-2"
            color="primary"
            elevation="0"
            @click="onCreateClicked"
            dense
          >
            Thêm
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.upload-container {
  position: relative;
}
.upload-text {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
}
</style>

<script>
import { mapStores } from "pinia";
import { favPartnerStore } from "../store/favPartner-store";
import alert from "@/plugins/alert";
import PictureInput from "vue-picture-input";
export default {
  components: {
    PictureInput,
  },
  computed: {
    ...mapStores(favPartnerStore),
  },
  data() {
    return {
      createDialog: true,
      image: null,
      isIconSelected: false,
    };
  },
  methods: {
    onIconSelect(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.favPartnerStore.changePartnerLogo(imageFile);
        this.isIconSelected = true;
      } else {
        this.isIconSelected = false;
        console.log("FileReader API not supported!");
      }
    },
    onCancelClicked() {
      this.favPartnerStore.favPartnerCreateDialog = false;
      this.favPartnerStore.favPartner = {};
      this.favPartnerStore.partnerLogo = null;
      this.$refs.pictureInput.file = null;
      this.isIconSelected = false;
    },
    async onCreateClicked() {
      if (
        this.favPartnerStore.favPartners.some(
          (partner) => this.favPartnerStore.favPartner.name === partner.name
        )
      ) {
        alert.error("Tên đối  tác đã tồn tại, Xin vui lòng nhập đúng!");
        return;
      }
      await this.favPartnerStore.createfavPartners();
      this.favPartnerStore.favPartnerCreateDialog = false;
      this.favPartnerStore.favPartner = {};
      this.favPartnerStore.partnerLogo = null;
      this.$refs.pictureInput.file = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-panel {
  width: 200px !important;
}
</style>
