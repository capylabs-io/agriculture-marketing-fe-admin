<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý văn bản</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="documentStore.searchKey"
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
        to="/create-document"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm văn bản</div>
      </v-btn>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table
        :headers="headers"
        :items="documentStore.slicedDocuments"
        :items-per-page="documentStore.documentsPerPage"
        hide-default-footer
      >
        <template v-slot:[`item.category`]="{ item }">
          <div>
            {{ item.documentCategory.name }}
          </div>
        </template>
        <template v-slot:[`item.numberOf`]="{ item }">
          <div class="text-center">
            {{ item.numberOf }}
          </div>
        </template>
        <template v-slot:[`item.issuer`]="{ item }">
          <div class="text-start">
            {{ item.issuer }}
          </div>
        </template>
        <template v-slot:[`item.title`]="{ item }">
          <div class="text-start">
            {{ item.title }}
          </div>
        </template>
        <template v-slot:[`item.issueDate`]="{ item }">
          <div class="text-center">
            {{ item.issueDate | ddmmyyyy }}
          </div>
        </template>
        <!-- <template v-slot:[`item.title`]="{ item }">
          <div class="text-left">
            {{ item.title }}
          </div>
        </template> -->
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
          v-model="documentStore.documentsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="documentStore.totaldocument"
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
        :length="documentStore.totaldocumentPage"
        v-model="documentStore.documentPage"
      ></v-pagination>
    </div>
  </div>
</template>
ontact

<script>
import { mapStores } from "pinia";
import { documentStore } from "../store/document-store";
import router from "@/router";
export default {
  computed: {
    ...mapStores(documentStore),
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
          text: "Số ký hiệu",
          value: "numberOf",
          align: "center",
          sortable: false,
        },

        {
          text: "Người phát hành",
          value: "issuer",
          align: "center",
        },
        {
          text: "Tiêu đề",
          value: "title",
          align: "center",
          width: "300px",
        },
        {
          text: "Ngày phát hành",
          value: "issueDate",
          align: "center",
        },
        {
          text: "Loại văn bản",
          value: "category",
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
    this.documentStore.fetchDocuments();
  },
  methods: {
    onOpenClicked(code) {
      const link = process.env.VUE_APP_USER_PAGE + "tai-lieu/" + code;
      window.open(link);
    },
    onEditClicked(item) {
      this.documentStore.document = item;
      this.documentStore.document.documentCategory = item.documentCategory.id;
      router.push("/edit-document");
    },
    // onDisableClicked(documentId) {
    //   this.$dialog.confirm({
    //     title: "Xác nhận ẩn Giống",
    //     topContent:
    //       "<span class='error--text'>Bạn có chắc muốn ẩn giống này không? Người dùng sẽ không thấy giống này nữa!</span>",
    //     done: async () => {
    //       await this.documentStore.toggledocument(documentId, false);
    //     },
    //   });
    // },
    // onEnableClicked(documentId) {
    //   this.$dialog.confirm({
    //     title: "Xác nhận hiện Giống",
    //     topContent: "Bạn có muốn hiện lại Giống này không?",
    //     done: async () => {
    //       await this.documentStore.toggledocument(documentId, true);
    //     },
    //   });
    // },
    onDeleteClicked(documentId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa văn bản",
        topContent: "Bạn có chắc bạn muốn xóa văn bản này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.documentStore.deletedocument(documentId);
        },
      });
    },
  },
};
</script>
