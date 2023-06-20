<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <CreateDialog />
    <div class="text-dp-md font-weight-semibold">Cấu hình trang chủ</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <div class="d-flex text-xl font-weight-medium">
        Sản phẩm tiêu biểu
        <v-icon class="ml-2" color="black">mdi-help-circle-outline </v-icon>
      </div>
      <v-btn
        class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
        elevation="0"
        outlined
        @click="favProductStore.favProductCreateDialog = true"
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm sản phẩm</div>
      </v-btn>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
        <template v-slot:[`item.thumbnail`]="{ item }">
          <v-img
            class="table-img neutral20-border border-radius-8 mx-auto"
            :src="item.thumbnail"
          ></v-img>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <div class="d-flex align-center justify-center">
            <v-btn icon dense @click="onDeleteClicked(item.id)"
              ><v-icon>mdi-delete-outline</v-icon></v-btn
            >
          </div>
        </template>
        <template v-slot:[`no-data`]>
          <div class="py-12">
            <v-img
              class="mx-auto no-data-img"
              :src="require('@/assets/no-data-config.png')"
            ></v-img>
            <div class="mt-4 text-md black--text">Chưa có dữ liệu</div>
          </div>
        </template>
      </v-data-table>
    </div>
    <div class="d-flex justify-space-between align-center mt-6">
      <div class="d-flex align-center gap-8">
        Hiện
        <v-select
          class="border-radius-8 items-per-page-field"
          :items="itemsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          flat
          solo
          outlined
          dense
          hide-details
          readonly
        ></v-text-field>
        sản phẩm
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        color="primary"
        :length="10"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { favProductStore } from "../store/favProduct-store";
export default {
  computed: {
    ...mapStores(favProductStore),
  },
  components: {
    CreateDialog: () => import("../dialogs/create-favProduct-dialog.vue"),
  },
  data() {
    return {
      itemsPerPage: [10, 20, 50],
      items: [
        {
          id: "1",
          thumbnail: require("@/assets/no-image.png"),
          name: "Bưởi sáu roi Tỉnh XYZ",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
        },
        {
          id: "2",
          thumbnail: require("@/assets/no-image.png"),
          name: "Bưởi sáu roi Tỉnh XYZ",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
        },
        {
          id: "3",
          thumbnail: require("@/assets/no-image.png"),
          name: "Bưởi sáu roi Tỉnh XYZ",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
        },
        {
          id: "4",
          thumbnail: require("@/assets/no-image.png"),
          name: "Bưởi sáu roi Tỉnh XYZ",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
        },
        {
          id: "5",
          thumbnail: require("@/assets/no-image.png"),
          name: "Bưởi sáu roi Tỉnh XYZ",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
        },
      ],
      headers: [
        {
          text: "Thứ tự hiển thị",
          value: "id",
          align: "center",
          sortable: true,
          width: "160",
        },
        {
          text: "Ảnh sản phẩm",
          value: "thumbnail",
          align: "center",
          sortable: false,
          width: "170",
        },
        {
          text: "Tên sản phẩm",
          value: "name",
          align: "start",
          width: "250",
        },
        {
          text: "Mã truy xuất",
          value: "code",
          align: "start",
          width: "150",
        },
        {
          text: "Ngày tạo",
          value: "publishedAt",
          align: "center",
          sortable: false,
          width: "150",
        },
        {
          text: "",
          value: "action",
          align: "center",
          sortable: false,
          width: "100",
        },
      ],
    };
  },
  created() {},
  methods: {
    getImageUrl(url) {
      if (!url) return require("@/assets/no-image.png");
      return url;
    },
  },
};
</script>
<style lang="scss" scoped>
.no-data-img {
  height: 184.0830078125px;
  width: 143px;
}
</style>
