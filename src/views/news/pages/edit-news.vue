<template>
  <div>
    <v-btn
      class="text-none text-md font-weight-semibold px-0"
      @click="onBackClicked"
      text
    >
      <v-icon class="mr-1" small>mdi-arrow-left</v-icon>
      Quay lại
    </v-btn>
    <div class="mt-1 d-flex justify-space-between">
      <div class="text-dp-md font-weight-semibold">Chỉnh sửa bài viết</div>
      <div class="d-flex gap-8">
        <v-btn
          class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
          elevation="0"
          @click="onBackClicked"
        >
          Huỷ
        </v-btn>
        <v-btn
          class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
          elevation="0"
          color="primary"
          @click="postStore.updatePost()"
          depressed
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Chỉnh sửa bài viết</div>
        </v-btn>
      </div>
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-2 mt-6">
      <CreateNewsForm :category="postStore.category" />
    </div>
  </div>
</template>

<script>
import { postStore } from "../stores/news-store";
import { mapStores } from "pinia";
export default {
  components: {
    CreateNewsForm: () => import("../components/news-form.vue"),
  },
  computed: {
    ...mapStores(postStore),
  },
  methods: {
    onBackClicked() {
      this.postStore.reset();
      this.$router.push("/news");
    },
  },
  created() {
    if (!this.postStore.post || !this.postStore.post.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/news");
    } else {
      this.postStore.fetchCategories();
    }
  },
};
</script>
