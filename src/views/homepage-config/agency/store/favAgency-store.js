import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig, Agency } from "@/plugins/api";

export const favAgencyStore = defineStore("favAgency", {
  state: () => ({
    favAgencyPage: 1,
    favAgencysPerPage: 10,
    favAgencyCreateDialog: false,
    categories: [],
    favAgency: {},
    favAgencys: [],
    favSearchagencys: [],
    favAgencyCodes: [],
    favAgencyThumbnail: null,
    favAgencyCertification: null,
    favAgencyAccreditation: null,
    favAgencyForm: false,
    searchKey: "",
  }),
  getters: {
    // slicedfavAgencys() {
    //   if (!this.favAgencys || this.favAgencys.length == 0) return [];
    //   return this.filteredfavAgencys.slice(
    //     (this.favAgencyPage - 1) * this.favAgencysPerPage,
    //     this.favAgencyPage * this.favAgencysPerPage
    //   );
    // },
    filteredfavAgencys() {
      if (!this.favSearchagencys || this.favSearchagencys.length == 0) return [];
      let filtered = this.favSearchagencys;
      if (this.searchKey)
        filtered = filtered.filter(
          (favAgency) =>
            favAgency.code.toLowerCase() === this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalfavAgencyPage() {
    //   if (!this.favAgencys || this.filteredfavAgencys.length == 0) return 1;
    //   if (this.filteredfavAgencys.length % this.favAgencysPerPage == 0)
    //     return this.filteredfavAgencys.length / this.favAgencysPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredfavAgencys.length / this.favAgencysPerPage
    //       ) + 1
    //     );
    // },
    slicedfavAgencys() {
      if (!this.favAgencys || this.favAgencys.length == 0) return [];
      return this.favAgencys.slice(
        (this.favAgencysPage - 1) * this.favAgencysPerPage,
        this.favAgencysPage * this.favAgencysPerPage
      );
    },
    totalfavAgencysPage() {
      if (!this.favAgencys || this.favAgencys.length == 0) return 1;
      if (this.favAgencys.length % this.favAgencysPerPage == 0)
        return this.favAgencys.length / this.favAgencysPerPage;
      else
        return Math.floor(this.favAgencys.length / this.favAgencysPerPage) + 1;
    },

    totalfavAgency() {
      if (!this.favAgencys || this.filteredfavAgencys.length == 0) return 1;
      return this.filteredfavAgencys.length;
    },
  },
  actions: {
    async fetchfavAgencys() {
      try {
        loading.show();
        const res = await Agency.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching agencys!",
            "Please try again later!"
          );
          return;
        }
        const agencys = get(res, "data.data", []);
        if (!agencys && agencys.length == 0) return;
        const mappedfavAgencys = agencys.map((agency) => {
          return {
            id: agency.id,
            ...agency.attributes,
            agencyCategory: {
              id: get(agency, "attributes.storeCategory.data.id", -1),
              ...get(agency, "attributes.storeCategory.data.attributes", {}),
            },
          };
        });

        this.favAgencys = this.favAgencyCodes.map((code) =>
          mappedfavAgencys.find((agency) => agency.code === code)
        );
        this.favSearchagencys = mappedfavAgencys;
        console.log("favAgencys", this.favAgencys);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },

    async updatefavAgencys() {
      try {
        loading.show();
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            stores: {
              config: this.favAgencyCodes,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavAgencyCodes();
        await this.fetchfavAgencys();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchfavAgencyCodes() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching favAgencys!",
            "Please try again later!"
          );
          return;
        }
        const favAgencyCodes = get(
          res,
          "data.data.[0].attributes.stores.config",
          []
        );
        if (!favAgencyCodes) return;
        this.favAgencyCodes = favAgencyCodes;
        console.log("favAgencyCodes", this.favAgencyCodes);
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
      this.favAgency = {};
      this.searchKey = null;
      this.favAgencyCodes = null;
      this.favAgency = null;
      this.favAgencys = null;
      this.favSearchagencys = null;
      this.favAgencyAccreditation = null;
      this.favAgencyCertification = null;
      this.favAgencyThumbnail = null;
    },
  },
});
/* eslint-enable */
