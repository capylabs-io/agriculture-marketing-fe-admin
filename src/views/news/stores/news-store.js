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
    listPostImages: null,
    categories: [],
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
        console.log("posts", this.posts);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
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
        let query = {
          ...this.post,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          status: "publish",
          user: userStore().userData.id,
        };

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
        let query = {
          ...this.post,
          images: uploadedThumbnail ? uploadedThumbnail[0] : this.post.images,
          status: "publish",
        };

        console.log("query", query);

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
        alert.success("Xóa sản phẩm thành công!");
        await this.fetchPosts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },

    // async createNewPost() {
    //   if (this.avatarUrl) {
    //     try {
    //       loading.show();
    //       const res = await Post.createPost({
    //         data: {
    //           ...this.post,
    //           images: this.avatarUrl[0],
    //           content: `<p>${this.post.content}</p>`,
    //         },
    //       });
    //       if (!res) {
    //         alert.error(`Error occurred Update! Please try again later!`);
    //         return;
    //       }
    //       alert.success("Tạo bài viết mới thành công!");
    //       this.reset();
    //       router.push("/news");
    //     } catch (error) {
    //       console.error(`Error: ${error}`);
    //       alert.error(error);
    //     } finally {
    //       loading.hide();
    //     }
    //   }
    // },
  },
});
/* eslint-enable */
