import { defineStore } from "pinia";
import { Category, Common, Post } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import { userStore } from "@/stores/userStore";
import router from "@/router";

export const postStore = defineStore("post", {
  state: () => ({
    postForm: false,
    postPage: 1,
    postsPerPage: 10,
    post: {},
    posts: [],
    searchKey: "",
    avatarUrl: [],
    file: null,
    postFile: null,
    categories: [],
    imagePost: false,
    videoPost: false,
    youtubeUrl: "",
  }),
  getters: {
    slicedPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      return this.filteredPosts.slice(
        (this.postPage - 1) * this.postsPerPage,
        this.postPage * this.postsPerPage
      );
    },
    filteredPosts() {
      if (!this.posts || this.posts.length == 0) return [];
      let filtered = this.posts;
      if (this.searchKey)
        filtered = filtered.filter((post) =>
          post.title.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      return filtered;
    },
    // sortedCampaigns() {
    //   if (!this.voucherData || this.voucherData.length == 0) return [];
    //   let sortedCampaigns = this.voucherData;
    //   if (!this.sortBy) return sortedCampaigns;
    //   switch (this.sortBy) {
    //     default:
    //     case "asc":
    //       sortedCampaigns.sort((a, b) => a.title.localeCompare(b.title));
    //       break;
    //     case "desc":
    //       sortedCampaigns.sort((a, b) => b.title.localeCompare(a.title));
    //       break;
    //     case "newest":
    //       sortedCampaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    //       break;
    //     case "oldest":
    //       sortedCampaigns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    //       break;
    //     case "priceUp":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => a.price - b.price);
    //       break;
    //     case "priceDown":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => b.price - a.price);
    //       break;
    //   }
    //   return sortedCampaigns;
    // },
    totalPostPage() {
      if (!this.posts || this.filteredPosts.length == 0) return 1;
      if (this.filteredPosts.length % this.postsPerPage == 0)
        return this.filteredPosts.length / this.postsPerPage;
      else return Math.floor(this.filteredPosts.length / this.postsPerPage) + 1;
    },
    totalPost() {
      if (!this.posts || this.filteredPosts.length == 0) return 1;
      return this.filteredPosts.length;
    },
  },
  actions: {
    reset() {
      this.post = {};
      this.file = null;
      this.postFile = null;
    },

    async fetchPosts() {
      try {
        loading.show();
        const res = await Post.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching news!",
            "Please try again later!"
          );
          return;
        }
        const posts = get(res, "data.data", []);
        if (!posts && posts.length == 0) return;
        const mappedPosts = posts.map((post) => {
          return {
            id: post.id,
            ...post.attributes,
            postCategory: {
              id: get(post, "attributes.postCategory.data.id", -1),
              ...get(post, "attributes.postCategory.data.attributes", {}),
            },
            author: get(post, "attributes.user.data.attributes", {
              username: "Admin",
            }),
          };
        });
        this.posts = mappedPosts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    //Marked: For Text Editor
    async uploadFile(file) {
      try {
        loading.show();
        if (!file) return;
        const formData = new FormData();
        formData.append("files", file);
        const res = await Common.uploadFile(formData);
        if (!res) {
          alert.error(`Error occurred Upload File! Please try again later!`);
        }
        const uploadedUrls = res.data.map((data) => data.url);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Upload ảnh thành công!");
        return uploadedUrls;
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await Category.fetchCategory();
        if (!res) {
          alert.error(`Error occurred fetch! Please try again later!`);
          return;
        }
        const categories = get(res, "data.data", []);
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
          };
        });
        this.categories = mappedCategories;
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async createNewPost() {
      try {
        loading.show();
        //upload images
        const uploadedThumbnail = await this.uploadFile(this.file);
        const uploadedFile = await this.uploadFile(this.postFile);
        let query = null;
        if (this.post.postCategory.name == "Ảnh") {
          query = {
            ...this.post,
            postCategory: this.post.postCategory.id,
            imageContent: uploadedFile ? uploadedFile : [],
            images: uploadedThumbnail ? uploadedThumbnail[0] : "",
            status: "publish",
            user: userStore().userData.id,
          };
        } else if (this.post.postCategory.name == "Video") {
          if (!this.postFile) {
            query = {
              ...this.post,
              videoContent: this.youtubeUrl ? this.youtubeUrl : "",
              postCategory: this.post.postCategory.id,
              images: uploadedThumbnail ? uploadedThumbnail[0] : "",
              status: "publish",
              user: userStore().userData.id,
            };
          } else {
            query = {
              ...this.post,
              postCategory: this.post.postCategory.id,
              videoContent: uploadedFile ? uploadedFile[0] : "",
              images: uploadedThumbnail ? uploadedThumbnail[0] : "",
              status: "publish",
              user: userStore().userData.id,
            };
          }
        } else {
          query = {
            ...this.post,
            postCategory: this.post.postCategory.id,
            images: uploadedThumbnail ? uploadedThumbnail[0] : "",
            status: "publish",
            user: userStore().userData.id,
          };
        }

        const res = await Post.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo bài viết mới thành công!");
        router.push("/news");
      } catch (error) {
        alert.error("Create post fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updatePost() {
      try {
        if (!this.post) return;
        loading.show();
        //upload images
        const uploadedThumbnail = await this.uploadFile(this.file);
        const uploadedFile = await this.uploadFile(this.postFile);
        let query = null;
        if (this.post.postCategory.name == "Ảnh") {
          query = {
            ...this.post,
            postCategory: this.post.postCategory.id,
            imageContent: uploadedFile ? uploadedFile : this.post.imageContent,
            images: uploadedThumbnail ? uploadedThumbnail[0] : this.post.images,
            status: "publish",
          };
        } else if (this.post.postCategory.name == "Video") {
          if (!this.postFile) {
            query = {
              ...this.post,
              postCategory: this.post.postCategory.id,
              videoContent: this.youtubeUrl ? this.youtubeUrl : "",
              images: uploadedThumbnail
                ? uploadedThumbnail[0]
                : this.post.images,
              status: "publish",
            };
          } else {
            query = {
              ...this.post,
              postCategory: this.post.postCategory.id,
              videoContent: uploadedFile
                ? uploadedFile[0]
                : this.post.videoContent,
              images: uploadedThumbnail
                ? uploadedThumbnail[0]
                : this.post.images,
              status: "publish",
            };
          }
        } else {
          query = {
            ...this.post,
            postCategory: this.post.postCategory.id,
            images: uploadedThumbnail ? uploadedThumbnail[0] : this.post.images,
            status: "publish",
          };
        }
        const res = await Post.update(this.post.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật bài viết mới thành công!");
        router.push("/news");
      } catch (error) {
        alert.error("Create post fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async togglePost(postId, isActive) {
      if (!postId) return;
      try {
        loading.show();
        const res = await Post.update(postId, {
          data: {
            status: isActive ? "publish" : "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`${isActive ? "Hiện" : "Ẩn"}  bài viết thành công!`);
        await this.fetchPosts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async deletePost(postId) {
      if (!postId) return;
      try {
        loading.show();
        const res = await Post.remove(postId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa bài viết thành công!");
        await this.fetchPosts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },

  },
});
/* eslint-enable */
