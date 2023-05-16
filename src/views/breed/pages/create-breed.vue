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
    <div class="text-dp-md font-weight-semibold mt-1">Thêm giống mới</div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-4 mt-6">
      <CreateProductForm />
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
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm giống</div>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CreateProductForm: () => import("../components/breed-form.vue"),
  },
  methods: {
    onBackClicked() {
      this.$router.push("/supply");
    },
  },
};
</script>