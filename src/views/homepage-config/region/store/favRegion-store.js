import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig, Area } from "@/plugins/api";

export const favRegionStore = defineStore("favRegion", {
  state: () => ({
    favRegionPage: 1,
    favRegionsPerPage: 10,
    favRegionCreateDialog: false,
    categories: [],
    favRegion: {},
    favRegions: [],
    favSearchRegions: [],
    favRegionCodes: [],
    favRegionThumbnail: null,
    favRegionCertification: null,
    favRegionAccreditation: null,
    favRegionForm: false,
    searchKey: "",
  }),
  getters: {
    // slicedfavRegions() {
    //   if (!this.favRegions || this.favRegions.length == 0) return [];
    //   return this.filteredfavRegions.slice(
    //     (this.favRegionPage - 1) * this.favRegionsPerPage,
    //     this.favRegionPage * this.favRegionsPerPage
    //   );
    // },
    filteredfavRegions() {
      if (!this.favSearchRegions || this.favSearchRegions.length == 0)
        return [];
      let filtered = this.favSearchRegions;
      if (this.searchKey)
        filtered = filtered.filter(
          (favRegion) =>
            favRegion.code.toLowerCase() === this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalfavRegionPage() {
    //   if (!this.favRegions || this.filteredfavRegions.length == 0) return 1;
    //   if (this.filteredfavRegions.length % this.favRegionsPerPage == 0)
    //     return this.filteredfavRegions.length / this.favRegionsPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredfavRegions.length / this.favRegionsPerPage
    //       ) + 1
    //     );
    // },
    slicedfavRegions() {
      if (!this.favRegions || this.favRegions.length == 0) return [];
      return this.favRegions.slice(
        (this.favRegionsPage - 1) * this.favRegionsPerPage,
        this.favRegionsPage * this.favRegionsPerPage
      );
    },
    totalfavRegionsPage() {
      if (!this.favRegions || this.favRegions.length == 0) return 1;
      if (this.favRegions.length % this.favRegionsPerPage == 0)
        return this.favRegions.length / this.favRegionsPerPage;
      else
        return Math.floor(this.favRegions.length / this.favRegionsPerPage) + 1;
    },

    totalfavRegion() {
      if (!this.favRegions || this.filteredfavRegions.length == 0) return 1;
      return this.filteredfavRegions.length;
    },
  },
  actions: {
    // async fetchfavRegions() {
    //   try {
    //     loading.show();
    //     const res = await Region.fetch({
    //       populate: "*",
    //       // filters: {
    //       //   code: this.favRegionCodes,
    //       // },
    //     });
    //     if (!res) {
    //       alert.error(
    //         "Error occurred when fetching Regions!",
    //         "Please try again later!"
    //       );
    //       return;
    //     }
    //     const favRegions = get(res, "data.data", []);
    //     if (!favRegions && favRegions.length == 0) return;
    //     const mappedfavRegions = favRegions.map((favRegion) => {
    //       return {
    //         id: favRegion.id,
    //         ...favRegion.attributes,
    //         RegionCategory: {
    //           id: get(favRegion, "attributes.RegionCategory.data.id", -1),
    //           ...get(
    //             favRegion,
    //             "attributes.RegionCategory.data.attributes",
    //             {}
    //           ),
    //         },
    //         Area: {
    //           id: get(favRegion, "attributes.Area.data.id", -1),
    //           ...get(favRegion, "attributes.Area.data.attributes", {}),
    //         },
    //         artisan: {
    //           id: get(favRegion, "attributes.artisan.data.id", -1),
    //           ...get(favRegion, "attributes.artisan.data.attributes", {}),
    //         },
    //         store: {
    //           id: get(favRegion, "attributes.store.data.id", -1),
    //           ...get(favRegion, "attributes.store.data.attributes", {}),
    //         },
    //         area: {
    //           id: get(favRegion, "attributes.area.data.id", -1),
    //           ...get(favRegion, "attributes.area.data.attributes", {}),
    //         },
    //         author: get(favRegion, "attributes.user.data.attributes", {}),
    //       };
    //     });

    //     // this.favRegions = mappedfavRegions;
    //     this.favRegions = this.favRegionCodes.map((code) =>
    //       mappedfavRegions.find((Region) => Region.code === code)
    //     );
    //   } catch (error) {
    //     alert.error("Error occurred!", error.message);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    async fetchfavRegions() {
      try {
        loading.show();
        const res = await Area.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching Regions!",
            "Please try again later!"
          );
          return;
        }
        const Regions = get(res, "data.data", []);
        if (!Regions && Regions.length == 0) return;
        const mappedfavRegions = Regions.map((region) => {
          return {
            id: region.id,
            ...region.attributes,
            regionCategory: {
              id: get(region, "attributes.areaCategory.data.id", -1),
              ...get(region, "attributes.areaCategory.data.attributes", {}),
            },
            author: get(region, "attributes.user.data.attributes", {}),
          };
        });

        this.favRegions = this.favRegionCodes.map((code) =>
          mappedfavRegions.find((Region) => Region.code === code)
        );
        this.favSearchRegions = mappedfavRegions;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },

    async updatefavRegions() {
      try {
        loading.show();
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            areas: {
              config: this.favRegionCodes,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavRegionCodes();
        await this.fetchfavRegions();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchfavRegionCodes() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching favRegions!",
            "Please try again later!"
          );
          return;
        }
        const favRegionCodes = get(
          res,
          "data.data.[0].attributes.areas.config",
          []
        );
        if (!favRegionCodes) return;
        this.favRegionCodes = favRegionCodes;
        console.log("favRegionCodes", this.favRegionCodes);
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
      this.favRegion = {};
      this.searchKey = null;
      this.favRegionCodes = null;
      this.favRegion = null;
      this.favRegions = null;
      this.favSearchRegions = null;
      this.favRegionAccreditation = null;
      this.favRegionCertification = null;
      this.favRegionThumbnail = null;
    },
  },
});
/* eslint-enable */
