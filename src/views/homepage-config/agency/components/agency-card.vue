<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
  >
    <v-img :src="agencyImage" :aspect-ratio="4 / 3" cover></v-img>
    <div class="full-height d-flex flex-column pt-3 pb-2">
      <div
        class="d-flex align-center justify-center product-id text-center text-sm text-uppercase"
      >
        <v-icon small class="mr-1" color="primary">mdi-qrcode</v-icon>
        {{ agency.code }}
      </div>
      <div class="text-center text-xl font-weight-medium px-4 pt-1 flex-grow-1">
        {{ agency.name }}
      </div>
      <v-divider class="mt-3"></v-divider>
      <div class="text-sm text-center mt-2 primary--text">
        {{ agency.agencyCategory.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    agencyImage() {
      if (!this.agency || !this.agency.thumbnail)
        return require("@/assets/no-image.png");
      return this.agency.thumbnail;
    },
  },
  props: {
    agency: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    numberWithCommas(x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
      return x;
    },
  },
};
</script>

<style scoped>
.agency-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>
