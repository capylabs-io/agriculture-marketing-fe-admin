<template>
  <div
    class="card-shadow border-radius-16 overflow-hidden white-bg cursor-pointer full-height d-flex flex-column"
  >
    <v-img :src="productImage" :aspect-ratio="1 / 1" cover></v-img>
    <div class="pa-4 d-flex flex-column full-height">
      <div class="text-xs neutral60--text font-weight-medium">
        {{ product.code }}
      </div>
      <div class="text-sm font-weight-medium flex-grow-1 mt-1">
        {{ product.name }}
      </div>
      <div class="font-weight-medium d-flex align-center mt-3">
        <div class="text-lg font-weight-bold">
          {{ numberWithCommas(product.price) || "---" }}
        </div>
        <div class="ml-1 text-xs neutral80--text">vnd</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    productImage() {
      if (!this.product || !this.product.images)
        return require("@/assets/no-image.png");
      return this.product.images;
    },
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  created() {},
  methods: {
    // goToProductDetail() {
    //   if (!this.product) return;
    //   this.$router.push(`/cay-canh/${this.product.code}`);
    // },
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
.product-id {
  background-color: var(--v-primary10-base) !important;
  border-bottom: 1px solid var(--v-neutral30-base);
}
</style>
