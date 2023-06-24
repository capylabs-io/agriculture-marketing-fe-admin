<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
    @click="goToHtxDetail()"
  >
    <v-img :src="htxImage" :aspect-ratio="4 / 3" cover></v-img>
    <div class="full-height d-flex flex-column py-3">
      <div
        class="d-flex align-center justify-center product-id text-center text-sm text-uppercase"
      >
        <v-icon small class="mr-1" color="primary">mdi-qrcode</v-icon>
        {{ htx.code }}
      </div>
      <div class="text-center text-xl font-weight-medium px-4 pt-1 flex-grow-1">
        {{ htx.name }}
      </div>
      <div v-if="htx.htxCategory && htx.htxCategory.id != -1">
        <v-divider class="mt-3"></v-divider>
        <div class="text-sm text-center mt-2 primary--text">
          {{ htx.htxCategory.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    htxImage() {
      if (!this.htx || !this.htx.thumbnail)
        return require("@/assets/no-image.png");
      return this.htx.thumbnail;
    },
  },
  props: {
    htx: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToHtxDetail() {
      if (!this.htx) return;
      this.$router.push(`/hop-tac-xa/${this.htx.code}`);
    },
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
.htx-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>
