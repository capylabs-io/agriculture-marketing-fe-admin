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
      <div class="text-dp-md font-weight-semibold">Chỉnh sửa vật tư</div>
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
          :disabled="!supplyStore.supplyForm"
          @click="supplyStore.updateSupply()"
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Cập nhật vật tư</div>
        </v-btn>
      </div>
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-4 mt-6">
      <CreateProductForm :isEditing="true" :agencyCategory="agencyCategory" />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { supplyStore } from "../store/supply-store";
import { agencyStore } from "../../agency/store/agency-store";

export default {
  computed: {
    ...mapStores(supplyStore),
    ...mapStores(agencyStore),
  },
  components: {
    CreateProductForm: () => import("../components/supply-form.vue"),
  },
  data() {
    return {
      agencyCategory: [],
    };
  },
  methods: {
    onBackClicked() {
      this.supplyStore.reset();
      this.$router.push("/supply");
    },
  },
  async created() {
    if (!this.supplyStore.supply || !this.supplyStore.supply.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/supply");
    } else {
      await this.supplyStore.fetchCategories();
      await this.agencyStore.fetchagencys();
      this.agencyCategory = this.agencyStore.agencys.map((agency) => {
        return {
          id: agency.id,
          name: agency.name,
        };
      });
      console.log("item", this.supplyStore.supply);
      console.log("agencyCategory", this.agencyCategory);
    }
  },
};
</script>
