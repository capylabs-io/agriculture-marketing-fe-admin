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
    <div class="text-dp-md font-weight-semibold mt-1">Chỉnh sửa vật tư</div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-4 mt-6">
      <CreateProductForm :isEditing="true" />
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
        :disabled="!supplyStore.supplyForm"
        @click="supplyStore.updateSupply()"
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Cập nhật vật tư</div>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { supplyStore } from "../store/supply-store";
export default {
  computed: {
    ...mapStores(supplyStore),
  },
  components: {
    CreateProductForm: () => import("../components/supply-form.vue"),
  },
  methods: {
    onBackClicked() {
      this.supplyStore.reset();
      this.$router.push("/supply");
    },
  },
  created() {
    if (!this.supplyStore.supply || !this.supplyStore.supply.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/supply");
    } else {
      this.supplyStore.fetchCategories();
    }
  },
};
</script>
