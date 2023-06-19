<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Cấu hình trang chủ</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <div class="d-flex text-xl font-weight-medium">
        Banner
        <v-icon class="ml-2" color="black">mdi-help-circle-outline </v-icon>
      </div>
      <v-btn
        class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
        elevation="0"
        to="/create-contact"
        outlined
      >
        <v-icon small>mdi-square-edit-outline</v-icon>
        <div class="ml-1 text-sm font-weight-medium">Chỉnh sửa</div>
      </v-btn>
    </div>
    <div
      class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-6 mt-6"
      v-for="(banner, index) in banners"
      :key="index"
    >
      <BannerForm :banner="banner" :index="(index + 1).toString()" />
    </div>
  </div>
</template>
ontact

<script>
//   import { mapStores } from "pinia";
//   import { contactStore } from "../store/contact-store";
export default {
  components: {
    BannerForm: () => import("../components/banner-form.vue"),
  },
  computed: {
    //   ...mapStores(contactStore),
  },
  data() {
    return {
      items: [
        {
          thumbnail: require("@/assets/components/landing/image-2.webp"),
          name: "Giống cây Bonsai",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
          author: "Phùng Thanh Độ",
          qrcode: require("@/assets/components/qrcode-example.png"),
        },
      ],
      itemsPerPage: [10, 50, 100],
      banners: [
        {
          imageUrl: require("@/assets/banner3.png"),
        },
        {
          imageUrl: require("@/assets/banner4.png"),
        },
        {
          imageUrl: require("@/assets/banner2.png"),
        },
        {
          imageUrl: require("@/assets/banner1.png"),
        },
      ],
      headers: [
        // {
        //   text: "",
        //   value: "id",
        //   align: "center",
        //   sortable: false,
        // },
        {
          text: "Người gửi",
          value: "name",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },

        {
          text: "Tiêu đề",
          value: "title",
          align: "center",
          sortable: false,
        },
        {
          text: "Ngày gửi",
          value: "createdAt",
          align: "center",
          sortable: false,
        },
        {
          text: "Hành động",
          value: "action",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
