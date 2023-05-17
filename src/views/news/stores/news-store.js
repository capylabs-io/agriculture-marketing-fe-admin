import { defineStore } from "pinia";
import { Category, Post, User } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";

export const postStore = defineStore("post", {
  state: () => ({
    postPage: 1,
    postsPerPage: 10,
    post: {},
    posts: [],
    searchKey: "",
    avatarUrl: [],
    file: null,
    category: [],
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
    totalVoucherPage() {
      if (!this.posts || this.filteredPosts.length == 0) return 1;
      if (this.filteredPosts.length % this.postsPerPage == 0)
        return this.filteredPosts.length / this.postsPerPage;
      else return Math.floor(this.filteredPosts.length / this.postsPerPage) + 1;
    },
  },
  actions: {
    async fetchPosts() {
      try {
        loading.show();
        const res = await Post.fetch({});
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
            postCategory: get(post, "attributes.postCategory", {}),
          };
        });
        this.posts = mappedPosts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async uploadFile() {
      try {
        loading.show();
        const formData = new FormData();
        formData.append("files", this.file);
        console.log("callapi", formData);
        const filedata = await User.uploadFile(formData);
        if (!filedata) {
          alert.error(`Error occurred Upload File! Please try again later!`);
        }
        this.avatarUrl = filedata.data.map((index) => index.url);
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async fetchCategory() {
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
        this.category = mappedCategories;
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async createNewPost() {
      if (this.avatarUrl) {
        try {
          loading.show();
          const res = await Post.createPost({
            data: {
              ...this.post,
              images: this.avatarUrl[0],
              content: `<p>${this.post.content}</p>`,
            },
          });
          if (!res) {
            alert.error(`Error occurred Update! Please try again later!`);
            return;
          }
          console.log("post ", res.data);
          alert.success("Update successfully!");
        } catch (error) {
          console.error(`Error: ${error}`);
          alert.error(error);
        } finally {
          loading.hide();
        }
      }
    },
  },
});
/* eslint-enable */
