<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý vật tư</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="supplyStore.searchKey"
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
        to="/create-supply"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm vật tư</div>
      </v-btn>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table
        :headers="headers"
        :items="supplyStore.slicedSupplies"
        :items-per-page="supplyStore.suppliesPerPage"
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
          v-model="supplyStore.suppliesPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="supplyStore.totalSupply"
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
        :length="supplyStore.totalSupplyPage"
        v-model="supplyStore.supplyPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { supplyStore } from "../store/supply-store";
import router from "@/router";
export default {
  data() {
    return {
      items: [
        {
          thumbnail: require("@/assets/components/landing/image-2.webp"),
          name: "Thuốc trừ sâu ABC",
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
  computed: {
    ...mapStores(supplyStore),
  },
  created() {
    this.supplyStore.fetchSupplies();
  },
  methods: {
    getImageUrl(url) {
      if (!url) return require("@/assets/no-image.png");
      return url;
    },
    onOpenClicked(code) {
      const link = process.env.VUE_APP_USER_PAGE + "vat-tu/" + code;
      window.open(link);
    },
    onEditClicked(item) {
      console.log("item", item);
      this.supplyStore.supply = item;
      this.supplyStore.supply.supplyCategory = item.supplyCategory.id;
      router.push("/edit-supply");
    },
    onDisableClicked(supplyId) {
      this.$dialog.confirm({
        title: "Xác nhận ẩn Vật tư",
        topContent:
          "<span class='error--text'>Bạn có chắc muốn ẩn giống này không? Người dùng sẽ không thấy giống này nữa!</span>",
        done: async () => {
          await this.supplyStore.toggleSupply(supplyId, false);
        },
      });
    },
    onEnableClicked(supplyId) {
      this.$dialog.confirm({
        title: "Xác nhận hiện Vật tư",
        topContent: "Bạn có muốn hiện lại Vật tư này không?",
        done: async () => {
          await this.supplyStore.toggleSupply(supplyId, true);
        },
      });
    },
    onDeleteClicked(supplyId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa Vật tư",
        topContent: "Bạn có chắc bạn muốn xóa Vật tư này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.supplyStore.deleteSupply(supplyId);
        },
      });
    },
  },
};
</script>
