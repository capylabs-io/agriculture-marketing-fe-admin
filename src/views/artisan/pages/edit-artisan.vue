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
      <div class="text-dp-md font-weight-semibold">
        Chỉnh sửa thông tin nghệ nhân
      </div>
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
          @click="createPost()"
          :disabled="!artisanStore.artisanForm"
          depressed
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Chỉnh sửa</div>
        </v-btn>
      </div>
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-2 mt-6">
      <CreateForm :isEditing="true" />
    </div>
  </div>
</template>

<script>
import { artisanStore } from "../store/artisan-store";
import { mapStores } from "pinia";
export default {
  components: {
    CreateForm: () => import("../components/artisan-list-form.vue"),
  },
  computed: {
    ...mapStores(artisanStore),
  },
  methods: {
    onBackClicked() {
      this.artisanStore.reset();
      this.$router.push("/artisan");
    },
    createPost() {
      this.artisanStore.updateartisan();
    },
  },
  created() {
    if (!this.artisanStore.artisan || !this.artisanStore.artisan.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/artisan");
    } else {
      this.artisanStore.fetchCategories();
    }
  },
};
</script>
