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
        Chỉnh sửa thông tin Vùng sản xuất
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
          :disabled="!regionStore.regionForm"
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
import { regionStore } from "../store/region-store";
import { mapStores } from "pinia";
export default {
  components: {
    CreateForm: () => import("../components/region-form.vue"),
  },
  computed: {
    ...mapStores(regionStore),
  },
  methods: {
    onBackClicked() {
      this.regionStore.reset();
      this.$router.push("/region");
    },
    createPost() {
      this.regionStore.updateregion();
    },
  },
  created() {
    if (!this.regionStore.region || !this.regionStore.region.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/region");
    } else {
      this.regionStore.fetchCategories();
    }
  },
};
</script>
