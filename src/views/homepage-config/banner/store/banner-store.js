import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig } from "@/plugins/api";

export const bannerstore = defineStore("banner", {
  state: () => ({
    bannerPage: 1,
    bannersPerPage: 10,
    bannerCreateDialog: false,
    categories: [],
    banner: {},
    banners: [],
    tempBanners: [],
    favSearchProducts: [],
    bannerUrls: [],
    bannerForm: false,
    searchKey: "",
    isEditing: false,
    bannersIdChosen: [],
    file: null,
  }),
  getters: {
    // slicedbanners() {
    //   if (!this.banners || this.banners.length == 0) return [];
    //   return this.filteredbanners.slice(
    //     (this.bannerPage - 1) * this.bannersPerPage,
    //     this.bannerPage * this.bannersPerPage
    //   );
    // },
    filteredbanners() {
      if (!this.favSearchProducts || this.favSearchProducts.length == 0)
        return [];
      let filtered = this.favSearchProducts;
      if (this.searchKey)
        filtered = filtered.filter(
          (banner) =>
            banner.code.toLowerCase() === this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalbannerPage() {
    //   if (!this.banners || this.filteredbanners.length == 0) return 1;
    //   if (this.filteredbanners.length % this.bannersPerPage == 0)
    //     return this.filteredbanners.length / this.bannersPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredbanners.length / this.bannersPerPage
    //       ) + 1
    //     );
    // },
    slicedbanners() {
      if (!this.banners || this.banners.length == 0) return [];
      return this.banners.slice(
        (this.bannersPage - 1) * this.bannersPerPage,
        this.bannersPage * this.bannersPerPage
      );
    },
    totalbannersPage() {
      if (!this.banners || this.banners.length == 0) return 1;
      if (this.banners.length % this.bannersPerPage == 0)
        return this.banners.length / this.bannersPerPage;
      else return Math.floor(this.banners.length / this.bannersPerPage) + 1;
    },

    totalbanner() {
      if (!this.banners || this.filteredbanners.length == 0) return 1;
      return this.filteredbanners.length;
    },
  },
  actions: {
    updateTempBanners() {
      // if(!event.moved) return;
      // const oldIndex = event.moved.oldIndex;
      // const newIndex = event.moved.newIndex;
      // [this.tempBanners[oldIndex], this.tempBanners[newIndex]] = [this.tempBanners[newIndex], this.tempBanners[oldIndex]];
    },

    async updatebanners() {
      try {
        loading.show();
        this.bannersIdChosen = this.banners
          .filter((banner) => banner.type == "imageUpload")
          .map((banner) => banner.id);
        console.log("bannersIdChosen", this.bannersIdChosen);

        let promises = [];
        for (let i = 0; i < this.banners.length; i++) {
          if (this.banners[i].type == "imageUpload") {
            promises.push(await this.uploadFile(this.banners[i].image));
          }
        }
        const [...uploadedBanner1] = await Promise.all(promises);
        let newURL = uploadedBanner1.map((banner, index) => {
          return {
            id: this.bannersIdChosen[index],
            type: "image",
            url: banner[0],
          };
        });
        console.log("newURL", newURL);
        if (newURL) {
          for (let i = 0; i < newURL.length; i++) {
            this.banners = this.banners.map((banner) =>
              banner.id == newURL[i].id ? newURL[i] : banner
            );
          }
        }
        this.banners = this.banners.map((banner) => banner.url);
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            banners: {
              config: this.banners,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        this.reset();
        await this.fetchbanners();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchbanners() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching banners!",
            "Please try again later!"
          );
          return;
        }
        const banners = get(res, "data.data.[0].attributes.banners.config", []);
        if (!banners && banners.length == 0) return;
        this.tempBanners = banners;
        this.banners = banners.map((banner, index) => {
          return {
            id: index + 1,
            url: banner,
            type: "image",
          };
        });
        console.log("banners", this.banners);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },

    async uploadFile(file) {
      try {
        if (!file) return;

        loading.show();
        const formData = new FormData();
        formData.append("files", file);

        const res = await Common.uploadFile(formData);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const uploadedUrls = res.data.map((data) => data.url);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Upload ảnh thành công!");
        return uploadedUrls;
      } catch (error) {
        alert.error("Error occurred!", error.message);
        return;
      } finally {
        loading.hide();
      }
    },

    reset() {
      this.banner = {};
      this.searchKey = null;
      this.banner = null;
      this.banners = null;
      this.bannerAccreditation = null;
      this.bannerCertification = null;
      this.bannerThumbnail = null;
    },
  },
});
/* eslint-enable */
