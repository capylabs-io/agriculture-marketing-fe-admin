<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý Vùng sản xuất</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="regionStore.searchKey"
        class="search-field border-radius-8"
        placeholder="Tìm kiếm"
        prepend-inner-icon="mdi-magnify"
        flat
        solo
        outlined
        dense
        hide-details
      ></v-text-field>
      <v-btn
        class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
        elevation="0"
        to="/create-region"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm Vùng sản xuất mới</div>
      </v-btn>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table
        :headers="headers"
        :items="regionStore.slicedregions"
        :items-per-page="regionStore.regionsPerPage"
        hide-default-footer
      >
        <template v-slot:[`item.thumbnail`]="{ item }">
          <v-img
            class="table-img neutral20-border border-radius-8 mx-auto"
            :src="getImageUrl(item.thumbnail)"
          ></v-img>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <div>
            {{ item.regionCategory.name }}
          </div>
        </template>
        <template v-slot:[`item.qrcode`]="{ item }">
          <v-img
            class="table-img border-radius-8 mx-auto"
            :src="getImageUrl(item.qrCode)"
          ></v-img>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <div class="d-flex align-center justify-center">
            <v-btn
              icon
              dense
              @click="onDisableClicked(item.id)"
              v-if="item.status == 'publish'"
              ><v-icon color="error">mdi-eye-off-outline</v-icon></v-btn
            >
            <v-btn
              icon
              dense
              @click="onEnableClicked(item.id)"
              v-if="item.status == 'disabled'"
              ><v-icon color="success">mdi-eye-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onEditClicked(item)"
              ><v-icon>mdi-pencil-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onDeleteClicked(item.id)"
              ><v-icon>mdi-delete-outline</v-icon></v-btn
            >
            <!-- <v-btn icon dense @click="onOpenClicked(item.code)"
              ><v-icon>mdi-web</v-icon></v-btn
            > -->
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
          v-model="regionStore.regionsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="regionStore.totalregion"
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
        :length="regionStore.totalregionPage"
        v-model="regionStore.regionPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { regionStore } from "../store/region-store";
import router from "@/router";
export default {
  computed: {
    ...mapStores(regionStore),
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
      headers: [
        {
          text: "Ảnh đại diện",
          value: "thumbnail",
          align: "center",
          sortable: false,
        },
        {
          text: "Tên Vùng sản xuất",
          value: "name",
          align: "center",
        },
        {
          text: "Mã truy xuất",
          value: "code",
          align: "center",
        },
        {
          text: "Danh mục",
          value: "category",
          align: "center",
          sortable: false,
        },
        {
          text: "Người tạo",
          value: "representative",
          align: "center",
          sortable: false,
        },
        {
          text: "QR Code",
          value: "qrcode",
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
  created() {
    this.regionStore.fetchregions();
  },
  methods: {
    getImageUrl(url) {
      if (!url) return require("@/assets/no-image.png");
      return url;
    },
    onOpenClicked(code) {
      const link = process.env.VUE_APP_USER_PAGE + "regions/" + code;
      window.open(link);
    },
    onEditClicked(item) {
      this.regionStore.region = item;
      this.regionStore.region.regionCategory = item.regionCategory.id;
      console.log("region", this.regionStore.region);
      router.push("/edit-region");
    },
    // onDisableClicked(regionId) {
    //   this.$dialog.confirm({
    //     title: "Xác nhận ẩn Giống",
    //     topContent:
    //       "<span class='error--text'>Bạn có chắc muốn ẩn giống này không? Người dùng sẽ không thấy giống này nữa!</span>",
    //     done: async () => {
    //       await this.regionStore.toggleregion(regionId, false);
    //     },
    //   });
    // },
    // onEnableClicked(regionId) {
    //   this.$dialog.confirm({
    //     title: "Xác nhận hiện Giống",
    //     topContent: "Bạn có muốn hiện lại Giống này không?",
    //     done: async () => {
    //       await this.regionStore.toggleregion(regionId, true);
    //     },
    //   });
    // },
    onDeleteClicked(regionId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa vùng sản xuất",
        topContent: "Bạn có chắc bạn muốn xóa vùng sản xuất này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.regionStore.deleteregion(regionId);
        },
      });
    },
  },
};
</script>
