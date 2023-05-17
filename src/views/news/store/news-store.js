import { defineStore } from "pinia";
import { Post } from "@/plugins/api.js";
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
          alert.error("Error occurred when fetching news!", "Please try again later!");
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
    // async fetchVoucher() {
    //   const user = userStore();
    //   try {
    //     loading.show();
    //     const res = await Voucher.fetchVouchers();
    //     if (!res) {
    //       alert.error(`Error occurred! Please try again later!`);
    //       return;
    //     }
    //     this.voucherData = res.data;
    //     this.voucherDataId = this.voucherData.map((index) => index.id);
    //   } catch (error) {
    //     console.error(`Error: ${error}`);
    //     alert.error(error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
  },
});
/* eslint-enable */
