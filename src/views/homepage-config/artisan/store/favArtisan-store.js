import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig, Artisan } from "@/plugins/api";

export const favArtisanStore = defineStore("favArtisan", {
  state: () => ({
    favArtisanPage: 1,
    favArtisansPerPage: 10,
    favArtisanCreateDialog: false,
    categories: [],
    favArtisan: {},
    favArtisans: [],
    favSearchartisans: [],
    favArtisanCodes: [],
    favArtisanThumbnail: null,
    favArtisanCertification: null,
    favArtisanAccreditation: null,
    favArtisanForm: false,
    searchKey: "",
  }),
  getters: {
    // slicedfavArtisans() {
    //   if (!this.favArtisans || this.favArtisans.length == 0) return [];
    //   return this.filteredfavArtisans.slice(
    //     (this.favArtisanPage - 1) * this.favArtisansPerPage,
    //     this.favArtisanPage * this.favArtisansPerPage
    //   );
    // },
    filteredfavArtisans() {
      if (!this.favSearchartisans || this.favSearchartisans.length == 0)
        return [];
      let filtered = this.favSearchartisans;
      if (this.searchKey)
        filtered = filtered.filter(
          (favArtisan) =>
            favArtisan.code.toLowerCase() ===
            this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalfavArtisanPage() {
    //   if (!this.favArtisans || this.filteredfavArtisans.length == 0) return 1;
    //   if (this.filteredfavArtisans.length % this.favArtisansPerPage == 0)
    //     return this.filteredfavArtisans.length / this.favArtisansPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredfavArtisans.length / this.favArtisansPerPage
    //       ) + 1
    //     );
    // },
    slicedfavArtisans() {
      if (!this.favArtisans || this.favArtisans.length == 0) return [];
      return this.favArtisans.slice(
        (this.favArtisansPage - 1) * this.favArtisansPerPage,
        this.favArtisansPage * this.favArtisansPerPage
      );
    },
    totalfavArtisansPage() {
      if (!this.favArtisans || this.favArtisans.length == 0) return 1;
      if (this.favArtisans.length % this.favArtisansPerPage == 0)
        return this.favArtisans.length / this.favArtisansPerPage;
      else
        return (
          Math.floor(this.favArtisans.length / this.favArtisansPerPage) + 1
        );
    },

    totalfavArtisan() {
      if (!this.favArtisans || this.filteredfavArtisans.length == 0) return 1;
      return this.filteredfavArtisans.length;
    },
  },
  actions: {
    // async fetchfavArtisans() {
    //   try {
    //     loading.show();
    //     const res = await artisan.fetch({
    //       populate: "*",
    //       // filters: {
    //       //   code: this.favArtisanCodes,
    //       // },
    //     });
    //     if (!res) {
    //       alert.error(
    //         "Error occurred when fetching artisans!",
    //         "Please try again later!"
    //       );
    //       return;
    //     }
    //     const favArtisans = get(res, "data.data", []);
    //     if (!favArtisans && favArtisans.length == 0) return;
    //     const mappedfavArtisans = favArtisans.map((favArtisan) => {
    //       return {
    //         id: favArtisan.id,
    //         ...favArtisan.attributes,
    //         artisanCategory: {
    //           id: get(favArtisan, "attributes.artisanCategory.data.id", -1),
    //           ...get(
    //             favArtisan,
    //             "attributes.artisanCategory.data.attributes",
    //             {}
    //           ),
    //         },
    //         Artisan: {
    //           id: get(favArtisan, "attributes.Artisan.data.id", -1),
    //           ...get(favArtisan, "attributes.Artisan.data.attributes", {}),
    //         },
    //         artisan: {
    //           id: get(favArtisan, "attributes.artisan.data.id", -1),
    //           ...get(favArtisan, "attributes.artisan.data.attributes", {}),
    //         },
    //         store: {
    //           id: get(favArtisan, "attributes.store.data.id", -1),
    //           ...get(favArtisan, "attributes.store.data.attributes", {}),
    //         },
    //         area: {
    //           id: get(favArtisan, "attributes.area.data.id", -1),
    //           ...get(favArtisan, "attributes.area.data.attributes", {}),
    //         },
    //         author: get(favArtisan, "attributes.user.data.attributes", {}),
    //       };
    //     });

    //     // this.favArtisans = mappedfavArtisans;
    //     this.favArtisans = this.favArtisanCodes.map((code) =>
    //       mappedfavArtisans.find((artisan) => artisan.code === code)
    //     );
    //   } catch (error) {
    //     alert.error("Error occurred!", error.message);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    async fetchfavArtisans() {
      try {
        loading.show();
        const res = await Artisan.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching artisans!",
            "Please try again later!"
          );
          return;
        }
        const artisans = get(res, "data.data", []);
        if (!artisans && artisans.length == 0) return;
        const mappedfavArtisans = artisans.map((artisan) => {
          return {
            id: artisan.id,
            ...artisan.attributes,
            artisanCategory: {
              id: get(artisan, "attributes.artisanCategory.data.id", -1),
              ...get(artisan, "attributes.artisanCategory.data.attributes", {}),
            },
          };
        });

        this.favArtisans = this.favArtisanCodes.map((code) =>
          mappedfavArtisans.find((artisan) => artisan.code === code)
        );
        this.favSearchartisans = mappedfavArtisans;
        console.log("favArtisans", this.favArtisans);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },

    async updatefavArtisans() {
      try {
        loading.show();
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            artisians: {
              config: this.favArtisanCodes,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavArtisanCodes();
        await this.fetchfavArtisans();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchfavArtisanCodes() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching favArtisans!",
            "Please try again later!"
          );
          return;
        }
        const favArtisanCodes = get(
          res,
          "data.data.[0].attributes.artisians.config",
          []
        );
        if (!favArtisanCodes) return;
        this.favArtisanCodes = favArtisanCodes;
        console.log("favArtisanCodes", this.favArtisanCodes);
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
      this.favArtisan = {};
      this.searchKey = null;
      this.favArtisanCodes = null;
      this.favArtisan = null;
      this.favArtisans = null;
      this.favSearchartisans = null;
      this.favArtisanAccreditation = null;
      this.favArtisanCertification = null;
      this.favArtisanThumbnail = null;
    },
  },
});
/* eslint-enable */
