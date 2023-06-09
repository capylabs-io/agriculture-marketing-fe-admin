<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="wrapper full-height d-flex">
    <NavigationDrawer />
    <div class="container mx-auto pa-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavigationDrawer: () => import("@/components/NavigationDrawer.vue"),
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.wrapper {
  background: white;
}
.container {
  max-width: 1400px;
  animation: fadeleft 1s ease-in-out;
}
</style>
