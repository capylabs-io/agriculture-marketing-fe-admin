<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="text-dp-md font-weight-semibold">Quản lý bài viết</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="postStore.searchKey"
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
      <v-data-table
        :headers="headers"
        :items="postStore.slicedPosts"
        :items-per-page="postStore.postsPerPage"
        hide-default-footer
      >
        <template v-slot:[`item.title`]="{ item }">
          <div class="text-start">
            {{ item.title }}
          </div>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <div class="text-start">
            {{ item.postCategory.name }}
          </div>
        </template>
        <template v-slot:[`item.author`]="{ item }">
          <div class="text-start">
            {{ item.author.username }}
          </div>
        </template>
        <template v-slot:[`item.publishedAt`]="{ item }">
          <div class="text-center">
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
            <v-btn icon dense @click.stop="onEditClicked(item)"
              ><v-icon>mdi-pencil-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onDeleteClicked(item.id)"
              ><v-icon>mdi-delete-outline</v-icon></v-btn
            >
            <v-btn icon dense @click="onOpenClicked(item.id)"
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
          v-model="postStore.postsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="postStore.totalPost"
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
        :length="postStore.totalPostPage"
        v-model="postStore.postPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { postStore } from "../stores/news-store";
import router from "@/router";
export default {
  computed: {
    ...mapStores(postStore),
  },
  created() {
    this.postStore.fetchPosts();
  },
  data() {
    return {
      itemsPerPage: [10, 50, 100],
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Tên bài viết",
          value: "title",
          align: "center",
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
  methods: {
    onOpenClicked(id) {
      const link = process.env.VUE_APP_USER_PAGE + "bai-viet/" + id;
      window.open(link);
    },
    onEditClicked(item) {
      console.log("select post", item);
      this.postStore.post = item;
      this.postStore.post.postCategory = item.postCategory;
      router.push("/edit-post");
    },
    onDisableClicked(postId) {
      this.$dialog.confirm({
        title: "Xác nhận ẩn Bài viết",
        topContent:
          "<span class='error--text'>Bạn có chắc muốn ẩn sản phẩm này không? Người dùng sẽ không thấy sản phẩm này nữa!</span>",
        done: async () => {
          await this.postStore.togglePost(postId, false);
        },
      });
    },
    onEnableClicked(postId) {
      this.$dialog.confirm({
        title: "Xác nhận hiện Bài viết",
        topContent: "Are you sure you want to enable this post?",
        done: async () => {
          await this.postStore.togglePost(postId, true);
        },
      });
    },
    onDeleteClicked(postId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa Bài viết",
        topContent: "Bạn có chắc bạn muốn xóa Bài viết này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.postStore.deletePost(postId);
        },
      });
    },
  },
};
</script>
