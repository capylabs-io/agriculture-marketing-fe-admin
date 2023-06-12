import { defineStore } from "pinia";
import { Agency, storeCategory, Common } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const agencyStore = defineStore("agency", {
  state: () => ({
    agencyPage: 1,
    agencysPerPage: 10,
    categories: [],
    agency: {},
    agencys: [],
    agencyThumbnail: null,
    agencyCertification: null,
    agencyAccreditation: null,
    agencyForm: false,
    searchKey: "",
    file: null,
    thumbnail: null,
    certification: null,
  }),
  getters: {
    slicedagencys() {
      if (!this.agencys || this.agencys.length == 0) return [];
      return this.filteredagencys.slice(
        (this.agencyPage - 1) * this.agencysPerPage,
        this.agencyPage * this.agencysPerPage
      );
    },
    filteredagencys() {
      if (!this.agencys || this.agencys.length == 0) return [];
      let filtered = this.agencys;
      if (this.searchKey)
        filtered = filtered.filter(
          (agency) =>
            agency.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            agency.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
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
    totalagencyPage() {
      if (!this.agencys || this.filteredagencys.length == 0) return 1;
      if (this.filteredagencys.length % this.agencysPerPage == 0)
        return this.filteredagencys.length / this.agencysPerPage;
      else
        return (
          Math.floor(this.filteredagencys.length / this.agencysPerPage) + 1
        );
    },
    totalagency() {
      if (!this.agencys || this.filteredagencys.length == 0) return 1;
      return this.filteredagencys.length;
    },
  },
  actions: {
    async fetchagencys() {
      try {
        loading.show();
        const res = await Agency.fetch({
          sort: "updatedAt:desc",
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
        const mappedagencys = agencys.map((agency) => {
          return {
            id: agency.id,
            ...agency.attributes,
            storeCategory: {
              id: get(agency, "attributes.storeCategory.data.id", -1),
              ...get(agency, "attributes.storeCategory.data.attributes", {}),
            },
          };
        });

        this.agencys = mappedagencys;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await storeCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching agency categories!",
            "Please try again later!"
          );
          return;
        }
        const categories = get(res, "data.data", []);
        if (!categories && categories.length == 0) return;
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
          };
        });
        this.categories = mappedCategories;
        this.categoryDictionary = Object.fromEntries(
          this.categories.map((x) => [x.id, x.name])
        );
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async createagency() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.thumbnail),
          await this.uploadFile(this.certification),
        ];

        const [uploadedThumbnail, uploadedCertification] = await Promise.all(
          promises
        );
        let query = {
          ...this.agency,
          storeCategory: this.agency.storeCategory,
          thumbnail: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certification: {
            quality: uploadedCertification ? uploadedCertification : [],
          },
        };

        const res = await Agency.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo mới thành công!");
        router.push("/agency");
      } catch (error) {
        alert.error("Create agency fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updateagency() {
      try {
        if (!this.agency) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.thumbnail),
          await this.uploadFile(this.certification),
        ];

        const [uploadedThumbnail, uploadedCertification] = await Promise.all(
          promises
        );

        let query = {
          ...this.agency,
          storeCategory: this.agency.storeCategory,
          thumbnail: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.agency.thumbnail,
          certification: {
            quality: uploadedCertification
              ? uploadedCertification
              : this.agency.certification.quality,
          },
        };

        const res = await Agency.update(this.agency.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật thành công!");
        router.push("/agency");
      } catch (error) {
        alert.error("Create agency fail! Please try again later!");
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
    async toggleagency(agencyId) {
      try {
        loading.show();
        const res = await Agency.fetch({
          sort: "updatedAt:desc",
          populate: "*",
          filters: {
            code: agencyId,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const agencys = get(res, "data.data", []);
        if (!agencys || agencys.length == 0) return;
        this.agency = {
          id: agencys[0],
          ...agencys[0].attributes,
          storeCategory: get(
            agencys[0],
            "attributes.storeCategory.data.attributes.name",
            []
          ),
          products: get(agencys[0], "attributes.products.data", []),
        };
        this.products = this.agency.products
          .filter((product) => product.attributes.status == "publish")
          .map((product) => {
            return {
              id: product.id,
              ...product.attributes,
            };
          });
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async deleteagency(agencyId) {
      if (!agencyId) return;
      try {
        loading.show();
        const res = await Agency.remove(agencyId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa thành công!");
        await this.fetchagencys();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.agency = {};
      this.agencyAccreditation = null;
      this.agencyCertification = null;
      this.agencyThumbnail = null;
      this.file = null;
    },
  },
});
/* eslint-enable */
