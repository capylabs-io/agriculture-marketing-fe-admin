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
    <div class="text-dp-md font-weight-semibold mt-1">
      Chỉnh sửa thông tin nghệ nhân
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-2 mt-6">
      <CreateForm />
    </div>
    <div class="d-flex justify-end mt-6 gap-8">
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
        @click="artisanStore.updateartisan()"
        depressed
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Chỉnh sửa thông tin</div>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { artisanStore } from "../store/artisan-store";
import { mapStores } from "pinia";
export default {
  components: {
    CreateForm: () => import("../components/artisan-form.vue"),
  },
  computed: {
    ...mapStores(artisanStore),
  },
  methods: {
    onBackClicked() {
      this.artisanStore.reset();
      this.$router.push("/artisan");
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
