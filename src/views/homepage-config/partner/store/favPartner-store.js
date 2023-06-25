import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig } from "@/plugins/api";
import moment from "moment";

export const favPartnerStore = defineStore("favPartner", {
  state: () => ({
    favPartnerPage: 1,
    favPartnersPerPage: 10,
    favPartnerCreateDialog: false,
    categories: [],
    favPartner: {},
    favPartners: [],
    favSearchPartners: [],
    favPartnerCodes: [],
    favPartnerThumbnail: null,
    favPartnerCertification: null,
    favPartnerAccreditation: null,
    favPartnerForm: false,
    searchKey: "",
    partnerLogo: null,
  }),
  getters: {
    // slicedfavPartners() {
    //   if (!this.favPartners || this.favPartners.length == 0) return [];
    //   return this.filteredfavPartners.slice(
    //     (this.favPartnerPage - 1) * this.favPartnersPerPage,
    //     this.favPartnerPage * this.favPartnersPerPage
    //   );
    // },
    filteredfavPartners() {
      if (!this.favPartners || this.favPartners.length == 0) return [];
      let filtered = this.favPartners;
      if (this.searchKey)
        filtered = filtered.filter(
          (favPartner) =>
            favPartner.code.toLowerCase() ===
            this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalfavPartnerPage() {
    //   if (!this.favPartners || this.filteredfavPartners.length == 0) return 1;
    //   if (this.filteredfavPartners.length % this.favPartnersPerPage == 0)
    //     return this.filteredfavPartners.length / this.favPartnersPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredfavPartners.length / this.favPartnersPerPage
    //       ) + 1
    //     );
    // },
    slicedfavPartners() {
      if (!this.favPartners || this.favPartners.length == 0) return [];
      return this.favPartners.slice(
        (this.favPartnersPage - 1) * this.favPartnersPerPage,
        this.favPartnersPage * this.favPartnersPerPage
      );
    },
    totalfavPartnersPage() {
      if (!this.favPartners || this.favPartners.length == 0) return 1;
      if (this.favPartners.length % this.favPartnersPerPage == 0)
        return this.favPartners.length / this.favPartnersPerPage;
      else
        return (
          Math.floor(this.favPartners.length / this.favPartnersPerPage) + 1
        );
    },

    totalfavPartner() {
      if (!this.favPartners || this.filteredfavPartners.length == 0) return 1;
      return this.filteredfavPartners.length;
    },
  },
  actions: {
    changePartnerLogo(image) {
      if (!image) return;
      this.partnerLogo = image;
    },
    // async fetchfavPartners() {
    //   try {
    //     loading.show();
    //     const res = await Cooperative.fetch({
    //       populate: "*",
    //     });
    //     if (!res) {
    //       alert.error(
    //         "Error occurred when fetching Partners!",
    //         "Please try again later!"
    //       );
    //       return;
    //     }
    //     const Partners = get(res, "data.data", []);
    //     if (!Partners && Partners.length == 0) return;
    //     const mappedfavPartners = Partners.map((Partner) => {
    //       return {
    //         id: Partner.id,
    //         ...Partner.attributes,
    //         PartnerCategory: {
    //           id: get(Partner, "attributes.cooperativeCategory.data.id", -1),
    //           ...get(Partner, "attributes.cooperativeCategory.data.attributes", {}),
    //         },
    //       };
    //     });

    //     this.favPartners = this.favPartnerCodes.map((code) =>
    //       mappedfavPartners.find((Partner) => Partner.code === code)
    //     );
    //     this.favSearchPartners = mappedfavPartners;
    //     console.log("favPartners", this.favPartners);
    //   } catch (error) {
    //     alert.error("Error occurred!", error.message);
    //   } finally {
    //     loading.hide();
    //   }
    // },

    async createfavPartners() {
      try {
        loading.show();
        let uploadedIconUrl = "";

        if (this.partnerLogo) {
          const res = await this.uploadFile(this.partnerLogo);
          if (!res) {
            alert.error(
              "Error occurred when uploading image!",
              "Please try again later!"
            );
            return;
          }
          uploadedIconUrl = res;
        }
        const favPartner = {
          ...this.favPartner,
          createdAt: moment.now(),
          partnerUrl: uploadedIconUrl[0],
        };

        this.favPartners.push(favPartner);
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            partners: {
              config: this.favPartners,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavPartnerCodes();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async updatefavPartners() {
      try {
        loading.show();
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            partners: {
              config: this.favPartners,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavPartnerCodes();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchfavPartnerCodes() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching favPartners!",
            "Please try again later!"
          );
          return;
        }
        const favPartnerCodes = get(
          res,
          "data.data.[0].attributes.partners.config",
          []
        );
        if (!favPartnerCodes) return;
        this.favPartnerCodes = favPartnerCodes;
        this.favPartners = favPartnerCodes;
        console.log("favPartnerCodes", this.favPartnerCodes);
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
      this.favPartner = {};
      this.searchKey = null;
      this.favPartnerCodes = null;
      this.favPartner = null;
      this.favPartners = null;
      this.favSearchPartners = null;
      this.favPartnerAccreditation = null;
      this.favPartnerCertification = null;
      this.favPartnerThumbnail = null;
    },
  },
});
/* eslint-enable */
