<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="require('@/assets/components/landing/image-3.webp')"
          max-height="192px"
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">Hình minh hoạ</div>
        <v-file-input
          placeholder="Chọn hình minh hoạ"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
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
          class="border-radius-8"
          :items="items"
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
export default {
  data() {
    return {
      items: ["Tin tức", "Giới thiệu"],
    };
  },
};
</script>