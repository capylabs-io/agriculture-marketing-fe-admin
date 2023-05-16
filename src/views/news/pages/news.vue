<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý bài viết</div>
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
        to="/write-post"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm bài viết</div>
      </v-btn>
    </div>
    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
        <template v-slot:[`item.title`]="{ item }">
          <div class="text-start">
            {{ item.title }}
          </div>
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
          id: "000001",
          title:
            "Lớp tập huấn an toàn thực phẩm và truy xuất nguồn gốc nông, lâm và thuỷ sản",
          category: "Tin tức",
          publishedAt: "19/04/2023",
          author: "Phùng Thanh Độ",
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
          text: "Tên bài viết",
          value: "title",
          align: "center",
          width: "40%",
        },
        {
          text: "Danh mục",
          value: "category",
          align: "center",
        },
        {
          text: "Ngày đăng",
          value: "publishedAt",
          align: "center",
          sortable: false,
        },
        {
          text: "Người viết",
          value: "author",
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
};
</script>