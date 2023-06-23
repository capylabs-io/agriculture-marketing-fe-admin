<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="3">
        <v-file-input
          v-model="bannerStore.banners[index].image"
          placeholder="Tải ảnh lên đây"
          prepend-inner-icon="mdi-tray-arrow-up"
          class="border-radius-8"
          accept="image/png, image/jpeg, image/bmp,image/webp"
          ref="myfile"
          :disabled="!bannerStore.isEditing ? true : false"
          prepend-icon=""
          @change="onFileChanged($event)"
          clearable
          outlined
          solo
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-center">
          <v-btn icon>
            <v-icon color="black" class="">mdi-drag-variant</v-icon>
          </v-btn>
          <div class="text-sm font-weight-semibold">
            (Kéo/thả để thay đổi thứ tự)
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3" class="d-flex align-center">
        <div
          class="text-right full-width text-md font-weight-medium neutral60--text"
        >
          #{{ index + 1 }}
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-img :src="bannerImage" class="border-radius-16"> </v-img>
    </v-row>
  </v-form>
</template>

<script>
import { bannerstore } from "../store/banner-store";

// import { bannerStore } from "../stores/news-store";
import { mapStores } from "pinia";

export default {
  computed: {
    ...mapStores(bannerstore),
    // bannerImage() {
    //   if (!this.c && !this.bannerStore.banners[this.index].url)
    //     return require("@/assets/no-image.png");
    //   return this.bannerStore.banners[this.index].url;
    // },
    bannerImage() {
      if (
        this.bannerStore.banners &&
        this.bannerStore.banners[this.index].url &&
        !this.bannerStore.banners[this.index].image
      )
        return this.bannerStore.banners[this.index].url;
      if (!this.bannerStore.banners[this.index].image)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.bannerStore.banners[this.index].image);
    },
  },
  data() {
    return {
      //Marked: For Text Editor
    };
  },
  props: {
    index: {
      type: Number,
      default: () => 0,
    },
  },
  watch: {},
  created() {},
  methods: {
    createImage(file) {
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        console.log(vm.image);
      };
      reader.readAsDataURL(file);
    },
    onFileChanged(data) {
      this.bannerStore.file = data;
      console.log("bannerImage", this.bannerImage);
      this.bannerStore.banners[this.index].type = "imageUpload";
      if (this.bannerStore.file) {
        this.bannerStore.uploadFile();
      }
    },
  },
};
</script>
