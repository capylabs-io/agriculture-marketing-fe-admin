<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
  >
    <v-img :src="regionImage" :aspect-ratio="4 / 3" cover></v-img>
    <div class="full-height d-flex flex-column py-4">
      <div
        class="d-flex align-center justify-center product-id text-center text-xs text-uppercase"
      >
        <v-icon small class="mr-1" color="primary">mdi-qrcode</v-icon>
        {{ region.code }}
      </div>
      <div
        class="text-center text-lg font-weight-semibold px-4 flex-grow-1 mt-2"
      >
        {{ region.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    regionImage() {
      if (!this.region || !this.region.thumbnail)
        return require("@/assets/no-image.png");
      return this.region.thumbnail;
    },
  },
  props: {
    region: {
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
.region-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>
