<template>
  <v-form v-model="postStore.postForm">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getProductImage"
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
          v-model="postStore.file"
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
          v-model="postStore.post.title"
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
          v-model="postStore.post.postCategory"
          class="border-radius-8"
          :rules="[$rules.required]"
          :items="postStore.categories"
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
          v-model="postStore.post.content"
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
import { postStore } from "../stores/news-store";
import { mapStores } from "pinia";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapStores(postStore),
    getProductImage() {
      if (
        this.postStore.post &&
        this.postStore.post.images &&
        !this.postStore.file
      )
        return this.postStore.post.images;
      if (!this.postStore.file) return require("@/assets/no-image.png");
      return URL.createObjectURL(this.postStore.file);
    },
  },
  methods: {
    onFileChanged(data) {
      this.postStore.file = data;
      if (this.postStore.file) {
        this.postStore.uploadFile();
      }
    },
  },
};
</script>
