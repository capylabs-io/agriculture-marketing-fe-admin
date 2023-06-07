<template>
  <v-form v-model="artisanStore.artisanForm">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">
          Hình minh hoạ <span class="red--text" v-if="!isEditing">*</span>
        </div>
        <v-file-input
          placeholder="Chọn hình minh hoạ"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          v-model="artisanStore.file"
          accept="image/png, image/jpeg, image/bmp,image/webp"
          ref="myfile"
          prepend-icon=""
          :rules="isEditing ? [] : [$rules.required]"
          :show-size="1000"
          clearable
          outlined
          solo
          dense
          flat
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Tiêu đề <span class="red--text">*</span>
        </div>
        <v-text-field
          type="text"
          v-model="artisanStore.artisan.title"
          class="border-radius-8"
          placeholder="Nhập tiêu đề bài viết"
          :rules="[$rules.required]"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Danh mục <span class="red--text">*</span>
        </div>
        <v-select
          v-model="artisanStore.artisan.artisanCategory"
          class="border-radius-8"
          :rules="[$rules.required]"
          :items="artisanStore.categories"
          item-text="name"
          item-value="id"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="12">
        <div class="font-weight-semibold mb-2">
          Nội dung <span class="red--text">*</span>
        </div>
        <v-textarea
          type="text"
          v-model="artisanStore.artisan.content"
          class="border-radius-8"
          placeholder="Nhập nội dung bài viết"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { artisanStore } from "../store/artisan-store";
import { mapStores } from "pinia";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapStores(artisanStore),
    // getImage() {
    //   if (
    //     this.artisanStore.artisan &&
    //     this.artisanStore.artisan.images &&
    //     !this.artisanStore.file
    //   )
    //     return this.artisanStore.artisan.images;
    //   if (!this.artisanStore.file) return require("@/assets/no-image.png");
    //   return URL.createObjectURL(this.artisanStore.file);
    // },
    getImage() {
      if (!this.artisanStore.artisan || !this.artisanStore.artisan.thumbnail)
        return require("@/assets/no-image.png");
      return this.artisanStore.artisan.thumbnail;
    },
  },
  methods: {
    onFileChanged(data) {
      this.artisanStore.file = data;
      if (this.artisanStore.file) {
        this.artisanStore.uploadFile();
      }
    },
  },
};
</script>
