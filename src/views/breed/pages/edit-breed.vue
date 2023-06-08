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
      <div class="text-dp-md font-weight-semibold">Chỉnh sửa giống</div>
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
          :disabled="!seedStore.seedForm"
          @click="seedStore.updateSeed()"
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Cập nhật giống</div>
        </v-btn>
      </div>
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-4 mt-6">
      <CreateProductForm
        :isEditing="true"
        :agencyCategory="agencyCategory"
        :artisanCategory="artisanCategory"
        :htxCategory="htxCategory"
        :regionCategory="regionCategory"
      />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { seedStore } from "../store/seed-store";
import { agencyStore } from "../../agency/store/agency-store";
import { artisanStore } from "../../artisan/store/artisan-store";
import { htxStore } from "../../htx/store/htx-store";
import { regionStore } from "../../region/store/region-store";
export default {
  computed: {
    ...mapStores(seedStore),
    ...mapStores(agencyStore),
    ...mapStores(artisanStore),
    ...mapStores(htxStore),
    ...mapStores(regionStore),
  },
  components: {
    CreateProductForm: () => import("../components/breed-form.vue"),
  },  
  data() {
    return {
      agencyCategory: [],
      artisanCategory: [],
      htxCategory: [],
      regionCategory: [],
    };
  },
  methods: {
    onBackClicked() {
      this.seedStore.reset();
      this.$router.push("/seed");
    },
  },
  async created() {
    if (!this.seedStore.seed || !this.seedStore.seed.id) {
      this.$alert.error("Invalid action!");
      this.$router.push("/seed");
    } else {
      await this.seedStore.fetchCategories();
      await this.agencyStore.fetchagencys();
      await this.regionStore.fetchregions();
      await this.htxStore.fetchhtxs();
      await this.artisanStore.fetchArtisans();
      this.agencyCategory = this.agencyStore.agencys.map((agency) => {
        return {
          id: agency.id,
          name: agency.name,
        };
      });
      this.artisanCategory = this.artisanStore.artisans.map((artisan) => {
        return {
          id: artisan.id,
          name: artisan.name,
        };
      });
      this.htxCategory = this.htxStore.htxs.map((htx) => {
        return {
          id: htx.id,
          name: htx.name,
        };
      });
      this.regionCategory = this.regionStore.regions.map((region) => {
        return {
          id: region.id,
          name: region.name,
        };
      });
    }
  },
};
</script>
