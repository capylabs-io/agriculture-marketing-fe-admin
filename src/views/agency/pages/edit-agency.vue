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
        Chỉnh sửa thông tin Đại lý
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
          :disabled="!agencyStore.agencyForm"
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
import { agencyStore } from "../store/agency-store";
import { mapStores } from "pinia";
export default {
  components: {
    CreateForm: () => import("../components/agency-form.vue"),
  },
  computed: {
    ...mapStores(agencyStore),
  },
  methods: {
    onBackClicked() {
      this.agencyStore.reset();
      this.$router.push("/agency");
    },
    createPost() {
      this.agencyStore.updateagency();
    },
  },
  created() {
    if (!this.agencyStore.agency || !this.agencyStore.agency.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/agency");
    } else {
      this.agencyStore.fetchCategories();
    }
  },
};
</script>
