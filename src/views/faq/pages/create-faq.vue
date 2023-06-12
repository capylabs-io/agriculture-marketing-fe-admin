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
      <div class="text-dp-md font-weight-semibold">Thêm FAQ mới</div>
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
          @click="createFAQ()"
          :disabled="!faqStore.faqForm"
          depressed
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Thêm mới</div>
        </v-btn>
      </div>
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-2 mt-6">
      <CreateForm :isEditing="true" />
    </div>
  </div>
</template>

<script>
import { faqStore } from "../store/faq-store";
import { mapStores } from "pinia";
export default {
  components: {
    CreateForm: () => import("../components/faq-form.vue"),
  },
  computed: {
    ...mapStores(faqStore),
  },
  mounted() {
    this.faqStore.fetchCategories();
  },
  methods: {
    onBackClicked() {
      this.$router.push("/faq");
    },
    createFAQ() {
      this.faqStore.createfaq();
    },
  },
};
</script>
