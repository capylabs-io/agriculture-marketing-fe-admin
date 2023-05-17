<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          v-if="!postStore.avatarUrl[0]"
          class="neutral20-border border-radius-16"
          :src="require('@/assets/components/landing/image-3.webp')"
          max-height="192px"
        ></v-img>
        <v-img
          v-else
          class="neutral20-border border-radius-16"
          :src="postStore.avatarUrl[0]"
          max-height="192px"
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">Hình minh hoạ</div>
        <v-file-input
          placeholder="Chọn hình minh hoạ"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          v-model="postStore.file"
          accept="image/png, image/jpeg, image/bmp,image/webp"
          ref="myfile"
          @change="onFileChanged($event)"
          prepend-icon=""
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
        <div class="font-weight-semibold mb-2">Tiêu đề</div>
        <v-text-field
          type="text"
          v-model="postStore.post.title"
          class="border-radius-8"
          placeholder="Nhập tiêu đề bài viết"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">Danh mục</div>
        <v-select
          v-model="postStore.post.postCategory"
          class="border-radius-8"
          @change="postid($event)"
          :items="category"
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
        <div class="font-weight-semibold mb-2">Nội dung</div>
        <v-textarea
          type="text"
          v-model="postStore.post.content"
          class="border-radius-8"
          placeholder="Nhập nội dung bài viết"
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
    category: Array,
  },
  data() {
    return {
      items: ["Tin tức", "Giới thiệu"],
    };
  },
  computed: {
    ...mapStores(postStore),
  },
  methods: {
    onFileChanged(data) {
      this.postStore.file = data;
      console.log("file", data);
      if (this.postStore.file) {
        this.postStore.uploadFile();
      }
    },
    postid(id) {
      console.log("post id", id);
    },
  },
};
</script>
