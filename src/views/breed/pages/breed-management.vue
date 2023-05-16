<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý giống</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
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
        to="/create-breed"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm giống</div>
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
        <template v-slot:[`item.qrcode`]="{ item }">
          <v-img
            class="table-img border-radius-8 mx-auto"
            :src="item.qrcode"
          ></v-img>
        </template>
        <template v-slot:[`item.action`]="{}">
          <div class="d-flex align-center justify-center">
            <v-btn icon dense><v-icon>mdi-eye-outline</v-icon></v-btn>
            <v-btn icon dense><v-icon>mdi-pencil-outline</v-icon></v-btn>
            <v-btn icon dense><v-icon>mdi-delete-outline</v-icon></v-btn>
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
          placeholder="100"
          flat
          solo
          outlined
          dense
          hide-details
          readonly
        ></v-text-field>
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        color="primary"
        :length="1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
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
          text: "Ảnh sản phẩm",
          value: "thumbnail",
          align: "center",
          sortable: false,
        },
        {
          text: "Tên sản phẩm",
          value: "name",
          align: "center",
        },
        {
          text: "Mã truy xuất",
          value: "code",
          align: "center",
        },
        {
          text: "Ngày tạo",
          value: "publishedAt",
          align: "center",
          sortable: false,
        },
        {
          text: "Người tạo",
          value: "author",
          align: "center",
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
};
</script>