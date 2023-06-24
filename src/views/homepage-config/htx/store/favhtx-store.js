import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig, Cooperative } from "@/plugins/api";

export const favhtxStore = defineStore("favhtx", {
  state: () => ({
    favhtxPage: 1,
    favhtxsPerPage: 10,
    favhtxCreateDialog: false,
    categories: [],
    favhtx: {},
    favhtxs: [],
    favSearchhtxs: [],
    favhtxCodes: [],
    favhtxThumbnail: null,
    favhtxCertification: null,
    favhtxAccreditation: null,
    favhtxForm: false,
    searchKey: "",
  }),
  getters: {
    // slicedfavhtxs() {
    //   if (!this.favhtxs || this.favhtxs.length == 0) return [];
    //   return this.filteredfavhtxs.slice(
    //     (this.favhtxPage - 1) * this.favhtxsPerPage,
    //     this.favhtxPage * this.favhtxsPerPage
    //   );
    // },
    filteredfavhtxs() {
      if (!this.favSearchhtxs || this.favSearchhtxs.length == 0) return [];
      let filtered = this.favSearchhtxs;
      if (this.searchKey)
        filtered = filtered.filter(
          (favhtx) =>
            favhtx.code.toLowerCase() === this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalfavhtxPage() {
    //   if (!this.favhtxs || this.filteredfavhtxs.length == 0) return 1;
    //   if (this.filteredfavhtxs.length % this.favhtxsPerPage == 0)
    //     return this.filteredfavhtxs.length / this.favhtxsPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredfavhtxs.length / this.favhtxsPerPage
    //       ) + 1
    //     );
    // },
    slicedfavhtxs() {
      if (!this.favhtxs || this.favhtxs.length == 0) return [];
      return this.favhtxs.slice(
        (this.favhtxsPage - 1) * this.favhtxsPerPage,
        this.favhtxsPage * this.favhtxsPerPage
      );
    },
    totalfavhtxsPage() {
      if (!this.favhtxs || this.favhtxs.length == 0) return 1;
      if (this.favhtxs.length % this.favhtxsPerPage == 0)
        return this.favhtxs.length / this.favhtxsPerPage;
      else return Math.floor(this.favhtxs.length / this.favhtxsPerPage) + 1;
    },

    totalfavhtx() {
      if (!this.favhtxs || this.filteredfavhtxs.length == 0) return 1;
      return this.filteredfavhtxs.length;
    },
  },
  actions: {
    // async fetchfavhtxs() {
    //   try {
    //     loading.show();
    //     const res = await htx.fetch({
    //       populate: "*",
    //       // filters: {
    //       //   code: this.favhtxCodes,
    //       // },
    //     });
    //     if (!res) {
    //       alert.error(
    //         "Error occurred when fetching htxs!",
    //         "Please try again later!"
    //       );
    //       return;
    //     }
    //     const favhtxs = get(res, "data.data", []);
    //     if (!favhtxs && favhtxs.length == 0) return;
    //     const mappedfavhtxs = favhtxs.map((favhtx) => {
    //       return {
    //         id: favhtx.id,
    //         ...favhtx.attributes,
    //         htxCategory: {
    //           id: get(favhtx, "attributes.htxCategory.data.id", -1),
    //           ...get(
    //             favhtx,
    //             "attributes.htxCategory.data.attributes",
    //             {}
    //           ),
    //         },
    //         cooperative: {
    //           id: get(favhtx, "attributes.cooperative.data.id", -1),
    //           ...get(favhtx, "attributes.cooperative.data.attributes", {}),
    //         },
    //         artisan: {
    //           id: get(favhtx, "attributes.artisan.data.id", -1),
    //           ...get(favhtx, "attributes.artisan.data.attributes", {}),
    //         },
    //         store: {
    //           id: get(favhtx, "attributes.store.data.id", -1),
    //           ...get(favhtx, "attributes.store.data.attributes", {}),
    //         },
    //         area: {
    //           id: get(favhtx, "attributes.area.data.id", -1),
    //           ...get(favhtx, "attributes.area.data.attributes", {}),
    //         },
    //         author: get(favhtx, "attributes.user.data.attributes", {}),
    //       };
    //     });

    //     // this.favhtxs = mappedfavhtxs;
    //     this.favhtxs = this.favhtxCodes.map((code) =>
    //       mappedfavhtxs.find((htx) => htx.code === code)
    //     );
    //   } catch (error) {
    //     alert.error("Error occurred!", error.message);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    async fetchfavhtxs() {
      try {
        loading.show();
        const res = await Cooperative.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching htxs!",
            "Please try again later!"
          );
          return;
        }
        const htxs = get(res, "data.data", []);
        if (!htxs && htxs.length == 0) return;
        const mappedfavhtxs = htxs.map((htx) => {
          return {
            id: htx.id,
            ...htx.attributes,
            htxCategory: {
              id: get(htx, "attributes.cooperativeCategory.data.id", -1),
              ...get(htx, "attributes.cooperativeCategory.data.attributes", {}),
            },
          };
        });

        this.favhtxs = this.favhtxCodes.map((code) =>
          mappedfavhtxs.find((htx) => htx.code === code)
        );
        this.favSearchhtxs = mappedfavhtxs;
        console.log("favhtxs", this.favhtxs);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },

    async updatefavhtxs() {
      try {
        loading.show();
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            cooperatives: {
              config: this.favhtxCodes,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavhtxCodes();
        await this.fetchfavhtxs();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchfavhtxCodes() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching favhtxs!",
            "Please try again later!"
          );
          return;
        }
        const favhtxCodes = get(
          res,
          "data.data.[0].attributes.cooperatives.config",
          []
        );
        if (!favhtxCodes) return;
        this.favhtxCodes = favhtxCodes;
        console.log("favhtxCodes", this.favhtxCodes);
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
      this.favhtx = {};
      this.searchKey = null;
      this.favhtxCodes = null;
      this.favhtx = null;
      this.favhtxs = null;
      this.favSearchhtxs = null;
      this.favhtxAccreditation = null;
      this.favhtxCertification = null;
      this.favhtxThumbnail = null;
    },
  },
});
/* eslint-enable */
