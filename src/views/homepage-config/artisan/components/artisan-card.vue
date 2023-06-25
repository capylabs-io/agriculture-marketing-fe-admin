<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
  >
    <v-img :src="artisanImage" :aspect-ratio="4 / 3" cover></v-img>
    <div class="full-height d-flex flex-column py-3">
      <div class="text-center text-lg font-weight-semibold px-4 flex-grow-1">
        {{ artisan.name }}
      </div>
      <div class="text-sm text-center mt-1 neutral60--text">
        {{ artisan.artisanCategory.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    artisanImage() {
      if (!this.artisan || !this.artisan.thumbnail)
        return require("@/assets/no-image.png");
      return this.artisan.thumbnail;
    },
  },
  props: {
    artisan: {
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
.artisan-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>
