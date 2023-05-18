<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý sản phẩm</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="productStore.searchKey"
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
        to="/create-product"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm sản phẩm</div>
      </v-btn>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table
        :headers="headers"
        :items="productStore.slicedProducts"
        :items-per-page="productStore.productsPerPage"
        hide-default-footer
      >
        <template v-slot:[`item.thumbnail`]="{ item }">
          <v-img
            class="table-img neutral20-border border-radius-8 mx-auto"
            :src="getImageUrl(item.images)"
          ></v-img>
        </template>
        <template v-slot:[`item.publishedAt`]="{ item }">
          <div>
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
        </template>
        <template v-slot:[`item.author`]="{ item }">
          <div>
            {{ item.author.username }}
          </div>
        </template>
        <template v-slot:[`item.qrcode`]="{ item }">
          <v-img
            class="table-img border-radius-8 mx-auto"
            :src="getImageUrl(item.qrCodeImage)"
          ></v-img>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <div class="d-flex align-center justify-center">
            <v-btn
              icon
              dense
              @click="onDisableClicked(item.id)"
              v-if="item.status == 'publish'"
              ><v-icon>mdi-eye-off-outline</v-icon></v-btn
            >
            <v-btn
              icon
              dense
              @click="onEnableClicked(item.id)"
              v-if="item.status == 'disabled'"
              ><v-icon>mdi-eye-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onEditClicked(item)"
              ><v-icon>mdi-pencil-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onDeleteClicked(item.id)"
              ><v-icon>mdi-delete-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onOpenClicked(item.code)"
              ><v-icon>mdi-web</v-icon></v-btn
            >
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
          v-model="productStore.productsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="productStore.totalProduct"
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
        :length="productStore.totalProductPage"
        v-model="productStore.productPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "../store/product-store";
import router from "@/router/index";
export default {
  computed: {
    ...mapStores(productStore),
  },
  data() {
    return {
      itemsPerPage: [10, 20, 50],
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
          align: "start",
        },
        {
          text: "Mã truy xuất",
          value: "code",
          align: "start",
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
  created() {
    this.productStore.fetchProducts();
  },
  methods: {
    getImageUrl(url) {
      if (!url) return require("@/assets/no-image.png");
      return url;
    },
    onOpenClicked(code) {
      const link = process.env.VUE_APP_USER_PAGE + "product/" + code;
      window.open(link);
    },
    onEditClicked(item) {
      this.productStore.product = item;
      this.productStore.product.productCategory = item.productCategory.id;
      router.push("/edit-product");
    },
    onDisableClicked(productId) {
      this.$dialog.confirm({
        title: "Xác nhận ẩn Sản phẩm",
        topContent:
          "<span class='error--text'>Bạn có chắc muốn ẩn sản phẩm này không? Người dùng sẽ không thấy sản phẩm này nữa!</span>",
        done: async () => {
          await this.productStore.toggleProduct(productId, false);
        },
      });
    },
    onEnableClicked(productId) {
      this.$dialog.confirm({
        title: "Xác nhận hiện Sản phẩm",
        topContent: "Are you sure you want to enable this product?",
        done: async () => {
          await this.productStore.toggleProduct(productId, true);
        },
      });
    },
    onDeleteClicked(productId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa sản phẩm",
        topContent: "Bạn có chắc bạn muốn xóa Sản phẩm này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.productStore.deleteProduct(productId);
        },
      });
    },
  },
};
</script>
