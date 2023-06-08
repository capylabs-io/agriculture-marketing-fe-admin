import { defineStore } from "pinia";
import { Area, AreaCategory, Common } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const regionStore = defineStore("region", {
  state: () => ({
    regionPage: 1,
    regionsPerPage: 10,
    categories: [],
    region: {},
    regions: [],
    regionThumbnail: null,
    regionCertification: null,
    regionAccreditation: null,
    regionForm: false,
    searchKey: "",
    file: null,
    thumbnail: null,
    certification: null,
  }),
  getters: {
    slicedregions() {
      if (!this.regions || this.regions.length == 0) return [];
      return this.filteredregions.slice(
        (this.regionPage - 1) * this.regionsPerPage,
        this.regionPage * this.regionsPerPage
      );
    },
    filteredregions() {
      if (!this.regions || this.regions.length == 0) return [];
      let filtered = this.regions;
      if (this.searchKey)
        filtered = filtered.filter(
          (region) =>
            region.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            region.code
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
    totalregionPage() {
      if (!this.regions || this.filteredregions.length == 0) return 1;
      if (this.filteredregions.length % this.regionsPerPage == 0)
        return this.filteredregions.length / this.regionsPerPage;
      else
        return (
          Math.floor(this.filteredregions.length / this.regionsPerPage) + 1
        );
    },
    totalregion() {
      if (!this.regions || this.filteredregions.length == 0) return 1;
      return this.filteredregions.length;
    },
  },
  actions: {
    async fetchregions() {
      try {
        loading.show();
        const res = await Area.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching regions!",
            "Please try again later!"
          );
          return;
        }
        const regions = get(res, "data.data", []);
        if (!regions && regions.length == 0) return;
        const mappedRegions = regions.map((region) => {
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

        this.regions = mappedRegions;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await AreaCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching region categories!",
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
    async createregion() {
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
          ...this.region,
          thumbnail: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certification: {
            quality: uploadedCertification ? uploadedCertification : [],
          },
        };

        const res = await Area.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo mới thành công!");
        router.push("/region");
      } catch (error) {
        alert.error("Create region fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updateregion() {
      try {
        if (!this.region) return;
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
          ...this.region,
          thumbnail: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.region.thumbnail,
          certification: {
            quality: uploadedCertification
              ? uploadedCertification
              : this.region.certification.quality,
          },
        };

        const res = await Area.update(this.region.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật thành công!");
        router.push("/region");
      } catch (error) {
        alert.error("Create region fail! Please try again later!");
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
    async toggleregion(regionId) {
      try {
        loading.show();
        const res = await Area.fetch({
          sort: "updatedAt:desc",
          populate: "*",
          filters: {
            code: regionId,
          },
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const regions = get(res, "data.data", []);
        if (!regions || regions.length == 0) return;
        this.region = {
          id: regions[0],
          ...regions[0].attributes,
          regionCategory: get(
            regions[0],
            "attributes.regionCategory.data.attributes.name",
            []
          ),
          products: get(regions[0], "attributes.products.data", []),
        };
        this.products = this.region.products
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
    async deleteregion(regionId) {
      if (!regionId) return;
      try {
        loading.show();
        const res = await Area.remove(regionId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa  thành công!");
        await this.fetchregions();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.region = {};
      this.regionAccreditation = null;
      this.regionCertification = null;
      this.regionThumbnail = null;
      this.file = null;
    },
  },
});
/* eslint-enable */
