<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý hỏi đáp</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="faqStore.searchKey"
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
        to="/create-faq"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm mới</div>
      </v-btn>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table
        :headers="headers"
        :items="faqStore.slicedfaqs"
        :items-per-page="faqStore.faqsPerPage"
        hide-default-footer
      >
        <template v-slot:[`item.category`]="{ item }">
          <div>
            {{ item.faqCategory.name }}
          </div>
        </template>
        <template v-slot:[`item.question`]="{ item }">
          <div class="text-left">
            {{ item.question }}
          </div>
        </template>
        <template v-slot:[`item.anwser`]="{ item }">
          <div class="text-left">
            {{ item.anwser }}
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
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
            <v-btn icon dense @click="onOpenClicked()"
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
          v-model="faqStore.faqsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="faqStore.totalfaq"
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
        :length="faqStore.totalfaqPage"
        v-model="faqStore.faqPage"
      ></v-pagination>
    </div>
  </div>
</template>
ontact

<script>
import { mapStores } from "pinia";
import { faqStore } from "../store/faq-store";
import router from "@/router";
export default {
  computed: {
    ...mapStores(faqStore),
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
          text: "ID",
          value: "id",
          align: "center",
          sortable: false,
        },

        {
          text: "Câu hỏi",
          value: "question",
          align: "center",
          width: "300px",
        },
        {
          text: "Trả lời",
          value: "anwser",
          align: "center",
          sortable: false,
          width: "400px",
        },
        {
          text: "Ngày tạo",
          value: "createdAt",
          align: "center",
        },
        {
          text: "Loại câu hỏi",
          value: "category",
          align: "center",
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
    this.faqStore.fetchfaqs();
  },
  methods: {
    onOpenClicked() {
      const link = process.env.VUE_APP_USER_PAGE + "hoi-dap/";
      window.open(link);
    },
    // onRowClicked(faq) {

    //   this.$router.push("/partner/" + faq.id);
    // },
    onEditClicked(item) {
      this.faqStore.faq = item;
      this.faqStore.faq.faqCategory = item.faqCategory.id;
      router.push("/edit-faq");
    },
    // onDisableClicked(faqId) {
    //   this.$dialog.confirm({
    //     title: "Xác nhận ẩn Giống",
    //     topContent:
    //       "<span class='error--text'>Bạn có chắc muốn ẩn giống này không? Người dùng sẽ không thấy giống này nữa!</span>",
    //     done: async () => {
    //       await this.faqStore.togglefaq(faqId, false);
    //     },
    //   });
    // },
    // onEnableClicked(faqId) {
    //   this.$dialog.confirm({
    //     title: "Xác nhận hiện Giống",
    //     topContent: "Bạn có muốn hiện lại Giống này không?",
    //     done: async () => {
    //       await this.faqStore.togglefaq(faqId, true);
    //     },
    //   });
    // },
    onDeleteClicked(faqId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa Giống",
        topContent: "Bạn có chắc bạn muốn xóa Giống này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.faqStore.deletefaq(faqId);
        },
      });
    },
  },
};
</script>
